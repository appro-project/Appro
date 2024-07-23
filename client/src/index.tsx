import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import './reset.scss'
import './index.scss'
import {Provider} from 'react-redux'
import {store} from './redux/configure-store'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


// Create a client
const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
)
