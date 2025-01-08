import { create } from 'zustand'

interface ChatStore {
  messages: any[]
  addMessage: (message: any) => void
  clearMessages: () => void
}

const useChatStore = create<ChatStore>(set => ({
  messages: [],
  addMessage: message =>
    set(state => ({
      messages: [...state.messages, message]
    })),
  clearMessages: () => set({ messages: [] })
}))

export default useChatStore
