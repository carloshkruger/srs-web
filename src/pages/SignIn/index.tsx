import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'

import {
  Container,
  Form,
  ButtonContainer,
  ForgotPasswordLink,
  DontHaveAccount,
  DontHaveAccountLink
} from './styles'
import { handleApiError } from '../../services/api'
import { useAuth } from '../../hooks/Auth'

type FormData = {
  email: string
  password: string
}

const validationSchema = yup
  .object({
    email: yup
      .string()
      .email('E-mail inválido')
      .required('E-mail é obrigatório'),
    password: yup
      .string()
      .min(6, 'Senha deve possuir no mínimo 6 caracteres')
      .required('Senha é obrigatório')
  })
  .required()

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  })
  const { signIn } = useAuth()
  const navigate = useNavigate()

  async function onSubmit(data: FormData) {
    try {
      setLoading(true)
      await signIn(data)
      navigate('/dashboard')
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>

        <Input
          name="email"
          label="E-mail"
          type="email"
          register={register}
          errorMessage={errors.email?.message}
        />
        <Input
          name="password"
          label="Senha"
          type="password"
          register={register}
          errorMessage={errors.password?.message}
        />
        <ForgotPasswordLink to="/forgot-password">
          Esqueci minha senha
        </ForgotPasswordLink>

        <ButtonContainer>
          <Button loading={loading} type="submit">
            Entrar
          </Button>
        </ButtonContainer>

        <DontHaveAccount>
          Ainda não possui uma conta?{' '}
          <DontHaveAccountLink to="/signup">Criar conta</DontHaveAccountLink>
        </DontHaveAccount>
      </Form>
    </Container>
  )
}

export default SignIn
