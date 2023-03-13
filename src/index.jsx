import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routers/AppRouter'
import './styles/normalize.css'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter basename='/DINARA_ProyectoBootcamp'>
            <AppRouter />
        </BrowserRouter>
    </React.StrictMode>,
)