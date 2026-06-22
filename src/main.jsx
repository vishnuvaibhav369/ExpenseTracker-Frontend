import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

createRoot(document.getElementById('root')).render(
    <strictMode>
        <Provider store={store}>
            <QueryClientProvider client={client}>
                <App />
            </QueryClientProvider>
        </Provider>
    </strictMode>
)