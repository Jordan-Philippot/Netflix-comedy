import { COLOR_BLACK, COLOR_WHITE } from 'utils/colors'

export default function Cross({ inverted }: { inverted?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      id="times"
      className="deletion-cross"
    >
      <path
        fill={inverted ? COLOR_WHITE : COLOR_BLACK}
        d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
      >
        {''}
      </path>
    </svg>
  )
}
