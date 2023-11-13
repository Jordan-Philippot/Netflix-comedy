import styled from "styled-components";
import type { PropsWithChildren } from "react";

type titleSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type titleWeight = "200" | "400" | "600" | "800";

interface TitleProps {
  size?: titleSize;
  weight?: titleWeight;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLHeadingElement>;
}

const handleSizeStyle = (size?: titleSize) => {
  switch (size) {
    case "h1":
      return { fontSize: "32px", lineHeight: "35px" };
    case "h2":
      return { fontSize: "30px", lineHeight: "35px" };
    case "h3":
      return { fontSize: "28px", lineHeight: "30px" };
    case "h4":
      return { fontSize: "20px", lineHeight: "26px" };
    case "h5":
      return { fontSize: "18px", lineHeight: "24px" };
    case "h6":
      return { fontSize: "14px", lineHeight: "20px" };
  }
};

const StyledTitle = styled.h1<TitleProps>`
  cursor: ${(props) => (props.onClick ? "pointer" : "initial")};
  font-size: ${(props) => handleSizeStyle(props.size)?.fontSize};
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0;
  line-height: ${(props) => handleSizeStyle(props.size)?.lineHeight};
  font-weight: ${(props) => props.weight};
  color: white;
`;

function Title({
  children,
  size = "h1",
  weight = "400",
  style,
  onClick,
}: PropsWithChildren<TitleProps>) {
  return (
    <StyledTitle
      as={size}
      size={size}
      weight={weight}
      style={style}
      onClick={onClick}
    >
      {children}
    </StyledTitle>
  );
}

export default Title;
