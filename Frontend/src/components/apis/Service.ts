import axios from "axios";


export const getServicesByCategory = async (category: string) => {
    try {
        const response = await axios.get(
            import.meta.env.VITE_API_URL + '/service/category/' + category
        );
        const data = response.data.data;

        return data;

      } catch (error) {
        console.error('Error fetching services:', error);
    }
}