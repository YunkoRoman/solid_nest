import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  public async findOne(id: number): Promise<Product> {
    return this.prisma.product.findFirst({ where: { id } });
  }
}
