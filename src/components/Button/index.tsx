import React, { ButtonHTMLAttributes } from 'react'

import { Container, Spinner } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  secondary?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  secondary = false,
  ...props
}) => (
  <Container secondary={secondary} loading={loading} type="button" {...props}>
    {loading ? <Spinner /> : children}
  </Container>
)

export default Button
