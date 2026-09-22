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

validation (n) => tekshirish, tasdiqlash, haqiqiyligini tekshirish, talabga mosligini tekshirish
validate (v) => tekshirmoq, tasdiqlamoq, haqiqiyligini aniqlamoq, talabga mosligini tekshirmoq
valid (adj) => haqiqiy, too'g'ri, yaroqli, talabga mos
invalid (adj) => notog'g'ri yaroqsiz, haqiqiy emas
validator (n) => tekshiruvchi, validatsiya qiluvchi vosita yoki dastur
validity (n) => haqiqiylik, to'g'rilik, yaroqlilik

well-rounded (adj) => har tomonlama rivojlangan, ko‘p qirrali, turli jihatlarda yetarlicha bilim va ko‘nikmaga ega

collective (adj) => jamoaviy, umumiy, birgalikdagi, guruhga tegishli
collective (n) => guruh, jamoa, umumiy to'plam
collect (v) => to'palmoq, yig'moq
collection (n) => to'pdam, kolleksiya
collector (n) => yig'uvchi, to'plovchi
collectively (adv) => birgalikda, jamoaviy tarzda, umumiy holda

simplified (adj) => soddalashtirilgan, osonlashtirilgan, murakkabligi kamaytirilgan
simplify (v) => soddalshtirmoq, osonlashtirmoq, murakkabligini kamaytirmoq
simple (adj) => oddiy, sodda, murakkab bo'lmagan
simply (adv) => oddiygina, shunchaki, sodda tarzda
simplicity (n) => soddalik, oddiylik
simplification (n) => soddalashtirish

exaggerated (adj) => bo'rttirilgan oshirib yuborilgan haddan tashqari kattalashtirilgan
exaggerate (v) => bo'rttirmoq, oshirib ko'rsatmoq, haddan tashqari kattalashtirib aytmoq
exaggeration (n) => bo'rttirish, oshirib ko'rsatish, mubolag'a

overcomplicated (adj) => haddan tashqari murakkablashtirilgan, ortiqcha murakkab, keragidan ko'ra qiyin
complicate (v) => murakkablashtirmoq, qiyinlashtirmoq
complicated (adj) => murakkab, qiyin
complication (n) => murakkablik, asorat, qo'shimcha muammo

hypothetical (adj) => faraziy, taxminiy, shartli, haqiqatda mavjud bo'lmagan, faqat tasavvur yoki taxmin asosidagi
hypothesis (n) => gipoteza, faraz, ilmiy taxmin
hypothesize / hypthesise (v) => faraz qilmoq, gipoteza ilgari surmoq
hypothetically (adv) => faraziy tarzda, faraz qiladigan bo'lsak, taxminan

circuit (n) => zanjir, elektr sxemasi, elektron sxema, aylanma yo'l

sparkline (n) => kichik grafik, ixcham diagramma, ma'lumotdagi o'zgarishlarni ko'rsatuvchi kichik chiziqli grafik

except => ...dan tashqari / ...dan boshqa / bundan mustasno
exception (n) => istisno
exceptional (adj) => ajoyib, noodatiy, istisno darajasidagi
exceptionally (adv) => nihoyatda, odatdagidan juda yuqori darajada

authenticate (v) => haqiqiyligini tasdiqlamoq, autentifikatsiya qilmoq 
authentication (n) => autentifikatsiya, shaxsni tasdiqlash
authenticator (n) => autentifikatsiya qiluvchi vosita yoki datur
authenticated (adj) => tasdiqlangan, autentifikatsiyadan o'tgan
authentic (adj) => haqiqiy, asl, ishonchli
authentically (adv) => haqiqiy tarzda

overview (n) => umumiy ko'rinish, umumiy ma'lumot, qisqacha sharh
overview (v) => umumiy ko'rinishda ko'rib chiqmoq

simulate (v) => taqlid qilmoq, simulyatsiya qilmoq, modellashtirmoq
simulated (adj) => simulyatsiya qilingan, taqlid qilingan
simulation (n) => simulyatsiya, modellashtirish
simulator (n) => simulyator, simulyatsiya qiluvchi dastur yoki qurilma
simulative (adv) => simulyatsiyaga oid, taqlid qiluvchi
simulatively (adv) => simulyatsion tarzda

showcase (n) => ko'rgazma, namoyish, taqdimot
showcase (v) => namoyish qilmoq, ko'rsatmoq
showcased (adj) => namoyish qilingan

include (v) => o'z ishiga olmoq, qamrab olmoq
included (adj) => o'z ichiga olgan, kiritilgan
inclusion (n) => kiritish, qo'shish, qamrab olish
inclusive (adj) => qamrab oluvchi, barcha narsani o'z ichiga olgan
inclusively (adv) => qamrab olgan holda

allow (v) => ruxsat bermoq, imkon bermoq
allowed (adj) => ruxsat berilgan
allowance (n) => ruxsat etilgan miqdor, nafaqa, ajratma

custom (adj) => maxsus, foydalanuvchi tomonidan tanlangan
custom (n) => urf-odat, an'ana
customize (v) => moslashtirmoq, sozlamoq
customized (adj) => moslashtirilgan
customization (n) => moslashtirish, sozlash
customizable (adv) => moslashtirilishi mumkin bo'lgan

guide (n) => yo'l-yo'riq, qo'llanma, yo'lboshchi
guide (v) => yo'l-yo'riq ko'rsatmoq, yo'naltirmoq, yo'l ko'rsatmoq
guided (adj) => yo'l-yo'riq asosidagi
guiding (adj) => yo'naltiruvchi
guidance (n) => yo'l-yo'riq, maslahat, ko'rsatma
guidebook (n) => yo'riqnoma, ko'rsatma, amal qiladigan qoida
guideline (n) => yo‘riqnoma, ko‘rsatma, tavsiya, amal qilinadigan qoida

perspective (n) => nuqtai nazar, qarash, yondashuv, nuqtai nazardan qarash, perspektiva
perspectival (adj) => nuqtai nazarga oid, perspektivga oid

persistence (n) => saqlanib qolish, davomiylik, ma'lumotlarni davomiy saqlash
persist (v) => davom etmoq, saqlanib qolmoq, qat'iyat bilan davom ettirmoq
persistent (adj) => doimiy, saqlanib qoladigan, qat'iyatli
persistently (adv) => doimiy ravishda, qatiyat bilan

cluster (n) => guruh, to'da, bir joyga jamlangan narsalar, klaster
cluster (v) => guruhlamoq, bir joyga jamlamoq
clustered (adj) => guruhlangan, klasterlangan
clustering (n) => guruhlash, klasterlash

configuration (n) => konfiguratsiya, sozlamalar, sozlash holati
configured (adj) => sozlangan, konfiguratsiya qilingan, moslab o'rnatilgan
configure (v) => sozlamoq, konfiguratsiya qilmoq, moslamoq
configurable (adj) => sozlash mumkin bo'lgan, moslanadigan
configurability (n) => sozlash imkoniyati, moslashuvchanlik

matter (n) => masala, muammo, modda
matter (n) => ahamiyatga ega bo'lmoq, muhim bo'moq

isolation (n) => ajratish, izolyatsiya, alohidalik, boshqa narsalardan mustaqil holat
isolate (v) => ajratmoq, alohida qilmoq
isolated (adj) => ajratilgan, alohida, yakkalangan
isolatedly (adv) => alohida tarzda

distributed (adj) => taqsimlangan, tarqatilgan
distribution (n) => taqsimlash, tarqatish
distributive (adj) => taqsimlovchi, taqsimlashga oid

transaction (n) => bitim, kelishuv, oldi-sotdi operatsiyasi, moliyaviy operatsiya
transactional (adj) => bitimga oid, savdo-sotiqqa oid, operatsiyaga oid
transact (v) => bitim tuzmoq, operatsiya qilmoq
transactionally (adv) => bitim tarzida

replication (n) => nusxalash, ko'paytirish, takroriy nusxa yaratish, replikatsiya
replicate (v) => nusxalamoq, qayta yaratmoq, takrorlamoq
replica (n) => nusxa, ko'chirma
replicated (adj) => nusxalangan, ko'paytirilgan
replicative (adv) => nusxalashga oid, takrorlovchi

challenging (adj) => qiyin, murakkab, sinovli, katta kuch yoki harakat talab qiladigan
challenge (v) => qiyinchilik tug'dirmoq, sinamoq, da'vo qilmoq, qarshi chiqmoq
challenge (n) => qiyinchlik, sinov, da'vo
challenged (adj) => qiyinchlikka duch kelgan, qiynalayotgan
challenger (n) => raqib, da'vogar
challengeable (adj) => shubha ostiga qo'yish, bahslashish mumkin bo'lgan

mess (n) => tartibsiz, pala-partishlik, chalkash holat, noxush vaziyat
mess (v) => iflos qilmoq, buzib qo'ymoq, chalkashtirib yubormoq
messy (adj) => tartibsiz, pala-partish, chalkash
messily (adv) => tartibsiz tarzda
messiness (n) => tartibsizlik, pala-partishlik

serialization (n) => serializatsiya, malumotlarni saqlash yoki uzatish mumkin bo'lgan formatga aylantirish
serialize (v) => serizlizatsiya qilmoq
serialization (n) => serializatsiya
serialized (adj) => serializatsiya qilingan
deserialization (n) => deserializatsiya
deserialize (v) => deserializatsiya qilmoq

ideological (adj) => mafkuraviy, g'oyaviy, ma'lum bir g'oya yoki qarashlar tizimiga oid
ideology (n) => mafkura, g'oyalar tizimi
ideological (adj) => mafkuraviy, g'oyaviy
ideologically (adv) => mafkuraviy jihatdan, g'oyaviy nuqtai nazardan

controlled (adj) => nazorat qilinadigan, boshqariladigan, nazorat ostidagi
control (v) => nazorat qilmoq, boshqarmoq, jilovlamoq
control (n) => nazorat, boshqaruv
controllable (adj) => nazorat qilish mumkin bo'lgan
uncontrolled (adj) => nazoratsiz, boshqarilmaydigan
controllably (adv) => nazorat qilinadigan tarzda

communication (n) => muloqat, aloqa, kommunikatsiya, fikr almashish
communicate (v) => muloqat qilmoq, aloqa qilmoq, fikrini yetkazmoq
communicative (adj) => muloqatga kirishuvchan, fikrini yaxshi ifodalaydigan
communicatively (adv) => muloqat tarzida

customary (adj) => odatdagi, urf-odatga aylangan, an'anaviy, odat bo'lgan
custom (n) => urf-odat, an'ana, odat
customarily (adv) => odatda, odat bo'yicha, an'anaviy tarzda

bizarre (adj) => g'alati, juda noodatiy, antiqa, ajabtovur
bizarrely (adv) => g'alati tarzda, juda noodatiy ravishda
bizarreness (n) => g'alatilik, noodatiylik

totally (adv) => butunlay, to'liq, mutlaqo, tamoman
total (n) => jami yoki umumiy miqdor
total (adj) => umumiy, to'liq, jami
total (v) => jami hisoblamoq, butunlay vayron qilmoq
totality (n) => to'liqlik, butunlik, jami holat

credential (n) => malaka hujjati, vakolatni tasdiqlovchi ma’lumot
credentialed (adj) => malakasi tasdiqlangan, tegishli malakaga ega
credential (v) => malakani tekshirmoq, vakolatini tasdiqlamoq
credentialing (n) => malakani tasdiqlash jarayoni

cab (n) => taksi mashinasi, haydovchi kabinasi boshqaruv kabinasi

archived (adj) => arxivlangan, arxivga joylangan, faol holatdan chiqarilgan
archive (n) => arxiv, arxivdagi ma'lumotlar
archive (v) => arxivlamoq, arxivga joylamoq, faol holatdan chiqarmoq
archival (adj) => arxivga oid, arxiv uchun mo'ljallangan

absence (n) => yo'qlik, mavjud emaslik, qatnashmaslik, bo'lmaslik
absent (adj) => yo'q, qatnashmagan, mavjud bo'lmagan
absent (v) => o'zini olib qochmoq, chetlatmoq
absently (adv) => e'tiborsiz tarzda, xayoli boshqa joyda

uniqueness (n) => o'ziga xoslik, noyoblik, betakrorlik
unique (adj) => noyob, o'ziga xos, betakror
uniquely (adv) => o'ziga xos tarzda, noyob tarzda
uniqueness (n) => o'ziga xoslik, noyoblik

violation (n) => buzilish, qoidabuzarlik, buzish
violate (n) => buzmoq, rioya qilmaslik
violator (n) => qoidabuzar, qoidani buzgan shaxs
violative (adj) => buzuvchi

constraint (n) => cheklov, cheklvochi shart, chegaralovchi omil
constraint (v) => cheklamoq, majburlamoq
constrainted (adj) => cheklangan, majburiy

