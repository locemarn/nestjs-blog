import { Post } from '../aggregates/post/post.entity';

export abstract class PostRepository {
  abstract create(post: Post): Promise<Post>;
  abstract findById(id: number): Promise<Post | null>;
  abstract findAll(page?: number, limit?: number): Promise<Post[]>;
  abstract findByUserId(
    userId: number,
    page?: number,
    limit?: number,
  ): Promise<Post[]>;
  abstract update(post: Post): Promise<Post>;
  abstract delete(id: number): Promise<void>;
  abstract findPublishedPosts(page?: number, limit?: number): Promise<Post[]>;
}
