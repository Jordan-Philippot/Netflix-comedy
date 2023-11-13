import styled from "styled-components";
import { COLOR_GREY_LIGHT, COLOR_WHITE } from "utils/colors";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  style?: React.CSSProperties;
  link?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  secondary?: boolean;
}

type StyledButtonProps = Omit<ButtonProps, "label" | "icon">;

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  font-size: 20px;
  padding: 5px 25px 5px 20px;
  margin-right: 10px;
  appearance: none;
  white-space: no-wrap;
  width: min-content;
  border: 0;
  border-radius: 4px;
  background-color: ${(props) =>
    props.secondary ? "rgba(109, 109, 110, 0.7)" : COLOR_WHITE};
  color: ${(props) => (props.secondary ? COLOR_WHITE : "#141414")};
  font-weight: 700;
  cursor: pointer;
  width: auto;
  svg {
    height: 100%;
    width: 100%;
    margin-right: 10px;
  }
  :hover {
    background-color: ${(props) =>
      props.secondary ? "rgba(109, 109, 110, 0.9)" : "#dedddc"};
  }

  :disabled {
    opacity: 0.2;
    cursor: default;
  }
`;

function Button({
  label,
  icon,
  disabled = false,
  onClick,
  style,
  link,
  secondary = false,
}: ButtonProps) {
  return (
    <StyledButton
      disabled={disabled}
      secondary={secondary}
      style={style}
      link={link}
      onClick={link ? () => (window.location.href = link) : onClick}
    >
      {icon} {label}
    </StyledButton>
  );
}

export default Button;
