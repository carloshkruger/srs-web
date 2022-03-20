import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Modal from '../../../../components/Modal'
import { ButtonContainer, CloseButton, CreateButton, Form } from './styles'
import api, { handleApiError } from '../../../../services/api'
import Input from '../../../../components/Input'
import { Toast } from '../../../../services/Toast'
import { DeckData } from '../..'

interface DeckForm {
  name: string
}

interface UpdateDeckModalProps {
  isOpen: boolean
  deck: DeckData
  afterUpdateDeck: (deckName: string) => void
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

const UpdateDeckModal: React.FC<UpdateDeckModalProps> = ({
  isOpen,
  deck,
  afterUpdateDeck,
  setIsOpen
}) => {
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    register,
    clearErrors,
    reset,
    setValue,
    formState: { errors }
  } = useForm<DeckForm>({
    resolver: yupResolver(validationSchema)
  })

  useEffect(() => {
    setValue('name', deck.name)
  }, [deck])

  const onCloseModal = () => {
    setIsOpen()
    clearErrors()
    reset()
  }

  const onUpdateDeck = async ({ name }: DeckForm) => {
    try {
      setLoading(true)

      await api.put(`v1/decks/${deck.id}`, { name })

      Toast.success('Deck alterado com sucesso')
      onCloseModal()
      afterUpdateDeck(name)
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h2>Alterar deck</h2>
      <Form onSubmit={handleSubmit(onUpdateDeck)}>
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
          <CreateButton loading={loading} type="submit">
            Alterar
          </CreateButton>
        </ButtonContainer>
      </Form>
    </Modal>
  )
}

export default UpdateDeckModal
