import styled, { css } from 'styled-components'
import { shade } from 'polished'
import { FaSpinner } from 'react-icons/fa'

interface ContainerProps {
  loading: boolean
  secondary: boolean
}

export const Spinner = styled(FaSpinner)`
  animation: spin infinite 2s linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

export const Container = styled.button<ContainerProps>`
  background: #ff9000;
  height: 56px;
  min-height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  transition: background-color 0.2s;

  &[disabled] {
    cursor: default;
    opacity: 0.5;
  }

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
      &:enabled:hover {
        background: ${shade(0.2, '#ff9000')};
      }
    `}
`
