export interface PostProps {
  id?: number;
  title: string;
  content: string;
  published?: boolean;
  userId: number; // ID do autor do post
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class Post {
  private _id: number;
  private _title: string;
  private _content: string;
  private _published: boolean;
  private _userId: number;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  constructor(props: PostProps) {
    this._id = props.id ?? 0;
    this._title = props.title;
    this._content = props.content;
    this._published = props.published ?? false;
    this._userId = props.userId;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._deletedAt = props.deletedAt ?? null;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  get published(): boolean {
    return this._published;
  }

  get userId(): number {
    return this._userId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get deletedAt(): Date | null {
    return this._deletedAt;
  }

  // Setters
  updateTitle(title: string): void {
    this._title = title;
    this._updatedAt = new Date();
  }

  updateContent(content: string): void {
    this._content = content;
    this._updatedAt = new Date();
  }

  publish(): void {
    this._published = true;
    this._updatedAt = new Date();
  }

  unpublish(): void {
    this._published = false;
    this._updatedAt = new Date();
  }

  markAsDeleted(): void {
    this._deletedAt = new Date();
    this._updatedAt = new Date();
  }

  restore(): void {
    this._deletedAt = null;
    this._updatedAt = new Date();
  }

  toObject(): PostProps {
    return {
      id: this._id,
      title: this._title,
      content: this._content,
      published: this._published,
      userId: this._userId,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }
}