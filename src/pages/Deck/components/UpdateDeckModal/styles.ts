import styled from 'styled-components'
import Button from '../../../../components/Button'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  margin-top: 16px;
`

export const CloseButton = styled(Button)`
  max-width: 100px;
`

export const CreateButton = styled(Button)`
  max-width: 100px;
`
