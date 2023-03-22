import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store from './store/store'
import {persistStore} from 'redux-persist'
import AppRouter from './routers/AppRouter'
import './styles/normalize.css'
import './styles/index.css'

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <PersistGate persistor={persistor}>
            <Provider store={store}>
                <BrowserRouter basename='/DINARA_ProyectoBootcamp'>
                    <AppRouter />
                </BrowserRouter>
            </Provider>
        </PersistGate>
    </React.StrictMode>,
)