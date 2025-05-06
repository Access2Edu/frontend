import api from '../api';
export const registerStudent = (formData) => {
  return api.post('/api/v1/students/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
export const loginStudent = (credentials) => api.post('/api/v1/students/login', credentials);
export const logoutStudent = () => api.post('/api/v1/students/logout');
export const updateStudent = (studentId, data) =>
  api.post(`/api/v1/students/update-student/${studentId}`, data);
export const deleteStudent = (studentId) =>
  api.post(`/api/v1/students/delete-student/${studentId}`);
export const getAllSubjects = () => api.get('/api/v1/students/get-all-subject');

export const initiatePayment = (paymentData) =>
  api.post('/api/v1/payment/initiatePayment', paymentData);

export const verifySignupOTP = (data) => api.post('api/v1/students/verify-signup-otp', data);

export const initiateBankPayment = (paymentData) =>
  api.post('/api/v1/students/card-payment', paymentData);


export const sendSignUpOTP = (email) =>
  api.post('api/v1/students/send-signup-otp', { email });

export const verifyPayment = (data) => api.post('/api/v1/payment/initiatePayment', data);


export const sendForgotPasswordOTP = (email) =>
  api.post('/api/v1/students/send-forgot-password-otp', { email });
export const forgotPassword = (otp, newPassword) =>
  api.post('/api/v1/admin/send-forgot-password-otp', { otp, newPassword });


//Google Login
export const loginWithGoogle = async (idToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/google`, { idToken });
    return response.data;
  } catch (error) {
    console.error('Google Login Failed:', error.response?.data || error.message);
    throw error;
  }
};