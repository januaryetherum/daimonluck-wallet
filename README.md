# DaimonLuck Wallet Connect

Wallet connection page for DaimonLuck Telegram bot.

## How It Works

1. User clicks link in Telegram bot
2. Opens in browser (not Mini App)
3. Connects wallet via Reown (300+ wallets)
4. Auto-redirects back to Telegram with wallet address

## Tech Stack

- React 18 + Vite
- Reown AppKit
- Solana Web3.js

## Features

- 300+ wallets supported
- Email & social login (Google, X, Discord, GitHub)
- Auto-redirect to Telegram after connection
- DaimonLuck styled UI

## Deployment

Deployed on Vercel: https://daimonluck-wallet.vercel.app

## URL Parameters

- `bot` - Telegram bot username (default: DaimonLuck_bot)

Example: `https://daimonluck-wallet.vercel.app?bot=MyBot`

## License

MIT
