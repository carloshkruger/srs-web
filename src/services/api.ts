import axios from 'axios'
import { toast } from 'react-toastify'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001'
})

export default api

const extractMessageFromError = (error: any): string => {
  const errorMessage = error?.response?.data?.error

  if (errorMessage) {
    return Array.isArray(errorMessage) ? errorMessage.join(' ') : errorMessage
  }

  return error.message
}

export const handleApiError = (error: any): void => {
  toast(extractMessageFromError(error), {
    type: 'error'
  })
}
