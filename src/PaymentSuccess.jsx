import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode }  from "jwt-decode"; // Ensure this package is installed
import ConfirmedExamPayment from "./Pages/Onboarding/ConfirmedExamPayment";

const PaymentSuccess = ({ handleContinue }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Extract transaction ID from URL and verify payment
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const transactionId = query.get("transaction_id");
    const token = localStorage.getItem("token");
    if (!transactionId || !token) {
      alert("Invalid payment session");
      return navigate("/");
    }
    const { id: studentId } = jwtDecode(token);
    axios
      .post(
        "/api/verify-payment",
        { transactionId, studentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert(res.data.message);
        setIsModalOpen(true); // Open the modal after successful verification
      })
      .catch((err) => {
        alert(
          "Verification failed: " + (err.response?.data?.message || err.message)
        );
        navigate("/");
      });
  }, [location, navigate]);

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose(); // Close the modal
  };

  

  return (
    <>
      <h2>Verifying your payment...</h2>
      <ConfirmedExamPayment
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleContinue={handleContinue}
      />
    </>
  );
};

export default PaymentSuccess;