import { Tag } from '../entities/tag/tag.entity';

export abstract class TagRepository {
  abstract create(tag: Tag): Promise<Tag>;
  abstract findById(id: number): Promise<Tag | null>;
  abstract findByName(name: string): Promise<Tag | null>;
  abstract findAll(): Promise<Tag[]>;
  abstract update(tag: Tag): Promise<Tag>;
  abstract delete(id: number): Promise<void>;
}