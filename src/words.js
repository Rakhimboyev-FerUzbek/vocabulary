// ============================================================
// YANGI SO'Z QO'SHISH — JUDA OSON:
// Har bir qatorni aynan shu formatda yozing:
//     so'z (pos) => tarjima, tarjima2, ...
// pos: n / v / adj / adv (ba'zi so'zlarda pos shart emas, masalan "except =>")
//
// Bir OILA (masalan valid/validate/validation/...) ni ajratish uchun
// qatorlarni ketma-ket yozing. Ikki OILA orasida esa BITTA BO'SH QATOR
// qoldiring — shu bo'sh qator "yangi oila boshlandi" degani.
//
// Root (oila sarlavhasi) va uning tarjimasi avtomatik hisoblanadi:
// oiladagi ENG QISQA so'z root sifatida olinadi (masalan "validate,
// validation, valid, invalid, validator, validity" ichidan "valid").
// Shuning uchun sizga hech narsani qo'lda belgilash shart emas —
// shunchaki so'zlaringizni pastga joylashtiring.
// ============================================================

const RAW_WORDS = `
probability (n) => ehtimollik, ehtimol
probable (adj) => ehtimoliy, yuz berishi mumkin bo'lgan
probably (adv) => ehtimol, balki 
probabilistic (adj) => ehtimollikka asoslangan
probabilistically (adv) => ehtimollik asosida

desire (n) => istak, xohish
desire (v) => xohlamoq
desired (adj) => kerakli, istalgan
desirable (adj) => ma'qul, istaladigan
desirably (adv) => ma'qul tarzda
undesirable (adj) => istalmagan, nomaqbul

achieve (v) => erishmoq
achieved (adj) => erishgan
achievement (n) => yutuq, erishilgan natija
achievable (adj) => erishish mumkin bo'lgan
unachievable (adj) => erishib bo'lmaydigan
average (n) => o'rtacha qiymat

average (adj) => o'rtacha
average (v) => o'rtachasini hisoblamoq
averagely (adv) => o'rtacha tarzda

analyze (v) => tahlil qilmoq
analysis (n) => tahlil
analytical (adj) => tahliliy
analytically (adv) => tahliliy tarzda
analyst (n) => tahlilchi
analyzer / analyser => tahlil qiluvchi vosita yoki dastur

reproduce (v) => qayta yaratmoq, takroran hosil qilmoq
reproduced (adj) => qayta yaratilgan
reproduction (n) => qayta yaratish, takrorlash
reproducible (adj) => qayta yaratish yoki takrorlash mumkin bo'lgan
reproducibly (adv) => qayta yaratish mumkin bo'lgan tarzda
reproducibility (n) => qayta yaratish yoki takrorlash mumkinligi

horizontal (adj) => gorizontal, yotiq
horizontally (adv) => gorizontal ravishda
horizontality (n) => gorizontallik 

vertical (adj) => vertikal, tik
vertically (adv) => vertikal ravishda
verticality (n) => vertikallik

`;

// ============================================================
// Pastdan quyi — parser. Bunga tegishning hojati yo'q.
// ============================================================
function parseWordLine(line) {
  const arrowIdx = line.indexOf('=>');
  if (arrowIdx === -1) return null;
  const left = line.slice(0, arrowIdx).trim();
  const meaning = line.slice(arrowIdx + 2).trim();
  if (!left || !meaning) return null;

  const posMatch = left.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  let word = left, pos = '';
  if (posMatch) {
    word = posMatch[1].trim();
    pos = posMatch[2].trim().toLowerCase();
  }
  return { w: word, pos, m: meaning };
}

function buildFamilies(raw) {
  return raw
    .split(/\n\s*\n/)
    .map(block => block.trim())
    .filter(Boolean)
    .map(block => {
      const entries = block
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean)
        .map(parseWordLine)
        .filter(Boolean);
      if (entries.length === 0) return null;

      // Root = oiladagi eng qisqa so'z (odatda bazaviy shakl bo'ladi)
      let root = entries[0];
      for (const e of entries) {
        if (e.w.length < root.w.length) root = e;
      }
      return { root: root.w, note: root.m, entries };
    })
    .filter(Boolean);
}

const DATA = buildFamilies(RAW_WORDS);