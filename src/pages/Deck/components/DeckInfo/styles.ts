import styled from 'styled-components'

export const DeckTitle = styled.h1`
  font-size: 40px;
  padding-bottom: 16px;
`

export const DeckInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 16px 0px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

export const DeckNameContainer = styled.div`
  flex-grow: 3;
`

export const DeckCardsInfoContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    flex-direction: row;
    padding: 16px 0px;
    justify-content: space-evenly;
  }
`

export const DeckCardsInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const DeckCardsInfoTotalCards = styled(DeckCardsInfo)`
  padding-top: 16px;

  @media (max-width: 600px) {
    padding-top: 0px;
  }
`

export const DeckCardInfoNumber = styled.p`
  font-size: 24px;
`
