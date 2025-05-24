export interface CommentProps {
  id?: number;
  content: string;
  postId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class Comment {
  private _id: number;
  private _content: string;
  private _postId: number;
  private _userId: number;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  constructor(props: CommentProps) {
    this._id = props.id ?? 0;
    this._content = props.content;
    this._postId = props.postId;
    this._userId = props.userId;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._deletedAt = props.deletedAt ?? null;
  }

  // Getters
  get id(): number { return this._id; }
  get content(): string { return this._content; }
  get postId(): number { return this._postId; }
  get userId(): number { return this._userId; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }
  get deletedAt(): Date | null { return this._deletedAt; }

  // Setters
  updateContent(content: string): void {
    this._content = content;
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

  toObject(): CommentProps {
    return {
      id: this._id,
      content: this._content,
      postId: this._postId,
      userId: this._userId,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }
}