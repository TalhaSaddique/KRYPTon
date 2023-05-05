import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { TransactionProvier } from './context/TransactionContext'

ReactDOM.createRoot(document.getElementById('root')).render(
<TransactionProvier>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </TransactionProvier>
)
