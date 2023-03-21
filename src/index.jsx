import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import store from './store/store'
import './styles/normalize.css'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename='/DINARA_ProyectoBootcamp'>
                <AppRouter />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)