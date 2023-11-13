import ReactDOM from 'react-dom'
import styled from 'styled-components'
import type { PropsWithChildren } from 'react'
import Overlay from 'components/ui/Overlay'
//import { COLOR_FONT_DARK, COLOR_FONT_LIGHT, COLOR_WHITE, COLOR_PRIMARY_5 } from 'utils/colors'

type size = 's' | 'm' | 'l'

interface ModalProps {
  opened: boolean
  onClose: () => void
  size?: size
}

type StyledModalProps = Pick<ModalProps, 'size'>

const handleSize = (size: size) => {
  switch (size) {
    case 's':
      return '300px'
    case 'm':
      return '550px'
    case 'l':
      return 'auto'
  }
}

const StyledModal = styled.div<StyledModalProps>`
  font-size: 10px;
  font-size: 1em;
  padding: 1em;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: "#fff";
  border: 2px solid #000;
  width: ${({ size = 'l' }) => handleSize(size)};
  max-width: 80%;
  max-height: 80vh;
  height: fit-content;
  border-radius: 0.5em;
  overflow: auto;
  cursor: default;
`

const StyledModalCross = styled.div`
  position: sticky;
  top: 0;
  float: right;
  background-color: #fff;
  color: #000;
  font-size: 1.5em;
  font-weight: bold;
  line-height: 0.7em;

  :hover {
    cursor: pointer;
  }
`

function Modal({ children, opened, size = 'm', onClose }: PropsWithChildren<ModalProps>) {
  if (!opened) return null

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <StyledModal
        role="dialog"
        onMouseDown={(e) => {
          e.stopPropagation()
        }}
        size={size}
      >
        <StyledModalCross className="close" onClick={onClose}>
          ×
        </StyledModalCross>
        {children}
      </StyledModal>
    </Overlay>,
    document.body,
  )
}

export default Modal
