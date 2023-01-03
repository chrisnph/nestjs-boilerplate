import { Document } from 'mongoose';

export interface BannerInterface extends Document {
  readonly name: string;
  readonly path: string;
  readonly sort: number;
  readonly active: boolean;
}
