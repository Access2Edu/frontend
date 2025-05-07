import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderWeb from "../../components/HeaderWeb";

import InitiatePayment from "../../InitiatePayment"; // Import InitiatePayment component

import { useAuth } from "../../AuthContext"; // Import useAuth hook



function AssessmentWeb() {
  const { student } = useAuth(); // Access the logged-in user's email
  //Slide
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  //Payment Button
  // const PayButton = () => {
  //   const handlePayment = async () => {
  //     try {
  //       const payload = {
  //         email: "user@example.com",
  //         amount: 5000,
  //         name: "John Doe",
  //       };
  //       const res = await initializePayment(payload);
  //       if (res.status === "success") {
  //         window.location.href = res.data.link;
  //       } else {
  //         alert("Payment initialization failed.");
  //       }
  //     } catch (err) {
  //       alert("Error initializing payment");
  //     }
  //   };
  //   return <button onClick={handlePayment} className="px-4 py-2 bg-[#78549d] cursor-pointer text-white rounded-lg">Pay with Flutterwave</button>;
  // };



  //Date and Time
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Day of week
  const dayOfWeek = dateTime
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  // Month, Day, Year
  const month = dateTime
    .toLocaleDateString("en-US", { month: "long" })
    .toUpperCase();
  const day = dateTime.getDate();
  const year = dateTime.getFullYear();

  //12-hour format AM/PM
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const ampm = hours >= 12 ? "AM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

  //Next Button
  const handleNext = () => {
    if (step < totalSteps) setStep((prev) => prev + 1);
  };

  //Back Button
  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  //Popup
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Slides Content
  const steps = [
    //Slide One
    <div
      key="1"
      className="bg-[#fcf8ef] p-12 rounded-xl shadow-[0px_1px_6px_0px_rgba(0,_0,_0,_0.1)]"
    >
      <h2 className="text-4xl font-bold mb-4 text-[#3d3d3d]">
        Welcome To Access2Edu Entrance Exam
      </h2>
      <p className="text-xl mb-6">
        Access2Edu is a special platform designed to give every child—regardless
        of their background or qualifications—a fair chance at quality
        education. We believe that every child deserves the opportunity to
        learn, grow, and succeed, no matter their circumstances.
      </p>
      <div className="mb-6">
        <p className="font-semibold mb-2">Here’s What to Expect:</p>
        <ul className="list-disc ml-5 space-y-1 text-gray-700">
          <li>The exam will take about 45 minutes.</li>
          <li>To take the exam, a registration fee of ₦2,000 is required.</li>
        </ul>
      </div>
      <p>Please click “Continue” to see payment details and proceed.</p>
    </div>,

    //Slide Two
    <div key="2">
      <div className="flex justify-self-center gap-4 ">
        <div className="grid gap-4 pb-12">
          <div className="p-6 bg-[#fcf8ef] rounded-2xl shadow-[0px_1px_6px_0px_rgba(0,_0,_0,_0.1)]">
            <p className="text-center pb-8 pt-4 font-semibold">
              PAYMENT SUMMARY
            </p>
            <div className="flex justify-self-center items-center gap-4 pb-14 ">
              <p>Assessment Payment</p>{" "}
              <p className="text-[#785491] text-2xl font-semibold">$5.00</p>
            </div>
            <div className="pb-6">
              <div className="pb-4 flex gap-4">
                <img src="/diamond.svg" alt="diamond-icon" />
                <p>Payment invoice</p>
              </div>
              <p>
                Access2Edu is changing the way students learn, no matter where
                they are. our platform{" "}
              </p>
            </div>
          </div>
          <div className="text-center bg-[#fcf8ef] rounded-2xl p-6 pb-2 shadow-[0px_1px_6px_0px_rgba(0,_0,_0,_0.1)]">
            <p className="pb-2">{dayOfWeek}</p>
            <p>
              {month} {day}, {year} | {formattedTime}
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 bg-red-100 text-center p-4 rounded-md mb-4">
              {errorMessage}
            </div>
          )}

          <InitiatePayment handleContinue={handleNext} />
          {/* <PayButton amount={2000} /> */}

          
        </div>
      </div>
    </div>,

    //Slide Three
    <div
      key="3"
      className="bg-[#fcf8ef] p-12 rounded-xl shadow-[0px_1px_6px_0px_rgba(0,_0,_0,_0.1)]"
    >
      <h2 className="text-4xl font-bold mb-4 text-[#3d3d3d]">
        You're About To Start To Begin Your Assessments
      </h2>
      <p className="text-xl mb-6">
        This assessment will evaluate both your technical and soft skills to
        create a comprehensive profile.
      </p>
      <div className="mb-6">
        <p className="font-semibold mb-2">What To Expect</p>
        <ul className="list-disc ml-5 space-y-1 text-gray-700">
          <li>The assessment will take approximately 30–35 minutes</li>
          <li>You'll complete a mix of technical and soft skills questions</li>
          <li>Read the essay to answer the question 1–15</li>
          <li>You'll receive an admission upon completion with good mark</li>
        </ul>
      </div>
    </div>,

    // Slide Four
    <div
      key="4"
      className="bg-[#fcf8ef] p-12 grid rounded-xl shadow-[0px_1px_6px_0px_rgba(0,_0,_0,_0.1)]"
    >
      <h2 className="text-4xl text-center font-bold mb-4 text-[#3d3d3d]">
        Read Essay <span className="text-[#642BBB]">Carefully</span>
      </h2>
      <p className="text-xl mb-6">
        Access2Edu is changing the way students learn, no matter where they are.
        our platform makes quality education accessible and engaging. But don’t
        just take our word for it, see what our students have to say! Ready to
        start your journey? Join us today.
      </p>
    </div>,
  ];

  return (
    <div>
      <div>
        <HeaderWeb />
      </div>
      <div className="min-h-screen bg-[#fffcf0] p-8 pt-10 flex flex-col  items-center justify-start">
        {/* Progress Bar */}
        <div className="w-full max-w-4xl mb-14">
          <div className="relative w-full bg-[#e7def0] h-3 rounded-full">
            <div
              className="absolute top-0 left-0 h-3 bg-[#785491] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
            <div
              className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-[#785491] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300"
              style={{ left: `${progress}%` }}
            >
              {Math.round(progress)}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className=" max-w-7xl  w-full">
          {steps[step - 1]}
          <div className="mt-8 flex justify-between">
            {step > 1 && step < 3 && (
              <button
                onClick={handleBack}
                className="bg-[#e7def0] text-[#785491] px-6 py-2 rounded-md font-semibold hover:bg-[#e4d5f3]"
              >
                Back
              </button>
            )}
            {step < totalSteps && (
              <button
                onClick={handleNext}
                className="bg-[#785491] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#e7def0] hover:text-[#3d3d3d]"
                
              >
                Continue
              </button>
            )}

            {step === totalSteps && (
              <button
                onClick={() => navigate("/exam-page")} //Navigate to Exam Page
                className="bg-[#785491] text-white px-6 py-2 rounded-md font-semibold justify-self-end hover:bg-[#e7def0] hover:text-[#3d3d3d]"
              >
                Start Exam
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentWeb;
