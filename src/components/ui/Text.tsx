import styled from 'styled-components'
import type { PropsWithChildren } from 'react'

type textSize = 's' | 'm' | 'l'
type textWeight = "200" | "400" | "600" | "800";

export type textColor =
  | 'primary'
  | 'secondary'


interface TextProps {
  size?: textSize
  weight?: textWeight
  color?: textColor
  inverted?: boolean
  style?: React.CSSProperties
}

const handleSizeStyle = (size?: textSize) => {
  switch (size) {
    case 's':
      return { fontSize: '12px', lineHeight: '20px' }
    case 'm':
      return { fontSize: '14px', lineHeight: '22px' }
    case 'l':
      return { fontSize: '16px', lineHeight: '24px' }
  }
}


const handleColorStyle = (color?: textColor) => {
  switch (color) {
    case 'primary':
      return "#fff"
  }
}

const StyledText = styled.p<TextProps>`
  max-width: 700px;
  margin: 0;
  font-size: ${(props) => handleSizeStyle(props.size)?.fontSize};
  font-family: 'Poppins', sans-serif;
  line-height: ${(props) => handleSizeStyle(props.size)?.lineHeight};
  font-weight: ${(props) => (props.weight)};
  color: ${(props) => handleColorStyle(props.color)};
  white-space: pre-line;
`

function Text({
  children,
  size = 'm',
  weight = '400',
  color = 'primary',
  inverted = false,
  style,
}: PropsWithChildren<TextProps>) {
  return (
    <StyledText size={size} weight={weight} color={color} inverted={inverted} style={style}>
      {children}
    </StyledText>
  )
}

export default Text
