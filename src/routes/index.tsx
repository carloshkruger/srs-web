import React from 'react'
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom'

import SignUp from '../pages/SignUp'

const Routes: React.FC = () => (
  <BrowserRouter>
    <ReactRoutes>
      <Route path="signup" element={<SignUp />} />
    </ReactRoutes>
  </BrowserRouter>
)

export default Routes
