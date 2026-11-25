/* =====================================================================
   Site behaviour. You normally won't need to edit this file —
   content lives in config.js, looks live in css/style.css.
   ===================================================================== */
(function () {
  const C = window.WEDDING;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : ""), C);

  document.documentElement.classList.add("js");

  /* ---------- 1. Fill text from config ---------- */
  $$("[data-bind]").forEach((el) => {
    const v = get(el.dataset.bind);
    if (v) el.textContent = v; else el.style.display = "none";
  });
  // Name order: groomFirst:true in config shows "Groom & Bride"
  const [n1, n2] = C.groomFirst ? [C.groom, C.bride] : [C.bride, C.groom];
  C.couple = `${n1} & ${n2}`;
  $$(".names, .footer-names").forEach((el) => {
    const s = $$("[data-bind]", el);
    if (s.length === 2) { s[0].textContent = n1; s[1].textContent = n2; }
  });
  const initials = C.initials || `${n1[0]}&${n2[0]}`;
  if ($("#sealInitials")) $("#sealInitials").textContent = initials;
  $$("[data-names-short]").forEach((el) => (el.textContent = `${n1[0]} & ${n2[0]}`));
  document.title = `${C.couple} — ${C.headline}`;

  // Headline: split into letters for the bouncy entrance
  const tilt = [-6, 4, -3, 0, 5, -4, 3, -5];
  const headline = $("[data-headline]");   // optional: you can remove it from index.html
  if (headline) {
    headline.innerHTML = [...C.headline].map((ch, i) =>
      ch === " " ? "<br>" : `<span class="ch" style="--i:${i};--r:${tilt[i % tilt.length]}deg">${esc(ch)}</span>`).join("");
    headline.setAttribute("aria-label", C.headline);
  }
  $$(".hero-text > *").forEach((el, i) => el.style.setProperty("--d", `${0.15 + i * 0.12}s`));
  $$(".hero-text .headline").forEach((el) => el.style.setProperty("--d", "0s"));

  /* ---------- 2. Events ---------- */
  const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const fmtTime = (t) => { if (!t) return ""; const [h, m] = t.split(":").map(Number); return new Date(2000, 0, 1, h, m).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase(); };
  const gcal = (e) => {
    if (!e.date || !e.start) return "";
    const d = e.date.replace(/-/g, ""), s = e.start.replace(":", "") + "00", en = (e.end || e.start).replace(":", "") + "00";
    const p = new URLSearchParams({
      action: "TEMPLATE", text: `${e.name} · ${C.couple}`, dates: `${d}T${s}/${d}T${en}`, ctz: "Asia/Kolkata",
      location: [e.venue, e.address].filter(Boolean).join(", "), details: `${e.note || ""}\nDress code: ${e.dressCode || "—"}\n${location.href.split("#")[0]}`,
    });
    return "https://calendar.google.com/calendar/render?" + p;
  };

  const ICON = { cal: '<path d="M4 7h16v13H4zM4 11h16M8 4v5M16 4v5"/>', pin: '<path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/>', hanger: '<path d="M12 7a2 2 0 1 1 2-2M12 7v2L3.5 15.2a1 1 0 0 0 .6 1.8h15.8a1 1 0 0 0 .6-1.8L12 9"/>' };
  const icon = (k) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;
  $("#timeline").innerHTML = C.events.map((e, i) => {
    const time = e.timeText ? esc(e.timeText) : e.start ? `${fmtTime(e.start)}${e.end ? " – " + fmtTime(e.end) : " onwards"}` : "";
    const when = e.date
      ? `${fmtDate(e.date)}${time ? `<small>${time}</small>` : ""}`
      : `<span class="tba">Date & time coming soon</span>`;
    const where = e.venue ? `${esc(e.venue)}${e.address ? `<small>${esc(e.address)}</small>` : ""}` : `<span class="tba">Venue coming soon</span>`;
    const cal = gcal(e);
    const isBn = /[ঀ-৿]/.test(e.native || "");
    return `
    <article class="event reveal" style="--accent:${e.accent}" id="event-${i + 1}">
      <div class="event-art draw">${window.ART[e.art] ? window.ART[e.art]() : ""}</div>
      <div class="event-body">
        <span class="event-num">${String(i + 1).padStart(2, "0")} / ${String(C.events.length).padStart(2, "0")}</span>
        ${e.native && e.native !== e.name ? `<div class="event-native${isBn ? " bn" : ""}">${esc(e.native)}</div>` : ""}
        <h3>${esc(e.name)}</h3>
        ${e.note ? `<p class="event-note">${esc(e.note)}</p>` : ""}
        <dl class="event-details">
          <div><dt aria-label="When">${icon("cal")}</dt><dd>${when}</dd></div>
          <div><dt aria-label="Where">${icon("pin")}</dt><dd>${where}</dd></div>
          ${e.dressCode ? `<div><dt aria-label="Dress code">${icon("hanger")}</dt><dd>${esc(e.dressCode)}</dd></div>` : ""}
        </dl>
        ${cal || e.mapsUrl ? `<div class="event-actions">
          ${e.mapsUrl ? `<a class="btn-ghost" href="${esc(e.mapsUrl)}" target="_blank" rel="noopener">↗ Directions</a>` : ""}
          ${cal ? `<a class="btn-ghost" href="${esc(cal)}" target="_blank" rel="noopener">＋ Add to calendar</a>` : ""}
        </div>` : ""}
      </div>
    </article>`;
  }).join("");

  /* ---------- 3. Illustrations & GIFs ---------- */
  $$("[data-art]").forEach((el) => { if (!window.ART[el.dataset.art]) return; el.innerHTML = window.ART[el.dataset.art](); el.classList.add("draw"); });

  $$("[data-gif]").forEach((fig) => {
    const box = $(".polaroid-img", fig);
    const src = C.gifs && C.gifs[fig.dataset.gif];
    if (!box) return;
    const fallback = () => { const a = window.ART[fig.dataset.fallback]; if (!a) return; box.innerHTML = a(); box.classList.add("draw"); prep(box); watchDraw(box); };
    if (!src) return fallback();
    const img = new Image();
    img.alt = ""; img.decoding = "async";
    img.onload = () => { box.innerHTML = ""; box.appendChild(img); };
    img.onerror = fallback;
    img.src = src;
  });

  // pathLength=1 lets CSS draw any line regardless of its length
  function prep(root) { $$(".ink", root).forEach((p) => p.setAttribute("pathLength", "1")); }
  prep(document);

  /* ---------- 4. Scroll reveals & line drawing ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add(en.target.classList.contains("draw") ? "drawn" : "in");
      io.unobserve(en.target);
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
  function watchDraw(el) { io.observe(el); }
  $$(".reveal").forEach((el, i) => { if (el.parentElement.classList.contains("invite")) el.style.setProperty("--d", `${(i % 5) * 0.08}s`); io.observe(el); });
  $$(".draw").forEach((el) => { if (!el.closest(".hero")) io.observe(el); });

  /* ---------- 5. Envelope → open ----------
     The tap itself is handled by the small script right after the envelope
     in index.html (so it works instantly). Here we just start the show.   */
  let started = false;
  const start = () => {
    if (started) return; started = true;
    document.body.classList.remove("locked");
    document.body.classList.add("loaded");
    setTimeout(() => $$(".hero .draw").forEach((el) => el.classList.add("drawn")), 500);
    petals();
  };
  if (window.__envOpened || !$("#envelope")) start();
  else document.addEventListener("envelope:opened", start);

  /* ---------- 6. Falling petals (marigold & rose) ---------- */
  function petals() {
    if (reduceMotion) return;
    const box = $(".petals"); if (!box) return;
    const colors = ["#E9A825", "#F0B93B", "#D9534F", "#E7A6A1", "#F3C96B"];
    const n = innerWidth < 760 ? 14 : 24;
    for (let i = 0; i < n; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      const s = 0.6 + Math.random() * 0.8;
      p.style.cssText = `left:${Math.random() * 100}%;background:${colors[i % colors.length]};width:${10 * s}px;height:${14 * s}px;` +
        `animation-duration:${9 + Math.random() * 9}s;animation-delay:${-Math.random() * 15}s;--dx:${(Math.random() - 0.5) * 160}px;--rot:${360 + Math.random() * 540}deg`;
      box.appendChild(p);
    }
  }

  /* ---------- 7. Countdown ---------- */
  const target = new Date(C.countdownTo).getTime();
  const cd = Object.fromEntries($$("[data-cd]").map((el) => [el.dataset.cd, el]));
  const tick = () => {
    if (!cd.d) return;
    let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    const v = { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
    for (const k in v) { const t = String(v[k]).padStart(2, "0"); if (cd[k].textContent !== t) cd[k].textContent = t; }
    if (s === 0 && $(".countdown-note")) $(".countdown-note").textContent = "we said oui! 🥂";
  };
  tick(); setInterval(tick, 1000);

  /* ---------- 8. Nav & floating RSVP button ---------- */
  const nav = $("#topnav"), pill = $("#rsvpPill"), rsvpSec = $("#rsvp");
  let rsvpVisible = false;
  new IntersectionObserver(([e]) => { rsvpVisible = e.isIntersecting; onScroll(); }, { threshold: 0.05 }).observe(rsvpSec);
  function onScroll() {
    const past = scrollY > innerHeight * 0.7;
    nav.classList.toggle("show", past);
    pill.classList.toggle("show", past && !rsvpVisible);
    document.body.classList.toggle("scrolled", scrollY > 40);
  }
  addEventListener("scroll", onScroll, { passive: true });

  /* ---------- 9. RSVP form → Google Sheet ---------- */
  const form = $("#rsvpForm"), R = C.rsvp;
  if (!R.deadline && $("#rsvpSub")) $("#rsvpSub").textContent = "we'd love to know if you can make it. please rsvp as soon as possible.";
  const sides = R.sides || [];
  if (sides.length) {
    $("#sideChips").innerHTML = sides.map((label, i) =>
      `<label><input type="radio" name="side" value="${esc(label)}" ${i === 0 ? "checked" : ""}/><span>${esc(label)}</span></label>`).join("");
    // Playful nudge for the groom's side (purely for fun — doesn't block anything)
    const tease = $("#sideTease");
    $$("input[name=side]", $("#sideChips")).forEach((r) => r.addEventListener("change", () => {
      if (!tease) return;
      const groomSide = r.checked && r.value === sides[1];
      tease.textContent = groomSide ? "are you sure? 🤭" : "";
      tease.classList.remove("wiggle"); void tease.offsetWidth;
      if (groomSide) tease.classList.add("wiggle");
    }));
  } else if ($("#sideField")) $("#sideField").remove();
  // Events grouped by day: date on top, that day's events side by side below
  const days = [];
  C.events.forEach((e) => {
    let g = days.find((d) => d.date === e.date);
    if (!g) days.push(g = { date: e.date, events: [] });
    g.events.push(e);
  });
  const dayLabel = (d) => d ? new Date(d + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" }) : "More";
  $("#eventChips").innerHTML = days.map((g) => `
    <div class="day-group">
      <p class="day-label">${dayLabel(g.date)}</p>
      <div class="day-chips" style="--n:${g.events.length}">
        ${g.events.map((e) => `<label><input type="checkbox" name="events" value="${esc(e.name)}" checked/><span>${esc(e.name)}</span></label>`).join("")}
      </div>
    </div>`).join("");
  if (!R.askFood && $("#foodField")) $("#foodField").remove();

  let guests = 1;
  const out = $("#guestCount");
  $$(".stepper button").forEach((b) => b.addEventListener("click", () => {
    guests = Math.min(R.maxGuests || 10, Math.max(1, guests + Number(b.dataset.step)));
    out.textContent = guests; out.classList.remove("bump"); void out.offsetWidth; out.classList.add("bump");
  }));

  const sync = () => {
    const yes = form.attending.value === "yes";
    $("#ifAttending").setAttribute("aria-hidden", !yes);
    $("#stayDates").setAttribute("aria-hidden", !(yes && form.stay.value === "yes"));
  };
  form.addEventListener("change", sync); sync();

  // Sends one row to the Google Sheet. Apps Script answers with CORS headers
  // for simple text/plain POSTs; if a browser blocks reading the answer we
  // fall back to a fire-and-forget request.
  async function sendToSheet(data) {
    const opts = { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(data) };
    try {
      const res = await fetch(R.googleSheetUrl, opts);
      const json = await res.json().catch(() => ({ ok: res.ok }));
      if (!json.ok) throw new Error(json.error || "Sheet error");
    } catch (e) {
      if (e instanceof TypeError) { await fetch(R.googleSheetUrl, { ...opts, mode: "no-cors" }); return; }
      throw e;
    }
  }

  const btn = $("#submitBtn"), btnLabel = $(".btn-label", btn);
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const err = $("#formError");
    const name = form.name.value.trim();
    if (!name) { err.textContent = "Please tell us who's replying 🙂"; form.name.focus(); return; }
    const yes = form.attending.value === "yes";
    const events = $$("input[name=events]:checked").map((i) => i.value);
    if (yes && !events.length) { err.textContent = "Pick at least one celebration you'll attend."; return; }
    if (!R.googleSheetUrl) { err.textContent = "RSVPs aren't switched on yet — please check back soon!"; return; }
    err.textContent = "";

    const stay = yes && form.stay.value === "yes";
    const data = {
      name, phone: form.phone.value.trim(), side: form.side ? form.side.value : "",
      attending: yes ? "Yes" : "No", guests: yes ? guests : 0,
      events: yes ? (events.length === C.events.length ? "All" : events.join(", ")) : "",
      accommodation: stay ? "Yes" : (yes ? "No" : ""),
      checkin: stay ? form.checkin.value : "", checkout: stay ? form.checkout.value : "",
      food: yes && form.food ? (form.food.value || "") : "", message: form.message.value.trim(),
    };

    btn.disabled = true; btnLabel.textContent = "Sending…";
    try {
      await sendToSheet(data);
    } catch (e) {
      err.textContent = "Hmm, that didn't go through. Please check your internet and try again.";
      btn.disabled = false; btnLabel.textContent = "Send my RSVP";
      return;
    }
    btn.disabled = false; btnLabel.textContent = "Send my RSVP";

    $("#doneText").textContent = yes
      ? `Your RSVP is in, ${name.split(/[ &]/)[0]} — we can't wait to celebrate with you!`
      : "Thank you for letting us know. You'll be missed — we'll save you some mithai!";
    form.hidden = true; $("#rsvpDone").hidden = false;
    $("#rsvpDone").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    const art = $(".done-art"); if (art) { art.classList.remove("drawn"); void art.offsetWidth; art.classList.add("drawn"); }
    if (yes) confetti();
  });
  $("#editRsvp").addEventListener("click", () => { form.hidden = false; $("#rsvpDone").hidden = true; });

  /* ---------- 10. Confetti (petals + hearts) ---------- */
  function confetti() {
    if (reduceMotion) return;
    const cv = $("#confetti"), ctx = cv.getContext("2d"), dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; ctx.scale(dpr, dpr);
    const cols = ["#E9A825", "#C62F2F", "#2F7D5B", "#C8326B", "#B8892E", "#1d1a16"];
    const ps = Array.from({ length: 140 }, () => ({
      x: innerWidth / 2 + (Math.random() - 0.5) * 120, y: innerHeight * 0.6, vx: (Math.random() - 0.5) * 12, vy: -Math.random() * 15 - 6,
      r: Math.random() * 6 + 4, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.3, c: cols[Math.random() * cols.length | 0], h: Math.random() < 0.2,
    }));
    let t = 0;
    (function frame() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ps.forEach((p) => {
        p.vy += 0.35; p.vx *= 0.985; p.x += p.vx; p.y += p.vy; p.a += p.va;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c;
        if (p.h) { ctx.font = `${p.r * 3}px serif`; ctx.fillText("♥", 0, 0); }
        else { ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
      });
      if (++t < 220) requestAnimationFrame(frame); else ctx.clearRect(0, 0, innerWidth, innerHeight);
    })();
  }
})();
