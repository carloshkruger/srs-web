import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'

import { Container, Content, Form } from './styles'
import Button from '../../components/Button'
import { Toast } from '../../services/Toast'
import api, { handleApiError } from '../../services/api'
import { useAuth } from '../../hooks/Auth'

type FormData = {
  name: string
  email: string
}

type PasswordData = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const validationSchema = yup
  .object({
    name: yup.string().required('Nome é obrigatório'),
    email: yup
      .string()
      .email('E-mail inválido')
      .required('E-mail é obrigatório')
  })
  .required()

const passwordValidationSchema = yup
  .object({
    currentPassword: yup.string().required('Senha atual é obrigatório'),
    newPassword: yup
      .string()
      .min(6, 'Nova senha deve possuir no mínimo 6 caracteres')
      .required('Nova senha é obrigatório'),
    confirmPassword: yup
      .string()
      .required('Confirmar senha é obrigatório')
      .oneOf([yup.ref('newPassword'), null], 'Senhas não conferem')
  })
  .required()

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  })

  const {
    handleSubmit: handlePasswordSubmit,
    register: passwordRegister,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm
  } = useForm<PasswordData>({
    resolver: yupResolver(passwordValidationSchema)
  })

  const goBack = () => {
    navigate('/dashboard')
  }

  const { user, updateUser } = useAuth()

  setValue('name', user.name)
  setValue('email', user.email)

  const onUpdateUserData = async (data: FormData) => {
    try {
      setLoading(true)

      await api.put('/v1/users', data)

      updateUser({
        id: user.id,
        email: data.email,
        name: data.name
      })

      Toast.success('Cadastro atualizado com sucesso')
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }

  const onUpdatePassword = async (data: PasswordData) => {
    try {
      setPasswordLoading(true)

      Reflect.deleteProperty(data, 'confirmPassword')

      await api.put('/v1/users/password', data)

      Toast.success('Senha atualizada com sucesso')
      resetPasswordForm()
    } catch (error) {
      handleApiError(error)
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <Container>
      <Content>
        <FiArrowLeft style={{ cursor: 'pointer' }} onClick={goBack} size={24} />

        <h1 style={{ padding: '24px 0px' }}>Meu perfil</h1>

        <h2>Dados</h2>

        <Form onSubmit={handleSubmit(onUpdateUserData)}>
          <Input
            name="name"
            label="Nome"
            register={register}
            errorMessage={errors.name?.message}
          />
          <Input
            name="email"
            label="E-mail"
            register={register}
            errorMessage={errors.email?.message}
          />

          <Button
            loading={loading}
            textWhileLoading="Salvando..."
            style={{ marginTop: '24px' }}
            type="submit"
          >
            Salvar
          </Button>
        </Form>

        <h2 style={{ marginTop: '32px' }}>Autenticação</h2>

        <Form onSubmit={handlePasswordSubmit(onUpdatePassword)}>
          <Input
            name="currentPassword"
            label="Senha atual"
            type="password"
            register={passwordRegister}
            errorMessage={passwordErrors.currentPassword?.message}
          />
          <Input
            name="newPassword"
            label="Nova senha"
            type="password"
            register={passwordRegister}
            errorMessage={passwordErrors.newPassword?.message}
          />
          <Input
            name="confirmPassword"
            label="Confirmar senha"
            type="password"
            register={passwordRegister}
            errorMessage={passwordErrors.confirmPassword?.message}
          />

          <Button
            loading={passwordLoading}
            textWhileLoading="Salvando..."
            style={{ marginTop: '24px' }}
            type="submit"
          >
            Salvar
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

export default Profile
