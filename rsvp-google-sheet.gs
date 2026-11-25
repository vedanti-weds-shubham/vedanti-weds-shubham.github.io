/**
 * RSVP → Google Sheet
 * Every RSVP from the website is added as a new row in the "RSVP" tab.
 *
 * SET-UP (once, ~5 minutes):
 * 1. Google Drive → New → Google Sheets. Name it e.g. "Wedding RSVPs".
 * 2. In the sheet: Extensions → Apps Script.
 * 3. Delete everything in the editor, paste this whole file, click 💾 Save.
 * 4. Deploy → New deployment → ⚙ (Select type) → Web app
 *      Description:     RSVP
 *      Execute as:      Me
 *      Who has access:  Anyone          ← needed so guests can submit
 *    → Deploy → Authorise access → choose your account
 *      (if you see "Google hasn't verified this app": Advanced → Go to … (unsafe) → Allow;
 *       it's your own script, so this is expected)
 * 5. Copy the "Web app URL" (ends in /exec) and paste it into
 *    js/config.js → rsvp.googleSheetUrl
 *
 * Changed this script later? Deploy → Manage deployments → ✏ Edit →
 * Version: New version → Deploy (the URL stays the same).
 */

// Set to true to also get an email for every RSVP (sent to the sheet owner's Gmail).
const EMAIL_ME = false;

const HEADERS = ["Submitted at", "Name", "Phone", "Side", "Attending", "Guests",
                 "Events", "Accommodation", "Check-in", "Check-out", "Food", "Message"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);                       // avoids clashes if two guests submit together
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("RSVP") || ss.insertSheet("RSVP");
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#f5efe3");
      sheet.setFrozenRows(1);
    }

    const d = JSON.parse(e.postData.contents);
    const clean = (v) => String(v == null ? "" : v).replace(/^[=+\-@]/, "'$&").slice(0, 1000);
    const row = [new Date(), d.name, d.phone, d.side, d.attending, d.guests, d.events,
                 d.accommodation, d.checkin, d.checkout, d.food, d.message].map((v, i) => i === 0 || i === 5 ? v : clean(v));
    sheet.appendRow(row);

    if (EMAIL_ME) {
      MailApp.sendEmail(Session.getEffectiveUser().getEmail(),
        `RSVP: ${d.name} — ${d.attending === "Yes" ? d.guests + " guest(s)" : "can't make it"}`,
        HEADERS.slice(1).map((h, i) => `${h}: ${row[i + 1] || "—"}`).join("\n"));
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Open the web-app URL in a browser to check it's live.
function doGet() { return json({ ok: true, message: "RSVP endpoint is live" }); }

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
