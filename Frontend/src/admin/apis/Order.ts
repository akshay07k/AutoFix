import axios from "axios";

export const getAllOrders = async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL + "/book/getAllBookings");
        return response.data;
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
    try {
        const response = await axios.put(import.meta.env.VITE_API_URL + "/book/updateBookingStatus/" + orderId, {
            status
        });
        return response.data;
    }
    catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
};