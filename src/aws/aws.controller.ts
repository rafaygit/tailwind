import {
  Body,
  Get,
  Post,
  Controller,
  Request,
  UseGuards,
  Req,
  UseInterceptors,
  Header,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from './aws.service';

@Controller('aws')
@UseInterceptors(FileInterceptor('file'))
export class AwsController {
  constructor(private awsService: AwsService) {}

  @Post()
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.awsService.uploadFile(file);
  }
}
