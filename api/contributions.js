const USERNAME = "FransLard";

function rangeFor(y) {
  const now = new Date();
  if (!y || y === "lastYear" || y === "last") {
    const to = now.toISOString().slice(0, 10);
    const fromDate = new Date(now);
    fromDate.setFullYear(fromDate.getFullYear() - 1);
    fromDate.setDate(fromDate.getDate() + 1);
    return { from: fromDate.toISOString().slice(0, 10), to, key: "lastYear" };
  }
  if (/^\d{4}$/.test(y)) {
    return { from: `${y}-01-01`, to: `${y}-12-31`, key: y };
  }
  return { from: null, to: null, key: null };
}

function levelFor(count, explicit) {
  if (Number.isInteger(explicit) && explicit >= 0 && explicit <= 4) return explicit;
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  return 4;
}

export default async function handler(req, res) {
  try {
    const y = req.query && req.query.y;
    const { from, to, key } = rangeFor(Array.isArray(y) ? y[0] : y);
    if (!from) {
      res.status(400).json({ error: "invalid year" });
      return;
    }
    const upstream = `https://github.com/users/${USERNAME}/contributions?from=${from}&to=${to}`;
    const r = await fetch(upstream, {
      headers: { "User-Agent": "portfolio-contrib-proxy", Accept: "text/html" },
    });
    if (!r.ok) throw new Error(`github returned status ${r.status}`);
    const html = await r.text();

    const dates = [];
    const dateRe = /data-date="(\d{4}-\d{2}-\d{2})"/g;
    let dm;
    while ((dm = dateRe.exec(html)) !== null) dates.push(dm[1]);

    const counts = [];
    const tipRe = /(\d+|No) contributions? on /g;
    let tm;
    while ((tm = tipRe.exec(html)) !== null) {
      counts.push(tm[1] === "No" ? 0 : Number(tm[1]));
    }

    const levels = [];
    const levelRe = /data-level="(\d+)"/g;
    let lm;
    while ((lm = levelRe.exec(html)) !== null) levels.push(Number(lm[1]));

    const seen = new Set();
    const contributions = [];
    for (let i = 0; i < dates.length; i++) {
      if (seen.has(dates[i])) continue;
      if (key === "lastYear" && (dates[i] < from || dates[i] > to)) continue;
      seen.add(dates[i]);
      const count = i < counts.length ? counts[i] : 0;
      contributions.push({
        date: dates[i],
        count,
        level: levelFor(count, levels[i]),
      });
    }
    contributions.sort((a, b) => (a.date < b.date ? -1 : 1));
    if (contributions.length === 0) throw new Error("no contribution data parsed");

    const total = contributions.reduce((s, d) => s + d.count, 0);
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).json({ total: { [key]: total }, contributions });
  } catch (err) {
    res.status(502).json({ error: err instanceof Error ? err.message : "proxy failed" });
  }
}
