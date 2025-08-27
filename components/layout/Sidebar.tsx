import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Home,
  BookOpen,
  FileText,
  BarChart2,
  Star,
  Bookmark,
  Bot,
  LibraryBig,
} from 'lucide-react'

export function Sidebar() {
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
    <div className="flex flex-col h-full border-r bg-background">
      <div className="p-6 flex items-center justify-center">
        <h1 className="logo-neon">Rota R1</h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md transition-colors shadow-card hover:shadow-card-hover ${
                isActive ? 'bg-accent text-primary' : 'hover:bg-accent/50'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            V
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium">Veterinário</p>
            <p className="text-xs text-muted-foreground truncate">
              Futuro Residente
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


