import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import api, { handleApiError } from '../../services/api'
import { Container, Form, ButtonContainer } from './styles'
import { Toast } from '../../services/Toast'

type FormData = {
  password: string
  confirmPassword: string
}

const validationSchema = yup
  .object({
    password: yup
      .string()
      .min(6, 'Nova senha deve possuir no mínimo 6 caracteres')
      .required('Nova senha é obrigatório'),
    confirmPassword: yup
      .string()
      .required('Confirmar senha é obrigatório')
      .oneOf([yup.ref('password'), null], 'Senhas não conferem')
  })
  .required()

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  })
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  async function onSubmit({ password }: FormData) {
    try {
      setLoading(true)

      await api.post('/v1/forgot-password/reset', {
        password,
        token: searchParams.get('token')
      })

      Toast.success('Senha redefinida com sucesso')
      navigate('/signin')
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Redefinir senha</h1>

        <Input
          name="password"
          label="Nova senha"
          type="password"
          register={register}
          errorMessage={errors.password?.message}
        />
        <Input
          name="confirmPassword"
          label="Confirmar senha"
          type="password"
          register={register}
          errorMessage={errors.confirmPassword?.message}
        />

        <ButtonContainer>
          <Button loading={loading} type="submit">
            Redefinir
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  )
}

export default ResetPassword
