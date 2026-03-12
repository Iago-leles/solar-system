// UI Types

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export type ModalSize = 'sm' | 'md' | 'lg' | 'full'

export interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  size?: ModalSize
  title?: string
}

export interface TooltipProps {
  children: React.ReactNode
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export interface CardProps {
  children: React.ReactNode
  hoverable?: boolean
  className?: string
}

export interface LoaderProps {
  progress?: number
  text?: string
}
