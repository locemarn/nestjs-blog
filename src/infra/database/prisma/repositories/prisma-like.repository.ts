import { Injectable } from '@nestjs/common';
import { Like } from '../../../../domain/entities/like/like.entity';
import { LikeRepository } from '../../../../domain/repositories/like.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaLikeRepository implements LikeRepository {
  constructor(private prisma: PrismaService) {}

  async create(like: Like): Promise<Like> {
    const createdLike = await this.prisma.like.create({
      data: {
        postId: like.postId,
        userId: like.userId,
        created_at: like.createdAt,
      },
    });
    return new Like({
      id: createdLike.id,
      postId: createdLike.postId,
      userId: createdLike.userId,
      createdAt: createdLike.created_at,
    });
  }

  async findById(id: number): Promise<Like | null> {
    const like = await this.prisma.like.findUnique({
      where: { id },
    });
    return like ? new Like(like) : null;
  }

  async findByPostAndUser(
    postId: number,
    userId: number,
  ): Promise<Like | null> {
    const like = await this.prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
    return like ? new Like(like) : null;
  }

  async findByPostId(postId: number): Promise<Like[]> {
    const likes = await this.prisma.like.findMany({
      where: { postId },
    });
    return likes.map(
      (like) =>
        new Like({
          id: like.id,
          postId: like.postId,
          userId: like.userId,
          createdAt: like.created_at,
        }),
    );
  }

  async findByUserId(userId: number): Promise<Like[]> {
    const likes = await this.prisma.like.findMany({
      where: { userId },
    });
    return likes.map(
      (like) =>
        new Like({
          id: like.id,
          postId: like.postId,
          userId: like.userId,
          createdAt: like.created_at,
        }),
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.like.delete({ where: { id } });
  }

  async countLikesByPostId(postId: number): Promise<number> {
    return this.prisma.like.count({
      where: { postId },
    });
  }
}
