import { Schema, model, Document, Model } from 'mongoose';

interface IDriverAttributes {
  givenName: string;
  familyName: string;
  url: string;
  dateOfBirth: Date;
  nationality: string;
}

export interface IDriver extends Document, IDriverAttributes {}

const driverSchema = new Schema<IDriver>({
  givenName: String,
  familyName: String,
  url: String,
  dateOfBirth: Date,
  nationality: String,
});

export const Driver: Model<IDriver> = model<IDriver, Model<IDriver>>('Driver', driverSchema);
