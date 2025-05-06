export interface OrderItem {
    _id: string;
    service: {
      title: string;
      price: number;
      features: string[];
    };
    carDetails: {
      carMake: string;
      carModel: string;
      year: number;
      licensePlate: string;
    };
  }
  
  export interface OrderLocation {
    _id: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    country: string;
  }
  
  export interface ScheduleTime {
    _id: string;
    date: string;
    time: string;
  }
  
  export interface Order {
    _id: string;
    userId: string;
    items: OrderItem[];
    location: OrderLocation;
    scheduleTime: ScheduleTime;
    totalAmount: number;
    status: 'Pending' | 'Completed' | 'Cancelled' | 'In Progress';
    createdAt: string;
    updatedAt: string;
    __v: number;
  }