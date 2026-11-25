# Oui Do! — wedding invitation website

Plain HTML + CSS + JavaScript. No build step, no frameworks, no installs.

## Folder map

```
wedding-site/
├── index.html            ← page structure (sections in order)
├── js/config.js          ← ✏️  ALL your content: names, events, dates, venues, RSVP sheet link
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
| Connect RSVPs to your sheet | `rsvp.googleSheetUrl` |
| Hide the "Bride's/Groom's side" question | `rsvp.sides: []` |
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
Guests fill the form → their reply is saved as a new row in your Google Sheet (in your Drive).
One-time set-up: follow the steps at the top of `rsvp-google-sheet.gs`, then paste the
web-app URL into `js/config.js` → `rsvp.googleSheetUrl`. Until then the form politely says
RSVPs aren't open yet. Set `EMAIL_ME = true` in the script to also get an email per RSVP.
If a guest re-submits, you'll see two rows — the latest one is their current answer.

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
