import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/Auth'

interface RouteProps {
  isPrivate?: boolean
  Component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  Component
}: RouteProps) => {
  const { user } = useAuth()

  return isPrivate === !!user ? (
    <Component />
  ) : (
    <Navigate to={isPrivate ? '/signin' : '/dashboard'} replace />
  )
}

export default Route

// const PrivateRoute: React.FC<RouteProps> = ({ Component }: any) => {
//   const { user } = useAuth()

//   return user ? <Component /> : <Navigate to="/signin" replace />
// }

// export default PrivateRoute
