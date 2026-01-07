import { useEffect, useState, useRef } from 'react'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'

// DaimonLuck Logo
const Logo = () => (
  <svg viewBox="0 0 582 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo">
    <path d="M215.722 461.081C215.722 447.225 200.722 438.565 188.722 445.493L84.0031 505.952C75.3938 510.923 64.3852 507.973 59.4146 499.364L2.41462 400.636C-2.55594 392.027 0.393867 381.018 9.00319 376.048L113.722 315.589C125.722 308.661 125.722 291.341 113.722 284.412L9.00294 223.952C0.393723 218.982 -2.55599 207.973 2.41454 199.364L59.4146 100.636C64.3852 92.0271 75.3938 89.0773 84.0031 94.048L188.722 154.508C200.722 161.436 215.722 152.776 215.722 138.92V18C215.722 8.05887 223.781 0 233.722 0H347.722C357.663 0 365.722 8.05888 365.722 18V169.998C365.722 170.042 365.77 170.069 365.808 170.047C365.846 170.025 365.893 170.053 365.893 170.097V429.905C365.893 429.949 365.846 429.976 365.808 429.954C365.77 429.932 365.722 429.959 365.722 430.003V582C365.722 591.941 357.663 600 347.722 600H233.722C223.781 600 215.722 591.941 215.722 582V461.081Z" fill="#F8F3FF"/>
    <path d="M391.776 444.947C384.49 440.74 381.09 432.048 383.588 424.014L481.639 108.689C482.983 104.366 485.906 100.709 489.826 98.4454L497.441 94.0486C506.05 89.0777 517.059 92.0273 522.03 100.637L579.03 199.364C584 207.973 581.051 218.982 572.442 223.952L467.722 284.412C455.722 291.341 455.722 308.661 467.722 315.589L572.441 376.048C581.051 381.018 584 392.027 579.03 400.636L522.03 499.364C517.059 507.973 506.051 510.923 497.441 505.952L391.776 444.947Z" fill="#F8F3FF"/>
  </svg>
)

function App() {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const [redirecting, setRedirecting] = useState(false)
  const [copied, setCopied] = useState(false)
  const hasRedirected = useRef(false)

  // Get bot username from URL params
  const params = new URLSearchParams(window.location.search)
  const botUsername = params.get('bot') || 'DaimonLuck_bot'

  // Auto-redirect when connected
  useEffect(() => {
    if (isConnected && address && !hasRedirected.current) {
      hasRedirected.current = true
      setRedirecting(true)
      
      // Small delay for UX
      setTimeout(() => {
        const telegramUrl = `https://t.me/${botUsername}?start=wallet_${address}`
        window.location.href = telegramUrl
      }, 1500)
    }
  }, [isConnected, address, botUsername])

  // Copy address
  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container">
      <div className="header">
        <Logo />
        <h1 className="title">
          <span className="title-main">CONNECT </span>
          <span className="title-accent">WALLET</span>
        </h1>
        <p className="subtitle">Link your Solana wallet to DaimonLuck</p>
      </div>

      {/* Status Card */}
      <div className="card">
        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />

        <div className="status-row">
          <div className={`status-dot ${isConnected ? 'connected' : ''}`} />
          <span className="status-label">Status</span>
          <span className={`status-value ${isConnected ? 'connected' : ''}`}>
            {redirecting ? 'REDIRECTING...' : isConnected ? 'CONNECTED' : 'DISCONNECTED'}
          </span>
        </div>

        {isConnected && address && (
          <div className="wallet-info visible">
            <div className="wallet-label">// WALLET ADDRESS</div>
            <div className="wallet-address" onClick={copyAddress}>
              {address}
              <span className="copy-hint">{copied ? '✓ Copied!' : 'Click to copy'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Redirecting Message */}
      {redirecting && (
        <div className="message success visible">
          <span className="spinner" />
          <span>Wallet connected! Redirecting to Telegram...</span>
        </div>
      )}

      {/* Features (when not connected) */}
      {!isConnected && (
        <div className="features">
          <div className="feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <div className="feature-text">
              <div className="feature-title">SECURE CONNECTION</div>
              <div className="feature-desc">300+ wallets supported via Reown</div>
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div className="feature-text">
              <div className="feature-title">EMAIL & SOCIAL</div>
              <div className="feature-desc">Connect with Google, X, Discord, GitHub</div>
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <div className="feature-text">
              <div className="feature-title">INSTANT RETURN</div>
              <div className="feature-desc">Auto-redirect back to Telegram</div>
            </div>
          </div>
        </div>
      )}

      {/* Connect Button */}
      {!isConnected && (
        <div className="btn-container">
          <button className="btn btn-primary" onClick={() => open()}>
            CONNECT WALLET
          </button>
        </div>
      )}

      {/* Manual return link (fallback) */}
      {isConnected && !redirecting && (
        <div className="btn-container">
          <a 
            href={`https://t.me/${botUsername}?start=wallet_${address}`}
            className="btn btn-success"
          >
            RETURN TO TELEGRAM
          </a>
        </div>
      )}
    </div>
  )
}

export default App
