export interface FormData {
  carMake: string;
  carModel: string;
  year: string;
  licensePlate: string;
}

export interface Service {
  title: string;
  price: string;
  features: string[];
  recommended?: boolean;
}