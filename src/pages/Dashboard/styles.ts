import styled from 'styled-components'
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
  max-width: 700px;
  height: 100vh;
`

export const DeckTitle = styled.h1`
  margin: 16px 0px;
`

export const Header = styled.header`
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  ul {
    display: flex;
    flex-direction: row;

    li {
      cursor: pointer;
      padding: 16px;
      list-style-type: none;
      margin: 0px 8px;

      &:hover {
        background: #ff9000;
      }
    }
  }
`
