import React from 'react'
import { cn } from '@/utils/helpers'

export const Loader: React.FC<{
  progress?: number
  text?: string
  className?: string
}> = ({ progress, text, className }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
      <div className="w-64 h-2 bg-[#1E293B] rounded-full overflow-hidden">
        {progress !== undefined && (
          <div
            className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        )}
      </div>
      
      {text && (
        <p className="text-sm text-[#CBD5E1] animate-pulse">{text}</p>
      )}
    </div>
  )
}
