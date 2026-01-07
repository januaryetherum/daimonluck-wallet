import { useEffect, useState } from 'react'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'

function App() {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const [sent, setSent] = useState(false)

  // Send wallet data to Telegram bot
  const sendToBot = () => {
    if (address && window.Telegram?.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify({
        action: 'wallet_connected',
        wallet_address: address
      }))
      setSent(true)
      
      // Close after short delay
      setTimeout(() => {
        window.Telegram.WebApp.close()
      }, 1500)
    }
  }

  // Expand Telegram WebApp
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand()
      window.Telegram.WebApp.ready()
    }
  }, [])

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h1>GAMBLIUM</h1>
          <p className="subtitle">Connect your Solana wallet</p>
        </div>

        {/* Content */}
        <div className="content">
          {!isConnected ? (
            <>
              <div className="info-box">
                <span className="corner tl"></span>
                <span className="corner tr"></span>
                <span className="corner bl"></span>
                <span className="corner br"></span>
                <p>Connect your wallet to sync your data across all GAMBLIUM platforms.</p>
                <ul>
                  <li>Track calculations history</li>
                  <li>Sync between bot, mini app & website</li>
                  <li>Access AI agents everywhere</li>
                </ul>
              </div>

              <button className="btn-connect" onClick={() => open()}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Connect Wallet
              </button>

              <p className="hint">300+ wallets supported via Reown</p>
            </>
          ) : sent ? (
            <div className="success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <h2>Connected!</h2>
              <p className="address">{address.slice(0, 8)}...{address.slice(-6)}</p>
              <p className="closing">Closing...</p>
            </div>
          ) : (
            <div className="connected">
              <div className="wallet-info">
                <span className="corner tl"></span>
                <span className="corner tr"></span>
                <span className="corner bl"></span>
                <span className="corner br"></span>
                <p className="label">CONNECTED WALLET</p>
                <p className="address">{address}</p>
              </div>

              <button className="btn-confirm" onClick={sendToBot}>
                Confirm & Complete
              </button>

              <button className="btn-disconnect" onClick={() => open()}>
                Change Wallet
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="footer">
          <p>Powered by Reown AppKit</p>
        </div>
      </div>
    </div>
  )
}

export default App
