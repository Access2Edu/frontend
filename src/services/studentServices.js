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

export const verifyPayment = (data) => api.post('/api/v1/payment/initiatePayment', data);

export const initiateBankPayment = (paymentData) =>
  api.post('/api/v1/students/card-payment', paymentData);



export const sendForgotPasswordOTP = (email) =>
  api.post('/api/v1/students/send-forgot-password-otp', { email });
export const forgotPassword = (otp, newPassword) =>
  api.post('/api/v1/admin/send-forgot-password-otp', { otp, newPassword });

export const googleAuth = (credentials) => api.post('/api/v1/students/google-auth', credentials);