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


export interface CarDetails {
  carMake: string;
  carModel: string;
  year: string;
  licensePlate: string;
}

export interface CartItem {
  id?: string | number;
  service: Service;
  carDetails: CarDetails;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  pin: string;
  country: string;
}

export interface BookingData {
  location?: Location;
  schedule?: {
    date?: string;
    time?: string;
  };
}