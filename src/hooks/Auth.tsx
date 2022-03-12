import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo
} from 'react'
import api from '../services/api'

interface User {
  id: string
  name: string
  email: string
  avatar_url: string
}

interface AuthState {
  token: string
  user: User
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  signIn(credentias: SignInCredentials): Promise<void>
  signOut(): void
  updateUser(user: User): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@SRSApp:token')
    const user = localStorage.getItem('@SRSApp:user')

    if (token && user) {
      api.defaults.headers.common.authorization = `Bearer ${token}`

      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('v1/auth', {
      email,
      password
    })

    const { token, user } = response.data

    localStorage.setItem('@SRSApp:token', token)
    localStorage.setItem('@SRSApp:user', JSON.stringify(user))

    api.defaults.headers.common.authorization = `Bearer ${token}`

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@SRSApp:token')
    localStorage.removeItem('@SRSApp:user')

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user
      })

      localStorage.setItem('@SRSApp:user', JSON.stringify(user))
    },
    [data.token]
  )

  const value = useMemo(
    () => ({ user: data.user, signIn, signOut, updateUser }),
    [data]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
