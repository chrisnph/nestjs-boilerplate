import { Document } from 'mongoose';

export interface CatInterface extends Document {
  readonly id: string;
  readonly name: string;
  readonly age: number;
  readonly owner: string;
  readonly breed: [string];
  readonly pageInfo: object
}
