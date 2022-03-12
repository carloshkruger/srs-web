import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import api, { handleApiError } from '../../services/api'
import {
  Container,
  Form,
  ButtonContainer,
  AlreadyHaveAccount,
  AlreadyHaveAccountLink
} from './styles'

type FormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const validationSchema = yup
  .object({
    name: yup.string().required('Nome é obrigatório'),
    email: yup
      .string()
      .email('E-mail inválido')
      .required('E-mail é obrigatório'),
    password: yup
      .string()
      .min(6, 'Senha deve possuir no mínimo 6 caracteres')
      .required('Senha é obrigatório'),
    confirmPassword: yup
      .string()
      .required('Confirmar senha é obrigatório')
      .oneOf([yup.ref('password'), null], 'Senhas não conferem')
  })
  .required()

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  })

  async function onSubmit(data: FormData) {
    try {
      setLoading(true)

      Reflect.deleteProperty(data, 'confirmPassword')

      await api.post('/v1/users', data)

      toast('Cadastro realizado com sucesso', {
        type: 'success'
      })

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
        <h1>Cadastro</h1>

        <Input
          name="name"
          label="Nome"
          type="text"
          register={register}
          errorMessage={errors.name?.message}
        />
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
        <Input
          name="confirmPassword"
          label="Confirmar senha"
          type="password"
          register={register}
          errorMessage={errors.confirmPassword?.message}
        />

        <ButtonContainer>
          <Button loading={loading} type="submit">
            Cadastrar
          </Button>
        </ButtonContainer>

        <AlreadyHaveAccount>
          Já possui uma conta?{' '}
          <AlreadyHaveAccountLink to="/signin">
            Fazer login
          </AlreadyHaveAccountLink>
        </AlreadyHaveAccount>
      </Form>
    </Container>
  )
}

export default SignUp