optimistic (adj) => optimistik, ijobiy fikrdagi, yaxshi natijaga umid qiladigan
optimism (n) => optimizm, ijobiy qarash
optimist (n) => optimist, ijobiy fikrlovchi odam

pessimistic (adj) => pessimistik, salbiy fikrdagi, yomon natijani kutadigan
pessimistically (adv) => pessimistik tarzda, salbiy qarash bilan
pessimism (n) => pessimizm, salbiy qarash, yomon natijani kutish
pessimist (n) => pessimist, salbiy fikrlovchi odam

lock (n) => qulf
lock (v) => qulflamoq, bloklamoq
locker (n) => qulflanadigan shkafcha
lockable (adj) => qulflash mumkin bo'lgan
locked (adj) => qulflangan, bloklangan
lockout (n) => bloklanib qolish
lockdown (n) => to‘liq bloklash / cheklash holati
unlock (v) => qulfini ochmoq, blokdan chiqarmoq
unlocked (adj) => qulfi ochilgan, blokdan chiqarilgantimeout (n) => vaqt tugashi, kutish vaqti tugashi, vaqt chegarasi

time out (phrasal verb) => vaqti tugamoq, vaqt tugashi sabab to'xtatmoq
timed out (adjective-like) => vaqti tugagan

grateful (adj) => minnatdor, tashakkur bildiruvchi
gratefully (adv) => minnatdorlik bilan, tashakkur bilan
gratitude (n) => minnatdorlik, tashakkur
gratefulness (n) => minnatdorlik
ungrateful (adj) => minnatdor bo'lgan, noshukr
ungratefully (adv) => minnatdorchiliksiz, noshukrlarcha
ungratefulness (n) => minnatdor bo'lmaslik, noshukurlik

arguably (adv) => aytish mumkinki, bahslashish mumkin bo'lgan tarzda, fikr yuritishga ko'ra, ehtimol eng ...
arguable (adj) => bahsli, munozarali, bahslashish mumkin bo'lgan
argue (v) => bahslashmoq, dalil keltirmoq
argument (n) => bahs, dalil, argument 
argumentative (adj) => bahslashuvchan

flex (v) => egmoq, bukmoq, taranglashtirmoq, mahoratini ustunligini ko'z-ko'z qilmoq
flexibility (n) => moslashuvchanlik, egiluvchanlik
flexible (adj) => moslashuvchan, egiluvchan
flexibly (adv) => moslashuvchan tarzda

repetition (n) => takrorlash, takrorlanish, takroriy holat
repeat (v) => takrorlamoq
repetitively (adv) => takroriy tarzda

verify (v) => tekshirmoq, tasdiqlamoq, verifikatsiya qilmoq
verified (adj) => tasdiqlangan, tekshirilgan, verifikatsiyadan o'tgan
verification (n) => tekshirish, tasdiqlash, verifikatsiya
verifiable (adj) => tekshirish yoki tasdiqlash mumkin bo'lgan
verifiably (adv) => tekshiriladigan yoki tasdiqlanadigan tarzda
unverified (adj) => tasdiqlanmagan, tekshirilmagan
unverifiable (adj) => tekshirib yoki tasdiqlab bo'lmaydigan

deliverable (n) => topshirilishi kerak bo'lgan natija, buyurtmachiga topshiriladigan mahsulot, yakuniy topshiriq natijasi
deliver (n) => yetkazib bermoq, topshirmoq, taqdim etmoq
delivered (adj) => yetkazib berilgan, topshirilgan
delivery (n) => yetkazib berish, topshirish

absolutely (adv) => mutlaqo, butunlay, albatta, hech shubhasiz, to'liq ravishda
absolute (adj) => mutlaq, to'liq, cheksiz, shubhasiz
absoluteness (n) => mutlaqlik, to'liqlik

smooth (adj) => silliq, ravon, muammosiz, bir maromdagi
smoothly (adv) => silliq tarzda, ravon, muammosiz, bir maromda
smoothneess (n) => silliqlik, ravonlik, bir maromdalik
smooth (v) => silliqlamoq, tekislamoq, muammolarni bartaraf etmoq

security (n) => xavfsizlik, himoya, xavfsizlikni ta'minlash
secure (adj) => xavfsiz, himoyalangan, ishonchli
secure (v) => himoya qimoq, xavfsizligini ta'minlamoq, qo'lga kiritmoq
securely (adv) => xavfsiz tarzda, ishonchli tarzda
secureness (n) => xavfsizlik, himoyalanganlik
insecure (adj) => xavfsiz bo'lmagan, himoyalanmagan, ishonchsiz
insecurity (n) => xavfsizlikning yo'qligi, himoyalanmaganlik, ishonchsizlik

previously (adv) => avval, ilgari, oldin, bundan oldin
previous (adj) => oldingi, avvalgi ilgari bo'lgan
previousness (n) => oldinlik, avvalgi holat

discuss (v) => muhokama qilmoq, muhokama qilib chiqmoq, gaplashmoq
discussion (n) => muhokama, suhbat, muhokama jarayoni
discussable (adj) => muhokama qilish mumkin bo'lgan

excuse (n) => bahona, uzr, sabab
excuse (v) => kechirmoq, uzrini qabul qilmoq, avf etmoq, oqlamoq
excusable (adj) => kechirish mumkin bo'lgan, oqlash mumkin bo'lgan
inexcusable (adj) => kechirib bo'lmaydigan, oqlab bo'lmaydigan
excused (adj) => uzrli deb hisoblangan, ozod qilingan, kechirilgan

resolve (v) => hal qilmoq, yechmoq, qaror qilmoq
resolved (adj) => hal qilingan, yechilgan
resolute (adj) => qat'iyatli, qat'iy
resolutely (adv) => qat'iyat bilan, qat'iy ravishda
resolution (n) => aniqlik, o'lcham, yechim, hal qilish

hide (v) => yashirmoq, berkitmoq, yashirinmoq
hidden (adj) => yashirin, ko'zga ko'rinmaydigan, berkitilgan
hider (n) => yashiruvchi, yashirinadigan odam yoki narsa
hiding (n) => yashirinib turish, yashirinish
hideout (n) => yashirin joy, pana joy
hiddenness (n) => yashirinlik

silently (adv) => jim, indamay, ovozsiz ravishda, sukut saqlab
silent (adj) => jim, sokin, ovozsiz
silence (n) => sukunat, jimlik
silence (v) => jim qilmoq

childish (adj) => bolalarcha, bolalarcha tutadigan yetuk emas
child (n) => bola
childlike (adj) => bolalarcha, bolaga xos

press (v) => bosmoq, siqmoq
press (n) => bosish, matbuot
pressing (adj) => shoshilinch, juda muhim
pressing (n) => bosish, siqish
pressure (n) => bosim, bosim kuchi
pressurized (adj) => bosim ostidagi, bosim berilgan

address (v) => murojaat qilmoq, muammmoni hal qilmoq, ko'rib chiqmoq
address (n) => manzil, murojaat, adres
addressed (adj) => murojaat qilingan, hal qilingan, ko'rib chiqilgan
addressing (n) => muammonni ko'rib chiqish

description (n) => tavsif, ta'rif, izoh, bayon, ta'rif
describe (v) => ta'riflamoq, tavsiflamoq
descriptive (adj) => tasviriy, tavsiflovchi, batafsil ta'rif beruvchi
descriptively (adv) => tasviriy tarzda

consistency (n) => izchillik, bir xillik, moslik, barqarorlik
consistent (adj) => izchil, bir xil, mos, barqaror
consistently (adv) => izchil ravishda, muntazam ravishda, bir xil tarzda
inconsistency (n) => nomuvofiqlik, ziddiyat, izchillikning yo'qligi
inconsistent (adj) => izchil bo'lmagan, mos kelmaydigan, ziddiyatli
inconsistently (adv) => izchil bo'lmagan tarzda, nomuvofiq tarzda

cunning (n) => ayyorlik, hiylakorlik, makkorlik
cunning (adj) => ayyor, makkor, hiylakor, hiyla ishlatib o'z maqsadiga erishadigan
cunningly (adv) => ayyorlik bilan, hiylakorona, makkorona

pathos (n) => achinish uyg'otuvchi holat yoki his, qayg'uli ta'sir
pathetic (adj) => achinarli, ayanchli, juda nochor, kulgili darajada yomon, uyatli
pathetically (adv) => achinarli tarzda, juda nochor tarzda
patheticness (n) => achinarlilik, nochorlik

sympathetic (adj) => hamdard, achinadigan, tushunadigan, qo'llab-quvvatlovchi, boshqalarning his-tuyg'ularini tushunishga harakat qiladigan
sympathy (n) => hamdardlik, achinish, birovning holatini tushunish
sympathetically (adv) => hamdardlik bilan, tushunish bilan
sympathize / sympathise (v) => hamdard bo'lmoq, achinmoq, birovning holatini tushunmoq

suitable (adj) => mos, ma'qul, to'g'ri keladigan, yaroqli, talabga javob beradigan
suit (v) => mos kelmoq, yarashmoq, ma'qul bo'lmoq
suitability (n) => moslik, yaroqlilik, maqsadga muvofiqlik
unsuitable (adj) => mos emas, yaroqsiz, to'g'ri kelmaydigan
unsuitably (adv) => nomuvofiq tarzda, mos kelmaydigan tarzda

variety (n) => xilma-xillik, turli-tumanlik, rang-baranglik, tur, xil
vary (v) => o'zgarib turmoq, farq qilmoq, turlicha bo'lmoq
various (adj) => turli xil, har xil, turfa
variously (adv) => turli tarzda, turlicha

blob (n) => dog'
blob (v) => dog' qilib tushirmoq

usual (adj) => odatdagi, odatiy, ko'nikilgan
usually (adv) => odatda, ko'pincha, aksariyat hollarda, odatdagidek
unusual (adj) => g'ayrioddiy, noodatiy
unusually (adv) => g'ayrioddiy tarzda, odatdagidan ko'ra
usualness (n) => odatdagi holat, odatiylik

miss (n) => o'tkazib yuborish, xato, nishonga tegmaslik
miss (v) => o'tkazib yubormoq, ko'rmay qolmoq, sog'inmoq, yetib kelolmaslik, qo'ldan boy bermoq, nishonga tekkiza olmaslik

category (n) => toifa, kategoriya, turkum
categorized (adj) => toifaga ajratilgan, turkumlangan, tasniflangan
categorize (v) => toifalarga ajratmoq, tasniflamoq, turkumlamoq
categorization (n) => tasniflash, toifalarga ajratish
categorical (adv) => qat'iy ravishda, keskin tarzda
categorically (adv) => qat'iy ravishda, keskin tarzda

leave (v) => ketmoq, tark etmoq, qoldirmoq, tashlab ketmoq, ruxsat bermoq
leave (n) => ta'til, ruxsat, ishdan vaqtincha ozodlik
leaver (n) => ketuvchi, tark etuvchi

fancy (adj) => hashamatli, dabdabali, chiroyli va o'ziga xos, murakkabroq, bezakli
fancy (v) => xohlamoq, istamoq, yoqtirmoq, tasavvur qilmoq
fancy (n) => xohish, istak, tasavvur, havas
fanciness (n) => hashamatlilik, dabdabalilik, bezakdorlik
fanciful (adj) => xayoliy, tasavvurga boy, haqiqatdan yiroq
fancifully (adv) => xayoliy tarzda

fractional (adj) => kasrli, kasrga oid, juda kichik qismdan iborat, qisman
fraction (n) => kasr, qism, ulush
fractionally (adv) => juda oz miqdorda, birozgina, qisman

aware (adj) => xabardor, biladigan, anglab turgan, voqif
awareness (n) => xabardorlik, anglash, tushunish
unaware (adj) => xabarsiz, bexabar, bilmaydiga
unawareness (n) => bexabarlik, xabardor emaslik

natively (adv) => asl holatda, o'ziga xos tarzda, bevosite, tabiiy ravishda
native (adj) => mahalliy, asl, o'ziga xos, platformaga xos
native (n) => mahalliy, aholi vakili, ona tilida so'zlashuvchi
nativeness (n) => mahalliylik, asl holat

advise (n) => maslahat bermoq, tavsiya qilmoq
advice (n) => maslahat, tavsiya
advisor / adviser (n) => maslahatchi
advisable (adj) => ma'qul, tavsiya etiladigan
advisably (adv) => ma'qul tarzda

pain (n) => og'riq, azob, qiyinchilik
painful (adj) => og'riqli, azobli, juda qiyin, yoqimsiz
painfully (adv) => og'riqli tarzda, juda qiyin yoki achinarli darajada
painless (adj) => og'riqsiz, oson, qiyinchiliksiz
painlessly (adv) => og'riqsiz tarzda, qiyinchiliksiz

