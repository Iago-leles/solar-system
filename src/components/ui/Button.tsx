import React from 'react'
import { ButtonProps } from '@/types/ui'
import { cn } from '@/utils/helpers'

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantStyles = {
    primary: 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white focus:ring-[#8B5CF6]',
    secondary: 'bg-[#1E293B] hover:bg-[#334155] text-[#F1F5F9] focus:ring-[#334155]',
    ghost: 'bg-transparent hover:bg-[#1E293B] text-[#F1F5F9] focus:ring-[#334155]'
  }
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
