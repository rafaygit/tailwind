import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';

@Injectable()
export class LicensesService {
  constructor(private prisma: PrismaService) {}
  async create(createLicenseDto: CreateLicenseDto) {
    return this.prisma.licenses.create({
      data: createLicenseDto,
    });
  }

  findAll() {
    return this.prisma.licenses.findMany({
      include: {
        transactions: true,
        uiKits: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.licenses.findUnique({
      where: {
        id: id,
      },
      include: {
        transactions: true,
        uiKits: true,
      },
    });
  }

  update(id: number, updateLicenseDto: UpdateLicenseDto) {
    return this.prisma.licenses.update({
      where: {
        id: id,
      },
      data: updateLicenseDto,
    });
  }

  remove(id: number) {
    return this.prisma.licenses.delete({
      where: {
        id: id,
      },
    });
  }
}
