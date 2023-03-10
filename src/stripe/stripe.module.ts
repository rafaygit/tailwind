import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { UsersModule } from 'src/users/users.module';
@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [ConfigModule, TransactionsModule, UsersModule],
  exports: [StripeService],
})
export class StripeModule {}
