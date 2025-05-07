import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
    return ( 
        <div className="flex flex-col items-center gap-4 justify-center min-h-screen">
            <h1 className="text-9xl font-extrabold mt-10 mb-10 text-[#78549d]">Oops!</h1>
            <h2 className="font-bold text-2xl">404 Not Found</h2>
            <p>The Page you are looking for is unavailable</p>
             <button className="bg-[#78549d] rounded-md px-6 py-2 text-white"> <Link to="/"> Go to Homepage </Link></button>              
        </div>
    );
}

export default NotFoundPage;