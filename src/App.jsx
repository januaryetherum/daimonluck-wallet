import { useEffect, useState } from 'react'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { createClient } from '@supabase/supabase-js'

// Supabase client
const supabase = createClient(
  'https://umwjibdvmozhqlhiaaqx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtd2ppYmR2bW96aHFsaGlhYXF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NDQ1MjgsImV4cCI6MjA4MzIyMDUyOH0.86A3oSjCsqfnp4S71PuYxcDDd-45Rn2JiPuTq8avTjU'
)

// GAMBLIUM Logo SVG
const GambliumLogo = () => (
  <svg width="48" height="50" viewBox="0 0 582 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M215.722 461.081C215.722 447.225 200.722 438.565 188.722 445.493L84.0031 505.952C75.3938 510.923 64.3852 507.973 59.4146 499.364L2.41462 400.636C-2.55594 392.027 0.393867 381.018 9.00319 376.048L113.722 315.589C125.722 308.661 125.722 291.341 113.722 284.412L9.00294 223.952C0.393723 218.982 -2.55599 207.973 2.41454 199.364L59.4146 100.636C64.3852 92.0271 75.3938 89.0773 84.0031 94.048L188.722 154.508C200.722 161.436 215.722 152.776 215.722 138.92V18C215.722 8.05887 223.781 0 233.722 0H347.722C357.663 0 365.722 8.05888 365.722 18V169.998C365.722 170.042 365.77 170.069 365.808 170.047C365.846 170.025 365.893 170.053 365.893 170.097V429.905C365.893 429.949 365.846 429.976 365.808 429.954C365.77 429.932 365.722 429.959 365.722 430.003V582C365.722 591.941 357.663 600 347.722 600H233.722C223.781 600 215.722 591.941 215.722 582V461.081Z" fill="#FF7A00"/>
    <path d="M391.776 444.947C384.49 440.74 381.09 432.048 383.588 424.014L481.639 108.689C482.983 104.366 485.906 100.709 489.826 98.4454L497.441 94.0486C506.05 89.0777 517.059 92.0273 522.03 100.637L579.03 199.364C584 207.973 581.051 218.982 572.442 223.952L467.722 284.412C455.722 291.341 455.722 308.661 467.722 315.589L572.441 376.048C581.051 381.018 584 392.027 579.03 400.636L522.03 499.364C517.059 507.973 506.051 510.923 497.441 505.952L391.776 444.947Z" fill="#FF7A00"/>
  </svg>
)

function App() {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const [sent, setSent] = useState(false)
  const [saving, setSaving] = useState(false)
  const [telegramId, setTelegramId] = useState(null)

  // Get telegram_id from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tgId = params.get('tg_id')
    if (tgId) {
      setTelegramId(tgId)
    }
  }, [])

  // Save wallet to database and redirect to Telegram
  const confirmAndReturn = async () => {
    if (!address || !telegramId) return
    
    setSaving(true)
    
    try {
      // Update telegram_users with wallet_address
      await supabase
        .from('telegram_users')
        .upsert({
          telegram_id: telegramId,
          wallet_address: address,
          updated_at: new Date().toISOString()
        }, { onConflict: 'telegram_id' })
      
      setSent(true)
      
      // Redirect to Telegram bot after delay
      setTimeout(() => {
        window.location.href = 'https://t.me/gamblium_bot'
      }, 1500)
    } catch (err) {
      console.error('Error saving wallet:', err)
      setSaving(false)
    }
  }

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="logo">
            <GambliumLogo />
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
              <p className="closing">Returning to Telegram...</p>
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

              <button className="btn-confirm" onClick={confirmAndReturn} disabled={saving || !telegramId}>
                {saving ? 'Saving...' : 'Confirm & Return to Telegram'}
              </button>

              {!telegramId && (
                <p className="error">Error: No Telegram ID. Open this link from the bot.</p>
              )}

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
