import React from 'react';
import { initiatePayment } from '../../services/studentServices';

const PayButton = ({ email, amount }) => {
  const handlePayment = async () => {
    try {
      // Use initiatePayment from studentServices
      const res = await initiatePayment({ email, amount });
      const { publicKey, email: userEmail, amount: amt, ref } = res.data;

      const paystack = window.PaystackPop.setup({
        key: publicKey,
        email: userEmail,
        amount: amt * 100, // Paystack uses kobo
        currency: 'NGN',
        ref,
        callback: (response) => {
          alert('Payment complete! Reference: ' + response.reference);
          // Optionally, send response.reference to backend to verify
        },
        onClose: () => {
          alert('Payment window closed.');
        }
      });

      paystack.openIframe();
    } catch (err) {
      console.error('Error initiating payment:', err);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <button onClick={handlePayment} className="px-4 py-4 bg-[#785491] text-white rounded">
      Pay Now
    </button>
  );
};

export default PayButton;