# CentralStatic Deployment Guide

Deploy CentralStatic to Vercel with VibeConnect API integration.

## Quick Deploy (Recommended)

### 1. Push to GitHub

```bash
git add .
git commit -m "Add VibeConnect API integration and Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `CentralStatic` repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 3. Add Environment Variables

In Vercel project settings → Environment Variables, add:

| Name | Value |
|------|-------|
| `REACT_APP_VIBECONNECT_API_URL` | `https://vibeconnect-production.up.railway.app` |

### 4. Configure Domain (thedotconnector.biz)

1. In Vercel: Project Settings → Domains → Add `thedotconnector.biz`
2. Update your domain's DNS at your registrar:
   - **Type**: CNAME
   - **Name**: `@` (or leave blank for root)
   - **Value**: `cname.vercel-dns.com`

Or for an A record:
   - **Type**: A
   - **Value**: `76.76.21.21`

3. Vercel will auto-provision SSL

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automates deployment:

- **PRs**: Deploy to preview URLs for testing
- **Merge to main**: Auto-deploy to production

### Required GitHub Secrets

Add these in GitHub repo → Settings → Secrets:

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Get from vercel.com/account/tokens |
| `VERCEL_ORG_ID` | Find in `.vercel/project.json` after linking |
| `VERCEL_PROJECT_ID` | Find in `.vercel/project.json` after linking |
| `VIBECONNECT_API_URL` | `https://vibeconnect-production.up.railway.app` |

## Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start dev server
npm start
```

## Architecture

```
CentralStatic (Vercel)
    ↓
    ↓ API Calls
    ↓
VibeConnect Backend (Railway)
    ↓
    ├── Events API
    ├── Matches API
    ├── Connections API
    └── Profiles API
```

## API Integration

The integration layer (`src/api/`) provides:

- **`vibeconnect.js`**: API client with all VibeConnect endpoints
- **`useVibeConnect.js`**: React hooks with fallback to mock data

### Available Hooks

```javascript
import { useEvents, useMatches, useEventCheckIn } from './api/useVibeConnect';

// Fetch events (falls back to mock data if API unavailable)
const { events, loading, isUsingMockData } = useEvents();

// Check in to an event
const { checkIn, loading } = useEventCheckIn();

// Get user matches
const { matches } = useMatches(walletAddress);
```

## Troubleshooting

### Build fails on Vercel
- Ensure `REACT_APP_VIBECONNECT_API_URL` is set in Vercel environment variables
- Check that all dependencies are listed in `package.json`

### API not connecting
- The app gracefully falls back to demo data if API is unavailable
- Check browser console for connection errors
- Verify VibeConnect backend is running: `https://vibeconnect-production.up.railway.app`

### Domain not working
- DNS propagation can take up to 48 hours
- Verify DNS records are correct with `dig thedotconnector.biz`
- Check Vercel domain status in project settings

---

*Cut through the static. Deploy authenticity.*
