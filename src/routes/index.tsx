import React from 'react'
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

const Routes: React.FC = () => (
  <BrowserRouter>
    <ReactRoutes>
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
    </ReactRoutes>
  </BrowserRouter>
)

export default Routes
