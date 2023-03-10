import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  constructor(private config: ConfigService) {}
  bucket = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
  });

  async uploadFile(file) {
    try {
      const name = file.originalname;

      const s3Response = await this.s3
        .upload({
          Bucket: this.bucket,
          Key: String(name),
          Body: file.buffer,
          ContentType: file.mimetype,
          ContentDisposition: 'inline',
        })
        .promise();

      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
