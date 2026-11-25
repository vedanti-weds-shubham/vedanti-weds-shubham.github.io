/**
 * OPTIONAL — log every RSVP into a Google Sheet (in addition to WhatsApp).
 *
 * 1. Create a new Google Sheet → Extensions → Apps Script.
 * 2. Delete what's there, paste this whole file, click Save.
 * 3. Deploy → New deployment → type "Web app"
 *      Execute as: Me      Who has access: Anyone
 * 4. Authorise, copy the Web app URL (ends in /exec).
 * 5. Paste it into js/config.js → rsvp.googleSheetUrl
 */
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("RSVP") || ss.insertSheet("RSVP");
  const headers = ["Timestamp", "Name", "Side", "Attending", "Guests", "Events",
                   "Accommodation", "Check-in", "Check-out", "Food", "Message"];
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);

  const d = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), d.name, d.side, d.attending, d.guests, d.events,
                   d.accommodation, d.checkin, d.checkout, d.food, d.message]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
