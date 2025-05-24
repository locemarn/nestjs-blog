import { Injectable } from '@nestjs/common';
import { Comment } from '../../../../domain/entities/comment/comment.entity';
import { CommentRepository } from '../../../../domain/repositories/comment.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCommentRepository implements CommentRepository {
  constructor(private prisma: PrismaService) {}

  async create(comment: Comment): Promise<Comment> {
    const createdComment = await this.prisma.comment.create({
      data: {
        content: comment.content,
        postId: comment.postId,
        userId: comment.userId,
        created_at: comment.createdAt,
        updated_at: comment.updatedAt,
        deleted_at: comment.deletedAt,
      },
    });
    return new Comment({
      id: createdComment.id,
      content: createdComment.content,
      postId: createdComment.postId,
      userId: createdComment.userId,
      createdAt: createdComment.created_at,
      updatedAt: createdComment.updated_at,
      deletedAt: createdComment.deleted_at,
    });
  }

  async findById(id: number): Promise<Comment | null> {
    const comment = await this.prisma.comment.findUnique({
      where: { id, deleted_at: null },
    });
    if (!comment) {
      return null;
    }
    return new Comment({
      id: comment.id,
      content: comment.content,
      postId: comment.postId,
      userId: comment.userId,
      createdAt: comment.created_at,
      updatedAt: comment.updated_at,
      deletedAt: comment.deleted_at,
    });
  }

  async findByPostId(postId: number, page = 1, limit = 10): Promise<Comment[]> {
    const comments = await this.prisma.comment.findMany({
      where: { postId, deleted_at: null },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { created_at: 'desc' },
    });
    return comments.map(
      (comment) =>
        new Comment({
          id: comment.id,
          content: comment.content,
          postId: comment.postId,
          userId: comment.userId,
          createdAt: comment.created_at,
          updatedAt: comment.updated_at,
          deletedAt: comment.deleted_at,
        }),
    );
  }

  async findByUserId(userId: number, page = 1, limit = 10): Promise<Comment[]> {
    const comments = await this.prisma.comment.findMany({
      where: { userId, deleted_at: null },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { created_at: 'desc' },
    });
    return comments.map(
      (comment) =>
        new Comment({
          id: comment.id,
          content: comment.content,
          postId: comment.postId,
          userId: comment.userId,
          createdAt: comment.created_at,
          updatedAt: comment.updated_at,
          deletedAt: comment.deleted_at,
        }),
    );
  }

  async update(comment: Comment): Promise<Comment> {
    const updatedComment = await this.prisma.comment.update({
      where: { id: comment.id },
      data: {
        content: comment.content,
        updated_at: new Date(),
        deleted_at: comment.deletedAt,
      },
    });
    return new Comment({
      id: updatedComment.id,
      content: updatedComment.content,
      postId: updatedComment.postId,
      userId: updatedComment.userId,
      createdAt: updatedComment.created_at,
      updatedAt: updatedComment.updated_at,
      deletedAt: updatedComment.deleted_at,
    });
  }

  async delete(id: number): Promise<void> {
    // Soft delete para comentários
    await this.prisma.comment.update({
      where: { id },
      data: { deleted_at: new Date(), updated_at: new Date() },
    });
  }
}
