import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [PrismaModule, UsersModule],
  exports: [TransactionsService],
})
export class TransactionsModule {}
