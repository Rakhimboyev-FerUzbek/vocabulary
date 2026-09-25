// Bu fayl saytni "offline" (internetsiz) ishlaydigan qiladi.
// Strategiya: "stale-while-revalidate" —
//   1) Avval keshdagi (saqlangan) versiyani darhol ko'rsatadi (internet bo'lmasa ham tez ishlaydi)
//   2) Fonda serverdan yangi versiyani so'raydi va keshni yangilaydi
//   3) Keyingi safar ochganda eng so'nggi versiya ko'rinadi

const CACHE_NAME = 'lugat-cache-v3'; // katta o'zgarish qilsangiz, bu raqamni oshiring (v2, v3...)

const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './data/words.js',
  './data/iboralar.js',
  './data/frazal-fellar.js',
  './data/gap-qoliplari.js',
  './manifest.json'
];

// O'rnatish — barcha fayllarni oldindan keshga yuklaydi
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
});

// Faollashtirish — eski keshlarni tozalaydi
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Har bir so'rovni ushlab, kesh + tarmoq strategiyasini qo'llaydi
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);

      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(() => cached); // Internet yo'q va tarmoq xato bersa — keshdagini qaytaradi

      // Kesh mavjud bo'lsa, darhol o'shani ko'rsatamiz (tez va offline ishlaydi),
      // fonda esa networkFetch keshni yangilab turadi.
      return cached || networkFetch;
    })
  );
});
