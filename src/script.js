const POS_ORDER = { n: 0, v: 1, adj: 2, adv: 3 };
DATA.sort((a, b) => a.root.localeCompare(b.root, 'en', { sensitivity: 'base' }));

const totalWords = DATA.reduce((n, f) => n + f.entries.length, 0);
const totalPhrases = PHRASES.length;
const totalPatternEx = PATTERNS.reduce((n, p) => n + p.examples.length, 0);
const totalSP = SENTENCE_PATTERNS.reduce((n, g) => n + 1 + g.items.length, 0);

// ------------------------------------------------------------
// Render
// ------------------------------------------------------------
function renderWords(){
  document.getElementById('families').innerHTML = DATA.map(fam => {
    const sorted = [...fam.entries].sort((a, b) => (POS_ORDER[a.pos] ?? 99) - (POS_ORDER[b.pos] ?? 99));
    return `
    <section class="family" data-root="${fam.root.toLowerCase()}">
      <div class="entries">
        ${sorted.map(e => `
          <div class="entry" data-text="${(e.w + ' ' + e.m).toLowerCase()}">
            <span class="headword ${e.pos ? 'headword-' + e.pos : ''}">${e.w}</span>
            <span class="pos ${e.pos ? 'pos-' + e.pos : ''}">${e.pos}</span>
            <span class="meaning">${e.m}</span>
          </div>
        `).join('')}
      </div>
    </section>`;
  }).join('');
}
function renderPhrases(){
  document.getElementById('phrasesList').innerHTML = PHRASES.map(p => `
    <div class="phrase" data-text="${(p.en + ' ' + p.uz).toLowerCase()}">
      <span class="phrase-en">${p.en}</span>
      <span class="phrase-uz">${p.uz}</span>
    </div>
  `).join('');
}
function renderPatterns(){
  document.getElementById('patternsList').innerHTML = PATTERNS.map(pat => `
    <div class="pattern" data-text="${(pat.pattern + ' ' + pat.gloss + ' ' + pat.examples.map(e => e.en + ' ' + e.uz).join(' ')).toLowerCase()}">
      <div class="pattern-head">
        <span class="pattern-name">${pat.pattern}</span>
        <span class="pattern-gloss">${pat.gloss}</span>
      </div>
      <ul class="pattern-examples">
        ${pat.examples.map(e => `<li><span class="ex-en">${e.en}</span><span class="ex-uz">${e.uz}</span></li>`).join('')}
      </ul>
    </div>
  `).join('');
}
function renderSentencePatterns(){
  document.getElementById('sentencePatternsList').innerHTML = SENTENCE_PATTERNS.map(g => `
    <div class="spattern" data-text="${(g.header.en + ' ' + g.header.uz + ' ' + g.items.map(e => e.en + ' ' + e.uz).join(' ')).toLowerCase()}">
      <div class="pattern-head">
        <span class="pattern-name">${g.header.en}</span>
        <span class="pattern-gloss">${g.header.uz}</span>
      </div>
      <ul class="pattern-examples">
        ${g.items.map(e => `<li><span class="ex-en">${e.en}</span><span class="ex-uz">${e.uz}</span></li>`).join('')}
      </ul>
    </div>
  `).join('');
}
renderWords(); renderPhrases(); renderPatterns(); renderSentencePatterns();

// ------------------------------------------------------------
// Tabs
// ------------------------------------------------------------
const tabButtons = document.querySelectorAll('.tab-btn');
const views = { words: document.getElementById('view-words'), phrases: document.getElementById('view-phrases'), patterns: document.getElementById('view-patterns'), sentencePatterns: document.getElementById('view-sentencePatterns') };
const wordsLegend = document.getElementById('wordsLegend');
const searchInput = document.getElementById('search');
const countEl = document.getElementById('count');
const noMatchEl = document.getElementById('noMatch');
const footerEl = document.getElementById('footerCount');
let activeTab = 'words';

function baseCountText(){
  if (activeTab === 'words') return totalWords + " ta shakl";
  if (activeTab === 'phrases') return totalPhrases + " ta ibora";
  if (activeTab === 'patterns') return totalPatternEx + " ta misol";
  return totalSP + " ta shakl";
}
function footerText(){
  return DATA.length + " ta so'z oilasi · " + totalWords + " ta shakl  |  " +
         totalPhrases + " ta ibora  |  " + PATTERNS.length + " ta naqsh  |  " +
         SENTENCE_PATTERNS.length + " ta gap qolipi";
}
footerEl.textContent = footerText();

function switchTab(tab){
  activeTab = tab;
  tabButtons.forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  Object.entries(views).forEach(([k, el]) => el.classList.toggle('active', k === tab));
  wordsLegend.style.display = tab === 'words' ? '' : 'none';
  searchInput.value = '';
  searchInput.placeholder = tab === 'words' ? "So'z yoki tarjimani qidiring..." : tab === 'phrases' ? "Ibora yoki tarjimani qidiring..." : tab === 'patterns' ? "Naqsh yoki misolni qidiring..." : "Gap qolipini qidiring...";
  applySearch('');
}
tabButtons.forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));

function applySearch(q){
  q = q.trim().toLowerCase();
  let visibleCount = 0;
  let any = false;
  const selector = activeTab === 'phrases' ? '.phrase' : activeTab === 'patterns' ? '.pattern' : activeTab === 'sentencePatterns' ? '.spattern' : null;

  if (activeTab === 'words'){
    document.querySelectorAll('.family').forEach(fam => {
      let famHasMatch = false;
      fam.querySelectorAll('.entry').forEach(entry => {
        const match = !q || entry.dataset.text.includes(q);
        entry.style.display = match ? '' : 'none';
        if (match){ famHasMatch = true; visibleCount++; }
      });
      fam.style.display = famHasMatch ? '' : 'none';
      if (famHasMatch) any = true;
    });
  } else {
    document.querySelectorAll(selector).forEach(el => {
      const match = !q || el.dataset.text.includes(q);
      el.style.display = match ? '' : 'none';
      if (match){ any = true; visibleCount++; }
    });
  }

  countEl.textContent = q ? (visibleCount + " ta natija topildi") : baseCountText();
  noMatchEl.style.display = (q && !any) ? 'block' : 'none';
}
searchInput.addEventListener('input', () => applySearch(searchInput.value));
applySearch('');
