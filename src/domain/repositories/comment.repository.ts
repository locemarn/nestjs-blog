import { Comment } from '../entities/comment/comment.entity';

export abstract class CommentRepository {
  abstract create(comment: Comment): Promise<Comment>;
  abstract findById(id: number): Promise<Comment | null>;
  abstract findByPostId(
    postId: number,
    page?: number,
    limit?: number,
  ): Promise<Comment[]>;
  abstract findByUserId(
    userId: number,
    page?: number,
    limit?: number,
  ): Promise<Comment[]>;
  abstract update(comment: Comment): Promise<Comment>;
  abstract delete(id: number): Promise<void>;
}