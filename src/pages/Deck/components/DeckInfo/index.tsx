import React from 'react'
import { DeckData } from '../..'
import {
  DeckCardInfoNumber,
  DeckCardsInfo,
  DeckCardsInfoContainer,
  DeckCardsInfoTotalCards,
  DeckInfoContainer,
  DeckNameContainer,
  DeckTitle
} from './styles'

type DeckInfoProps = {
  deck: DeckData
}

export const DeckInfo: React.FC<DeckInfoProps> = ({ deck }) => {
  return (
    <DeckInfoContainer>
      <DeckNameContainer>
        <DeckTitle>{deck.name}</DeckTitle>
      </DeckNameContainer>
      <DeckCardsInfoContainer>
        <DeckCardsInfo>
          <p>Cards disponíveis</p>
          <DeckCardInfoNumber>
            {deck.cards.availableForStudyQuantity}
          </DeckCardInfoNumber>
        </DeckCardsInfo>
        <DeckCardsInfoTotalCards>
          <p>Total de cards</p>
          <DeckCardInfoNumber>{deck.cards.totalQuantity}</DeckCardInfoNumber>
        </DeckCardsInfoTotalCards>
      </DeckCardsInfoContainer>
    </DeckInfoContainer>
  )
}

export default DeckInfo
