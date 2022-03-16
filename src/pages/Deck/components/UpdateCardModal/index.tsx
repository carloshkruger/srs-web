import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Modal from '../../../../components/Modal'
import { ButtonContainer, CloseButton, CreateButton, Form } from './styles'
import api, { handleApiError } from '../../../../services/api'
import TextArea from '../../../../components/TextArea'
import { Toast } from '../../../../services/Toast'
import { Card } from '../..'

interface CardForm {
  originalText: string
  translatedText: string
}

interface UpdateCardModalProps {
  isOpen: boolean
  card: Card
  setIsOpen: () => void
  afterUpdateCard: (card: Card) => void
}

const validationSchema = yup
  .object({
    originalText: yup
      .string()
      .max(200, 'Texto original deve possuir no máximo 200 caracteres')
      .required('Texto original é obrigatório'),
    translatedText: yup.string().required('Texto traduzido é obrigatório')
  })
  .required()

const UpdateCardModal: React.FC<UpdateCardModalProps> = ({
  isOpen,
  card,
  setIsOpen,
  afterUpdateCard
}) => {
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    register,
    clearErrors,
    reset,
    setValue,
    formState: { errors }
  } = useForm<CardForm>({
    resolver: yupResolver(validationSchema)
  })

  setValue('originalText', card.originalText)
  setValue('translatedText', card.translatedText)

  const onCloseModal = () => {
    setIsOpen()
    clearErrors()
    reset()
  }

  const onUpdateCard = async (data: CardForm) => {
    try {
      setLoading(true)

      await api.put(`v1/cards/${card.id}`, { ...data, deckId: card.deckId })

      Toast.success('Card alterado com sucesso')
      onCloseModal()
      afterUpdateCard({ ...card, ...data })
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h2>Alterar card</h2>
      <Form onSubmit={handleSubmit(onUpdateCard)}>
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
            Alterar
          </CreateButton>
        </ButtonContainer>
      </Form>
    </Modal>
  )
}

export default UpdateCardModal
