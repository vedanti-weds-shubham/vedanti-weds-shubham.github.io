/* =====================================================================
   ✏️  EDIT THIS FILE — almost everything you'll want to change is here.
   Names, dates, venues, events, WhatsApp numbers, GIFs.
   You don't need to touch the HTML/CSS/JS for normal updates.
   ===================================================================== */

window.WEDDING = {

  /* ---------- The couple ---------- */
  bride: "Priya",          // ← your name
  groom: "Arnab",          // ← his name
  // Shown on the wax seal of the envelope. Leave "" to auto-use first letters.
  initials: "",

  /* ---------- Big picture ---------- */
  blessing: "॥ श्री गणेशाय नमः ॥",            // tiny line at the very top ("" to hide)
  headline: "OUI DO!",                       // the big playful heading
  tagline: "we're getting married!",         // handwritten line under it
  dateText: "January 2027",                  // shown in hero; e.g. "24 · 01 · 2027"
  cityText: "Navi Mumbai",                   // shown in hero
  // Countdown target — the main wedding moment (IST). Format: YYYY-MM-DDTHH:MM:SS+05:30
  countdownTo: "2027-01-24T19:00:00+05:30",
  hashtag: "#PriyaSaysOuiToArnab",           // "" to hide

  invitationText:
    "With the blessings of our families, we joyfully invite you to celebrate " +
    "as two families, two cultures and one very happy couple come together. " +
    "Your presence would make our celebrations complete.",

  /* ---------- GIFs / images ----------
     Drop files into the /assets folder and put their paths here.
     If a file is missing, a hand-drawn illustration shows instead — so the
     site never looks broken.                                              */
  gifs: {
    hero: "assets/hero.gif",       // e.g. the animated GIF downloaded from your template
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
      native: "हळद",
      art: "haldi",
      accent: "#E9A825",
      note: "a splash of turmeric & a lot of laughter",
      date: "", start: "", end: "",
      venue: "", address: "", mapsUrl: "",
      dressCode: "Shades of yellow — wear something you don't mind getting messy!",
    },
    {
      name: "Mehendi",
      native: "मेहंदी",
      art: "mehendi",
      accent: "#6E9B3A",
      note: "henna, music & gossip",
      date: "", start: "", end: "",
      venue: "", address: "", mapsUrl: "",
      dressCode: "Greens & florals",
    },
    {
      name: "Sangeet",
      native: "संगीत",
      art: "sangeet",
      accent: "#C8326B",
      note: "bring your dancing shoes",
      date: "", start: "", end: "",
      venue: "", address: "", mapsUrl: "",
      dressCode: "Indo-western glam",
    },
    {
      name: "Marathi Wedding",
      native: "शुभ विवाह",
      art: "marathi",
      accent: "#2F7D5B",
      note: "mangalashtakas, antarpat & akshata",
      date: "", start: "", end: "",
      venue: "", address: "", mapsUrl: "",
      dressCode: "Traditional Maharashtrian — nauvari, paithani, pheta",
    },
    {
      name: "Bengali Wedding",
      native: "শুভ বিবাহ",
      art: "bengali",
      accent: "#C62F2F",
      note: "shubho drishti, sindoor daan & ululu!",
      date: "", start: "", end: "",
      venue: "", address: "", mapsUrl: "",
      dressCode: "Traditional Bengali — red, white & gold",
    },
    {
      name: "Reception",
      native: "Reception",
      art: "reception",
      accent: "#B8892E",
      note: "one last toast, raise a glass!",
      date: "", start: "", end: "",
      venue: "", address: "", mapsUrl: "",
      dressCode: "Black tie / festive formal",
    },
  ],

  /* ---------- RSVP ----------
     Guests fill the form → WhatsApp opens with a neatly formatted message
     to the number below → they just tap Send.
     Number format: country code + number, digits only. 91XXXXXXXXXX
     Two contacts = guests choose "Bride's side / Groom's side" and the RSVP
     goes to the right family. Keep one entry to hide that question.       */
  rsvp: {
    deadline: "31 December 2026",
    contacts: [
      { label: "Bride's side", whatsapp: "919999999999" },
      { label: "Groom's side", whatsapp: "918888888888" },
    ],
    maxGuests: 10,
    askFood: true,           // show Veg / Non-veg / Jain question
    // OPTIONAL: also log every RSVP into a Google Sheet (see README.md).
    // Paste your Apps Script web-app URL here. Leave "" to use WhatsApp only.
    googleSheetUrl: "",
  },

  footerNote: "can't wait to celebrate with you",
};
