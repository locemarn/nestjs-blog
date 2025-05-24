import { Like } from '../entities/like/like.entity';

export abstract class LikeRepository {
  abstract create(like: Like): Promise<Like>;
  abstract findById(id: number): Promise<Like | null>;
  abstract findByPostAndUser(
    postId: number,
    userId: number,
  ): Promise<Like | null>;
  abstract findByPostId(postId: number): Promise<Like[]>;
  abstract findByUserId(userId: number): Promise<Like[]>;
  abstract delete(id: number): Promise<void>;
  abstract countLikesByPostId(postId: number): Promise<number>;
}