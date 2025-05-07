import React from "react";
import "../../styles/global.css";

const FAQSection = () => {
  return (
    <section className="faq-section">
      <h2>Frequently asked Questions</h2>
      <div className="faq">
      <details>
          <summary>Who we are?</summary>
          <p>We are an online educational platform with a goal to make quality learning materials available and accesible to everyone, even in low-power environments or without a stable internet connection. We aim to ensure that students in underserved communities and beyond receive the resources they need to learn, with content that aligns with national and sub-national curricula and also connecting them to schools in their localities where they can take terminal examinations.</p>
        </details>
        <details>
          <summary>How much does Access2Edu cost?</summary>
          <p>N30,000 per Term.</p>
        </details>
        <details>
          <summary>How do our partnerships work?</summary>
          <p>We connect students to schools within their communities, where they can take terminal exams after taking their classes online, which in turn affords them the opportunity to have a certificate.</p>
        </details>
        <details>
          <summary>How do students interact with each other?</summary>
          <p>Students interaction happens through a dedicated chat room on the webapp.</p>
        </details>
        <details>
          <summary>How can I get my certificate?</summary>
          <p>Certificates will be made available to students by the school where they took their examinations.</p>
        </details>
      </div>
    </section>
  );
};

export default FAQSection;
