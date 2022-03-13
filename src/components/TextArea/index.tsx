import React, { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { Container, ErrorContainer } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormRegister<any>
  name: string
  label: string
  errorMessage?: string
}

const TextArea: React.FC<InputProps> = ({
  register,
  name,
  label,
  errorMessage = '',
  ...rest
}) => {
  const hasError = !!errorMessage

  return (
    <Container hasError={hasError}>
      <label>{label}</label>
      <textarea {...register(name)} {...rest} />
      {hasError && <ErrorContainer>{errorMessage}</ErrorContainer>}
    </Container>
  )
}

export default TextArea
