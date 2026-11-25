/* =====================================================================
   ✏️  EDIT THIS FILE — almost everything you'll want to change is here.
   Names, dates, venues, events, RSVP sheet link, GIFs.
   You don't need to touch the HTML/CSS/JS for normal updates.
   ===================================================================== */

window.WEDDING = {

  /* ---------- The couple ---------- */
  bride: "Vedanti",
  groom: "Shubham",
  groomFirst: false,        // true → shows "Shubham & Vedanti" (as on the printed card)
  // Shown on the wax seal of the envelope. Leave "" to auto-use first letters.
  initials: "",

  /* ---------- Big picture ---------- */
  blessing: "॥ श्री गजानन प्रसन्न ॥",            // tiny line at the very top ("" to hide)
  headline: "OUI DO!",                       // the big playful heading
  tagline: "we're getting married!",         // handwritten line under it
  dateText: "28 – 30 January 2027",          // shown in hero
  cityText: "Mumbai",                   // shown in hero
  // Countdown target — the main wedding moment (IST). Format: YYYY-MM-DDTHH:MM:SS+05:30
  countdownTo: "2027-01-29T12:18:00+05:30",   // shubh muhurat
  hashtag: "",                               // "" hides it

  invitationText:
    "With the blessings of both the families, we joyfully " +
    "invite you to celebrate our wedding, as" +
    "two cultures and one very happy couple come together. " +
    "Your presence would make our celebrations complete.",

  /* ---------- GIFs / images ----------
     Drop files into the /assets folder and put their paths here.
     If a file is missing, a hand-drawn illustration shows instead — so the
     site never looks broken.                                              */
  gifs: {
    hero: "assets/hero.jpg",       // the couple illustration (a GIF works too)
    footer: "assets/footer.gif",   // optional second GIF near the end
  },
  heroPhotoCaption: "that's us!",  // handwritten note under the hero GIF

  /* ---------- Events ----------
     date:  "YYYY-MM-DD"     start/end: "HH:MM" (24-hour)
     Leave date/time/venue as "" and the card shows "details coming soon".
     mapsUrl: paste a Google Maps share link for the venue.
     art: which drawing to use — haldi | mehendi | sangeet | marathi | bengali | reception
     accent: the colour splash behind the drawing                          */
  events: [
    {
      name: "Haldi",
      native: "हळदी समारंभ",
      art: "haldi",
      accent: "#E9A825",
      note: "Gaye Holud at 12:00 PM · Haldi at 12:40 PM",
      date: "2027-01-28", start: "12:00", end: "",
      venue: "Novotel Mumbai Juhu Beach", address: "Juhu Beach, Balraj Sahani Road, Juhu, Mumbai – 400 049", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Novotel+Mumbai+Juhu+Beach",
      dressCode: "yellows, oranges & reds - any colours that you don't mind staining",
    },
    {
      name: "Mehendi",
      native: "मेहंदी",
      art: "mehendi",
      accent: "#6E9B3A",
      note: "henna, music & gossip",
      date: "2027-01-28", start: "18:00", end: "",
      venue: "Burgundy Room, Novotel Mumbai", address: "Juhu Beach, Balraj Sahani Road, Juhu, Mumbai – 400 049", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Novotel+Mumbai+Juhu+Beach",
      dressCode: "Greens & florals",
    },
    {
      name: "Sangeet",
      native: "संगीत",
      art: "sangeet",
      accent: "#C8326B",
      note: "bring your dancing shoes",
      date: "2027-01-28", start: "19:30", end: "",
      venue: "Champagne Ball Room, Novotel Mumbai", address: "Juhu Beach, Balraj Sahani Road, Juhu, Mumbai – 400 049", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Novotel+Mumbai+Juhu+Beach",
      dressCode: "Indo-western glam - dark colours",
    },
    {
      name: "Marathi Wedding",
      native: "शुभविवाह",
      art: "marathi",
      accent: "#2F7D5B",
      note: "shubh muhurat at 12:18 PM — mangalashtakas & akshata",
      date: "2027-01-29", start: "12:18", end: "",
      venue: "Novotel Mumbai Juhu Beach", address: "Juhu Beach, Balraj Sahani Road, Juhu, Mumbai – 400 049", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Novotel+Mumbai+Juhu+Beach",
      dressCode: "Traditional Maharashtrian — please avoid green, it's the bride's colour!",
    },
    {
      name: "Bengali Wedding",
      native: "শুভ বিবাহ",
      art: "bengali",
      accent: "#C62F2F",
      note: "shubho drishti, sindoor daan & preetibhoj (dinner)",
      date: "2027-01-29", start: "18:24", end: "",
      venue: "Poolside Lawn, Novotel Mumbai", address: "Juhu Beach, Balraj Sahani Road, Juhu, Mumbai – 400 049", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Novotel+Mumbai+Juhu+Beach",
      dressCode: "Traditional Bengali — red, white & gold",
    },
    {
      name: "Reception",
      native: "Reception",
      art: "reception",
      accent: "#B8892E",
      note: "one last toast, raise a glass!",
      date: "2027-01-30", start: "19:00", end: "",
      venue: "Lawn, Mumbai Cricket Association Club", address: "G-Block, RG-2, Bandra Kurla Complex, Bandra East, Mumbai – 400 051", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mumbai+Cricket+Association+Club+Bandra+Kurla+Complex",
      dressCode: "Indo-western",
    },
  ],

  /* ---------- RSVP ----------
     Every reply is saved as a new row in your Google Sheet.
     Set-up (once): see rsvp-google-sheet.gs and paste the web-app URL below. */
  rsvp: {
    googleSheetUrl: "https://script.google.com/macros/s/AKfycbzmUmkCEGbBauDnkCb4wf_ObHCUZilJxa0-_wsY9ZnSgfuNJKSOY0vBp1X4PRjsJ8xPEg/exec",
    deadline: "",             // e.g. "10 January 2027" — "" shows no deadline
    sides: ["Bride's side", "Groom's side"],   // [] hides this question
    maxGuests: 10,
    askFood: true,            // show Veg / Non-veg / Jain question
  },

  footerNote: "can't wait to celebrate with you",
};
