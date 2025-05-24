import { Injectable } from '@nestjs/common';
import { Category } from '../../../../domain/entities/category/category.entity';
import { CategoryRepository } from '../../../../domain/repositories/category.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(category: Category): Promise<Category> {
    const createdCategory = await this.prisma.category.create({
      data: {
        name: category.name,
      },
    });
    return new Category(createdCategory);
  }

  async findById(id: number): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    return category ? new Category(category) : null;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { name },
    });
    return category ? new Category(category) : null;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    return categories.map((category) => new Category(category));
  }

  async update(category: Category): Promise<Category> {
    const updatedCategory = await this.prisma.category.update({
      where: { id: category.id },
      data: {
        name: category.name,
      },
    });
    return new Category(updatedCategory);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }
}
