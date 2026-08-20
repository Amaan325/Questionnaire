import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootElements = document.querySelectorAll('[data-quiz-root], #root')

rootElements.forEach((rootElement) => {
  const quiz = rootElement.getAttribute('quiz') || rootElement.dataset.quiz

  rootElement.classList.add('react-app-root-host')

  createRoot(rootElement).render(
    <StrictMode>
      <App quiz={quiz} />
    </StrictMode>,
  )
})
