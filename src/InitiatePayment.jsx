import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PaymentSuccess from "./PaymentSuccess";


const InitiatePayment = ({ handleContinue }) => {
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const transactionId = query.get("transaction_id"); // Check for transaction_id in the URL


  

  // Function to handle payment initiation
  const handlePayment = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // JWT token from login
      const amount = 5000;
      const response = await axios.post(
        "/api/initiate-payment",
        { email, amount, paymentMethod },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Redirect to Flutterwave payment link
      window.location.href = response.data.paymentLink;
    } catch (err) {
      console.error("Payment initiation error:", err.response?.data || err.message);
      alert("Payment initiation failed.");
    } finally {
      setLoading(false);
    }
  };

  // Conditionally render PaymentSuccess if transactionId exists
  if (transactionId) {
    return <PaymentSuccess handleContinue={handleContinue} />;
  }

  return (
    <div className="text-center p-6 bg-[#e7def0] rounded-lg">
      <h2 className="px-4 py-2 mb-6">Make a Payment</h2>
      <div className="flex justify-around items-center">
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 bg-white rounded-md px-4 py-2 "
        />
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border border-gray-300 bg-white rounded-md px-4 py-2.5 "
        >
          <option value="card">Card</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="ussd">USSD</option>
        </select>
        <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-[#785491] text-white px-6 py-2 rounded-md font-semibold hover:text-[#3d3d3d] hover:bg-fuchsia-200"
        >
          {loading ? "Processing..." : "Pay ₦5000"}
        </button>
      </div>

     
    </div>
  );
};

export default InitiatePayment;