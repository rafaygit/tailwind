import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/migrations/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService, private users: UsersService) {}
  async create(createTransactionDto: CreateTransactionDto) {
    await this.users.addLicense(
      createTransactionDto.usersId,
      createTransactionDto.licensesId,
    );
    await this.users.addTemplate(
      createTransactionDto.usersId,
      createTransactionDto.templatesId,
    );

    return await this.prisma.transactions.create({
      data: createTransactionDto,
    });
  }

  findAll() {
    return this.prisma.transactions.findMany();
  }

  findOne(id: number) {
    return this.prisma.transactions.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transactions.update({
      where: {
        id: id,
      },
      data: updateTransactionDto,
    });
  }

  remove(id: number) {
    return this.prisma.transactions.delete({
      where: {
        id: id,
      },
    });
  }
}
