import { CommentResponse } from '../entities/comment-response/comment-response.entity';

export abstract class CommentResponseRepository {
  abstract create(response: CommentResponse): Promise<CommentResponse>;
  abstract findById(id: number): Promise<CommentResponse | null>;
  abstract findByCommentId(
    commentId: number,
    page?: number,
    limit?: number,
  ): Promise<CommentResponse[]>;
  abstract findByUserId(
    userId: number,
    page?: number,
    limit?: number,
  ): Promise<CommentResponse[]>;
  abstract update(response: CommentResponse): Promise<CommentResponse>;
  abstract delete(id: number): Promise<void>;
}