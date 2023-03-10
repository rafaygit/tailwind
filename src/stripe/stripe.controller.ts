import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { StripeService } from './stripe.service';
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('checkout')
  createCheckout(
    @Body()
    body: {
      userId: number;
      stripePriceId: string;
      productName: string;
      licenseId: number;
      templateId: number;
    },
  ) {
    const { userId, stripePriceId, productName, licenseId, templateId } = body;
    return this.stripeService.createCheckoutSession(
      userId,
      licenseId,
      templateId,
      stripePriceId,
      productName,
    );
  }
  @Get('verify-payment')
  verify(@Query('session_id') session_id: any) {
    return this.stripeService.verifyPayment(session_id);
  }

  @Post('session')
  retrieveCheckOutSession(@Body('sessionId') sessionId: string) {
    return this.stripeService.retrieveSession(sessionId);
  }
}
