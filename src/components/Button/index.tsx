import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  ...props
}) => (
  <Container loading={loading} type="button" {...props}>
    {loading ? 'Carregando...' : children}
  </Container>
)

export default Button
