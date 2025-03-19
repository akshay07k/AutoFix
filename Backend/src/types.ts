import { Document, Types } from 'mongoose';

export interface IService {
  category: string;
  title: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface ICarDetails {
  carMake: string;
  carModel: string;
  year: string;
  licensePlate: string;
}

export interface ICartItem {
  service: IService;
  carDetails: ICarDetails;
}

export interface IUser {
  email: string;
  password: string;
  name: string;
  role?: string;
  cartId?: string;
  cars?: ICarDetails[];
  createdAt?: Date;
  updatedAt?: Date;
  isPasswordCorrect(password: string): Promise<boolean>;
}

export interface ILocation {
  name: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  country: string;
}

export interface ISchedule {
  date: string;
  time: string;
}

// Mongoose document interfaces
export interface IServiceDoc extends IService, Document {}
export interface IUserDoc extends IUser, Document {}
export interface ICartDoc extends Document {
  _id: Types.ObjectId
  userId: string;
  items: ICartItem[];
}
export interface IBookingDoc extends Document {
  userId: Types.ObjectId;
  cartItems: ICartItem[];
  location: ILocation;
  schedule: ISchedule;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}