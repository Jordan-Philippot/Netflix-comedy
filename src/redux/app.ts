import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Message {
  text: string
  status: Status
  date: number
}

export type Status = 'default' | 'success' | 'warning' | 'error'

interface AppStateProps {
  messages: Message[]
}

const initialState = { messages: [] } as AppStateProps

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    createMessage(state, action: PayloadAction<{ text: string; status: Status }>) {
      state.messages.push({ ...action.payload, date: new Date().getTime() })
    },
  },
})

export const { createMessage } = appSlice.actions
export default appSlice.reducer
