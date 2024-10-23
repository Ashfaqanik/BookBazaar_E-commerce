import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

function PaymentCancelled() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-700 mb-6">
          It looks like your payment was not processed. Please try again or
          choose another payment method.
        </p>
        <div className="mb-8 flex items-center justify-center">
          {/* Icon with custom size and color */}
          <FaTimesCircle className="text-red-500" size={96} />
        </div>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentCancelled;
