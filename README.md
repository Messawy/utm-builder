# Campaign & UTM Builder

Free tool for media buyers to generate UTM-tagged URLs with structured naming conventions across Meta, Google, TikTok, and Snapchat.

## Live URL
`https://saasgate.io/utm-builder/`

---

## Deploy to Cloudflare Pages (Step by Step)

### Step 1: Push to GitHub

```bash
# Create a new repo on github.com (e.g. "utm-builder")
# Then in your terminal:

cd utm-builder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/utm-builder.git
git push -u origin main
```

### Step 2: Connect Cloudflare Pages

1. Go to **Cloudflare Dashboard** → your account
2. Click **Workers & Pages** in the left sidebar
3. Click **Create** → **Pages** → **Connect to Git**
4. Select your GitHub account and the `utm-builder` repo
5. Configure build settings:

| Setting | Value |
|---------|-------|
| Framework preset | None |
| Build command | `npm install && npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |

6. Click **Save and Deploy**

### Step 3: Set Custom Domain (saasgate.io/utm-builder)

Since saasgate.io is already on Cloudflare, you have two options:

**Option A: Deploy as a separate Pages project under a subdomain (easier)**
- In the Pages project settings → Custom domains → Add `utm.saasgate.io`

**Option B: Serve at saasgate.io/utm-builder/ path (if saasgate.io is an existing site)**
- The Vite config already sets `base: '/utm-builder/'`
- Copy the contents of the `dist` folder into your main site's `/utm-builder/` directory
- OR use Cloudflare Workers to route `/utm-builder/*` to this Pages project:

```js
// Cloudflare Worker (route: saasgate.io/utm-builder/*)
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const newUrl = `https://utm-builder-XXXX.pages.dev${url.pathname}`;
    return fetch(newUrl, request);
  }
}
```

Replace `utm-builder-XXXX.pages.dev` with your actual Cloudflare Pages URL.

### Step 4: Verify

- Visit `https://saasgate.io/utm-builder/`
- Check GTM fires in browser DevTools → Network tab → filter "gtm"
- Test generating a URL and check history saves

---

## GTM Tracking

Google Tag Manager (GTM-5XB9XJ5) is included in `index.html`:
- Head script loads GTM asynchronously
- Noscript fallback is in the body

To verify tracking:
1. Open Chrome DevTools → Network tab
2. Filter by "gtm" 
3. You should see a request to googletagmanager.com

---

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/utm-builder/`

---

## Tech Stack
- React 18
- Vite 6
- localStorage for persistence
- No backend required
