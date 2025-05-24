import { Category } from '../entities/category/category.entity';

export abstract class CategoryRepository {
  abstract create(category: Category): Promise<Category>;
  abstract findById(id: number): Promise<Category | null>;
  abstract findByName(name: string): Promise<Category | null>;
  abstract findAll(): Promise<Category[]>;
  abstract update(category: Category): Promise<Category>;
  abstract delete(id: number): Promise<void>;
}