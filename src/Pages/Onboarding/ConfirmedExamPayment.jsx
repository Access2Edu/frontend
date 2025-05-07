import React from "react";
import PaymentSuccess from "../../PaymentSuccess";



function ConfirmedExamPayment({ isOpen, onClose, handleContinue }) {
  if (!isOpen) return null;

  
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-gray-600/50 flex items-center justify-center z-50">
      <div className="grid justify-items-center rounded-2xl p-10 ml-4 mr-4 bg-[#fff5d1]">
        <img
          src="/success.png"
          alt="Success Image"
          className="w-fit flex max-w-md justify-self-center"
        />
        <h1 className="font-bold text-[#181818] text-4xl p-6">Confirmed!</h1>
        <p className="p-4 text-center text-[#464646]">
        <PaymentSuccess />
        </p>        

        <button
          onClick={() => {
            onClose();         // closes the modal
            handleContinue();  // moves to the next slide
        }}
          className="bg-[#785491] text-white px-6 py-4 w-full rounded-md font-semibold hover:bg-[#e7def0] hover:text-[#3d3d3d]"
          
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default ConfirmedExamPayment;
