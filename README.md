# Oui Do! — wedding invitation website

Plain HTML + CSS + JavaScript. No build step, no frameworks, no installs.

## Folder map

```
wedding-site/
├── index.html            ← page structure (sections in order)
├── js/config.js          ← ✏️  ALL your content: names, events, dates, venues, WhatsApp numbers
├── css/style.css         ← look & feel; colours/fonts are at the very top (:root)
├── js/illustrations.js   ← the hand-drawn SVG drawings
├── js/main.js            ← behaviour (envelope, animations, RSVP) — rarely needs edits
├── assets/               ← put your GIFs / photos here
└── rsvp-google-sheet.gs  ← optional: log RSVPs to a Google Sheet
```

## Preview on your laptop
Double-click `index.html` — it opens in your browser. Edit a file, save, refresh.
Phone view: Chrome → right-click → Inspect → the phone icon (Ctrl+Shift+M).
Tip: the envelope only shows once per tab. Open a new tab to see it again.

## Common edits (all in `js/config.js`)
| You want to… | Change |
|---|---|
| Put your names | `bride`, `groom` |
| Add time & venue | each event's `date: "2027-01-22"`, `start: "10:00"`, `end: "13:00"`, `venue`, `address`, `mapsUrl` |
| Change WhatsApp numbers | `rsvp.contacts` → `whatsapp: "91XXXXXXXXXX"` (country code, digits only) |
| One RSVP number only | keep just one entry in `rsvp.contacts` (the "Bride's/Groom's side" question disappears) |
| Countdown | `countdownTo` |
| Reorder / remove an event | move or delete its `{ ... }` block in `events` |
| Hide something | set its text to `""` (e.g. `hashtag: ""`) |

Once `date` + `start` are filled, the **Add to calendar** button appears; `mapsUrl` adds **Directions**.
Get `mapsUrl` from Google Maps → venue → Share → Copy link.

## Adding the template GIFs
1. On Greetings Island, open your customised design → **Download animated GIF**.
2. Save it as `assets/hero.gif` (it appears in the polaroid frame at the top).
3. Optional second GIF → `assets/footer.gif`.
If a file is missing, a hand-drawn illustration shows in its place.
Keep GIFs under ~3 MB so the site loads fast on mobile data (ezgif.com can shrink them).

## Changing the look
- Colours & fonts: top of `css/style.css` (`--paper`, `--ink`, `--gold`, …).
- Event colour splashes: `accent` on each event in `config.js`.
- New drawing: add a function in `illustrations.js`, use its name as `art:` in config.

## How RSVP works
Guest fills the form → WhatsApp opens with a formatted message to your number → they tap Send.
It works without servers or logins and suits guests who live on WhatsApp.
WhatsApp never sends on its own, so a guest could close it without sending.
To keep a backup list, set up the Google Sheet logger (instructions inside `rsvp-google-sheet.gs`) and paste its URL into `rsvp.googleSheetUrl`.
Every submission then also lands in the sheet automatically, even if they forget to hit Send.

## Hosting for free (pick one)

**Netlify Drop (fastest, 2 minutes)**
1. Go to app.netlify.com/drop and sign up free.
2. Drag the whole `wedding-site` folder onto the page.
3. You get a link like `random-name.netlify.app` → Site settings → change the name to e.g. `priya-arnab.netlify.app`.
4. To update: Deploys → drag the folder again.

**GitHub Pages (best if you'll keep editing)**
1. Create a GitHub repo (e.g. `wedding`), upload all files (index.html at the top level).
2. Settings → Pages → Source: `main` branch, `/root` → Save.
3. Site goes live at `yourusername.github.io/wedding` in a minute or two. Each commit re-publishes it.
(Cloudflare Pages and Vercel work the same way, also free.)

**Nice WhatsApp preview:** add a `assets/preview.jpg` (1200×630) and, after hosting, change
`og:image` in `index.html` to the full URL (e.g. `https://priya-arnab.netlify.app/assets/preview.jpg`).
