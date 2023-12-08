import { useState } from 'react'

function useToggle(defaultValue = false) {
  const [bool, setBool] = useState(defaultValue)

  const toggle = () => {
    setBool((prev) => !prev)
  }

  return [bool, toggle] as [boolean, () => void]
}

export default useToggle