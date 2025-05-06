import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import App from './App';
import Login from './Pages/Auth/Login/Login';
import Signup from './Pages/Auth/Signup/Signup';
import NotFoundPage from './Pages/NotFoundPage';
import ForgotPassword from './Pages/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './Pages/Auth/ResetPassword/ResetPassword';
import Onboarding from './Pages/Onboarding/Onboarding';
import Assessment from './Pages/Onboarding/Assessment';
import SignupConfirmation from './Pages/Auth/Signup/SignupConfirmation';
import SelectClasses from './Pages/Onboarding/SelectClasses';
import ExamPage from './Pages/Onboarding/ExamPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import DashboardPage from './Pages/Dashboard/DashboardPage';
import SubjectsPage from './Pages/Dashboard/SubjectsPage';
import TimeTable from './Pages/Dashboard/TimeTable';
import VideoRecord from './Pages/Dashboard/VideoRecord';
import Result from './Pages/Dashboard/Result';
import Fees from './Pages/Dashboard/Fees';
import Settings from './Pages/Dashboard/Settings';
import ProtectedRoute from './ProtectedRoute';


// Import global styles
import './styles/global.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/signup-confirmation',
    element: <SignupConfirmation />,
  },
  {
      path: '/select-classes',
      element: (
        <ProtectedRoute>
          <SelectClasses />
        </ProtectedRoute>
      ),
  },
  
  {
    path: '/onboarding',
    element: (
      <ProtectedRoute>
        <Onboarding />
      </ProtectedRoute>
    ),
  },
  {
    path: '/assessment',
    element: (
      <ProtectedRoute>
        <Assessment />
      </ProtectedRoute>
    ),
  },
  {
    path: '/exam-page',
    element: (
      <ProtectedRoute>
        <ExamPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />, 
      },
      {
        path: 'subjects-page',
        element: <SubjectsPage />, 
      },
      {
        path: 'timetable-page',
        element: <TimeTable />,
      },
      {
        path: 'video-record-page',
        element: <VideoRecord/>,
      },
      {
        path: 'result-page',
        element: <Result />,
      },
      {
        path: 'fees-page',
        element: <Fees />,
      },
      {
        path: 'settings-page',
        element: <Settings />,
      }
    ]
  },
 
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

