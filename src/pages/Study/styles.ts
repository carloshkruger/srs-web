import { FiArrowLeft } from 'react-icons/fi'
import styled, { css } from 'styled-components'
import Button from '../../components/Button'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Content = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  height: 100vh;
`

export const FlipCard = styled.div`
  margin-top: 40px;
  padding: 32px;
  width: 100%;
  height: 500px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`

interface FlipCardProps {
  isBackCardVisible: boolean
}

export const FlipCardFront = styled.div<FlipCardProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  ${(props) =>
    props.isBackCardVisible &&
    css`
      display: none;
    `}
`

export const FlipCardBack = styled.div<FlipCardProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${(props) =>
    !props.isBackCardVisible &&
    css`
      display: none;
    `}
`

export const TurnCardButtonContainer = styled.div`
  text-align: center;
  width: 100%;
`

export const TurnCardButton = styled(Button)`
  max-width: 200px;
`

export const FlipCardBackTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Text = styled.p`
  font-size: 40px;
  text-align: center;
`

export const FlipCardBackTextContainerOriginalText = styled(Text)`
  color: #858383;
  fontsize: 24px;
  marginbottom: 16px;
`

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`

export const DifficultyButton = styled(Button)`
  max-width: 200px;
`

export const GoBackIcon = styled(FiArrowLeft)`
  cursor: pointer;
  margin-bottom: 16px;
`

export const StudyCompletedContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`

export const StudyCompletedText = styled.p`
  font-size: 32px;
  margin-bottom: 16px;
`
