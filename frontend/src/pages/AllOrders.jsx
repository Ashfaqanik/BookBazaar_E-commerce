import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllOrders() {
  const [allOrders, setAllOrders] = useState();
  const [loading, setLoading] = useState(false); // Loading state for updating order
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await axios.get(
          "https://bookbazaar-e-commerce.onrender.com/api/v1/getAllOrders",
          {
            headers,
          }
        );
        setAllOrders(res.data.data);
      } catch (err) {
        console.error("Failed to fetch orders", err.response?.data);
      }
    };
    fetchAllOrders();
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      setLoading(true);
      await axios.put(
        `https://bookbazaar-e-commerce.onrender.com/api/v1/updateOrderStatus/${id}`,
        { status }, // sending the new status in the request body
        { headers }
      );
      const updatedOrders = allOrders.map((order) =>
        order._id === id ? { ...order, status } : order
      );
      setAllOrders(updatedOrders); // Updating state with the new order status
      setLoading(false);
      toast.success("Order status updated successfully");
    } catch (error) {
      console.error("Failed to update order status", error.response?.data);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-2 px-2 md:px-5 bg-slate-100 text-slate-600">
      {!allOrders && (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {allOrders && allOrders.length > 0 && (
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-500 mb-4 text-center md:text-left">
            All Orders
          </h1>
          {/* Header Row */}
          <div className="mt-4 bg-slate-500 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[8%] text-xs md:text-sm">
              <h1 className="text-center text-white">Sr.</h1>
            </div>
            <div className="w-[15%] md:w-[25%] text-xs md:text-sm">
              <h1 className="text-center text-white">Books</h1>
            </div>
            <div className="hidden md:block w-[25%] text-xs md:text-sm">
              <h1 className="text-center text-white">Description</h1>
            </div>
            <div className="w-[15%] md:w-[10%] text-xs md:text-sm">
              <h1 className="text-center text-white">Price</h1>
            </div>
            <div className="w-[25%] md:w-[15%] text-xs md:text-sm">
              <h1 className="text-center text-white">User Info</h1>
            </div>
            <div className="w-[15%] text-xs md:text-sm">
              <h1 className="text-center text-white">Payment</h1>
            </div>
            <div className="w-[20%] text-xs md:text-sm">
              <h1 className="text-center text-white">Update Status</h1>
            </div>
          </div>
          {/* Order Rows */}
          {allOrders.map((item, i) => (
            <div
              key={i}
              className="text-slate-700 bg-slate-300 w-full rounded py-2 px-4 flex gap-2 mt-2 flex-wrap md:flex-nowrap"
            >
              <div className="w-[8%] text-xs md:text-sm">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[15%] md:w-[25%] text-xs md:text-sm">
                <h1 className="text-left md:text-center">{item.book.title}</h1>
              </div>
              <div className="hidden md:block w-[25%] text-xs md:text-sm">
                <h1 className="text-left md:text-center">
                  {item.book.desc.length > 70
                    ? `${item.book.desc.slice(0, 70)}...`
                    : item.book.desc}
                </h1>
              </div>
              <div className="w-[12%] md:w-[10%] text-xs md:text-sm ">
                <h1 className="text-center">{item.book.price}</h1>
              </div>
              <div className="w-[20%] md:w-[15%] text-xs md:text-sm ">
                <h1 className="text-left md:text-center">
                  <strong>Address:</strong> {item.user.address} <br />
                  <strong>Phone:</strong> {item.user.phoneNumber}
                </h1>
              </div>
              <div className="w-[15%] text-xs md:text-sm ">
                <h1 className="text-center">{item.payment}</h1>
              </div>
              <div className="md:w-[20%] w-[18%] text-xs md:text-sm ">
                <select
                  disabled={loading}
                  value={item.status}
                  onChange={(e) => updateOrderStatus(item._id, e.target.value)}
                  className={`border border-gray-300 p-1 rounded w-full ${
                    item.status === "Order Placed"
                      ? "text-green-600"
                      : item.status === "Cancelled"
                      ? "text-red-500"
                      : item.status === "Out for delivery"
                      ? "text-orange-400"
                      : "text-cyan-600"
                  }`}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllOrders;
