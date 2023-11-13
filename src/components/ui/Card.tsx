import styled from "styled-components";
import type { PropsWithChildren } from "react";
import Text from "components/ui/Text";

interface CardProps {
  style?: React.CSSProperties;
  img?: string;
  title?: string;
}
type ImgCardProps = Omit<CardProps, 'style' | 'title'>

const StyledCard = styled.div<CardProps>`
  min-height: 250px;
  max-width: 160px;
  width: 372px;
  background-color: #181818;
  padding: 15px;
  border-radius: 8px;
`;
const StyledImageCard = styled.img<ImgCardProps>`
  border-radius: 50%;
  margin: auto;
  width: 100%;
  height: auto;
`;

function Card({ children, style, img, title }: PropsWithChildren<CardProps>) {
  return (
    <StyledCard style={style}>
      <StyledImageCard src={img} />
      <Text>{title && title}</Text>
      {children}
    </StyledCard>
  );
}

export default Card;
