import React, { useState, useEffect } from 'react'

interface ActionButtonProps {
  isToggled: boolean
  onClick: () => void
  toggledClassName: string
  children: React.ReactNode
  className?: string
}

export function ActionButton({ 
  isToggled, 
  onClick, 
  toggledClassName, 
  children, 
  className = "" 
}: ActionButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isToggled) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isToggled])

  return (
    <button 
      onClick={onClick} 
      className={`p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${className}`}
    >
      <div className={`${isToggled ? toggledClassName : ''} ${isAnimating ? 'animate-icon-feedback' : ''}`}>
        {children}
      </div>
    </button>
  )
}
