import styled from 'styled-components'
import Button from '../../components/Button'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

export const CardsTitle = styled.h2`
  margin: 32px 0px 16px 0px;
`

export const TranslatedText = styled.p`
  color: #858383;
`

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const CardItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 16px;
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

export const ActionButton = styled.button`
  background: unset;
  border: 0;
  flex: 1;
  padding-left: 32px;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  margin-top: 16px;
`

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 8px;
`

export const CloseButton = styled(Button)`
  max-width: 100px;
`

export const CreateButton = styled(Button)`
  max-width: 100px;
`

export const DeleteDeckButton = styled.button`
  background: unset;
  border: 0;
`

export const StudyButton = styled(Button)`
  max-width: 200px;
  align-self: center;
`
