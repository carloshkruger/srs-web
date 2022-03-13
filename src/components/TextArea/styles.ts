import styled, { css } from 'styled-components'

interface ContainerProps {
  hasError: boolean
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  width: 100%;

  textarea {
    font-size: 16px;
    line-height: 28px;
    padding: 8px;
    width: 100%;
    border-radius: 4px;
    background-color: rgb(255, 255, 255);
    border: 1px solid #000;
    resize: vertical;

    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}
  }

  label {
    margin-bottom: 4px;

    ${(props) =>
      props.hasError &&
      css`
        color: #c53030;
      `}
  }
`

export const ErrorContainer = styled.span`
  font-size: 12px;
  color: #c53030;
`
