import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { AwsService } from 'src/aws/aws.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService, private awsService: AwsService) {}

  async create(createTemplateDto: CreateTemplateDto, templatesPicture) {
    try {
      const uploadedFile = await this.awsService.uploadFile(templatesPicture);
      return this.prisma.templates.create({
        data: {
          name: createTemplateDto.name,
          description: createTemplateDto.description,
          templatesPicture: uploadedFile.Location,
        },
      });
    } catch (e) {
      throw new HttpException('Add template image!', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  findAll() {
    return this.prisma.templates.findMany({
      include: {
        transactions: true,
        templatesIntegration: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.templates.findUnique({
      where: {
        id: id,
      },
      include: {
        transactions: true,
        templatesIntegration: true,
      },
    });
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return this.prisma.templates.update({
      where: {
        id: id,
      },
      data: updateTemplateDto,
    });
  }

  remove(id: number) {
    return this.prisma.templates.delete({
      where: {
        id: id,
      },
    });
  }
}
