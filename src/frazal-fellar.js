// ============================================================
// FRAZAL FE'LLAR / NAQSHLAR — YANGI BLOK QO'SHISH:
//     Birinchi qator: Naqsh => izoh
//     Keyingi qatorlar "- " bilan boshlanadi: misol => tarjima
//     Bloklar orasida bitta bo'sh qator qoldiring.
// ============================================================
const RAW_PATTERNS = `
Such + noun => shunday / bunday / juda ... narsa/odam
- such a good boy => shunday yaxshi bola
- such a trifle => shunday arzimas narsa

So + adjective => juda / shunchalik + sifat
- so good => juda yaxshi
- so beautiful => juda chiroyli

So + adverb => juda / shunchalik + ravish
- so quickly => juda tez
- so carefully => juda ehtiyotkorlik bilan
`;

// ------------------------------------------------------------
// Parser — bunga tegishning hojati yo'q
// ------------------------------------------------------------
function buildPatterns(raw){
  return raw.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean).map(block => {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    const header = lines[0];
    const hi = header.indexOf('=>');
    const pattern = header.slice(0, hi).trim();
    const gloss = header.slice(hi + 2).trim();
    const examples = lines.slice(1).map(l => {
      const clean = l.replace(/^-+\s*/, '');
      const ei = clean.indexOf('=>');
      if (ei === -1) return null;
      return { en: clean.slice(0, ei).trim(), uz: clean.slice(ei + 2).trim() };
    }).filter(Boolean);
    return { pattern, gloss, examples };
  });
}

const PATTERNS = buildPatterns(RAW_PATTERNS);
