/**
 * Profile Model
 * User profile data from onboarding wizard
 */

import mongoose, { Schema, Document, Model } from 'mongoose';
import type {
  StatusType,
  Region,
  HousingStatus,
  WorkStatus,
  BudgetBand,
  ServiceNeed,
} from '@/types';

export interface IProfile extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  statusType: StatusType;
  region: Region;
  city?: string;
  postcodeArea?: string;
  arrivalDate?: Date;
  alreadyInUK: boolean;
  housingStatus: HousingStatus;
  workStatus: WorkStatus;
  budgetBand: BudgetBand;
  availableDocuments: string[];
  needs: ServiceNeed[];
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    statusType: {
      type: String,
      enum: ['student', 'skilled_worker', 'dependant', 'graduate', 'other'],
      required: [true, 'Status type is required'],
    },
    region: {
      type: String,
      enum: ['england', 'scotland', 'wales', 'northern_ireland'],
      required: [true, 'Region is required'],
    },
    city: {
      type: String,
      trim: true,
      maxlength: [100, 'City name cannot exceed 100 characters'],
    },
    postcodeArea: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: [10, 'Postcode area cannot exceed 10 characters'],
    },
    arrivalDate: {
      type: Date,
    },
    alreadyInUK: {
      type: Boolean,
      default: false,
    },
    housingStatus: {
      type: String,
      enum: [
        'searching',
        'temporary',
        'renting',
        'owned',
        'university_accommodation',
        'with_family',
      ],
      required: [true, 'Housing status is required'],
    },
    workStatus: {
      type: String,
      enum: ['employed', 'self_employed', 'unemployed', 'student', 'not_permitted'],
      required: [true, 'Work status is required'],
    },
    budgetBand: {
      type: String,
      enum: ['tight', 'moderate', 'comfortable', 'flexible'],
      required: [true, 'Budget band is required'],
    },
    availableDocuments: [{
      type: String,
      trim: true,
    }],
    needs: [{
      type: String,
      enum: [
        'bank_account',
        'gp_registration',
        'national_insurance',
        'biometric_card',
        'council_tax',
        'driving_license',
        'phone_sim',
        'housing',
        'utilities',
        'transport',
        'employment',
      ],
    }],
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        const { __v, ...rest } = ret;
        void __v;
        return rest;
      },
    },
  }
);

// Indexes for common queries
ProfileSchema.index({ statusType: 1 });
ProfileSchema.index({ region: 1 });
ProfileSchema.index({ onboardingCompleted: 1 });
ProfileSchema.index({ statusType: 1, region: 1 });

// Prevent model recompilation in development
const Profile: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;

