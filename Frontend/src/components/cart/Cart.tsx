import React, { useEffect } from 'react';
import { Button } from '../ui';
import { Trash2 } from 'lucide-react';
import { CartItem } from '../services/Type.Services';
import { getCartItems, removeFromCart } from '../apis/Cart';
import { useNavigate } from 'react-router-dom';


const Cart: React.FC = () => {
  const [cartItems, setCartItems] = React.useState<CartItem[] | []>([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const response = await getCartItems();
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    if(cartItems.length === 0) {
      fetchItems();
    }
  },[])

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + parseInt(item.service.price);
  }, 0) || 0;

  const remove = async (index: number) => {
    try {
      await removeFromCart(index);
      setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };


  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      <div className="mx-auto px-6 sm:px-10 lg:px-14">
        <div className="lg:flex lg:gap-8">
          {/* Left Section: Shopping Cart Items */}
          <div className="lg:flex-1 mb-8 lg:mb-0 max-h-screen overflow-y-auto">
            <div className="mb-10">
              <h1 className="text-2xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                Shopping Cart
              </h1>
              <p className="text-sm lg:text-md text-gray-600 mt-2">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
                <p className="text-gray-700 text-lg lg:text-xl font-medium">Your cart is empty</p>
                <p className="text-gray-500 mt-3">
                  Discover our services and add some to your cart!{' '}
                  <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                    Browse now
                  </a>
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <h2 className="text-lg lg:text-xl font-bold text-gray-800">
                          {item.service.title}
                        </h2>
                        <div className="mt-3 text-gray-600">
                          <p className="text-md lg:text-lg font-medium">
                            {item.carDetails.carMake} {item.carDetails.carModel}{' '}
                            <span className="text-gray-500">({item.carDetails.year})</span>
                          </p>
                          <p className="text-xs lg:text-sm mt-1">
                            License:{' '}
                            <span className="font-medium">{item.carDetails.licensePlate}</span>
                          </p>
                        </div>
                        <ul className="mt-4 text-xs lg:text-sm text-gray-600 space-y-2">
                          {item.service.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-right">
                        <p className="text-lg lg:text-xl font-bold text-black">
                          Rs. {parseInt(item.service.price).toLocaleString()}
                        </p>
                        <Button
                          onClick={() => remove(index)}
                          className="mt-4 text-red-500 hover:text-red-600 text-xs lg:text-sm font-medium bg-transparent hover:bg-transparent cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            {cartItems.length > 0 && (
              <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-32">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">
                      Rs. {totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-gray-900 font-medium">Rs. 0</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">
                      Rs. {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => navigate('/book')}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold cursor-pointer"
                >
                  Proceed to Checkout
                </Button>
                <div className="mt-4 text-center">
                  <a href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Continue Browsing
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;