slow (adj) => sekin, sust
slow (adv) => sekin yoki sust tarzda
slow (v) => sekinlashtirmoq, sekinlashmoq
slowly (adv) => sekin tarzda, asta-sekin

viable (adj) => amalga oshirish mumkin bo'lgan, hayotiy, ish beradigan
viability (n) => amalga oshirish mumkinligi, hayotiylik, ish berish imkoniyati
viably (adv) => amalga oshirish mumkin bo'lgan tarzda
noviable / non-viable (adj) => amalga oshirib bo'lmaydigan, hayotiy bo'lmagan, ish bermaydigan

somehow (adv) => qandaydir qilib, bir amallab, qanday yo‘l bilandir, nima bo‘lsa ham, noma’lum bir tarzda
somewhere (adv) => qayerdadir, biror joyda, qandaydir bir joyda, noma’lum joyda
someone (pronoun) => kimdir, biror kishi, qandaydir bir odam
something (pronoun) => nimadir, biror narsa, qandaydir bir narsa
somewhat (adv) → biroz, sal, ma’lum darajada, qisman, bir oz darajada

manage (v) => uddalamoq, boshqarmoq
manager (n) => menejer, boshlovchi, rahbar
management (n) => boshqaruv, boshqarish, rahbariyat
manageable (adj) => uddalasa bo'ladigan, boshqarish mumkin bo'lgan, nazorat qilsa bo'ladigan
unmanageable (adj) => uddalab bo'lmaydigan, boshqarib bo'lmaydiga
managerial (adj) => boshqaruvga oid, menejerlikka oid

critical (adj) → juda muhim, hal qiluvchi, kritik
critically (adv) => tanqidiy tarzda, tanqidiy nuqtai nazardan, juda muhim darajada, keskin ravishda
criticism (n) => tanqid, tanqidiy fikr
critic (n) => tanqidchi, tanqidiy baho beruvchi
criticize / criticise (v) => tanqid qilmoq

rephrase (v) => boshqacha ifodalamoq, qayta ifodalamoq, fikrni boshqa so'zlar bilan aytmoq
rephrasing (n) => qayta ifodalash

select (v) => tanlamoq, saralamoq
selected (adj) => tanlangan
selecting (n) => tanlash
selection (n) => tanlov, saralash, tanlanganlar to'plami
selective (adj) => tanlab amalga oshiradigan, tanlovga asoslangan
selectively (adv) => tanlab, saralab

tune (v) => moslamoq, sozlamoq, nozik tarzda o'zgartirib yaxshilamoq, tizimni optimallashtirmoq
tune (n) => kuy, ohang
tuned (adj) => sozlangan, moslangan, optimallashtirilgan
tuning (n) => sozlash, moslash, optimallashtirish
tuner (n) => sozlagich, sozlovchi qurilma

insane (adj) => aqldan ozgan, juda g'alati, haddan tashqari, aql bovar qilmaydigan
insanely (adv) => nihoyatda, haddan tashqari, juda
insanity (n) => aqldan ozish, telbalik, bema'nilik
sane (adj) => aqli raso, sog'lom fikrlaydigan, oqilona, mantiqli, sog'lom fikrlaydigan, aqli joyida
sanity (n) => aql-idrok, aqli rasolik, sog'lom fikrlash, oqilonalik
sanely (adv) => oqilona tarzda, sog'lom fikr bilan, aqli raso tarzda

customize (v) => moslashtirmoq, o'z ehtiyojiga moslab o'zgartirmmoq, sozlamoq
custom (n) => urf-odat, an'ana, odat
custom (adj) => maxsus buyurtma asosida tayyorlangan, o'ziga xos
customization (n) => moslashtirish, sozlash
customizable (adj) => moslashtirish mumkin bo'lgan, sozlanadigan
customized (adj) => moslashtirilgan, maxsus sozlangan

setup (n) => sozlama, konfiguratsiya, o'rnatish/tashkil qilish jarayoni
setup (v) => sozlamoq, o'rnatmoq, tayyorlamoq, tashkil qilmoq
set-up (adj) => oldindan tashkil qilingan yoki tayyorlangan

start (v) => boshlamoq, ishga tushirmoq
start (n) => boshlanish, start
starter (n) => boshlovchi, ishga tushirgich
starting (adj) => boshlang'ich

shortcut (n) => qisqa yo'l, klaviatura yorlig'i, tezkor tugmalar kombinatsiyasi
shortcut (v) => qisqartirmoq, qisqa yo'l bilan bajarmoq

function (n) => funksiya
function (v) => ishlamoq, faoliyat ko'rsatmoq
functionality (n) => funsionallik, funksiyalar
functionally (adv) => funksional jihatdan
functional (adj) => funksional, ishlaydigan
dysfunctional (adj) => normal ishlamaydigan, nosoz
functioning (n) => ishlash, faoliyat ko'rsatish
functioning (adj) => ishlayotgan

disprove (v) => noto‘g‘ri ekanini isbotlamoq, rad etmoq, yolg‘onligini isbotlamoq
disproof (n) => noto‘g‘riligini isbotlash, rad etuvchi dalil

scratch (v) => tirnamoq, qashimoq, chizmoq
scratch (n) => tirnalish, tirnalgan joy, chiziq
scratchy (adj) => dag'al, qichishtiradigan, tirnalgan
scratchily (adv) => dag'al yoki qichishtiradigan tarzda
scratchiness (n) => dag'allik, qichishtirish xususiyati
scratcher (n) => qashlagich, tirnaydigan narsa
scratching (n) => qashish, tirnash

perfectly (adv) => mukammal tarzda, juda yaxshi, to'liq, mutlaqo
perfect (adj) => mukammal, bekamu-ko'st, nuqsonsiz
perfection (n) => mukammallik, benuqsonlik
perfect (v) => mukammallashtimoq, takomillashtirmoq

locally (adv) => mahalliy ravishda, shu joyning o'zida, lokal tarzda, yaqin atrofda
local (adj) => mahalliy, lokal, shu joyga oid
local (n) => mahalliy aholi vakili, shu hududda yashovchi odam
locality (n) => hudud, joy, mahalliy joy

knowledge (n) => bilim, bilimdonlik, ma'lumot, xabardorlik
know (v) => bilmoq, tanimoq
knowledgeable (adj) => bilimli, yaxshi xabardor, bilimga ega
knowingly (adv) => bilib turib, ataylab
unknowingly (adv) => bilmagan holda, bilmasdan

appropriate (adj) => mos, munosib, maqbul, o'rinli, to'g'ri keladigan
appropriate (v) => o'zlashtirib olmoq, o'ziga ajratib olmoq, foydalanish uchun olib qo'ymoq
appropriately (adv) => mos ravishda, o'rinli tarzda, tegishli tarzda
appropriateness (n) => moslik, o'rinlilik, maqsadga muvofiqlik

perform (v) => bajarmoq, amlaga oshirmoq, ijro etmoq, natija ko'rsatmoq, ishlamoq
performance (n) => ishlash samaradorligi, unumdorlik, bajarilish darajasi, ijro
performer (n) => ijrochi, bajaruvchi, sahnada chiqish qiluvchi
performative (adj) => ijroga oid, amalga oshirishga qaratilgan

stare (v) => tikilib qaramoq, uzoq vaqt tikilib turmoq, ko'zini uzmay qarammoq
stare (n) => tikilish, tikilib qarash
starer (n) => tikilib qarovchi odam
staring (n) => tikilib qarash

block (v) => to'smoq, bloklamoq, yo'lini to'smoq, kirishni yoki foydalanishni cheklamoq
block (n) => to'sin, blok, to'sqinlik
blocking (n) => to'sish, bloklash
blocker (n) => to'sqinlik qiluvchi narsa, to'suvchi, bloklovchi
blockage (n) => to'siq, tiqilib qolish, berkilish

kick (v) => tepmoq, chiqarib yubormoq, uzib qo'ymoq
kick (n) => tepki, zarba, zavq, hayajon
kicked (adj) => chiqarib yuborilgan

redirect (v) => yo'naltirmoq, boshqa manzilga yo'naltirmoq, qayta yo'naltirmoq
redirect (n) => qayta yo'naltirish, yo'naltiish
redirection (n) => qayta yo'naltirish

notify (v) => xabardor qilmoq, xabar bermoq
notification (n) => bildirishnoma, xabarnoma
notifiable (adj) => xabar qilinishi kerak bo'lgan

corresponding (adj) => mos keladigan, tegishli, muvofiq, unga mos
correspondence (n) => muvofiqlik, moslik, yozishmalar
correspondingly (adv) => shunga mos ravishda, tegishli ravishda

copy (n) => nusxa, ko'chirma nusxasi
copy (v) => nusxa ko'chirmoq, ko'chirmoq, aynan takrorlamoq
copier (n) => nusxa ko'chiruvchi qurilma, nusxa ko'chirgich
copyable (adj) => nusxa ko'chirish mumkin bo'lgan

tier (n) => daraja, pog'ona, bosqich, qatlam
tiered (adj) => darajalarga bo'lingan, pog'onali, bosqichma-bosqich tashkil qilingan
tiering (n) => darajalarga ajratish, toifalarga bo'lish, pog'onalarga bo'lish

register (v) => ro'yxatdan o'tmoq, ro'yxatdan o'tkazmoq
registration (n) => ro'yxatdan o'tish, ro'yxatga olish
registered (adj) => ro'yxatdan o'tgan, qayd etilgan
registrar (n) => ro'yxatga oluvchi, registrator

deploy (v) => joylashtirmoq, ishga tushirmoq
deployment (n) => joylashtirish, ishga tushirish, deploy qilish
deployed (adj) => joylashtirilgan, ishga tushirilgan
deployable (adj) => joylashtirish mumkin bo'lgan, ishga tushirishga tayyor, foydalanishga chiqarish mumkin bo'lgan

public (adj) => ommaviy, jamoatga oid
public (n) => jamoatchilik
publicly (adv) => ommaviy ravishda, hammaga ochiq tarzda
publicity (n) => ommaga e'lon qilish, reklama, jamoatchilik e'tibori
publicize / publicise => ommaga e'lon qilmoq, oshkor qilmoq
publicization / publicisation (n) => ommaga chiqarish

legible (adj) => o'qilishi aniq, o'qish mumkin bo'lgan
legibly (adv) => o'qiladigan tarzda
legibility (n) => o'qilish darajasi, o'qiluvchanlik
illegible (adj) => o'qib bo'lmaydigan, o'qilishi noaniq
illegibly (adv) => o'qib bo'lmaydigan tarzda
illegibility (n) => o'qib bo'lmaslik

huge (adj) => juda katta, ulkan
hugely (adv) => juda katta darajada, nihoyatda
hugeness (n) => ulkanlik

list (n) => ro'yxat
listing (n) => ro‘yxat, ro‘yxatdagi yozuv, e’lon
list (v) => ro'yxat qilmoq, ro'yxatga kiritmoq

acquaint (v) => tanishtirmoq, tanish qilmoq
acquainted (adj) => tanish, tanish bo'lgan
acquaintance (n) => tanish, tanishlik

trail (v) => ortidan kelmoq
trail (n) => iz, yo'l
trailing (adj) => oxirida turgan, oxiridagi, ortda kelayotgan

reply (v) => javob bermoq
reply (n) => javob
replier (n) => javob beruvchi

preserve (v) => saqlamoq, asrab qolmoq, o'z holicha saqlamoq
preserved (adj) => saqlangan, o'z holicha saqlanib qolgan
preservation (n) => saqlash, asrab qolish
preservative (n) => konservant, saqlovchi modda; mahsulotning buzilishini oldini oluvchi
preservative (adj) => saqlovchi, buzilishdan himoya qiluvchi, saqlashga yordam beruvchi

picky (adj) => tanlab oladigan, didiga juda talabchan, mayda-chuyda narsalarga ham e’tibor beradigan, ko‘ngliga yoqadigan narsani tanlaydigan, injiq
pickiness (n) => tanlovchanlik, talabchanlik, injiqlik

upload (v) => yuklamoq
upload (n) => yuklash, yuklangan narsa
uploaded (adj) => yuklangan
uploading (n) => yuklash
upload => kompyuteringdan internet/serverga yuborish

download => internet/serverdan kompyuteringga olish.

new (adj) => yangi 
newly (adv) => yaqinda, endigina, yangidan
newness (n) => yangilik

understand (v) => tushunmoq
understanding (adj) => tushunadigan
understandable (adj) => tushunarli
understandably (adv) => tushunarli tarzda
misunderstand (v) => noto'g'ri tushunmoq
misunderstanding (n) => tushunmovchilik

