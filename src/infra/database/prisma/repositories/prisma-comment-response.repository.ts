import { Injectable } from '@nestjs/common';
import { CommentResponse } from '../../../../domain/entities/comment-response/comment-response.entity';
import { CommentResponseRepository } from '../../../../domain/repositories/comment-response.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCommentResponseRepository
  implements CommentResponseRepository
{
  constructor(private prisma: PrismaService) {}

  async create(response: CommentResponse): Promise<CommentResponse> {
    const createdResponse = await this.prisma.commentResponse.create({
      data: {
        content: response.content,
        userId: response.userId,
        commentId: response.commentId,
        created_at: response.createdAt,
        updated_at: response.updatedAt,
      },
    });
    return new CommentResponse({
      id: createdResponse.id,
      content: createdResponse.content,
      userId: createdResponse.userId,
      commentId: createdResponse.commentId,
      createdAt: createdResponse.created_at,
      updatedAt: createdResponse.updated_at,
    });
  }

  async findById(id: number): Promise<CommentResponse | null> {
    const response = await this.prisma.commentResponse.findUnique({
      where: { id },
    });
    return response ? new CommentResponse(response) : null;
  }

  async findByCommentId(
    commentId: number,
    page = 1,
    limit = 10,
  ): Promise<CommentResponse[]> {
    const responses = await this.prisma.commentResponse.findMany({
      where: { commentId },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { created_at: 'desc' },
    });
    return responses.map(
      (response) =>
        new CommentResponse({
          id: response.id,
          content: response.content,
          userId: response.userId,
          commentId: response.commentId,
          createdAt: response.created_at,
          updatedAt: response.updated_at,
        }),
    );
  }

  async findByUserId(
    userId: number,
    page = 1,
    limit = 10,
  ): Promise<CommentResponse[]> {
    const responses = await this.prisma.commentResponse.findMany({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { created_at: 'desc' },
    });
    return responses.map(
      (response) =>
        new CommentResponse({
          id: response.id,
          content: response.content,
          userId: response.userId,
          commentId: response.commentId,
          createdAt: response.created_at,
          updatedAt: response.updated_at,
        }),
    );
  }

  async update(response: CommentResponse): Promise<CommentResponse> {
    const updatedResponse = await this.prisma.commentResponse.update({
      where: { id: response.id },
      data: {
        content: response.content,
        updated_at: new Date(),
      },
    });
    return new CommentResponse({
      id: updatedResponse.id,
      content: updatedResponse.content,
      userId: updatedResponse.userId,
      commentId: updatedResponse.commentId,
      createdAt: updatedResponse.created_at,
      updatedAt: updatedResponse.updated_at,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.commentResponse.delete({ where: { id } });
  }
}
