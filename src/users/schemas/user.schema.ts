import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  beginnerStatus: {
    type: Boolean,
    required: false,
  },
  htmlStatus: {
    type: Boolean,
    required: false,
  },
  tsStatus: {
    type: Boolean,
    required: false,
  },
});
