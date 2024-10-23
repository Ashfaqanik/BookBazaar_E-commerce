import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";

function PaymentSuccess() {
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/getOrderHistory",
        {
          headers,
        }
      );
      const orders = res.data.data || [];
      if (orders.length > 0) {
        const mostRecentOrder = orders[0];

        const recentOrderId = mostRecentOrder._id;
        updateOrderStatus(recentOrderId, "Paid");
      }
    };
    fetch();
  }, []);
  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v1/updatePaymentStatus/${id}`,
        { status }, // sending the new status in the request body
        { headers }
      );
    } catch (error) {
      console.error("Failed to update payment status", error.response?.data);
    }
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <div className="mb-8 flex items-center justify-center">
          <FaCheckCircle className="text-green-500" size={96} />
        </div>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate("/profile/orderHistory")}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            View Order History
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
