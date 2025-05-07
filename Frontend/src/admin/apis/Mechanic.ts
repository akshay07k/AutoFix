import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllMechanics = async () => {
    try {
        const response = await axios.get(`${API_URL}/mechanic/getAllMechanics`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching mechanics:", error);
        throw error;
    }
};

export const getMechanicById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/mechanic/getMechanicById/${id}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching mechanic by ID:", error);
        throw error;
    }
};

export const createMechanic = async (mechanicData: any) => {
    try {
        const response = await axios.post(`${API_URL}/mechanic/createMechanic`, mechanicData);
        return response.data;
    }
    catch (error) {
        console.error("Error creating mechanic:", error);
        throw error;
    }
};

export const updateMechanic = async (id: string, mechanicData: any) => {
    try {
        const response = await axios.put(`${API_URL}/mechanic/updateMechanic/${id}`, mechanicData);
        return response.data;
    }
    catch (error) {
        console.error("Error updating mechanic:", error);
        throw error;
    }
};

export const updateMechanicStatus = async (id: number, status: string) => {
    try {
        const response = await axios.put(`${API_URL}/mechanic/updateMechanicStatus/${id}`, { status });
        return response.data;
    }
    catch (error) {
        console.error("Error updating mechanic status:", error);
        throw error;
    }
};