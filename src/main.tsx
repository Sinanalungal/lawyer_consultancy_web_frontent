import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ToastProvider } from './components/Toast/ToastManager.tsx';
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { LoaderProvider } from './components/GlobelLoader/GlobelLoader.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <LoaderProvider>
          <App />
        </LoaderProvider>
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
)
