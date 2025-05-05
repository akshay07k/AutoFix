import axios from "axios";


export const createBooking = async (bookingData: any) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/book/createBooking`, bookingData);
        return response.data;
    }
    catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};

export const getBookingsByUser = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/book/getBookingsByUser/681745b1acb7016e929527da`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};


export const getBookingById = async (bookingId: string) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/book/getBookingById/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    throw error;
  }
};