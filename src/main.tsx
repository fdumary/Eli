import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./app/App"
import './styles/index.css'

// Eli opens in its low-light theme by default, before React paints.
document.documentElement.classList.add('dark')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
