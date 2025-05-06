import axios from 'axios';

const cartId = JSON.parse(localStorage.getItem("user") || "{}").cartId;

export const addToCart = async (service: string, carDetails: string) => {
    try {
        console.log(cartId);
        
        const data = {
            service,
            carDetails
        };
        const response = await axios.post(
            import.meta.env.VITE_API_URL + '/cart/addToCart/' + cartId, 
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
            import.meta.env.VITE_API_URL + '/cart/getCart/' + cartId
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
            import.meta.env.VITE_API_URL + '/cart/removeFromCart/' + cartId + '/' + index.toString(),
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

