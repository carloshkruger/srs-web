import React from 'react'
import {
  BrowserRouter,
  Route as ReactRoute,
  Routes as ReactRoutes
} from 'react-router-dom'
import AppProvider from '../hooks'
import Dashboard from '../pages/Dashboard'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Route from './Route'

const Routes: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <ReactRoutes>
        <ReactRoute path="signup" element={<Route Component={SignUp} />} />
        <ReactRoute path="signin" element={<Route Component={SignIn} />} />
        <ReactRoute
          path="forgot-password"
          element={<Route Component={ForgotPassword} />}
        />
        <ReactRoute
          path="reset-password"
          element={<Route Component={ResetPassword} />}
        />
        <ReactRoute
          path="dashboard"
          element={<Route isPrivate Component={Dashboard} />}
        />
      </ReactRoutes>
    </AppProvider>
  </BrowserRouter>
)

export default Routes
