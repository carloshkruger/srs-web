import React from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { Card } from '../..'
import { ActionButton, ActionContainer, Item, TranslatedText } from './styles'

type CardItemProps = {
  card: Card
  toggleCardModal: (card: Card) => void
  toggleDeleteModal: (card: Card) => void
}

export const CardItem: React.FC<CardItemProps> = ({
  card,
  toggleCardModal,
  toggleDeleteModal
}) => {
  return (
    <Item>
      <div style={{ padding: '16px' }}>
        <p>{card.originalText}</p>
        <TranslatedText>{card.translatedText}</TranslatedText>
      </div>
      <ActionContainer>
        <ActionButton
          title="Alterar card"
          type="button"
          onClick={() => toggleCardModal(card)}
        >
          <FiEdit2 size={20} />
        </ActionButton>
        <ActionButton
          title="Excluir card"
          type="button"
          onClick={() => toggleDeleteModal(card)}
        >
          <FiTrash2 size={20} />
        </ActionButton>
      </ActionContainer>
    </Item>
  )
}

export default CardItem
