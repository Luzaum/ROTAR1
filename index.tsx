
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { QuestionProvider } from './context/QuestionContext';
import './index.css';

// 1. Obter o container root
const container = document.getElementById('root');

// 2. Criar a raiz com a nova API
const root = createRoot(container!); // O "!" garante ao TypeScript que o container não é nulo

// 3. Renderizar o aplicativo dentro da raiz
root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QuestionProvider>
        <App />
      </QuestionProvider>
    </ThemeProvider>
  </React.StrictMode>
);