replace (v) => almashtirmoq
replacement (n) => almashtirish, o'rnini bosuvchi narsa
replaceable (adj) => almashtirish mumkin bo'lgan
irreplaceable (adj) => o'rnini bosib bo'lmaydigan
replaced (adj) => almashtirilgan

easy (adj) => oson, yengil
easily (adv) => osongina, osonlik bilan
easiness (n) => osonlik, yengillik

proper (adj) => to'g'ri, mos, munosib
properly (adv) => to'g'ri, keraklicha
properness (n) => to'g'rilik, moslik
improper (adj) => notog'ri, nomunosib
improperly (adv) => notog'ri tarzda
impropriety (n) => nomunosiblik (formal)

zip (n) => zip, arxiv
zip (v) => arxivlamoq
zipped (adj) => zip qilingan, arxivlangan
zipper (n) => zamok

manual (adj) => qo'lda bajariladigan
manual (n) => qo'llanma
manually (adv) => qo'lda, avtomatik bo'lmagan tarzda
manuality (n) => qo'lda bajarilish

slightly (adv) => biroz, ozgina, salgina
slight (adj) => ozgina, kichik, arzimas
slightness (n) => kichiklik, arzimaslik

similar (adj) => o'xshash
similarly (adv) => xuddi shunday tarzda, o'xshash ravishda
similarity (n) => o'xshashlik
dissimilar (adj) => o'xshamaydigan, farqli
dissimilarity (n) => o'xshamaslik, farqlilik

albeit (conjunction) => garchi ... bo‘lsa-da / ... bo‘lsa ham / shunga qaramay

temporary (adj) => vaqtinchalik, muvaqqat
temporarily (adv) => vaqtincha, vaqtinchalik ravishda
temporariness (n) => vaqtinchaliklik

permanent (adj) => doimiy, abadiy, o'zgarmas, uzoq muddatli
permanently (adv) => doimiy ravishda, abadiy, butunlay
permanence (n) => doimiylik, barqarorlik, o'zgarmaslik
permanentize (v) => doimiy qilmoq, doimiy holatga keltirmoq

embed (v) => ichiga joylashtirmoq
embedded (adj) => ichiga joylashtirilgan, o'rnatilgan
embedding (n) => joylashtirish
embeddable (adj) => ichiga joylashtirish mumkin bo'lgan
embedment (n) => joylashtirish

ignore (v) => e'tibor bermaslik
ignored (adj) => e'tiborsiz qoldirilgan
ignorance (n) => bilmaslik, bexabarlik
ignorant (adj) => bexabar, bilmaydigan
ignorantly (adv) => bexabar holda

standard (adj) => standart, odatiy
standard (n) => standart, mezon
standardize / standardise (v) => standartlashtirmoq
standardized / standardised (adj) => standartlashtirilgan
standardization / standardisation (n) => standartlashtirish
standardized (adj) => standartlashtirilgan

help (n) => yordam
help (v) => yordam bermoq
helpful (adj) => foydali, yordam beradigan
helpfully (adv) => foydali tarzda
helpfulness (n) => foydalilik, yordam beruvchanlik
helpless (adj) => ojiz, yordamga muhtoj
helplessly (adv) => ojiz tarzda
helplessness (n) => ojizlik
unhelpful (adj) => foydasiz, yordam bermaydigan

concatenate (v) => birlashtirmoq
concatenation (n) => birlashtirish, ulash
concatenated (adj) => birlashtirilgan

content (n) => mazmun, tarkib, kontent
content-related (adj) => kontentga oid

convert (v) => o'zgartirmoq, aylantirmoq
conversion (n) => o'zgartirsh, konvertatsiya
converted (adj) => o'zgartirilgan
convertible (adj) => o'zgartirish mumkin bo'lgan
converter (n) => o'zgartirgich, konvertor

compare (v) => taqqoslamoq, solishtirmoq
comparison (n) => taqqoslash
comparable (adj) => taqqoslash mumkin bo'lgan, o'xshash
comparative (adj) => taqqoslovchi
comparative (n) => qiyosiy
comparatively (adv) => nisbatan
comparator (n) => taqqoslagich

common (adj) => umumiy
commonly (adv) => odatda, ko'pincha, keng tarqalgan tarzda
commonness (n) => keng tarqalganlik
uncommon (adj) => kam uchraydigan, noodatiy
uncommonly (adv) => g'ayrioddiy darajada

implement (v) => amalga oshirmoq, joriy qilmoq
implementation (n) => amalga oshirish, joriy etish
implementer (n) => amalga oshiruvchi
implementable (adj) => amalga oshirish mumkin bo'lgan

illustrate (v) => misol bilan tushuntirmoq, ko‘rsatib bermoq, tasvirlamoq, misol/rasm orqali tushuntirib ko‘rsatmoq.
illustration (n) => illustratsiya, misol
illustrative (adj) => tushuntiruvchi, misol bo'luvchi
illustratively (adv) => misol tariqasida 
illustrator (n) => illustrator, tasvirchi

assort (v) => turlarga ajratmoq, guruhlamoq
assorted (adj) => turli xil, har xil, aralash
assortment (n) => turli xil narsalar to'plami

fragment (n) => parcha 
fragment (v) => bo'laklarga bo'lmoq
fragmented (adj) => bo'laklangan, parchalangan
fragmentation (n) => parchalanish, bo'laklarga ajralish
fragmentary (adj) => parcha-parcha, to'liq bo'lmagan
fragmentarily (adv) => parcha-parcha tarzda

propose (v) => taklif qilmoq
proposal (n) => taklif
proposed (adj) => taklif qilingan
proposer (n) => taklif qiluvchi
proposition (n) => taklif, fikr-mulohaza
propositional (adj) => taklifga oid

grade (n) => baho, darajada
grade (v) => baholamoq
grading (n) => baholash
grader (n) => baholovchi

approach (n) => yondashuv, usul, yo'l
approach (v) => yaqinlashmoq, yaqin kelmoq
approachable (adj) => yaqinlashish mumkin bo'lgan, muomila qilish oson
approachability (n) => ochiqlik, murojaat qilish osonligi
approaching (adj) => yaqinlashayotgan

harm (v) => zarar yetkazmoq
harm (n) => zarar
harmful (adj) => zararli
harmfully (adv) => zararli tarzda
harmfulness (n) => zararlilik

synthesize (v) => sintez qilmoq, birlashtirib umumlashtirmoq, turli ma’lumotlarni tahlil qilib yagona xulosa chiqarmoq
synthesis (n) => sintez, birlashtirish
synthetic (adj) => sun'iy, sintetik
synthetically (adv) => suniy yoki sintetik tarzda
synthesizer (n) => sintez qiluvchi qurilma yoki dastur

mind (n) => aql, ong, fikr

mental (adj) => aqliy, fikrlashga oid
mentally (adv) => aqliy jihatdan
mentality (n) => mentalitet, fikrlash tarzi
mentalism (n) => mentalizm / insonning fikrlashi va ruhiy jarayonlarini o‘rganishga asoslangan qarash
mentalist (n) => mentalizm bilan shug'ullanuvchi

flexible (v) => moslashuvchan
flexibly (adv) => moslashuvchan tarzda
flexibility (n) => moslashuvchanlik
inflexible (adj) => moslashuvchan emas, qat'iy
inflexibility (n) => moslashuvchan emaslik

require (v) => talab qilmoq
requirement (n) => talab
required (adj) => talab qilinadigan, majburiy
requiring (adj) => talab qiladigan
requisite (adj) => zarur, talab qilinadigan
requisite (n) => zarur narsa

rocket (n) => raketa 
rocket (v) => keskin oshmoq
rocketeer (n) => raketa uchirish bilan shug'ullanuvchi
rocketing (adj) => keskin oshayotgan

solve (v) => yechmoq, hal qilmoq
solution (n) => yechim
solvable (adj) => yehish mumkin bo'lgan
unsolvable (adj) => yechib bo'lmaydigan
solver (n) => yechuvchi
solving (n) => yechish

below (preposition) => ...dan pastda
below (adv) => pastda, quyida

negative (adj) => salbiy, manfiy
negatively (adv) => salbiy tarzda
negativity (n) => salbiylik, negativlik
negate (v) => inkor qilmoq, yo'qqa chiqarmoq
negation (n) => inkor

impact (n) => ta'sir
impact (v) => ta'sir qilmoq
impacted (adj) => ta'sirlangan
impactful (adj) => ta'sirli, katta ta'sirga ega
impactfully (adv) => ta'sirli tarzda

affect (v) => ta'sir qilmoq
affected (adj) => ta'sirlangan
affecting (adj) => ta'sir qilayotgan
affective (adj) => hissiy ta'sirga oid
affection (n) => suniy xatti-harakat, o'zini ataylab boshqacha ko'rsatish

stick (n) => tayoq
stick (v) => yopishmoq, tiqmoq
stuck (adj) => tiqilib qolgan, yopishgan
sticking (adj) => yopishayotgan
sticky (adj) => yopishqoq
stickiness (n) => yopishqoqlik

minify (v) => ixchamlashtirmoq
minification (n) => ixchamlashtirish
minified (adj) => ixchamlashtirilgan

iterate (v) => takroran bajarish, qayta ishlash
iteration (n) => takroriy bosqich, iteratsiya
iterative (adj) => iterativ, takroriy
iteratively (adv) => iterativ tarzda
iterator (n) => iterator

significance (n) => ahamiyat, muhimlik
significant (adj) => muhim, sezilarli
significantly (adv) => sezilarli darajada, anchagina
signify (v) => anglatmoq, bildiruvchi bo'lmoq
signification (n) => ma'no, ifoda

invite (v) => taklif qilmoq
invitation (n) => taklif, taklifnoma
invited (adj) => taklif qilingan
inviting (adj) => yoqimli, o'ziga jalb qiluvchi
inviter (n) => taklif qiluvchi

rule (v) => hukmronlik qilmoq, boshqarmoq
rule (n) => qoida

particular (adj) => muayyan, aniq
particular (n) => muayyan narsa
particularly (adv) => ayniqsa, xususan
particularity (n) => o'ziga xoslik, aniqlik
particularize / particularise (v) => aniqlashtirmoq, batafsil ko'rmoq

interpret (v) => talqin qilmoq, izohlamoq, ma'nosini tushunmoq
interpretation (n) => talqin, izoh
interpreter (n) => tarjimon, talqin qiluvchi
interpretive (adj) => talqinga oid
interpretively (adv) => talqin jihatidan

mostly => asosan, ko‘pincha, aksariyat hollarda

unless => agar ... bo‘lmasa, ...maguncha emas, agar ... bo‘lmasa

absorb (v) => shimmoq, o'zlashtirmoq
absorption (n) => shimish, o'zlashtirish
absorbed (adj) => singdirilgan, berilib ketgan
absorbent (adj) => shimuvchi
absorbent (n) => shimuvchi material
absorbingly (adv) => o'ziga tortadigan tarzda

squeeze (v) => siqmoq
squeeze (n) => siqish
squeezed (adj) => siqilgan
squeezable (adj) => siqish mumkin bo'lgan

trace (n) => iz
trace (v) => izini kuzatmoq
traced (adj) => kuzatilgan, aniqlangan
tracing (n) => kuzatish, izini aniqlash
traceable (adj) => izini topish yoki kuzatish mumkin bo'lgan
traceability (n) => kuzatuvchanlik, izini aniqlash imkoniyati

verify (v) => tekshirmoq, tasdiqlamoq
verification (n) => tekshirib, tasdiqlash
verified (adj) => tekshirilgan, tasdiqlangan
verifiable (adj) => tekshirish mumkin bo'lgan
verifiably (adv) => tekshiriladigan yoki tasdiqlanadigan tarzda

panic (n) => vahima, sarosima
panic (v) => vahimaga tushmoq
panicked (adj) => vahimaga tushgan
panicky (adj) => vahimali, vahimaga moyil
panickedly (adv) => vahima bilan

volume (n) => hajm, ovoz balandligi, miqdor, jild
voluminous (adj) => katta hajmli, juda ko‘p
voluminously (adv) => katta hajmda
voluminousness (n) => katta hajmlilik

surround (v) => o'rab olmoq, atrofini o'ramoq, qurshab olmoq
surrounding (adj) => atrofdagi
surrounding (n) => atrof-muhit
surrounded (adj) => o'ralgan

usual (adj) => odatiy, odatdagi
usually (adv) => odatda
usualness (n) => odatiylik
unusual (adj) => noodatiy

enter (v) => kirmoq, kiritmoq
entry (n) => kirish, kirish joyi, yozuv
entrant (n) => ishtirokchi, kiruvchi
entrance (n) => kirish, kirish joyi
enterable (adj) => kirish mumkin bo'lgan

