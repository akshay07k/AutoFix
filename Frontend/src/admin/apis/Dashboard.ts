import axios from "axios";

export const getBookingStats = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/book/stats`
        );
        return response.data.data;
    }
    catch(error) {
        console.log("Error fetching booking stats", error);
        throw error;
    }
};

export const getUserStats = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/stats`
        );
        return response.data.data;
    }
    catch(error) {
        console.log("Error fetching user stats", error);
        throw error;
    }
};

export const getRecentBookings = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/book/recentBookings`
        );
        return response.data.data;
    }
    catch(error) {
        console.log("Error fetching recent bookings", error);
        throw error;
    }
}