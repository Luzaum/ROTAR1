
import React from 'react'
import './index.css'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { ThemeProvider } from './components/theme/ThemeProvider'

render(
  <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root'),
)
