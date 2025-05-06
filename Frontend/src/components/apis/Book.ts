import axios from "axios";


export const createBooking = async (bookingData: any) => {
    try {
        let username = JSON.parse(localStorage.getItem("user") || "{}").name;
        if(!username) {
            username = "Guest";
        }
        bookingData.name = username;
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
    const userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/book/getBookingsByUser/${userId}`);
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