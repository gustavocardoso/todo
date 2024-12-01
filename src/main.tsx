import { StrictMode } from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import Login from './components/Login.tsx'
import './index.css'

ReactDom.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
