import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Routes from './routes'

import './index.css'

const App: React.FC = () => {
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  )
}

export default App
