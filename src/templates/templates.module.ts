import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  controllers: [TemplatesController],
  providers: [TemplatesService],
  imports: [PrismaModule, AwsModule],
})
export class TemplatesModule {}
