import * as mongoose from 'mongoose';

export const CatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    breed: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    minimize: true,
  },
);