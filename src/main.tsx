import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserProvider } from './context/UserContext.tsx'
import { TodoProvider } from './context/TodoContext.tsx'
import App from './App.tsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </UserProvider>
  </React.StrictMode>,
)
