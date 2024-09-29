import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState();
  const [total, setTotal] = useState(0);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:1000/api/v1/getCartItems", {
        headers,
      });
      setCart(res.data.data);
    };
    fetch();
  }, [headers]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const total = cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(total);
    } else {
      setTotal(0);
    }
  }, [cart]);

  const deleteItem = async (id) => {
    const response = await axios.put(
      `http://localhost:1000/api/v1/removeBookFromCart/${id}`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <div>
      {/* Loader for when the cart is not loaded */}
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
          <h1 className="ml-3 mt-[4rem] text-3xl font-semibold text-zinc-700 mb-5">
            Your Cart
          </h1>
          {cart.map((item, i) => (
            <div
              className="w-[80%] ml-9 md:ml-4 my-4 rounded-md flex flex-col md:flex-row p-4 bg-slate-200 justify-between items-center"
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

          {/* Total Price and Checkout Section */}
          <div className="flex justify-between w-[80%] ml-8 md:ml-4 mt-7 p-4 bg-slate-200 rounded-md shadow-md mb-7">
            <h2 className="text-2xl font-semibold text-slate-800">
              Total Price:
            </h2>
            <h2 className="text-2xl font-semibold text-slate-800">
              ${total.toFixed(2)}
            </h2>
          </div>
          <div className=" md:ml-5 w-[70%] md:w-[80%] mb-7">
            <button className="flex ml-auto px-6 py-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200">
              Place Your Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
