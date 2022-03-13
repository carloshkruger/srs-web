import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface ContainerProps {
  loading: boolean
  secondary: boolean
}

export const Container = styled.button<ContainerProps>`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  transition: background-color 0.2s;

  ${(props) =>
    props.loading &&
    css`
      cursor: default;
      opacity: 0.8;
    `}

  ${(props) =>
    props.secondary &&
    css`
      background: unset;
    `}

  ${(props) =>
    !props.loading &&
    !props.secondary &&
    css`
      &:hover {
        background: ${shade(0.2, '#ff9000')};
      }
    `}
`
