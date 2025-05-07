import React from "react";

const UserPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Access2Edu – User Policy Agreement</h1>
      <p className="mb-4 font-medium">Effective Date: [May 7, 2025]</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. User Eligibility</h2>
      <p className="mb-2">Access2Edu is open to:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Individuals aged 13 and above. Users under 18 must obtain consent from a parent or guardian.</li>
        <li>Educational institutions, teachers, and organizations operating in Nigeria or affiliated with Nigerian educational systems.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Account Creation and Security</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Users must register with a valid email address or phone number.</li>
        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
        <li>Notify us immediately at <a href="mailto:support@access2edu.ng" className="text-blue-600 underline">support@access2edu.ng</a> in the event of unauthorized use of your account.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Permitted Use</h2>
      <p className="font-medium mb-1">Users may:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Access video lessons, assessments, and educational tools for personal or classroom learning.</li>
        <li>Submit assignments, communicate with instructors, and participate in discussions.</li>
      </ul>
      <p className="font-medium mb-1">Users may not:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Share login credentials or access accounts that are not theirs.</li>
        <li>Upload or distribute content that is harmful, offensive, or infringes intellectual property rights.</li>
        <li>Interfere with the operation of the platform or engage in activities that violate Nigerian laws or regulations.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Content Ownership</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>All educational content is either owned by Access2Edu or licensed to us.</li>
        <li>Users retain ownership of original content they upload but grant Access2Edu a royalty-free license to use, reproduce, and display such content in connection with the platform.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Privacy & Protection</h2>
      <p className="mb-4">Access2Edu complies with the Nigeria Data Protection Act (NDPA):</p>
      <ul className="list-disc pl-6 mb-4">
        <li>We collect only necessary user data (e.g., name, contact details, activity logs).</li>
        <li>User data is stored securely and will not be sold or shared without consent.</li>
        <li>Users have the right to access, modify, or delete their data. Requests can be made via <a href="mailto:privacy@access2edu.ng" className="text-blue-600 underline">privacy@access2edu.ng</a>.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. User Conduct</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Treat instructors and other users with respect.</li>
        <li>Avoid cyberbullying, harassment, or disruptive behavior on the platform.</li>
        <li>Use appropriate language in comments, forums, and assignments.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Service Availability</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Access2Edu aims for 99.9% uptime but does not guarantee uninterrupted service.</li>
        <li>Maintenance or updates may temporarily affect access. Users will be notified in advance where possible.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Termination</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Access2Edu reserves the right to suspend or terminate accounts that violate these policies.</li>
        <li>Users may also request account deletion at any time.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Limitation of Liability</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Access2Edu is not liable for academic outcomes or third-party content shared by users.</li>
        <li>We do not guarantee the accuracy of user-generated content.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">10. Amendments</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Policies may be updated periodically to align with legal or operational changes.</li>
        <li>Users will be notified via email or platform notification before major changes take effect.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Information</h2>
      <p>
        For support or inquiries, please contact: <br />
        📧 <a href="mailto:support@access2edu.ng" className="text-blue-600 underline">support@access2edu.ng</a><br />
        📞 <a href="tel:+2349112465677">090 1124 6577</a>
      </p>
    </div>
  );
};

export default UserPolicy;
