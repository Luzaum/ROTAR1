import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
  X,
  Home,
  BookOpen,
  FileText,
  BarChart2,
  Star,
  Bookmark,
  Bot,
  LibraryBig,
} from 'lucide-react'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: <Home size={20} />,
    },
    {
      name: 'Estudo Direto',
      path: '/estudo',
      icon: <BookOpen size={20} />,
    },
    {
      name: 'Simulados',
      path: '/simulados',
      icon: <FileText size={20} />,
    },
    {
      name: 'Acervo',
      path: '/acervo',
      icon: <LibraryBig size={20} />,
    },
    {
      name: 'Estatísticas',
      path: '/estatisticas',
      icon: <BarChart2 size={20} />,
    },
    {
      name: 'Favoritas',
      path: '/favoritas',
      icon: <Star size={20} />,
    },
    {
      name: 'Salvas',
      path: '/salvas',
      icon: <Bookmark size={20} />,
    },
    {
      name: 'Dr. Luzaum',
      path: '/drluzaum',
      icon: <Bot size={20} />,
    },
  ]

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-background p-6 shadow-lg z-50 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="logo-neon text-lg">Rota R1</h1>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-accent">
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive ? 'bg-accent text-primary' : 'hover:bg-accent/50'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 pt-4 border-t">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              V
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Veterinário</p>
              <p className="text-xs text-muted-foreground truncate">
                Futuro Residente
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