meaningless (adj) => ma'nosiz, mazmunsiz, ahamiyatsiz
mean (v) => anglatmoq
meaning (n) => ma'no
meaningful (adj) => mazmunli, ma'noli, ahamiyatli
meaningfully (adv) => mazmunli tarzda
meaningless (adj) => ma'nosiz 
meaninglessness (n) => ma'nosizlik

outlying (adj) => chetki, boshqalardan uzoq, asosiy guruhdan tashqaridagi
outlier (n) => cheklanma qiymat, boshqalardan farq qiluvchi narsa

deviate (v) => chetga chiqmoq
deviation (n) => chetlanish, og'ish
deviant (n) => chetga chiquvchi
deviant (adj) => me'yordan chetga chiqqan
deviating (adj) => me'yordan chetga chiqayotgan
deviated (adj) => chetlangan
deviational (adj) => chetlanishga oid

behave (v) => o'zini tutmoq
behavior (n) => xulq-atvor
behavioral (adj) => xulq-atvorga oid
behaviorally (adv) => xulq-atvor jihatidan

post (n) => post
post (v) => joylamoq
posted (adj) => joylangan
posting (n) => post joylash

intervene (v) => aralashmoq
intervention (n) => aralashuv
intervening (adj) => oradagi, aralashuvchi
intervenor (n) => aralashuvchi tomon

confuse (v) => chalkashtirmoq
confusion (n) => chalkashlik
confused (adj) => chalkashgan, adashgan
confusing (adj) => chalkashtiradigan, tushunarsiz
confusingly (adv) => chalkashtiradigan tarzda 
confusingness (n) => chalkashtiruvchanlik

purge (n) => tozalash
purge (v) => tozalamoq
purged (adj) => olib tashlangan, tozalangan
purging (n) => olib tashlash, tozalash
purification (n) => tozalash, poklash

plagiarism (n) => plagiat
plagiarize (v) => plagiat qilmoq
plagiarist (n) => plagiat qiluvchi
plagiarized (adj) => plagiat qilingan, o'zlashtirilgan
plagiaristic (adj) => plagiatga oid

pin (n) => igna, to‘g‘nag‘ich
pin (v) => mahkamlamoq
pinned (adj) => mahkamlangan
pinning (n) => mahkamlash

suppose (v) => faraz qilmoq, deb o‘ylamoq
supposed (adj) => taxmin qilingan, kutilgan
supposedly (adv) => go'yoki, aytilishicha, taxminan
supposition (n) => faraz, taxmin
suppositional (adj) => farazga oid

generic (adj) => umumiy, konkret bo'lmagan
generically (adv) => umumiy tarzda
genericness / genericity (n) => umumiylik

automatic (adj) => avtomatik
automatically (adv) => avtomatik ravishda
automation (n) => avtomatlashtirish
automate (v) => avtomatlashtirmoq
automated (adj) => avtomatlashtirilgan

ascend (v) => ko'tarilmoq
ascending (adj) => o'sib boruvchi
ascension (n) => ko'tarilish

descend (v) => pastga tushmoq
descending (adj) => kamayib boruvchi
descent (n) => tushib, pastga tushish

obtain (v) => olmoq, qo'lga kiritmoq
obtainable (adj) => olish mumkin bo'lgan

digit (n) => raqam
digital (adj) => raqamli
digitally (adv) => raqamli tarzda

hint (n) => ishora, maslahat, kichik yordamchi ma'lumot
hint (v) => ishora qilmoq

separator (n) => ajratgich, bo‘luvchi belgi, ajratuvchi
separation (n) => ajratish, ajralish
separately (adv) => alohida ravishda
separate (adj) => alohida

beware (v) => ehtiyot bo'lmoq, ogoh bo'lmoq, ehtiyotkor bo'lish

automagically (adv) => avtomatik tarzda, go'yoki o'z-o'zidan, sehrli tarzda
automatic (adj) => avtomatik
automagic or automagical (adj) => go'yoki sehrli tarzda avtomatik

rewrite (v) => qayta yozmoq

reuse (v) => qayta ishlatmoq

rebuild (v) => qayta qurmoq

restart (v) => qayta ishga tushirmoq

reload (v) => qayta yuklamoq

redownload (v) => qayta yuklab olmoq.

deadline (n) => oxirgi muddat, topshirish muddati, belgilangan oxirgi vaqt

count (v) => sanamoq, hisoblamoq

inclusion (n) => kiritish, qo'shish
inclusiveness (n) => qamrovlilik
inclusive (adj) => o'z ichiga oluvchi, qamrab oluvchi
inclusively (adv) => qamrab olgan holda
include (v) => o'z ichiga olmoq

accord (v) => mos kelmoq, muvofiq bo‘lmoq, bermoq
accord (n) => kelishuv
accordance (n) => muvofiqlik
accordingly (adv) => shunga muvofiq ravishda, shunga qarab

accept (v) => qabul qilmoq, rozi bo'lmoq, tan olmoq
acceptance (n) => qabul qilish, rozilik
acceptable (adj) => ma'qul, qabul qilsa bo'ladigan
acceptably (adv) => maqul tarzda
unacceptable (adj) => maqbul emas, qabul qilib bo'lmaydigan
unacceptably (adv) => maqbul bo'lmagan tarzda

so-so => o‘rtacha, unchalik yaxshi emas, na yaxshi na yomon

okay-ish (adj) => o‘rtacharoq, yomon emas, unchalik yaxshi ham emas, bo‘ladi (informal)

excellent (adj) => a'lo, juda yaxshi
excellently (adv) => a'lo darajada
excellence (n) => a'lo daraja, mukammallik

Googling => Google’dan qidirish
ChatGPTing => ChatGPT’dan foydalanish

compress (v) => siqmoq
compression (n) => siqish, siqilish
compressed (adj) => siqilgan
compressible (adj) => siqish mumkin bo'lgan
compressor (n) => kompressor, siquvchi qurilma

import (v) => olib kirmoq
import (n) => import
importer (n) => import qiluvchi
imported (adj) => import qilingan
importation (n) => import qilish, olib kirish

limit (n) => chegara 
limit (v) => cheklamoq
limitation (n) => cheklov
limited (adj) => cheklangan
limiting (adj) => cheklovchi
limitless (adj) => cheksiz

specific (adj) => aniq, muayyan
specifically (adv) => aniq qilib, xususan
specificity (n) => aniqlik, o'ziga xoslik
specify (v) => aniq belgilamoq, ko'rsatmoq

adopt (v) => moslashmoq, moslashtirmoq
adoptation (n) => moslashish, moslashtirish
adaptable (adj) => moslasha oladigan
adoptability (n) => moslashuvchanlik
adapted (adj) => moslashtirilgan
adaptively (adv) => moslashuvchan tarzda

rest (v) => dam olmoq
rested (adj) => dam olgan, tetik
resting (adj) => dam olayotgan
restful (adj) => dam beruvchi, osoyishta
restfully (adv) => osoyishta tarzda
restlessness (n) => bezovtalik, tinimsizlik
restless (adj) => bezovta, tinimsiz

concept (n) => tushuncha, g'oya
conceptual (adj) => tushunchaga oid, konseptual
conceptually (adv) => tushuncha jihatidan
conceptualize (v) => tushuncha sifatida shakllantirmoq
conceptualization (n) => tushuncha sifatida shakllantirish

statement (n) => bayonot, bildirilgan fikr, bayon, rasmiy ma'lumot
state (v) => bayon qimoq, bildirmoq, aniq aytmoq
stated (adj) => aytilgan, bayon qilingan, ko'rsatilgan
unstated (adj) => aytilmagan, ochiq bayon qilinmagan

strict (adj) => qat'iy, qattiq, talabchan, aniq rioya qilinadigan
strictly (adv) => qat'iy ravishda 
strictness (n) => qat'iylik

encounter (v) => duch kelmoq
encounter (n) => duch kelish, uchrashuv

positivity (n) => ijobiylik
positively (adv) => ijobiy tarzda, ijobiy ravishda, qat'iy ravishda
positive (adj) => ijobiy, musbat

rainforcement (n) => mustahkamlash, kuchaytirish
rainforced (adj) => mustahkamlangan, kuchaytirilgan, yanada tasdiqlangan
rainforce (v) => mustahkamlamoq, kuchaytirmoq, yanada tasdiqlamoq

bloated (adj) => haddan tashqari kattalashgan, ortiqcha narsalar bilan to'lib ketgan
bloat (v) => shishirmoq, kattalashtirmoq
bloating (n) => shishish

heck (n) => lanat, jin ursin, nima balo, axir

feed (v) => ovqat bermoq, oziqlantirmoq, ma'lumot kiritmoq, ma'lumot bermoq
feed (n) => oqim, lenta, yangiliklar lentasi

agent (n) => vakil, agent, topshiriqni bajaruvchi
agency (n) => agentlik, mustaqil harakat qilish qobiliyati
agent-based (adj) => agentga asoslangan

realize (v) => anglamoq, tushunib yetmoq, fahmlamoq
realization (n) => anglash, tushunib yetish, amalga oshirish
realizable / realisable  (adj) => amalga oshirish mumkin bo'lgan
reality (n) => hqiqiat, realitik
really (adv) => haqiqatdan, juda
real (adj) => haqiqiy, real

reuse (v) => qayta foydalanmoq, qayta ishlatmoq
reuse (n) => qayta foydalanish
reusable (adj) => qayta ishlatish mumkin bo'lgan
reusability (n) => qayta foydalanish imkoniyati

worry (v) => xavotir olmoq, tashvishlanmoq
worry (n) => xavotir, tashvish
worried (adj) => xavotirlangan, tashvishlangan
worrying (adj) => xavotirlik, tashvishli
worrisome (adj) => tashvish uyg'otadigan

please (v) => mamnun qilmoq, xursand qilmoq, rozi qilmoq
please (adv) => iltimos
please (v) => yoqmoq, ma'qul kelmoq
pleased (adj) => mamnun, xursand
pleasant (adj) => yoqimli
pleasing (adj) => yoqimli, mamnun qiladigan
pleasure (n) => zavq, mamnuniyat

reason (n) => sabab
reason (v) => mantiqiy fikr yuritmoq
reasonable (adj) => oqilona, asosli, maqbul
reasonably (adv) => oqilona, nisbatan, anchagina
reasonableness (n) => oqilonalik, maqbullik
reasoning (n) => mantiqiy fikrlash, mulohaza yuritish
unreasonable (adj) => asossiz, noo'rin, mantiqsiz
unreasonably (adv) => asossiz ravishda

motivated (adj) => rag'batlangan, motivatsiyalangan, biror ish qilishga undalgan
motivate (v) => rag'batlantirmoq, undamoq, motivatsiya bermoq
motivating (adj) => rag'batlantiruvchi
motivation (n) => motivatsiya, turtki, rag'bat
motivator (n) => rag'batlantiruvchi omil, rag'batlantiruvchi shaxs

whichever => qaysi biri bo‘lsa ham, istalgan biri, qaysi birini tanlasangiz ham

await (v) => kutib turmoq, kutmoq

logic (n) => mantiq
logical (adj) => mantiqiy, mantiqqa asoslangan, izchil
logically (adv) => mantiqan, mantiqiy ravishda
illogical (adj) => mantiqsiz
illogically (adv) => mantiqsiz ravishda

circus (n) => sirk
circus-like (adj) => sirkka o'xshash, tartibsiz

term (n) => atama
terms => shartlar

checksum (n) => nazorat summasi, tekshiruv yig'indisi

process (n) => jarayon, protses
process (v) => qayta ishlamoq, qayta ishlov bermoq
processing (n) => qayta ishlash
processed (adj) => qayta ishlangan
processor (n) => protsessor, qayta ishlovchi
processable (adj) => qayta ishlash mumkin bo'lgan

calculate (v) => hisoblamoq, hisoblab chiqarmoq
calculation (n) => hisoblash
calculator (n) => kalkulyator
calculated (adj) => hisoblangan, ataylab qilingan
calculable (adj) => hisoblash mumkin bo'lgan

instruction (n) => ko'rsatma, yo'riqnoma, topshiriq, buyruq
instruct (v) => ko'rsatma bermoq, o'rgatmoq
instructor (n) => o'qituvchi, instruktor
instructional (adj) => o'quv, ko'rsatmaga oid

train (n) => poyezd
train (v) => o'qitmoq, o'rgatmoq, tayyorlamoq
training (n) => o'qitish, trening, tayyorgarlik
trained (adj) => o'qitilgan, tayyorlangan
trainer (n) => o'qituvchi, trener
trainee (n) => o'rganuvchi, stajyor
trainable (adj) => o'rganish mumkin bo'lgan

submit (v) => topshirmoq
submission (n) => topshirish, taqdim etish, yuborilgan ish
submitted (adj) => topshirilgan
submitter (n) => topshiruvchi

concatenate (v) => birlashtirmoq, ketma-ket ulab qo‘ymoq, bir-biriga qo‘shmoq
concatenation (n) => birlashtirish, ketma-ket ulash
concatenated (adj) => birlashtirilgan

