export interface TagProps {
  id?: number;
  name: string;
}

export class Tag {
  private _id: number;
  private _name: string;

  constructor(props: TagProps) {
    this._id = props.id ?? 0;
    this._name = props.name;
  }

  // Getters
  get id(): number {
    return this._id;
  }
  get name(): string {
    return this._name;
  }

  // Setters
  updateName(name: string): void {
    this._name = name;
  }

  toObject(): TagProps {
    return {
      id: this._id,
      name: this._name,
    };
  }
}
