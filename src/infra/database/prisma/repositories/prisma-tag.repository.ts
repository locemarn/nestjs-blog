import { Injectable } from '@nestjs/common';
import { Tag } from '../../../../domain/entities/tag/tag.entity';
import { TagRepository } from '../../../../domain/repositories/tag.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaTagRepository implements TagRepository {
  constructor(private prisma: PrismaService) {}

  async create(tag: Tag): Promise<Tag> {
    const createdTag = await this.prisma.tag.create({
      data: {
        name: tag.name,
      },
    });
    return new Tag(createdTag);
  }

  async findById(id: number): Promise<Tag | null> {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
    });
    return tag ? new Tag(tag) : null;
  }

  async findByName(name: string): Promise<Tag | null> {
    const tag = await this.prisma.tag.findUnique({
      where: { name },
    });
    return tag ? new Tag(tag) : null;
  }

  async findAll(): Promise<Tag[]> {
    const tags = await this.prisma.tag.findMany();
    return tags.map((tag) => new Tag(tag));
  }

  async update(tag: Tag): Promise<Tag> {
    const updatedTag = await this.prisma.tag.update({
      where: { id: tag.id },
      data: {
        name: tag.name,
      },
    });
    return new Tag(updatedTag);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.tag.delete({ where: { id } });
  }
}