import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'

import { createAppKit } from '@reown/appkit/react'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { solana } from '@reown/appkit/networks'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'

// Reown Project ID
const projectId = '7662cc5ceefa07b3a634d6373df5cd4f'

// Solana adapter
const solanaAdapter = new SolanaAdapter({
  wallets: [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter()
  ]
})

// Metadata
const metadata = {
  name: 'DaimonLuck',
  description: 'AI-Powered Gambling Assistant',
  url: 'https://daimonluck-wallet.vercel.app',
  icons: ['https://daimonluck-wallet.vercel.app/logo.png']
}

// Create AppKit
createAppKit({
  adapters: [solanaAdapter],
  networks: [solana],
  projectId,
  metadata,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#FF7A00',
    '--w3m-color-mix': '#000000',
    '--w3m-color-mix-strength': 40,
    '--w3m-border-radius-master': '0px'
  },
  features: {
    analytics: false,
    email: true,
    socials: ['google', 'x', 'discord', 'github']
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
