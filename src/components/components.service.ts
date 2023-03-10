import { Injectable } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AwsService } from 'src/aws/aws.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ComponentsService {
  constructor(private prisma: PrismaService, private awsService: AwsService) {}

  async create(createComponentDto: CreateComponentDto, componentsPicture) {
    try {
      const uploadedFile = await this.awsService.uploadFile(componentsPicture);
      return this.prisma.components.create({
        data: {
          subCategoryId: createComponentDto.subCategoryId,
          name: createComponentDto.name,
          description: createComponentDto.description,
          componentsPicture: uploadedFile.Location,
        },
      });
    } catch (e) {
      throw new HttpException('Add component image!', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  findAll() {
    return this.prisma.components.findMany({
      include: {
        componentsIntegration: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.components.findUnique({
      where: {
        id: id,
      },
      include: {
        componentsIntegration: true,
      },
    });
  }

  update(id: number, updateComponentDto: UpdateComponentDto) {
    return this.prisma.components.update({
      where: {
        id: id,
      },
      data: {
        name: updateComponentDto.name,
        description: updateComponentDto.description,
      },
    });
  }

  remove(id: number) {
    return this.prisma.components.delete({
      where: {
        id: id,
      },
    });
  }
}
