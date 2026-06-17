import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import { ErrorBoundary } from './components/core/ErrorBoundary.jsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
        <Toaster theme="dark" position="top-right" richColors />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
