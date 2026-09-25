// ============================================================
// GAP QOLIPLARI — YANGI GURUH QO'SHISH:
//   Birinchi qator = SARLAVHA (asosiy shakl):      I think ... => Menimcha ...
//   Undan keyingi qatorlar = shu guruhning misollari (item):
//                                                    In my opinion ... => Mening fikrimcha ...
//   Ikki guruh orasida BITTA BO'SH QATOR qoldiring — shu "keyingi guruh boshlandi" degani.
// ============================================================
const RAW_SENTENCE_PATTERNS = `
I think ... => Menimcha .... (Fikr bildirishning eng oddiy usuli)

In my opinion ... => Mening fikrimcha ...
`;

// ------------------------------------------------------------
// Parser — bunga tegishning hojati yo'q
// ------------------------------------------------------------
function parseSPLine(line){
  const idx = line.indexOf('=>');
  if (idx === -1) return null;
  return { en: line.slice(0, idx).trim(), uz: line.slice(idx + 2).trim() };
}
function buildSentencePatterns(raw){
  return raw.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean).map(block => {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) return null;
    const header = parseSPLine(lines[0]);
    if (!header) return null;
    const items = lines.slice(1).map(parseSPLine).filter(Boolean);
    return { header, items };
  }).filter(Boolean);
}

const SENTENCE_PATTERNS = buildSentencePatterns(RAW_SENTENCE_PATTERNS);
