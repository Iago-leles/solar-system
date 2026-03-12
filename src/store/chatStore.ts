import { create } from 'zustand'
import { ChatMessage } from '@/types/portfolio'

interface ChatStore {
  messages: ChatMessage[]
  isTyping: boolean
  error: string | null
  isOpen: boolean
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  updateMessage: (id: string, content: string) => void
  setTyping: (isTyping: boolean) => void
  setError: (error: string | null) => void
  setOpen: (isOpen: boolean) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isTyping: false,
  error: null,
  isOpen: false,
  
  addMessage: (message) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    set((state) => ({ messages: [...state.messages, newMessage] }))
  },
  
  updateMessage: (id, content) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, content, status: 'complete' as const } : msg
      )
    }))
  },
  
  setTyping: (isTyping) => set({ isTyping }),
  
  setError: (error) => set({ error }),
  
  setOpen: (isOpen) => set({ isOpen }),
  
  clearMessages: () => set({ messages: [], error: null })
}))
