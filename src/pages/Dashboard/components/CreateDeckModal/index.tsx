import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import Modal from '../../../../components/Modal'
import { ButtonContainer, CloseButton, CreateButton, Form } from './styles'
import api, { handleApiError } from '../../../../services/api'
import Input from '../../../../components/Input'

interface DeckForm {
  name: string
}

interface CreateDeckModalProps {
  isOpen: boolean
  afterCreateDeck: () => void
  setIsOpen: () => void
}

const validationSchema = yup
  .object({
    name: yup
      .string()
      .max(50, 'Nome deve possuir no máximo 50 caracteres')
      .required('Nome é obrigatório')
  })
  .required()

const CreateDeckModal: React.FC<CreateDeckModalProps> = ({
  isOpen,
  afterCreateDeck,
  setIsOpen
}) => {
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    register,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<DeckForm>({
    resolver: yupResolver(validationSchema)
  })

  const onCloseModal = () => {
    setIsOpen()
    clearErrors()
    reset()
  }

  const onCreateDeck = async ({ name }: DeckForm) => {
    try {
      setLoading(true)

      await api.post('v1/decks', { name })

      toast('Deck criado com sucesso', { type: 'success' })
      onCloseModal()
      afterCreateDeck()
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h2>Criar deck</h2>
      <Form onSubmit={handleSubmit(onCreateDeck)}>
        <Input
          name="name"
          label="Nome"
          register={register}
          errorMessage={errors.name?.message}
          placeholder="Ex: Deck geral"
        />

        <ButtonContainer>
          <CloseButton secondary onClick={onCloseModal} type="button">
            Fechar
          </CloseButton>
          <CreateButton
            textWhileLoading="Criando..."
            loading={loading}
            type="submit"
          >
            Criar
          </CreateButton>
        </ButtonContainer>
      </Form>
    </Modal>
  )
}

export default CreateDeckModal
