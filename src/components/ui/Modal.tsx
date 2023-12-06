import ReactDOM from "react-dom";
import styled from "styled-components";
import type { PropsWithChildren } from "react";
import Overlay from "components/ui/Overlay";
import Cross from "components/icon/Cross";
import { COLOR_BLACK, COLOR_BLACK_LIGHT } from "utils/colors";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

const StyledModal = styled.div`
  font-size: 10px;
  position: absolute;
  top: 5vh;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: ${COLOR_BLACK};
  border-radius: 6px;
  width: 50vw;
  max-width: 80%;
  height: fit-content;
  height: 95vh;
  overflow: auto;
  cursor: default;
  box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
  transition: opacity 0.2s linear;
`;

const StyledModalCross = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  margin: 1em;
  z-index: 2;
  cursor: pointer;
  background-color: ${COLOR_BLACK_LIGHT};
  color: white;
  border-radius: 50%;
  height: 24px;
  padding: 12px;
  width: 24px;
  border: 0;
`;

function Modal({ children, opened, onClose }: PropsWithChildren<ModalProps>) {
  if (!opened) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <StyledModal
        role="dialog"
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <StyledModalCross className="close" onClick={onClose}>
          <Cross/>
        </StyledModalCross>
        {children}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

export default Modal;
