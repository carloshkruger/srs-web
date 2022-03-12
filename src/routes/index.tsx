import React from 'react'
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom'
import AppProvider from '../hooks'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

const Routes: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <ReactRoutes>
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </ReactRoutes>
    </AppProvider>
  </BrowserRouter>
)

export default Routes
