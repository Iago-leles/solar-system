import React, { useState } from 'react'
import { cn } from '@/utils/helpers'

export const Tooltip: React.FC<{
  children: React.ReactNode
  content: string
  position?: 'top' | 'bottom'
}> = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false)
  
  return (
    <div className="relative inline-block" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      
      {isVisible && (
        <div
          className={cn(
            'absolute left-1/2 -translate-x-1/2 px-3 py-1.5',
            'bg-[#0F172A] text-[#F1F5F9] text-sm rounded',
            'border border-[#334155] shadow-lg whitespace-nowrap z-50',
            'animate-in fade-in zoom-in-95 duration-200',
            position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}
