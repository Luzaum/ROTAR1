import React, { useState, useEffect, useRef } from 'react';

interface Props {
  isToggled: boolean;
  onClick: () => void;
  type: 'favorite' | 'save';
}

const contentConfig = {
  favorite: {
    offText: 'Favoritar',
    onText: 'Favoritado',
    toggledClasses: "border-amber-700 bg-amber-900/50 text-amber-200",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21 12 17.77 5.82 21 7 14.14 2 9.27 8.91 8.26 12 2" data-part="fill" className="opacity-0 transition-opacity duration-300" style={{ fill: 'currentColor' }} />
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21 12 17.77 5.82 21 7 14.14 2 9.27 8.91 8.26 12 2" style={{ strokeWidth: 1.5 }} />
      </svg>
    ),
  },
  save: {
    offText: 'Salvar',
    onText: 'Salvo',
    toggledClasses: "border-sky-700 bg-sky-900/50 text-sky-200",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
        <path d="M19 21l-7-4-7 4V5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3z" data-part="fill" className="opacity-0 transition-opacity duration-300" style={{ fill: 'currentColor' }} />
        <path d="M19 21l-7-4-7 4V5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3z" style={{ strokeWidth: 1.5 }} />
      </svg>
    ),
  },
};

export function ActionIconButton({ isToggled, onClick, type }: Props) {
  const { offText, onText, icon, toggledClasses } = contentConfig[type];
  const iconRef = useRef<HTMLSpanElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Efeito para garantir que o ícone reflita o estado (preenchido/vazio)
  useEffect(() => {
    if (iconRef.current) {
      const fillEl = iconRef.current.querySelector('[data-part="fill"]') as HTMLElement;
      if (fillEl) fillEl.style.opacity = isToggled ? '1' : '0';
    }
  }, [isToggled]);

  // Função de clique que dispara a ação e a animação
  const handleClick = () => {
    onClick();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 700); // Duração da animação "bounce" do Tailwind
  };

  const baseClasses = "group relative flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300 active:scale-[0.98]";
  const untoggledClasses = "border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white";

  return (
    <button type="button" aria-pressed={isToggled} onClick={handleClick} className={`${baseClasses} ${isToggled ? toggledClasses : untoggledClasses}`}>
      <span ref={iconRef} className={`relative inline-flex h-7 w-7 items-center justify-center rounded-lg ring-1 ring-inset ring-white/10 transition-transform duration-300 group-active:scale-90 ${isAnimating && isToggled ? 'animate-bounce' : ''}`}>
        {icon}
      </span>
      <div>
        <span className="block text-sm font-medium leading-none tracking-tight">{isToggled ? onText : offText}</span>
      </div>
    </button>
  );
}
