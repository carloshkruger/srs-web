import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Form = styled.form`
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;

  h1 {
    margin-bottom: 24px;
  }
`

export const Input = styled.input`
  flex: 1;
  background: transparent;
  color: #f4ede8;
`

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 24px;
`
