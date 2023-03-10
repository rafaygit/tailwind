import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(
    readonly configService: ConfigService,
    private transactions: TransactionsService,
    private users: UsersService,
  ) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  async createCheckoutSession(
    userId: number,
    licenseId: number,
    templateId: number,
    stripePriceId: string,
    productName: string,
  ) {
    const session = await this.stripe.checkout.sessions.create({
      success_url:
        'http://localhost:3000/stripe/verify-payment/?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/cancel',
      line_items: [{ price: stripePriceId, quantity: 1 }],
      mode: 'payment',
      metadata: {
        userId: userId,
        licenseId: licenseId,
        templateId: templateId,
        productName: productName,
      },
    });

    return this.createPaymentIntent(session);
  }

  async createPaymentIntent(session: any) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: session.amount_total,
      currency: this.configService.get('STRIPE_CURRENCY'),
      automatic_payment_methods: { enabled: true },
      receipt_email: session.receipt_email,
      metadata: {
        userId: session.metadata.userId,
        licenseId: session.metadata.licenseId,
        templateId: session.metadata.templateId,
        productName: session.metadata.productName,
      },
    });

    const id = paymentIntent.id;
    const status = session.status;
    return {
      session_id: session.id,
      session_url: session.url,
      id,
      status,
    };
  }

  async verifyPayment(session_id: any) {
    const retrieveSession = this.stripe.checkout.sessions.retrieve(session_id);

    const paymentIntentId = String((await retrieveSession).payment_intent);

    const verify = await this.stripe.paymentIntents.retrieve(paymentIntentId);

    if (verify && verify.status === 'succeeded') {
      console.log('success');
      const transactionDto: CreateTransactionDto = {
        method: 'Stripe',
        usersId: Number((await retrieveSession).metadata.userId),
        licensesId: Number((await retrieveSession).metadata.licenseId),
        templatesId: Number((await retrieveSession).metadata.templateId),
      };

      this.transactions.create(transactionDto);
    } else {
      console.log('fail');
    }
    return verify.status;
  }
  async retrieveSession(sessionId: string) {
    return this.stripe.checkout.sessions.retrieve(sessionId);
  }
}
