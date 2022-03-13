import React, { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { Container, ErrorContainer } from './styles'

interface SelectOptionProps {
  name: string
  value: string
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  register: UseFormRegister<any>
  name: string
  options: SelectOptionProps[]
  label: string
  errorMessage?: string
}

const Select: React.FC<SelectProps> = ({
  register,
  name,
  label,
  options,
  errorMessage = '',
  ...rest
}) => {
  const hasError = !!errorMessage

  return (
    <Container hasError={hasError}>
      <label>{label}</label>
      <select {...register(name)} {...rest}>
        {options.length !== 1 && <option value="">Selecione</option>}
        {options.map(({ value, name: title }) => (
          <option key={value} value={value}>
            {title}
          </option>
        ))}
      </select>
      {hasError && <ErrorContainer>{errorMessage}</ErrorContainer>}
    </Container>
  )
}

export default Select
