import { Role } from '../../enums/role.enum';

export interface UserProps {
  id?: number;
  email: string;
  username: string;
  password: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class User {
  private _id: number;
  private _email: string;
  private _username: string;
  private _password: string;
  private _role: Role;
  private _createdAt?: Date;
  private _updatedAt?: Date;
  private _deletedAt?: Date | null;

  constructor(props: UserProps) {
    this._id = props.id ?? 0;
    this._email = props.email;
    this._username = props.username;
    this._password = props.password;
    this._role = props.role;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._deletedAt = props.deletedAt ?? null;
  }

  // Getters
  get id(): number {
    return this._id;
  }
  get email(): string {
    return this._email;
  }
  get username(): string {
    return this._username;
  }
  get password(): string {
    return this._password;
  }
  get role(): Role {
    return this._role;
  }
  get createdAt(): Date {
    return <Date>this._createdAt;
  }
  get updatedAt(): Date {
    return <Date>this._updatedAt;
  }
  get deletedAt(): Date | null {
    return <Date>this._deletedAt;
  }

  // Setters
  set email(value: string) {
    this._email = value;
    this._updatedAt = new Date();
  }
  set username(value: string) {
    this._username = value;
    this._updatedAt = new Date();
  }
  set password(value: string) {
    this._password = value;
    this._updatedAt = new Date();
  }
  set role(value: Role) {
    this._role = value;
    this._updatedAt = new Date();
  }

  // Business Logic
  markAsDeleted() {
    this._deletedAt = new Date();
    this._updatedAt = new Date();
  }

  restore() {
    this._deletedAt = null;
    this._updatedAt = new Date();
  }

  toObject(): UserProps {
    return {
      id: this._id,
      email: this._email,
      username: this._username,
      password: this._password,
      role: this._role,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }
}
