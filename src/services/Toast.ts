import { toast } from 'react-toastify'

export class Toast {
  static success(message: string) {
    return toast(message, { type: 'success' })
  }

  static warning(message: string) {
    return toast(message, { type: 'warning' })
  }

  static error(message: string) {
    return toast(message, { type: 'error' })
  }
}
