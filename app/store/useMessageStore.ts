'use client'
import { create } from 'zustand'

interface MessageState {
  message: string
  setMessage: (msg: string) => void
  resetMessage: () => void // Function to reset the message
}

// Zustand store for message input
const useMessageStore = create<MessageState>(set => ({
  message: '',
  setMessage: (msg: string) => set({ message: msg }),
  resetMessage: () => set({ message: '' }) // Reset the message to an empty string
}))

export default useMessageStore