effect (n) => ta'sir, natija
effective (adj) => samarali, natija beradigan, ta'sirli
effectively (adv) => samarali tarzda, amalda
effectiveness (n) => samaradorlik, ta'sirlilik
ineffective (adj) => samarasiz
ineffectively (adv) => samarasiz tarzda
ineffectiveness (n) => samarasizlik

efficient (adj) => samarali, tejamkor, unumli
efficiently (adv) => samarali, tejamkor tarzda
efficiency (n) => samaradorlik, tejamkorlik
inefficient (adj) => samarasiz, tejamkor bo'lmagan
inefficiently (adv) => samarasiz tarzda
inefficiency (n) => samarasizlik

ignore (v) => e'tibor bermaslik, mensimaslik, pisand qilmaslik
ignorance (n) => bilmaslik, bexabarlik
ignorant (adj) => bexabar, bilimsiz
ignorantly (adv) => bexabar tarzda

treat (v) => muomala qilmoq, munosabatda bo'lmoq, davolamoq
treat (n) => yoqimli narsa, sovg'a, siylov

bullshit (n) => bo‘lmag‘ur gaplar, safsata, uydirma, bema'ni gap

amplifier (n) => kuchaytirgich
amplify (v) => kuchaytirmoq
amplification (n) => kuchaytirish

teach (v) => o'rgatmoq, ta'lim bermoq
teaching (n) => o'qitish
teaching (adj) => o'qitishga oid
teachability (n) => o'rgatiluvchanlik
teachable (adj) => o'rgatish mumkin bo'lgan, o'rganishga ochiq

compopse (v) => tuzmoq, yaratmoq, yozmoq, tashkil qilmoq
composition (n) => tuzilish, kompozitsiya, yozilgan asar
composer (n) => bastakor, yaratuvchi
composed (adj) => vazmin, xotirjam

debug (v) => xatolarni topib tuzatmoq
debugging (n) => xatolarni topish va tuzatish, debugging 
debugger (n) => xatolarni aniqlash vositasi yoki dasturi, debugger

tracking (v or n) => kuzatish, nazorat qilish, izini kuzatish
track (v) => kuzatmoq, izini tekshirmoq, nazorat qilmoq
track (n) => iz, yo'nalish
tracker (n) => kuzatuvchi, kuzatuv vositasi
trackable (adj) => kuzatish mumkin bo'lgan

statics (n) => statika
statistic (n) => statistik ko'rsatkich
statistical (adj) => statistik
statistically (adv) => statistik jihatdan

actual (adj) => haqiqiy, amaldagi, real, aslida mavjud bo‘lgan
actually (adv) => aslida, haqiqatda, rostdan ham
actuality (n) => haqiqat, mavjudlik

fundamental (adj) => asosiy, fundamental, tub
fundamentally (adv) => mohiyatan, tubdan
fundamentalism (n) => fundamentalizm
fundamentalist (n) => fundamentalist

situation (n) => vaziyat, holat, sharoit

autocomplete (n) => avtomatik to‘ldirish
autocomplete (v) => avtomatik to‘ldirmoq

distinguish (v) => farqlamoq, ajratmoq, farqini aniqlamoq
distinction (n) => farq, ajratish, tafovut
distinct (adj) => alohida, aniq farqli
distinctive (adj) => o'ziga xos, ajralib turadigan
distinctly (adv) => aniq ravishda

vaguely (adv) => noaniq tarzda, xira tarzda, taxminan, aniq bo‘lmagan holda
vague (adj) => noaniq, mavhum, aniq bo'lmagan
vagueness (n) => noaniqlik

properly (adv) => to'g'ri, kerakli tarzda, munosib ravishda, yaxshilab
proper (adj) => to'g'ri, tegishli, mos, kerakli
properness (n) => muvofiqlik, to'g'rilik
improper (adj) => noto'g'ri, nomunosib
improperly (adv) => notog'ri tarzda

contain (v) => o'z ichiga olmoq, ichida bo'lmoq, saqlamoq
container (n) => idish, konteyner
contained (adj) => vazmin, o'zini tutgan

emerging (adj) => paydo bo'layotgan, yuzaga kelayotgan, rivojlanib kelayotgan
emerge (v) => paydo bo'lmoq, yuzaga chiqmoq
emergence (n) => paydo bo'lish, yuzaga kelish

seem (v) => tuyulmoq, ko'rinmoq
seemingly (adv) => go'yoki, ko'rinishidan, tashqaridan qaraganda
seeming (adj) => ko'rinadigan, tuyuladigan

blindness (n) => ko'rlik, ko'r-ko'rona munosabat
blindly (adv) => ko'r-ko'rona, o'ylanmasdan, tekshirmasdan
blind (adj) => ko'r, ko'zi ojiz, ko'r-ko'rona

independence (n) => mustaqillik
independent (adj) => mustaqil
indepentently (adv) => mustaqil ravishda
independency (n) => mustaqillik

rely (v) => tayanmoq, ishonmoq, suyanmoq, bog'liq bo'lmoq
reliable (adj) => ishonchli
reliably (adv) => ishonchli tarzda
reliability (n) => ishonchlilik
unreliable (adj) => ishonchsiz
unreliability (n) => ishonchsizlik

assignment (n) => topshiriq, vazifa
assign (v) => topshirmoq, biriktirmoq, vazifa bermoq
assigned (adj) => tayanilgan, biriktirilgan

maintenance (n) => texnik xizmat ko'rsatish, saqlash, parvarish qilish
maintain (v) => saqlab turmoq, texnik xizmat ko'rsatmoq
maintainable (adj) => oson saqlash mumkin bo'lgan, texnik xizmat ko'rsatish mumkin bo'lgan

cost (n) => xarajat, narx, qiymat
cost (v) => turmoq, narxi ... bo‘lmoq, xarajat qilmoq
costly (adj) => qimmatga tushadigan, qimmat

add (v) => qo'shmoq
addition (n) => qo'shimcha
additional (adj) => qo'shimcha
additionally (adv) => qo'shimcha ravishda

opportunity (n) => imkoniyat, qulay fursat
opportunistic (adj) => vaziyatdan yoki imkoniyatdan intilishga intiladigan

subtle (adj) => nozik, sezilishi qiyin, darhol bilinmaydigan

defect (n) => nuqson, kamchilik, xato
defect (v) => boshqa tomonga o‘tmoq

great (adj) => katta, buyuk, juda yaxshi

overall (adj) => umumiy
overall (adv) => umuman olganda

meetup (n) => uchrashuv, yig‘ilish, biror mavzu bo‘yicha norasmiy tadbir

use (n) => foydalanish
use (v) => foydalanmoq
useful (adj) => foydali, kerakli, nafli
usefully (adv) => foydali tarzda
usefulness (n) => foydalilik
useless (adj) => foydasiz
uselessly (adv) => foydasiz tarzda
uselessness (n) => foydasizlik

modify (v) => o'zgartirmoq
modification (n) => o'zgartirish, modifikatsiya
modified (adj) => o'zgartirilgan
modifiable (adj) => o'zgartirish mumkin bo'lgan

physically (adv) => jismonan, jismoniy jihatdan, amalda
physical (adj) => jismoniy, moddiy
physicality (n) => jismoniylik

fit (adj) => sog'lom, baquvvat, mos
fit (v) => mos kelmoq, sig'moq
fit (n) => moslik, xuruj, tutqanoq

hire (v) => ishga olmoq, yollamoq
hiring (n) => ishga olish
hired (adj) => ishga olingan
hirer (n) => ishga yollovchi

criterion (n) => mezon, talab, baholash mezoni
criteria (n) (plural) => mezonlar

analogy (n) => o'xshatish, qiyoshlash, analogiya, qiyos
analogize (v) => o'xshatib taqqoslmoq
analogous (adj) => o'xshash, analogik
analogously (adv) => o'xshash tarzda

report (n) => hisobot
report (v) => hisobot bermoq
reporting (v or n) => hisobot berish, xabar berish
reporter (n) => hisobot beruvchi, xabar beruvchi
reportedly (adv) => xabarlarga ko'ra

demonstrate (v) => ko'rsatmoq, namoyish qilmoq
demonstration (n) => namoyish, ko'rsatma
demonstrative (adj) => ko'rsatuvchi, namoyishkorona
demonstrably (adv) => yaqqol ravishda, isbotlanadigan tarzda

treadmill (n) => yugurish yo'lakchasi, trenajor

uphill (adv) => tepaga qarab, yuqoriga
uphill (adj) => tepaga ko'tariladigan, yuqoriga qarab ketadigan, mashaqqatli, qiyin
uphill (n) => tepaga ko'tarilish

condition (n) => holat, ahvol, shart, sharoit, vaziyat, tibbiy holat, kasallik
condition (v) => tayyorlamoq, chiniqtirmoq.
conditional (adj) => shartli
conditionally (adv) => shartli ravishda

original (adj) => asl, original, dastlabki, o'ziga xos
original (n) => asl nusxa, original
originally (adv) => dastlab, aslida
originality (n) => o'ziga xoslik, yangilik

close (adj) => yaqin
close (v) => yopmoq
close (adv) => yaqin
close (n) => yakunlash, yopilish

entire (adj) => butun, to'liq, yaxlit
entirely (adv) => butunlay, to'liq ravishda, mutlaqo
entireness (n) => butunlik, yaxlitlik

reinvent (v) => qaytadan yaratmoq, qayta ixtiro qilmoq
reinvention (n) => qayta yaratish, qayta ixtiro qilish
reinvented (adj) => qayta yaratilgan

obvious (adj) => aniq, ravshan, yaqqol, ko'rinib turgan
obviously (adv) => aniqki, ravshanki, ko'rinib turibdiki
obviousness (n) => aniqlik, ravshanlik

receive (v) => olmoq, qabul qilmoq, qabul qilib olmoq
reception (n) => qabul qilish, qabulxona, qabul marosimi
receptionist (n) => qabulxonada ishlovchi receptionist
receiver (n) => qabul qiluvchi, qabul qilgich

receptive (adj) => qabul qilishga tayyor, ochiq
receptively (adv) => ochiq yoki qabul qilishga tayyor tarzda
receptiveness (n) => qabul qilishga tayyorgarlik

mention (v) => tilga olmoq, eslatib o'tmoq, aytib o'tmoq
mention (n) => eslatish, tilga olish
mentioned (adj) => tilga olingan
mentionable (adj) => tilga olish mumkin bo'lgan

type (v) => klaviaturada yozmoq, matn termoq
typing (n) => matn terish
typist (n) => matn teruvchi, yozuv mashinkasida yoki klaviaturada matn teradigan xodim
typewriter (n) => yozuv mashinasi

profession (n) => kasb, mutaxassislik, professional faoliyat
professional (n) => mutaxassis
professional (adj) => professional
professionally (adv) => professional tarzda 
professionalism (n) => professionallik

career => insonning uzoq muddatli kasbiy yo‘li, professional faoliyat, karyera

persuade => asosan ko‘ndirmoq, ishontirmoq, biror ishni qilishga undamoq.
persuasion (n) => ishontirish, ko'ndirish
persuasive (adj) => ishontiruvchi, ko'ndira oladigan
persuasively (adv) => ishontiruvchi tarzda

risk (n) => xavf, tavakkal
risk (v) => xavf ostiga qo'ymoq, tavakkal qilmoq
riskily (adv) => xavfli tarzda
riskiness (n) => xavflilik, tavakkalchilik
risky (adj) => xavfli, tavakkalchilikka ega, xavf tug‘dirishi mumkin bo‘lgan

false (adj) => yolg'on, noto'g'ri
falsely (adv) => yolg'on ravishda, noto'g'ri ravishda
falsity (n) => yolg'onlik, noto'g'rilik
falsify (v) => soxtalashtirmoq, ma'lumotni ataylab noto'g'ri ko'rsatmoq
falsification (n) => soxtalashtirish

sophisticated (adj) => murakkab, ilg'or, zamonaviy, nafis, didli
sophistication (n) => murakkablik, nafislik, yuqori darajadagi rivojlanganlik
sophisticate (n) => tajribali/bilimdon odam
sophisticate (v) => takomillashtirmoq, murakkablashtirmoq

result (n) => natija
result (v) => natijaga olib kelmoq
resulting (adj) => natijada hosil bo'lgan
resultantly (adv) => natijada 

extend (v) => uzaytirmoq, kengaytirmoq
extension (n) => kengaytirish, qo'shimcha
extensible (adj) => kengaytirilgan
extensibility (n) => kengaytirish imkoniyati
extensively (adv) => keng ko'lamda, batafsil
extensive (adj) => keng ko'lamli, katta

