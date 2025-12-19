import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { ModalProvider } from './context/ModalContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ModalProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ModalProvider>
  </BrowserRouter>
)
