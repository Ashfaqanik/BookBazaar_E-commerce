import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(20);
  const [discount, setDiscount] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetching the cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(
          "https://bookbazaar-e-commerce.onrender.com/api/v1/getCartItems",
          {
            headers,
          }
        );
        setCart(res.data.data);
      } catch (err) {
        console.error("Failed to fetch cart items", err);
      }
    };
    fetchCartItems();
  }, []);

  // Calculate total price and discount when cart changes
  useEffect(() => {
    if (cart && cart.length > 0) {
      // Calculate total price of items in the cart
      const total = cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(total);

      // Calculate total discount by summing up each item's discount value
      const totalDiscount = cart.reduce(
        (acc, item) => acc + (item.discount || 0),
        0
      );
      setDiscount(totalDiscount);
    } else {
      setTotal(0);
      setDiscount(0);
    }
  }, [cart]);
  const placeOrder = async () => {
    try {
      // First API call to place the order in your local system
      const placeOrderRes = await axios.post(
        "https://bookbazaar-e-commerce.onrender.com/api/v1/placeOrder",
        { order: cart },
        { headers }
      );

      // If the order is placed successfully, proceed with Stripe payment
      const stripe = await loadStripe(
        "pk_test_51QBwLbB3R7LrpDYh7pyjrGyMFR4j5bLoDJg4rvlN4HiTt1LEwbilBPfxenxROPoH78UDJVYb13r5PDpq2tEnlOGx00wS4BKXYB"
      );

      const body = {
        products: cart,
      };

      const headers1 = {
        "Content-Type": "application/json",
      };

      // Second API call to create a Stripe checkout session
      const response = await fetch(
        "https://bookbazaar-e-commerce.onrender.com/api/v1/create-checkout-session",
        {
          method: "POST",
          headers: headers1,
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      // Handle any errors that occur during the Stripe redirection
      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      alert("Order failed or payment error: " + error.message);
    }
  };

  // Delete item from cart
  const deleteItem = async (id) => {
    try {
      const response = await axios.put(
        `https://bookbazaar-e-commerce.onrender.com/api/v1/removeBookFromCart/${id}`,
        {},
        { headers }
      );
      alert(response.data.message);
      // Remove item from local state
      setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Failed to remove item from cart", err);
    }
  };

  // Calculate discounted total and final total with shipping
  const discountedTotal = total - discount;
  const finalTotal = discountedTotal + shippingCost;

  return (
    <div>
      {!cart && (
        <div className="h-screen mt-[1rem] flex items-center justify-center flex-col">
          <Loader />
        </div>
      )}

      {cart && cart.length === 0 && (
        <div>
          <h1 className="ml-3 mt-[4.2rem] text-3xl font-semibold text-zinc-700 mb-5">
            Your Cart
          </h1>
          <div className="mt-[3rem] flex items-center justify-center flex-col">
            <img
              src="/empty-cart.png"
              alt="empty-cart"
              className="lg:h-[50vh]"
            />
          </div>
        </div>
      )}

      {cart && cart.length > 0 && (
        <>
          <h1 className="ml-4 mt-[4rem] text-3xl font-semibold text-zinc-700 mb-5">
            Your Cart
          </h1>
          {cart.map((item, i) => (
            <div
              className="w-[65%] ml-16 md:ml-5 my-4 rounded-md flex flex-col md:flex-row p-4 bg-slate-200 justify-between items-center"
              key={i}
            >
              {/* Item Image */}
              <img
                src={item.url}
                alt={item.title}
                className="h-[20vh] md:h-[10vh] object-cover rounded-md"
              />

              {/* Item Details */}
              <div className="w-full md:w-auto md:flex-1 md:ml-4">
                <h1 className="text-2xl text-slate-800 font-semibold text-start mt-2 md:mt-0">
                  {item.title}
                </h1>
                <p className="text-normal text-slate-700 mt-2 hidden lg:block">
                  {item.desc.slice(0, 100)}...
                </p>
                <p className="text-normal text-slate-700 mt-2 hidden md:block lg:hidden">
                  {item.desc.slice(0, 65)}...
                </p>
                <p className="text-normal text-slate-700 mt-2 block md:hidden">
                  {item.desc.slice(0, 100)}...
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
                {/* Item Price */}
                <h2 className="text-2xl font-semibold text-slate-800 mb-2 md:mb-0">
                  ${item.price.toFixed(2)}
                </h2>

                {/* Delete Button */}
                <button
                  onClick={() => deleteItem(item._id)}
                  className="mt-2 md:mt-0 md:ml-8 flex items-center justify-center p-1.5 bg-slate-300 text-red-500 rounded-md hover:bg-slate-800"
                >
                  <AiFillDelete size={20} className="mx-1 my-1" />
                </button>
              </div>
            </div>
          ))}

          {/* Price Details Section - Fixed at the Top Right Corner (Desktop) */}
          <div
            className="mt-[4.5rem] fixed top-16 right-8 bg-slate-200 p-6 rounded-lg shadow-md w-[300px] h-auto lg:block hidden"
            style={{ zIndex: 1000 }}
          >
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Price Details
            </h2>
            <div className="flex justify-between text-lg mb-2">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg mb-2">
              <span>Discount:</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg mb-2">
              <span>Shipping Cost:</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-semibold mt-4 border-t pt-4">
              <span>Total Cost:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={placeOrder}
              className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Proceed to Checkout
            </button>
          </div>

          {/* Responsive Price Details Section for Mobile View */}
          <div className="mb-6 ml-10 relative w-[80%] bg-slate-200 p-6 rounded-t-lg shadow-md lg:hidden">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 text-center">
              Price Details
            </h2>
            <div className="flex justify-between text-lg mb-2">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg mb-2">
              <span>Discount:</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg mb-2">
              <span>Shipping Cost:</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-semibold mt-4 border-t pt-4">
              <span>Total Cost:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={placeOrder}
              className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
