import React, { useEffect, useRef } from 'react'
import { cn } from '@/utils/helpers'

export const Modal: React.FC<{
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}> = ({ isOpen, onClose, children, className }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  if (!isOpen) return null
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div
        ref={modalRef}
        className={cn(
          'relative bg-[#0F172A] border border-[#334155] rounded-lg shadow-2xl',
          'max-w-2xl w-full p-6 max-h-[90vh] overflow-y-hidden',
          'animate-in fade-in zoom-in duration-200',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
