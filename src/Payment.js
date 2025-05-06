const BASE_URL = 'http://localhost:5000/api/flutterwave'; // Your Node.js backend URL
export const initializePayment = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/initialize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (error) {
    console.error('Payment init error:', error);
    throw error;
  }
};
export const verifyPayment = async (txRef) => {
  try {
    const response = await fetch(`${BASE_URL}/verify/${txRef}`);
    return await response.json();
  } catch (error) {
    console.error('Verification error:', error);
    throw error;
  }
};