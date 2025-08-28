import React, { useState, useEffect } from 'react';

interface Props {
  isToggled: boolean;
  onClick: () => void;
  toggledClassName: string;
  children: React.ReactNode;
}

export function ActionButton({ isToggled, onClick, toggledClassName, children }: Props) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isToggled) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isToggled]);

  return (
    <button onClick={onClick} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
      <div className={`${isToggled ? toggledClassName : ''} ${isAnimating ? 'animate-icon-feedback' : ''}`}>
        {children}
      </div>
    </button>
  );
}
