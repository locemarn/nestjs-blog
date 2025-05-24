export interface LikeProps {
  id?: number;
  postId: number;
  userId: number;
  createdAt?: Date;
}

export class Like {
  private _id: number;
  private _postId: number;
  private _userId: number;
  private _createdAt: Date;

  constructor(props: LikeProps) {
    this._id = props.id ?? 0;
    this._postId = props.postId;
    this._userId = props.userId;
    this._createdAt = props.createdAt ?? new Date();
  }

  // Getters
  get id(): number {
    return this._id;
  }
  get postId(): number {
    return this._postId;
  }
  get userId(): number {
    return this._userId;
  }
  get createdAt(): Date {
    return this._createdAt;
  }

  toObject(): LikeProps {
    return {
      id: this._id,
      postId: this._postId,
      userId: this._userId,
      createdAt: this._createdAt,
    };
  }
}
