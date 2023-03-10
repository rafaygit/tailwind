import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersMetaModule } from './users-meta/users-meta.module';
import { UiKitsModule } from './ui-kits/ui-kits.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TemplatesIntegrationModule } from './templates-integration/templates-integration.module';
import { TemplatesModule } from './templates/templates.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LicensesModule } from './licenses/licenses.module';
import { ComponentsMetaModule } from './components-meta/components-meta.module';
import { ComponentsModule } from './components/components.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ComponentsIntegrationModule } from './components-integration/components-integration.module';
import { StripeModule } from './stripe/stripe.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    UsersModule,
    UsersMetaModule,
    UiKitsModule,
    TransactionsModule,
    TemplatesIntegrationModule,
    TemplatesModule,
    PrismaModule,
    AuthModule,
    LicensesModule,
    ComponentsMetaModule,
    ComponentsModule,
    CategoryModule,
    SubCategoryModule,
    ComponentsIntegrationModule,
    StripeModule,
    AwsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
