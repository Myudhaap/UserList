import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-responsive-modal/styles.css';
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux"
import {store} from "./store/store.tsx"
import {ApolloProvider} from "@apollo/client"
import { client } from './graphQl/apolloClient.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
)
