// Ro'yxat har doim ildiz so'z (root) bo'yicha alifbo tartibida chiqadi —
// words.js faylidagi DATA massiviga yangi blok qo'shsangiz, tartiblash
// avtomatik ishlaydi, qo'lda joylashtirish shart emas.
DATA.sort((a, b) => a.root.localeCompare(b.root, 'en', { sensitivity: 'base' }));

const familiesEl = document.getElementById('families');
const noMatchEl = document.getElementById('noMatch');
const countEl = document.getElementById('count');
const totalEntries = DATA.reduce((n, f) => n + f.entries.length, 0);

function render() {
  familiesEl.innerHTML = DATA.map(fam => `
    <section class="family" data-root="${fam.root.toLowerCase()}">
      <div class="family-head">
        <span class="root-word">${fam.root}</span>
        <span class="root-note">${fam.note}</span>
      </div>
      <div class="entries">
        ${fam.entries.map(e => `
          <div class="entry" data-text="${(e.w + ' ' + e.m).toLowerCase()}">
            <span class="headword">${e.w}</span>
            <span class="pos pos-${e.pos}">${e.pos}</span>
            <span class="meaning">${e.m}</span>
          </div>
        `).join('')}
      </div>
    </section>
  `).join('');
  countEl.textContent = totalEntries + " ta shakl";
  document.getElementById('footerCount').textContent =
    DATA.length + " ta so'z oilasi · " + totalEntries + " ta shakl";
}
render();

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;
  let anyFamilyVisible = false;

  document.querySelectorAll('.family').forEach(fam => {
    let famHasMatch = false;
    fam.querySelectorAll('.entry').forEach(entry => {
      const match = !q || entry.dataset.text.includes(q);
      entry.style.display = match ? '' : 'none';
      if (match) { famHasMatch = true; visibleCount++; }
    });
    fam.style.display = famHasMatch ? '' : 'none';
    if (famHasMatch) anyFamilyVisible = true;
  });

  noMatchEl.style.display = anyFamilyVisible ? 'none' : 'block';
  countEl.textContent = q ? (visibleCount + " ta shakl topildi") : (totalEntries + " ta shakl");
});
