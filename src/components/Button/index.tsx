import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  secondary?: boolean
  textWhileLoading?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  secondary = false,
  textWhileLoading = 'Carregando...',
  ...props
}) => (
  <Container secondary={secondary} loading={loading} type="button" {...props}>
    {loading ? textWhileLoading : children}
  </Container>
)

export default Button
