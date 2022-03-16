import styled from 'styled-components'

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 16px;
`

export const TranslatedText = styled.p`
  color: #858383;
`

export const ActionButton = styled.button`
  background: unset;
  border: 0;
  margin: 8px;
  flex: 1;
`

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 8px;
`
