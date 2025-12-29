/**
 * User Model
 * Core user account data and authentication
 */

import mongoose, { Schema, Document, Model } from 'mongoose';
import type { UserRole } from '@/types';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  name?: string;
  image?: string;
  emailVerified?: Date;
  hashedPassword?: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    image: {
      type: String,
    },
    emailVerified: {
      type: Date,
    },
    hashedPassword: {
      type: String,
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'moderator'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.hashedPassword;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });
UserSchema.index({ createdAt: -1 });

// Virtual for profile
UserSchema.virtual('profile', {
  ref: 'Profile',
  localField: '_id',
  foreignField: 'userId',
  justOne: true,
});

// Virtual for subscription
UserSchema.virtual('subscription', {
  ref: 'Subscription',
  localField: '_id',
  foreignField: 'userId',
  justOne: true,
});

// Prevent model recompilation in development
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

