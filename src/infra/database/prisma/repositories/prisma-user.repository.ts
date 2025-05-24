import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '../../../../domain/aggregates/user/user.entity';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { PrismaService } from '../prisma.service';
import { Role } from '../../../../domain/enums/role.enum';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    if (user.password === undefined || user.password === null) {
      throw new BadRequestException('Password is required for user creation.');
    }
    const createdUser = await this.prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: user.password,
        role: user.role,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
        deleted_at: user.deletedAt,
      },
    });
    return new User({
      id: createdUser.id,
      email: createdUser.email,
      username: createdUser.username,
      password: createdUser.password,
      role: createdUser.role as Role,
      createdAt: createdUser.created_at,
      updatedAt: createdUser.updated_at,
      deletedAt: createdUser.deleted_at,
    });
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id, deleted_at: null },
    });
    if (!user) return null;
    return new User({
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      role: user.role as Role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      deletedAt: user.deleted_at,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email, deleted_at: null },
    });
    if (!user) return null;
    return new User({
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      role: user.role as Role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      deletedAt: user.deleted_at,
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { username, deleted_at: null },
    });
    if (!user) return null;
    return new User({
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      role: user.role as Role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      deletedAt: user.deleted_at,
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: { deleted_at: null },
    });
    return users.map(
      (user) =>
        new User({
          id: user.id,
          email: user.email,
          username: user.username,
          password: user.password,
          role: user.role as Role,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
          deletedAt: user.deleted_at,
        }),
    );
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        username: user.username,
        password: user.password,
        role: user.role,
        updated_at: new Date(),
        deleted_at: user.deletedAt,
      },
    });
    return new User({
      id: updatedUser.id,
      email: updatedUser.email,
      username: updatedUser.username,
      password: updatedUser.password,
      role: updatedUser.role as Role,
      createdAt: updatedUser.created_at,
      updatedAt: updatedUser.updated_at,
      deletedAt: updatedUser.deleted_at,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { deleted_at: new Date(), updated_at: new Date() },
    });
  }
}
