import styled from "styled-components";
import type { PropsWithChildren } from "react";
import {
  COLOR_BLACK_LIGHT,
  COLOR_TEXT_DARK,
  COLOR_WHITE,
} from "utils/colors";

type textSize = "s" | "m" | "l" | "xl";
type textWeight = "200" | "400" | "600" | "800";

export type textColor = "primary" | "secondary" | "dark";

interface TextProps {
  size?: textSize;
  weight?: textWeight;
  color?: textColor;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLParagraphElement>;
}

const handleSizeStyle = (size?: textSize) => {
  switch (size) {
    case "s":
      return { fontSize: "12px", lineHeight: "20px" };
    case "m":
      return { fontSize: "14px", lineHeight: "22px" };
    case "l":
      return { fontSize: "16px", lineHeight: "24px" };
    case "xl":
      return { fontSize: "20px", lineHeight: "28px" };
  }
};

const handleColorStyle = (color?: textColor) => {
  switch (color) {
    case "primary":
      return COLOR_WHITE;
    case "secondary":
      return COLOR_BLACK_LIGHT;
    case "dark":
      return COLOR_TEXT_DARK;
  }
};

const StyledText = styled.p<TextProps>`
  max-width: 700px;
  margin: 0;
  font-size: ${(props) => handleSizeStyle(props.size)?.fontSize};
  line-height: ${(props) => handleSizeStyle(props.size)?.lineHeight};
  font-weight: ${(props) => props.weight};
  color: ${(props) => handleColorStyle(props.color)};
  white-space: pre-line;
`;

function Text({
  children,
  size = "m",
  weight = "400",
  color = "primary",
  style,
  onClick
}: PropsWithChildren<TextProps>) {
  return (
    <StyledText size={size} weight={weight} color={color} style={style} onClick={onClick}>
      {children}
    </StyledText>
  );
}

export default Text;