read (v) => o'qimoq
reader (n) => o'quvchi
readability (n) => o'qishga qulaylik, o'qilish darajasi
readable (adj) => o'qilishi oson
readably (adv) => o'qishga qulay tarzda

actual (adj) => haqiqiy, amaldagi
actually (adv) => aslida, haqiqatda
actuality (n) => voqealik, haqiqat

philosophy (n) => falsafa, falsafiy qarash
philosophical (adj) => falsafiy
philosophically (adv) => falsafiy jihatdan
philosopher (n) => faylasuf
philosophize (v) => falsafa yuritmoq, falsafiy fikr yuritmoq

represent (v) => ifodalamoq, tasvirlamoq, vakillik qilmoq
representation (n) => ifoda, tasvir, vakillik
representative (n) => vakil
representative (adj) => vakillik qiluvchi, vakil bo‘ladigan, namunaviy

rectangle (n) => to'g'ri to'rtburchak
rectangular (adj) => to'g'ri to'rtburchak shaklidagi

imagine (v) => tasavvur qilmoq, ko'z oldiga keltirmoq
imagination (n) => tasavvur, xayol
imaginative (adj) => tasavvurga boy, ijodkor
imaginary (adj) => xayoliy, tasavvurdagi

contain (v) => o'z ichiga olmoq, saqlamoq
container (n) => idish, konteyner
containment (n) => saqlab turish, cheklash
contained (adj) => ichiga olingan, saqlangan
containing (v) => o'z ichiga olgan

pad (v) => yumshoq qatlam bilan qoplamoq/to'ldirmoq
padded (adj) => yumshoq qatlam bilan qoplangan, to'ldirilgan
padding (n) => yumshoq to‘ldirma, himoya qatlami
pad (n) => yumshoq taglik/qoplama, bloknot

rotate (v) => aylantirmoq, aylanmoq, burmoq
rotation (n) => aylanish, aylantirish
rotational (adj) => aylanishga oid
rotating (adj) => aylanayotgan, aylanuvchi
rotated (adj) => aylantirilgan, burilgan

produce (v) => ishlab chiqarmoq, yaratmoq
producer (n) => ishlab chiqaruvchi
product (n) => mahsulot
productive (adj) => samarali, unumdor
productively (adv) => samarali tarzda
productivity (n) => unumdorlik, samaradorlik

paradox (n) => paradoks 
paradoxical (adj) => paradoksal, qarama-qarshi ko'rinadigan
paradoxically (adv) => paradoksal tarzda

really (adv) => haqiqatdan, rostdan ham, juda

review (n) => sharh, taqriz, ko'rib chiqish, tahlil
review (v) => ko'rib chiqmoq, qayta tekshirmoq, tahlil qilmoq
reviewer (n) => sharhlovchi, taqrizchi

adequate (adj) => yetarli
adequately (adv) => yetarli darajada
adequacy (n) => yetarlilik

bloat (v) => shishirmoq
bloat (n) => ortiqcha kattalik
bloated (adj) => shishgan, ortiqcha yuklangan

typical (adj) => odatdagi, tipik, o‘ziga xos, xos bo‘lgan
typically (adv) => odatda, ko'pincha, odatiy tarzda
typicality (n) => odatiylik, xoslik

outcome (n) => natija, yakuniy natija, oqibat

expect (v) => kutmoq, deb o'ylamoq, taxmin qilmoq, umid qilmoq, talab qilmoq
expected (adj) => kutilgan
expectation (n) => kutish, umid, kutilma
unexpected (adj) => kutilmagan
unexpectedly (adv) => kutilmaganda

possible (adj) => mumkin, ehtimoliy, imkoni bor
possibly (adv) => ehtimol, balki
possibility (n) => imkoniyat, ehtimol
impossible (adj) => imkonsiz
impossibly (adv) => imkonsiz darajada

somehow => qandaydir tarzda, qanday bo‘lmasin, qandaydir yo'l bilan, negadir, nima uchundir
somewhere => qayerdadir
something => nimadir
someone / somebody => kimdir
sometime => qachondir
sometimes => ba'zan

define (v) => aniq belgilamoq, ta'riflamoq
definition (n) => ta'rif, aniqlash
definite (adj) => aniq, muayyan
definitely (adv) => albatta, aniq ravishda

optimize (v) => optimallashtirmoq
optimization (n) => optimallashtirish
optimized (adj) => optimallashtirilgan
optimal (adj) => eng maqbul, optimal
optimally (adv) => optimal tarzda

become (v) => bo‘lmoq, aylanmoq, ... holatiga kelmoq

problem (n) => muammo
problematic (adj) => muammoli, muammo tug‘diradigan, muammoga sabab bo‘ladigan
problematically (adv) => muammoli tarzda

things => narsalar, ishlar, vaziyat, holat

extreme (adj) => o'ta, haddan tashqari, ekstremal holat
extremely (adv) => nihoyatda, o'ta
extremity (n) => eng chekka nuqta, ekstremal holat
extremist (n) => ekstremist
extremist (adj) => ekstremistik
extremism (n) => ekstremizm

dime (n) => AQShdagi 10 sentlik tanga

without (prep) => -siz, bo‘lmasdan

input (n) => kiritilgan ma’lumot, kirish ma’lumoti
input (v) => kiritmoq

output (n) => chiqish ma'lumoti, natija
output (v) => chiqarmoq, natija sifatida bermoq

possible (adj) => mumkin, imkoni bor, bo'lishi mumkin.
possibly (adv) => ehtimol, balki
possibility (n) => imkoniyat, ehtimol
impossible (adj) => imkonsiz
impossibly (adv) => imkonsiz darajada

intricacy (n) => murakkab jihat, nozik jihat 
intricate (adj) => murakkab, nozik, batafsil

adapt (v) => moslashmoq, moslashtirmoq
adapted (adj) => moshlashgan, moslashtirilgan
adaptation (n) => moslashish, moslashtirish
adaptable (adj) => moslasha oladigan
adaptability (n) => moslashuvchanlik

sub-point => kichik band, asosiy punktning ichidagi kichik nuqta/band

key point => asosiy/muhim fikr

subproblem => kichik muammo

subcategory => kichik kategoriya
substring => startning bir qismi
subsection => kichik bo'lim

set (v) => qo'ymoq, o'rnatmoq, belgilamoq
set (n) => to'plam

obscure => kam ma’lum, noma’lum, ko‘pchilikka tanish bo‘lmagan

brute (n) => qo'pol odam, vaxshiy odam
brute (adj) => qo'pol, shafqatsiz

straightforward => to‘g‘ridan-to‘g‘ri, sodda, tushunarli, murakkab bo‘lmagan

trivial (adj) => arzimas, ahamiyatsiz, juda oddiy
trivially (adv) => osonlik bilan, oddiy tarzda
triviality (n) => arzimas narsa, ahamiyatsizlik

clarification (n) => aniqlashtirish, tushuntirish, aniqlik kiritish
clarify (v) => aniqlashtirmoq, tushuntirmoq

rephrase (v) => qayta ifodalamoq, boshqacha so'zlar bilan ifodalamoq
rephrasing (n) => qayta ifodalash
phrase (n) => ibora, ifoda

scruple (n) => vijdoniy ikkilanish, axloqiy cheklov
scrupulous (adj) => vijdonli, juda ehtiyotkor, prinsipial
unscrupulous (adj) => vijdonsiz, insofsiz, prinsipga rioya qilmaydigan, halol bo‘lmagan
scrupulously (adv) => juda ehtiyotkorlik bilan, vijdonan
unscrupulously (adv) => vijdonsizlarcha, insofsizlarcha

prevent (v) => oldini olmoq, yo'l qo'ymaslik
prevention (n) => oldini olish
preventive / preventative (adj) => oldini oluvchi, profilaktik
preventively (adv) => oldini olish maqsadida

measure (n) => chora, tadbir
measure (n) => o'lchove, o'lcham, o'lchov birligi
measure (v) => o'lchamoq

cheat (v) => aldamoq, qoidani buzib foyda olmoq, ko‘chirmoq

nuance (n) => nozik farq, nozik jihat, mayda tafovut
nuanced (adj) => nozik farqlarni hisobga olgan, nozik

fact (n) => fakt, haqiqat
factual (adj) => faktlarga asoslangan, faktik
factually (adv) => faktlar nuqtayi nazaridan, fakt jihatdan
factuality (n) => faktikligi, haqiqatga mosligi

premise (n) => asosiy taxmin, boshlang‘ich fikr, asos, asosiy fikr, asosiy g'oya
premises => bino yoki unga tegishli hudud

question (n) => savol 
question (v) => shubha ostiga qo'ymoq, savol bermoq
questionable (adj) => shubhali
questionably (adv) => shubhali tarzda
questioning (adj) => shubha bilan qarash
questioning (n) => shubha ostiga qo'yish, savol berish

generate (v) => yaratmoq, hosil qilmoq
generation (n) => yaratish, hosil qilish, avlod
generator (n) => generator, hosil qiuvchi narsa yoki qurilma
generative (adj) => yaratishga, hosil qilishga qodir
generatively (adv) => generative tarzda

laughable (adj) => kulgili, kulgiga sabab bo'ladigan, be'mani darajada kulgili
laughably (adv) => kulgili tarzda, kulgili darajada
laugh (v) => kulmoq
laugh (n) => kulgi
laughter (n) => kulish

grin (n) => tirjayish, keng tabassum
grin (v) => tirjaymoq, keng tabassum qilmoq
grinning (adj) => tirjayib turgan

giggle (v) => qiqirlamoq, mayin yoki kichik-kichik kulmoq
giggle (n) => qiqiriq, mayin kulgi
giggling (adj) => qiqirlayotgan

chuckle (v) => ichidan past ovozda kulmoq
chuckle (n) => past ovozli kulgi
chuckling (adj) => past ovozda kulayotgan

-ful => ...ga sig‘adigan / ... bilan to‘ladigan miqdor

screenful (n) => bir ekranlik miqdor, ekranga sig‘adigan miqdor

suffice (v) => yetarli bo'lmoq, kifoya qilmoq

scan (v) => tezda ko‘zdan kechirmoq, tekshirib chiqmoq, skanerlamoq
scanner (n) => skaner, tekshiruvchi qurilma
scannable (adj) => tez ko'zdan kechirish mumkin bo'lgan

disservice (n) => zarar, yomon xizmat, zarar yetkazadigan ish.

optionally (adv) => ixtiyoriy ravishda, xohishga ko‘ra, majburiy bo‘lmagan holda
optional (adj) => ixtiyoriy

evaluate (v) => baholamoq, tekshirib baho bermoq, qiymatini aniqlamoq.

trivial (adj) => arzimas, ahamiyatsiz, juda oddiy.

eligibility (n) => moslik, talabga javob berish, huquqqa ega bo‘lish
eligible (adj) => mos, talabga javob beradigan (adjective)

undertake (v) => zimmasiga olmoq, bajarishga kirishmoq

illegal (adj) => noqonuniy
legal (adj) => huquqiy, yuridik, qonuniy

fuss (n) => ortiqcha shov-shuv, tashvish, bezovtalik, keragidan ortiq gap-so‘z

ideally (adv) => ideal holatda, eng yaxshi holatda, aslida xohlaganimizdek.

consent (v) => rozi bo'lmoq
consent (n) => rozilik

assess (v) => baholamoq, tekshirib baho bermoq

specialization (n) => ixtisoslashuv, ixtisoslik, muayyan sohada chuqur yo'nalish

as the same time = simultaneously

simultaneously (adv) => bir vaqtning o‘zida, bir paytda, bir vaqtda.
specialize (v) => ixtisoslashmoq
specialized (adj) => ixtisoslashgan
simultaneous => bir vaqtdagi, bir paytda sodir bo‘ladigan

advance (n) => rivojlanish, taraqqiyot, oldinga siljish
advance (v) => oldinga siljimoq, rivojlanmoq, oldinga surmoq
advanced (adj) => ilg‘or, yuqori darajadagi

convenience (n) => qulaylik, osonlik, ishni yengillashtiradigan holat

specified (adj) => belgilangan, aniq ko'rsatilgan
specify (v) => aniq ko'rsatmoq, belgilamoq

mistake (n) => xato

completely (adv) => butunlay, to‘liq, tamoman, mutlaqo.

state (v) => bayon qilmoq, aytmoq, ma'lum qilmoq

otherwise => boshqacha, aks holda, bo'lmasa, bundan tashqari, boshqa jihatdan

related (adj) => bog‘liq, aloqador, tegishli.
relation (n) => aloqa, munosabat
relationship (n) => munosabat (Odatda odamlar va guruhlar orasidagi munosabat)
related (adj) => bog'liq, aloqador (Kengroq ma'noga ega. Formal asosan)
relate (v) => bog'lamoq, aloqador bo'lmoq

