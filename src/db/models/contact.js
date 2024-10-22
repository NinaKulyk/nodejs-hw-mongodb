import { model, Schema } from 'mongoose';
import { userModel } from './user.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
    userId: {
      type: String,
      required: true,
      ref: userModel,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const contactsModel = model('contacts', contactSchema);
