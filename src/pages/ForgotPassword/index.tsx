import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import Button from '../../components/Button'
import Input from '../../components/Input'
import api, { handleApiError } from '../../services/api'
import { Container, Form, ButtonContainer, BackToLoginLink } from './styles'

type FormData = {
  email: string
}

const validationSchema = yup
  .object({
    email: yup
      .string()
      .email('E-mail inválido')
      .required('E-mail é obrigatório')
  })
  .required()

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  })

  async function onSubmit(data: FormData) {
    try {
      setLoading(true)

      await api.post('/v1/forgot-password', data)

      reset({
        email: ''
      })
      toast(
        `Foi enviado um e-mail de recuperação de senha para "${data.email}"`,
        {
          type: 'success'
        }
      )
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Recuperar senha</h1>

        <Input
          name="email"
          label="E-mail"
          type="email"
          register={register}
          errorMessage={errors.email?.message}
        />

        <ButtonContainer>
          <Button loading={loading} type="submit">
            Recuperar
          </Button>
        </ButtonContainer>

        <BackToLoginLink to="/signin">Voltar ao login</BackToLoginLink>
      </Form>
    </Container>
  )
}

export default ForgotPassword
