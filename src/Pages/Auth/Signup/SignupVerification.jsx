import React from 'react';
import SignupVerificationWeb from './SignupVerificationWeb';
import SignupVerificationMobile from './SignupVerificationMobile';


import './Signup.css';

function SignupVerification() {
    return (
        <div>
            <div>
                <div className="webView">
                    <SignupVerificationWeb />
                </div>
                <div className="mobileView">
                   <SignupVerificationMobile />
                </div>
            </div>                 

        </div>
    );
}

export default SignupVerification;