import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 16px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: auto;
  }
`

export const CardItemContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  cursor: pointer;
  padding: 16px;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`

export const CardItemTitle = styled.p`
  font-size: 24px;
  padding-bottom: 16px;
`

export const CardItemNumbers = styled.p`
  font-size: 14px;
  text-align: center;
`
