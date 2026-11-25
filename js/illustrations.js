/* =====================================================================
   Hand-drawn line illustrations (inline SVG, generated in JS).
   - Paths with class "ink" draw themselves when scrolled into view.
   - "wash" is the watercolour-ish colour splash behind each drawing
     (it uses the --accent colour of its card).
   To add your own: write a new function in ART returning an <svg> string,
   then use its key as `art:` in config.js.
   ===================================================================== */
(function () {
  const f = (n) => Math.round(n * 10) / 10;

  // Organic blob for the colour wash
  function blob(cx, cy, r, seed = 0) {
    const j = [1, 0.9, 1.08, 0.94, 1.05, 0.87, 1.1, 0.95, 1.02, 0.9];
    const n = 9, pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed;
      const k = j[(i + seed * 3) % j.length | 0];
      pts.push([cx + Math.cos(a) * r * k, cy + Math.sin(a) * r * k * 0.92]);
    }
    let d = "";
    for (let i = 0; i < n; i++) {
      const p = pts[i], q = pts[(i + 1) % n];
      const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
      d += (i === 0 ? `M${f(m[0])} ${f(m[1])}` : "") + ` Q${f(q[0])} ${f(q[1])} ${f((q[0] + pts[(i + 2) % n][0]) / 2)} ${f((q[1] + pts[(i + 2) % n][1]) / 2)}`;
    }
    return `<path class="wash" d="${d}Z"/>`;
  }

  function leaf(x, y, len, w, ang) {
    return `<g transform="translate(${x} ${y}) rotate(${ang})">
      <path class="ink" d="M0 0 Q${len / 2} ${-w} ${len} 0 Q${len / 2} ${w} 0 0Z"/>
      <path class="ink thin" d="M3 0 L${len - 4} 0"/></g>`;
  }

  // Scalloped marigold
  function marigold(cx, cy, r, n = 12) {
    const ring = (rr, nn) => {
      let d = "";
      for (let i = 0; i <= nn; i++) {
        const a = (i / nn) * Math.PI * 2;
        const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
        d += i === 0 ? `M${f(x)} ${f(y)}` : ` A${f(rr * Math.sin(Math.PI / nn) * 1.25)} ${f(rr * Math.sin(Math.PI / nn) * 1.25)} 0 0 1 ${f(x)} ${f(y)}`;
      }
      return `<path class="ink" d="${d}"/>`;
    };
    return ring(r, n) + ring(r * 0.6, Math.max(7, n - 4)) + `<circle class="dot" cx="${cx}" cy="${cy}" r="${f(r * 0.18)}"/>`;
  }

  function rose(cx, cy, r) {
    const s = r / 14;
    return `<circle class="ink" cx="${cx}" cy="${cy}" r="${r}"/>
      <path class="ink thin" d="M${cx} ${cy} m-${f(3 * s)} 0 a${f(3 * s)} ${f(3 * s)} 0 1 1 ${f(6 * s)} 0 a${f(6 * s)} ${f(6 * s)} 0 1 1 -${f(12 * s)} 0 a${f(9 * s)} ${f(9 * s)} 0 1 1 ${f(18 * s)} 0"/>`;
  }

  function heart(cx, cy, s, cls = "ink") {
    return `<path class="${cls}" d="M${cx} ${cy + 6 * s} C${cx - 10 * s} ${cy - 1 * s} ${cx - 6 * s} ${cy - 8 * s} ${cx} ${cy - 3 * s} C${cx + 6 * s} ${cy - 8 * s} ${cx + 10 * s} ${cy - 1 * s} ${cx} ${cy + 6 * s}Z"/>`;
  }

  const svg = (vb, inner, cls = "") =>
    `<svg class="art ${cls}" viewBox="${vb}" aria-hidden="true" focusable="false"><g class="sketch">${inner}</g></svg>`;

  const dove = `
    <path class="ink" d="M4 40 Q20 36 30 40 Q44 46 60 38 Q66 30 74 30 Q82 30 84 36 L92 38 L84 41 Q80 50 66 54 Q44 62 22 52 Q12 48 4 40Z"/>
    <path class="ink thin" d="M8 42 L-4 35 L2 44 L-4 52 L12 47"/>
    <g class="wing"><path class="ink" d="M34 44 Q28 14 50 3 Q52 22 64 30 Q58 41 46 45Z"/>
    <path class="ink thin" d="M42 40 Q38 24 48 12 M50 40 Q50 28 56 22"/></g>
    <circle class="dot" cx="77" cy="35" r="1.6"/>`;

  const ART = {
    doves: () => svg("0 0 320 130", `
      <g transform="translate(46 22)">${dove}</g>
      <g transform="translate(274 22) scale(-1 1)">${dove}</g>
      <path class="ink" d="M138 60 Q160 96 182 60"/>
      <path class="ink thin" d="M138 60 q-8 10 -4 26 M182 60 q8 10 4 26"/>
      <g class="beat">${heart(160, 84, 1.3, "ink fill-accent")}</g>
      <path class="ink thin" d="M110 108 l4 -6 M210 108 l-4 -6 M160 116 v-6"/>`, "doves"),

    haldi: () => svg("0 0 200 200", `
      ${blob(100, 112, 70, 1)}
      ${leaf(46, 82, 38, 10, -165)}${leaf(100, 52, 32, 8, -25)}${leaf(36, 64, 30, 8, -120)}
      <ellipse class="ink" cx="100" cy="110" rx="58" ry="12"/>
      <path class="ink" d="M42 110 Q46 162 100 164 Q154 162 158 110"/>
      <path class="ink" d="M78 162 Q77 172 70 176 L130 176 Q123 172 122 162"/>
      <path class="ink" d="M52 108 Q64 88 82 94 Q96 80 112 92 Q132 86 148 108"/>
      <path class="ink thin" d="M58 132 l8 7 l8 -7 l8 7 l8 -7 l8 7 l8 -7 l8 7 l8 -7 l8 7 l8 -7"/>
      <path class="ink" d="M122 98 L168 54"/><ellipse class="ink" cx="172" cy="49" rx="6" ry="10" transform="rotate(45 172 49)"/>
      ${marigold(54, 70, 17)}${marigold(88, 52, 13, 10)}
      <circle class="dot" cx="150" cy="150" r="2"/><circle class="dot" cx="162" cy="138" r="1.4"/><circle class="dot" cx="40" cy="146" r="1.6"/>`),

    mehendi: () => svg("0 0 200 200", `
      ${blob(98, 106, 70, 2)}
      <path class="ink" d="M46 166 L118 62 Q130 64 136 80 Z"/>
      <path class="ink" d="M118 62 Q124 50 136 52 Q139 66 136 80"/>
      <path class="ink thin" d="M136 52 Q142 42 152 44"/>
      <path class="ink thin" d="M82 115 L91 122 M100 89 L114 100"/>
      <circle class="dot" cx="38" cy="176" r="2.2"/><circle class="dot" cx="32" cy="184" r="1.7"/><circle class="dot" cx="28" cy="191" r="1.2"/>
      <path class="ink" d="M150 174 C122 172 118 136 140 124 C158 114 178 128 173 147 C170 157 160 161 153 155 C147 150 149 142 155 142"/>
      <path class="ink thin" d="M149 164 C131 161 129 140 143 132 C155 126 166 134 164 145"/>
      <circle class="dot" cx="182" cy="140" r="1.5"/><circle class="dot" cx="180" cy="156" r="1.5"/><circle class="dot" cx="172" cy="170" r="1.5"/><circle class="dot" cx="130" cy="122" r="1.5"/>
      <circle class="ink" cx="54" cy="58" r="7"/>
      ${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<ellipse class="ink thin" cx="${f(54 + 16 * Math.cos(a * Math.PI / 180))}" cy="${f(58 + 16 * Math.sin(a * Math.PI / 180))}" rx="7" ry="3.2" transform="rotate(${a} ${f(54 + 16 * Math.cos(a * Math.PI / 180))} ${f(58 + 16 * Math.sin(a * Math.PI / 180))})"/>`).join("")}
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => `<circle class="dot" cx="${f(54 + 28 * Math.cos(i * Math.PI / 6))}" cy="${f(58 + 28 * Math.sin(i * Math.PI / 6))}" r="1.3"/>`).join("")}
      ${leaf(150, 96, 26, 7, -70)}`),

    sangeet: () => {
      let zig = "M54 " + f(82 - 24 * (6 / 104) * (98 / 104));
      for (let i = 0, x = 56; x <= 146; x += 10, i++) {
        const t = (x - 48) / 104;
        const y = i % 2 === 0 ? 82 - 24 * t * (1 - t) + 2 : 142 + 24 * t * (1 - t) - 2;
        zig += ` L${f(x)} ${f(y)}`;
      }
      return svg("0 0 200 200", `
        ${blob(100, 112, 68, 3)}
        <path class="ink thin" d="M48 84 Q100 22 152 84"/>
        <ellipse class="ink" cx="48" cy="112" rx="12" ry="30"/>
        <path class="ink" d="M48 82 Q100 70 152 82 M48 142 Q100 154 152 142 M152 82 Q164 112 152 142"/>
        <path class="ink thin" d="${zig}"/>
        <ellipse class="ink thin" cx="48" cy="112" rx="5" ry="13"/>
        <g class="bob"><ellipse class="dot" cx="152" cy="40" rx="7" ry="5" transform="rotate(-20 152 40)"/>
        <path class="ink" d="M158 38 L158 12 Q168 18 166 30"/></g>
        <g class="bob delay"><ellipse class="dot" cx="30" cy="52" rx="6" ry="4.4" transform="rotate(-20 30 52)"/><ellipse class="dot" cx="54" cy="46" rx="6" ry="4.4" transform="rotate(-20 54 46)"/>
        <path class="ink" d="M35 50 L35 24 L59 18 L59 44"/><path class="ink" d="M35 30 L59 24"/></g>
        <path class="ink thin" d="M100 176 q4 -6 8 0 q4 6 8 0 M74 182 q4 -6 8 0"/>`);
    },

    marathi: () => svg("0 0 200 200", `
      ${blob(100, 120, 68, 4)}
      ${leaf(76, 76, 42, 10, -168)}${leaf(82, 70, 42, 10, -132)}${leaf(118, 70, 42, 10, -48)}${leaf(124, 76, 42, 10, -12)}
      <ellipse class="ink" cx="100" cy="52" rx="18" ry="22"/>
      <path class="ink thin" d="M100 30 Q95 20 88 16 M100 30 Q105 18 113 15 M100 30 L100 12 M92 44 Q96 56 92 68 M108 44 Q104 56 108 68"/>
      <ellipse class="ink" cx="100" cy="78" rx="30" ry="6"/>
      <path class="ink" d="M74 80 L76 92 Q36 116 52 150 Q64 172 100 172 Q136 172 148 150 Q164 116 124 92 L126 80"/>
      <path class="ink thin" d="M52 128 Q100 144 148 128 M56 140 Q100 156 144 140"/>
      <circle class="ink" cx="100" cy="114" r="9"/><circle class="dot accent" cx="100" cy="114" r="4.5"/>
      ${[64, 76, 88, 112, 124, 136].map(x => `<circle class="dot" cx="${x}" cy="${f(x < 100 ? 110 + (100 - x) * 0.05 : 110 + (x - 100) * 0.05)}" r="1.5"/>`).join("")}
      <path class="ink thin" d="M30 176 q6 -8 12 0 M158 176 q6 -8 12 0"/>`),

    bengali: () => svg("0 0 200 200", `
      ${blob(96, 112, 70, 5)}
      <path class="ink" d="M76 24 Q68 70 44 156 Q76 172 108 156 Q84 70 76 24Z"/>
      <circle class="ink" cx="76" cy="17" r="5"/>
      <path class="ink thin" d="M76 12 L76 4 M70 14 L66 8 M82 14 L86 8"/>
      <path class="ink" d="M64 78 Q76 85 88 78 M54 116 Q76 127 98 116"/>
      <path class="ink thin" d="M58 98 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6"/>
      <path class="ink thin" d="M56 122 q4 6 8 0 q4 6 8 0 q4 6 8 0 q4 6 8 0 q4 6 8 0"/>
      <path class="ink thin" d="M70 54 Q76 50 82 54 M68 62 Q76 58 84 62"/>
      <circle class="dot" cx="76" cy="140" r="2"/><circle class="dot" cx="64" cy="142" r="1.5"/><circle class="dot" cx="88" cy="142" r="1.5"/>
      <g transform="rotate(16 150 140) translate(14 -10)">
        <path class="ink" d="M150 170 C126 150 116 120 128 104 C136 94 148 98 150 108 C152 98 164 94 172 104 C184 120 174 150 150 170Z"/>
      </g>
      <path class="ink fill-paper" d="M150 172 C126 152 116 122 128 106 C136 96 148 100 150 110 C152 100 164 96 172 106 C184 122 174 152 150 172Z"/>
      <path class="ink thin" d="M150 110 L150 166 M150 126 Q140 120 132 118 M150 126 Q160 120 168 118 M150 144 Q141 140 135 136 M150 144 Q159 140 165 136"/>
      <path class="ink thin" d="M150 172 L152 182"/>`),

    reception: () => svg("0 0 200 200", `
      ${blob(100, 112, 66, 6)}
      <g transform="rotate(-14 80 160)">
        <path class="ink" d="M67 42 L93 42 Q95 94 80 106 Q65 94 67 42Z"/>
        <path class="ink thin" d="M68 62 Q80 66 92 62"/>
        <circle class="bubble" cx="76" cy="90" r="1.8"/><circle class="bubble d2" cx="84" cy="96" r="1.4"/><circle class="bubble d3" cx="80" cy="84" r="1.2"/>
        <path class="ink" d="M80 106 L80 152 M66 155 Q80 148 94 155"/>
      </g>
      <g transform="rotate(14 120 160)">
        <path class="ink" d="M107 42 L133 42 Q135 94 120 106 Q105 94 107 42Z"/>
        <path class="ink thin" d="M108 62 Q120 66 132 62"/>
        <circle class="bubble d2" cx="116" cy="92" r="1.6"/><circle class="bubble" cx="124" cy="86" r="1.3"/><circle class="bubble d3" cx="120" cy="98" r="1.6"/>
        <path class="ink" d="M120 106 L120 152 M106 155 Q120 148 134 155"/>
      </g>
      <g class="twinkle"><path class="ink fill-accent" d="M100 10 Q102 24 114 26 Q102 28 100 42 Q98 28 86 26 Q98 24 100 10Z"/></g>
      <path class="ink thin" d="M72 20 l-8 -6 M128 20 l8 -6 M66 34 l-10 0 M134 34 l10 0"/>
      <path class="ink thin" d="M86 176 Q100 168 114 176 M100 172 q-10 -10 -16 -2 q4 8 16 2 q10 -10 16 -2 q-4 8 -16 2"/>`),

    bouquet: () => svg("0 0 200 220", `
      ${blob(100, 122, 74, 7)}
      <path class="ink" d="M100 140 Q96 110 80 80 M100 140 Q100 100 104 64 M100 140 Q108 112 130 88 M100 140 Q88 118 60 108 M100 140 Q116 122 146 116"/>
      ${leaf(92, 112, 22, 6, -150)}${leaf(106, 104, 22, 6, -30)}${leaf(97, 92, 20, 5, -110)}${leaf(118, 116, 22, 6, -10)}
      ${rose(80, 78, 14)}${rose(104, 60, 15)}${rose(131, 86, 13)}
      ${marigold(58, 106, 11, 10)}${marigold(148, 114, 10, 9)}
      <path class="ink fill-paper" d="M74 202 Q60 172 78 142 L122 142 Q140 172 126 202 Z"/>
      <ellipse class="ink" cx="100" cy="142" rx="22" ry="5"/>
      <path class="ink thin" d="M70 172 Q100 182 130 172"/>
      <path class="ink" d="M100 156 q-16 -12 -20 0 q4 10 20 0 q16 -12 20 0 q-4 10 -20 0 M100 156 l-8 16 M100 156 l8 16"/>
      <circle class="dot" cx="40" cy="70" r="1.5"/><circle class="dot" cx="162" cy="70" r="1.5"/><circle class="dot" cx="150" cy="44" r="1.2"/>`),

    divider: () => svg("0 0 260 40", `
      <path class="ink thin" d="M8 22 Q40 8 72 22 T118 20"/>
      ${heart(130, 20, 1, "ink fill-accent")}
      <path class="ink thin" d="M142 20 Q170 8 200 22 T252 22"/>`, "divider-art"),

    arrow: () => svg("0 0 40 70", `<path class="ink" d="M20 4 Q12 30 20 60 M10 50 L20 62 L30 50"/>`, "arrow-art"),
  };

  window.ART = ART;
})();
