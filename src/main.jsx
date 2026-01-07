import React from 'react'
import ReactDOM from 'react-dom/client'
import { createAppKit } from '@reown/appkit/react'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { solana } from '@reown/appkit/networks'
import { 
  PhantomWalletAdapter, 
  SolflareWalletAdapter,
  TrustWalletAdapter,
  CoinbaseWalletAdapter
} from '@solana/wallet-adapter-wallets'
import App from './App'
import './App.css'

// Reown Project ID - get yours at https://cloud.reown.com
const projectId = '54c238a34c96e5cc31f27b0c6667a6ab'

// Solana wallets
const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
  new TrustWalletAdapter(),
  new CoinbaseWalletAdapter()
]

// Solana adapter
const solanaAdapter = new SolanaAdapter({
  wallets
})

// App metadata
const metadata = {
  name: 'GAMBLIUM',
  description: 'AI Agents for Responsible Gambling',
  url: 'https://gamblium.io',
  icons: ['https://gamblium.io/logo.png']
}

// Create AppKit
createAppKit({
  adapters: [solanaAdapter],
  networks: [solana],
  projectId,
  metadata,
  features: {
    analytics: false,
    email: true,
    socials: ['google', 'x', 'discord', 'github'],
    emailShowWallets: true
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#FF7A00',
    '--w3m-color-mix-strength': 20,
    '--w3m-accent': '#FF7A00',
    '--w3m-border-radius-master': '0px'
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
