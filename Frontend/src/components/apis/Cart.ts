import axios from 'axios';

export const addToCart = async (service: string, carDetails: string) => {
    try {
        const data = {
            service,
            carDetails
        };
        const response = await axios.post(
            import.meta.env.VITE_API_URL + '/cart/addToCart' + '/681745b1acb7016e929527db', 
            data
        )

        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || 'An error occurred while adding to cart.'
          );
    }
}

export const getCartItems = async () => {
    try {
        const response = await axios.get(
            import.meta.env.VITE_API_URL + '/cart/getCart' + '/681745b1acb7016e929527db'
        )
        return response.data;
    }
    catch (error: any) {
        throw new Error(
            error.response?.data?.message || 'An error occurred while fetching the cart.'
          );
    }
}

export const removeFromCart = async (index: number) => {
    try {
        const response = await axios.delete(
            import.meta.env.VITE_API_URL + '/cart/removeFromCart' + '/681745b1acb7016e929527db/' + index.toString(),
        )
        return response.data;
    }
    catch (error: any) {
        throw new Error(
            error.response?.data?.message || 'An error occurred while removing from cart.'
          );
    }
}


// export const bookService = async (service, carDetails) => {}