fundamental (adj) => asosiy, fundamental
fundamentally (adv) => asosiy jihatdan, tubdan, mohiyatan

clarify (v) => aniqlashtirmoq
clarification (n) => aniqlashtirish, izoh, noaniq narsani aniq qilib berish, qo‘shimcha tushuntirish.
clear (adj) => aniq, tushunarli

entrol (v) => ro'yxatdan o'tmoq, yozmoq
enrolment (n) => ro'yxatdan o'tish
enrolled (adj) => ro'yxatdan o'tgan, yozilgan

situation (n) => vaziyat, holat
situate (v) => joylashtirmoq
situational (adj) => vaziyatga oid

per se => o‘z-o‘zidan, o‘zi alohida, o‘z mohiyatiga ko‘ra

stress (n) => stress, bosim
stressful (adj) => stressli, asabiylashtiradigan
stressed (adj) => stressda, bosim ostida

substring (n) => qism-satr, satr ichidagi qism

pass (n) => ruxsatnoma, yo'llanma
pass (v) => uzatmoq, o'tmoq

trailing (adj) => oxiridagi, oxirida keladigan, orqada qoladigan, oxiriga tegishli.

leading (adj) => boshidagi, boshida keladigan, oldinda turadigan.

excess (n) => ortiqcha miqdor, ortiqchalik
excess (adj) => ortiqcha, me'yordan ko'p
excessive (adj) => haddan tashqari, me'yordan ortiq

restriction (n) => cheklovlar, taqiqlar, cheklashlar.
restrict (v) => cheklamoq
restricted (adj) => cheklangan

external (adj) => tashqi, tashqaridagi, tashqaridan bo‘lgan.
externally (adv) => tashqi tomondan, tashqaridan
externalize (v) => tashqariga chiqarish, tashqi tizimga o'tkazish

internal (adj) => ichki
internally (adv) => ichki tarzda, ichkaridan
internalize (v) => o'zlashtirmoq, ichki qabul qilmoq
internalization (n) => o'zlashtirish, ichkilashtirish
internalized (adj) => o'zlashtirilgan, ichki qabul qilingan

access (n) => kirish, foydalanish imkoniyati
access (v) => kirmoq, foydalanmoq
accessible (adj) => foydalanish mumkin bo'lgan, kirish mumkin bo'lgan
inaccessible (adj) => kirish imkoni yo'q, foydalanib bo'lmaydigan
accessibility (n) => foydalanish, kirish imkoniyati

obvious (adj) => aniq, yaqqol
abviously => aniqki, yaqqol ravishda, albatta, ko'rinib turibdiki

whatever => nima bo'lsa ham, nima bo'lishidan qat'i nazar, istalgan narsa, mayli nima bo'lsa ham

formulate (v) => shakllantirmoq, ishlab chiqmoq, aniq qilib tuzmoq.

though => ammo / garchi ... bo‘lsa ham

noticeable (adj) => eziladigan, ko‘zga tashlanadigan, yaqqol bilinadigan.

commercial (n) => reklama
commercial (adj) => tijoriy, savdoga oid

demand (n) => talab, ehtiyoj
demand (v) => talab qilmoq

significant (adj) => muhim, sezilarli, katta, salmoqli, ahamiyatli

rely on => tayanmoq, ishonmoq, suyanmoq

detail (n) => tafsilot, batafsil ma'lumot
detailed (adj) => batafsil

apply (v) => qo'llamoq, ishlatmoq

constant (adj) => doimiy, uzluksiz 
constantly (adv) => doimiy ravishda

large chunks => katta qismlar, katta bo'laklar

shape (n) => shakl, format
shape (v) => shakllantirmoq, shakl bermoq
reshape (v) => qayta shakllantirmoq

experienced (adj) => tajribali

simply (adv) → shunchaki, oddiygina, umuman, mutlaqo

axis (n) => o'q

sensible (adj) => aqlli, oqilona, mantiqan to‘g‘ri, amaliy jihatdan to‘g‘ri
sensitive (adj) => ta'sirchan, sezgir, nozik

assumption (n) => taxmin, faraz
assume (v) => deb hisoblamoq, faraz qilmoq (shunday deb qabul qilaman)

simplicity (n) => soddalik, oddiylik.
simple (adj) => oddiy, sodda
simply (adv) => oddiygina, shunchaki

complexity (n) => murakkablik

rather => ancha, biroz, aksincha, ...dan ko‘ra

partially (adv) => qisman, to‘liq emas, ma'lum darajada.

severe (adj) => juda jiddiy, og‘ir, keskin (serious dan kuchli)

feasible (adj) => amalga oshirish mumkin bo‘lgan, amaliy jihatdan mumkin, bajarishning iloji bor (real sharoitda, mavjud vaqt/resurs/imkoniyatlar bilan amalga oshirish mumkin)

realistically (adv) => realistik tarzda, amalda, haqiqiy sharoitni hisobga olib, real nuqtai nazardan.

aim (n) => maqsad, niyat
aim (v) => maqsad qilmoq, intilmoq

though (gap oxirida) => lekin, ammo, shunga qaramay, baribir

estimate (n) => taxminiy hisob, baho
estimate (v) => taxmin qilmoq, chamalamoq

defense (n) => himoya, mudofaa, o'zini himoya qilish

questionnaire (n) → so‘rovnoma, anketa

aversion (n) => nafrat, yoqtirmaslik, qarshilik, xush ko'rmaslik

preference (n) => afzallik, tanlov

analogy (n) => o'xhsatish, qiyoslash, o'xshashlik asosidagi taqqoslash

recall (v) => eslamoq, yodga tushirmoq

trully (adv) => haqiqatan ham, chin dildan, rostdan ham.

scared (adj) => qo'rqib ketgan, qo'rqqan
scare (v) => qo'rqitmoq
scary (adj) => qo'rqinchli

genuine (adj) => haqiqiy, samimiy
genuinely (adv) => chin dildan, haqiqatan ham, samimiy ravishda, rostdan.

valueable (adj) => qimmatli, foydali, muhim, katta qiymatga ega.

existing (adj) => mavjud, allaqachon bor bo‘lgan

strengthen (v) => mustahkamlamoq, kuchaytirmoq
strength (n) => kuch, mustahkamlik

strongly (adv) => kuchli tarzda
strong (adj) => kuchli

ensure (v) => ta’minlamoq, ishonch hosil qilmoq, kafolatlamoq

responsible (adj) => mas’uliyatli, javobgar
responsibly (adv) => ma'suliyat bilan, ma'suliyatli tarzda

cooperation (n) => hamkorlik, birgalikda ishlash
cooperate (v) => hamkorlik qilmoq
cooperative (adj) => hamkorlikka tayyor, hamkorlikdagi

mature (adj) => yetuk, ulg'aygan, oqilona
immature (adj => bolalarcha, yetuk emas

present (n) => sovg'a, hozirgi lahza
present (adj) => hozir bo'lgan, hozirgi(ayni paytdagi)
present (v) => tanishtirmoq, taqdim qilmoq, taqdim etmoq

tricky (adj) => murakkab, nozik, hiylali

undeniable (adj) => inkor qilib bo'lmaydigan
deny (v) => inkor qilmoq

pitfall (n) => yashirin xavf, tuzoq, kutilmagan muammo, xato

avoid (v) => qochmoq, chetlab o‘tmoq, oldini olmoq.

incompatibility (n) => mos kelmaslik, nomuvofiqlik
compatible (adj) => mos keladigan
incompatible (adj) => mos kelmaydigan

warn (v) => ogohlantirmoq

against => qarshi

explanation (n) => tushuntirish, izoh

rely on (v) => tayanmoq, ishonmoq
relying on => ...ga tayanish

milestone (n) => muhim bosqich, muhim natija, katta qadam.

major => mutaxassislik 

graduate => bitirmoq

internship => amaliyot dasturi

experience => tajriba

clarify => aniqlashtirmoq

detail => batafsil ma'lumot

mention => eslatmoq, aytib o'tmoq

requirement => talab

blocker => ishni to'xtatib turgan muammo

upload => yuklamoq
download => yuklab olmoq

point => fikr, nuqta

deal (v) => shug'ullanmoq, hal qilmoq

prioritize → ustuvor ahamiyat bermoq, birinchi o‘ringa qo‘ymoq, muhimligiga qarab tartiblamoq.

complexity (n) => murakkablik
complex (adj) => murakkab

unnecessary (adj) => keraksiz, zarur bo'lmagan

quite (adv) => ancha/anchagine
quite (adv) => butunlay/mutlaqo
quite (adv) => juda

disagreement (n) => kelishmovchilik, fikrga qo'shilmaslik

urgent (adj) => shoshilinch, kechiktirib bo'lmaydigan
urge (v) = undamoq, qat'iy tavsiya qilmoq

consider (v) => ko'rib chiqmoq, o'ylab ko'rmoq

remain (v) => qolmoq, saqlanib qolmoq

once => bir marta 
once + gap => ...gach / ...bilanoq / ...gandan keyin
once + past event => bir paytlar

outdated → eskirgan, zamonaviy emas, endi amalda bo‘lmagan degani.

necessary (adj) => kerakli, lozim, zarur

need (v) => kerak bo'lmoq , muhtoj bo'lmoq

exact (adj) => aniq
exactly (adv) => aynan, aniq

include (v) => o'z ichiga olmoq, kiritmoq, qo'shmoq, ichiga qo'shmoq, hisobga olmoq

specific (adj) => aniq, muayyan, ma'lum bir

preferred (adj) => avfzal, ma'qul ko'rilgan

adjust (v) => moslashtirmoq, sozlamoq, o'zgartirib mos qilmoq

revise => qayta ko‘rib chiqmoq, o‘zgartirmoq

need (v) => kerak bo'lmoq
need to + V1 => ... qilishi kerak bo'lmoq

accordingly (adv) => shunga ko‘ra, shunga muvofiq, shunga qarab, shunga mos ravishda

tell (v) => aniqlamoq, ajrata olmoq
tell (v) => aytmoq

advantage (n) => afzallik, ustunlik, foydali tomon

practical (adj) => amaliy, amaliyotga oid, amaliy jihatdan qulay, foydali
practicable (adj) => amalga oshirish mumkin bo'lgan, bajarish mumkin bo'lgan

extent (n) → daraja, ko‘lam, miqyos

entirely (adv) => butunlay, to'liq, tamoman
entire (adj) => butun, to'liq

convince (v) => ishontirmoq
convinced (adj) => ishongan, amin bo'lgan

suitable => mos, muvofiq, to‘g‘ri keladigan, yaroqli

relevant (adj) => aloqador, tegishli, mavzuga mos, kerakli

definitely (adv) => albatta, shubhasiz, aniq, qat'iyan

although (conjunction) => garchi (Rasmiyroq va asosan gap boshida keladi)
though (conjunction) => garcha, bo'lsa ham (norasmiyroq)

separate (v) => ajratmoq
separate (adj) => alohida 
separately (adv) => alohida ravishda 
separation (n) => ajratish, ajralish

following (n) => quyidagilar
following (adj) => quyidagi, keyingi
following (preposition) => ...dan keyin

specifically (adv) => aynan, xususan, aniq qilib aytganda 
specific (adj) => aniq, muayyan, konkret 
specificity (n) => aniqlik, o'ziga xoslik

theoretical (adj) => nazariy, nazariyaga oid
theoretically (adv) => nazariy jihatdan
theory (n) => nazariya

knowledge (n) => bilim

slightly (adv) => biroz, sal, ozgina, birozgina

survival (n) => omon qolish, tirik qolish, yashab qolish
survive (v) => tirik qolmoq, omon qolmoq
survivor (n) => omon qolgan odam

pretty (adj) => chiroyli
pretty (adv) => ancha, anchagina, juda

through (preposition) => orqali, ichidan, davomida, boshidan oxirigacha 

no longer (adverbial phrase) => endi ... emas, boshqa ... emas, avvalgidek ... emas (formal. odatda fe'ldan oldin keladi)

anymore (adv) => endi, bundan buyon, bundan keyin degani (informal. Gap oxirida keladi asosan)

etc or et cetera (phrase => va hokazo

and so on (phrase) => va hokazo

correspond (v) => mos kelmoq, bir-biriga to‘g‘ri kelmoq, yozishib turmoq
corresponding (adj) => mos keladigan, tegishli

involve (v) => jalb qilmoq, o‘z ichiga olmoq, bog‘liq bo‘lmoq

variety => xilma-xillik / turli xil narsalar / xilma-xil to‘plam

greatly (adv) => juda, katta darajada, sezilarli darajada

primarily (adv) => asosan, birinchi navbatda, eng avvalo degani.

success (n) => muvaffaqiyat
successful (adj) => muvaffaqiyatli
successfully (adv) => muvaffaqiyatli ravishda

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