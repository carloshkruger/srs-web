import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Modal from '../../../../components/Modal'
import { ButtonContainer, CloseButton, CreateButton, Form } from './styles'
import api, { handleApiError } from '../../../../services/api'
import TextArea from '../../../../components/TextArea'
import Select from '../../../../components/Select'
import { Toast } from '../../../../services/Toast'

interface CardForm {
  deckId: string
  originalText: string
  translatedText: string
}

interface Deck {
  id: string
  name: string
}

interface CreateCardModalProps {
  isOpen: boolean
  decks: Deck[]
  setIsOpen: () => void
  afterCreateCard: () => void
}

const validationSchema = yup
  .object({
    deckId: yup.string().required('Deck é obrigatório'),
    originalText: yup
      .string()
      .max(200, 'Texto original deve possuir no máximo 200 caracteres')
      .required('Texto original é obrigatório'),
    translatedText: yup.string().required('Texto traduzido é obrigatório')
  })
  .required()

const CreateCardModal: React.FC<CreateCardModalProps> = ({
  isOpen,
  decks,
  setIsOpen,
  afterCreateCard
}) => {
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    register,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<CardForm>({
    resolver: yupResolver(validationSchema)
  })

  const onCloseModal = () => {
    setIsOpen()
    clearErrors()
    reset()
  }

  const onCreateCard = async (data: CardForm) => {
    try {
      setLoading(true)

      await api.post('v1/cards', data)

      Toast.success('Card criado com sucesso')
      onCloseModal()
      afterCreateCard()
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h2>Criar card</h2>
      <Form onSubmit={handleSubmit(onCreateCard)}>
        <Select
          name="deckId"
          label="Deck"
          register={register}
          options={decks.map((deck) => ({
            name: deck.name,
            value: deck.id
          }))}
          errorMessage={errors.deckId?.message}
        />
        <TextArea
          name="originalText"
          label="Texto original"
          register={register}
          errorMessage={errors.originalText?.message}
        />
        <TextArea
          name="translatedText"
          label="Texto traduzido"
          register={register}
          errorMessage={errors.translatedText?.message}
        />

        <ButtonContainer>
          <CloseButton secondary onClick={onCloseModal} type="button">
            Fechar
          </CloseButton>
          <CreateButton loading={loading} type="submit">
            Criar
          </CreateButton>
        </ButtonContainer>
      </Form>
    </Modal>
  )
}

export default CreateCardModal
