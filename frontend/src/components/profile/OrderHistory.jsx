import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "https://bookbazaar-e-commerce.onrender.com/api/v1/getOrderHistory",
        {
          headers,
        }
      );
      setOrderHistory(res.data.data || []);
    };
    fetch();
  }, []);
  return (
    <div>
      {!orderHistory && (
        <div className="min-h-screen flex justify-center items-center">
          <Loader />
        </div>
      )}
      {orderHistory && orderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-700">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <img src="/no-order.png" alt="" className="h-[25vh] mb-8 " />
            <h1 className="text-3xl font-semibold text-slate-500 mb-8">
              No Order History
            </h1>
          </div>
        </div>
      )}
      {orderHistory && orderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-3 text-slate-600">
          <h1 className="text-3xl font-semibold text-slate-500 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-slate-500 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center text-white">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="text-center text-white">Books</h1>
            </div>
            <div className="w-[40%]">
              <h1 className="text-center text-white">Description</h1>
            </div>
            <div className="w-[9%]">
              <h1 className="text-center text-white">Price</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="text-center text-white">Status</h1>
            </div>
            <div className="w-none md:w-[10%] hidden md:block">
              <h1 className="text-center text-white">Payment</h1>
            </div>
          </div>
          {orderHistory.map((item, i) => (
            <div
              key={i}
              className="text-slate-700 bg-slate-300 w-full rounded py-2 px-4 flex gap-4"
            >
              <div className="w-[3%]">
                <h1 className="text-center ">{i + 1}</h1>
              </div>
              <div className="w-[30%] md:w-[22%]">
                <h1 className="text-left ">{item.book.title}</h1>
              </div>
              <div className="w-[40%]">
                <h1 className="text-left ">{item.book.desc.slice(0, 70)}...</h1>
              </div>
              <div className="w-[9%]">
                <h1 className="text-center">{item.book.price}</h1>
              </div>
              <div className="w-[16%]">
                <h1
                  className={`text-center font-light ${
                    item.status === "Order Placed"
                      ? "text-green-600"
                      : item.status === "Cancelled"
                      ? "text-red-500"
                      : "text-green-800"
                  }`}
                >
                  {item.status}
                </h1>
              </div>
              <div className="w-none md:w-[10%] hidden md:block">
                <h1 className="text-center text-slate-800">{item.payment}</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
