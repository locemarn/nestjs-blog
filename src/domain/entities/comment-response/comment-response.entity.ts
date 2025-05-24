export interface CommentResponseProps {
  id?: number;
  content: string;
  userId: number;
  commentId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CommentResponse {
  private _id: number;
  private _content: string;
  private _userId: number;
  private _commentId: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: CommentResponseProps) {
    this._id = props.id ?? 0;
    this._content = props.content;
    this._userId = props.userId;
    this._commentId = props.commentId;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  // Getters
  get id(): number {
    return this._id;
  }
  get content(): string {
    return this._content;
  }
  get userId(): number {
    return this._userId;
  }
  get commentId(): number {
    return this._commentId;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Setters
  updateContent(content: string): void {
    this._content = content;
    this._updatedAt = new Date();
  }

  toObject(): CommentResponseProps {
    return {
      id: this._id,
      content: this._content,
      userId: this._userId,
      commentId: this._commentId,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
