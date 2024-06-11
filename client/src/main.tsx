import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import AuthProvider from 'react-auth-kit/AuthProvider';
import createStore from 'react-auth-kit/createStore';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { StateMachineProvider, createStore as createWizardStore } from "little-state-machine";

const store = createStore({
  authName:'_auth',
  authType:'localstorage',
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <StateMachineProvider>
          {/* <DevTool /> */}
          <BrowserRouter>
            <MantineProvider>
              <App />
              <Toaster />
            </MantineProvider>
          </BrowserRouter>
        </StateMachineProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
