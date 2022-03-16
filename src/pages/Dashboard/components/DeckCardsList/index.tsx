import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DeckData } from '../..'
import {
  Container,
  CardItemContainer,
  CardItemTitle,
  CardItemNumbers
} from './styles'

interface DeckCardProps {
  decks: DeckData[]
}

const CardItem: React.FC<DeckData> = ({ deck, cards }) => {
  const moreThanOneAvailable = cards.availableForStudyQuantity > 1

  const navigate = useNavigate()

  const goToDeckPage = () => {
    navigate(`/decks/${deck.id}`)
  }

  return (
    <CardItemContainer onClick={goToDeckPage}>
      <CardItemTitle>{deck.name}</CardItemTitle>
      <CardItemNumbers>
        {cards.availableForStudyQuantity} card
        {moreThanOneAvailable ? 's' : ''} disponíve
        {moreThanOneAvailable ? 'is' : 'l'} / {cards.totalQuantity} no total
      </CardItemNumbers>
    </CardItemContainer>
  )
}

const DeckCardsList: React.FC<DeckCardProps> = ({ decks }) => {
  return (
    <Container>
      {decks.map((item) => (
        <CardItem key={item.deck.id} deck={item.deck} cards={item.cards} />
      ))}
    </Container>
  )
}

export default DeckCardsList
