// ============================================================
// YANGI SO'Z QO'SHISH => JUDA OSON:
// Har bir qatorni aynan shu formatda yozing:
//     so'z (pos) => tarjima, tarjima2, ...
// pos: n / v / adj / adv (ba'zi so'zlarda pos shart emas, masalan "except =>")
//
// Bir OILA (masalan valid/validate/validation/...) ni ajratish uchun
// qatorlarni ketma-ket yozing. Ikki OILA orasida esa BITTA BO'SH QATOR
// qoldiring => shu bo'sh qator "yangi oila boshlandi" degani.
//
// Root (oila sarlavhasi) va uning tarjimasi avtomatik hisoblanadi:
// oiladagi ENG QISQA so'z root sifatida olinadi (masalan "validate,
// validation, valid, invalid, validator, validity" ichidan "valid").
// Shuning uchun sizga hech narsani qo'lda belgilash shart emas =>
// shunchaki so'zlaringizni pastga joylashtiring.
// ============================================================

const RAW_WORDS = `

America (n) => Amerika
American (n) => amerikalik
American (adj) => Amerikaga oid
Americanize (v) => amerikalashtirmoq
Americanization (n) => amerikalashtirish
Americanized (adj) => amerikalashtirilgan
Americanism (n) => amerikalarga xos so'z yoki ibora

Britain (n) => Britaniya
British (n) => britaniyalik
British (adj) => Britaniyaga oid
Briton (n) => britaniyalik
Britishness (n) => britaniyalikka xoslik, Britaniya madaniyatiga xoslik

France (n) => Fransiya
French (n) => fransuz
French (adj) => fransuzcha, Fransiyaga oid
Frenchify (v) => fransuzlashtirmoq
Frenchification (n) => fransuzchalashtirish
Frenchified (adj) => fransuzchalashtirilgan
Frenchness (n) => fransuzlarga yoki ularning madaniyatiga xoslik

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
achievably (adv) => erishish mumkin bo'lgan tarzda
unachievably (adv) => erishib bo'lmaydigan tarzda

average (n) => o'rtacha qiymat, o'rtacha ko'rsatkich
averageness (n) => o'rtachalik, odatiylik
average (v) => o'rtachasini hisoblamoq, o'rtacha bo'lmoq
averageable (adj) => o'rtachasini hisoblash mumkin bo'lgan
averaged (adj) => o'rtachalashtirilgan, o'rtacha hisoblangan
average (adj) => o'rtacha, odatiy
averagely (adv) => o'rtacha darajada

analysis (n) => tahlil (plural: analayses)
analyst (n) => tahlilchi
analyzer / analyser (n) => tahlil qiluvchi vosita yoki dastur
analyze (v) => tahlil qilmoq
analytical (adj) => tahliliy, tahlilga asoslangan
analytic (adj) => tahliliy, tahlilga oid
analyzable / analysable (adj) => tahlil qilish mumkin bo'lgan, tahlil qilinadigan
analytically (adv) => tahliliy tarzda, tahliliy nuqtayi nazaridan

reproduce (v) => qayta yaratmoq, takroran hosil qilmoq
reproduced (adj) => qayta yaratilgan
reproduction (n) => qayta yaratish, takrorlash
reproducible (adj) => qayta yaratish yoki takrorlash mumkin bo'lgan
reproducibly (adv) => qayta yaratish mumkin bo'lgan tarzda
reproducibility (n) => qayta yaratish yoki takrorlash mumkinligi

horizontality (n) => gorizontallik, gorizontal holat
horizontalization (n) => gorizontal holatga keltirish, gorizontallashtirish
horizontalize (v) => gorizontal holatga keltirmoq, gorizontallashtirmoq
horizontal (adj) => gorizontal, yotiq, ufqqa parallel
horizontally (adv) => gorizontal ravishda, yotiq holda

vertical (adj) => vertikal, tik
vertically (adv) => vertikal ravishda
verticality (n) => vertikallik

validation (n) => tekshirish va tasdiqlash, haqiqiyligini tekshirish, talabga mosligini tekshirish
validity (n) => haqiqiylik, yaroqlilik, asoslanganlik, amal qilish kuchi
invalidity (n) => yaroqsizlik, huquqiy emaslik, asossizlik
validator (n) => tekshiruvchi, validatsiya qiluvchi vosita yoki dastur
validate (v) => tekshirib tasdiqlamoq, haqiqiyligini tekshirmoq, talabga mosligini tekshirmoq
valid (adj) => haqiqiy, yaroqli, amaldagi, talabga mos, asosli
invalid (adj) => yaroqsiz, haqiqiy emas, talabga mos emas, kuchga ega emas

roundedness (n) => to'laqonlilik, har tomonlama rivojlanganlik
round (v) => aylantirmoq, yaxlitlamoq
well-rounded (adj) => har tomonlama rivojlangan, ko‘p qirrali, turli jihatlarda yetarlicha bilim va ko‘nikmaga ega
round (adj) => yumaloq, dumaloq

collection (n) => to'plam, kolleksiya, yig'indi
collector (n) => yig'uvchi, to'plovchi, kolleksioner
collective (n) => guruh, jamoa, umumiy to'plam
collecting (n) => to'plash, yig'ish, kolleksiya qilish
collectivism (n) => kollektivizm, jamoviylik g'oyasi
collectivist (n) => kollektivizm tarafdori, kollektivist
collect (v) => to'palmoq, yig'moq, jamlamoq
collected (adj) => to'plangan, yig'ilgan, vazmin, o'zini bosgan
collectable (adj) => to'plashga arziydigan, kelleksiya uchun mos
collectible (adj) => kolleksiya uchun yig'ish mumkin bo'lgan, kolleksion
collective (adj) => jamoaviy, umumiy, birgalikdagi, guruhga tegishli
collecting (adj) => to'playdigan, yig'uvchi
collectivistic (adj) => kollektivistik, jamoviylikka asoslangan
collectively (adv) => birgalikda, jamoaviy tarzda, umumiy holda

simplified (adj) => soddalashtirilgan, osonlashtirilgan, murakkabligi kamaytirilgan
simplify (v) => soddalshtirmoq, osonlashtirmoq, murakkabligini kamaytirmoq
simple (adj) => oddiy, sodda, murakkab bo'lmagan
simply (adv) => oddiygina, shunchaki, sodda tarzda
simplicity (n) => soddalik, oddiylik
simplification (n) => soddalashtirish

exaggeration (n) => bo'rttirish, oshirib ko'rsatish, mubolag'a
exaggerate (v) => bo'rttirmoq, oshirib ko'rsatmoq, haddan tashqari kattalashtirib aytmoq
exaggerated (adj) => bo'rttirilgan oshirib yuborilgan, haddan tashqari kattalashtirilgan
exaggeratedly (adv) => bo'rttirib, oshirib yuborish

complication (n) => asorat, qo'shimcha muammo, vaziyatni qiyinlashtiruvchi holat
overcomplication (n) => ortiqcha murakkablashtirish, ortiqcha murakkablik
complicating (n) => murakkablashtirish, qiyinlashtirish
complicate (v) => murakkablashtirmoq, qiyinlashtirmoq
overcomplicate (v) => haddan tashqari murakkablashtirmoq
complicated (adj) => murakkab, qiyin, chalkash
overcomplicated (adj) => haddan tashqari murakkablashtirilgan, ortiqcha murakkab, keragidan ko'ra qiyin
complicating (adj) => murakkablashtiruvchi, qiyinlashtiruvchi
complicatedly (adv) => murakkab tarzda, chalkash tarzda (ish yoki jarayon)

hypothetical (adj) => faraziy, taxminiy, shartli, haqiqatda mavjud bo'lmagan, faqat tasavvur yoki taxmin asosidagi
hypothesis (n) => gipoteza, faraz, ilmiy taxmin
hypothesize / hypthesise (v) => faraz qilmoq, gipoteza ilgari surmoq
hypothetically (adv) => faraziy tarzda, faraz qiladigan bo'lsak, taxminan

circuit (n) => zanjir, elektr sxemasi, elektron sxema, aylanma yo'l
circuit (v) => aylanib chiqmoq, aylanib yurmoq
circuitous (adj) => aylanma, to'g'ri bo'lmagan, bilvosita
circuitously (adv) => aylanma tarzda, bilvosita
circuitousness (n) => aylanmalik, bilvositalik

sparkline (n) => kichik grafik, ixcham diagramma, ma'lumotdagi o'zgarishlarni ko'rsatuvchi kichik chiziqli grafik

exception (n) => istisno, odatdagi holatdan chetga chiqish
exceptional (adj) => g'ayrioddiy, noodatiy, juda ajoyib, yuqori darajadagi
exceptionally (adv) => nihoyatda, odatdagidan juda yuqori darajada, juda

authenticate (v) => haqiqiyligini tasdiqlamoq, autentifikatsiya qilmoq 
authentication (n) => autentifikatsiya, shaxsni tasdiqlash
authenticator (n) => autentifikatsiya qiluvchi vosita yoki datur
authenticated (adj) => tasdiqlangan, autentifikatsiyadan o'tgan
authentic (adj) => haqiqiy, asl, ishonchli
authentically (adv) => haqiqiy tarzda
authenticity (n) => haqiqiylik, asl ekanlik
unauthenticated (adj) => autentifikatsiyadan o'tmagan, tasdiqlanmagan
inauthentic (adj) => haqiqiy bo'lmagan, soxta
inauthenticaly (adv) => haqiqiy bo'lmagan tarzda

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

allowance (n) => ruxsat etilgan miqdor, nafaqa, ajratma, belgilangan me'yor
allower (n) => ruxsat beruvchi
allow (v) => ruxsat bermoq, imkon bermoq, yo'l qo'ymoq
allowed (adj) => ruxsat berilgan, yo'l qo'yilgan
allowable (adj) => ruxsat etiladigan, yo'l qo'yiladigan, maqbul
allowably (adv) => ruxsat etilgan tarzda, maqbul tarzda

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
clustering (n) => guruhlash, klasterlash, guruhlanish
cluster (v) => guruhlamoq, bir joyga jamlamoq, to'plamoq
clustered (adj) => guruhlangan, klasterlangan, bir joyga jamlangan
clusterable (adj) => klasterlash mumkin bo'lgan, guruhlash mumkin bo'lgan
clustering (adj) => guruhlanayotgan, klasterlanayotgan
clusteredness (n) => guruhlanganlik, klasterlanganlik

configuration (n) => konfiguratsiya, sozlamalar, sozlash holati
misconfiguration (n) => noto'g'ri sozlama, noto'g'ri konfiguratsiya 
configurability (n) => sozlash imkoniyati, moslashuvchanlik
configure (v) => sozlamoq, konfiguratsiya qilmoq, moslamoq
misconfigure (v) => noto'g'ri sozlamoq, noto'g'ri konfiguratsiya qilmoq
configurational (adj) => konfiguratsiyaga oid
configurable (adj) => sozlash mumkin bo'lgan, moslanadigan, konfiguratsiya qilinadigan
configured (adj) => sozlangan, konfiguratsiya qilingan, moslab o'rnatilgan
misconfigurated (adj) => noto'g'ri sozlangan, noto'g'ri konfiguratsiya qilingan

matter (n) => masala, ish, mavzu, modda, materiya
matters (n) => ishlar, vaziyat, masalalar
materiality (n) => muhimlik, ahamiyatlilik
matter (v) => muhim bo'lmoq, ahamiyatga ega bo'lmoq
material (adj) => moddiy, muhim, ahamiyatli
immaterial (adj) => ahamiyatsiz, nomoddiy
matter-of-fact (adj) => xotirjam, hissiyotsiz, dona-dona
materially (adv) => sezilarli darajada, moddiy jihatdan
matter-of-factly (adv) => xotirjam, hissiyotsiz ohangda

isolation (n) => ajratish, izolyatsiya, alohidalik, boshqa narsalardan mustaqil holat
isolate (v) => ajratmoq, alohida qilmoq
isolated (adj) => ajratilgan, alohida, yakkalangan
isolatedly (adv) => alohida tarzda

distribution (n) => taqsimlash, tarqatish, taqsimot
distributor (n) => distribyutor, tarqatuvchi, mahsulotlarni tarqatib yoki sotuvchilarga yetkazib beruvchi
distribute (v) => taqsimlamoq, tarqatmoq
distributed (adj) => taqsimlangan, tarqatilgan
distributive (adj) => taqsimlovchi, taqsimlashga oid
distributable (adv) => taqsimlash yoki tashqatish mumkin bo'lgan

transaction (n) => bitim, kelishuv, oldi-sotdi operatsiyasi, moliyaviy operatsiya
transactor (n) => bitim tuzuvchi, operatsiyani amalga oshiruvchi shaxs yoki narsa
transactional (adj) => bitimga oid, savdo-sotiqqa oid, operatsiyaga oid
transact (v) => bitim tuzmoq, operatsiya qilmoq
transactionally (adv) => bitim tarzida

replication (n) => nusxalash, ko'paytirish, takroriy nusxa yaratish, replikatsiya
replicate (v) => nusxalamoq, qayta yaratmoq, takrorlamoq
replica (n) => nusxa, ko'chirma
replicated (adj) => nusxalangan, ko'paytirilgan
replicative (adv) => nusxalashga oid, takrorlovchi

challenge (n) => qiyinchlik, sinov, da'vat, e'tiroz
challenger (n) => raqib, da'vogar, bellashuvchi
challenge (v) => qiyinchilik tug'dirmoq, sinamoq, da'vo qilmoq, qarshi chiqmoq
challenging (adj) => qiyin, murakkab, sinovli, katta kuch yoki harakat talab qiladigan
challenged (adj) => qiyinchlikka duch kelgan, qiynalayotgan, sinovdan o'tayotgan
challengeable (adj) => shubha ostiga qo'yish mumkin bo'lgan, bahslashish mumkin bo'lgan, e'tiroz bildirish mumkin bo'lgan

mess (n) => tartibsiz, pala-partishlik, chalkash holat, iflos holat, muammo
messiness (n) => tartibsizlik, pala-partishlik
mess-up (n) => xato, buzib qo'yish, omadsiz bajarilgan ish
mess (v) => iflos qilmoq, tartibsiz qilmoq
mess-up (v) => buzib qo'ymoq, xato qilmoq
messy (adj) => tartibsiz, pala-partish, iflos
messed-up (adj) => buzilgan, chappasiga ketgan, ruhiy yoki emotsional jihatdan muammoli
messily (adv) => tartibsiz tarzda, pala-partish tarzda

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

control (n) => nazorat, boshqaruv, boshqaruv tugmasi
controller (n) => nazoratchi, boshqaruvchi
controls (n) => boshqaruv pulti, boshqaruv tugmalari
control (v) => nazorat qilmoq, boshqarmoq, jilovlamoq
outcontrol (v) => ustidan ustunlik qilmoq
controlled (adj) => nazorat qilinadigan, boshqariladigan, nazorat ostidagi
uncontrolled (adj) => nazoratsiz, boshqarilmaydigan
controllable (adj) => nazorat qilish mumkin bo'lgan
uncontrollable (adj) => nazorat qilib bo'lmaydigan, jilovlab bo'lmaydigan
controllably (adv) => nazorat qilinadigan tarzda
uncontrollably (adv) => nazoratsiz, jilovlab bo'lmaydigan darajada

communication (n) => muloqat, aloqa, kommunikatsiya, fikr almashish
miscommunication (n) => noto'g'ri muloqot, noto'g'ri tushunish, xabarni noto'g'ri yetkazish
communicator (n) => muloqat qiluvchi, fikrni yaxshi yetkazuvchi shaxs
communicability (n) => muloqat qilish imkoniyati, yatkazish mumkinligi
communicate (v) => muloqat qilmoq, aloqa qilmoq, fikrini yetkazmoq, xabar bermoq
miscommunicate (v) => noto'g'ri muloqat qilmoq, fikrni noto'g'ri yetkazmoq
communicative (adj) => muloqatga kirishuvchan, fikrini yaxshi ifodalaydigan
communicational (adj) => kommunikatsiyaga oid, muloqatga oid
communicable (adj) => yetkazish mumkin bo'lgan, uzatilishi mumkin bo'lgan
communicated (adj) => yetkazilgan, bildirilgan, ifodalangan
communicating (adj) => muloqat qilayotgan, aloqa qilayotgan
communicatively (adv) => muloqat tarzida, kommunikativ tarzda

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

cab (n) => taksi mashinasi, haydovchi kabinasi, boshqaruv kabinasi
cab (v) => taksida olib bormoq, taksida yurmoq
cabby / cabbie (n) => taksi haydovchisi

archive (n) => arxiv, arxivdagi ma'lumotlar
archiving (n) => arxivlash, arxivga joylash
archive (v) => arxivlamoq, arxivga joylamoq, faol foydalanishdan olib qo'ymoq
archived (adj) => arxivlangan, arxivga joylangan, faol holatdan chiqarilgan
archival (adj) => arxivga oid, arxiv uchun mo'ljallangan, arxivga tegishli
archivist (n) => arxivchi, arxiv xodimi - arxiv materiallarini saqlash va boshqarish bilan shug'ullanuvchi mutaxassis
archivally (adv) => arxiv nuqtayi nazaridan, arxivga oid tarzda

absence (n) => yo'qlik, mavjud emaslik, qatnashmaslik, bo'lmaslik
absent (adj) => yo'q, qatnashmagan, mavjud bo'lmagan
absent (v) => o'zini olib qochmoq, o‘zini chetga olmoq, biror joyda qatnashmaslik
absently (adv) => e'tiborsiz tarzda, xayol surib, beixtiyor
absentee (n) => yo'q shaxs, qatnashmagan kishi
absenteeism (n) => muntazam ravishda ish yoki darsga kelmaslik

uniqueness (n) => o'ziga xoslik, noyoblik, betakrorlik
unique (adj) => noyob, o'ziga xos, betakror
uniquely (adv) => o'ziga xos tarzda, noyob tarzda
uniqueness (n) => o'ziga xoslik, noyoblik

violence (n) => zo'ravonlik, qo'pollik, shiddatli harakat
violent (adj) => zo'ravon, shiddatli, qattiq
nonviolent (adj) => zo'ravonliksiz
violently (adv) => zo'ravonlik bilan, shiddat bilan, qattiq
nonviolently (adv) => zo'ravonliksiz yo'l bilan

violation (n) => buzilish, qoidabuzarlik, buzish
violator (n) => qoidabuzar, qoidani buzgan shaxs
violate (v) => rioya qilmaslik, buzmoq, daxlsizlikka tajovuz qilmoq, muqaddas joyni bulg'amoq
violative (adj) => buzuvchi, qoidaga zid
inviolable (adj) => daxlsiz, buzib bo'lmaydigan
inviolate (adj) => buzilmagan, daxlsiz

constraint (n) => cheklov, cheklvochi shart, chegaralovchi omil
constraint (v) => cheklamoq, majburlamoq, chegaralamoq
constraining (adj) => cheklovchi, chegaralovchi
constrainted (adj) => cheklangan, majburiy, chegaralangan, erkinligi cheklangan
unconstrained (adj) => cheklanmagan, chegaralanmagan, erkin
constraint-based (adj) => cheklovlarga asoslangan, cheklovlar asosidagi
constrainedly (adv) => cheklangan tarzda, o'zini tiya turib, majburan
unconstrainedly (adv) => cheklanmagan tarzda

optimistic (adj) => optimistik, ijobiy fikrdagi, yaxshi natijaga umid qiladigan
optimism (n) => optimizm, ijobiy qarash
optimist (n) => optimist, ijobiy fikrlovchi odam

pessimistic (adj) => pessimistik, salbiy fikrdagi, yomon natijani kutadigan
pessimistically (adv) => pessimistik tarzda, salbiy qarash bilan
pessimism (n) => pessimizm, salbiy qarash, yomon natijani kutish
pessimist (n) => pessimist, salbiy fikrlovchi odam

lock (n) => qulf, qulflash mexanizmi
locker (n) => qulflanadigan shkafcha, shkafcha
lockout (n) => kirishdan mahrum qilish, bloklab qo'yish, ish beruvchining ishchilarni ishga kiritmasligi
lockdown (n) => qat'iy yopilish rejimi, tashqariga chiqishni va kirib-chiqishni cheklash
lock (v) => qulflamoq, bloklamoq, yopib qo'ymoq
unlock (v) => qulfini ochmoq, blokdan chiqarmoq, ochmoq
lockout (v) => bloklab qo'ymoq, kirishni to'smoq
lockdown (v) => qat'iy yopib qo'ymoq, kirib-chiqishni cheklamoq
lockable (adj) => qulflash mumkin bo'lgan, qulflanadigan
lockless (adj) => qulfsiz
locked (adj) => qulflangan, bloklangan
unlocked (adj) => qulfi ochiq, qulflanmagan

timeout (n) => vaqt tugashi, kutish vaqti tugashi, vaqt chegarasi

gratitude (n) => minnatdorlik, tashakkur
gratefulness (n) => minnatdorlik
ungratefulness (n) => minnatdor bo'lmaslik, noshukurlik
grateful (adj) => minnatdor, tashakkur bildiruvchi
ungrateful (adj) => minnatdor bo'lgan, noshukr, yaxshilikni qadrlamaydigan
gratefully (adv) => minnatdorlik bilan, tashakkur bilan
ungratefully (adv) => minnatdorchiliksiz, noshukrlarcha

arguably (adv) => aytish mumkinki, bahslashish mumkin bo'lgan tarzda, fikr yuritishga ko'ra, ehtimol eng ...
arguable (adj) => bahsli, munozarali, bahslashish mumkin bo'lgan
argue (v) => bahslashmoq, dalil keltirmoq
argument (n) => bahs, dalil, argument, munozara
argumentative (adj) => bahslashuvchan

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

delivery (n) => yetkazib berish, topshirish, taqdim etish
deliverable (adj) => topshirilishi kerak bo'lgan natija, buyurtmachiga topshiriladigan mahsulot yoki natija
deliver (v) => yetkazib bermoq, topshirmoq, taqdim etmoq
delivered (adj) => yetkazib berilgan, topshirilgan, taqdim etilgan

absoluteness (n) => mutlaqlik, to'liqlik
absolutely (adv) => mutlaqo, butunlay, albatta, hech shubhasiz, to'liq ravishda
absolute (adj) => mutlaq, to'liq, cheksiz, shubhasiz
absolutism (n) => absolyutizm, mutlaq hokimiyat
absolutist (n) => absolutist, mutlaq hokimiyat tarafdori
absolutization (n) => mutlaqlashtirish, bir narsani yagona va o‘zgarmas deb qabul qilmoq
absolutize (v) => mutlaqlashtirmoq, biror narsani mutlaq deb qaramoq

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

discussion (n) => muhokama, fikr almashish, muayyan masala haqida suhbat
discuss (v) => muhokama qilmoq, biror masalani gaplashib ko'rmoq
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

child (n) => bola, farzand (0-12 age)
childishness (n) => bolalarcha xatti-harakat, yetuk emaslik
childlikeness (n) => bolalarga xoslik, beg'uborlik
childish (adj) => bolalarcha, yetuk emas, bolalarcha tutadigan
childlike (adj) => bolalarga xos, beg'ubor, sodda
childishly (adv) => bolalarcha, yetuk bo'lmagan tarzda

press (v) => bosmoq, siqmoq
press (n) => bosish, matbuot
pressing (adj) => shoshilinch, juda muhim
pressing (n) => bosish, siqish
pressure (n) => bosim, bosim kuchi
pressurized (adj) => bosim ostidagi, bosim berilgan

address (v) => murojaat qilmoq, muammmoni hal qilishga kirishmoq, ko'rib chiqmoq
address (n) => manzil, murojaat
addressed (adj) => murojaat qilingan, ko'rib chiqilgan, chora ko'rilgan
addressing (n) => muammonni ko'rib chiqish
addressable (adj) => murojaat qilish mumkin bo'lgan, ko'rib chiqish yoki chora ko'rish mumkin bo'lgan

description (n) => tavsif, ta'rif, izoh, bayon, tasvir, batafsil bayon
describe (v) => ta'riflamoq, tavsiflamoq, ta'riflamoq
descriptive (adj) => tasviriy, tavsiflovchi, batafsil ta'rif beruvchi
descriptively (adv) => tasviriy tarzda, tavsiflovchi tarzda

consistency (n) => izchillik, bir xillik, moslik, barqarorlik
consist (v) => iborat bo'lmoq, tashkil topmoq
inconsistency (n) => nomuvofiqlik, ziddiyat, izchillikning yo'qligi
consistent (adj) => izchil, bir xil, mos, barqaror
inconsistent (adj) => izchil bo'lmagan, mos kelmaydigan, ziddiyatli
consistently (adv) => izchil ravishda, muntazam ravishda, bir xil tarzda
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

suit (n) => kostyum, ayollar yoki erkaklar kiyadigan rasmiy kiyim
suitability (n) => moslik, yaroqlilik, maqsadga muvofiqlik
unsuitability (n) => mos emaslik, muvofiq emaslik
suit (v) => mos kelmoq, yarashmoq, ma'qul bo'lmoq
suitable (adj) => mos, ma'qul, to'g'ri keladigan, yaroqli, talabga javob beradigan
unsuitable (adj) => mos emas, yaroqsiz, to'g'ri kelmaydigan
suitably (adv) => mos ravishda, ma'qul tarzda
unsuitably (adv) => nomuvofiq tarzda, mos kelmaydigan tarzda

persuit (n) => quvish, ta'qib, intilish, ortidan borish
pursuer (n) => quvuvchi, ta'qib qiluvchi, intiluvchi
persue (v) => quymoq, ta'qib qilmoq, intilmoq, ortidan bormoq
pursued (adj) => ta'qib qilinayotgan, ortidan borilayotgan
pursuing (adj) => ta'qib qilayotgan, intilayotgan

variety (n) => xilma-xillik, turli-tumanlik, rang-baranglik, tur, xil
vary (v) => o'zgarib turmoq, farq qilmoq, turlicha bo'lmoq
various (adj) => turli xil, har xil, turfa
variously (adv) => turli tarzda, turlicha

blob (n) => shaklsiz massa, uyum, tomchi, dog'
blob (v) => tomchilamoq, dog' qilib qo'ymoq, shaklsiz massa holatiga keltirmoq
blobby (adj) => shaklsiz, bo'rtib turgan amorf

usual (adj) => odatdagi, odatiy, ko'nikilgan
usually (adv) => odatda, ko'pincha, aksariyat hollarda, odatdagidek
unusual (adj) => g'ayrioddiy, noodatiy
unusually (adv) => g'ayrioddiy tarzda, odatdagidan ko'ra
usualness (n) => odatdagi holat, odatiylik

category (n) => toifa, kategoriya, turkum
categorization (n) => tasniflash, toifalarga ajratish, turkumlash
categorize (v) => toifalarga ajratmoq, tasniflamoq, turkumlamoq
categorized (adj) => toifaga ajratilgan, turkumlangan, tasniflangan
categorical (adj) => qat'iy, keskin, shubhasiz
categorically (adv) => qat'iy ravishda, keskin tarzda, shubhasiz tarzda

fancy (n) => xohish, istak, tasavvur, havas
fanciness (n) => hashamatlilik, dabdabalilik, bezakdorlik
fancier (n) => ishqiboz, ma'lum narsani yaxshi ko'ruvchi
fancy (v) => xohlamoq, istamoq, yoqtirmoq, tasavvur qilmoq
fancy (adj) => hashamatli, dabdabali, chiroyli va o'ziga xos, murakkabroq, bezakli
fanciful (adj) => xayoliy, tasavvurga boy, haqiqatdan yiroq
fancy-free (adj) => erkin, hech kimga bog'lanmagan
fancifully (adv) => xayoliy tarzda
fancily (adv) => hashamatli, bezakli tarzda

fractional (adj) => kasrli, kasrga oid, juda kichik qismdan iborat, qisman
fraction (n) => kasr, qism, ulush
fractionally (adv) => juda oz miqdorda, birozgina, qisman

awareness (n) => xabardorlik, anglash, tushunish
unawareness (n) => bexabarlik, xabardor emaslik
aware (adj) => xabardor, biladigan, anglagan, voqif
unaware (adj) => xabarsiz, bexabar, bilmaydiga
awarely (adv) => ongli ravishda, anglagan holda
unawarely (adv) => bexabar holda, bilmagan holda

native (n) => mahalliy aholi vakili, shu joyda tug'ilgan odam, ona tili shu til bo'lgan odam
nativeness (n) => mahallilik, tug'malik, o'z joyiga xoslik
nativity (n) => tug'ilish, tug'ilgan joy, kelib chiqish
nativism (n) => mahalliy aholining manfaatlarini ustun qo'yish g'oyasi
nativist (n) => mahalliy aholi manfaatlarini ustun qo'yuvchi shaxs
native (adj) => tug'ma, mahalliy, shu joyga xos, ona tiliga oid
unnative (adj) => mahalliy yoki tug'ma bo'lmagan
natively (adv) => tug'ma yoki mahalliy tarzda, tabiiy ravishda

advice (n) => maslahat, tavsiya
advise (v) => maslahat bermoq, tavsiya qilmoq
advisor / adviser (n) => maslahatchi
advisable (adj) => ma'qul, tavsiya etiladigan
advisably (adv) => ma'qul tarzda, oqilona tarzda
advisory (n) => maslahat, tavsiyaviy ogohlantirish

pain (n) => og'riq, azob, qiyinchilik
painful (adj) => og'riqli, azobli, juda qiyin, yoqimsiz
painfully (adv) => og'riqli tarzda, juda qiyin yoki achinarli darajada
painless (adj) => og'riqsiz, oson, qiyinchiliksiz
painlessly (adv) => og'riqsiz tarzda, qiyinchiliksiz

slow (adj) => sekin, sust
slow (adv) => sekin yoki sust tarzda
slow (v) => sekinlashtirmoq, sekinlashmoq
slowly (adv) => sekin tarzda, asta-sekin

viability (n) => amalga oshirish mumkinligi, hayotiylik, ish berish imkoniyati, tirik qola olish qobiliyati
viable (adj) => amalga oshirish mumkin bo'lgan, hayotiy, ish beradigan, tirik qola oladigan
unviable (adj) => amalga oshirib bo'lmaydigan
viably (adv) => amalga oshirish mumkin bo'lgan tarzda
noviable / non-viable (adj) => amalga oshirib bo'lmaydigan, hayotiy bo'lmagan, ish bermaydigan

somehow (adv) => qandaydir qilib, bir amallab, qanday yo‘l bilandir, nima bo‘lsa ham, noma’lum bir tarzda
somewhere (adv) => qayerdadir, biror joyda, qandaydir bir joyda, noma’lum joyda
someone (pronoun) => kimdir, biror kishi, qandaydir bir odam
something (pronoun) => nimadir, biror narsa, qandaydir bir narsa
somewhat (adv) => biroz, sal, ma’lum darajada, qisman, bir oz darajada

manage (v) => uddalamoq, boshqarmoq
manager (n) => menejer, boshlovchi, rahbar
management (n) => boshqaruv, boshqarish, rahbariyat
manageable (adj) => uddalasa bo'ladigan, boshqarish mumkin bo'lgan, nazorat qilsa bo'ladigan
unmanageable (adj) => uddalab bo'lmaydigan, boshqarib bo'lmaydiga
managerial (adj) => boshqaruvga oid, menejerlikka oid

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

start (n) => boshlanish, boshlanish vaqti, start
restart (n) => qayta boshlash, qayta ishga tushirish
starter (n) => boshlovchi, ishga tushirgich, boshlang'ich taom
start-up / startup (n) => yangi tashkil etilgan biznes, yangi kompaniya
start (v) => boshlamoq, ishga tushirmoq, boshlanmoq
restart (v) => qayta boshlamoq, qayta ishga turshirmoq
starting (adj) => boshlang'ich, boshlayotgan

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

disprove (v) => noto'g'riligini isbotlamoq, asossizligini ko'rsatmoq, rad etuvchi dalil bilan inkor qilmoq
disproof (n) => noto‘g‘riligini isbotlash, rad etuvchi dalil, noto'g'riligini ko'rsatuvchi dalil
disproved (adj) => noto'g'ri isbotlangan, rad etilgan

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

appropriateness (n) => moslik, o'rinlilik, maqsadga muvofiqlik
appropriate (v) => o'zlashtirib olmoq, o'ziga ajratib olmoq, foydalanish uchun olib qo'ymoq
appropriate (adj) => mos, munosib, maqbul, o'rinli, to'g'ri keladigan, tegishli
appropriately (adv) => mos ravishda, o'rinli tarzda, tegishli tarzda
inappropriate (adj) => noo'rin, nomunosib, mos kelmaydigan
inappropriately (adv) => noo'rin tarzda, nomunosib ravishda

perform (v) => bajarmoq, amlaga oshirmoq, ijro etmoq, natija ko'rsatmoq, ishlamoq
performance (n) => ishlash samaradorligi, unumdorlik, bajarilish darajasi, ijro
performer (n) => ijrochi, bajaruvchi, sahnada chiqish qiluvchi
performative (adj) => ijroga oid, amalga oshirishga qaratilgan

stare (n) => tikilish, tikilib qarash
starer (n) => tikilib qarovchi odam
stare (v) => tikilib qaramoq, uzoq vaqt tikilib turmoq, ko'zini uzmay qarammoq
staring (adj) => tikilib qarayotgan, tikilgan
startingly (adv) => tikilib, ko'z uzmay

block (v) => to'smoq, bloklamoq, yo'lini to'smoq, kirishni yoki foydalanishni cheklamoq
block (n) => to'sin, blok, to'sqinlik
blocking (n) => to'sish, bloklash
blocker (n) => to'sqinlik qiluvchi narsa, to'suvchi, bloklovchi
blockage (n) => tiqilib qolish, berkilish

kick (n) => tepki, tepish, tepki zarbasi, zavq yoki hayajon
kicker (n) => tepguvchi, tepki beruvchi, qo'shimcha muammo yoki shart
kick (v) => tepmoq, tepib yubormoq, tepki bermoq
kicked (adj) => chiqarib yuborilgan
kickable (adj) => tepish mumkin bo'lgan
unkickable (adj) => tepib bo'lmaydigan

notification (n) => bildirishnoma, xabarnoma, xabar berish
notifier (n) => xabar beruvchi, xabardor qiluvchi dastur yoki tizim
notifying (n) => xabar berish, xabardor qilish
notifiability (n) => xabar berish mumkinligi
notify (v) => xabar bermoq, ma'lum qilmoq, rasman xabardor qilmoq
notifiable (adj) => xabar berilishi shart bo'lgan, xabar berish mumkin bo'lgan
notified (adj) => xabardor qilingan, xabar berilgan

correspondence (n) => muvofiqlik, moslik, yozishmalar, xat-xabarlar
correspondent (n) => muxbir, xat yozishib turuvchi kishi
correspond (v) => mos kelmoq, bir-biriga to‘g‘ri kelmoq, yozishib turmoq
corresponding (adj) => mos keladigan, tegishli, muvofiq
correspondent (adj) => mos keladigan, muvofiq
correspondingly (adv) => shunga mos ravishda, tegishli ravishda

copy (n) => nusxa, ko'chirma
copier (n) => nusxa ko'chiruvchi qurilma, nusxa ko'chirgich, taqlidchi
copyist (n) => ko'chirmakor, qo'lyozma ko'chiruvchi
copyright (n) => mualliflik huquqi
copy (v) => nusxa ko'chirmoq, ko'chirmoq, aynan takrorlamoq, taqlid qilmoq
copyable (adj) => nusxa ko'chirish mumkin bo'lgan
copyrighted (adj) => mualliflik huquqi bilan himoyalangan

tier (n) => daraja, pog'ona, bosqich, qatlam, toifa
tiering (n) => darajalarga ajratish, toifalarga bo'lish, pog'onalarga bo'lish
tier (v) => darajalarga ajratmoq, pog'onalarga bo'lmoq, toifalarga ajratmoq
tiered (adj) => darajalarga bo'lingan, pog'onali, bosqichma-bosqich tashkil qilingan

register (v) => ro'yxatdan o'tmoq, ro'yxatdan o'tkazmoq
registration (n) => ro'yxatdan o'tish, ro'yxatga olish
registered (adj) => ro'yxatdan o'tgan, qayd etilgan
registrar (n) => ro'yxatga oluvchi, registrator

deploy (v) => joylashtirmoq, ishga tushirmoq
deployment (n) => joylashtirish, ishga tushirish, deploy qilish
deployed (adj) => joylashtirilgan, ishga tushirilgan
deployable (adj) => joylashtirish mumkin bo'lgan, ishga tushirishga tayyor, foydalanishga chiqarish mumkin bo'lgan

departure (n) => jo'nab ketish, ketish, chiqib ketish
depart (v) => jo'nab ketmoq, ketmoq, tark etmoq
departed (adj) => ketgan, jo'nab ketgan, vafot etgan
departable (adj) => tark etish mumkin bo'lgan

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

hugeness (n) => ulkanlik, juda kattalik
huge-scale (n) => ulkan ko'lam
huge (adj) => juda katta, ulkan, nihoyatda katta
huge-scale (adj) => juda katta ko'lamdagi, ulkan miqyosdagi
huge-hearted (adj) => juda saxiy, ko'ngli keng
huge-minded (adj) => fikrlashi keng, katta miqyosda o'ylaydigan
hugely (adv) => juda katta darajada, nihoyatda

list (n) => ro'yxat
listing (n) => ro'yxatga kiritish
lister (n) => ro'yxat tuzuvchi yoki ro'yxatga kirituvchi
list (v) => ro'yxatga kiritmoq, sanab o'tmoq
listed (adj) => ro'yxatga kiritilgan, sanab o'tilgan, ro'yxatda keltirilgan

acquaintance (n) => tanish odam, tanish-bilishlik, tanish bo'lish, bilish
unacquaintedness (n) => tanish bo'lmaslik, bilmaslik
acquaint (v) => tanishtirmoq, tanishib chiqmoq
unacquainted (adj) => tanish bo'lmagan, bilmaydigan
acquainted (adj) => tanish, tanish bo'lgan

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

upload (n) => yuklash, yuklangan narsa (fayl, video)
uploading (n) => yuklash jarayoni
uploader (n) => yuklovchi shaxs
upload (v) => yuklamoq (kompyuteringdan internet yoki serverga yuborish)
uploaded (adj) => yuklangan
uploadable (adj) => yuklash mumkin bo'lgan

newness (n) => yangilik, yangilik darajasi, yanilik holati
newbie (n) => yangi boshlovchi, biror sohaga endigina kirgan odam 
newness (n) => yangilik, yangilik xususiyati
new (adj) => yangi, yaqinda paydo bo'lgan, ilgari bo'lmagan
newly (adv) => yaqinda, yangi tarzda

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

manual (n) => qo'llanma, yo'riqnoma, mexanik uzatmali mashina
manipulation (n) => qo'lda boshqarish, o'z maqsadiga ishlatish, aldab yo'naltirish
manufacturer (n) => ishlab chiqaruvchi
manuscript (n) => qo'lyozma
manipulte (v) => qo'l bilan boshqarmoq, ustalik bilan o'z maqsadiga ishlatmoq, aldab yo'naltirmoq
manufacture (v) => ishlab chiqarmoq
manual (adj) => qo'lda bajariladigan, mexanik, qo'l mehnatiga oid
manipulative (adj) => boshqalarni o'z maqsadiga ishlatadigan
semi-manual (adj) => yarim qo'lda ishlaydigan
manually (adv) => qo'lda, avtomatik emas, qo'l bilan

slightly (adv) => biroz, ozgina, salgina
slight (adj) => ozgina, kichik, arzimas
slightness (n) => kichiklik, arzimaslik

similar (adj) => o'xshash
similarly (adv) => xuddi shunday tarzda, o'xshash ravishda
similarity (n) => o'xshashlik
dissimilar (adj) => o'xshamaydigan, farqli
dissimilarity (n) => o'xshamaslik, farqlilik

temporariness (n) => vaqtinchaliklik
temporary (adj) => vaqtinchalik, muvaqqat
temporarily (adv) => vaqtincha, muvaqqat ravishda

temporization / temporisation (n) => masalani cho'zish, qarorni kechiktirish, vaqt yutish
temporize / temporise (v) => masalani ataylab cho'zmoq, qarorni kechiktirmoq, vaqt yutishga urinmoq
temporizing / temporising (adj) => vaqt yutishga qaratilgan, masalani cho'zuvchi

permanent (adj) => doimiy, abadiy, o'zgarmas, uzoq muddatli
permanently (adv) => doimiy ravishda, abadiy, butunlay
permanence (n) => doimiylik, barqarorlik, o'zgarmaslik
permanentize (v) => doimiy qilmoq, doimiy holatga keltirmoq

embed (v) => ichiga joylashtirmoq
embedded (adj) => ichiga joylashtirilgan, o'rnatilgan
embedding (n) => joylashtirish
embeddable (adj) => ichiga joylashtirish mumkin bo'lgan
embedment (n) => joylashtirish

ignorance (n) => bilmaslik, bexabarlik
ignore (v) => e'tibor bermaslik, mensimaslik, pisand qilmaslik
ignored (adj) => e'tiborsiz qoldirilgan
ignorant (adj) => bexabar, bilmaydigan
ignorantly (adv) => bexabar holda

standard (n) => me'yor, talab darajasi
standardization / standardisation (n) => standartlashtirish, bir xil me'yorga keltirish
substandard (n) => talabdan past darajadagi narsa
standardize / standardise (v) => standartlashtirmoq, bir xil me'yorga keltirmoq
standard (adj) => me'yoriy, belgilangan talabga mos, odatiy
standardized / standardised (adj) => standartlashtirilgan, bir xil me'yor asosida tayyorlangan
standardizable (adj) => bir xil me'yorga keltirish mumkin bo'lgan
substandard (adj) => belgilangan talabdan past, sifati talabga javob bermaydigan

help (n) => yordam
help (v) => yordam bermoq
helpful (adj) => foydali, yordam beradigan
helpfully (adv) => foydali tarzda
helpfulness (n) => foydalilik, yordam beruvchanlik
helpless (adj) => ojiz, yordamga muhtoj
helplessly (adv) => ojiz tarzda
helplessness (n) => ojizlik
unhelpful (adj) => foydasiz, yordam bermaydigan

content (n) => mazmun, tarkib, kontent
content-related (adj) => kontentga oid

conversion (n) => o'zgartirsh, konvertatsiya, aylanish, o'tish
converter (n) => o'zgartirgich, konvertor
convert (n) => yangi e'tiqodga o'tgan kishi
convertibility (n) => almashtirish mumkinligi
convertible (n) => usti ochiladigan mashina
convert (v) => o'zgartirmoq, aylantirmoq
reconvert (v) => qayta o'zgartirmoq, qayta aylantirmoq
converted (adj) => o'zgartirilgan, aylantirilgan
convertible (adj) => o'zgartirish mumkin bo'lgan, almashtiriladigan
inconvertible (adj) => o'zgartirib bo'lmaydigan, almashtirib bo'lmaydigan

comparison (n) => taqqoslash, solishtirish
comparator (n) => taqqoslagich, taqqoslovchi vosita yoki qurilma
comparative (n) => qiyosiy daraja, qiyosiy shakl
comparability (n) => taqqoslash mumkinligi, o'zaro taqqoslanish darajasi
incomparability (n) => qiyoslab bo'lmaslik, tengsizlig
compare (v) => taqqoslamoq, solishtirmoq
comparative (adj) => taqqoslovchi, qiyosiy
comparable (adj) => taqqoslash mumkin bo'lgan, o'xshash, teng keladigan
incomparable (adj) => tengsiz, qiyoslab bo'lmaydigan
compared (adj) => taqqoslangan
comparing (adj) => taqqoslayotgan
comparatively (adv) => nisbatan, qiyoslanganda
comparably (adv) => taqqoslanadigan tarzda, o'xshash darajada
incomparably (adv) => tengsiz darajada, qiyoslab bo'lmaydigan darajada
 
commonality (n) => umumiylik, umumiy xususiyat, o'xshashlik
commonness (n) => keng tarqalganlik, ko'p uchrashlik, odatiylik
uncommonness (n) => kam uchrashlik, noodatiylik
commoner (n) => oddiy xalq vakili, oddiy odam
common (adj) => keng tarqalgan, ko'p uchraydigan, odatiy, umumiy
uncommon (adj) => kam uchraydigan, noodatiy
commonplace (adj) => oddiy, odatiy, ajablanarli bo'lmagan
commonly (adv) => keng tarqalganlik, ko'p uchrashlik, odatiylik
uncommonly (adv) => g'ayrioddiy darajada, odatdagidan ko'ra ko'proq

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
assortment (n) => turli xil narsalar to'plami, assortiment
assortative (adj) => guruhlashga yoki turlarga ajratishga oid
assorter (n) => turlarga ajratuvchi, guruhlovchi
assortatively (adv) => guruhlash tarzida

fragment (n) => parcha 
fragment (v) => bo'laklarga bo'lmoq
fragmented (adj) => bo'laklangan, parchalangan
fragmentation (n) => parchalanish, bo'laklarga ajralish
fragmentary (adj) => parcha-parcha, to'liq bo'lmagan
fragmentarily (adv) => parcha-parcha tarzda

propose (v) => taklif qilmoq
proposal (n) => taklif, taklifnoma, reja yoki taklif hujjati
proposed (adj) => taklif qilingan
proposer (n) => taklif qiluvchi
proposition (n) => taklif, fikr-mulohaza
propositional (adj) => taklifga oid

grade (n) => baho, sinf, daraja, sifat darajasi
grade (v) => baholamoq, saralamoq, darajalarga ajratmoq
grader (n) => tekshiruvchi, baholovchi
grading (n) => baholash, saralash
degradation (n) => tanazzul, yomonlashuv, xo'rlash
gradation (n) => bosqichma-bosqich o'tish, daraja
upgrade (v) => yangilamoq, yaxshilamoq
downgrade (v) => darajasini tushirmoq
degrade (v) => xor qilmoq, sifatini buzmoq
graded (adj) => darajalarga bo'lingan, baholangan
degrading (adj) => xo'rlovchi, sha'nga tegadigan

approach (n) => yondashuv, usul, yo'l, yaqinlashish
approachability (n) => ochiqlik, murojaat qilish osonligi
approach (v) => yaqinlashmoq, yaqin kelmoq, murojaat qilmoq
approachable (adj) => yaqinlashish mumkin bo'lgan, muomila qilish oson bo'lgan, murojaat qilish oson bo'lgan
unapproachable (adj) => murojaat qilish qiyin, yaqinlashish qiyin
approaching (adj) => yaqinlashayotgan, yaqinlashib kelayotgan

harm (n) => zarar, ziyon, shikast
harmfulness (n) => zararlilik
harmlessness (n) => zararsizlik
harm (v) => zarar yetkazmoq, ziyon yetkazmoq, shikastlamoq
harmful (adj) => zararli, ziyonli
harmless (adj) => zararsiz, ziyon keltirmaydigan
harmfully (adv) => zararli tarzda
harmlessly (adv) => zararsiz tarzda

synthesis (n) => sintez, birlashtirish
synthesizer (n) => sintez qiluvchi qurilma yoki dastur
synthetic (n) => suniy mato yoki modda
synthesist (n) => sintez qiluvchi kishi
synthesize / sintesise (v) => sintez qilmoq, birlashtirmoq, suniy yo'l bilan hosil qimoq
synthetic (adj) => sun'iy, sintetik, sintez yo'li bilan hosil qilingan
synthetically (adv) => suniy yo'l bilan, sintetik tarzda

mind (n) => aql, ong, fikr, xayol, fikrlash qobiliyati
mindfulness (n) => ongli ravishda e'tiborli bo'lish, hushyorlik
mindedness (n) => fikrlash tarzi, qarash
absent-mindedness (n) => parishonxotirlik
narrow-mindedness (n) => tor fikrlilik
open-mindedness (n) => keng fikrlilik
single-mindedness (n) => bir maqsadga qat'iy yo'naltirilganlik
mind (v) => qarshi bo'lmoq, e'tibor bermoq, ehtiyot bo'lmoq
minded (adj) => ... fikrli / ...ga moyil
mindful (adj) => e'tiborli, hushyor, ongli ravishda e'tibor beradigan
mindless (adj) => o'ylamasdan qilinadigan, ma'nosiz, aqlsiz
absent-minded (adj) => parishonxotir, xayoli boshqa joyda
narrow-minded (adj) => tor fikrli
open-minded (adj) => keng fikrli, ochiq fikrli
single-minded (adj) => bir maqsadga qat'iy yo'naltirilgan
mindfully (adv) => e'tibor bilan, ongli ravishda
minlessly (adv) => o'ylamasdan, beparvolik bilan
absent-mindedly (adv) => parishonxotirlik bilan

mentality (n) => mentalitet, fikrlash tarzi, dunyoqarash
mentailization (n) => ruhiy holatni anglash
mentalist (n) => mentalist, inson fikrini o'qiy olishni namoyish qiluvchi ijrochi
mentalize (v) => biror kishining ruhiy holatini anglamoq
mental (adj) => aqliy, ruhiy, ongga oid
mentally (adv) => aqliy jihatdan, ruhiy jihatdan

flexibility (n) => egiluvchanlik, moslashuvchanlik
inflexibility (n) => moslashuvchan emaslik, qat'iylik
flex (n) => bukilish, mushakni taranglashtirish, o'zini ko'rsatish, maqtanish
flex (v) => bukmoq, egmoq, mushakni taranglashtirmoq, o'zini ko'rsatmoq, maqtanmoq
flexible (adj) => egiluvchan, moslashuvchan
inflexible (adj) => egilmaydigan, moslashuvchan emas, qattiqqo'l
flexibly (adv) => moslashuvchan tarzda

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

below (adj) => quyidagi, pastdagi
below (n) => pastki qism, quyida keltirilgan narsa
below (adv) => pastda, quyida

negation (n) => inkor qilish, rad etish, inkor shakli
negativity (n) => salbiylik, salbiy munosabat
negator (n) => inkor qiluvchi, biror fikrni rad etuvchi shaxs yoki narsa
negate (v) => inkor qilmoq, rad etmoq, kuchini yoki ta'sirini yo'qqa chiqarmoq
negative (adj) => salbiy, inkor qiluvchi, manfiy
negatory (adj) => inkor qiluvchi, rad etishga oid
negatable (adj) => inkor qilish yoki yo'qqa chiqarish mumkin bo'lga
nonnegative (adj) => manfiy bo'lmagan, nol yoki undan katta
negatively (adv) => salbiy tarzda, inkor tarzida

impact (n) => ta'sir
impact (v) => ta'sir qilmoq
impacted (adj) => ta'sirlangan
impactful (adj) => ta'sirli, katta ta'sirga ega
impactfully (adv) => ta'sirli tarzda

affect (n) => hissiy holat, hissiy ifoda
affect (v) => ta'sir qilmoq
affected (adj) => ta'sirlangan, ta'sir ko'rgan, suniy, yasama
affecting (adj) => ta'sirli, hayajonga soladigan, kuchli his-tuyg'u uyg'otadigan
affective (adj) => hissiyotga oid, hissiy
affection (n) => mehr, mehr-muhabbat, iliq-tuyg'u
affectionate (adj) => mehribon, mehr ko'rsatuvchi
affectation (n) => suniy xatti-harakat, o'zini ataylab boshqacha ko'rsatish

stick (n) => tayoq
stick (v) => yopishmoq, tiqmoq
stuck (adj) => tiqilib qolgan, yopishgan
sticking (adj) => yopishayotgan
sticky (adj) => yopishqoq
stickiness (n) => yopishqoqlik

minification (n) => kodni ixchamlashtirish, hajmini kichraytirish
minifier (n) => kodni ixchamlashtiruvchi dastur yoki vosita
minify (v) => hajmini kichraytirmoq, kodni ixchamlashtirmoq
minifed (adj) => ixchamlashtirilgan, hajmi kichraytirilgan
minifiable (adj) => ixchamlashtirish mumkin bo'lgan

minimization (n) => kamaytirish, minimumga tushirish, minimallashtirish
minimizer (n) => kamaytiruvchi, minimumga tushiruvchi vosita yoki shaxs
minimalist (n) => soddalik tarafdori, minimalist
minimize (v) => kamaytirmoq, imkon qadar qisqartirmoq, minimumga tushirmoq
minimal (adj) => minimal, eng kam, minimum darajadagi
minimally (adv) => minimal darajada, juda oz miqdorda
minimalistic (adj) => minimalist uslubdagi, juda sodda

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

most (n) => eng katta qism, ko'p qismi
more (adj) => qo'shimcha, ko'proq
most (adj) => eng ko'p, eng katta miqdordagi
much (adv) => juda, ancha
more (adv) => ko'proq
most (adv) => eng, juda, nihoyatda
mostly (adv) => asosan, ko'pincha, katta qismi

absorb (v) => shimmoq, o'zlashtirmoq
absorption (n) => shimish, o'zlashtirish
absorbed (adj) => singdirilgan, shimdirilgan, berilib ketgan, o'yga cho'mgan
absorbent (adj) => shimuvchi
absorptive (adj) => shimishga yoki o'zlashtirishga oid, shimuvchi xususiyatga ega (ilmiy so'z)
absorbent (n) => shimuvchi material
absorbingly (adv) => o'ziga tortadigan tarzda
absorpivity (n) => yutish qobiliyati, shimuvchanlik

squeeze (n) => siqish, qisish, siqib chiqarish
squeezer (n) => siqadigan asbob, siquvchi odam
squeeze (v) => siqmoq, qisib qo'ymoq, siqib chiqarmoq
squeezable (adj) => siqish mumkin bo'lgan
squeezed (adj) => siqilgan, zo'rg'a joylashgan

trace (n) => iz
trace (v) => izini kuzatmoq
traced (adj) => kuzatilgan, aniqlangan
tracing (n) => kuzatish, izini aniqlash
traceable (adj) => izini topish yoki kuzatish mumkin bo'lgan
traceability (n) => kuzatuvchanlik, izini aniqlash imkoniyati

panic (n) => vahima, sarosima
panic (v) => vahimaga tushmoq
panicked (adj) => vahimaga tushgan
panicky (adj) => vahimali, vahimaga moyil
panickedly (adv) => vahima bilan

volume (n) => hajm, ovoz balandligi, miqdor, jild
voluminousness (n) => katta hajmlilik
volumetry (n) => hajm o'lchash
volumize (v) => hajm bermoq, to'lalashtirmoq
voluminous (adj) => katta hajmli, juda ko‘p
voluminously (adv) => katta hajmda

surround (v) => o'rab olmoq, atrofini o'ramoq, qurshab olmoq
surrounding (adj) => atrofdagi
surrounding (n) => atrof-muhit
surrounded (adj) => o'ralgan

entry (n) => kirish, kirish joyi, ishtirok uchun topshirilgan narsa
entrant (n) => ishtirokchi, kiruvchi
entrance (n) => kirish, kirish joyi, kirish eshigi
enter (v) => kirmoq, ichkariga kiritmoq, tanlovda qatnashmoq, ma'lumot kiritmoq
enterable (adj) => kirish mumkin bo'lgan

meaning (n) => ma'no, mazmun, maqsad
mean (n) => o'rtacha qiymat (matematikada)
means (n) => vosita, usul, yo'l, boylik, mablag'
meaningfulness (n) => mazmunlilik
mean (v) => anglatmoq, ma'no bildirmoq, nazarda tutmoq, niyat qilmoq, olib kelmoq
meaningful (adj) => mazmunli, ma'noli, ahamiyatli
meaningless (adj) => ma'nosiz, ahamiyatsiz
meant (adj) => mo'ljallangan, nazarda tutilgan
well-meaning (adj) => yaxshi niyatli
meaingfully (adv) => mazmunli tarzda, ma'noli qilib
meaninglessly (adv) => ma'nosiz tarzda

outlying (adj) => chetki, boshqalardan uzoq, asosiy guruhdan tashqaridagi
outlier (n) => cheklanma qiymat, boshqalardan farq qiluvchi narsa

deviate (v) => chetga chiqmoq
deviation (n) => chetlanish, og'ish
deviant (n) => chetga chiquvchi
deviant (adj) => me'yordan chetga chiqqan
deviating (adj) => me'yordan chetga chiqayotgan
deviated (adj) => chetlangan
deviational (adj) => chetlanishga oid

behave (v) => o'zini tutmoq, xatti-harakat qilmoq
behavior (n) => xulq-atvor, o'zini tutish
behavioral (adj) => xulq-atvorga oid, xatti-harakatga oid
behaviorally (adv) => xulq-atvor jihatidan, xatti-harakat nuqtayi nazaridan
misbehavior (n) => noto'g'ri xulq-atvor, yomon xatti-harakat
misbehave (v) => o'zini yomon yoki noto'g'ri tutmoq
misbehaving (adj) => noto'g'ri xatt-harakat qilayotgan

post (n) => post
post (v) => joylamoq
posted (adj) => joylangan
posting (n) => post joylash

intervene (v) => aralashmoq
intervention (n) => aralashuv
intervening (adj) => oradagi, aralashuvchi
intervenor (n) => aralashuvchi tomon

confusion (n) => chalkashlik, adashish, tushunmovchilik
confusingness (n) => chalkashtiruvchanlik, chalkashlik xususiyati
confusability (n) => chalkashtirish mumkinligi, adashish ehtimoli
confusedness (n) => chalkashlik holati
confuse (v) => chalkashtirmoq, adashtirmoq
confused (adj) => chalkashgan, adashgan, boshi qotgan
confusing (adj) => chalkashtiradigan, tushunarsiz
confusingly (adv) => chalkashtiradigan tarzda, tushunarsiz tarzda
confusedly (adv) => chalkashgan holda, tushunmay

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

generic (n) => markasiz mahsulot
genericness (n) => umumiylik, o'ziga xoslikning yo'qligi
generic (adj) => umumiy, umumiy turga oid, markasiz, brendsiz, o'ziga xosligi yo'q
non-generic (adj) => umumiy bo'lmagan, o'ziga xos
generically (adv) => umumiy tarzda, umumiy nom bilan

automation (n) => avtomatlashtirish
automate (v) => avtomatlashtirmoq
automatize (v) => avtomatlashtirmoq
automatization (n) => avtomatlashtirish
automatic (adj) => avtomatik
automatable (adj) => avtomatlashtirish mumkin bo'lgan
automated (adj) => avtomatlashtirilgan
automatically (adv) => avtomatik ravishda

ascension (n) => ko'tarilish, yuqoriga chiqish
ascendant (n) => ustunlikka ega shaxs yoki tomon
ascend (v) => ko'tarilmoq, yuqoriga chiqmoq
ascending (adj) => o'sib boruvchi, yuqorilab boruvchi
ascendant (adj) => ustunlikka erishayotgan, kuchayib borayotgan
ascendable (adj) => ko'tarilish mumkin bo'lgan

descent (n) => tushib, pastga tushish, pasayish
descend (v) => pastga tushmoq, pastga tushib bormoq, pasaymoq
descending (adj) => kamayib borayotgan, pasayuvchi, pastga tushayotgan

obtainability (n) => qo'lga kiriitsh mumkinligi
obtainer (n) => biror narsani qo'lga kiritiuvchi shaxs
obtaining (n) => qo'lga kiriitsh, olish jarayaoni
obtain (v) => qo'lga kiritmoq, ega bo'lmoq, olmoq
obtainable (adj) => qo'lga kiritish mumkin bo'lgan, olish mumkin bo'lgan
obtained (adj) => olingan, qo'lga kiritilgan

digit (n) => raqam, barmoq
digitization / digitisation (n) => raqamli shaklga o'tkazish (hujjat, rasm, ovozni)
digitalization / digitalisation (n) => raqamlashtirish (tizim, biznesni)
digitize / digitise (v) => raqamlashtirmoq, raqamli shaklga o'tkazmoq
digitalize / digitalise (v) => raqamli texnalogiyalarni joriy qilmoq, raqamlashtirmoq
digital (adj) => raqamli
digitized (adj) => raqamli shaklga o'tkazilgan
digitalized (adj) => raqamlashtirilgan, raqamli shaklga o'tkazilgan
digitally (adv) => raqamli tarzda

hint (n) => ishora, maslahat, kichik yordamchi ma'lumot, yo'l-yo'riq, belgi
hint (v) => ishora qilmoq, shama qilmoq

separator (n) => ajratgich, bo‘luvchi belgi, ajratuvchi
separation (n) => ajratish, ajralish
separately (adv) => alohida ravishda
separate (adj) => alohida

beware (v) => ehtiyot bo'lmoq, ogoh bo'lmoq, hushyor bo'lmoq

automagic (adj) => o'z-o'zidan avtomatik ishlaydigan, go'yo hech qanday aralashuvsiz
automagical (adj) => go'yo sehrli tarzda o'zi ishlaydigan
automagically (adv) => avtomatik tarzda, go'yoki o'z-o'zidan, sehrli tarzda

rewrite (v) => qayta yozmoq

rebuild (v) => qayta qurmoq

restart (v) => qayta ishga tushirmoq

reload (v) => qayta yuklamoq

download (n) => yuklab olish, yuklab olingan fayl
downloader (n) => yuklab oluvchi, yuklab olish dasturi
download (v) => yuklab olmoq, internetdan yoki serverdan qurilmaga olmoq
downloadable (adj) => yuklab olish mumkin bo'lgan
downloaded (adj) => yuklab olingan

deadline (n) => oxirgi muddat, topshirish muddati, belgilangan oxirgi vaqt

count (n) => sanash, hisob, umumiy son, graf (unvon)
counter (n) => hisoblagich, peshtaxta, sanoq belgisi, hisoblovchi
counting (n) => sanash, hisoblash jarayoni
countdown (n) => teskari sanoq
recount (n) => qayta sanash
miscount (n) => noto'g'ri hisob
discount (n) => chegirma
count (v) => sanamoq, hisoblamoq, hisobga olmoq, ahamiyatga ega bo'lmoq
recount (v) => qayta sanamoq, hikoya qilib bermoq
miscount (v) => noto'g'ri sanamoq
discount (v) => chegirma bermoq, kamaytirib ko'rmoq, e'tiborsiz qoldirmoq
countable (adj) => sanaladigan
uncountable (adj) => sanalmaydigan
countless (adj) => son-sanoqsiz, behisob

accord (n) => kelishuv, bitim, muvofiqlik, uyg'unlik
accord (v) => mos kelmoq, muvofiq bo‘lmoq, taqdim etmoq
accordant (adj) => mos keladigan, muvofiq, uyg'un
accordingly (adv) => shunga ko‘ra, shunga muvofiq, shunga qarab, shunga mos ravishda

accept (v) => qabul qilmoq, rozi bo'lmoq, tan olmoq
acceptance (n) => qabul qilish, rozilik
acceptable (adj) => ma'qul, qabul qilsa bo'ladigan
acceptably (adv) => maqul tarzda
unacceptable (adj) => maqbul emas, qabul qilib bo'lmaydigan
unacceptably (adv) => maqbul bo'lmagan tarzda
acceptability (n) => maqbullik, qabul qilsa bo'lish darajasi
unacceptability (n) => nomaqbullik, qabul qilib bo'lmaslik
acceptant (n) => qabul qiluvchi

so-so => o‘rtacha, unchalik yaxshi emas, na yaxshi na yomon


excellence (n) => a'lo daraja, mukammallik, yuksak sifat
excel (v) => a'lo darajada bo'lmoq, ustun bo'lmoq, ajralib turmoq
excellent (adj) => a'lo, juda yaxshi
excellently (adv) => a'lo darajada, juda yaxshi

Googling (n) => Google’dan qidirish
ChatGPTing (n) => ChatGPT’dan foydalanish

compression (n) => siqish, siqilish, zichlashtirish
compressor (n) => kompressor, siquvchi qurilma
compress (v) => siqmoq, zichlashtirmoq, hajmini kamaytirmoq
compressed (adj) => siqilgan, zichlashtirilgan
compressible (adj) => siqish mumkin bo'lgan, siqiluvchan
compressibility (n) => siqiluvchanlik, siqilish xususiyati
compressively (adv) => siquvchi tarzda

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

rest (v) => dam olmoq
rested (adj) => dam olgan, tetik
resting (adj) => dam olayotgan
restful (adj) => dam beruvchi, osoyishta
restfully (adv) => osoyishta tarzda
restlessness (n) => bezovtalik, tinimsizlik
restless (adj) => bezovta, tinimsiz

concept (n) => tushuncha, g'oya, konsepsiya
conceptualization (n) => tushuncha sifatida shakllantirish, konsepsiyalash
conceptualize (v) => tushuncha sifatida shakllantirmoq, konsepsiyalashtirmoq
conceptual (adj) => tushunchaga oid, konseptual, nazariy
conceptualized (adj) => tushuncha sifatida shakllantirilgan, konseptualizatsiya qilingan
conceptually (adv) => tushuncha jihatidan, konseptual jihatdan, nazariy jihatdan

state (n) => holat, ahvol, davlat, shtat
statement (n) => bayonot, bayon, bildirish, fikr
statehood (n) => davlat maqomi, mustaqil davlat bo'lish holati
statesman (n) => davlat arbobi
statelessnes (n) => fuqarosizlik, hech bir davlatga mansub bo'lmaslik
state (v) => bayon qimoq, ma'lumo qilmoq, aytmoq
state (adj) => davlatga oid, davlat tomonidan boshqariladigan
stated (adj) => aytilgan, bayon qilingan, ko'rsatilgan
unstated (adj) => aytilmagan, ochiq bayon qilinmagan
stately (adj) => salobatli, viqorli, dabdabali
stateless (adj) => fuqaroligi bo'lmagan, hech bir davlatga mansub bo'lmagan
stately (adv) => salobat bilan, viqor bilan

strict (adj) => qat'iy, qattiq, talabchan, aniq rioya qilinadigan
strictly (adv) => qat'iy ravishda 
strictness (n) => qat'iylik

encounter (n) => duch kelish, to'qnash kelish, kutilmagan uchrashuv
encounter (v) => duch kelmoq, to'qnash kelmoq, boshdan kechirmoq

positivity (n) => ijobiylik
positively (adv) => ijobiy tarzda, ijobiy ravishda, qat'iy ravishda
positive (adj) => ijobiy, musbat

rainforcement (n) => mustahkamlash, kuchaytirish
rainforced (adj) => mustahkamlangan, kuchaytirilgan, yanada tasdiqlangan
rainforce (v) => mustahkamlamoq, kuchaytirmoq, yanada tasdiqlamoq

feed (n) => yangiliklar lentasi, ma'lumotlar oqimi
feed (v) => ovqat bermoq, oziqlantirmoq, ma'lumot bermoq, ma'lumot uzatmoq, ma'lumot kiritmoq
feeder (n) => oziqlantiruvchi, ozuqa beruvchi qurilma

agent (n) => vakil, agent, topshiriqni bajaruvchi
agency (n) => agentlik, mustaqil harakat qilish va qaror qabul qilish qobiliyati
agentic (adj) => mustaqil harakat qiluvchi, o'z harkaatini boshqaruvchi
agentive (adj) => agentga yoki harakatni bajaruvchiga oid
agent-based (adj) => agentga asoslangan

realize (v) => anglamoq, tushunib yetmoq, fahmlamoq
realization (n) => anglash, tushunib yetish, amalga oshirish
realizable / realisable  (adj) => amalga oshirish mumkin bo'lgan
reality (n) => hqiqiat, realitik
really (adv) => haqiqatdan, juda
real (adj) => haqiqiy, real
really (adv) => haqiqatdan, rostdan ham, juda
really => unchalik / haqiqatan ham kabi

worry (n) => xavotir, tashvish, tashvish manbai
worry (v) => xavotir olmoq, tashvishlanmoq, tashvishga solmoq
worried (adj) => xavotirlangan, tashvishlangan
worrisome (adj) => tashvish uyg'otadigan
worryingly (adv) => tashvish uyg'otadigan darajada
worriedby (adv) => xavotir bilan, tashvishlanib

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

motivation (n) => motivatsiya, turtki, undovchi sabab
motivator (n) => motivatsiya beruvchi shaxs yoki omil
motivate (v) => biror ishga undamoq, motivatsiya bermoq, ruhlantirmoq
motivated (adj) => rag'batlangan, motivatsiyalangan, biror ish qilishga undalgan
motivating (adj) => motivatsiya beruvchi, ruhlantiruvchi (biror narsa amalda sizga motivatsiya beradi)
motivational (adj) => motivatsiyaga oid, ruhlantiruvchi ()

whatever => nima bo'lsa ham, istalgan narsa
whenever => qachon bo'lsa ham, har safar
whichever => qaysi biri bo'lsa ham
whoever => kim bo'lsa ham, har kim
whomever => kimni bo'lsa ham
wherever => qayerda yoki qayerga bo'lsa ham
however => qanday bo'lsa ham
whosever => kimniki bo'lsa ham

await (v) => kutib turmoq, kutmoq, kutilmoq
awaiting (adj) => kutilayotgan, kutib turgan
awaited (adj) => kutilgan
awaitable (adj) => kutish mumkin bo'lgan

logic (n) => mantiq
logical (adj) => mantiqiy, mantiqqa asoslangan, izchil
logically (adv) => mantiqan, mantiqiy ravishda
illogical (adj) => mantiqsiz
illogically (adv) => mantiqsiz ravishda

circus (n) => sirk, sirk tomoshasi, shov-shuvli yoki tartibsiz vaziyat
circus (n) => shov-shuvli, tartibsiz, kulgili/absurd holat
circus-like (adj) => sirkka o'xshash, tartibsiz, sirkdagidek, shov-shuvli
circusgoer (n) => sirk tomoshabini, sirkka boruvchi

term (n) => atama, termin, muddat, davr, shart
term (v) => nomlamoq, atamoq, deb atamoq

checksum (n) => nazorat summasi, tekshiruv yig'indisi
checksum (v) => nazorat summasini hisoblamoq
checsummed (adj) => nazorat summasi hisoblangan
checksumming (n) => nazorat summasini hisoblash

process (n) => jarayon, protses
process (v) => qayta ishlamoq, qayta ishlov bermoq
processing (n) => qayta ishlash
processed (adj) => qayta ishlangan
processor (n) => protsessor, qayta ishlovchi
processable (adj) => qayta ishlash mumkin bo'lgan

calculation (n) => hisoblash, hisob-kitob, hisoblangan natija
calculator (n) => kalkulyator, hisoblagich
calculate (v) => hisoblamoq, hisoblab chiqarmoq
calculated (adj) => hisoblangan, ataylab qilingan, puxta o'ylangan
calculable (adj) => hisoblash mumkin bo'lgan
calculably (adv) => hisoblab bo'ladigan tarzda, hisoblash mumkin bo'lgan tarzda
calculation-based (adj) => hisob-kitobga asoslangan

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

concatenation (n) => birlashtirish, ketma-ket ulash
concatenate (v) => birlashtirmoq, ketma-ket ulab qo‘ymoq, bir-biriga qo‘shmoq
concatenated (adj) => birlashtirilgan, ulangan, ketma-ket birlashtirilgan

effect (n) => ta'sir, natija, oqibat
effectiveness (n) => samaradorlik, natija berish darajasi
ineffectiveness (n) => samarasizlik, natija bermaslik
effective (adj) => samarali, natija beradigan, ta'sirli
ineffective (adj) => samarasiz, natija bermaydigan
effectively (adv) => samarali tarzda, amalda
ineffectively (adv) => samarasiz tarzda

efficiency (n) => samaradorlik, unumdorlik, tejamkorlik
ineffeciency (n) => samarasizlik, unumdorlikning pastligi, resurslardan samarasiz foydalanish
efficient (adj) => samarali, tejamkor, unumli
inefficient (adj) => samarasiz, tejamkor bo'lmagan, unumsiz
efficiently (adv) => samarali tarzda, unumli tarzda, tejamkorlik bilan
inefficiently (adv) => samarasiz tarzda, unumsiz tarzda, tejamkor bo'lmagan holda

treat (n) => yoqimli narsa, shirinlik, yoqimli narsa yoki voqea
treatment (n) => davolash, muolaja, munosabat, muomala
treat (v) => muomala qilmoq, davolamoq, munosabatda bo'lmoq, muomala qilmoq, biror narsani qandaydir tarzda ko'rmoq yoki qaramoq
treatable (adj) => davolash mumkin bo'lgan
untreatable (adj) => davolab bo'lmaydigan
treated (adj) => davolangan, muomala qilingan


bullshit (n) => bo‘lmag‘ur gaplar, safsata, uydirma, bema'ni gap
bullshitting (n) => safsata gapirish, bo'lmag'ur gapirish
bullshitter (n) => safsata qapiruvchi, bo'lmag'ur gapiruvchi
bullshit (v) => safsata gapirmoq, yolg'on gapirmoq, bo'lmag'ur gaplarni gapirmoq
bullshitty (adj) => safsataga o'xshagan, bema'ni, bo'lmag'ur

amplifier (n) => kuchaytirgich
amplification (n) => kuchaytirish, kuchaytirilish
amplify (v) => kuchaytirmoq, kuchaymoq
amplified (adj) => kuchaytirilgan
amplifiable (adj) => kuchaytirish mumkin bo'lgan

teaching (n) => o'qitish
teachability (n) => o'rgatiluvchanlik, o'rganuvchanlik
teacher (n) => o'qituvchi, ustoz
teach (v) => o'rgatmoq, ta'lim bermoq
teachable (adj) => o'rgatish mumkin bo'lgan, o'rganishga ochiq

composure (n) => vazminlik, xotirjamlik, o'zini tuta bilish
composer (n) => bastakor, musiqa asari yaratuvchisi
composition (n) => tuzilish, kompozitsiya, yozilgan asar, ijodiy asar
compopse (v) => tuzmoq, yaratmoq, yozmoq, tashkil qilmoq
composed (adj) => vazmin, xotirjam, o'zini bosgan
composed (adj) => tuzilgan, tashkil topgan
composedly (adv) => vazmin tarzda, xotirjam tarzda

debug (v) => xatolarni topib tuzatmoq
debugging (n) => xatolarni topish va tuzatish, debugging 
debugger (n) => xatolarni aniqlash vositasi yoki dasturi, debugger

tracking (v or n) => kuzatish, nazorat qilish, izini kuzatish
track (v) => kuzatmoq, izini tekshirmoq, nazorat qilmoq
track (n) => iz, yo'nalish
tracker (n) => kuzatuvchi, kuzatuv vositasi
trackable (adj) => kuzatish mumkin bo'lgan

static (n) => radio yoki aloqa shovqini, harakatsiz holat
statics (n) => statika
static (adj) => harakatsiz, o'zgarmaydigan, bir holatda turadigan
statically (adv) => harakatsiz tarzda, o'zgarmas holatda

statistic (n) => statistik ko'rsatkich, statistik raqam
statistics (n) => statistika, raqamli ma'lumotlarni yig'ish yoki tahlil qilish sohasi
statistician (n) => statistika bilan shug'lullanadigan, raqamli ma'lumotlarni tahlil qiladigan mutaxassis
statistically (adv) => statistik ma'lumotlar asosida, raqamli tahlil nuqtai nazaridan

actual (adj) => haqiqiy, amaldagi, real, aslida mavjud bo‘lgan
actually (adv) => aslida, haqiqatda, rostdan ham
actuality (n) => haqiqat, mavjudlik
actualize (v) => amalga oshirmoq, ro'yobga chiqarmoq
actualization (n) => amalga oshirish, ro'yobga chiqarish
actualized (adj) => amalga oshirilgan, ro'yobga chiqarilgan

fundamentals (n) => asoslar, asosiy qoidalar
fundamentality (n) => asosiylik
fundamental (adj) => asosiy, tub, muhim poydevor bo'lgan
fundamentally (adv) => mohiyatan, tub-tubidan, asosan

situation (n) => vaziyat, holat, sharoit

autocomplete (n) => avtomatik to‘ldirish
autocompletion (n) => avtomatik to'ldirish jarayoni
autocomplete (v) => avtomatik to‘ldirmoq
autocompleted (adj) => avtomatik to'ldirilgan

distinguish (v) => farqlamoq, ajratmoq, farqini aniqlamoq
distinction (n) => farq, ajratish, tafovut
distinct (adj) => alohida, aniq farqli
distinctive (adj) => o'ziga xos, ajralib turadigan
distinctly (adv) => aniq ravishda

vagueness (n) => noaniqlik, mavhumlik
vague (adj) => noaniq, mavhum, aniq belgilanmagan
vaguely (adv) => noaniq tarzda, mavhum tarzda, xira tarzda, taxminan

properly (adv) => to'g'ri, kerakli tarzda, munosib ravishda, yaxshilab
proper (adj) => to'g'ri, tegishli, mos, kerakli
properness (n) => muvofiqlik, to'g'rilik
improper (adj) => noto'g'ri, nomunosib
improperly (adv) => notog'ri tarzda

emergency (n) => favqulodda holat, shoshilinch vaziyat
emergency (adj) => favqulodda, shoshilinch

emerging (adj) => paydo bo'layotgan, yuzaga kelayotgan, rivojlanib kelayotgan
emerge (v) => paydo bo'lmoq, yuzaga chiqmoq, namoyon bo'lmoq, asta-sekin ko'rina boshlamoq
emergence (n) => paydo bo'lish, yuzaga kelish

seem (v) => tuyulmoq, ko'rinmoq
seemingly (adv) => go'yoki, ko'rinishidan, tashqaridan qaraganda
seeming (adj) => ko'rinadigan, tuyuladigan

blindness (n) => ko'rlik, ko'r-ko'rona munosabat
blindly (adv) => ko'r-ko'rona, o'ylanmasdan, tekshirmasdan
blind (adj) => ko'r, ko'zi ojiz, ko'r-ko'rona
blindfold (v) => ko'zini bog'lamoq
blindfold (n) => ko'zbog'lagich
blindfolded (adj) => ko'zi bog'langan
blindfolded (adv) => ko'zi bog'langan holda, ko'zlari bog'langan tarzda

dependence (n) => qaramlik, bog'liqlik, tayanish
independence (n) => mustaqillik
dependant (n) => qaramog'idagi shaxs
dependability (n) => ishonchlilik, suyanish mumkinlik
dependency (n) => bog'liqlik, qaramlik, dastury bog'liqlik
independency (n) => mustaqillik
depend (v) => bog'liq bo'lmoq, tayanmoq, suyanmoq
dependent (adj) => qaram, bo'gliq, tayanadigan
independent (adj) => mustaqil, bog'liq bo'lmagan
dependable (adj) => ishonchli, suyanish mumkin bo'lgan
dependably (adv) => ishonchli tarzda, suyanish mumkin bo'lgan tarzda
indepentently (adv) => mustaqil ravishda, boshqalarga tayanmasdan

rely (v) => tayanmoq, ishonmoq, suyanmoq, bog'liq bo'lmoq
reliable (adj) => ishonchli
reliably (adv) => ishonchli tarzda
reliability (n) => ishonchlilik
unreliable (adj) => ishonchsiz
unreliability (n) => ishonchsizlik

assignment (n) => topshiriq, vazifa, tayinlash, biriktirish
assignee (n) => topshiriq yoki huquq berilgan shaxs, biriktirilgan shaxs
assign (v) => topshirmoq, biriktirmoq, vazifa bermoq
assigned (adj) => tayanilgan, biriktirilgan, berilgan
assignable (adj) => topshiriq biriktirish mumkin bo'lgan

maintenance (n) => saqlash, parvarish, texnik xizmat, aliment (huquqda), ta'minot
maintainer (n) => saqlovchi, xizmat ko'rsatuvchi, loyihani qo'llab quvvatlovchi
maintainability (n) => xizmat ko'rsatish qulayligi, qo'llab-quvvatlash osonligi
maintain (v) => saqlab turmoq, davom ettirmoq, ta'mirlab yoki xizmat ko'rsatib turmoq, qat'iy takidlamoq
maintainable (adj) => saqlab turish mumkin bo'lgan, qo'llab-quvvatlash oson
maintained (adj) => parvarishlangan, saqlangan
unmaintained (adj) => parvarishsiz qolgan, qo'llab-quvvatlanmaydigan
well-maintained (adj) => yaxshi parvarishlangan
low-maintenance (adj) => parvarish talab qilmaydigan
high-maintenance (adj) => juda ko'p e'tibor va parvarish talab qiladigan

cost (n) => xarajat, narx, qiymat, zarar
costs (n) => xarajatlar, sarf-xarajatlar
costliness (n) => qimmatlik, qimmatga tushish
cost (v) => turmoq, narxi ... bo‘lmoq
recost (v) => narxini qayta hisoblamoq
costly (adj) => qimmatga tushadigan, qimmat
costless (adj) => bepul, xarajatsiz
cost-effective (adj) => tejamkor, xarajatga arziydigan
costly (adv) => qimmatga tushadigan tarzda
cost-effectively (adv) => tejamkor usulda, kam harajat bilan

add (v) => qo'shmoq
addition (n) => qo'shimcha
additional (adj) => qo'shimcha
additionally (adv) => qo'shimcha ravishda
additive (n) => qo'shiladigan modda, qo'shimcha modda
additive (adj) => qo'shiladigan, qo'shimcha sifatida qo'shiladigan
addend (n) => qo'shiluvchi son
addable (adj) => qo'shish mumkin bo'lgan

opportunity (n) => imkoniyat, qulay fursat
opportunistic (adj) => vaziyatdan yoki imkoniyatdan intilishga intiladigan

subtlety (n) => nozik jihat, nozik farq, nozik tushuncha
subtle (adj) => nozik, sezilishi qiyin, darhol bilinmaydigan
sublte (adj) => ayyor, mohirona
unsubtle (adj) => oshkora, dag'al, nozik emas
subtly (adv) => sezilmas tarzda, nozik tarzda

defect (n) => nuqson, kamchilik, buzilish
defection (n) => boshqa tomonga o'tish, safni o'zgartirish
defector (n) => boshqa tomon yoki safga o'tgan shaxs
defect (v) => boshqa tomon yoki qarama-qarshi tomonga o'tmoq, safni o'zgartirmoq
defective (adj) => nuqsonli, yaroqsiz, kamchiligi bor
defectively (adv) => nuqsonli tarzda

greatness (n) => buyuklik, ulug'lik, ajoyiblik
great (adj) => ajoyib, zo'r, juda yaxshi, buyuk, ulug'
greatly (adv) => juda, nihoyatda, katta darajada

overall (adj) => umumiy
overall (adv) => umuman olganda

meet (n) => sport musobaqasi
meeting (n) => uchrashuv, yig'ilish, majlis
meetup / meet-up (n) => norasmiy uchrashuv, bir guruh odamlarning uchrashuvi
meet-and-greet (n) => tanishuv uchrashuvi, muxlislar bilan uchrashuv
meetinghouse (n) => yig'ilish uyi, diniy jamoa yig'iladigan bino
meet (v) => uchrashmoq, tanishmoq

use (n) => foydalanish, foyda, naf
user (n) => foydalanuvchi
usage (n) => ishlatilishi, qo'llanilishi, qo'llanish tarzi
usefulness (n) => foydalilik
uselessness (n) => foydasizlik
reusability (n) => qayta foydalanish imkoniyati
use (v) => foydalanmoq
misuse (v) => noto'g'ri foydalanmoq, suiste'mol qilmoq
reuse (v) => qayta foydalanmoq, qayta ishlatmoq
useful (adj) => foydali, kerakli, nafli
useless (adj) => foydasiz
used (adj) => ishlatilgan, eskirgan
reusable (adj) => qayta ishlatish mumkin bo'lgan
usefully (adv) => foydali tarzda
uselessly (adv) => foydasiz tarzda

modification (n) => o'zgartirish, o'zgartirilgan variant
modifer (n) => o'zgartiruvchi
modifiability (n) => o'zgartirish mumkinligi
unmodifiability (n) => o'zgartirib bo'lmaslik
modify (v) => o'zgartirmoq, moslashtirmoq, tahrirlamoq
modified (adj) => o'zgartirilgan, moslashtirilgan
unmodified (adj) => o'zgartirilmagan, asl holidagi
modifiable (adj) => o'zgartirish mumkin bo'lgan
unmodifiable (adj) => o'zgartirib bo'lmaydigan

physically (adv) => jismonan, jismoniy jihatdan, amalda
physical (adj) => jismoniy, moddiy
physicality (n) => jismoniylik

fit (n) => moslik, jismoniy holat, forma, xuruj, tutqaon
fitness (n) => jismoniy chiniqqanlik, jismoniy tayyorgarlik
unfitness (n) => yaroqsizlik, mos emaslik, jismoniy tayyorgarlikning yetishmasligi
fit (v) => mos kelmoq, sig'moq, joylashtirmoq, o'rnatmoq
fit (adj) => mos, to'g'ri keladigan, sog'lom, baquvvat
fitting (adj) => yarashadigan, mos
fitted (adj) => moslashtirilgan, o'rnatilgan
unift (adj) => yaroqsiz, mos emas, jismonan tayyor emas

hire (v) => ishga olmoq, yollamoq
hiring (n) => ishga olish
hired (adj) => ishga olingan
hirer (n) => ishga yollovchi

criterion (n) => mezon, talab, baholash mezoni (plural: criteria)

analogy (n) => o'xshatish, qiyoshlash, analogiya, qiyos
analogize (v) => o'xshatib taqqoslmoq, qiyoslamoq
analogical (adj) => qiyoslashga asoslangan, analogiyaga oid
analogous (adj) => o'xshash, analogik, qiyoslanadigan, o'xshash xususiyatga ega
analogously (adv) => o'xshash tarzda, qiyosiz tarzda

report (n) => hisobot
report (v) => hisobot bermoq
reporting (v or n) => hisobot berish, xabar berish
reporter (n) => hisobot beruvchi, xabar beruvchi
reportedly (adv) => xabarlarga ko'ra

demonstrate (v) => ko'rsatmoq, namoyish qilmoq
demonstration (n) => namoyish, ko'rsatma
demonstrative (adj) => ko'rsatuvchi, namoyishkorona
demonstrably (adv) => yaqqol ravishda, isbotlanadigan tarzda

treadmill (n) => yugurish yo'lakchasi, yugurish trenajyori (texnika)

uphill (n) => tepaga ko'tarilish, nishab
hill (n) => tepalik, tepa
hilly (adj) => tepaliklarga boy, tepalik
uphill (adj) => tepaga ko'tariladigan, yuqoriga qarab ketadigan, mashaqqatli, qiyin
uphill (adv) => tepaga qarab, yuqoriga

condition (n) => holat, ahvol, shart, sharoit, vaziyat, tibbiy holat, kasallik
conditioning (n) => chiniqtirish, tayyorlash, mashq qildirish
conditioner (n) => chiniqtiruvchi vosita, konditsioner
condition (v) => tayyorlamoq, chiniqtirmoq., mashq qildirmoq
conditional (adj) => shartli, muayyan shartga bog'liq
conditioned (adj) => tayyorlangan, chiniqtirilgan, shartlangan
conditionally (adv) => shartli ravishda, muayyan shart bilan

original (adj) => asl, original, dastlabki, o'ziga xos
original (n) => asl nusxa, original
originally (adv) => dastlab, aslida
originality (n) => o'ziga xoslik, yangilik

close (n) => yakun, oxirgi qism
closer (n) => yakunlovchi, ishni yakunlovchi shaxs yoki narsa
closeness (n) => yaqinlik, yaqin munosabat
closure (n) => yopilish, yakunlanish, tugatilish
closable (adj) => yopish mumkin bo'lgan
closed (adj) => yopiq, yopilgan
close (v) => yopmoq, yopilmoq, yakunlamoq 
close (adj) => yaqin, zich, yaqin munosabatdagi
close (adv) => yaqin tarzda, yaqindan (masofa)
closely (adv) => yaqindan, diqqat bilan

entirety (n) => butunlik, yaxlitlik, to'liq holat
entire (adj) => butun, to'liq, yaxlit
entirely (adv) => butunlay, to'liq ravishda, tamoman

reinvent (v) => qaytadan yaratmoq, qayta ixtiro qilmoq
reinvention (n) => qayta yaratish, qayta ixtiro qilish
reinvented (adj) => qayta yaratilgan

obviousness (n) => yaqqollik, ravshanlik, oshkoralik
obviation (n) => zaruratni yo'qotish, ehtiyojni bartaraf etish
obviate (v) => zaruratni yo'qotmoq, biror muammoning oldini olib unga ehtiyoj qoldirmaslik
obvious (adj) => aniq-ravshdan, yaqqol, ko'rinib turgan, shubhasiz
obviously (adv) => shubhasiz, ravshanki, yaqqol ko'rinib turibdiki

receive (v) => olmoq, qabul qilmoq, qabul qilib olmoq
reception (n) => qabul qilish, qabulxona, qabul marosimi
receptionist (n) => qabulxonada ishlovchi receptionist
receiver (n) => qabul qiluvchi, qabul qilgich

receptive (adj) => qabul qilishga tayyor, ochiq
receptively (adv) => ochiq yoki qabul qilishga tayyor tarzda
receptiveness (n) => qabul qilishga tayyorgarlik

mention (n) => eslatish, tilga olish
mentioner (n) => tilga oluvchi
unmentionability (n) => tilga olib bo'lmaslik, aytishga noqulaylik holati
mention (v) => tilga olmoq, eslatib o'tmoq, aytib o'tmoq
mentionable (adj) => tilga olish mumkin bo'lgan
unmentionable (adj) => tilga olish noqulay yoki uyatli bo'lgan, tilga olib bo'lmaydigan

type (n) => turli xil, tip, shrift
typing (n) => matn terish, klaviaturada yozish
typewriter (n) => yozuv mashinkasi
typist (n) => matn teruvchi, operator
type (v) => klaviaturada yozmoq, matn termoq
typeable (adj) => terish mumkin bo'lgan

profession (n) => kasb, mutaxassislik, professional faoliyat
professional (n) => mutaxassis
professional (adj) => professional
professionally (adv) => professional tarzda 
professionalism (n) => professionallik

career (n) => kasbiy yo‘l, professional faoliyat, karyera, kasbiy faoliyat
careerist (n) => karyerachi, karyerasiga juda berilgan odam
careerism (n) => karyerachilik, karyeraga haddan tashqari intilish
career (v) => karyera qilmoq, kasbiy faoliyatini rivojlantirmoq
careeristic (adj) => karyeraga intiluvchi, karyerasini shaxsiy manfaatlardan ustun qo'yuvchi, mansabparast
career-oriented (adj) => karyeraga yo'naltirilgan, kasbiy rivojlanishga yo'naltirilgan

persuade => asosan ko‘ndirmoq, ishontirmoq, biror ishni qilishga undamoq.
persuasion (n) => ishontirish, ko'ndirish
persuasive (adj) => ishontiruvchi, ko'ndira oladigan
persuasively (adv) => ishontiruvchi tarzda

risk (n) => xavf, tavakkal
risk (v) => xavf ostiga qo'ymoq, tavakkal qilmoq
riskily (adv) => xavfli tarzda
riskiness (n) => xavflilik, tavakkalchilik
risky (adj) => xavfli, tavakkalchilikka ega, xavf tug‘dirishi mumkin bo‘lgan

fallacy (n) => xato fikr, mantiqiy xato
falsity (n) => yolg'onlik, noto'g'rilik
fallibility (n) => xato qilish mumkinligi
falsehodd (n) => yolg'on
falsification (n) => soxtalashtirish
falsify (v) => soxtalashtirmoq, ma'lumotni ataylab noto'g'ri ko'rsatmoq
fallcious (adj) => xato, aldamchi
fallible (adj) => xato qilish mumkin bo'lgan
infallible (adj) => xatosiz
false (adj) => yolg'on, noto'g'ri
falsely (adv) => yolg'on ravishda, noto'g'ri ravishda, yolg'on yo'l bilan
fallaciously (adv) => xato mantiq bilan
infallibly (adv) => xatosiz, doim to'g'ri

sophisticated (adj) => murakkab, ilg'or, zamonaviy, nafis, didli
sophistication (n) => murakkablik, nafislik, yuqori darajadagi rivojlanganlik
sophisticate (n) => tajribali/bilimdon odam
sophisticate (v) => takomillashtirmoq, murakkablashtirmoq

result (n) => natija
result (v) => natijaga olib kelmoq
resulting (adj) => natijada hosil bo'lgan
resultantly (adv) => natijada 

extensibility (n) => kengaytirish imkoniyati
extensiveness (n) => keng ko'lamlilik, kenglik
extender (n) => uzaytiruvchi qurilma yoki vosita

extent (n) => daraja, ko'lam, miqyos, kenglik, maydon
extension (n) => kengaytma, uzaytirish, muddatni uzaytirish, qo'shimcha telefon raqami
extend (v) => uzaytirmoq, kengaytirmoq
overextend (v) => imkoniyatdan ortiq cho'zmoq, kuchidan ortiq majburiyat olmoq
overextended (adj) => imkoniyatidan ortiq cho'zilgan, haddan tashqari majburiyat olgan
extensive (adj) => keng ko'lamli, ulkan, batafsil
extended (adj) => uzaytrililgan, cho'zilgan
extendable (adj) => uzaytirsa bo'ladigan
extensible (adj) => kengaytirish mumkin bo'lgan
non-extensible (adj) => kengaytirib bo'lmaydigan
extensively (adv) => keng ko'lamda, batafsil, ko'p

read (v) => o'qimoq
reader (n) => o'quvchi
readability (n) => o'qishga qulaylik, o'qilish darajasi
readable (adj) => o'qilishi oson
readably (adv) => o'qishga qulay tarzda

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

container (n) => idish, konteyner, sig'im
containerization (n) => konteynerlash
containment (n) => saqlab turish, cheklash, tarqalishining oldini olish
containership (n) => konteyner tashuvchi kema
containerful (n) => bir konteynerga sig'adigan miqdor
contain (v) => o'z ichiga olmoq, saqlamoq, sig'dirmoq, tiyib turmoq
containerize (v) => konteynlashtirmoq
containable (adj) => nazorat qilish mumkin bo'lgan, cheklash mumkin bo'lgan
uncontainable (adj) => cheklab bo'lmaydigan, nazorat qilib bo'lmaydigan
contained (adj) => ichiga olingan, saqlangan, vazmin, o'zini tutgan
uncontained (adj) => nazorat qilib bo'lmaydigan, cheklanmagan, tarqalib ketgan
containing (adj) => o'z ichiga olgan, saqlayotgan
containerized (adj) => konteynerlashtirilgan

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

review (n) => sharh, taqriz, ko'rib chiqish, tahlil
review (v) => ko'rib chiqmoq, qayta tekshirmoq, tahlil qilmoq
reviewer (n) => sharhlovchi, taqrizchi

adequacy (n) => yetarlilik
adequate (adj) => yetarli
adequately (adv) => yetarli darajada
inadequacy (n) => yetishmaslik, yetarli emaslik
inadequate (adj) => yetarli emas, kam
inadequately (adv) => yetarli bo'lmagan darajada

bloat (v) => shishirmoq, kattalashtirmoq, keragidan ortiq to'ldirmoq
bloat (n) => keragidan ortiqcha kattalashish, shishish, ortiqcha hajm
bloating (n) => shishish, dam bo'lish jarayoni
bloated (adj) => shishgan, haddan tashqari kattalashgan, ortiqcha narsalar bilan to'lib ketgan
bloatedly (adv) => shishgan yoki kattalashgan tarzda
bloatedness (n) => shishganlik, haddan tashqari kattalik holati

typical (adj) => odatiy, xos, tipik, o'ziga xos
typically (adv) => odatda, ko'pincha, odatiy tarzda, odatdagidek
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

definition (n) => ta'rif, aniqlanma, ta'riflash
definiteness (n) => aniqlik, muayyanlik
indefiniteness (n) => noaniqlik, muayyan emaslik
define (v) => aniqlamoq, ta'riflamoq, belgilamoq
definite (adj) => aniq, muayyan, ma'lum
indefinite (adj) => noaniq, muayyan bo'lmagan, aniq belgilanmagan
defined (adj) => aniqlangan, belgilangan, ta'riflangan
definitely (adv) => albatta, shubhasiz aniq ravishda
indefinitely (adv) => noma'lum muddatga, muddatsiz, aniq vaqt belgilanmagan holda

optimize (v) => optimallashtirmoq
optimization (n) => optimallashtirish
optimized (adj) => optimallashtirilgan
optimal (adj) => eng maqbul, optimal
optimally (adv) => optimal tarzda

becomingness (n) => yarashish xususiyati
become (v) => bo‘lmoq, aylanmoq, ... holatiga kelmoq
becoming (adj) => yarashadigan, chiroyli ko'rinadigan, mos tushadigan
becomingly (adv) => yarashadigan tarzda, chiroyli tarzda
becomer (n) => biror narsaga aylanayotgan / biror maqomga ega bo‘layotgan shaxs.

problem (n) => muammo
problematic (adj) => muammoli, muammo tug‘diradigan, muammoga sabab bo‘ladigan
problematically (adv) => muammoli tarzda

thing (n) => narsa, buyum
thing (n) => ish, masala
thing (n) => holat, voqea
thing (n) => jihat, tomon
thing (n) => fikr, g'oya

extreme (adj) => o'ta, haddan tashqari, ekstremal holat
extremely (adv) => nihoyatda, o'ta
extremity (n) => eng chekka nuqta, ekstremal holat
extremist (n) => ekstremist
extremist (adj) => ekstremistik
extremism (n) => ekstremizm

penny (n) => AQSH dagi 1 sentlik tanga
nickel (n) => AQSH dagi 5 sentlik tanga
dime (n) => AQShdagi 10 sentlik tanga
quarter (n) => AQSH dagi 25 sentlik tanga

input (n) => kiritilgan ma’lumot, kirish ma’lumoti, hissa, fikr
inputter (n) => ma'lumot kirituvchi
input (v) => ma'lumot kiritmoq, fikr yoki hissa qo'shmoq

output (n) => chiqish ma'lumoti, natija
output (v) => chiqarmoq, natija sifatida bermoq

possible (adj) => mumkin, imkoni bor, bo'lishi mumkin.
possibly (adv) => ehtimol, balki
possibility (n) => imkoniyat, ehtimol
impossible (adj) => imkonsiz
impossibly (adv) => imkonsiz darajada

intricacy (n) => murakkablik, chigallik, nozik jihat, mayda tafsilot
intricate (adj) => murakkab, ko'p mayda qismlardan iborat, nozik ishlangan
intricately (adv) => murakkab tarzda, nozik ishlangan holda

adaptation (n) => moslashish, moslashtirish
adaptability (n) => moslashuvchanlik
adapt (v) => moslashmoq, moslashtirmoq
adapted (adj) => moshlashgan, moslashtirilgan
adaptable (adj) => moslasha oladigan
adaptably (adv) => moslasha oladigan tarzda
adaptively (adv) => moslashuvchan tarzda, moslashib
maladaptation (n) => noto'g'ri moslashish, yomon moslashuv
maladapt (v) => noto'g'ri moslashmoq, noto'g'ri moslashtirmoq
maladaptive (adj) => noto'g'ri moslashgan, moslashishga xalaqit beradigan
maladaptively (adv) => noto'g'ri moslashgan tarzda

adoption (n) => qabul qilish, o'zlashtirish, joriy qilish, farzandlikka olish
adopt (v) => qabul qilmoq, o'zlashtirmoq, joriy qilmoq, farzandlikka olmoq
adopted (adj) => asrab olingan, qabul qilingan, o'zlashtirilgan
adoptive (adj) => asrab oluvchi, farzandlikka olgan
adopter (n) => biror narsani qabul qiluvchi yoki o'zlashtiruvchi

set (v) => qo'ymoq, o'rnatmoq, belgilamoq
set (n) => to'plam

obscurity (n) => noaniqlik, noma'lumlik, tushunarsizlik
obscurement (n) => yashirish, ko'rinishini to'sish
obscurant (n) => bilim yoki tushunishni ataylab cheklovchi 
obscurantism (n) => bilim va ma'rifatni cheklashga intilish
obscure (v) => noaniq qilib qo'ymoq, yashirmoq, ko'rinishini to'smoq
obscure (adj) => noaniq, tushunish qiyin, noma'lum, ko'zga tashlanmaydigan
obscurely (adv) => noaniq tarzda, tushunarsiz tarzda

brute (n) => qo'pol odam, vaxshiy odam, kuchli va shafqatsiz odam
brutality (n) => shafqatsizlik, vahshiylik, qo'pollik
brutalization (n) => shafqatsiz munosabatga duchor qilish
brutalize (v) => shafqatsiz munosabatda bo'lmoq, vahshiylarcha muomala qilmoq
brute (adj) => qo'pol, shafqatsiz, vahshiy, hayvonlarcha
brutal (adj) => shafqatsiz, vahshiy, juda qattiq, ayovsiz
brutalized (adj) => shafqatsiz munosabatga uchragan, vahshiylarcha muomala qilingan
brutally (adv) => shafqatsizlarcha, qo'pol tarzda, juda keskin tarzda

straighforwardness (n) => soddalik, ochiqlik, to'g'ridan-to'g'rilik
straightforward (adj) => oddiy va tushunarli, to'g'ridan-to'g'ri, murakkab bo'lmagan
straighforwardly (adv) => to'g'ridan-to'g'ri, ochiqchasiga, sodda tarzda

triviality (n) => arzimaslik, ahamiyatsizlik, arzimas narsa
trivialization (n) => ahamiyatini pasaytirish, arzimas deb ko'rsatish
trivialize (v) => arzimas deb ko'rsatmoq, ahamiyatini pasaytirmoq
trivial (adj) => arzimas, ahamiyatsiz, juda oddiy, murakkab bo'lmagan
trivially (adv) => arzimas tarzda, juda oddiy tarzda, osonlik bilan 

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

measure (n) => o'lchov, o'lchash, chora, tadbir
measurement (n) => o'lchov, o'lchash natijasi, o'lchash jarayoni
measurer (n) => o'lchovchi, o'lchaydigan shaxs
measure (v) => o'lchamoq, o'lchab aniqlamoq
measured (adj) => o'lchangan, vazmin, bosiq
measurable (adj) => o'lchanadigan, o'lchab bo'ladigan
immeasurable (adj) => o'lchab bo'lmaydigan, behisob
measurably (adv) => o'lchab bo'ladigan darajada
immeasurably (adv) => o'lchab bo'lmaydigan darajada

cheat (n) => aldov, firibgarlik, qoidani buzib ustunlikka erishish
cheater (n) => aldovchi, qoidabuzar, ko'chiruvchi
cheating (n) => aldash, qoidani buzish, ko'chirish
cheat (v) => aldamoq, qoidani buzib foyda olmoq, ko‘chirmoq
cheated (adj) => aldangan, haqqi paymol qilingan
cheating (adj) => aldaydigan, qoidani buzadigan
cheatable (adj) => aldash mumkin bo'lgan, qoidani buzish yoki chetlab o'tish mumkin bo'lgan

fact (n) => fakt, haqiqat, isbotlangan narsa
factuality (n) => faktikligi, haqiqatga mosligi
factoid (n) => shubhali ma'lumot, haqiqat deb tarqalgan lekin isbotlanmagan gap
factual (adj) => faktlarga asoslangan, faktik
nofactual (adj) => faktlarga asoslanmagan
counterfactual (adj) => haqiqatga zid
factually (adv) => faktlar nuqtayi nazaridan, fakt jihatdan

premise (n) => asosiy taxmin, boshlang‘ich fikr, asos, asosiy fikr, asosiy g'oya
premises => bino yoki unga tegishli hudud

question (n) => savol 
question (v) => shubha ostiga qo'ymoq, savol bermoq
questionable (adj) => shubhali
questionably (adv) => shubhali tarzda
questioning (adj) => shubha bilan qarash
questioning (n) => shubha ostiga qo'yish, savol berish

generation (n) => yaratish, hosil qilish, avlod, ishlab chiqarish
generator (n) => generator, hosil qiuvchi narsa yoki qurilma
degeneration (n) => tanazzul, yomonlashish
degenerate (n) => tanazzulga uchragan kishi (kamsituvchi)
generate (v) => yaratmoq, hosil qilmoq, vujudga keltirmoq, ishlab chiqarmoq
regenerate (v) => qayta tiklamoq, qayta hosil qimoq, qayta tiklanmoq
degenerate (v) => yomonlashmoq, tanazzulga uchramoq
generative (adj) => yaratuvchi, hosil qiluvchi
regenerative (adj) => qayta tiklovchi
degenerate (adj) => tanazzulga uchragan, buzilgan
generatively (adv) => hosil qiluvchi tarzda

laughable (adj) => kulgili, kulgiga sabab bo'ladigan, be'mani darajada kulgili
laughably (adv) => kulgili tarzda, kulgili darajada
laugh (v) => kulmoq
laugh (n) => kulgi
laughter (n) => kulish

grin (n) => keng tabassum, tishlarni ko'rsatib jilmayish
grinner (n) => tishlarni ko'rsatib jilmayuvchi kishi
grin (v) => tishlarni ko'rsatib jilmaymoq, keng jilmaymoq, tishlarni ko'rsatmoq
grinning (adj) => tishlarni ko'rsatib jilmayayotgan
grinny (adj) => doim tirjayib turadigan
grinningly (adv) => keng jilmayib, tishlarini ko'rsatib

giggle (n) => piq-piq kulgi, xixillash, qiziqarli, kulgili narsa
giggles (n) => uzoq davom etadigan piq-piq kulgi
giggle (v) => piq-piq kulmoq, xixillamoq, ichida kulmoq
giggy (adj) => kulgisi kutib turgan, tez-tez piq-piq kuladigan
gigglingly (adv) => piq-piq kulib, xixillab

chuckle (n) => past ovozdagi kulgi, ichidan kulish
chuckle (v) => ichidan kulmoq, past ovozda kulmoq
chuckling (adj) => past ovozda kulayotgan, ichidan kulayotgan
chuckling (n) => past ovozda kulish, ichidan kulish
chuckled (adj) => kulgan, ichidan kulgan

screenful (n) => bir ekranlik miqdor, ekranga sig‘adigan miqdor

sufficiency (n) => yetarlilik, ta'minlanganlik
insufficiency (n) => yetishmovchilik
self-sufficiency (n) => o'zini o'zi ta'minlash
suffice (v) => yetarli bo'lmoq, kifoya qilmoq
sufficient (adj) => yetarli, kifoya qiladigan
insufficient (adj) => yetarli bo'lmagan, kam
self-sufficient (adj) => o'zini-o'zi ta'minlaydigan
sufficiently (adv) => yetarli darajada
insufficiently (adv) => yetarli bo'lmagan darajada

scan (v) => tezda ko‘zdan kechirmoq, tekshirib chiqmoq, skanerlamoq
scanner (n) => skaner, tekshiruvchi qurilma
scannable (adj) => tez ko'zdan kechirish mumkin bo'lgan

disservice (n) => zarar yetkazadigan yordam yoki xizmat, kutilgan foydaning aksiga olib keladigan ish, zararli munosabat

optionally (adv) => ixtiyoriy ravishda, xohishga ko‘ra, majburiy bo‘lmagan holda
optional (adj) => ixtiyoriy

eligibility (n) => moslik, talabga javob berish, huquqqa ega bo‘lish
eligible (adj) => mos, talabga javob beradigan, huquqqa ega
ineligible (adj) => talabga javob bermaydigan, huquqqa ega bo'lmagan, mos kelmaydigan
eligibly (adv) => talablarga javob bergan holda

undertaking (n) => zimmasiga olingan ish yoki majburiyat
undertaker (n) => dafn marosimlarini tashkil qiluvchi shaxs
undertake (v) => zimmasiga olmoq, bajarishga kirishmoq

legal (adj) => qonuniy, qonunga muvofiq, huquqiy
legality (n) => qonuniylik
illegality (n) => noqonuniylik, qonunga xiloflik
paralegal (n) => yurist yordamchisi, huquqiy ishlar bo'yicha mutaxassis
legalize (v) => qonuniylashtirmoq, qonuniy deb tan olmoq
legalization (n) => qonuniylashtirish
legalized (adj) => qonuniylashtirilgan
legalizable (adj) => qonuniylashtirish mumkin bo'lgan
illegal (adj) => noqonuniy, qonunga xilof
legally (adv) => qonuniy ravishda, qonun bo'yicha
illegally (adv) => noqonuniy ravishda

fuss (n) => shov-shuv, ortiqcha tashvish, bejiz janjal
fussiness (n) => injiqlik, talabchanlik, mayda-chuydaga yopishib olish
fusspot (n) => injiq, mayda-chuydaga ortiqcha e'tibor beradigan odam
fuss (v) => mayda-chuydaga ortiqcha tashvish qilmoq, bezovta bo'lmoq, hovliqmoq
fussy (adj) => injiq, talabchan, mayda-chuydaga e'tibor beradigan
fussed (adj) => tashvishga tushgan
fuss-free (adj) => tashvishsiz, murakkabligi yo'q
fussily (adv) => injiqlik bilan, mayda-chuydaga ortiqcha e'tibor berib

consent (n) => rozilik, ruxsat
consenter (n) => rozilik beruvchi shaxs
consent (v) => rozi bo'lmoq, rozilik bermoq
consensual (adj) => o'zaro rozilikka asoslangan, rozilik bilan amalga oshiriladigan
consensually (adv) => o'zaro rozilik asosida, rozilik bilan

assessment (n) => baholash, baho berish, baholash natijasi
assessor (n) => baholovchi, ekspert
assess (v) => baholamoq, tekshirib baho bermoq
assessable (adj) => baholash mumkin bo'lgan
assessed (adj) => baholangan

specialization (n) => ixtisoslashuv, ixtisoslik, muayyan sohada chuqur yo'nalish

simultaneously (adv) => bir vaqtning o‘zida, bir paytda, bir vaqtda.
specialize (v) => ixtisoslashmoq
specialized (adj) => ixtisoslashgan
simultaneous => bir vaqtdagi, bir paytda sodir bo‘ladigan

advance (n) => rivojlanish, taraqqiyot, oldinga siljish
advance (v) => oldinga siljimoq, rivojlanmoq, oldinga surmoq
advanced (adj) => ilg‘or, yuqori darajadagi
advancement (n) => rivojlanish jarayoni, taraqqiyot, ilgarilash, lavozimda ko'tarilish
advancing (adj) => rivojlanib borayotgan, oldinga siljiyotgan

competion (n) => tugatish, yakunlash, tugallash
completeness (n) => to'liqlik, mukammallik
complete (v) => tugatmoq, yakunlamoq, to'ldirmoq
complete (adj) => to'liq, butun, mukammal, tugallangan
competed (adj) => tugallangan, yakunlangan, to'ldirilgan
completely (adv) => butunlay, to‘liq, tamoman, mutlaqo
completeable (adj) => tugatish mumkin bo'lgan, yakunlash mumkin bo'lgan

otherwise => boshqacha, aks holda, bo'lmasa, bundan tashqari, boshqa jihatdan

related (adj) => bog‘liq, aloqador, tegishli.
relation (n) => aloqa, munosabat
relationship (n) => munosabat (Odatda odamlar va guruhlar orasidagi munosabat)
related (adj) => bog'liq, aloqador (Kengroq ma'noga ega. Formal asosan)
relate (v) => bog'lamoq, aloqador bo'lmoq

clarification (n) => aniqlashtirish, tushuntirish, aniqlik kiritish
clarify (v) => aniqlashtirmoq, tushuntirmoq, aniqlik kiritmoq
clarifying (adj) => aniqlashtiruvchi, tushuntiruvchi
clarified (adj) => aniqlashtirilgan, tushuntirilgan
clarifyably (adv) => aniqlashtiriladigan tarzda

clearance (n) => ruxsat, bo'shatish, tozalash
clear (v) => tozalamoq, bo'shatmoq, olib tashlamoq
cleared (adj) => tozalangan, bo'shatilgan, ruxsat berilgan
clear (adj) => aniq, tushunarli, ravshan, ochiq
unclear (adj) => noaniq, tushunarsiz, ravshan bo'lmagan
cleaerly (adv) => aniq ravishda, tushunarli tarzda, ravshan tarzda
unclearly (adv) => noaniq tarzda, tushunarsiz tarzda

enrolment (n) => ro'yxatdan o'tish, o'qishga qabul qilinish yoki yozilish
entrolee (n) => ro'yxatdan o'tgan shaxs, dastur yoki kursga yozilgan ishtirokchi
entrol (v) => ro'yxatdan o'tmoq, o'qishga yozilmoq, kimnidir ro'yxatga olmoq
entrolled (adj) => ro'yxatdan o'tgan, o'qishga yozilgan
enrolled (adj) => ro'yxatdan o'tgan, yozilgan

situation (n) => vaziyat, holat
situate (v) => joylashtirmoq
situational (adj) => vaziyatga oid

per se => o‘z-o‘zidan, o‘zi alohida, o‘z mohiyatiga ko‘ra

stress (n) => ruhiy zo'riqish, stress, bosim, urg'u
stressfulness (n) => stresslilik
stressor (n) => stress keltirib chiqaruvchi omil
stress (v) => stressga solmoq, urg'u bermoq, ta'kidlamoq
stressed (adj) => stresga tushgan, zo'riqqan, urg'u berilgan
stressful (adj) => stressli, asabiylashtiradigan, asabiy zo'riqish keltiradigan
stress-free (adj) => stresssiz, tashvishsiz
stressfully (adv) => stressli tarzda

substring (n) => qism-satr, satr ichidagi qism
string (n) => ip, arqon
stringency (n) => qat'iylik, qattiqqo'llik
dawstring (n) => tortma ip (xalta yoki shimdagi)
shoetring (n) => tasma, bog'ich, juda oz mablag'
bowstring (n) => kamon tori
string (v) => ipga tizmoq, ip tortmoq, ketma-ket joylashtirmoq
stringy (adj) => tolali, ipsimon
stringed (adj) => torli
stringent (adj) => qattiq, qat'iy
stringently (adv) => qat'iy ravishda

pass (n) => ruxsatnoma, yo'llanma
pass (v) => uzatmoq, o'tmoq

excess (n) => ortiqcha miqdor, ortiqchalik, me'yordan ortiq miqdor
excess (adj) => ortiqcha, me'yordan ko'p
excessive (adj) => haddan tashqari, me'yordan ortiq
excessively (adv) => haddan tashqari, me'yordan ortiq darajada

restriction (n) => cheklovlar, taqiqlar, cheklashlar.
restrict (v) => cheklamoq
restrictive (adj) => cheklovchi, cheklaydigan
restricted (adj) => cheklangan
restrictively (adv) => cheklovchi tarzda

externalization / externalisation (n) => tashqariga chiqarish, ifodalash, tashqi tizimga o'tkazish
externality (n) => tashqi ta'sir
externals (n) => tashqi tomonlar, tashqi ko'rinish
exterior (n) => tashqi qism, tashqi ko'rinish
externalize / externalise (v) => tashqariga chiqarmoq, ichki fikr yoki his-tuyg'uni ifodalamoq, boshqalarga yuklamoq
external (adj) => tashqi, tashqaridagi, tashqaridan bo‘lgan
externalized (adj) => tashqariga chiqarilgan
exterior (adj) => tashqi, sirtqi
externally (adv) => tashqi tomondan, tashqaridan

internal (adj) => ichki
internally (adv) => ichki tarzda, ichkaridan
internalize (v) => o'zlashtirmoq, ichki qabul qilmoq
internalization (n) => o'zlashtirish, ichkilashtirish
internalized (adj) => o'zlashtirilgan, ichki qabul qilingan

access (n) => kirish, foydalanish imkoniyati
access (v) => kirmoq, foydalanmoq
accessible (adj) => foydalanish mumkin bo'lgan, kirish mumkin bo'lgan
inaccessible (adj) => kirish imkoni yo'q, foydalanib bo'lmaydigan
accessibility (n) => kirish yoki foydalanish qulayligi va imkoniyati
accessibly (adv) => foydalanish mumkin bo'lgan tarzda, kirish mumkin bo'lgan tarzda
inaccessibly (adv) => kirish imkoni bo'lmagan tarzda, foydalanib bo'lmaydigan tarzda

formulation (n) => shakllantirish, ishlab chiqish, aniq ifodalash yoki tuzish
reformulation (n) => qayta shakllantirish, qayta tuzish
formulate (v) => shakllantirmoq, ishlab chiqmoq, aniq qilib tuzmoq
reformulate (v) => qayta shakllantirmoq, qayta tuzmoq, boshqacha ifodalamoq
formulated (adj) => shakllantirilgan, ishlab chiqilgan, aniq tuzilgan

notice (n) => e'lon, xabarnoma, ogohlantirish, payqash
noticer (n) => payqovchi, biror narsani sezadigan odam
noticeability (n) => sezilarlilik, payqalish darjasi
notice (v) => payqamoq, sezmoq, e'tibor bermoq, xabar bermoq
noticeable (adj) => sezilarli, yaqqol ko'rinadigan, osongina payqaladigan
unnoticable (adj) => sezilmaydigan, payqash qiyin bo'lgan
unnoticed (adj) => payqalmagan, sezilmay qolgan
noticeably (adv) => sezilarli darajada, yaqqol ravishda

commercial (n) => reklama, reklama roligi, tijoriy e'on
commercialization (n) => tijoratlashtirish, tijoratga chiqarish
commercialism (n) => tijoratchilik, tijoratga haddan tashqari urg'u berish
commercialist (n) => tijoratchi, tijorat tarafdori
commercialize (v) => tijoratlashtirmoq, tijoriy maqsadda foydalanmoq
commercialized (adj) => tijoratlashtirilgan
commercializing (adj) => tijoratlashtirilayotgan
commercial (adj) => tijoriy, savdoga oid, tijoratga oid
commercializable (adj) => tijoratlashtirish mumkin bo'lgan
commercially (adv) => tijoriy jihatdan, tijorat nuqtayi nazaridan

demand (n) => talab, talab-ehtiyoj, talab darajasi
demand (v) => talab qilmoq, qat'iy talab qilmoq
demanding (adj) => ko'p kuch yoki mehnat talab qiladigan, talabchan
demanded (adj) => talab qilingan, talab etilgan
demandingly (adv) => talabchan tarzda

significant (adj) => muhim, sezilarli, katta, salmoqli, ahamiyatli

detail (n) => tafsilot, batafsil ma'lumot
details (n) => tafsilotlar, shaxsiy ma'lumotlar (ism, manzil, telefon)
detail (v) => batafsil tushuntirmoq, birma-bir sanab bermoq
detailed (adj) => batafsil, puxta, tafsilotlarga boy
detail-oriented (adj) => mayda narsalarga e'tiborli
undetailed (adj) => tafsilotsiz, qisqa

application (n) => qo'llash, ariza, ilova, dastur
applicant (n) => ariza beruvchi, nomzod
applicability (n) => qo'llanilish imkoniyati, tegishliligi
apply (v) => qo'llamoq, ishlatmoq, murojaat qilmoq, ariza bermoq, tatbiq etmoq, surtmoq
applicable (adj) => qo'llaniladigan, tegishli
applicably (adv) => qo'llanadigan tarzda

constant (n) => doimiy kattalik, o'zgarmas qiymat
constancy (n) => doimiylik, barqarorlik, o'zgarmaslik
inconstancy (n) => beqarorlik, o'zgaruvchanlik
constant (adj) => doimiy, uzluksiz, o'zgarmas, muntazam
inconstant (adj) => o'zgaruvchan, beqaror, doimiy bo'lmagan
constantly (adv) => doimiy ravishda, tinmay, uzluksiz
inconstantly (adv) => o'zgaruvchan tarzda, beqaror tarzda

largeness (n) => kattalik, yiriklik
enlargement (n) => kattalashtirish, kengaytirish
enlarge (v) => kattalashtirmoq, kengaytirmoq
large (adj) => katta, yirik, ko'p miqdordagi
enlarged (adj) => kattalashtirilgan, kattalashgan
largely (adv) => asosan, katta darajada

chunk (n) => katta bo'lak, parcha, bir qism
chunkiness (n) => yirik bo'laklilik, yo'g'onlik
chunk (v) => bo'laklarga ajratmoq
chunky (adj) => yirik bo'lakli, yo'g'on, baquvvat

shape (n) => shakl, format
shape (v) => shakllantirmoq, shakl bermoq
reshape (v) => qayta shakllantirmoq

simply (adv) => shunchaki, oddiygina, umuman, mutlaqo

axis (n) => o'q, kordinata o'qi, aylanish o'qi (plural: axes)
axiality (n) => o'qlilik, o'qqa ega bo'lish xususiyati
axial (adj) => o'qqa oid, o'q bo'ylab joylashgan
axially (adv) => o'q bo'ylab, o'q yo'nalishida

sensible (adj) => aqlli, oqilona, mantiqan to‘g‘ri, amaliy jihatdan to‘g‘ri
sensitive (adj) => ta'sirchan, sezgir, nozik

assumption (n) => taxmin, faraz, oldindan qabul qilingan fikr
assume (v) => deb hisoblamoq, faraz qilmoq (shunday deb qabul qilaman), taxmin qilmoq
assumable (adj) => faraz qilish yoki qabul qilish mumkin bo'lgan
assumed (adj) => taxmin qilingan, faraz qilingan, deb qabul qilingan
assumptive (adj) => taxminiy, farazga asoslangan
assumptively (adv) => taxminiy tarzda, faraz qilib

simplicity (n) => soddalik, oddiylik.
simple (adj) => oddiy, sodda
simply (adv) => oddiygina, shunchaki

rather => ancha, biroz, aksincha, ...dan ko‘ra

partially (adv) => qisman, to‘liq emas, ma'lum darajada.

severe (adj) => juda jiddiy, og‘ir, keskin (serious dan kuchli)

realistically (adv) => realistik tarzda, amalda, haqiqiy sharoitni hisobga olib, real nuqtai nazardan.

aim (n) => maqsad, niyat, ko'zlangan natija
aimlessness (n) => maqsadsizlik, yo'nalishsiz holat
aim (v) => maqsad qilmoq, intilmoq, nishonga olmoq, yo'naltirmoq
aimless (adj) => maqsadsiz, yo'nalishsiz
aimlessly (adv) => maqsadsiz ravishda, yo'nalishsiz ravishda
aimed (adj) => yo'naltirilgan, mo'ljallangan, qaratilgan

thought (n) => fikr, o'y, xayol, mulohaza, o'ylash, fikrlash
think (v) => o'ylamoq, fikrlamoq
though (adv) => lekin, ammo, shunga qaramay, baribir

estimate (n) => taxminiy hisob, baho, rilish, ta’mirlash yoki boshqa loyihani amalga oshirish uchun ketadigan xarajatlarning oldindan hisob-kitobi, narx taklifi
underestimate (n) => kamsitib baholash, haqiqatdan kam qilib hisoblash
overestimate (n) => oshirib baholash
estimation (n) => baholash, taxmin, fikr, hurmat
estimator (n) => baholovchi, smeta tuzuvchi, baho hisoblash usuli
estimate (v) => taxmin qilmoq, chamalamoq, hisoblab chiqmoq, baholamoq
underestimate (v) => kamsitib baholamoq, haqiqatdan kam deb o'ylamoq
overestimate (v) => oshirib baholamoq, haqiqatdan ko'p deb o'ylamoq
reestimate (v) => qayta baholamoq
estimated (adj) => taxminiy, chamalangan
estimable (adj) => baholash mumkin bo'lgan
inestimable (adj) => baholab bo'lmaydigan, behisob

approximation (n) => taxminiy qiymat, yaqinlashtirish, yaqinlik, o'xshashlik
approximateness (n) => taxminiylik
approximate (v) => yaqinlashmoq, taxminan teng bo'lmoq, o'xshab ketmoq, taxminan hisoblamoq
approximate (adj) => taxminiy, chamalangan
approximative (adj) => taxminiy, yaqinlashtiruvchi
approximable (adj) => yaqinlashtirish mumkin bo'lgan
approximately (adv) => taxminan, qariyb
approximatively (adv) => taxminiy tarzda

defense (n) => himoya, mudofaa, himoyalanish
defender (n) => himoyachi, himoya qiluvchi
defensibility (n) => himoya qilishga arzigulik asos borligi, o'z fikri yoki qarorini oqlay olish imkoniyati
defense (v) => himoya qilmoq, mudofaa qilmoq
defensive (adj) => himoyaga oid, mudofaa qiluvchi, o'zini himoya qiluvchi
defended (adj) => himoyalangan, mudofaa qilingan
defensible (adj) => himoya qilish mumkin bo'lgan, asoslash mumkin bo'lgan
indefensible (adj) => himoya qilib bo'lmaydigan, oqlab bo'lmaydigan
defensively (adv) => himoyalangan tarzda, mudofaa tarzida
indefensibly (adv) => himoya qilib bo'lmaydigan tarzda, oqlab bo'lmaydigan tarzda

questionnaire (n) => so‘rovnoma, anketa

aversion (n) => nafrat, kuchli yoqtirmaslik, qarshilik, xush ko'rmaslik
avert (v) => oldini olmoq, qaytarmoq
averse (adj) => qarshi, xush ko'rmaydigan, istamaydigan
aversely (adv) => xush ko'rmaydigan tarzda

preference (n) => afzallik, tanlov

recall (v) => eslamoq, yodga tushirmoq

scared (adj) => qo'rqib ketgan, qo'rqqan
scare (v) => qo'rqitmoq
scary (adj) => qo'rqinchli

genuineness (n) => haqiqiylik, samimiylik, asllik
genuine (adj) => haqiqiy, asl, soxta emas, chin, samimiy
ingenuous (adj) => soddadil, samimiy, aldamchilikni bilmaydigan
genuinely (adv) => chin dildan, haqiqatan ham, samimiy ravishda

existence (n) => mavjudlik, borliq
exist (v) => mavjud bo'lmoq, mavjud bo'lib turmoq
existing (adj) => mavjud, allaqachon mavjud bo'lgan
existent (adj) => mavjud, bor bo'lgan

strength (n) => kuch, quvvat, mustahkamlik
strengthening (n) => kuchaytirish, mustahkamlash
stronghold (n) => qal'a, tayanch, mustahkam joy, tayanch hudud
strengthen (v) => kuchaytirmoq, mustahkamlamoq
strong (adj) => kuchli, baquvvat, mustahkam
strongly (adv) => kuchli tarzda, qat'iy ravishda

ensure (v) => ta’minlamoq, ishonch hosil qilmoq, kafolatlamoq
insure (v) => sug'urtalamoq
assure (v) => ishontirmoq, ishonch bildirmoq
reassure (v) => xotirjam qilmoq, ishontirib dalda bermoq
assurance (n) => kafolat, ishontirish, ishonch
reassurance (n) => xotirjamlik beruvchi gap, dalda
surety (n) => kafil, kafolat, garov
sureness (n) => ishonchlilik, aniqlik
sure (adj) => ishonchli, aniq biladigan, shubhasiz
unsure (adj) => ishonchi yo'q, ikkilanayotgan
assured (adj) => ishonchli, o'ziga ishongan, kafolatlangan
reassuring (adj) => xotirjamlik beruvchi
sure-fire (adj) => albatta ishlaydigan, aniq muvaffaqiyatli
sure (adv) => albatta, mayli
surely (adv) => albatta, shubhasiz, axir
assuredly (adv) => shubhasiz, albatta
reassuingly (adv) => xotirjamlik beradigan tarzda

responsible (adj) => mas’uliyatli, javobgar
responsibly (adv) => ma'suliyat bilan, ma'suliyatli tarzda

cooperation (n) => hamkorlik, birgalikda ishlash
cooperator (n) => hamkor, hamkorlik qiluvchi
cooperate (v) => hamkorlik qilmoq, birgalikda ishlamoq, ko'maklashmoq
cooperative (adj) => hamkorlikka tayyor, hamkorlikdagi, yordam beradigan
uncooperative (adj) => hamkorlik qilmaydigan, qarshilik qiladigan
cooperatively (adv) => hamkorlikda, hamkorlik ruhida
uncooperatively (adv) => hamkorlik qilmasdan, istamay

mature (v) => voyaga yetmoq, kamolga yetmoq, pishib yetilmoq
maturity (n) => voyaga yetkanlik, yetuklik, to'lov muddati (moliyada)
maturation (n) => yetilish, kamolga yetish jarayoni
immaturily (n) => yetilmaganlik, bolalarcha xatti-harakat
mature (adj) => voyaga yetgan, yetuk, aqli raso, pishgan (pishloq, vino), kattalarga mo'ljallangan
immature (adj) => yetilmagan, bolalarcha
premature (adj) => muddatidan oldingi, erta
maturing (adj) => yetilib kelayotgan
maturely (adv) => yetuk tarzda, aqlli, vazmin
immaturely (adv) => bolalarcha, yetilmagan tarzda
prematurely (adv) => muddatidan oldin, vaqtidan erta


present (n) => sovg'a, hozirgi lahza
present (adj) => hozir bo'lgan, hozirgi(ayni paytdagi)
present (v) => tanishtirmoq, taqdim qilmoq, taqdim etmoq

trick (n) => hiyla, nayrang, fokus, usul
trickiness (n) => murakkablik, noziklik
trick (v) => aldamoq, laqillatmoq
tricky (adj) => murakkab, qiyin, nozik, hiylali, chalg'ituvchi
trickily (adv) => hiyla bilan, murakkab tarzda

denial (n) => inkor etish, tan olmaslik, rad etish
deny (v) => inkor etmoq, tan olmaslik, rad etmoq
deiable (adj) => inkor etish mumkin bo'lgan
undeniable (adj) => inkor etib bo'lmaydigan, shubhasiz, aniq
undeniably (adv) => inkor etib bo'lmaydigan darajada, shubhasiz

avoid (v) => qochmoq, chetlab o‘tmoq, saqlanmoq
avoidance (n) => qochish, chetlab o'tish, saqlanish
avoidable (adj) => oldini olish mumkin bo'lgan, chetlab o'tish mumkin bo'lgan
unavoidable (adj) => muqarrar, oldini olib bo'lmaydigan
unavoidably (adv) => muqarrar ravishda, oldini olib bo'lmaydigan tarzda
avoider (n) => qochuvchi, biror narsadan o'zini olib qochuvchi

compatibility (n) => moslik, mos kelish, muvofiqlik
incompatibility (n) => mos kelmaslik, nomuvofiqlik
compatibilization (n) => moslashtirish
compatibilize (v) => moslashtirmoq
compatible (adj) => mos keladigan, muvofiq, birga ishlay oladigan
incompatible (adj) => mos kelmaydigan, nomuvofiq, birga ishlay olmaydigan
compatibility-based (adj) => moslikka asoslangan
compatibly (adv) => mos ravishda, muvofiq tarzda
incompatibly (adv) => mos kelmaydigan tarzda, nomuvofiq ravishda

warning (n) => ogohlantirish, ogohlantiruvchi xabar
warn (v) => ogohlantirmoq, xabardor qilmoq, ogoh etmoq
forewarn (v) => oldindan ogohlantirmoq
warned (adj) => ogohlantirilgan
unwarned (adj) => ogohlantirilmagan
warningly (adv) => ogohlantirgan holda, ogohlantirib 

rely on => tayanmoq, ishonmoq, suyanmoq
relying on => ...ga tayanish

milestone (n) => muhim bosqich, muhim voqea, katta yutuq
milestoning (n) => muhim bosqichlarni belgilash
milestone (adj) => muhim bosqichga oid, burilish yasovchi
milestoned (adj) => muhim bosqich sifatida belgilangan

major (n) => asosiy mutaxassislik qilib o'qimooq
majority (n) => ko'pchilik, aksariyat, voyaga yetish
major (adj) => asosiy, katta, muhim
majorly (adv) => juda, katta darajada

graduate (n) => bitiruvchi
graduation (n) => bitirish, bitiruv marosimi
undergraduate (n) => bakalavr talabasi
graduate (v) => bitirmoq
graduated (adj) => darajalarga bo'lingan
graduating (adj) => bitirayotgan

experience (n) => tajriba, malaka, boshdan kechirilgan voqea
inexperience (n) => tajribasizlik, malaka yetishmasligi
experience (v) => boshdan kechirmoq, boshidan o'tkazmoq
experienced (adj) => tajribali, malakali
inexperienced (adj) => tajribasiz, malakasi yetarli bo'lmagan
experiental (adj) => tajriba orqali olingan
experientially (adv) => tajriba orqali, tajribaga asoslangan holda

requirement => talab

point => fikr, nuqta

deal (n) => kelishuv, bitim, savdo, yaxshi imkoniyat
deal (v) => shug'ullanmoq, hal qilmoq, muomala qilmoq
dealer (n) => savdogar, diler, sotuvchi

prioritize => ustuvor ahamiyat bermoq, birinchi o‘ringa qo‘ymoq, muhimligiga qarab tartiblamoq.

complex (n) => majmua, kompleks, bir-biri bilan bog'liq obyektlar to'plami
complexity (n) => murakkablik, murakkab tuzilish
complexification (n) => murakkablashtirish, murakkablashish
complexify (v) => murakkablashtirmoq
complex (adj) => murakkab, chalkash, ko'p qirrali
complexly (adv) => murakkab tarzda (narsa tuzilishiga nisbatan)

necessitation (n) => zarur qilish, majbur etish
necessitousness (n) => muhtojlik, ehtiyojmandlik
necessity (n) => zarurat, ehtiyoj, majburiylik
necessitate (v) => zarur qilmoq, majbur qilmoq, talab qilmoq
necessary (adj) => zarur, kerakli, shart bo'lgan
unnecessary (adj) => keraksiz, zarur bo'lmagan
necessitous (adj) => muhtoj, ehtiyojmand
necessitated (adj) => zarurat tufayli yuzaga kelgan, talab qilingan
necessarily (adv) => muqarrar ravishda, zarur ravishda
unnecessarily (adv) => keraksiz ravishda, ortiqcha tarzda

quite (adv) => ancha/anchagine
quite (adv) => butunlay/mutlaqo
quite (adv) => juda

agreement (n) => kelishuv, bitim, rozilik, fikr birligi
disagreement (n) => kelishmovchilik, fikrga qo'shilmaslik, rozi bo'lmaslik
agreeableness (n) => yoqimlilik, ma'qullik
disagreeableness (n) => yoqimsizlik, noxushlik
agree (v) => rozi bo'lmoq, fikriga qo'shilmoq, kelishmoq
disagree (v) => rozi bo'lmaslik, fikriga qo'shilmaslik, kelishmaslik
agreeable (adj) => yoqimli, ma'qul, rozi bo'ladigan, mos
disagreable (adj) => yoqimsiz, noxush, kelishib bo'lmaydigan
agreed (adj) => kelishilgan, rozi bo'lingan
agreeably (adv) => yoqimli tarzda, ma'qul tazda
disagreably (adv) => yoqimsiz tarzda, nouxsh tarzda

urge (n) => kuchli xohish, ichki turtki
urgency (n) => shoshilinchlik, zudlik
urge (v) => undamoq, qat'iy tavsiya qilmoq, shoshirmoq
urgent (adj) => shoshilinch, kechiktirib bo'lmaydigan
urging (adj) => undash, da'vat
urgently (adv) => shoshilinch ravishda, zudlik bilan

consideration (n) => ko'rib chiqish, o'ylab ko'rish, mulohaza, e'tibor
considerateness (n) => e'tiborlilik, boshqalarni hisobga olish
inconsiderateness (n) => e'tiborsizlik, boshqalarni hisobga olmaslik
consider (v) => ko'rib chiqmoq, o'ylab ko'rmoq, hisobga olmoq
considerable (adj) => ancha katta, sezilarli, salmoqli
considerate (adj) => e'tiborli, boshqalarning manfaatini o'ylaydigan, muloyim
inconsiderate (adj) => e'tiborsiz, boshqalarni o'ylamaydigan
considerably (adv) => ancha, sezilarli darajada
considered (adj) => puxta o'ylangan, ko'rib chiqilgan
considerately (adv) => e'tibor bilan, boshqalarni hisobga olgan holda
inconsiderately (adv) => e'tiborsiz tarzda, boshqalarni hisobga olmay

remain (v) => qolmoq, saqlanib qolmoq

once (n) => bir martalik holat yoki imkoniyat
once-over (n) => tezkor ko'zdan kechirish, yuzaki tekshiruv
once-over (v) => tezdan ko'zdan ko'chirmoq
once (adv) => bir marta, bir paytlar, bir mahal, endi ...qilgach, endi ...bo'lgach

outdated => eskirgan, zamonaviy emas, endi amalda bo‘lmagan degani.

need (n) => ehtiyoj, zarurat, kerakli narsa
needy (n) => muhtoj odamlar
neediness (n) => muhtojlik, haddan tashqari e'tibor yoki yordamga ehtiyoj
needfulness (n) => zarurlik
need (v) => kerak bo'lmoq, muhtoj bo'lmoq
needy (adj) => muhtoj, yordamga juda ehtiyojmand
needful (adj) => zarur, kerakli
needless (adj) => keraksiz, ortiqcha
unneeded (adj) => kerak bo'lmagan, keraksiz
need-based (adj) => ehtiyojga asoslangan
needfully (adv) => zarur tarzda
needlessly (adv) => keraksiz ravishda, ortiqcha tarzda

exactness (n) => aniqlik, to'g'rilik
exactitude (n) => aniqlik, puxtalik
exaction (n) => majburan undirish, o'ta og'ir talab
exact (v) => talab qilmoq, majburan olmoq, undirmoq
exact (adj) => aniq, to'g'ri, aynaan shu
exacting (adj) => juda talabchan, katta mehnat talab qiladigan
inexact (adj) => noaniq, taxminiy
exactly (adv) => aynan, aniq, huddi o'sha, aynan shunday
inexactly (adv) => noaniq tarzda

preferred (adj) => avfzal, ma'qul ko'rilgan

adjustment (n) => moslashtirish, sozlash, o'zgartirish
adjust (v) => moslashtirmoq, sozlamoq, o'zgartirib mos qilmoq
adjustable (adj) => sozlanadigan, moslashtiriladigan
adjusted (adj) => sozlangan, moslashtirilgan, o'zgartirib mos qilingan

revise => qayta ko‘rib chiqmoq, o‘zgartirmoq

advantage (n) => afzallik, ustunlik, foydali tomon
advantageous (adj) => foydali, manfaatli, qulay
advantegously (adv) => foydali tarzda, manfaatli ravishda, qulay tarzda
disadvantage (n) => kamchilik, noqulaylik, salbiy tomon
disadvantageous (adj) => noqulay, zararli, foydasiz
disadvantageously (adv) => noqulay tarzda, zararli tarzda

practical (adj) => amaliy, amaliyotga oid, amaliy jihatdan qulay, foydali
practicable (adj) => amalga oshirish mumkin bo'lgan, bajarish mumkin bo'lgan

conviction (n) => qat'iy ishonch, e'tiqod, hukm qilinish, abydor deb topilish
convincingness (n) => ishonarlilik
convince (v) => ishontirmoq, ko'ndirmoq
convinced (adj) => ishongan, amin bo'lgan
unconvinced (adj) => ishonmagan, ishonchi komil bo'lmagan
convincing (adj) => ishonarli, ishontiradigan
unconvincing (adj) => ishonarsiz, ishontirmaydigan
convincingly (adv) => ishonarli tarzda, ishontirib
unconvincingly (adv) => ishonarsiz tarzda

relevant (adj) => aloqador, tegishli, mavzuga mos, kerakli

teller (n) => aytuvchi, hikoya qiluvchi, bank xodimi (kassir)
tell (v) => aytmoq, gapirib bermoq, xabar bermoq, aytib bermoq, farqlamoq, aniqlamoq
retell (v) => qayta aytib bermoq, qayta hikoya qilmoq
telling (adj) => ta'sirli, muhim

separate (v) => ajratmoq
separate (adj) => alohida 
separately (adv) => alohida ravishda 
separation (n) => ajratish, ajralish

following (n) => quyidagilar, ergashuvchilar, tarafdorlar
follow (v) => ergashmoq, kuzatmoq, amal qimoq
following (adj) => quyidagi, keyingi

specific (n) => muayyan narsa yoki tur
specificity (n) => aniqlik, konkretlik, o'ziga xoslik darajasi
specifics (n) => aniq tafsilotlar, batafsil ma'lumotlar
specification (n) => aniq talab yoki shart, texnik tavsif
specifier (n) => aniq belgilovchi
specifiability (n) => aniq belgilash mumkinligi
specificness (n) => aniqlik, konkretlik
unspecifiability (n) => aniq belgilab bo'lmaslik
specify (v) => aniq ko'rsatmoq, belgilamoq
specific (adj) => aniq, muayyan, konkret 
unspecific (adj) => aniq bo'lmagan, umumiy
nonspecific (adj) => muayyan bir narsaga xos bo'lmagan
unspecified (adj) => aniq ko'rsatilmagan, belgilanmagan
specifable (adj) => aniq ko'rsatish yoki belgilash mumkin bo'lgan
unspecifiable (adj) => aniq belgilab bo'lmaydigan
specifically (adv) => aynan, xususan, aniq qilib
unspecifically (adv) => aniq ko'rsatmasdan
nonspecifically (adv) => muayyan narsaga xos bo'lmagan tarzda

theory (n) => nazariya
theorist (n) => nazariyachi
theorization / theorisation (n) => nazariyani ishlab chiqish, nazarishlashtirish
theorize / theorise (v) => nazariya yaratmoq, nazariy jihatdan tushuntirmoq, faraz qilmoq
theoretical (adj) => nazariy, nazariyaga oid
theoretically (adv) => nazariy jihatdan, nazariy tomondan

slightly (adv) => biroz, sal, ozgina, birozgina

survival (n) => omon qolish, tirik qolish, yashab qolish
survive (v) => tirik qolmoq, omon qolmoq
survivor (n) => omon qolgan odam

pretty (adj) => chiroyli
pretty (adv) => ancha, anchagina, juda

through (adv) => orqali, ichidan, oxirigacha
throughout (adv) => butun davomida, hamma joyida, har bir qismida

anymore (adv) => endi, bundan buyon, boshqa ... emas, endi ...emas

etc. [et cetera] => va hokazo
e.g. [exempli gratia] => masalan
i.e. [id est] => ya'ni
et al. [et alii] => va boshqalar (mualliflar)
vs. [versus] => qarshi
cf. [confer] => solishtiring
N.B. [nota bene] => diqqat qiling
P.S. [post scriptum] => qo'shimcha (xat oxirida)
a.m. [ante meridiem] => tushgacha
p.m. [post meridiem] => tushdan keyin
a.k.a. [also known as] => boshqacha nomi bilan

involvement (n) => ishtirok, jalb qilinish, aralashuv
involve (v) => jalb qilmoq, o‘z ichiga olmoq, bog‘liq bo‘lmoq
involved (adj) => jalb qilingan, aralashgan, bog'liq
uninvolved (adj) => ishtirok etmaydigan, aralashmagan

primarily (adv) => asosan, birinchi navbatda, eng avvalo degani.

success (n) => muvaffaqiyat, omad, muvaffaqiyatli odam yoki narsa
succeed (v) => muvaffaqiyatga erishmoq, o'rnini egallamoq
successful (adj) => muvaffaqiyatli
unseccessful (adj) => muvaffaqiyatsiz
successfully (adv) => muvaffaqiyatli ravishda
unsuccessfully (adv) => muvaffaqiyatsiz holda

succession (n) => ketma-ketlik, vorislik, merosxo'rlik, taxt merosi
successor (n) => vorisi, o'rniga keluvchi
predecessor (n) => o'zidan oldingi shaxs, salaf
succeed (v) => o'rnini egallamoq
successive (adj) => ketma-ket keluvchi
successively (adv) => ketma-ket

feasibility (n) => amalga oshirish mumkinligi, bajarish imkoniyati
infeasibility (n) => amalga oshirib bo'lmaslik, bajarish imkonining yo'qligi
feasible (adj) => amalga oshirish mumkin bo'lgan, bajarishning iloji bor
infeasible (adj) => amalga oshirib bo'lmaydigan, bajarishning iloji yo'q
feasibly (adv) => amalga oshirish mumkin bo'lgan tarzda

internship (n) => stajirovka, amaliyot
intern (n) => stajyor, amaliyotchi
internee (n) => qamoqqa olingan shaxs
intern (v) => stajirovkadan o'tmoq, amaliyot o'tamoq, qamoqqa olib bir joyda ushlab turmoq

plot (n) => syujet, film, serial, kitobdagi voqealar rivoji.
plot (v) => rejalashtirmoq, yashirincha reja tuzmoq.

intonation (n) => ohang, intonatsiya, tovushni to'g'ri aniqlikda chiqarish
tone (n) => ohang, ovoz sifati, ton, uslub
intoner (n) => ohang bilan o'quvchi
intonate (v) => ohang bilan o'qimoq, bir tekis ovozda aytmoq, boshlab bermoq
intonational (adj) => intonatsiyaga oid
monotone (adj) => bir xil ohangdagi, zerikarli
monotonously (adv) => bir xil ohanda, zerikarli tarzda

tension (n) => taranglik, keskinlik, zo'riqish
tensioning (n) => taranglashtirish, tarang tortish
tensioned (adj) => tarang tortilgan
tensional (adj) => taranglikka oid

consecuition (n) => ketma-ketlik
consecutive (adj) => ketma-ket, birin-ketin
consecutively (adv) => ketma-ket, birin-ketin, tartib bilan

humblity (n) => kamtarlik, tavoze, o'zining cheklanganligini tan olish
humble (v) => kamtar qilmoq, kibrini tushirmoq, o'zining ojizligi yoki chegarasini anglatmoq
humble (adj) => kamtar, tavoze'li, oddiy, dabdabali bo'lmagan
humbly (adv) => kamtarlik bilan, tavoze bilan

stranger (n) => notanish odam, begona
strangeness (n) => g'alatilik, noodatiylik
strange (adj) => g'alati, noodatiy, notanish
strangely (adv) => g'alati tarzda, ajablanarli tarzda

witness (n) => guvoh (odam), guvohlik, dalil
eyewitness (n) => ko'z bilan ko'rgan guvoh, voqea guvohi
witness (v) => guvoh bo'lmoq, ko'rmoq, guvoh sifatida imzolab tasdiqlamoq

negotiation (n) => muzokara, kelishuvga erishish uchun olib boriladigan suhbat yoki jarayon
negotiator (n) => muzokarachi, kelishuv bo'yicha muzokara olib boruvchi shaxs
negotiating (n) => muzokara olib borish
negotiability (n) => kelishish yoki o'zgartirish mumkinligi
negotiate (v) => muzokara olib bormoq, kelishuvga erishish uchun gaplashmoq
negotiable (adj) => kelishib o'zgartirish mumkin bo'lgan
non-negotiable (adj) => muhokama qilib o'zgartirib bo'lmaydigan, qat'iy
negotiated (adj) => kelishilgan, muzokara orqali hal qilingan
negotiably (adv) => muzokara orqali, kelishish mumkin bo'lgan tarzda

terrificness (n) => ajoyiblik, zo'rlik
terrific (adj) => ajoyib, zo‘r, juda yaxshi
terrifically (adv) => juda yaxshi tarzda, nihoyatda

eternity (n) => abadiyat, mangulik, juda uzoq vaqt
eternalness (n) => abadiylik
eternalize / eternalise (v) => abadiylashtirmoq, mangu qilmoq
eternal (adj) => abadiy, mangu, tugamaydigan, tinimsiz, to'xtovsiz
eternalized (adj) => abadiylashtirilgan
eternally (adv) => abadiy, mangu, doimo, tinimsiz

fossilization / fossilisation (n) => toshga aylanish, toshga aylantirish
fossil (n) => qadimgi hayvon yoki o‘simlikning yer ostida saqlanib qolgan qoldig‘i, qazilma qoldiq
fossilize / fossilise (v) => toshga aylantirmoq, toshga aylanish
fossil (adj) => qadimgi, qadimgi qoldiqqa oid
fossilized / fossilised (adj) => toshga aylangan, tosh bo'lib qolgan

tournament (n) => turnir, musobaqa

drug (n) => dori, giyohvand modda yoki dori vositasi
drug dealer (n) => giyohvand modda sotuvchisi, narkotik sotuvchi
drug (v) => giyohvand modda bilan ta'minlamoq, dori bermoq

counteract (v) => qarshi ta’sir qilmoq, ta’sirini kamaytirmoq, zararsizlantirmoq
counteractive (n) => qarshi ta'sir, qarshi harakat
counteragent (n) => qarshi ta'sir qiluvchi vosita
counteractive (adj) => qarshi ta'sir qiluvchi, ta'sirini kamaytiruvchi
counteractively (adv) => qarshi ta'sir qiladigan tarzda

hood (n) => kapyushon, boshini yopadigan qoplama
hood (v) => kapyushon bilan yopmoq
hooded (adj) => kapyushonli, kapyushon kiygan
hoodlesss (adj) => kapyushonsiz

pivotal => hal qiluvchi, juda muhim, burilish yasaydigan

intensity (n) => kuch, shiddat, keskinlik
intensification (n) => kuchayish, kuchaytirish
intensive (n) => kuchaytiruvchi so'z
intensify (v) => kuchaytirmoq, kuchaymoq, avj olmoq
intensify (v) => kuchayib bormoq
intense (adj) => kuchli, keskin, shiddatli, zo'r berib ishlaydigan, hissiyotga boy
intensive (adj) => puxta, jadal, yuqori darajada
intensified (adj) => kuchaygan, avj olgan
extensive (adj) => keng ko'lamli
intensely (adv) => kuchli, shiddat bilan, zo'r berib
intensively (adv) => jadal, puxta, yuqori darajada

dreariness (n) => ma'yuslik, xiralik, zerikarlilik
dreary (adj) => xira, ma'yus, g'amgin, zerikarli, yoqimsiz taasurot beradigan
drearly (adv) => ma'yus tarzda, zerikarli tarzda

demolition (n) => buzib tashlash, buzish ishlari, buzib tashlash jarayoni
demolish (v) => buzib tashlamoq, vayron qilmoq
demolished (adj) => buzib tashlangan, vayron qilingan

punctuality => vaqtlilik, kechikmaslik
punctual => vaqtida keladigan, kechikmaydigan, o‘z vaqtida bo‘ladigan.
punctual => vaqtida keladigan, kechikmaydigan.

plummet => keskin tushib ketmoq, juda tez pasaymoq.

wave (v) => qo‘l silkitmoq, silkitmoq, to'lqinsimon harakat qilmoq, hilpiramoq
waver (v) => ikkilanmoq, tebranmoq, dovdiramoq
wave (n) => to'lqin, qo'l silkitish
waviness (n) => to'lqinsimonlik, buklanganlik 
wavelength (n) => to'lqin uzunligi
waveband (n) => chastota diapazoni
wavy (adj) => to'lqinsimon, jingalak, egri-bugri
waveing (adj) => ikkilanayotgan, tebranayotgan
wavily (adv) => to'lqinsimon tarzda

loathing (n) => qattiq nafrat, jirkanish
loathe (v) => juda qattiq yomon ko'rmoq, jirkanmoq
loathing (adj) => qattiq nafrat, jirkanish bildiruvchi
loathingly (adv) => qattiq nafra yoki jirkanish bilan

hypocrisy (n) => ikkiyuzlamachilik, riyokorlik
hypocrite (n) => ikkiyuzlamachi, riyokor
hypocriticalness (n) => ikkiyuzlamachilik
hypocritical (adj) => ikkiyuzlamachilik, riyokor, ikkiyuzlamachilikka xos
hypocritically (adv) => ikkiyuzlamachilik bilan, riyokorona

mortification (n) => qattiq uyat, kuchli xijolat, sharmandalik
mortifier (n) => qattiq xijolatga soluvchi odam yoki narsa
mortify (v) => qattiq uyaltirmoq, sharmanda qilmoq, juda xijolatga solmoq
mortifiable (adj) => xijolatga solish mumkin bo'lgan
mortified (adj) => qattiq uyalgan, juda xijolat bo'lgan
mortifying (adj) => juda uyaltiradigan, o'ta xijolatli
mortifyingly (adv) => juda xijolatli tarzda
mortifiedly (adv) => xijolat bo'lgan holda

participle => sifatdosh. (Ya’ni fe’ldan yasalib, sifat vazifasida yoki fe’lning grammatik shakli sifatida ishlatiladigan shakl.)

devastation (n) => vayronagarchilik, xarobachilik, xarobalik, qattiq qayg'u, ruhiy ezilish
devastator (n) => vayron qiluvchi
devastate (v) => vayron qilmoq, xarob etmoq, qattiq iztirobga solmoq, juda qattiq ruhiy ta'sir qilmoq
devastated (adj) => qattiq xafa bo'lgan, ruhan ezilgan, vayron bo'lgan
devastating (adj) => vayron qiluvchi, halokatli, ruhan ezuvchi
devastatingly (adv) => halokatli darajada, juda kuchli

captivation (n) => maftun bo'lish, rom bo'lish, kuchli qiziqish
captivate (v) => o'ziga maftun qilmoq, o'ziga rom etmoq, e'tiborini butunlay tortmoq
captivating (adj) => juda qiziqarli, o'ziga tortadigan, maftunkor, e'tiborni butunlay tortadigan
captivated (adj) => maftun bo'lgan, rom bo'lgan, butunlay qiziqib qolgan
captivatingly (adv) => o'ziga tortadigan tarzda, maftunkor tarzda

blandness (n) => ta'msizlik, bemazalik, zerikarlilik, jonsizlik
bland (adj) => ta’msiz, bemaza, zerikarli, jonsiz, qiziqarsiz
blandly (adv) => zerikarli tarzda, jonsiz tarzda, ifodasiz tarzda

rampage => g‘azab bilan nazoratni yo‘qotib, vayronagarchilik yoki zo‘ravonlik qilib yurish

ravage => qattiq vayron qilmoq, xarob qilmoq, katta zarar yetkazmoq

heed (n) => e'tibor, quloq solish
heedlessness (n) => e'tiborsizlik
heed (v) => e'tibor bermoq, quloq solmoq, gapiga amal qimoq
heedless (adj) => e'tiborsiz, ogohlantirishga quloq solmaydigan
heedlessly (adv) => e'tiborsiz tarzda

subduer (n) => bo'ysindiruvchi
subdue (v) => bo‘ysundirmoq, taslim qilmoq, jilovlamoq
subdue (v) => bosmoq, susaytirmoq (his-tuyg'uni)
subdued (adj) => bosiq, sust, past ovozli, xira, yumshoq
subduable (adj) => bo'ysundirsa bo'ladigan

vault (n) => seyf, pul yoki qimmatbaho narsalar saqlanadigan joy yoki xona

burial (n) => dafn, ko‘mish, dafn marosimi
burier (n) => dafn qiluvchi, ko'muvchi
bury (v) => dafn qilmoq, ko'mmoq
buried (adj) => dafn qilingan, ko'milgan, ko'mib qo'yilgan

glance (n) => tez nazar, bir qur qarash
glance (v) => bir qur ko'z tashlamoq, tez qarab chiqmoq
glancing (adj) => sirpanib o'tuvchi, urib o'tadigan
glancingly (adv) => sirpanib, yuzaki

dullness (n) => zerikarlilik, xiralik, o'tmaslik, fahmning sustligi
dull (v) => og'riqni susaytirmoq, o'tmaslashtirmoq
dull (adj) => zerikarli, qiziqarsiz, xira, o'tmas, fahmi sust
dully (adv) => zerikarli tarzda, xira tarzda

ex (n) => sobiq sevgili yoki turmush o'rtoq
ex-wife / ex-husband (n) => sobiq xotin / sobiq er
ex-boyfriend / ex-girlfriend (n) => sobiq yigit / sobiq qiz do'st
ex- (adj) => sobiq

impertinence (n) => betgachopar, surbetlik, odobsizlik, haddidan oshish
pertinent (adj) => muhim, mavzuga tegishli, o'rinli
impertinent (adj) => hurmatsiz, betga chopar, odobsiz, o'rinsiz gapiradigan, haddidan oshgan, mavzuga aloqasi yo'q
pertinently (adv) => mavzuga mos tarzda, o'rinli
impertinently (adv) => surbetlarcha, odobsizlarcha, hurmatsizlik bilan

desert (n) => munosib mukofot yoki jazo
deserve (v) => loyiq bo‘lmoq, haqli bo‘lmoq
deserving (adj) => loyiq, yordamga munosib
deserved (adj) => munosib, haqli
undeserved (adj) => nohaq, loyiq bo'lmagan
well-deserved (adj) => to'liq loyiq, juda munosib
deservedly (adv) => haqli ravishda, adolat bilan
undeservedly (adv) => nohaq, loyiq bo'lmagan holda

gladness (n) => xursandchilik, quvonch
glad (adj) => xursand, quvongan, mamnun
gladly (adv) => mamnuniyat bilan, mamnun holda, mamnun bo'lib

wonder (n) => hayrat, hayratlanish, mo'jiza, hayratlanarli narsa
wonderment (n) => hayrat, hayratga tushish
wonderland (n) => ajoyibotlar mamalakati, sehrli dunyo
wonder (v) => qiziqmoq, o'ylamoq, hayron bo'lmoq, hayratlanmoq
wonderful (adj) => ajoyib, a'lo, ta'rifga sig'maydigan
wondrous (adj) => ajoyib, hayratlanarli
wonderfully (adv) => ajoyib darajada, juda yaxshi
wondrously (adv) => hayratlanarli darajada

companion (n) => hamroh, yo‘ldosh, sherik, birga yuradigan yoki vaqt o'tkazadigan odam
companionship (n) => hamrohlik, do'stona yaqinlik, hamroh bo'lish
companionable (adj) => hamroh bo'lishga yoqimli, suhbatga yaxshi
companionably (adv) => hamrohona, do'stona tarzda

appeasement (n) => tinchlantirish, ko'nglini olish, yon berish
appeaser (n) => boshqalarni tinchlantirishga yoki rozi qilishga urinuvchi, yon beruvchi
appease (v) => tinchlantirmoq, ko'nglini olmoq, g'azabini bosmoq, rozi qilmoq
appeasing (adj) => tinchlantiruvchi, ko'ngilni oluvchi
appeased (adj) => tinchlangan, ko'ngli joyiga tushgan
appeasable (adj) => tinchlantirish mumkin bo'lgan, ko'nglini olish mumkin bo'lgan
appeasingly (adv) => tinchlantiruvchi tarzda, ko'nglini olgan holda

abnormality (n) => g'ayritabiiylik, me'yordan chetga chiqish
abnormal (adj) => g'ayritabiiy, me'yordan tashqari, odatdagidan chetga chiqqan
abnormally (adv) => g'ayritabiiy tarzda, me'yordan tashqari ravishda

normal (n) => odatiy yoki me'yoriy holat, me'yor
normality (n) => me'yoriylik, odatiylik
normalization (n) => me'yorlashtirish, normallashtirish
normalize (v) => me'yorlashtirmoq, normallashtirmoq
normalized (adj) => me'yorlashtirilgan, normal holatga keltirilgan
normal (adj) => normal, me'yoriy, normal, g'ayritabiiy bo'lmagan
normally (adv) => odatda, normal tarzda

breast (n) => ko‘krak, ayol ko‘kragi, ko'krak bezi
breastfeeding (n) => emizish, bolani emizish
breast (v) => qarshi turmoq, mardona qarshilamoq, ko'krak bilan qarshilamoq
breastfeed (v) => emizmoq, bolani emizmoq

sun (n) => quyosh
sunscreen (n) => quyoshdan himoya kremi
sunlight (n) => quyosh nuri
sunshine (n) => quyosh nuri, quyoshli ob-havo
sunrise (n) => quyosh chiqishi, tong shafaqi
sunset (n) => quyosh botishi, shom
sunburn (n) => quyoshdan kuyish
sunbath (n) => quyosh vannasi, quyoshda toblanish
suntan (n) => qoraygan teri, toblangan rang
sunbather (n) => quyoshda toblanuvchi
sunbathing (n) => quyoshda toblanish
sunbathe (v) => quyoshda toblanmoq
sun (v) => quyoshda isinmoq, quyoshga yoymoq
sunny (adj) => quyoshli, ochiq
sunburnt / sunburned (adj) => quyoshdan kuygan
suntanned (adj) => quyoshdan qoraygan

slender => ozg‘in, ingichka, nozik qomatli.

sluggish => sust, lanj, lohas, sekin harakat qiladigan.

hormone (n) => gormon
hormonal (adj) => gormonal, gormolarga oid
hormone-related (adj) => gormon bilan bog'liq
hormonally (adv) => gormonal jihatdan, gormonlar orqali

pubescent => balog‘atga yetayotgan

attic (n) => chordoq, tom ostidagi xona yoki joy
attic (adj) => chordoqqa oid, tom ostidagi
atticky (adj) => chordoqqa o'xshash, chordoqsimon

puberty => balog‘at davri, jinsiy yetilish davri.

harmony (n) => uyg‘unlik, hamjihatlik, totuvlik
disharmony (n) => uyg'unsizlik, kelishmovchilik, nomutanosiblik
harmonization / harmonisation (n) => uyg'unlashtirish, muvofiqlashtirish
harmonize / harmonise (v) => uyg'unlashtirmoq, uyg'unlashmoq
harmonious (adj) => uyg'un, hamjihat, totuv
disharmonious (adj) => uyg'un bo'lmagan, kelishmovchilikdagi
harmoniously (adv) => uyg'un tarzad, hamjihatlik bilan

mope (n) => tushkun holat, xafa bo'lib yurish
moper (n) => tushkun yuradigan odam
mopiness (n) => tushkunlik, xomushlik
mope (v) => tushkun yurmoq, xafa bo'lib, hech narsa qilmay yurmoq
mopy (adj) => tushkun, xomush
mopily (adv) => tushkun tarzda

destiny (n) => taqdir, qismat, peshona
destination (n) => borish joyi, manzil, yetib boriladigan joy
destine (v) => taqdir qilmoq, m'ljallab qo'ymoq
destined (adj) => taqdirda bitilgan, mo'ljallangan

suite (n) => xonalar to'plami (mexmonxonadagi lyuks xona), mebellar to'plami, dasturlar to'plami
suite (n) => o'zaro bog'liq dasturlar to'plami (kompyuterda: Microsoft Office)
suite (n) => hamrohlar, ko'chib yuruvchilar

honeymoon (n) => asal oyi, nikohdan keyingi sayohat yoki dam olish davri
honeymooner (n) => asal oyini o'tkazayotgan yangi turmush qurgan kishi
honeymoon (v) => asal oyini o'tkazmoq

requisition => rasmiy, hujjatli talabnoma

requisition => rasmiy ravishda talab qilmoq / talabnoma orqali so‘ramoq.

beneficence (n) => yaxshilik qilish, xayrixohlik, saxovat, boshqalarga foyda keltirish
beneficent (adj) => yaxshilik qiluvchi, boshqalarga foyda keltiruvchi, xayrixoh, saxovatli
beneficently (adv) => yaxshilik qilib foyda keltirgan holda, xayrixohlik bilan

fatherhood (n) => otalik (ota bo'lish holati)
motherhood (n) => onalik (ona bo'lish holati)
parenthood (n) => ota-onalik
childhood (n) => bolalik
boyhood (n) => o'g'il bolalik davri
girlhood (n) => qizlik davri

directorship (n) => direktorlik lavozimmi, direktorlik muddati
director (n) => direktor, boshqaruvchi, rejissiyor
directorate (n) => boshqarma, direktorlik kengashi
direction (n) => yo'nalish, boshqaruv, rahbarlik, rejissiyorlik
directions (n) => yo'l-yo'riq, ko'rsatma, yo'l ko'rsatish
directive (n) => rasmiy ko'rsatma, direktiva
directory (n) => ma'lumotnoma, ro'yxat
directness (n) => ochiqlik, to'g'ridan-to'g'rilik
direct (v) => yo'naltirmoq, boshqarmoq, yo'l ko'rsatmoq, buyruq bermoq, rejissiyorlik qilmoq
redirect (v) => boshqa tomonga yo'naltirmoq
misdirect (v) => noto'g'ri yo'naltirmoq
direct (adj) => to'g'ridan-to'g'ri, bevosita, ochiq, aniq
indirect (adj) => egri, bilvosita
directional (adj) => yo'nalishga oid
directly (adv) => to'g'ridan-to'g'ri, bevosita, darhol
indirectly (adv) => bilvosita, egri yo'l bilan

embark (v) => boshlamoq, kirishmoq, safarga chiqmoq
embarktation (n) => safarga chiqish, biror ishga yoki jarayonga kirishish

twofold (adj) => ikki baravar, ikki hissa, ikki tomonlama
twofold (adv) => ikki baravar, ikki hissa

twig (n) => yosh shoxcha, ingichka shox
twig (v) => tushunib yetmoq, anglab qolmoq
twiggy (adj) => ingichka shoxchalarga o'xshash, novdasimon

amalgam (n) => aralashma, qorishma, birlashgan narsa
amalgamation (n) => birlashish, qo'shilish, bir necha narsaning yagona narsaga aylanishi
amalgamate (v) => birlashtirmoq, qo'shmoq, bir butunga aylantirmoq
amalgamative (adj) => birlashtiruvchi, qo'shuvchi
amalgamatively (adv) => birlashtiruvchi tarzda

ease (n) => yengillik, xotirjamlik, qulaylik, qiyinchiliklarning kamayishi
ease (v) => yengillashtirmoq, kamaytirmoq, yengil qilmoq, tinchlantirmoq
easy (adj) => oson, yengil, qiynalmaydigan, qulay
easily (adv) => osonlik bilan, osongina, qiynalmasdan, bemalol

nonsense (n) => be'mani gap, safsata, ma'nosiz gap, ahmoqona fikr
nonsensicality (n) => be'manilik, mantiqsizlik
nonsenser (n) => bema'ni gapiradigan odam
nonsensical (adj) => be'mani, mantiqsiz, ma'nosiz
nonsensically (adv) => be'manilik bilan, mantiqsiz tarzda

pack => bitta pachka / qadoq

fail (n) => muvaffaqiyatsizlik
failure (n) => muvaffaqiyatsizlik, ishdan chiqish, buzilish, omadsiz odam
failing (n) => kamchilik, nuqson
fail-safe (n) => xavfsizlik mexanizmi
fail (v) => muvaffaqiyatsizlikka uchramoq, imtihondan yiqilmoq, ishlamay qolmoq, hafsalasini pir qilmoq
failed (adj) => muvaffaqiyatsiz, amalga oshmagan
failing (adj) => pasayayotgan, susayayotgan
fail-safe (adj) => ishonchli, buzilganda xavfsiz

drain (n) => drenaj, suv chiqadigan joy yoki quvur, kuch yoki resurslarning kamayishi
drainer (n) => suyuqlikni chiqaruvchi moslama, drenaj moslamasi
drainage (n) => drenaj, suvni chiqarish tizimi
drain (v) => suyuqlikni chiqarib yubormoq, kuchini tugatmoq, resurslarni kamaytirmoq
drainable (adj) => suyuqligini chiqarish mumkin bo'lgan
drained (adj) => holdan toygan, butunlay charchagan
draining (adj) => holdan toydiradigan, kuchini oladigan

melter (n) => erituvchi, eritish qurilmasi
meltdown (n) => erib ketish, jiddiy izdan chiqish
melting (n) => erish, erish jarayoni
remelting (n) => qayta eritish
melt (v) => erimoq, eritmoq
remelt (v) => qayta eritmoq, qayta erimoq
meltable (adj) => eritish mumkin bo'lgan, eriydigan
melting (adj) => eriyotgan, erib ketadigan
melted (adj) => erigan

fledging (n) => hali yosh, uchishni o'rganayotgan qush, yosh qush
fledge (v) => pat chiqarmoq, uchishga tayyor bo'lmoq
fledged (adj) => patlari chiqqan, uchishga tayyor
fledging (adj) => yangi rivojlanayotgan, hali tajribasiz

pack => joylamoq, yig‘moq, qadoqlamoq

demoralization (n) => ruhiy tushkunlik, ruhiyatning tushishi, umidsizlanish
demoralize (v) => ruhiyatini tushirmoq, umidsizlantirmoq, ruhini sindirmoq
demoralized (adj) => ruhan tushkun, umidsizlangan, ruhi singan
demoralizing (adj) => ruhiyatni tushiradigan, umidsizlantiradigan
demoralizingly (adv) => ruhiyatni tushiradigan tarzda

lion (n) => sher
leonine (adj) => sherga xos, sherga o'xshash
leioninely (adv) => sherga xos tarzda

contention (n) => bahs, munozara, da'vo, fikr, raqobat
contender (n) => da'vogar, g'alaba uchun kurashayotgan ishtirokchi
conteniousness (n) => bahsga moyillik, nizoli bo'lish
contend (v) => bellashmoq, raqobatlashmoq, kurashmoq, da'vo qilmoq, ta'kidlamoq
contentious (adj) => bahsli, munozarali, janjalkash
contentiously (adv) => bahsli tarzda, janjalkashlik bilan

preppy => klassik, ozoda va badavlatlar uslubiga xos.

whim (n) => injiqlik, to'satdan paydo bo'lgan xohish, havas
whimsy (n) => o'ynoqilik, g'alati xayol, o'ynoqi, g'alati narsa
whimsicality (n) => g'alatilik, o'ynoqilik
whimsical (adj) => g'ayrioddiy, xayoliy, o'ynoqi, o'zgaruvchan, injiq
whimsically (adv) => o'ynoqi tarzda, g'alati usulda

rakish => o‘ziga ishongan, jozibali, biroz ayolparast/yengiltak
rakishness => ayollarga xushomad qiladigan, jozibali va biroz yengiltak erkaklarga xos xulq-atvor.

nondescript (n) => o'ziga xosligi yo'q odam yoki narsa
nondescriptness (n) => ajralib turmaslik, o'ziga xoslikning yo'qligi
nondescript (adj) => ko'zga tashlanmaydigan, o'ziga xosligi yo'q, oddiy, ajralib turmaydigan
nondescriptly (adv) => ajralib turmaydigan tarzda

kid (n) => bola, yosh bola, echki bolasi
kiddie / kiddy (n) => kichkina bola
kiddo (n) => bolakay, bolajon
kidder (n) => hazillashadigan odam
kid (v) => hazillashmoq, aldab hazil qilmoq
kiddish (adj) => boalarcha, bolaga xos
kiddingly (adv) => hazil tariqasida, hazillashib

lie (n) => yolg'on
liar (n) => yolg'onchi
lying (n) => yolg'on gapirish
lie (v) => yolg'on gapirmoq, yolg'on aytmoq
lying (adj) => yolg'on gapirayotgan

tear (n) => ko'z yoshi, yirtiq
teardrop (n) => ko'z yoshi tomchisi

smash => qattiq urib sindirmoq / chil-chil qilmoq

smithereens => juda mayda bo‘laklar, chil-chil

dither (n) => ikkilanish, qarorsizlik, bir qarorga kela olmaslik
ditherer (n) => ko'p ikkilanadigan odam, qaror qabul qilishda qiynaladigan odam
dither (v) => ikkilanmoq, bir qarorga kela olmay turmoq, nima qilishni bilmay qolmoq

aspect (n) => jihat, tomon, qirra, nuqtayi nazar, ko'rinish, tashqi kifoya

herein (adv) => ushbu hujjatda, makun hujjatda
hereinafter (adv) => bugundan keyin, keyingi o'rinlarda
hereinabove (adv) => yuqorida aytib o‘tilgan, yuqorida keltirilgan
hereinbelow (adv) => quyida ayitb o'tilgan, quyida keltirilgan
hereunder (adv) => quyida, quyida keltirilgan
hereof (adv) => ushbu hujjatning, mazkur kujjatga oid
hereto (adv) => ushbu hujjatga, mazkur hujjatga
hereby (adv) => shu orqali, mazkur hujjat bilan
herewith (adv) => shu bilan, ushbu hujjat bilan birga
heretofore (adv) => shu paytgacha, bundan oldin
therein (adv) => unda, o'sha hujjatda
thereof (adv) => uning, o'shaning
thereto (adv) => unga, o'shanga
thereby (adv) => shu orqali, natijada
thereunder (adv) => uning ostida, shu asosda

gorgeousness (n) => ajoyib go'zallik, ko'zni qamashtiruvchi chiroy
gorgeous (adj) => ajoyib go'zal, juda chiroyli, ko'zni qamashtiradigan, juda yaxshi, a'lo
gorgeously (adv) => ajoyib go'zal tarzda, ko'zni qamashtiradigan darajada

contrary (n) => teskarisi, aksi
contrariness (n) => qarama-qarshilik, o'jarlik
contradiction (n) => zidlik, ziddiyat, inkor
contravention (n) => buzish, zid kelish
contradict (v) => zid bo'lmoq, inkor qilmoq, rad etmoq
contravene (v) => qonun qoidani buzmoq, zid kelmoq
contrary (adj) => qarama-qarshi, zid, teskari, o'jar, qaysar
contradictory (adj) => bir-biriga zid, ziddiyatli
contrarily (adv) => teskari tarzda, o'jarlik bilan
contradictorily (adv) => ziddiyatli tarzda

chase (n) => quvish, ta'qib
chaser (n) => quvuvchi, ta'qib qiluvchi
chase (v) => quvmoq, ortidan quvmoq, quvib bormoq
chased (adj) => quvilgan, ta'qib qilingan

gamble — qimor o‘ynamoq; tavakkal qilmoq

fool (n) => ahmoq, tentak
foolishness (n) => ahmoqlik, nodonlik, o'ylamaslik
fool (v) => aldamoq, laqillatmoq
foolish (adj) => ahmoqona, nodonlarcha, o'ylamasdan qilingan
foolishly (adv) => ahmoqona tarzda, nodonlarcha, o'ylamay

envelope (n) => konvert, o'ram yoki qobiq
envelop (v) => o'rab olmoq, qamrab olmoq

doom (n) => halokat, muqarrar yomon oqibat, mahkumlik
doomedness (n) => halokatga mahkumlik
doom (v) => muqarrar yomon oqibatga olib kelmoq, barbod bo'lishiga sabab bo'lmoq
doomed (adj) => halokatga mahkum, muvaffaqiyatsizlikka mahkum

delusion (n) => noto'g'ri ishonch, asossiz ishonch, haqiqatga mos kelmaydigan qat'iy qarash
delude (v) => o'zini aldamoq, birovni noto'g'ri ishontirmoq
deluded (adj) => o'zini aldagan, noto'g'ri ishonchga ega
delusional (adj) => noto'g'ri ishonchga asoslangan, haqiqatni noto'g'ri qabul qiladigan
delusively (adv) => aldamchi tarzda, noto'g'ri tasavvur uyg'otadigan

side => tomon, yon, taraf

wound (n) => yara, jarohat, ruhiy yara
wound (v) => yaralamoq, jarohatlamoq
wounded (adj) => yaralangan, yarador, ruhiy zarar ko'rgan
unwounded (adj) => yaralanmagan, jarohatlanmagan
woundless (adj) => yarasiz, jarohatsiz

lightener (n) => yengillashtiruvchi yoki ochartiruvchi vosita
lightening (n) => yengillashtirish, ochartirish, yorug'lashtirish
lighten (v) => yengillashtirmoq, yegnillashmoq, ochartirmoq, yorug'lashtiroq
lightened (adj) => yengillashgan, ochargan

ultimatum (n) => qat'iy oxirgi talab, so'nggi shart
ultimate (adj) => eng so'nggi, yakuniy, eng oliy, eng muhim
ultimately (adv) => oxir-oqibat, yakunda, pirovardida

squirm (n) => bezovta qimir-qimir, tipirchilash
squirmer (n) => bezovta qimirlaydigan odam yoki narsa
squirm (v) => bezovta bo'lib qimirlamoq, o'zini u yoq-bu yoqqa tashlamoq
squirmy (adj) => bezovta qimirlaydigan, tinib-tinchimaydigan
squirmingly (adv) => bezovta qimirlagan holda

threshold (n) => bo‘sag‘a, chegara, me’yor, chegaraviy daraja

distractibility (n) => tez chalg'ish xususiyati, diqqatning oson bo'linish
distraction (n) => chalg'ituvchi narsa, diqqatning bo'linishi
distract (v) => chalg‘itmoq, diqqatini bo‘lmoq
distracted (adj) => chalg'igan, diqqati bo'lingan
distracting (adj) => chalg'ituvchi, diqqatni bo'luvchi
distractedly (adv) => chalg'igan holda, diqqati bo'lingan holda

chronicity (n) => surunkalilik, uzoq davom etish
chronic (adj) => surunkali, uzoq davom etadigan, doimiy
chronically (adv) => surunkali tarzda, doimiy ravishda

gridlock (n) => tirbandlik, hech narsa qilib bo'lmaydigan qotib qolgan holat
tailback (n) => uzun mashinalar qatori
stop-and-go (n) => to'xtab-to'xtab harakatlanish
standstill (n) => to'liq to'xtash
bottleneck (n) => tor joy, to'siq
congestion (n) => gavjumlik, to'planib qolish
traffic jam (n) => yo'ldagi tirbandlik
gridlock (v) => butunlay to'xtatib qo'ymoq, tirband qilmoq
gridlocked (adj) => tirband bo'lib qolgan, qotib qolgan


arrive (v) => kelmoq, yetib kelmoq
arrival (n) => kelish, yetib kelish
arrived (adj) => yetib kelgan, kelgan
rearrive (v) => qayta kelmoq, yana yetib kelmoq
rearrival (n) => qayta yetib kelish, yana yetib kelish

stagger (n) => gandiraklab yurish, beqaror qadam
staggerer (n) => gandiraklab yuradigan odam
stagger (v) => gandiraklab yurmoq, gandiraklatmoq, beqaror qadam tashlamoq
staggered (adj) => gandiraklagan, hayratdan karaxt bo'lgan
staggering (adj) => hayratlanarli darajada katta, juda katta, nihoyatda katta
staggeringly (adv) => hayratlanarli darajada, nihoyatda

arm (n) => qo'l, bilak
armful (n) => qo‘lga quchoqlab sig‘adigan miqdor, bir quchoq, bir dasta
arm (v) => qurollantirmoq, qurol bilan ta'minlamoq
armed (adj) => qurollangan

retort => birovning gapiga keskin yoki tezda javob qaytarmoq, ayniqsa bahsda.

batrayer (n) => xiyonat qiluvchi, sotqin
betrayal (n) => xiyonat, sotqinlik, ishonchni oqlamaslik
betray (v) => xiyonat qilmoq, ishonchni oqlamaslik, sotmoq, sirni oshkor qilmoq
betrayed (adj) => xiyonat qilingan, ishonchi oqlamagan, sotilgan

ferry (n) => parom, odamlar yoki transport vositalarini suv orqali tashuvchi kema
ferry (v) => paromda tashimoq, suv orqali olib o'tmoq

pier => pristan, suv ustiga chiqib turgan yo‘lak

dizziness (n) => bosh aylanishi
dizzy (adj) => boshi aylangan, boshi aylanayotgan, bosh aylanishini his qilayotgan
dizzily (adv) => bosh aylangan holda, bosh aylanishi bilan

accompaniment (n) => hamrohlik, jo'rlik, musiqa jo'rligi
accompany (v) => hamroh bo‘lmoq, birga bormoq, kuzatib bormoq.
accompanist (n) => jo'r bo'lib chaluvchi musiqachi, hamroh, musiqachi
accompanied (adj) => hamroh bo'lgan, kuzatilgan, jo'r bo'lgan

desperation (n) => umidsizlik, chorasizlik, tang ahvol
desperado (n) => hech narsadan qaytmaydigan, jinoyatchi odam
desperate (adj) => umidsiz, chorasiz, juda qattiq muhtoj, o'ta xavfli va keskin
despairing (adj) => umidsizlikka tushgan, ruhi cho'kkan
desperately (adv) => umidsizlik bilan, juda qattiq, o'ta jarajada
despairingly (adv) => umidsizlik bilan

cleverness (n) => aql-zakovat, ziyraklik, topqirlik
clever (adj) => aqlli, ziyrak, topqir, mohir
cleverly (adv) => aqlli tarzda, mohirona, ustalik bilan

swarm (n) => to'da, ko'p sonli guruh
swarm (v) => to'dalanib uchmoq, yopirilib kelmoq, to'planib kelmoq, odamga to'lib ketmoq
sworn (adj) => qasam ichgan, qasamyod qilgan
swarmy (adj) => to'da bo'lib yuradigan
swarming (adj) => to'lib-toshgan, ko'p sonli, to'dalanayotgan

electrification (n) => elektrlashtirish, elektr energiyasiga o'tkazish
electrify (v) => elektrlashtirmoq, elektr energiyasiga o'tkazmoq
electrified (adj) => elektrlashtirilgan, elektr energiyasiga o'tkazilgan
electrifying (adj) => hayajonga soluvchi, juda jo'shqin

demonetization (n) => monetizatsiyani o'chirish, daromad olish imkoniyatining olib tashlanishi
demonitize (v) => monetizatsiyani o'chirmoq, daromad olish imkoniyatini olib tashlamoq
demonetized (adj) => monetizatsiyasi o'chirilgan, daromat olish imkoniyati olib tashlangan

aggrandizement (n) => haddan tashqari ulug'lash, mavqeini oshirish, o'zini yoki biror narsani kattalashtirib ko'rsatish
aggrandizer (n) => o'zini yoki boshqasini haddan tashqari ulug'lovchi shaxs
aggrandize (v) => haddan tashqari ulug'lamoq, kattalashtirib ko'rsatmoq, mavqeini yoki ahamiyatini oshirmoq
aggrandized (adj) => ulug'langan, kattalashtirib ko'rsatilgan, mavqei oshirilgan
aggrandizing (adj) => ulug'lovchi, o'z mavqeini oshiruvchi, kattalashtirib ko'rsatuvchi

megalomania (n) => o‘zini haddan tashqari buyuk deb bilish
megalomaniac (n) => o‘zini haddan tashqari buyuk deb biladigan odam 
megalomaniacal (adj) => o‘zini haddan tashqari buyuk deb biladigan

evolution (n) => evolyutsiya, tadrijiy rivojlanish, asta-sekin o'zgarish
evolve (v) => rivojlanmoq, asta-sekin o'zgarib bormoq, evolyutsiyaga uchramoq, ishlab chiqmoq (g'oya, reja)
coevolve (v) => birga evolyutsiyalanmoq
evolving (adj) => rivojlanib borayotgan, o'zgarib turuvchi
evolved (adj) => rivojlangan, takomillashgan
evolutive (adj) => evolyutsion
evolutionarily (adv) => evolyutsion jihatdan, tadrijiy yo'l bilan

prejudices => oldindan shakllangan noto‘g‘ri qarashlar, xurofotlar, biryoqlama qarashlar 

thank (n) => raxmat, minnatdorchilik
thanklessness (n) => minnatdorchiliksiz
thankfulness (n) => minnatdorlik, shukronalik
thank (v) => minnatdorlik bildirmoq, raxmat aytmoq
thankful (adj) => minnatdor, shukronali
thankless (adj) => minnatdorchilik bildirmaydigan, qadrsiz
thankfully (adv) => xayriyatki, minnatdorlik bilan
thanklessly (adv) => minnatdorchiliksiz


shortcut => qisqa yo‘l, ko‘chma ma’noda ishni tezroq yoki osonroq bajarish usuli.

shitty => juda yomon, sifatsiz, rasvo, be'maza.

home (n) => uy, xonadon, vatan
homie (n) => yaqin do'st, og'ayni, qadrdon
homemaker (n) => uy bekasi, uy-ro'zg'or bilan shug'ullanuvchi kishi
homemaking (n) => uy-ro'zg'or yuritish
hometown (n) => tug‘ilib o‘sgan shahar yoki joy, ona shahar
homemade (adj) => uyda tayyorlangan, uy sharoitida qilingan, qo'lda yasalgan
home-grown (adj) => uyda yoki o'z yerida yetishtirilgan, mahalliy

vainty (n) => manmanlik, o'ziga bino qo'yish, behuda faxrlanish
vain (adj) => behuda, samarasiz, natijasiz, o'ziga bino qo'ygan, manman
vainly (adv) => behuda, natijasiz tarzda, o'ziga bino qo'yib

striving (n) => intilish
striver (n) => intiluvchi, maqsadga erishishga qattiq harakat qiluvchi
strive (v) => intilmoq, bor kuchi bilan harakat qilmoq
striving (adj) => intilayotgan
strivingly (adv) => intilib, bor kuchi bilan

rook => qarg‘asimon qush

rook => ladya (shaxmatdagi dona) ♟

choke (n) => bo'g'ilish, bo'g'uvchi holat
choker (n) => bo'g'uvchi narsa yoki shaxs, bo'yinbog', choker
choke (v) => bo‘g‘moq, bo‘g‘ilib qolmoq
choky (adj) => bo'g'uvchi, tiqilib qolishga moyil

intention (n) => niyat, maqsad
intentionality (n) => maqsadlilik, ataylab qilinganlik
intend (v) => niyat qilmoq, mo'ljallamoq, nazarda tutmoq
intentional (adj) => ataylab qilingan, qasddan
unintentional (adj) => ataylab bo'lmagan, tasodifiy
intended (adj) => mo'ljallangan, rejalashtirilgan
intent (adj) => astoydil berilgan, qat'iy
well-intentioned (adj) => yaxshi niyatda qilingan
intentionally (adv) => ataylab, qasddan, bila turib
unintentionally (adv) => ataylab emas, beixtiyor, bilmasdan
intently (adv) => intently (adv) => diqqat bilan, astoydil, tikilib

fishbone (n) => baliq suyagi, baliq skeleti

deficit (n) => kamomad, yetishmovchilik, zarar

dogma (n) => qat'iy qarash, shubhasiz haqiqat deb qabul qilinadigan fikr
dogmatization (n) => biror fikrni mutlaq haqiqatga aylantirish, qat'iylashtirish
dogmatize (v) => biror fikrni mutlaq haqiqat sifatida ilgari surmoq; o‘z qarashini qat’iy va shubhasiz to‘g‘ri deb ko'rsatmoq
dogmatic (adj) => o'z fikrini mutlaq to'g'ri deb biladigan, murosasiz
dogmatically (adv) => o'z fikrini mutlaq to'g'ri deb hisoblab, murosasiz tarzda

filter (n) => filtr, filtrlovchi vosita
filtration (n) => filtrlash, suzish
filter (v) => filtrlash, suzmoq
filtered (adj) => filtrlangan, suzilgan
filterable (adj) => filtrlash mumkin bo'lgan

bear (n) => ayiq
bear (v) => chidamoq, bardosh bermoq, toqat qilmoq, ko'tarmoq, yukni ko'tarib  turmoq, boshdan kechirmoq, boshiga tushgan narsani ko'tarmoq, tug'moq, farzand ko'rmoq
bearable (adj) => chidasa bo‘ladigan, bardosh bersa bo'ladigan
unbearable (adj) => chidab bo'lmaydigan, toqat qilib bo‘lmaydigan, juda og‘ir
unbearably (adv) => chidab bo'lmas darajada

work (n) => ish, mehnat, faoliyat, vazifa, asar (ijodiy ish), ish joyi
work (v) => ishlamoq, mehnat qilmoq, ishlamoq
worker (n) => ishchi, xodim, mehnatkash
workplace (n) => ish joyi, ishxona, ishlanadigan joy
workmate (n) => ishdagi sherik, hamkasb
workshop (n) => ustaxona, seminar yoki amaliy mashg'ulot
workload (n) => ish hajmi, ish yuklamasi
workforce (n) => ishchi kuchi, xodimlar tarkibi
workday (n) => ish kuni
workable (adj) => ishlaydigan, amalga oshirish mumkin bo'lgan
workability (n) => ishlash imkoniyati, amalga oshirish mumkinlgi
workaholic (n) => ishga mukkasidan ketgan odam, ishparast
overwork (n) => ortiqcha ish
overwork (v) => ortiqcha ishlamoq
underwork (n) => kam ish
underwork (v) => yetarli ishlamaslik

postpone (v) => kechiktirmoq, keyinga qoldirmoq

broom (n) => supurgi
broomstick (n) => supurgi tayoqchasi
broom (v) => supurmoq, supurib tozalamoq

stroke (n) => insult, silash yoki erkalash, zarba, chiziq yoki bo'yoq izi
stroke (v) => silamoq, urmoq, chiziq tortmoq, eshkak eshmoq

extirpation (n) => ildizi bilan yo'q qilish, butunlay olib tashlash
extirpator (n) => ildizi bilan yo'q qiluvchi
extirpate (v) => ildizi bilan butunlay yo‘q qilmoq
extirpated (adj) => ildizi bilan yo'q qilingan
extirpative (adj) => ildizi bilan yo'q qiluvchi

chuck (n) => molning bo'yin-yelka qismidagi go'sht
chuck (v) => uloqtirmoq, otmoq, tashlab yubormoq, tashlab ketmoq, voz kechmoq
chocker (n) => uloqtiruvchi, otuvchi

madhouse (n) => jinnixona, tartibsiz yoki shovqin-suronli joy

murder (n) => qasddan odam o'ldirish, qotillik
murderer (n) => qotil, odam o'ldirgan shaxs
murderousness (n) => qotillikka moyillik, o'ta tajavuzkorlik
murder (v) => qasddan odam o'ldirmoq
murderous (adj) => qotillikka oid, qotillik qilishga moyil, o'ta tajavvuzkor
murderously (adv) => qotillik qilishga moyil tarzda, o'ta tajavuzkor tarzda
murderable (adj) => o'ldirishi mumkin bo'lgan

confession (n) => tan olish, iqrorlik, gunohni tan olish
confessor (n) => tan oluvchi, gunoh iqrorini tinglovchi ruhoniy
confessional (n) => tan olish xonasi yoki kabinasi (cherkovda)
confess (v) => tan olmoq, iqror bo‘lmoq
confessional (adj) => tan olishga oid, shaxsiy sirlarni ochiq aytadigan 
confessed (adj) => ochiq tan olingan, e'lon qilingan
confessedly (adv) => o'zini tan olganidek, ochiq e'tirof etib

object (n) => e'tiroz, qarshilik, obyekt, narsa
objection (n) => e'tiroz, qarshilik, norozilik
objective (n) => maqsad, vazifa, obyekt
objectivity (n) => xolislik, obyektivlik
objector (n) => e'tiroz bildiruvchi, qarshi chiquvchi
objectification (n) => odamni obyekt sifatida ko'rish yoki ko'rsatish
object (v) => e'tiroz bildirmoq, qarshi chiqmoq
objectify (v) => odamni shaxs emas obyekt sifatida ko'rmoq yoki ko'rsatmoq
objective (adj) => xolis, obyektiv, maqsadga asoslangan
objectionable (adj) => nomaqbul, e'tiroz uyg'otadigan, qabul qilib bo'lmaydigan
objectified (adj) => obyekt sifatida ko'rilgan yoki ko'rsatilgan
objectively (adv) => xolisona, obyektiv tarzda
objectionably (adv) => nomaqbul tarzda


quota => limit, ajratilgan miqdor, me’yor

kemptness (n) => ozodalik, saranjomlik
unkemptness (n) => qarovsiz holat, tartibsizlik, pala-partishlik
kempt (adj) => ozoda, saranjom-sarishta, parvarishlangan
unkempt (adj) => qarovsiz, tartibsiz, taralmagan
unkemptly (adv) => qarovsiz, pala-partish tarzda

pretend => o‘zini …dek tutmoq, rol o‘ynamoq, soxta qilib ko‘rsatmoq

drag (n) => sudrash, tortish, sekin va zerikarli jarayon
dragger (n) => sudrovchi, sudraydigan odam yoki narsa
drag (v) => sudramoq, tortib olib obrmoq, sekin harakatlantirmoq

exite (n) => surgun, badarg'alik, surgunda bo'lish
exile (v) => surgun qilmoq, badarg'a qilmoq
exiled (adj) => surgun qilingan, badarg'a qilingan

rust => uzoq vaqt ishlatilmay, faoliyatsiz qolmoq, “zanglab qolmoq”

rust => zanglamoq, zang.

resemble => o‘xshamoq

brag (n) => maqtanish, maqtanchoqlik, maqtanib aytilgan gap
bragger (n) => maqtanadigan odam, maqtanchoq
braggart (n) => maqtanchoq odam, o'zini ko'p ko'rsatadigan odam (salbiy)
brag (v) => maqtanmoq, o‘z yutug‘ini ko‘z-ko‘z qilmoq, berilib gapirmoq
braggy (adj) => maqtanchoq, o'zini ko'p ko'rsatadigan 

promote => lavozimini oshirmoq, targ‘ib qilmoq
promotion =>lavozim ko‘tarilishi, targ‘ibot
promoted => lavozimi oshirilgan
promoting => targ‘ib qilayotgan, lavozimini oshirayot

digest (n) => qisqacha mazmun, xulosa
digestion (n) => hazm qilish, hazm, ma'lumotlarni o'zlashtirish
digestive (n) => hazm qilishga yordam beradigan narsa
digester (n) => hazm qiluvchi
digest (v) => hazm qilmoq, anglab yetmoq, o'zlashtirmoq, qisqartirib jamlamoq
predigest (v) => oldindan hazm qilmoq, soddalashtirmoq
digestive (adj) => hazm bo'ladigan, tushunarli, o'zlashtirsa bo'ladigan
indigestible (adj) => hazm bo'lmaydigan, tushunish qiyin

pour => quymoq

merit (n) => xizmat, fazilat, loyiq jihat, afzallik
meritoriousness (n) => xizmatga loyiq bo'lish, maqtovga loyiqlik
meritlessness (n) => asossizlik, afzallik yoki xizmatning yo'qligi
merit (v) => arzimoq, loyiq bo'lmoq
meritorious (adj) => xizmatga loyiq, maqtovga loyiq, e'tirofga arziydigan
meritless (adj) => asossiz, hech qanday afzalligi yoki xizmati yo'q
meritoriously (adv) => xizmatga loyiq tarzda, maqtovga loyiq tarzda
meritlessly (adv) => asossiz tarzda

deed (n) => rasmiy hujjat, mulkka egalik huquqini tasdiqlovchi hujjat
deed (n) => qilmish, amal, xatti-harakat
deed (v) => rasmiy hujjat orqali mulkni boshqa shaxsga o'tkazmoq

bid (n) => taklif, narx taklifi, savdoda berilgan narx
bid (v) => taklif bermoq, narx taklif qilmoq, savdoda ma'lum narx taklif qilmoq

favor (n) => iltimos, yaxshilik, mehr
favorite (n) => sevimli narsa yoki odam
favoritism (n) => tarafkashlik, o'z odamiga yon bosish
favor (v) => ma'qullamoq, qo'llab-quvvatlamoq
favorable (adj) => qulay, ijobiy, ma'qul
unfavorable (adj) => noqulay, salbiy, ma'qul bo'lmagan
favorite (adj) => sevimli, eng yoqadigan
favorably (adv) => ijobiy tarzda, ma'qullab

amulet (n) => tumor, himoya tumori, yomonlikdan asraydi deb ishoniladigan buyum
amuletic (adj) => tumorga oid, himoya tumori sifatidagi

casualty (n) => qurbon, jarohatlangan yoki halok bo'lgan odam, talofat

tense (n) => zamon, taranglik
tenseness (n) => taranglik, keskinlik
tense (v) => taranglashtirmoq, tarang tortmoq
tense (adj) => tarang, taranglashgan, asabiy, keskin
tensely (adv) => tarang holda, asabiy tarzda

arrogance (n) => kibr, manmanlik, o'zini katta olish, takabburlik
arrogant (adj) => takabbur, o‘zini katta oladigan, manman
arrogantish (adj) => biroz takabbur, takabburga o'xshash
arrogantly (adv) => takabburlik bilan, manmanlarcha, o'zini katta olib

spoil (n) => o'lja, talon-tarojdan olingan narsalar
spoiler (n) => syujetni oldindan ochib beradigan ma'lumot
spoilage (n) => oziq-ovqat yoki mahsulotlarning aynib yoki buzilib qolishi
spoil (v) => buzmoq, yaroqsiz holga keltirmoq
spoil (v) => erkalab yubormoq, haddan tashqari yaxshi muomala qilib, buzib qo'ymoq
spoil (v) => kayfiyatni yoki zavqni buzmoq
spoil (v) => taomning aynib qolishiga sabab bo'lmoq, aynimoq
spoiled (adj) => erkatoy, haddan tashqari erkalatilgan, aynigan, buzilgan

finalization (n) => yakunlash, oxiriga yetkazish, rasman tugatish
finalize (v) => yakunlamoq, oxiriga yetkazmoq, rasman tugatmoq
finalized (adj) => yakunlangan, rasman tugatilgan
final (adj) => yakuniy, oxirgi
finally (adv) => nihoyat, oxir-oqibat, yakunda

sorrow => qayg‘u, g‘am

eraseer (n) => o'chirgich, doskani artadigan latta yoki cho'tka
erasability (n) => o'chirib bo'lish mumkinligi
erasure (n) => o'chirish, o'chirib tashlash, o'chirilgan joy
erase (v) => o'chirmoq, butunlay yo'q qilmoq, xotiradan o'chirmoq
unerase (v) => o'chirilganni qayta tiklamoq
erasable (adj) => o'chirish mumkin bo'lgan
unerasable / inerasable (adj) => o'chirib bo'lmaydigan
non-erasable (adj) => o'chmaydigan
erased (adj) => o'chirilgan

eradication (n) => butunlay yo'q qilish, tugatish
eradicator (n) => yo'q qiluvchi vosita yoki shaxs
eradicate (v) => ildizi bilan yo'q qilmoq, butunlay tugatmoq
eradicable (adj) => butunlay yo'q qilish mumkin bo'lgan
ineradicable (adj) => butunlay yo'q qilib bo'lmaydigan
eradicated (adj) => butunlay yo'q qilingan
ineradicably (adv) => yo'q qilib bo'lmaydigan darajada

interference (n) => aralashuv, xalaqit, radio yoki telefondagi shovqin, xalaqit
interferer (n) => aralashuvchi, xalaqit beruvchi
interfere (v) => aralashmoq, xalaqit bermoq, o'rinsiz suqilmoq
interfering (adj) => aralashadigan, suqilaveradigan
noninterfering (adj) => aralashmaydigan
interferingly (adv) => aralashib, xalaqit berib

caution (n) => ehtiyotkorlik, ogohlantirish, ehtiyot bo‘lish 
precaution (n) => ehtiyot chorasi, xavfsizlik chorasi, oldini olish chorasi
caution (v) => ogohlantirmoq, ehtiyot bo'lish haqida ogohlantirmoq
cautious (adj) => ehtiyotkor, ehtiyotkorona
cautiously (adv) => ehtiyotkorlik bilan

miracle (n) => mo'jiza, kutilmagan ajoyib hodisa 
miraculousness (n) => mo'jizaviylik
miraclist (n) => mo'jizalarga ishonuvchi
miraculous (adj) => mo'jizaviy, mo'jizadek hayratlanarli
miraculously (adv) => mo'jizaviy tarzda, hayratlanarli tarzda

appreciation (n) => qadrlash, minnatdorchilik, qadriga yetish, tushunish
appreciator (n) => qadrlovchi, qadriga yetuvchi
appreciate (v) => qadrlamoq, minnatdor bo'lmoq, tushunib yetmoq, anglamoq
appreciative (adj) => minnatdor, qadrlaydigan, qadriga yetadigan
appreciatively (adv) => minnatdorlik bilan, qadrlagan holda

pose (noun) => poza, holat

pose (verb) => poza bermoq, suratga tushish uchun turmoq

believability (n) => ishonarlilik, ishonish mumkinligi
believe (v) => ishonmoq, deb hisoblamoq
believable (adj) => ishonarli, ishonish mumkin bo'lgan
unbelievable (adj) => ishonib bo‘lmaydigan, aql bovar qilmaydigan, hayratlanarli
unbelievably (adv) => ishonib bo'lmaydigan darajada, nihoyatda

fluctuation (n) => o'zgarib turish, ko'tarilib-tushish, tebranish
fluctuate (v) => o'zgarib turmoq, ko'tarilib-tushib turmoq, tebranib turmoq
fluctuating (adj) => o'zgarib turadigan, ko'tarilib-tushib turadigan, beqaror, o'zgaruvchan
fluctuant (adj) => o'zgaruvchan, tebranuvchi

prune => Quritilgan olxo‘ri (bir dona)

shore => qirg‘oq, sohil.

folk (n) => odamlar, xalq, kishi
folks (n) => odamlar, kishilar, xalq, ota-ona
folk (adj) => xalqona, xalqga oid
folksly (adj) => xalqona, oddiy va samimiy

burden (n) => yuk, og'irlik, tashvish, ma'suliyat, og'ir majburiyat
burdensomeness (n) => og'irlik, mashaqqatlilik
burden (v) => yuklamoq, zimmasiga yuklamoq, og'irlik solmoq
burdensome (adj) => og'ir, mashaqqatli, ortiqcha yuk bo'ladigan
burdened (adj) => zimmasiga og'ir majburiyat yuklangan, tashvishga botgan
burdensomely (adv) => og'ir tarzda, mashaqqatli tarzda

sow => urug‘ ekmoq.

aid (n) => yordam, ko'mak, yordam vositasi
aider (n) => yordam beruvchi, ko'makchi
aide (n) => yordamchi, maslahatchi
aid (v) => yordam bermoq, ko‘maklashmoq
aided (adj) => yordam berilgan, yordam ko'rsatilgan

move (n) => harakat, ko'chish, yurish
movement (n) => harakat, harakatlanish, ko'chish, ijtimoiy yoki siyosiy harakat
mover (n) => harakatlanuvchi narsa yoki odam, ko'chirish bilan shug'ullanuvchi
movability (n) => ko'chirish yoki harakatlantirish mumkinligi
immovability (n) => qimirlamaslik, ko'chirmaslik
move (v) => harakatlanmoq, ko'chmoq, siljitmoq
moving (adj) => ta'sirli, hissiyotga boy, harakatlanayotgan
movable (adj) => ko'chiriladigan, harakatlantirish mumkin bo'lgan
immovable (adj) => qimirlamaydigan, ko'chirilmaydigan, qat'iy
movement-based (adj) => harakatga asoslangan
movingly (adv) => ta'sirli tarzda
movably (adv) => ko'chiriladigan yoki harakatlantiriladigan tarzda
immovably (adv) => qimirlamaydigan tarzda

dent (n) => botiq, ezilgan joy, urilishdan qolgan botiq, pachoq joy
denter (n) => botiq hosil qiluvchi
dent (v) => botiq hosil qilmoq, ezmoq, botiq qilib qo'ymoq
dent (adj) => botiq bo'lgan, ezilgan

mistake (n) => xato, adashish
mistakenness (n) => xato ekanlik, noto'g'rilik
mistake (v) => xato qilmoq, adashtirmoq
mistaken (adj) => xato, noto'g'ri, adashgan
mistakable (adj) => adashtirish mumkin bo'lgan
mistakenly (adv) => xato qilib, yanglishib

cliché (n) => siyqasi chiqqan ibora, ko'p takrorlangan g'oya yoki fikr
cliched (adj) => siyqasi chiqqan, original bo'lmagan

literalness (n) => so'zma-so'zlik, tom ma'noda bo'lish
literal (adj) => so'zma-so'z, aynan o'z ma'nosidagi, ko'chma bo'lmagan
nonliteral (adj) => ko'chma ma'nodagi, so'zma-so'z bo'lmagan
literally (adv) => so'zma-so'z, tom ma'noda, haqiqatan ham
nonliterally (adv) => ko'chma ma'noda, so'zma-so'z bo'lmagan tarzda

feast (n) => katta ziyofat, mo'l-ko'l taomlar tortiladigan dasturxon
feast (v) => ziyofat qilmoq, mo'l-ko'l ovqatlanmoq
feastful (adj) => ziyofatga xos, mo'l-ko'l

obsession (n) => haddan tashqari berilib ketish, xayoldan chiqmaydigan fikr
obsessiveness (n) => haddan tashqari berilib ketish, bir fikrga qattiq bog'lanish
obsess (v) => haddan tashqari ko'p o'ylamoq, xayolini egallab olmoq
obsessed (adj) => haddan tashqari berilib ketgan, xayoli shunga band bo'lgan
obsessive (adj) => haddan tashqari berilib ketadigan, bir fikrga qattiq bog'lanadigan
obsessively (adv) => haddan tashqari berilib, bir fikrga qattiq bog'langan holda

mansion (n) => katta hashamatli uy, saroy, qasr
manse (n) => ruhoniyning uyi
mansion-like (adj) => qasrga o'xshash, hashamatli

disown (v) => farzandi yoki qarindoshidan voz kechmoq, o'z qarindoshi deb tan olmaslik
disowned (adj) => voz kechilgan, o'z qarindoshi deb tan olinmagan

dude (n) => og'ayni, do'stim, bro, yigit, odam

protection => himoya, muhofaza, asrash.

devote (v) => bag'ishlamoq, sarflamoq (vaqt, kuch, e'tibor)
devotion (n) => sadoqat, fidoyilik, ibodat, taqvodorlik
devotee (n) => ishqibozi, sodiq tarafdor, dindor
devotedness (n) => sadoqatlilik
devoted (adj) => sadoqatli, fidoyi, bag'ishlangan, jon-dili bilan berilgan
devout (adj) => dindor, taqvodor, chin dildan, samimiy
devotional (adj) => ibodatga oid, diniy
devotedly (adv) => sadoqat bilan, fidokorona
devoutly (adv) => taqvo bilan, chin dildan

besides (adv) => bundan tashqari, ustiga-ustak, qolaversa

richness => boylik, mo‘l-ko‘llik, boylik darajasi

ass (n) => eshak, ahmoq, tentak, befahm odam, dumba, orqa
asshole (n) => ahmoq, tentak, jirkanch odam, iflos odam, juda yaramas odam, anus

burn (n) => kuyish, kuygan joy, yonish
burnout (n) => kuchli va uzoq davom etgan stress yoki ish bosimi sababli ruhiy va jismoniy holdan toyish
burner (n) => gorelka, isitkich qismi, yondirgich
burn (v) => kuymoq, yoqmoq, kuydirmoq
burnt (adj) => kuygan, kuydirilgan, yonib ketgan
burnable (adj) => yoqiladigan, yonuvchan

divorce (n) => ajrashish, nikohning bekor qilinishi
divorcee (n) => ajrashgan erkak yoki ayol
divorce (v) => ajrashmoq, nikohni bekor qilmoq
divorced (adj) => ajrashgan

disgust (n) => jirkanch, kuchli nafrat yoki jirkanish hissi
disgust (v) => jirkanmoq, jirkanish hissini uyg'otmoq
disgusting (adj) => jirkanch, ko'ngil aynitadigan, juda yoqimsiz
disgusted (adj) => jirkanib ketgan, jirkanayotgan, nafratlangan
disgustedly (adv) => jirkanib, jirkanish bilan

incline (n) => qiyalik, nishab
inclination (n) => moyillik, moyil, xohish, qiyalik, og'ish
disinclination (n) => istamaslik, xohishsizlik
incline (v) => moyil qilmoq, ko'ndirmoq, boshini egmoq, qiyalashmoq
inclined (adj) => moyil, mayli bor, qiya
disinclined (adj) => istamaydigan, xohishi yo'q
inclining (adj) => egilib turgan

retort => keskin javob qaytarmoq / darhol javob qaytarmoq.

toxin (n) => zaharli modda, zahar
toxicity (n) => zaharlilik, zararli ta'sir
detoxification (n) => zahardan tozalash, zaharli ta'sirni yo'qotish
detoxify (v) => zahardan tozalamoq, zaharli ta'sirni yo'qotmoq
toxic (adj) => zaharli, zararli, nosog'lom
toxically (adv) => zaharli tarzda, zaharli tarzda

trait (n) => irsiy belgi, xususiyat
trait (n) => xarakter xususiyati, o‘ziga xos belgi, shaxsiy xususiyat

reduction (n) => kamaytirish, pasaytirish, qisqartirish, kamayish
reduce (v) => kamaytirmoq, qisqartirmoq, pasaytirmoq
reduced (adj) => kamaytirilgan, pasaytirilgan, qisqartirilgan
reducible (adj) => kamaytirish mumkin bo'lgan, qisqartirish mumkin bo'lgan
irreducible (adj) => kamaytirib yoki qisqartirib bo'lmaydigan

anticipation (n) => oldindan kutish, kutish hissi, taxmin, oldindan sezish
anticipator (n) => oldindan kutuvchi, oldindan taxmin qiluvchi
anticipate (v) => oldindan kutmoq, taxmin qilmoq, sodir bo'lishini oldindan kutib tayyorlanmoq
anticipatory (adj) => oldindan kutishga asoslangan, oldindan tayyorgarlik ko'ruvchi
anticipated (adj) => oldindan taxmin qilingan, kutilgan
anticipatively (adv) => oldindan kutgan holda, oldindan taxmin qilib

exposure (n) => ta'sirga duchor bo'lish, fosh bo'lish, ommaga tanilish, ekspozitsiya
expose (n) => fosh etuvchi maqola yoki reportaj
overexposure (n) => haddan tashqari ta'sir, ortiqcha ommalashib ketish
expose (v) => ochiq qo'ymoq, fosh qilmoq, ta'sirga duchor qilmoq, tanishtirmoq
overexpose (v) => haddan tashqari ta'sirga duchor qilmoq, ortiqcha yoritmoq
underexpose (v) => yetarli yoritmaslik, yetarli e'tibor bermaslik
exposed (adj) => ochiq, himoyasiz, fosh bo'lgan
unexposed (adj) => ta'sirga uchramagan, fosh bo'lmagan

recognize => tanimoq, tanib olmoq, anglamoq

retrieve => qayta topmoq, qaytarib olmoq, xotiradan esga tushirmoq

cognition (n) => bilish jarayoni, idrok etish va fikrlash jarayoni
cognitive (adj) => aqliy jarayonlarga oid, bilishga oid, idrok va fikrlashga oid
cognitively (adv) => aqliy jihatdan, bilish jarayoni nuqtayi nazaridan

luck (n) => omad, baxt
unluckiness (n) => omadsizlik
lucky (adj) => omadli, omadli bo'lgan
unlucky (adj) => omadsiz
luckily (adv) => omadga ko'ra, baxtimizga, xayriyat
unluckily (adv) => omadsiz ravishda

ash (n) => kul, kul qoldig'i
ash (v) => kulga aylantirmoq, kuydirib kul qilmoq
ashy (adj) => kulrang, kul tusidagi
ashed (adj) => kulga aylangan, kul bilan qoplangan

shady => shubhali, ishonchsiz, g‘alati; soyali.

girl (n) => qiz, qiz bola, qiz do'st, yosh ayol
girlfriend (n) => qiz do'st, sevgili
girlie / girly (n) => qizcha
girlishness (n) => qizlarga xoslik, qizaloqdek bo'lish
girly (adj) => qizlarga xos, qizcha
girlish (adj) => qizlarga xos, gizaloqdek
girlishly (adv) => qizaloqdek, qizlarcha

inflation (n) => inflatsiya (narxlar oshishi), shishirish 
deflation (n) => deflyatsiya (narxlar tushishi), havosini chiqarish
inflator (n) => havo bosadigan moslama, nasos shishirgich
inflate (v) => havo bilan shishirmoq, narsxni suniy oshirmoq, ahamiyatini bo'rttirmoq
deflate (v) => havosini chiqarmoq, ruhini tushirmoq
reflate (v) => iqtisodiyotni qayta jonlantirmoq
inflated (adj) => shishirilgan, sun'iy oshirilgan, bo'rttirilgan
deflated (adj) => havosi chiqqan, ruhi tushgan
inflatable (adj) => havo bilan shishirilgan
inflationary (adj) => inflatsiyaga oid, narxlarni oshiradigan

puncture => teshib qo‘ymoq / teshib ketmoq

tire (n) => shina 🇺🇸
tyre (n) => shina 🇬🇧

grind (n) => zerikarli, mashaqqatli kundalik ish, maydalash darajasi
grinder (n) => maydalagich, tegirmoq, charx
grindstone (n) => charx toshi
grinding (n) => maydalash, g'ijirlash
grind (v) => maydalamoq, un qilib tortmoq, ezmoq, qayramoq, charxlamoq, tishni g'ijirlatmoq, tinmay mehnat qilmoq
grinding (adj) => shafqatsiz, toliqtiruvchi
ground (adj) => maydalangan, tortilgan
grindingly (adv) => toliqtiruvchi darajada

spare => zaxira; ortiqcha; bo‘sh vaqt/vaqt ajratmoq.

weirdness (n) => g'alatilik, noodatiylik
weirdo (n) => g'alati odam, telba (kamsituvchi)
weird (adj) => g'alati, noodatiy, ajabtovur, sirli
weirdish (adj) => biroz g'alati
weirdly (adv) => g'alati tarzda, ajabtovur

sparkling => yaltirab turgan; yarqiragan; juda quvnoq/jilvali.

dazzlement (n) => ko'zning qamashishi, hayratga tushish
dazzle (v) => ko'zni qamashtirmoq, hayratga solmoq
dazzled (adj) => ko'zi qamashgan, hayratga tushgan
dazzlingly (adv) => ko'zni qamashtiradigan darajada, juda ajoyib tarzda

air (n) => havo, atmosfera, muhit, kayfiyat, efir
airness (n) => havodorlik, keng va havo yaxshi kiradiganlik
airlessness (n) => havosizlik, dimlik
air (v) => shamollatmoq, havolatmoq, efirga uzatmoq, ochiq bildirmoq
airy (adj) => havodor, havo yaxshi kiradigan, yengil, erkin
aired (adj) => efirga uzatilgan, havoga chiqarilgan
airless (adj) => havosiz, havo almashinuvi yomon
airly (adv) => beparvolik bilan, yengil tarzda

denim (n) => jinsi matosi (qalin, mustahkam paxta matosi)
cotton (n) => paxta matosi (yumshoq havo o'tkazadi)
linen (n) => zig'ir matosi (yengil, salqin, tez g'ijimlanadi)
wool (n) => jun mato (issiq, qishki kiyimlarda)
silk (n) => ipak (silliq, mayin, nafis)
leather (n) => charm yoki teri (hayvon terisidan tayyorlanadi)
suede (n) => zamsha (charmning yumshoq yoki tukliroq turi)
velvet (n) => baxmal (yumshoq, tukli yuzali)
satin (n) => atlas (silliq, yaltiroq yuzali)
chiffon (n) => shifon (juda yengil, yupqa, yarim shaffof)
lace (n) => to'r yoki krujeva (naqshli, teshikchali, bezakli mato)
flannel (n) => flanel (yumshoq, issiqroq mato)
corduroy (n) => korduroy, yo'l-yo'l qalin mato (bo'rtma yo'llari bor)
tweed (n) => tvit (odatda junli, qo'polroq mato)
fleece (n) => flis (yumshoq, issiq, sport kiyimlarida)
jersey (n) => trikataj mato (elastik, yumshoq)
knit (n) => trikotaj (to'qib tayyorlangan mato)
nylon (n) => neylon (sintetik, mustahkam)
polyester (n) => polyester (sintetik, chidamli)
rayon (n) => rayon, viskoza turi (yumshoq, ipakni eslatadi)
viscoose (n) => viskoza (yumshoq, yengil)
spandex (n) => spandeks, elastan (juda elastik)
iycra (n) => laykra (elastik sintetik tola)
acrylic (n) => akril 

clown (n) => masxaraboz, kulgili yoki ahmoqona odam
clownishness (n) => masxarabozlik, ahmoqona yoki jo‘n xatti-harakat, jiddiy bo‘lmagan qiliqlar, bachkana qiliqlar
clown (v) => masxarabozlik qilmoq, ahmoqona qiliqlar qilmoq
clownish (adj) => masxarabozlarcha, kulgili darajada ahmoqona, bachkana

lowlife / low-life (n) => pastkash, razil odam, tuban odam
lowlife (adj) => pastkashga xos, tuban

stability (n) => barqarorlik, mustahkamlik, muvozanat
instability (n) => beqarorlik, o'zgaruvchanlik, muvozanatsizlik
stabilization (n) => barqarorlashtirish, barqaror holatga keltirish
destabilization (n) => barqarorlikni buzish, beqarorlashtirish
stable (n) => otxona
stabilizer (n) => barqarorlashtiruvchi vosita yoki qurilma, stabilizator
stable (v) => otxonaga joylashtirmoq
stabilize (v) => barqarorlashtirmoq, barqaror holatga keltirmoq
destabilize (v) => barqarorligini buzmoq, beqarorlashtirmoq
stable (adj) => barqaror, o'zgarmas, mustahkam, muvozanatli
unstable (adj) => beqaror, o'zgaruvchan, muvozanatsiz
stably (adv) => barqaror ravishda, o'zgarmas tarzda, mustahkam tarzda

jerk (n) => ahmoq, qo'pol odam, yaramas
jerk (v) => keskin silkitmoq, siltab tortmoq
jerky (adj) => keskin, siltanib-siltanib bo'ladigan
jerkliy (adv) => keskin, siltanib

threat (n) => tahdid, xavf
threaten (v) => tahdid qilmoq, qo'qitmoq, xavf tug'dirmoq
threating (adj) => tahdidli, qo'rqitadigan, xavf tug'diradigan
threatened (adj) => tahdid ostidagi, xavf ostidagi
threateningly (adv) => tahdidli tarzda, qo'rqitadigan tarzda

addict (n) => qaram odam, biror narsaga kuchli berilib ketgan odam
addiction (n) => qaramlik, kuchli bog'lanib qolish
addictiveness (n) => qaramlik keltiruvchanlik, o'ziga kuchli tortish xususiyati
addict (v) => qaram qilib qo'ymoq, o'ziga qattiq bog'lab qo'ymoq
addictive (adj) => qaramlik keltirib chiqaradigan, o'ziga qattiq bog'lab qo'yadigan
addicted (adj) => qaram bo'lgan, biror narsaga qattiq berilib ketgan
addictively (adv) => qaramlik keltiradigan tarzda, juda o'ziga tortadigan tarzda

sentence => sud hukmi / jazo ⚖️

sentence => hukm qilmoq, jazo tayinlamoq

obligation (n) => majburiyat, bajarilishi shart bo'lgan vazifa
obliger (n) => majbur qiluvchi, majburiyat yuklovchi
obligingness (n) => yordam berishga tayyorlik, iltifotlilik
oblige (v) => majbur qilmoq, biror ishni qilishga majbur bo'lmoq, iltimosni bajarib bermoq
obliged (adj) => majbur bo'lgan, minnatdor
obliging (adj) => yordam berishga tayyor, iltimosni bajonidil qiladigan
obligatory (adj) => majburiy, bajarilishi shart bo'lgan
obligingly (adv) => yordam berishga tayyor holda, iltifot bilan
obligatorily (adv) => majburiy tarzda, shart tarzda

obligateness (n) => majburiylik
obligate (v) => majburiyat yuklamoq, majbur qilmoq
obligate (adj) => majburiy, faqat ma'lum sharoitda yashay yoki ishlay oladigan
obligately (adv) => majburiy tarzda, faqat ma'lum sharoitda

suicide (n) => o‘z joniga qasd qilish, o‘zini o‘ldirish, o'z-o'ziga zarar keltiruvchi qaror
suicidal (adj) => o'z joniga qas qilishga moyil, o'ta xavfli, o'ziga zarar keltiradigan
suicidally (adv) => o'z joniga qasd qilishga moyil holda

commitment (n) => majburiyat, sadoqat, qat'iylik
commit (v) => sodir etmoq, amalga oshirmoq
committed (adj) => sodiq, qat'iy bel bog'langan, majburiyat olgan
committedly (adv) => qat'iylik bilan, sadoqat bilan

returnee => boshqa joyga ketib, keyin qaytib kelgan odam.

paranoia => paranoya, asossiz shubha va qo‘rquv, ta’qib qilinayotgandek his qilish.

ruin => barbod qilmoq, buzmoq, vayron qilmoq.

marriage (n) => nikoh, turmush, turmush qurish, birlashuv
remarriage (n) => qayta turmush qurish
intermarriage (n) => millatlararo yoki dinlararo nikoh
marriage certificate (n) => nikoh guvohnomasi
matrimony (n) => nikoh (rasmiy, diniy)
marry (v) => turmushga chiqmoq, uylanmoq, nikohlanmoq, ikki narsani uyg'unlashtirmoq
remarry (v) => qayta turmush qurmoq
intermarry (v) => boshqa millat yoki dindagi kishi bilan turmush qurmoq
married (adj) => turmush qurgan, uylangan
unmarried (adj) => turmush qurmagan, uylanmagan
marriageable (adj) => turmush qurishga yaroqli yoshdagi
marital (adj) => nikohga oid
premarital (adj) => nikohdan oldingi

courage (n) => jasorat, mardlik, qo‘rqmaslik
courageous (adj) => jasur, mard, dadil
uncourageous (adj) => jasoratsiz, qo'rqoq
courageously (adv) => jasorat bilan, dadil

tremble (n) => titroq, qaltirash
trembler (n) => titrovchi, qaltirayotgan odam yoki narsa
tremble (v) => titramoq, qaltiramoq
tremulous (adj) => titraydigan, qaltiraydigan, titroq holatdagi
trembling (adj) => titrayotgan, qaltirayotgan
tremulously (adv) => titroq tarzda, qaltirab

revenge => qasos.

rival => raqib, raqobatchi.

consciousness (n) => ong, hush, ongli holat
unconsciousness (n) => hushsizlik, behushlik
conscience (n) => vijdon
conscientize (v) => ko'zini ochmoq, ongiga yetkazmoq, biror muammo masala yoki haqiqat haqida kimningdir xabardorligini oshirmoq
conscious (adj) => hushida, ongli
unconscious (adj) => hushsiz, hushini yo'qotgan, behush
self-conscious (adj) => o'zini noqulay his qiladigan, tortinchoq
conscientious (adj) => vijdonli, ma'suliyatli
consciously (adv) => ongli ravishda, bila turib
unconsciously (adv) => beixtiyor, bilmagan holda
conscientiously (adv) => vijdonan, puxta, ma'suliyat bilan

siluet => Yorug‘lik qarshisida ko‘rinadigan qoramtir tashqi shakl.

silhouette => siluet, narsaning yoki odamning qorong‘i shakli, tashqi konturi.

junk (n) => keraksiz narsalar, chiqindi, arzimas narsa
junkie (n) => biror narsaga haddan tashqari berilgan odam, giyohvand
junk (v) => keraksiz narsalarni tashlamoq, chiqit qilmoq
junky (adj) => sifatsiz, arzimas, keraksiz narsalarga to'la

hunk (n) => kelishgan yoki baquvvat erkak
hunk (n) => katta yoki yirik bo'lak, parcha, katta miqdordagi qism

grace (n) => nafosat, noziklik, marhamat, muhlat
disgrace (n) => sharmandalik
gracefullness (n) => nafislik
graciousness (n) => xushmuomalalik, saxiylik
grace (v) => bezamoq, ziynat bermoq, sharaf bag'ishlamoq
disgrace (v) => sharmanda qilmoq
gracious (adj) => xushmuomala, mehribon, bag'ishlovchi
ungracious (adj) => qo'pol, xushmuomalasiz
graceless (adj) => qo'pol, beandisha
graceful (adj) => nafis, ko'rkam, chiroyli harakatlanuvchi
disgraceful (adj) => sharmandali, uyatli
graciously (adv) => xushmuomalalik bilan, muloyimlik bilan
gracelessly (adv) => qo'pollik bilan
gracefully (adv) => nafislik bilan, chiroyli tarzda

otherwise => aks holda, bo‘lmasa, yo‘qsa.

seaside => dengiz bo‘yi, sohil

ruin => barbod qilmoq / buzmoq

ruined => barbod bo‘lgan / buzilgan

charm (n) => tumor, omad keltiruvchi narsa, joziba, maftunkorlik
charmlessness (n) => jozibasizlik
charmer (n) => odamlarni o'ziga rom eta oladigan, jozibali odam
charm (v) => maftun qilmoq, o'ziga rom etmoq
charming (adj) => maftunkor, jozibali, yoqimli
charmless (adj) => jozibasiz, maftunkorligi yo'q
charmingly (adv) => jozibali ravishda, maftunkor tarzda

insistence (n) => qat'iy turib olish, talabchanlik, qat'iy talab
insist (v) => qat'iy turib olmoq, talab qilmoq
insistent (adj) => qat'iy turib oladigan, talabchan
insistently (adv) => qat'iy tarzda, turib olib

competition (n) => raqobat, musobaqa, tanlov
competitiveness (n) => raqobatbardoshlik
competitor (n) => raqib, raqobatchi, musobaqa ishtirokchisi
compete (v) => raqobatlashmoq, bellashmoq
competitive (adj) => raqobatbardosh, raqobatga oid, raqobat qilishga intiladigan
competitively (adv) => raqobat asosida, raqobatbardosh tarzda

paparazzi => paparatsilar, mashhur odamlarni suratga oladigan jurnalist/fotograflar

affair (n) => ish, masala, voqea, holat
affair (n) => ishqiy munosabat, yashirin ishqiy munosabat, ayniqsa nikohdan tashqari munosabat

representative => vakil

fabric (n) => mato, gazlama
fabrication (n) => uydirma, yolg'on to'qib chiqarish, ishlab chiqarish, yasash
fabricator (n) => uydirma to'quvchi, ishlab chiqaruvchi
fabricate (v) => to'qib chiqarmoq, yasamoq, ishalb chiqarmoq

struggler (n) => kurashuvchi, qiyinchilik bilan yashayotgan yoki harakat qilayotgan odam
struggle (n) => kurash, qiyinchilik, og'ir kechayotgan jarayon
struggle (v) => qiynalmoq, kurashmoq, zo'rg'a uddalamoq
struggling (adj) => qiynalayotgan, zo'rg'a uddalayotgan

aspiration (n) => intilish, orzu, yuksak maqsad
aspirant (n) => biror lavozim yoki maqsadga intiluvchi, nomzod
aspirer (n) => intiluvchi, orzu qiluvchi
aspire (v) => intilmoq, orzu qilmoq
aspirational (adj) => yuksak maqsadga intiluvchi, orzu-umidga asoslangan
aspirationally (adv) => yuksak maqsad ko'zlagan holda, intilish nuqtayi nazaridan

provoke => qo‘zg‘atmoq, keltirib chiqarmoq, sabab bo‘lmoq, ataylab jahlini chiqarmoq

tingle (n) => jimirlash, chimirlash, mayin sanchish
tingling (n) => jimirlash, chimirlash
tingle (v) => jimirlamoq, chimirlamoq, mayin sanchimoq
tingling (adj) => jimirlayotgan, chimirlayotgan, mayin sanchiyotgan
tingly (adj) => jimirlatuvchi, chimirlatadigan

fire (n) => olov, yong'in
firing (n) => o'q uzish, ishdan bo'shatish
firefighter (n) => o't o'chiruvchi
fire (v) => ishdan bo'shatmoq, o'q uzmoq, yoqmoq, ishga tushirmoq (dvigatel, qurol, mexanizm)
fireproof (v) => yong'indan himoyalanmoq
fired (adj) => ishdan bo'shatilgan
fireproof (adj) => yong'inga chidamli, o'tga chidamli

mate (n) => o'rtoq, do'st, hayvonning jufti, yordamchi (kemada, kasbda)
mating (n) => hayvonlarning juflashishi, urchishi
mate (v) => juftlashmoq, nasl qoldirish uchun qo'shilmoq, mat qo'ymoq (shaxmat), bir-biriga ulanmoq (mos kelmoq)
classmate (n) => sinfdosh
roommate (n) => xonadosh
teammate (n) => jamoadosh
workmate (n) => ish joyidagi hamkasb
soulmate (n) => qabiladosh, ruhdosh
mated (adj) => juftlashgan

stun (n) => karaxt qiluvchi zarba, hayratga solish
stun (v) => karaxt qilib qo'ymoq, hayratda qoldirmoq
stunned (adj) => karaxt bo'lgan, hayratda qolgan
stunning (adj) => hayratlanarli, juda chiroyli
stunningly (adv) => hayratlanarli darajada

truth (n) => haqiqat, rost gap
truthfulness (n) => rostgo'ylik
truthful (adj) => rostgo'y, rost gapiradigan
true (adj) => rost, haqiqiy, to'g'ri
untrue (adj) => yolg'on, noto'g'ri, haqiqatga mos kelmaydigan
truly (adv) => haqiqatan ham, rostdan ham, chin dildan
truthfully (adv) => rostini aytganda, rostgo'ylik bilan

playful => o‘ynoqi, hazilkash, sho‘x.

interruption (n) => gapni bo'lish, xalaqit, tanaffus, uzilish
interrupter (n) => xalaqit beruvchi kishi, texnikada uzgich
interrupt (v) => gapini bo'lmoq, xalaqit bermoq, ishini to'xtatib qo'ymoq
interrupted (adj) => to'xtatilgan, uzilgan
uninterrupted (adj) => uzluksiz, to'xtovsiz
interruptive (adj) => xalaqit beruvchi
uninterruptedly (adv) => to'xtovsiz, uzluksiz ravishda

cross (n) => xoch, kesishgan belgi
crossing (n) => kesib o'tish, kesishuv, piyodalar o'tish joyi
crossroads (n) => chorraha, yo'l ayrilishi
cross (v) => kesib o'tmoq, kesishmoq, chalishtirmoq
cross (adj) => jahldor, badjahl, achchiqlangan
cross-border (adj) => chegaralararo, davlatlar o‘rtasidagi, chegaradan o‘tuvchi.
crossly (adv) => jahl bilan, achchiqlanib

instantiation (n) => namuna yaratish, konkretlashtirish, obyekt yaratish
instantiability (n) => namunasini yaratish mumkinlgi
instantiate (v) => namunasini yaratmoq, konkretlashtirmoq, obyekt yaratmoq
instantiated (adj) => namunasi yaratilgan, konkretlashtirilgan
instantiable (adj) => namunasini yaratish mumkin bo'lgan

entrepreneur (n) => tadbirkor, biznes tashkil qiluvchi, yangi biznes boshlovchi
entrepreneurship (n) => tadbirkorlik, biznes tashkil etish faoliyati
entrepreneurial (adj) => tadbirkorlikka oid, tadbirkorona
entrepreneurially (adv) => tadbirkorona tarzda

main (adj) => asosiy, bosh, eng muhim
mainly (adv) => asosan, ko'pincha, katta qismi

labour (n) => mehnat, ish, mehnat faoliyati
labourer (n) => ishchi, jismoniy mehnat qiluvchi ishchi
labour (v) => mehnat qilmoq, qattiq ishlamoq
labouring (adj) => mehnat qilayotgan, og'ir ishlayotgan
laboured (adj) => zo'riqib qilingan, sun'iy, tabiiy chiqmaydigan

corridor (n) => yo‘lak, koridor

employee (n) => xodim, ishchi, yollanma xodim
employer (n) => ish beruvchi
employment (n) => bandlik, ish bilan ta’minlanganlik, ish, bandlik, ishga yollash
unemployment (n) => ishsizlik
employed (adj) => ish bilan band, ishlayotgan
unemployed (adj) => ishsiz

tax (n) => soliq
taxation (n) => soliqqa tortish, soliq solish tizimi
taxpayer (n) => soliq to'lovchi
tax (v) => soliq solmoq, soliqqa tortmoq
taxable (adj) => soliqqa tortiladigan, soliq solinadigan
taxing (adj) => og'ir, qiyin, kuch talab qiladigan

mobile (n) => mobil telefon
mobility (n) => harakatchanlik, harakatlanish qobiliyati, ko'chish imkoniyati
inmobility (n) => harakatsizlik, qimirlay olmaslik
mobilization (n) => safarbar qilish, safarbarlik
mobilize (v) => safarbar qilmoq, safarbar bo'lmoq
inmobilize (v) => harakatsizlantirmoq, qimirlay olmaydigan holatga keltirmoq
inmobilization (n) => harakatsizlantirish, harakatni cheklash
immobilizer (n) => harakatsizlantiruvchi vosita yoki qurilma
mobile (adj) => harakatlanuvchi, ko'chma
inmobile (adj) => harakatsiz, qimirlamaydigan
mobilized (adj) => safarbar qilingan
immobilized (adj) => harakatsizlantirilgan
mobilely (adv) => harakatchan tarzda


coach (n) => murabbiy, trener
coachability (n) => o'rganuvchanlik, murabbiy ko'rsatmalarini qabul qila olish qobiliyati
coaching (n) => murabbiylik, yo‘l-yo‘riq berish, murabbiy bilan shug'ullanish
coach (v) => murabbiylik qilmoq, yo'l-yo'riq bermoq, tayyorlamoq, shug'ullantirmoq
coached (adj) => murabbiylikdan o'tgan, murabbiy tomonidan tayyorlangan
coachable (adj) => murabbiy ko'rsatmalarini yaxshi qabul qiladigan, o'rgatish oson bo'lgan

properly => to‘g‘ri, munosib ravishda, kerakli darajada, tegishlicha.

value (n) => qiymat, qadr, ahamiyat
valuation (n) => baholash, qiymatini aniqlash
valuable (n) => qiymmatli buyum yoki narsa
value (v) => qadrlamoq, qiymat bermoq, baholamoq
valued (adj) => qadrlangan, muhim deb hisoblangan, baholangan
valuable (adj) => qimmatli, foydali, muhim, katta qiymatga ega, qadrli

curriculum (n) => o‘quv dasturi, ta'lim dasturi (plural: curricula)
extracurricular (adj) => darsdan tashqari, o'quv dasturidan tashqari

certainty (n) => aniqlik, ishonch, aniq yoki ishonchli ekanlik
uncertainty (n) => noaniqlik, ishonchsizlik
certain (adj) => aniq, ishonchli, ma'lum, muayyan, ayrim, ba'zi
uncertain (adj) => noaniq, ishonchsiz, ikkilangan
certainly (adv) => albatta, shubhasiz, aniq
uncertainly (adv) => noaniq tarzda, ikkilangan holda

fluency (n) => ravonlik, erkin gapira olish
nonfluency (n) => ravon bo'lmaslik
fluent (adj) => ravon, erkin gapiradigan
nonfluent (adj) => ravon bo'lmagan, ravon gapira olmaydigan
disfluent (adj) => ravon bo'lmagan, nutqida uzilishlar bo'lgan
fluently (adv) => ravon, erkin tarzda
disfluently (adv) => ravon bo'lmagan tarzda

influence (n) => ta'sir, nufuz, ta'sir kuchi
influencer (n) => ta'sir o'tkazuvchi shaxs, ijtimoiy tarmoqdagi ta'sirli shaxs
influence (v) => ta'sir qilmoq, ta'sir o'tkazmoq
influential (adj) => ta'sirchan, nufuzli, obro'li, ta'siri kuchli
influenced (adj) => ta'sirlangan, ta'sir ostida qolgan
uninfluenced (adj) => ta'sirga uchramagan
influentially (adv) => ta'sirli tarzda, ta'sir kuchi bilan

scary => qo‘rqinchli, qo‘rquv uyg‘otadigan. (adv)

structure (n) => tuzilma, tuzilish, tarkib, struktura
structuring (n) => tuzish, tuzilmani shakllantirish
restructuring (n) => qayta tuzish, qayta tashkil etish
structure (v) => tuzmoq, tuzilishini shakllantirmoq
restructure (v) => qayta tuzmoq, qayta tashkil qilmoq
structural (adj) => tuzilmaviy, tarkibiy
unstructured (adj) => tuzilmagan, tarkibsiz
structurally (adv) => tuzilmaviy jihatdan

representative => vakil

relocate => ko‘chib o‘tmoq, boshqa joyga ko‘chirmoq.

relocation => ko‘chib o‘tish / joyini o‘zgartirish (noun)

rudimentary => oddiy, sodda, boshlang‘ich darajadagi, mukammal rivojlanmagan

passionate => ishtiyoqli, juda qiziqqan, ehtirosli

interaction (n) => o'zaro aloqa, muloqot, o'zaro ta'sir
interactivity (n) => interaktivlik, foydalanuvchi bilan o'zaro aloqa qilish imkoniyati
interactant (n) => o'zaro muloqotdagi ishtirokchi
interact (v) => o'zaro muloqat qilmoq, aloqada bo'lmoq, o'zaro ta'sirlashmoq
reinteract (v) => qayta o'zaro ta'sir qilmoq
interactive (adj) => interaktiv, o'zaro aloqaga asoslangan
interacting (adj) => o'zaro ta'sirlashayotgan
noninteractive (adj) => interaktiv bo'lmagan
interactively (adv) => interaktiv tarzda, o'zaro aloqa orqali

eloboration (n) => batafsil tushuntirish, kengaytirilgan izoh, tafsilotlar bilan bayon qilish
eloborate (v) => batafsil tushuntirmoq, kengroq izohlamoq, tafsilotlarni qo'shib tushuntirmoq
eloborative (adj) => batafsil tushuntiruvchi, tafsilotlarni kengaytiruvchi

relevant => tegishli, aloqador, mavzuga

reduce => kamaytirmoq, qisqartirmoq, pasaytirmoq

grab (n) => tez ushlab olish, yulqib olish
grabber (n) => ushlab oluvchi, e'tiborni tortuvchi
grab (v) => tez ushlab olmoq, yulib olmoq, shoshib yeb-ishmoq
grabby (adj) => ochko'z, hamma narsani o'ziga olishga intiladigan

drawback (n) => kamchilik, salbiy tomon, noqulay jihat

ergonomics (n) => ergonomika, tanasiga moslab loyihalash ilmi
ergonomist (n) => ergonomika mutaxassisi
ergonomic (adj) => inson foydalanishi uchun qulay qilib ishlab chiqilgan (inson tanasiga va harakatiga moslab, qulay va zararsiz bo'ladigan qilib yaratilgan)
non-ergonomic (adj) => noqulay, inson tanasiga moslanmagan
ergonomically (adv) => foydalanish qulayligi nuqtai nazaridan, qulaylikni hisobga olib


conception (n) => g'oya, tasavvur, o'ylab topish yoki yaratish
conceive (v) => o'ylab topmoq, tasavvur qilmoq, g'oya sifatida ishlab chiqmoq
conceived (adj) => o'ylab topilgan, ishlab chiqilgan, yaratilgan
conceivable (adj) => tasavvur qilish mumkin bo'lgan, ehtimoliy
inconceivable (adj) => tasavvur qilib bo'lmaydigan, aqlga sig'maydigan
conceivably (adv) => tasavvur qilish mumkinki, ehtimol
inconceivably (adv) => tasavvur qilib bo'lmaydigan darajada

advertence (n) => e'tibor, diqqat qaratish, ongli ravishda e'tibor berish
inadvertence (n) => bexosdanlik, bilmasdan sodir etish, e'tiborsizlik
advertent (adj) => ataylab qilingan, ongli ravishda qilingan
inadvertent (adj) => beixtiyor, bilmasdan qilingan, tasodifiy
advertently (adv) => ataylab, qasddan, ongli ravishda
inadvertently (adv) => beixtiyor, bilmasdan, tasodifan

simply => shunchaki, oddiygina, soddagina

coercion (n) => majburlash, bosim o'tkazish
coerce (v) => majburlamoq, bosim o'tkazib qildirmoq
coercive (adj) => majburlovchi, bosim orqali majburlaydigan
coercible (adj) => majburlash mumkin bo'lgan
coercively (adv) => majburlash yo'li bilan, bosim o'tkazib

observation (n) => kuzatish, kuzatuv, kuzatuv natijasida olingan fikr yoki ma'lumot
observer (n) => kuzatuvchi, kuzatib turgan odam
observance (n) => rioya qilish, qoidalarga amal qilish, diniy marosimga amal qilish
observatory (n) => observatoriya, ilmiy kuzatuv olib boriladigan inshoot
unobservability (n) => kuzatib bo'lmaslik
observe (v) => kuzatmoq, diqqat bilan qaramoq, rioya qilmoq, qayd etmoq
observant (adj) => kuzatuvchan, mayda tafsilotlarni tez payqaydigan
oberservational (adj) => kuzatuvga asoslangan, kuzatish orqali olingan
unobserved (adj) => kuzatilmagan, payqalmagan
unobservable (adj) => kuzatib bo'lmaydigan, bevosita kuzatish mumkin bo'lmagan
observantly (adv) => kuzatuvchan tarzda, diqqat bilan kuzatib
observationally (adv) => kuzatuv asosida, kuzatish orqali

precise => aniq, aniq-ravshan, batafsil va xatosiz 

underlie (v) => asosida yotmoq, negizini tashkil qilmoq, sabab bo'lmoq
underlying (adj) => asosiy, negizidagi, tagida yotgan, yashirin yoki asosiy sabab bo'lgan

evaluation (n) => baholash, baho, tahlil, xulosa
evaluator (n) => baholovchi, ekspert
reevaluation (n) => qayta baholash
evaluate (v) => baholamoq, tekshirib baho bermoq, qiymatini aniqlamoq
reevaluate (v) => qayta baholamoq
overevaluate (v) => ortiqcha yuqori baholamoq
evaluative (adj) => baholashga oid, baho beruvchi
evaluable (adj) => baholash mumkin bo'lgan
evaluated (adj) => baholangan
unevaluated (adj) => baholanmagan
evaluatively (adv) => baholash nuqtai nazaridan

purity (n) => tozalik
impurity (n) => aralashma, ifloslik
purification (n) => tozalash jarayoni
purifier (n) => tozalagich 
purity (v) => tozalamoq
pure (adj) => toza, sof
impure (adj) => aralashmali, iflos
purely (adv) => faqat, butunlay
impurely (adv) => aralashgan holda

incident (n) => hodisa, voqea, noxush hodisa
incidence (n) => yuz berish darajasi, kasallik yoki hodisaning uchrash darajasi
incidentals (n) => qo'shimcha mayda xarajatlar yoki qo'shimcha narsalar
incidental (adj) => asosiy narsaga bevosita aloqador bo'lmagan, tasodifiy, yo'l-yo'lakay yuzaga kelgan
incidentally (adv) => aytgancha, shu o'rinda, qo'shimcha tarzda

coincidence (n) => tasodif, tasodifan bir xil yoki ustma-ust kelish, tasodifiy mos kelish
coincidental (adj) => tasodifiy, tasodifan yuz bergan, tasodifan bir-biriga mos kelgan
coincidentally (adv) => tasodifan, tasodifiy ravishda

compliment (n) => maqtov, yaxshi gap, iltifot
compliment (v) => maqtamoq, iltifot bildirmoq
complimentary (adj) => maqtov bildiruvchi, maqtov tarzidagi, bepul, tekin
complimentarily (adv) => maqtov tarzida

monument (n) => yodgorlik, haykal, monument
monumentability (n) => ulkanlik, mahobatlilik
monumentalization (n) => yodgorlik darajasiga ko'tarish
monumentalize (v) => yodgorlik darajasiga ko'tarmoq, monumental tus bermoq
monumental (adj) => ulkan, mahobatli, monumental, tarixiy ahamiyatga ega
monumentally (adv) => ulkan yoki mahobatli tarzda, nihoyatda

memory (n) => xotira, eslab qolish qobiliyati
memorical (n) => yodgorlik, xotira yodgorligi
memorization (n) => yodlash, yodlab olish
momorialization (n) => xotirasini abadiylashtirmoq
memorize (v) => yodlamoq, yodlab olmoq
momorialize (v) => xotirasini abadiylashtirmoq, xotirasiga bag'ishlamoq
memorable (adj) => esda qolarli
memorably (adv) => esda qolarli tarzda
memorical (adj) => xotiraga bag'ishlangan

religion => din, diniy e’tiqod

coherence (n) => izchillik, mantiqiy bog‘liqlik, yaxlitlik
coherent (adj) => izchil, mantiqan bog'langan, yaxlit
coherently (adv) => izchil tarzda, mantiqan bog'langan holda

slightly => biroz, ozgina, sal

suffering (n) => azob, iztirob
sufferer (n) => azob chekuvchi, bemor
sufferance (n) => toqat, ko'nish, ruxsat
suffer (v) => azob chekmoq, iztirob chekmoq, zarar ko'rmoq
suffer (v) => boshdan kechirmoq, uchramoq
suffering (adj) => azob chekayotgan
sufferable (adj) => chidasa bo'ladigan
insufferable (adj) => chidab bo'lmas, toqat qilib bo'lmas
long-suffering (adj) => sabr-toqat, uzoq azob chekkan
insufferably (adv) => chidab bo'lmas darajada

spirit (n) => ruh, ruhiyat, kayfiyat, ruhiy holat, jasorat
spiritedness (n) => g'ayratlilik, jo'shqinlik
spiritualization (n) => ma'naviyatlashtirish, ruhiy mazmun berish
spirituality (n) => ma'naviyat, ruhiylik
spiritlessness (n) => g'ayratsizlik, ruhsizlik
spirit (v) => ruhlantirmoq, ruhini ko'tarmoq
spiritualize (v) => ma'naviy yoki ruhiy mazmun bermoq, ruhiylashtirmoq
spirited (adj) => g'ayratli, jo'shqin, serg'ayrat
spiritual (adj) => ruhiy, ma'naviy, ruhga oid
spiritless (adj) => ruhsiz, g'ayratsiz, jo'shqinsiz
spiritedly (adv) => g'ayrat bilan, jo'shqin tarzda
spiritually (adv) => ruhiy yoki ma'naviy jihatdan
spiritlessly (adv) => g'ayratsiz tarzda, jo'shqinsiz

snuggling => quchoqlashib yotish / mehr bilan bag‘riga bosib o‘tirish

beauty (n) => go'zallik, chiroy
beautification (n) => obodonlashtirish, bezatish, chiroyli qilish
beautifulness (n) => chiroylilik, go'zallik
beautify (v) => chiroyli qilmoq, bezamoq
beautiful (adj) => chiroyli, go'zal
beautifully (adv) => chiroyli tarzda , go‘zal tarzda, juda chiroyli qilib

practical => amaliy / kerakli

frustration (n) => hafsala pir bo'lishi, ranjish, asabiylashish, barbod bo'lish
frustrate (v) => hafsalasini pir qilmoq, asabini buzmoq, ranjitmoq, barbod qilmoq (reja, urinishni)
frustrated (adj) => hafsalasi pir bo'lgan, asabiylashgan, ranjigan
frustrating (adj) => asabni buzadigan, hafsalani pir qiladigan
frustratedly (adv) => hafsalasi pir bo'lib, asabiylashib
frustratingly (adv) => asabni buzadigan darajada, achinarli tarzda

elevation (n) => ko'tarish, balandlik, yuksaltirish
elevate (v) => ko'tarmoq, yuqoriga ko'tarmoq, oshirmoq, yuqori darajaga olib chiqmoq
elevated (adj) => yuqori, ko'tarilgan, baland
elevatedly (adv) => yuqori tarzda

presently => hozir / ayni paytda / hozirda

examiner (n) => imtihon oluvchi, imtihon tekshiruvchisi, tekshiruvchi mutaxassis
examinee (n) => imtihon topshiruvchi
examination (n) => imtihon, tekshiruv, tibbiy ko'rik
exam (n) => imtihon
examine (v) => tekshirmoq, ko'zdan kechirmoq, sinab ko'rmoq, ko'rikdan o'tkazmoq
reexamine (v) => qayta tekshirmoq, qayta ko'rib chiqmoq
cross-examine (v) => guvohni qayta so'roq qilmoq
examined (adj) => tekshirilgan
unexamined (adj) => tekshirilmagan, o'rganilmagan
examinable (adj) => imtihonga kiritiladigan, tekshirilishi mumkin bo'lgan

candidate (n) => nomzod, lavozimga yoki ishga yoki saylovga davogar
candidacy (n) => nomzodlik, nomzod bo'lish holati

equalizer (n) => tenglashtiruvchi, muvozanatlashtiruvchi vosita yoki shaxs
equalizer (n) => ekvalayzer, tovush chastotalarini sozlovchi qurilma yoki dastur
equalization (n) => tenglashtirish, muvozanatlashtirish
equality (n) => tenglik
equal (v) => teng bo'lmoq, teng kelmoq
equalize (v) => tenglashtirmoq, muvozanatlashtirmoq
equal (adj) => teng, barobar
equally (adv) => teng ravishda, bir xil darajada

assault (n) => hujum, tajovuz, zo'ravon hujum, jismoniy hujum
assaulter (n) => hujum qiluvchi, tajavuzkor
assault (v) => hujum qilmoq, tajovuz qilmoq, zo'ravonlik bilan hujum qilmoq
assaultive (adj) => tajavuzkor, hujumkor
assaulted (adj) => hujumga uchragan, hujum qilingan

pinstripe => juda ingichka, tik chiziqli naqsh

quiff => oldinga ko‘tarib turmaklangan soch turmagi.

classiness (n) => didlilik, nafislik, yuqori darajadagi ko'rinish
classy (adj) => didli, nafis, zamonaviy va yuqori darajadagi, hashamatli
classily (adv) => did bilan, nafis tarzda

barber (n) => erkaklar sartaroshi (soqol-mo'ylov bilan ishlovchi)
barbershop (n) => erkaklar sartaroshxonasi
barbering (n) => sartaroshlik kasbi
barber pole (n) => sartaroshxona belgisi (qizil-oq-ko'k aylanuvchi ustun)
barber (v) => sartaroshlik qilmoq

barb (n) => tikan, qildiq, achchiq gap
barb (v) => qiltiq o'rnatmoq
barbed (adj) => tikanli, achchiq, nishabli
barbed wire (n) => tikanli sim
barbel (n) => mo'ylovli baliq, baliqning mo'ylovi

hair (n) => soch, tuk, jun
hairdo (n) => soch turmagi, soch turi
hairdresser (n) => sartarosh, sochlarni olib turuvchi usta
hairstyle (n) => soch turmagi
hairstylist (n) => soch stilisti
haircut (n) => soch oldirish, soch turmagi
hairband (n) => soch tasmasi
hairdryer (n) => fen, soch quritgich
hairspray (n) => soch laki
hairiness (n) => tukdorlik
hairy (adj) => sochli, tukli, xavfli, tahlikali
hairless (adj) => sochsiz, tuksiz
hair-raising (adj) => tuklarni tik qiluvchi, dahshatli

outfit => kiyim-kechak to‘plami / kiyinish uslubi

bless (v) => duo qilmoq, Xudoning marhamatini tilamoq

half (n) => taym (sportda)
half-time (n) => taymlar orasidagi tanaffus
halve (v) => ikkiga bo'lmoq, yarmiga kamaytirmoq
halfway (adj) => o'rtadagi, chala, yarim-yorti
half-hearted (adj) => beixtiyor, sust, chala
halfway (adv) => yarim yo'lda, o'rtasida, qisman

sore => og‘rigan, og‘riqli, achishgan

bag (n) => sumka, xalta, qop
bagginess (n) => kenglik, bo'sh bichimlik, kiyimning badanga yopishmasligi
bagging (n) => sumkaga yoki xaltaga solich, qadoqlash
bag (v) => sumkaga solmoq, qo'lga kiritmoq
baggy (adj) => keng, bo‘sh, badaniga yopishmaydigan

crevasse (n) => muzlikdagi chuqur yoriq
crevice (n) => tor yoriq, darz
crevassed (adj) => yoriqlar bilan qoplangan

sledge => chana

embarrassment (n) => xijolat, noqulaylik, uyatli holat
embarrass (v) => xijolatga solmoq, noqulay ahvolga qo'ymoq, uyaltirmoq
embarrassed (adj) => xijolat bo'lgan, noqulay ahvolga tushgan, uyalgan
embarrasing (adj) => xijolatli, uyatli, noqulay ahvolga soladigan

surprise (n) => syurpriz, kutilmagan sovg‘a yoki hodisa, hayrat
surprise (v) => hayratga solmoq, ajablantirmoq, kutilmaganda duch kelmoq
surprised (adj) => hayratda qolgan, ajablangan
surprising (adj) => hayratlanarli, kutilmagan
unsurprising (adj) => ajablanarli bo'lmagan
unsurprised (adj) => ajablanmagan
surprisingly (adv) => kutilmaganda, hayratlanarli darajada
unsurprisingly (adv) => ajablanarli bo'lmagan tarzda, kutilganidek
surprisedly (adv) => hayrat bilan, ajablanib

grot (n) => axlat, keraksiz narsa
grottiness (n) => ifloslik, ko'rimsizlik, yoqimsizlik
grotty (adj) => iflos, ko'rimsiz, yoqimsiz, eskirgan, o'zini yomon his qilayotgan
grottily (adv) => iflos va ko'rimsiz holda

upstairs (n) => yuqori qavat
upstairs (adj) => yuqori qavatdagi

spoon (n) => qoshiq
spoonful (n) => bir qoshiq miqdor
spoonerism (n) => so'zlardagi tovushlarni adashtirib yuborish hodisasi
spoon (v) => qoshiq bilan yemoq, qoshiq bilan olmoq
spoon (v) => yonboshlab, bir-biriga yopishib quchoqlashib yotmoq
spoon-feed (v) => qoshiq bilan ovqatlantirmoq, hamma narsani tayyor holda berib qo'ymoq

sharp => aniq, aynan; o‘tkir; keskin

appointment (n) => uchrashuv, belgilangan qabul, tayinlash
appointee (n) => tayinlangan shaxs, lavozimga tayinlangan odam
appoint (v) => tayinlamoq, belgilamoq, lavozimga tayinlamoq
appointive (adj) => tayinlashga oid, tayinlash orqali amalga oshiriladigan
appointed (adj) => tayinlangan, belgilangan

marvelousness (n) => ajoyiblik, hayratlanarlilik
marvel (n) => mo'jiza, ajoyib narsa, hayratlanarli hodisa
marvel (v) => hayratlanmoq, lol qolmoq, qoyil bo'lmoq
marvelous (adj) => ajoyib, ajabtovur, hayratlanarli, a'lo
marvelously (adv) => ajoyib darajada, a'lo tarzda

launch (n) => ishga tushirish, boshlash, yangi mahsulotni bozorga chiqarish, ushirish
launcher (n) => ishga tushirgich, uchirgich, ishga tushiruvchi dastur yoki qurilma
launch (v) => ishga tushirmoq, boshlamoq, bozorga chiqarmoq, uchirmoq
launchable (adj) => ishga tushirish yoki uchirish mumkin bo'lgan

rationale => sabab, asos, mantiqiy izoh

glory (n) => shon-shuhrat, ulug'vorlik, buyuklik, go'zallik, joziba
glorification (n) => ulug'lash, madh etish
glory (v) => faxrlanmoq, g'ururlanmoq, zavqlanmoq
glorify (v) => ulug'lamoq, madh etmoq, bo'rttirmoq
glorious (adj) => ulug'vor, shonli, ajoyib, a'lo
gloried (adj) => shon-shuhratga burkangan
inglorious (adj) => sharmandali, shon-shuhratsiz
gloriously (adv) => ulug'vorlik bilan, ajoyib darajada
ingloriously (adv) => sharmandali tarzda, nomussiz

nightmare (n) => qo'rqinchli tush, dahshatli tush, kabus, juda noqulay, qiynaydigan, boshga ko‘p tashvish keltiradigan vaziyat
nightmarishness (n) => dahshatlilik, juda og'ir yoki qo'rqinchli holat
nightmarish (adj) => dahshatli tushga o'xshash, juda qo'rqinchli, juda og'ir
nightmarishly (adv) => dahshatli tarzda, juda og'ir tarzda

forgiveness (n) => kechirim, afv, kechirish
forgive (v) => kechirmoq, afv etmoq
forgiving (adj) => kechirimli, kechira oladigan
forgivable (adj) => kechirish mumkin bo'lgan
unforgivable (adj) => kechirib bo'lmaydigan
unforgiving (adj) => kechirimli bo'lmagan, xatoga yo'q qo'ymaydigan


valet (n) => shaxsiy xizmatkor (odatda erkak), boy yoki yuqori martabali erkakka kiyinish yoki shaxsiy buyumlari va kundalik ishlarida xizmat qiladigan erkak, mehmonxona yoki restoran va shunga o'xshash joylarda mijozning mashinasini qabul qilib parkovka qilib beradigan xodim

buddy (n) => do‘stim, og‘ayni, jo'ra, o'rtoq
buddy (v) => do'stlashmoq, do'st bo'lmoq

precious => qimmatli, bebaho, aziz.

audacity (n) => surbetlik, betlik, haddan oshish, o'ta dadillik, kutilmagan jasorat
audaciousness (n) => surbetlik, haddan tashqari dadillik, 
audacious (adj) => surbet, beti qalin, haddan tashqari dadil, jasur, dadil
audaciously (adv) => surbetlarcha, haddan tashqari dadillik bilan, dadil tarzda

infuriation (n) => qattiq g'azabga keltirish
infuriate (v) => g'azablantirmoq, juda jahlini chiqarmoq
infuriated (adj) => juda qattiq g‘azablangan, jahli chiqqan, qattiq achchiqlangan
infuriating (adj) => juda g'azablantiradigan, jahlni chiqaradigan

madness (n) => aqldan ozish, telbalik, jinnilik
madden (v) => qattiq g'azablantirmoq, juda jahli chiqishiga sabab bo'lmoq
mad (adj) => aqldan ozgan, jinni, juda g'azablangan
maddening (adj) => juda asabiylashtiradigan, jahli chiqadigan darajada
maddened (adj) => qattiq g'azablangan
madly (adv) => telbalarcha, juda qattiq, haddan tashqari

brazenness (n) => surbetlik, uyatsizlik, betakalluflik, haddidan oshish
brazen (v) => betga choparlik qilmoq, dadil va uyatsizlarcha qarshi turmoq
brazen (adj) => surbet, uyatsiz, betakalluf, haddidan oshgan
brazenly (adv) => surbetlarcha, uyatsizlarcha, ochiqchasiga va betakalluf tarzda

provoking => qo‘zg‘atish, jahlini chiqarish, g‘ashiga tegish

drunkenness (n) => mastlik, ichkilikbozlik holati
drunk (n) => mast odam, ichib mast bo'lgan odam
drunk (adj) => mast, ichimlikdan mast bo'lgan

pestered => bezovta qilishdi, tinchlik bermadilar

splendidness (n) => ajoyiblik, muhtashamlik
splendiferousness (n) => nihoyatda ajoyiblik
splendid (adj) => ajoyib zo'r, juda yaxshi, muhtasham
splendiferous (adj) => nihoyatda ajoyib, juda zo'r
splendidly (adv) => ajoyib tarzda, juda yaxshi tarzda, muhtasham tarzda
splendiferously (adv) => nihoyatda ajoyib tarzda

deception (n) => aldov, firib, yolg'on yo'l bilan chalg'itish
deceiver (n) => firbgar, aldamchi odam
deceive (v) => aldamoq, yanglishtirmoq, aldov bilan chalg'itmoq
deceptive (adj) => aldamchi, chalg'ituvchi, noto'g'ri tasavvur uyg'otadigan
deceptively (adv) => aldamchi tarzda, chalg'ituvchi tarzda

greeting (n) => salomlashish, salom, tabrik
greeter (n) => kutib oluvchi kishi
greeting card (n) => tabrik otkritkasi
greet (v) => salomlashmoq, kutib olmoq, munosabat bildirmoq
regreet (v) => qayta salomlashmoq
greeting (adj) => salomlashuvga oid
ungreeted (adj) => kutib olinmagan, salom berilmagan
greetingly (adv) => salomlashish, salom bilan

robust => kuchli, ishonchli

endowment (n) => hadya qilingan mablag', fond, ato etilgan qobiliyat yoki sifat
endow (v) => bermoq, ato etmoq, mablag' bilan ta'minlamoq
endowed (adj) => ato etilgan, berilgan mablag' bilan ta'minlangan

damn (n) => zarracha, pul
damnation (n) => la'nat, abadiy azob
damn (v) => la'natlamoq, qattiq tanqid qilmoq, do'zaxga mahkum qilmoq, yomon ko'rsatmoq
damned (adj) => la'natii, la'natlangan
damnable (adj) => la'natga loyiq, jirkanch
damned (adv) => juda, haddan tashqari
damnably (adv) => jirkanch darajada
damningly (adv) => ayblovchi tarzda

gallop (n) => ot chopishi, chopib ketish, tez yurish tezligi
galloper (n) => chopqir ot, chopib ketuvchi
gallop (v) => to'rt oyoqlab chopmoq, ot chopib bormoq, shiddat bilan yugurmoq, tez o'tib ketmoq
galloping (adj) => chopayotgan, shiddat bilan o'stayotgan

butt (n) => dumba, orqa, sigaretaning qolgan qismi
buttocks (n) => dumbalar, dumba qismi
butt (v) => bosh bilan urmoq, to'qnashmoq

crack (n) => yoriq, darz, qars etgan ovoz, urinish
crackdown (n) => qattiq choralar ko'rish, taziyq
crackle (n) => chirsillagan ovoz
crack (v) => yorilmoq, darz ketmoq, yormoq, qars etmoq, muammoni hal qilmoq, kodni ochmoq
crack (adj) => a'lo darajadagi, mohir
cracked (adj) => yorilgan, darz ketgan, telba

almighty (adj) => qodir, barcha narsaga qodir, cheksiz qudratli
the Almighty (n) => Qodir Xudo, Xudo
almightiness (n) => cheksiz qudrat, barcha narsaga qodirlik
almightily (adv) => nihoyatda qudrat bilan

will (n) => iroda, xohish, vasiyatnoma
willingness (n) => tayyorlik, xohish, rozilik
willpower (n) => iroda kuchi
will (v) => irodasi bilan erishmoq, kuch bilan istamoq, vasiyat qilib qoldirmoq
willing (adj) => tayyor, rozi, xohishga ega
unwilling (adj) => istamaydigan, rozi bo'lmagan
willful (adj) => o'jar, o'jarlik qiladigan, qasddan qilingan
willingly (adv) => mamnuniyat bilan, ixtiyoriy ravishda
willfully (adv) => qasddan, o'jarlik bilan

parting => xayrlashuv, ayriliq; ketish oldidagi

ad hoc (adj) => muayyan vaziyat uchun maxsus qilingan, aynan shu holat uchun qilingan, vaziyatga qarab qilingan
ad hoc (adv) => muayyan vaziyat uchun maxsus qilingan, aynan shu holat uchun qilingan, vaziyatga qarab qilingan

likeness (n) => o'xshashlik
like (adj) => o'xshash
unlike (adj) => o'xshamaydigan
likely (adj) => ehtimoliy, bo'lishi mumkin bo'lgan
unlikely (adj) => ehtimoli kam, ehtimoldan yiroq
like (v) => yoqtirmoq
likely (adv) => ehtimol, katta ehtimol bilan
likewise (adv) => xuddi shunday, shuningdek

constitution (n) => konstitutsiya, tuzilish, tarkib, tana tuzilishi, salomatlik
constituent (n) => tarkibiy qism, saylovchi
constituency (n) => saylov okrugi, saylovchilar
constitute (v) => tashkil qilmoq, tashkil etmoq, hosil qilmoq
reconstitute (v) => qayta tiklamoq, qayta tuzmoq
constituent (adj) => tarkibiy, tashkil etuvchi
constitutional (adj) => konstitutsiyaviy, tabiiy, tug'ma
unconstitutional (adj) => konstitutsiyaga zid
constitutionally (adv) => konstitutsiyaga muvofiq, tabiatan, tug'ma ravishda

realise => amalga oshirmoq, yaratmoq, tayyor holatga keltirmoq

scratch (noun) => tirnalish, tirnalgan joy
scratch (verb) => tirnamoq, qashimoq

rollback => oldingi holatga qaytarish / avvalgi versiyaga qaytarish
rollback (verb) => oldingi holatga qaytarmoq

artifact (n) => inson tomonidan yaratilgan buyum, ashyoviy yodgorlik, artefakt
arfifact (n) => biror jarayon natijasida hosil bo'lgan narsa, mahsulot, hosila
artefact (n) => jarayon natijasida yaratilgan fayl yoki natija, build natijasi, hosil bo'lgan obyekt (technical)

elegance (n) => nafislik, didlilik, ko'rkamlik, soddalik va puxtalik
elegant (adj) => nafis, didli, ko'rkam, sodda va puxta, sodda va oqilona, puxta o'ylangan
elegantly (adv) => nafis tarzda, did bilan, sodda va oqilona tarzda

arbitariness (n) => o'zboshimchalik, mezonsizlik, aniq qoidaga asoslanmaganlik
arbitration (n) => nizoni mustaqil hakam yoki hakamlar hay’ati orqali hal qilish jarayoni
arbitrator (n) => hakam, nizoni hal qiluvchi shaxs
arbitrate (v) => hakamlik qilmoq, nizoni hal qilmoq
arbitrary (adj) => ixtiyoriy, o'zboshimchalik bilan tanlangan, aniq bir qoidaga yoki mezonga asoslanmagan
arbitrable (adj) => arbitraj orqali hal qilinishi mumkin bo'lgan
arbitarily (adv) => o'zboshimchalik bilan, ixtiyoriy ravishda, aniq mezonsiz

derivative (n) => hosila
derivation (n) => kelib chiqish, hosil qilish, hosil bo'lish
derive (v) => keltirib chiqarmoq, hosil qilmoq
derivative (adj) => hosilaviy, kelib chiqqan
derivable (adj) => keltirib chiqarish yoki hosil qilish mumkin bo'lgan

assembly (n) => yig'ish, birlashtirish, yig'ilish, yig'ilgan guruh
disassembly (n) => qismlarga ajratish, qismlarga bo'lish
assembler (n) => yig'uvchi, yig'ib-tuzuvchi
assemblage (n) => yig'indi, birikma, turli narsalardan tashkil topgan majmua
assemble (v) => yig‘moq, birlashtirmoq, jamlamoq, qismlardan bir butun qilib tuzmoq
disassemble (v) => qismlarga ajratmoq, qismlarga bo'lmoq
assemblable (adj) => yig'ish mumkin bo'lgan, birlashtirish mumkin bo'lgan
assembled (adj) => yig'ilgan, birlashtirilgan, jamlangan
disassembled (adj) => qismlarga ajratilgan

contrast (v) => farq qilmoq, qarama-qarshi qo‘ymoq / taqqoslamoq
contrast (n) => farq, qarama-qarshilik

unification (n) => birlashtirish, birlashish, yagona holga keltirish
unifier (n) => birlashtiruvchi shaxs yoki narsa
unify (v) => birlashtirmoq, yagona holga keltirmoq
unified (adj) => birlashtirilgan, yagona, bir butun holga keltirilgan
unifying (adj) => birlashtiruvchi, birlashtirishga xizmat qiladigan
unifiedly (adv) => yagona tarzda, birlashgan holda

proprietary => xususiy, mulkiy, yopiq

mandate (n) => vakolat, mandat (saylovchilar bergan), rasmiy buyruq, topshiriq
mandator (n) => topshiriq beruvchi 
mandatory (n) => vakolatli davlat yoki shaxs
mandate (v) => vakolat bermoq, majburiy qilib belgilamoq, buyurmoq
mandatoriy (adj) => majburiy, shart bolmagan, bajarilishi shart
non-mandatory (adj) => majburiy bo'lmagan
mandated (adj) => majburiy qilib belgilangan, vakolat berilgan
mandatorily (adv) => majburiyat tarzda, shart qilib

bilingualism (n) => ikki tillilik, ikki tilni bilish va ishlatish holati
bilingual (n) => ikki tilda gapira oladigan odam, ikki tilli kishi
bilingual (adj) => ikki tilli, ikki tilda gapira oladigan, ikki tilda ishlatiladigan
bilingually (adv) => ikki tilda, ikki tilli tarzda

prior => oldingi / avvalgi / oldin

estate (n) => mulk, katta yer-mulk, meros, turar-joy massivi
real estate (n) => ko'chmas mulk
estate agent (n) => ko'chmas mulk agenti
realtor (n) => ko'chmas mulk agenti

invocation (n) => chaqirish, ishga tushirish, qo'llash
invoker (n) => chaqiruvchi, ishga tushiruvchi
invoke (v) => chaqirmoq, ishga tushirmoq, qo'llamoq, asos qilib keltirmoq
invocable (adj) => chaqirish yoki ishga tushirish mumkin bo'lgan

within (n) => ichki qism
within (adv) => ichkarida, ichida

power (n) => ...

provide => ta’minlamoq, bermoq, taqdim etmoq

reproducibility => qayta tiklanish imkoniyati, qayta aynan takrorlash mumkinligi

reproducible => qayta takrorlash mumkin bo‘lgan, qayta aynan yaratish mumkin bo‘lgan.

identity (n) => shaxs, kimlik, o'zlik
identification (n) => aniqlash, shaxsni tasdiqlash, shaxsni tasdiqlovchi hujjat
identifiability (n) => aniqlash mumkinligi
identifier (n) => identifikator, aniqlovchi belgi yoki kod
identify (v) => aniqlamoq, tanib olmoq, kimligini aniqlamoq
identical (adj) => aynan bir xil, mutlaqo bir xil, bir-biridan farq qilmaydigan
identifiable (adj) => aniqlash yoki tanib olish mumkin bo'lgan
unidentificable (adj) => aniqlab yoki tanib bolmaydigan
identically (adv) => ayan bir xil tarzda

familiarity (n) => tanishlik, biror narsani yaxshi bilish, yaqinlik
familiarization (n) => tanishtirish, ko'nikish jarayoni
family (n) => oila
familiarize / familiarise (v) => tanishtirmoq, o'rgatmoq, o'zi tanishmoq
familiar (adj) => tanish, odatiy, xabardor
unfamiliar (adj) => notanish, begona
familial (adj) => oilaga oid
familiarly (adv) => o'zaro yaqin tarzda

produce => ishlab chiqarmoq / hosil qilmoq / yaratmoq

partially => qisman, to‘liq emas

altogether (adv) => umuman, butunlay, to'liq ravishda
altogether (adv) => jami, hammasini qo'shib hisoblaganda
altogether (adv) => umuman olganda, bir butun holda

festiveness (n) => bayramona kayfiyat, bayramona ruh
festive (adj) => bayramona, bayramga xos
festively (adv) => bayramona tarzda

vast (n) => bepayon kenglik
vast (adj) => keng, ulkan, juda katta, bepoyon
vastly (adv) => ancha, juda katta darajada

trifle (n) => arzimas narsa, ahamiyatsiz narsa, mayda-chuyda
trifle (v) => arzimas deb hisoblamoq, yengil qaramoq
trifling (adj) => arzimas, ahamiyatsiz, mayda-chuyda
trifingly (adv) => arzimas tarzda, ahamiyatsiz tarzda

okayness (n) => yaxshilik yoki qoniqari holat
okay (v) => ma'qullamoq, tasdiqlamoq, ruxsat bermoq
okay (adj) => yaxshi, joyida, qoniqarli
okay (adv) => yaxshi, muammosiz, qoniqarli tarzda

yacht (n) => yaxta, hashamatli qayiq yoki kema
yacht (v) => yaxtada sayohat qilmoq, yaxtada suzmoq
yachtsman (n) => yaxtachi, yaxtada suzuvchi erkak
yachtswooman (n) => yaxtachi, yaxtada suzuvchi ayol

offense / offence (n) => haqorat, ranjish, qonunbuzarlik, hujum
offender (n) => huquqbuzar, qoidabuzar, birovni ranjitgan odam
offensiveness (n) => haqorat yoki ranjituvchi xususiyat
offendability (n) => ranjishga moyillik, tez ranjish xususiyati
inoffensiveness (n) => ranjitmaslik xususiyati, zararsizlik
offend (v) => ranjitmoq, xafa qilmoq, haqorat qilmoq, odob yoki qoidani buzmoq
offendable (adj) => tez ranjishi mumkin bo'lgan
offending (adj) => ranjitadigan, haqoratli, qoidani buzuvchi
offended (adj) => ranjigan, haqoratli, qoidani buzuvchi
offensive (adj) => haqoratli, ranjitadigan, tajovuzkor
inoffensive (adj) => hech kimni ranjitmaydigan, zararsiz, odob doirasidagi
offensively (adv) => haqoratli tarzda, tajovuzkorona
inoffensively (adv) => hech kimni ranjitmaydigan tarzda

quarreling => janjallashish, tortishish

chatterbox (n) => ko‘p gapiradigan odam, gapdon, sergap odam (hazilona)
chatter (n) => valdirash, mayda-chuyda gaplar 
chatterer (n) => sergap odam, ko'p gapiruvchi (neytralroq )
chatter (v) => valdiramoq, mayda-chuyda gaplashmoq, sergaplik qilmoq

sweetheart (n) => azizim, jonim, sevgilim, yoqimtoy, mehribon odam
sweetness (n) => shirinlik, xushmuomalalik, yoqimlilik
sweets (n) => shirinliklar, konfetlar
sweetie (n) => azizim, jonim
sweeten (v) => shirinlashtirmoq, ko'nglini olmoq, yumshatmoq
sweet (adj) => shirin, yoqimtoy, mehribon
sweetened (adj) => shirinlashtirilgan
unsweetened (adj) => shirin qilinmagan
sweety (adv) => shirin tarzda, yoqimli ohangda, mehr bilan

stubbornness (n) => o'jarlik, qaysarlik
stubborn (adj) => o‘jar, qaysar, gapga kirmaydigan
stubbornly (adv) => o'jarlik bilan, qaysarlik bilan

salvation => najot, qutqarilish

sacrifice => qurbon qilmoq, voz kechmoq, fidoyilik qilmoq.

resist => qarshilik qilmoq, bo‘ysunmaslik

scraps => qolgan-qutgan narsalar, arzimas qoldiqlar

egoist (n) => xudbin, faqat o‘zini o‘ylaydigan odam
egotist (n) => o'zini juda yuqori baholaydigan, o'zini ko'p gapiradigan odam
egoism (n) => xudbinlik, o'z manfaatini ustun qo'yish
egoisttic (adj) => xudbin, o'z manfaatini ko'zlaydigan
egotistic (adj) => o'ziga bino qo'ygan, o'zini juda yuqori baholaydigan

dread (n) => kuchli qo'rquv, vahima, qo'rquv hissi
dreadfulness (n) => dahshatlilik, qo'rqinchlilik
dread (v) => qattiq qo'rqmoq, qo'rqib kutmoq
dreadful (adj) => dahshatli, qo'rqinchli, juda yomon
dreadfully (adv) => dahshatli darajada, juda yomon tarzda

sanity (n) => aql-hush, ruhiy sog'lomlik
insanity (n) => aqldan ozganlik, telbalik, aql bovar qilmas ahmoqlik
sane (adj) => alqi raso, ruhan sog'lom, oqilona
insane (adj) => aqldan ozgan, telba, aql bovar qilmas, juda zo'r yoki juda ahmoqona
insanitary (adj) => nosog'lom, antisanitar
sanely (adv) => oqilona, aqli rasolik bilan
insanely (adv) => aql bovar qilmas darajada, telbalarcha

spout (n) => suyuqlik chiqadigan naycha, jo'marakning quyish qismi, chiqish teshigi
spouter (n) => suyuqlikni otiltirib chiqaradigan narsa yoki qurilma
spouting (n) => otilib chiqish, otilib chiqayotgan suyuqlik, tinmay gapirish
spout (v) => otilib chiqmoq, suyuqlikni otilib chiqarmoq
spuot (v) => tinmay ko'p gapirmoq (be'mani gaplarni)
spouted (adj) => naychali, otilib chiqqan

flirtation (n) => noz-karashma, qisqa romantik munosabat
flirt (n) => noz-karashma, romantik qiziqish
flirting (n) => noz-karashma qilish, romantik qiziqish bildirish
flirt (v) => noz-karashma qilmoq, romantik qiziqishni bildirmoq
flirty (adj) => noz-karashmali, romantik qiziqish bildirayotgan
flirtatious (adj) => noz-karashmali, noz qiladigan
flirtatiously (adv) => noz-karashma bilan

slap => shapaloq, tarsaki

jealousy (n) => rashk, hasad
jealousness (n) => rashkchilik, hasadgo'ylik
jealous (adj) => rashkchi, hasadgo'y
jealously (adv) => rashk bilan, hasad bilan

ruin => buzmoq, barbod qilmoq

decency (n) => odoblilik, munosiblik, odob-axloq
indecency (n) => odobsizlik, nomaqbullik, uyatsiz xatti-harakat
decent (adj) => munosib, odobli, yaxshi, ma'qul, qoniqarli
indecent (adj) => odobsiz, nomaqbul, uyatsiz
decently (adv) => munosib tarzda, odob bilan, yaxshi darajada
indecently (adv) => odobsizlarcha, nomaqbul tarzda

craze (n) => ommaviy ishtiyoq, vaqtinchalik moda
crazy (n) => telba odam (kamsituvchi)
craziness (n) => telbalik, aqldan ozganlik, g'alati holat
craze (v) => aqldan ozdirmoq
crazy (adj) => telba, jinni, aql bovar qilmas, juda g'alati, ishqiboz
crazed (adj) => aqldan ozgan, jinni bo'lib qolgan, g'azabdan es-hushini yo'qotgan
crazily (adv) => telbalarcha, aqldan ozgandek, g'alati tarzda

freak (n) => g'alati odam, noodatiy odam, tabiatdagi g'alati hodisa, o'ta ishqiboz
freakishness (n) => g'alatilik, g'ayritabiiylik
freak (v) => cho'chib ketmoq, vahimaga tushmoq, qattiq hayajonlanmoq
freak (adj) => kutilmagan, g'ayritabiiy
freaky (adj) => g'alati, vahimali, ajoyib
freakishly (adv) => g'ayritabiiy darajada, g'alati tarzda

idiot (n) => ahmoq, tentak, esi past odam
idiocy (n) => ahmoqlik, tentaklik
idiotism (n) => ahmoqlik, ahmoqona xatti-harakat
idiotic (adj) => ahmoqona, tentaklarcha
idiotically (adv) => ahmoqona tarzda, tentaklarcha

pathetic => ayanchli, juda yomon, xarob

tangle (n) => chalkash tugun, chigal, chalkash vaziyat
entanglement (n) => chalkashlik, murakkab aloqa, to'siq
tangle (v) => chalkashtirmoq, chalkashib ketmoq (ip, soch, sim), murakkab vaziyatga solmoq
entangle (v) => chalkashtirib yubormoq, muammoga tortmoq, aralashtirmoq
untangle (v) => chigalini yozmoq, yechmoq, muammoni tushuntirmoq
desentangle (v) => ajratib olmoq, chigaldan chiqarmoq
tangled (adj) => chalkashib ketgan, chigal
tangly (adv) => chalkash, tugunlarga boy

bruise (n) => ko‘karish, lat yeyishdan hosil bo'lgan ko'karma
bruise (v) => ko'karmoq, lat yemoq, ko'kartirmoq
bruised (adj) => ko'kargan, lat yegan
bruiser (n) => baquvvat, mushtlashuvchan odam, kuchli zarba beruvchi odamb

fluster (n) => sarosima, dovdirash, hayajondan o'zini yo'qotish
fluster (v) => sarosimaga solmoq, dovdiratmoq
flustered (adj) => sarosimaga tushgan, dovdiragan hayajondan o'zini yo'qotgan
flustering (adj) => sarosimaga soladigan, dovdiratadigan
flusteredly (adv) => sarosimaga tushgan holda, dovdirab

startle (n) => cho'chitish, seskinish
startlement (n) => cho'chish, seskinish
startle (v) => cho'chitmoq, seskintirmoq, kutilmaganda qo'rqitib yubormoq
startled (adj) => cho'chib ketgan, seskanib qolgan
startling (adj) => hayratlanarli, kutilmaganda ta'sir qiladigan, odamni cho'chitadigan
startingly (adv) => hayratlanarli darajada, kutilmaganda

fall (n) => yiqilish, tushish, pasayish, qulash, kuz
downfall (n) => qulash, halokat, barbod bo'lish
waterfall / falls (n) => sharshara
windfall (n) => kutilmagan boylik, tekin omad
pitfall (n) => tuzoq, yashirin xavf
fall (v) => yiqilmoq, tushmoq, pasaymoq, botmoq, qulamoq
befall (v) => yomon narsa boshiga tushmoq
fallen (adj) => yiqilgan, tushgan, halok bo'lgan
falling (adj) => tushayotgan, pasayayotgan
fallible (adj) => xato qilish mumkin bo'lgan

drown (v) => cho'kib ketmoq, suvga cho'ktirmoq
drowner (n) => boshqa odamni yoki jonivorni suvga cho'ktiruvchi shaxs

sand => silliqlamoq, zımpara qilmoq

hull (n) => kema korpusi, kemaning asosiy tashqi qismi
hull (v) => po'stini yoki qobig'ini olib tashlamoq
hulled (adj) => po'sti yoki qobig'i olib tashlangan

paint => bo‘yamoq

polish => jilolamoq

cover (n) => qoplama, g'ilof, qopqoq, muqova, boshpana
coverage (n) => qamrov, sug'urta qoplamasi, sug'urta himoyasi
coverlet (n) => ko'rpa, yopinchiq
cover-up (n) => yashirish, fosh bo'lmasligi uchun qilingan harakat
cover (v) => qoplamoq, yopmoq, qamrab olmoq, yashirmoq, berkitmoq, masofani bosib o'tmoq, mavzuni yoritmoq
uncover (v) => ochmoq, fosh qilmoq, aniqlamoq
recover (v) => tiklamoq, qayta qo'lga kiritmoq, qayta qoplamoq
covered (adj) => yopilgan, qoplangan
uncovered (adj) => ochiq, yopilmagan
covert (adj) => yashirin, maxfiy
overt (adj) => ochiq-oydin
covertly (adv) => yashirincha, pinhona

precisely => aynan, aniq

reduce => kamaytirish uchun

exemplar (n) => namuna, o'rnak, namunali shaxs yoki  narsa
exemplification (n) => misol qilib ko'rsatish, namoyon etish
examplify (v) => misol qilib ko'rsatmoq, namoyon etmoq
exemplary (adj) => o‘rnak bo‘ladigan, namunali, a’lo darajadagi, juda yaxshi
examplarily (adv) => namunali tarzda, o'rnak bo'ladigan tarzda

idealism (n) => idealizm, ideal va yuksak g'oyalarga intilish
idealist (n) => idealist, idealga intiluvchi, orzu-idealga berilgan odam
idealization (n) => ideallashtirish, haqiqatdagidan mukammal qilib tasavvur qilish
idealizer (n) => ideallashtiruvchi shaxs
idealize (v) => ideallashtirmoq, biror kishini yoki narsani haqiqatdagidan mukammalroq deb tasavvur qilmoq
idealized (adj) => ideallashtirilgan, mukammallashtirib tasvirlangan
idealistic (adj) => idealistik, idealga intiluvchi, yuksak g'oyalarga asoslangan
idealist (adj) => idealistik, idealga asoslangan
idealistically (adv) => idealistik tarzda, idealga intilgan holda

narrow (n) => tor joy yoki oraliq
narrowness (n) => torlik, ensizlik, cheklanganlik
narrow-mindedness (n) => fikr torligi, tor dunyoqarash
narrowing (n) => toraytirish, torayish, doirani qisqartirish
narrow (v) => toraytirmoq, toraymoq, doirasini qisqartirmoq
narrow (adj) => tor, ensiz, cheklangan
narrowed (adj) => toraygan, qisqartirilgan
narrow-minded (adj) => fikri tor, tor dunyoqarashli
narrow (adv) => tor holda, tor tarzda
narrowly (adv) => tor doirada, zo'rg'a, juda oz farq bilan
narrow-mindedly (adv) => tor fikr bilan

anew (adv) => yangidan, qaytadan, boshqatdan

mold (n) => mog'or, qolip, shakl
moldiness (n) => mog'orlaganlik, mog'or hidi yoki holati
mold (v) => mog'orlamoq, mog'or bosmoq, qolipga solmoq
moldy (adj) => mog'orlagan, mog'or bosgan
moldless (adj) => mog'orsiz
mold-resistant (adj) => mog'orga chidamli
moldily (adv) => mog'orlagan tarzda

throat (n) => tomoq, halqum
throaty (adj) => bo'g'iq ovozli
throatly (adv) => bo'g'iq ovozda, tomoqdan chiqadigan ovoz bilan

relieve => yengillashtirmoq, xalos qilmoq, og‘riqni kamaytirmoq.

commute (n) => ishga yoki o'qishga borib kelish, muntazam qatnov
commuter (n) => ishga yoki o'qishga borib keladigan odam, qatnovchi
commute (v) => uy bilan ish yoki o'qish joyi o'rtasida muntazam borib-kelish

croissants (n) => krussanlar

nearness (n) => yaqinlik
near (v) => yaqinlashmoq
near (adj) => yaqin
nearby (adj) => yaqin atrofdagi
near (adv) => yaqin, yaqin joyda
nearly (adv) => dearly, qariyib
nearby (adv) => yaqin atrofda

bin (n) => axlat qutisi, chiqindi qutisi, saqlash uchun idish yoki quti
bin (v) => axlat qutisiga tashlamoq, tashlab yubormoq

basement (n) => yer to'la, binoning yer sathidan pastdagi qismi, yer osti qavati
basement-level (adj) => yerto'la darajasidagi, yer osti qavatidagi
basementless (adj) => yerto'lasi yo'q

cellar (n) => yerto'la, yer osti xonaasi, oziq-ovqat vino va boshqa narsalarni saqlash uchun joy
cellar (v) => yerto'lada saqlamoq
cellarage (n) => yerto'ladagi saqlash joyi yoki saqlash maydoni
cellarer (n) => yerto'la yoki oziq-ovqat zaxiralariga ma'sul shaxs, yerto'lachi
cellarful (n) => bir yerto'laga sig'adigan miqdor

wrinkle (n) => ajin, buraman, g'ijim, yuzdagi chiziq
wrinkliness (n) => ajinlilik, burishganlik
wrinkle (v) => burishtirmoq, ajin tushirmoq, g'ijimlamoq
wrinkled (adj) => ajin tushgan, burishgan, g'ijimlangan
wrinkly (adj) => ajinli, burishgan

fraud (n) => firbgarlik, firib, aldov yo'li bilan pul yoki manfaat olish
fraudster (n) => firbgar
fraudulent (adj) => firbgarlikka oid, firbgarlik yo'li bilan qilingan, soxta
fraudulently (adv) => firibgarlik yo'li bilan, aldov orqali

comb-up (n) => yuqoriga taralgan soch turmagi
comb (n) => taroq
comber (n) => tarovchi
comb (v) => taramoq

walthrough / walk-through (n) => bosqichma-bosqish tushuntirish, o'yinlarda o'tish qo'llanmasi, yurib ko'zdan kechirish
walk through (v) => bosqichma-bosqich tushuntirmoq
walk-through (adj) => ichidan o'tib ketiladigan, ikki tomoni ochiq

shift => ish joyida ma’lum vaqt oralig‘idagi smena.

postponing => kechiktirish, keyinga qoldirish 

soul => Ruh / Jon / Qalb

stamina (n) => chidamlilik, uzoq vaqt jismoniy yoki ruhiy kuchni saqlab qolish qobiliyati
staminous (adj) => chidamli, bardoshli
staminal (adj) => chidamlilikka oid, bardoshlilikka oid

business (n) => ish, biznes, tijorat, korxona
busyness (n) => bandlik, ish bilan band bo'lish holati
busy (adj) => band, gavjum, odam ko'p, ish bilan band, serqatnov
busily (adv) => band holda, faol tarzda

stuff (n) => narsalar, buyumlar, ishlar, gaplar, ma'lumotlar
stuffing (n) => ichiga solinadigan massa, tiqish yoki to'ldirish
stuff (v) => tiqmoq, solmoq, to'ldirmoq
stuffed (adj) => to'ldirilgan, ichi to'ldirilgan

situations => vaziyatlar, holatlar 

organized => tartibli, uyushgan, ishlarini reja asosida qiladigan 

discovery (n) => kashfiyot, topilma, yangi narsani aniqlash
discoverer (n) => kashfiyotchi, biror narsani kashf qilgan yoki topgan shaxs
discover (v) => kashf etmoq, topmoq, bilib olmoq, aniqlamoq
discoverable (adj) => aniqlash yoki topish mumkin bo'lgan

recognize => tanimoq, anglamoq, tushunib yetmoq, tan olmoq, e'tirof etmoq

refer => ishora qilmoq, nazarda tutmoq, tegishli bo'lmoq

utilizer (n) => foydalanuvchi
utilization / utilisation (n) => foydalanish, qo'llash, foydalanish darajasi
utility (n) => foydalilik, naf, komunal xizmat (elektr, suv, gaz), yordamchi dastur
utilities (n) => kommunal xizmatlar (elektr, suv, gaz to'lovlari)
utilize (v) => ununmli foydalanmoq, foydalanmoq, ishga solmoq, qo'llamoq
underutilize (v) => yetarli foydalanmaslik, imkoniyatdan to'liq foydalanmaslik
reutilize (v) => qayta foydalanmoq
utilitarian (adj) => foydalilikka asoslangan, amaliy, utilitar
utilizable (adj) => fodyalanish mumkin bo'lgan, yaroqli
underutilized (adj) => yetarli foydalanilmagan

association (n) => aloqa, bog'liqlik, bog'lanish, uyushma, assotsiatsiya
dissociation (n) => ajratish, aloqani uzish, bog'liqlining yo'qligi
associate (n) => hamkor, sherik, ish yuzasidan tanish odam
associator (n) => bog'lovchi, aloqador qiluvchi
associate (v) => bog'lamoq, aloqador deb hisoblamoq, bog'liq deb hisoblamoq, biror narsa bilan bog'liq holda o'ylamoq
dissociate (v) => ajratmoq, aloqasini uzmoq, bog'lamaslik
associational (adj) => uyushma yoki assotsiatsiyaga oid
associated (adj) => bog'liq, aloqador, tegishli
dissociated (adj) => ajralgan, aloqasi uzilgan

transformation (n) => o'zgarish, o'zgartirish, tubdan o'zgarish
transform (v) => o'zgartirmoq, tubdan o'zgartirmoq
transformative (adj) => tubdan o'zgaruvchi, katta o'zgarish keltiradigan
transformed (adj) => tubdan o'zgargan, o'zgartirilgan

undergo (v) => boshdan kechirmoq, boshidan o'tkazmoq, duch kelmoq, jarayondan o'tmoq

acceleration (n) => tezlashish, tezlashtirish, jadallashtirish
accelerate (v) => tezlashtirmoq, jadallashtirmoq
accelerative (adj) => tezlashtiruvchi, tezlashtirishga oid
accelerating (adj) => tezlashayotgan, jadallashayotgan
accelerated (adj) => tezlashtirilgan, jadallashtirilgan, tezlashgan

individual (n) => shaxs, alohida inson, odam
individuality (n) => o'ziga xoslik, shaxsiy xususiyat
individualism (n) => individualizm (shaxs manfaatini birinchi o'ringa qo'yish)
individualist (n) => individualist, mustaqil fikrlovchi odam
individualization (n) => har bir kishiga moslash
individualize / individualise (v) => har bir kishiga moslamoq, o'ziga xos qilmoq
individual (adj) => alohida, shaxsiy, har biriga xos
individualistic (adj) => o'ziga ishongan va mustaqil
individualized (adj) => har bir kishiga moslangan
non-individual (adj) => umumiy, shaxsga xos bo'lmagan
individually (adv) => alohida-alohida, har biri o'zi, yakka tartibda

collaboration (n) => hamkorlik, birgalikda ishlash, o'zaro hamkorlik
collaborate (v) => hamkorlik qilmoq
collaborative (adj) => hamkorlikka asoslangan
collaborator (n) => hamkor

scale (n) => masshtab 
scale (v) => masshtablamoq
scalable (adj) => masshtablanadigan
scalibility (n) => masshtablanish qobiliyati

safeguard (v) => himoya qilmoq, muhofaza qilmoq, xavfsizligini ta'minlamoq
safeguard (n) => himoya chorasi, xavfsizlik chorasi

paramount (adj) => eng muhim, birinchi darajali, nihoyatda muhim, ustuvor 

integrity (n) => halollik, prinsplarga sodiqlik, yaxlitlik, butunlik
integration (n) => birlashtirish, integratsiya, jamiyatga singib ketish
disintegration (n) => parchalanish, yemirilish
integer (n) => butun son
indegrate (v) => birlashtirmoq, qo'shib yubormoq, singib ketmoq
deintegrate (v) => parchalamoq, ajralib ketmoq
reintegrate (v) => qayta birlashtirmoq, jamiyatga qaytarmoq
integral (adj) => ajralmas, muhim tarkibiy qism
integrated (adj) => birlashtirilgan, uyg'unlashgan
integrative (adj) => birlashtiruvchi
intact (adj) => butun, buzilmagan
integrally (adv) => ajralmas tarzda, uzviy ravishda

confidentiality (n) => maxfiylik, ma'lumotlarning sir saqlanishi
confidence (n) => ishonch, o'ziga ishonch, sir
confident (n) => sirdosh (erkak)
confidente (n) => sirdosh (ayol)
confide (v) => sirini ishonib aytmoq, sirini ishonib topshirmoq
confidential (adj) => maxfiy 
confident (adj) => ishonchli, o'ziga ishongan
confiding (adj) => ishonuvchan, sirini bemalol aytadigan
confidentially (adv) => maxfiy tarzda, sir saqlash sharti bilan
confidently (adv) => ishonch bilan, dadil, o'ziga ishongan holda

availability (n) => mavjudlik, foydalanish mumkinligi, borligi, bo'shlik
unavailability (n) => mavjud emaslik, foydalanish imkoni yo'qligi, bandlik
avail (v) => foyda bermoq, naf bermoq
available (adj) => mavjud, bor, foydalanish mumkin bo'lgan, qo'lga kiritish mumkin bo'lgan, bo'sh
unavailable (adj) => mavjud emas, foydalanish mumkin emas, band, qo'lga kiritib bo'lmaydigan
availably (adv) => mavjud tarzda, foydalanish mumkin bo'lgan tarzda

operation (n) => faoliyat, ishlash jarayoni, operatsiya, jarrohlik amaliyoti
operator (n) => operator, qurilma yoki tizimni boshqaruvchi shaxs
operative (n) => ish bajaruvchi, mutaxassis
operationality (n) => ishlashga yaroqlilik yoki amaliy faoliyat holati
operationalization (n) => g'oya yoki rejani amalda bajariladigan shaklga keltirish
operability (n) => ishlatish yoki boshqarish mumkinligi, tizimning ishlashga yaroqliligi
inoperability (n) => ishlatib bo'lmaslik, ishlashga yaroqsizlik
operate (v) => ishlamoq, boshqarmoq, qurilmani ishlatmoq, operatsiya qilmoq
operationalize (v) => g'oya yoki rejani amlada bajariladigan shaklga keltirmoq
operational (adj) => ishlashga tayyor, faoliyat yuritayotgan, amaliyotga oid
operative (adj) => amalda ishlayotgan, kuchga ega, ta'sir qiluvchi
operable (adj) => ishlatish mumkin bo'lgan, ishlashga yaroqli
inoperable (adj) => ishlatib bo'lmaydigan, ishlamaydigan, tibbiyotda operatsiya qilib bo'lmaydigan
operationally (adv) => amaliy jihatdan, ishlash nuqtai nazaridan
operatively (adv) => amaliy jihatdan, operatsiya orqali

continuity (n) => uzluksizlik, davomiylik, to'xtamasdan davom etish, izchillik
discontinuity (n) => uzilish, uzluksizlikning yo'qligi
continuation (n) => davomi, davomiylik, izchillik
continuance (n) => davom etish, sud majlisini keyinga qoldirish
continuum (n) => uzluksiz qator, uzviy ketma-ketlik
continue (v) => davom etmoq
discontinue (v) => to'xtatmoq, bekor qilmoq
continuous (adj) => uzluksiz, tinimsiz
discontinuous (adj) => uzilib qolgan, uzoq-yuluq
continual (adj) => takrorlanib turadigan, tez-tez to'xtab-to'xtab davom etadigan
continued (adj) => davom etayotgan, davomli
continually (adv) => tez-tez, qayta-qayta
continously (adv) => uzluksiz ravishda, tinimsiz
discontinuously (adv) => uzilib-uzilib

regulatory (adj) => tartibga soluvchi, me'yoriy, qonunchilikka oid 

compliance (n) => rioya qilish, talabga muvofiqlik, qoidalarga bo'ysunish
non-compliance (n) => rioya qilmaslik, talablarga muvofiq bo'lmaslik
comply (v) => rioya qilmoq, talabga bo'ysunmoq, talabni bajarishga rozi bo'lmoq
compliant (adj) => talablarga rioya qiladigan, talablarga muvofiq
non-compliant (adj) => talablarga rioya qilmaydigan, talabga nomuvofiq

breach (v) => buzmoq, rioya qilmaslik, shartnoma yoki majburiyatni buzmoq
breach (n) => buzilish, qoidabuzarlik, shartnoma yoki majburiyatning buzilishi, xavfsizlik buzilishi

hesitation (n) => ikkilanish, tortinish
hesitancy (n) => ikkilanish yoki tortinish xususiyati
hesitate (v) => ikkilanmoq, tortinmoq, jur'at qilmay turmoq
hesitant (adj) => ikkilanayotgan, tortinayotgan, jur'atsiz
unhesitating (adj) => ikkilanmaydigan, qat'iy
hesitantly (adv) => ikkilanib, tortinib
unhesitatingly (adv) => ikkilanmasdan, qat'iy ravishda

ambiguity (n) => noaniqlik, ikki ma'nolilik, turlicha talqin qilish imkoniyati
disambiguation (n) => noaniqlikni bartaraf etish, ma'nosini aniqlashtirish
disambiguate (v) => noaniqlikni bartaraf etmoq, aniq ma'nosini belgilamoq
ambiguous (adj) => noaniq, ikki xil ma'noga ega, bir nechta talqinga ega, tushunarsiz
disambiguated (adj) => ma'nosi aniqlashtirilgan, noaniqligi bartaraf etilgan
ambiguously (adv) => noaniq tarzda, ikki ma'noli tarzda, turlicha talqin qilinadigan tarzda

team (n) => jamoa, guruh
teammate (n) => jamoadosh, bir jamoada ishlaydigan yoki o'ynaydigan odam

colleague (n) => hamkasb (bir tashkilot yoki sohada ishlaydigan odam)
ccoworker (n) => hamkasb, birga ishlaydigan odam (bir ish joyida ishlaydigan odam)

roommate => bir xonada yashaydigan odam (xonadosh)

schoolmate => maktabdosh

sounds good. => Yaxshi ekan. / Menga ma'qul. (Taklif, reja yoki g‘oyani ma'qullash uchun ishlatiladi.)

better (n) => yaxshiroq natija yoki holat, yaxshilanish
better (v) => yaxshilamoq, yaxshiroq qilmoq
better (adj) => yaxshiroq, ma'qulroq
better (adv) => yaxshiroq, yaxshiroq tarzda

suggestion (n) => taklif, maslahat, ishora, alomat
suggestibility (n) => ta'sirga tez berilish, ishontirishga moyillik
suggestive (adj) => ishora qiluvchi, o'ylashga undovchi, qo'pol ishorali
suggest (v) => taklif qilmoq, maslahat bermoq, ishora qilmoq, ko'rsatmoq, anglatmoq
suggestible (adj) => ta'sirga tez beriladigan
suggested (adj) => taklif qilingan
suggestively (adv) => ishora qilib, ma'noli tarzda

weakness (n) => zaiflik, kuchsizlik, kamchilik, zaif tomon, ishtiyoq, ojizlik
weakling (n) => zaif, kuchsiz odam
weaken (v) => zaiflashtirmoq, zaiflashmoq, susaymoq
weak (adj) => zaif, kuchsiz, pasaygan, yetarli darajada bo'lmagan
weakended (adj) => zaiflashgan, kuchsizlangan
weakly (adj) => zaif, kasalvand
weakly (adv) => zaif holda, kuchsizlik bilan

wallflower (n) => ziyofat yoki davralarda faol qatnashmaydigan, uyatchan, chetda turib boshqalarni kuzatadigan odam

perks => afzalliklar, foydali jihatlar

acclaim (n) => olqish, e'tirof , maqtov
acclaimer (n) => olqishlovchi, e'tirof etuvchi
acclaim (v) => olqishlamoq, yuqori baholamoq, e'tirof etmoq
acclaimable (adj) => olqishga loyiq, e'tirof etishga arziydigan
acclaimed (adj) => olqishlangan, yuqori baholangan, e'tirof etilgan
acclaimingly (adv) => olqishlab, maqtov bilan 

acknowledgment (n) => tan olish, e'tirof, tasidq, minnatdorchilik
acknowledged (adj) => tan olingan, e'tirof etilgan
acknowledge (v) => tan olmoq, e'tirof etmoq, tasdiqlamoq, bildirmoq

enclosure (n) => ilova qilingan hujjat yoki narsa
enclose (v) => ichiga solmoq, qo'shib yubormoq, o'rab yoki qamrab olmoq
enclosed (adj) => ichiga solingan, ilova qilingan, o'ralgan, yopiq

honestly (n) => halollik, rostgo'ylik
dishonestly (n) => insofsizlik, halol emaslik
honest (adj) => halol, rostgo'y, rost, haqqoniy
dishonest (adj) => insofsiz, halol bo'lmagan, yolg'onchi
honestly (adv) => rostini aytganda, ochig'ini aytganda, halol tarzda
dishonestly (adv) => insofsizlarcha, halol bo'lmagan tarzda

ham (n) => dudlangan yoki tuzlangan cho'chqa go'shti, vetchina
ham (n) => bo'rttirib o'ynaydigan aktyor
hamburger (n) => gamburger
ham (v) => bo'rttirib o'ynamoq
hammy (adj) => bo'rttirib o'ynaydigan
ham-fisted (adj) => ishni uddalay olmaydigan, tajribasiz

lap (n) => tizza ustidagi joy, aylana yoki masofa bosqichi, aylanish, tizza ustidagi joy
lapping (n) => ustma-ust tushish, suvning qirg'oqqa urilib turishi
lapper (n) => aylanani o'tuvchi, yalovchi
lap (v) => aylanani bosib o'tmoq, o'zib ketmoq, yalamoq
lapped (adj) => ustma-ust tushgan

tissue (n) => qog'oz salfetka, qog'oz ro'molcha (burun, yuz va mayda narsalarni artish uchun)
towel (n) => sochiq (umumiy nom)
hand towel (n) => qo'l sochig'i (qo'l quritish uchun)
face towel (n) => yuz sochig'i (yuz uchun)
washcloth (n) => kichik yuvinish sochig'i (yuz yoki tanani yuvish uchun)
beach towel (n) => plyaj sochig'i
bath sheet (n) => katta cho'milish sochig'i (oddiy bath towel dan kattaroq)
kitchen towel (n) => oshxona sochig'i (oshxonada artish uchun)
dish towel (n) => idish-tovoq sochig'i

reserve => bron qilmoq (formal)
reservation => bron qilingan joy

book (n) => kitob, daftar yoki jurnal, kitoblar ro'yxati yoki hisob-kitob yozuvlari
booker (n) => bron qiluvchi shaxs, bron qilihs bilan shug'ullanuvchi shaxs
booking (n) => bron qilish jarayoni, bron
bookstore (n) => kitob do'kon (🇺🇸)
bookshop (n) => kitob do'koni (🇮🇴)
book (v) => bron qilmoq, oldindan joy yoki bilat yoki xona ajratmoq
booked (adj) => bron qilingan, band qilingan
bookable (adj) => bron qilish mumkin bo'lgan

foreword (n) => so'zboshi, kirish so'zi, muqaddima

audience (n) => auditoriya, tomoshabin, tinglovchi
audient (n) => tinlovchi, auditoriya a'zosi
audienced (adj) => auditoriya oldida namoyish etilgan

intrigue (n) => fitna, yashirin reja, makr, sirli, qiziqarlilik
intriguer (n) => fitnachi, makkor reja tuzuvchi
intrigue (v) => qiziqtirmoq, qiziqish uyg'otmoq, hayratga solmoq, yashirin fitna uyushtirmoq
intrigued (adj) => qiziqib qolgan, qiziqishi uyg'ongan
intriguing (adj) => qiziqarli, sirli, e'tiborni tortadigan
intriguingly (adv) => qiziqarli tarzda, sirli ravishda

quickly (adv) => tezda, tez

accomplishment (n) => yutuq, muvaffaqiyat, erishilgan natija, bajarilgan ish
accomplisher (n) => bajaruvchi, amalga oshiruvchi
accomplish (v) => bajarib tugatmoq, amalga oshirmoq, muvaffaqiyatli uddalamoq, erishmoq
accomplishable (adj) => amalga oshirish mumkin bo'lgan, bajarish mumkin bo'lgan
accomplished (adj) => mohir, yetuk, yuqori malakali, amalga oshirilgan, bajarilgan
accomplishedly (adv) => mohirona, yuqori mahorat bilan

stealth (n) => yashirinlik, sezdirmasdan harakat qilish
stealthiness (n) => yashirinlik, sezdirmaslik xususiyati
stealthy (adj) => yashirin, sezdirmaydigan, pinhona
stealthily (adv) => yashirincha, sezdirmasdan, pinhona

aircraft (n) => havo kemasi, uchish apparati, havoda uchadigan transport vositasi
aircraftman (n) => aviatsiya xodimi, havo kemasi bilan ishlovchi shaxs
aircraft carrier (n) => aviatashuvchi kema

morph (n) => shakli o'zgarishi, bir tasvirdan boshqasiga silliq o'tish
morph (v) => shaklini o'zgartirmoq, bir shakldan boshqasiga o'tmoq
morphed (adj) => shakli o'zgargan, boshqa shaklga aylangan
mophable (adj) => shaklini o'zgartirish mumkin bo'lgan

relegate => biror narsani yoki odamni pastroq mavqega tushirmoq, ikkinchi darajaga surmoq, chetga surib qo'ymoq, kamroq muhim holatga o'tkazmoq.

gradualism (n) => bosqichma-bosqichlik
gradualist (n) => bosqichma-bosqich o'zgarishlarni yoqlovchi
gradualness (n) => asta-sekinlik
gradual (adj) => asta-sekin bo'ladigan, bosqichma-bosqich
gradually (adv) => asta-sekin, sekin-asta

abandon (v) => tashlab ketmoq, voz kechmoq, tark etmoq
abandonment (n) => tashlab ketish, voz kechish, tark etish
abandoned (adj) => tashlab ketilgan, qarovsiz qolgan
abandonable (adj) => tashlab ketish mumkin bo'lgan, voz kechish mumkin bo'lgan
unabandoned (adj) => tashlab ketilmagan
abandoner (n) => tashlab ketuvchi, voz kechuvchi

prior to => oldingi, avvalgi

simply (adv) => shunchaki, oddiygina

encouragement (n) => rag'bat, dalda, qo'llab-quvvatlash
encourage (v) => rag'batlantirmoq, undamoq, qo'llab-quvvatlamoq, ruhlantirmoq
encouraged (adj) => ruhlangan, dalda olgan, rag'batlangan
encouraging (adj) => umidbaxsh, ijobiy, rag'batlantiruvchi
encouragingly (adv) => umidbaxsh tarzda, rag'batlantiruvchi tarzda

peripheral => chekkadagi, asosiy bo'lmagan, qo'shimcha, tashqi.

preface => kirish so'zi, so'zboshi, muqaddima

convenience (n) => qulaylik, osonlik, qulay narsa yoki xizmat
inconvenience (n) => noqulaylik, bezovtalik
convenient (adj) => qulay, mos, oson, maqbul
inconvenient (adj) => noqulay, vaqtiga to'g'ri kelmaydigan
conveniently (adv) => qulay tarzda, naqd o'z vaqtida
inconveniently (adv) => noqulay tarzda, nomaqbul paytda

compound (n) => majmua, yopiq hudud, birikma, kimyoviy birikma
compounder (n) => moddalarni yoki aralashmalarni tayyorlab birlashtiruvchi shaxs, aralashtiruvchi mutaxassis
compound (v) => birlashtirmoq, qo'shmoq, yanada og'irlashtirmoq, murakkablashtirmoq
compound (adj) => qo'shma, bir nechta qismdan tashkil topgan
compounded (adj) => qo'shilgan, birlashtirilgan, yanada og'irlashgan, murakkablashgan

embassy (n) => elchixona
ambassador (n) => elchi
consulate (n) => konsulxona
consul (n) => konsul

maybe (adv) => balki, ehtimol, mumkin

answer (n) => javob, yechim
answer (v) => javob bermoq, javob qaytarmoq
answerable (adj) => javob berish mumkin bo'lgan, javob talab qiladigan
answerably (adv) => javob berish mumkin bo'lgan tarzda
answerer (n) => javob beruvchi, javob qaytaruvchi
answered (adj) => javob berilgan, hal qilingan
answerphone (n) => avtomatik javob beruvchi telefon qurilmasi, telefon xabarini yozib oluvchi qurilma

moment (n) => lahza, bir zum, ayni payt, muhim daqiqa
momentousness (n) => katta ahamiyatlilik, muhimlik
momentary (adj) => qisqa muddatli, bir zumlik
momentous (adj) => juda muhim, katta ahamiyatga ega
momentarily (adv) => bir zumga, qisqa vaqt ichida
momentously (adv) => juda muhim tarzda

diet (n) => ovqatlanish tartibi, odatiy ratsion, dieta, parhez
dieter (n) => dieta saqlovchi kishi
dietitian / dietician (n) => dietolog, ovqatlanish bo'yicha mutaxassis
dietetics (n) => dietologiya, ovqatlanish ilmi
diet (v) => dieta saqlamoq, ovqatlanishni cheklamoq
diet (adj) => dietali, kaloriyasi kam

slowly => asta-sekin, sekinlik bilan

rope => arqon

stamp (n) => marka, muhr, shtamp, bosma iz
stamper (n) => muhr yoki shtamp bosuvchi odam yoki qurilma
stampede (n) => katta guruh yoki hayvonning vahima bilan birdaniga yugurib ketishi
stampeder (n) => vahima bilan yugurib ketayotgan guruh a'zosi
stamp (v) => muhr bosmoq, shtamp bosmoq, oyoq bilan qattiq bosmoq
stampede (v) => vahimaga tushib, ommaviy ravishda yugurib ketmoq
stamped (adj) => muhr bosilgan, shtamp bosilgan
stampable (adj) => muhr yoki shtamp bosish mumkin bo'lgan

hand (n) => qo'l (kaft va barmoqlar), soat mili, yordam, ishchi
handful (n) => bir hovuch, boshqarish qiyin odam
handiness (n) => qulaylik, foydalilik
handbook (n) => qo'llanma
handbag (n) => ayollar sumkasi
handicap (n) => nogironlik, to'siq
handcuff (n) => qo'lbog', kishan
handkerchief (n) => ro'molcha, burun artadigan ro'mol
hand (v) => uzatmoq, topshirmoq
handcuff (v) => qo'lga kishan solmoq
handy (adj) => qulay, foydali, chaqqon, usta
handmade (adj) => qo'lda yasalgan
handsome (adj) => chiroyli, saxiy
handily (adv) => oson, ustalik bilan

reflection => aks, ko’rinish

insurance (n) => sug'urta, sug'urta polisi, himoya, ehtiyot chorasi
insurer (n) => sug'urtalovchi (kompaniya yoki shaxs)
the insured (n) => sug'urtalangan shaxs
reinsurance (n) => qayta sug'urta
insure (v) => sug'urtalamoq, natijani kafolatlamoq
reinsure (v) => qayta sug'urtalamoq
underinsure (v) => yetarli darajada sug'urtalamaslik
insured (adj) => sug'urtalangan
uninsured (adj) => sug'urtalanmagan
underinsured (adj) => yetarli sug'urtalanmagan
insurable (adj) => sug'urtalash mumkin bo'lgan

chaos (n) => tartibsizlik, betartiblik, boshboshdoqlik
chaotic (adj) => tartibsiz, betartib, boshboshdoq
chaotically (adv) => tartibsiz tarzda, betartib ravishda

luggage (n) => yuk, safar yuki, bagaj
luggageless (adj) => yuksiz, bagajsiz

sadness => qayg'u holati, xafalik, g'amginlik

litter (n) => axlat, tashlab ketilgan chiqindilar, mayda chiqindilar
litter (v) => axlat tashlamoq
litterer (n) => axlat tashlayotgan odam
littering (n) => axlash tashlash
littered (adj) => chiqindi tashlab ketilgan, axlat yotgan
littery (adj) => axlatga to'la, iflos, axlat sochilib yotgan

research => tadqiqot, ilmiy izlanish

arrangement (n) => tartib, kelishuv, kelishib olingan reja, tashkil etish, joylashtirish
arranger (n) => tashkil qiluvchi, tartibga soluvchi, aranjirovkachi
arrange (v) => tartibga solmoq, tashkil qilmoq, kelishib olmoq, joylashtirmoq
arranged (adj) => tartibga solingan, tashkil qilingan, kelishilgan
arrangeable (adj) => tartibga solish mumkin bo'lgan, kelishish mumkin bo'lgan

guess (n) => taxmin, chamalash, faraz
guesser (n) => taxmin qiluvchi kishi
guesswork (n) => taxminga asoslangan ish
guesstimate (n) => taxminiy baho
guess (v) => taxmin qilmoq, topishga urinmoq, chamalamoq, deb o'ylamoq
second-guess (v) => qaytadan shubha bilan baholamoq, oldindan taxmin qilmoq
guessable (adj) => taxmin qilsa bo'ladigan
unguessable (adj) => taxmin qilib bo'lmaydigan
guessed (adj) => taxmin qilingan
guessingly (adv) => taxmin qilib, chamalab


translation (n) => tarjima
translator (n) => tarjimon
translate (v) => tarjima qilmoq
translatable (adj) => tarjima qilish mumkin bo'lgan
untranslated (adj) => tarjima qilinmagan

explanation (n) => tushuntirish, izoh
explainer (n) => tushuntiriuvchi, tushuntiruvchi material yoki shaxs
explain (v) => tushuntirmoq, izoh bermoq
explanatory (adj) => tushuntiruvchi, izhoh beruvchi
explainable (adj) => tushuntirish mumkin bo'lgan
unexplainable (adj) => tushuntirib bo'lmaydigan
unexplained (adj) => tushuntirilmagan, izohi berilmagan
explanatorily (adv) => tushuntiruvchi tarzda

repeat => takrorlamoq
repetition => takrorlash, qayta-qayta qilish

pronounce => talaffuz qilmoq
pronouncation => talaffuz

conversation (n) => suhbat, gaplashuv
conversationalist (n) => suhbatdosh, suhbatni yaxshi olib boruvchi odam
converse (v) => suhbatlashmoq, gaplashmoq
conversational (adj) => so'zlashuv uslubidag, suhbatga oid
conversant (adj) => xabardor, yaxshi biladigan
conversationally (adv) => suhbat uslubida, oddiy so'zlashuv tarzida

origin => kelib chiqish, asl kelib chiqishi

supply (v) => ta'minlamoq, yetkazib bermoq, taqdim etmoq
resupply (v) => qayta ta'minlamoq, zaxirani to'ldirmoq
oversupply (v) => haddan tashqari ko'p yetkazib bermoq
supply (n) => ta'minot, zaxira, yetkazib berish, taklif
supplier (n) => yetkazib beruvchi, ta'minotchi
resupply (n) => zaxirani to'ldirish
oversupply (n) => haddan tashqari ko'p taklif
undersupply (n) => taklifning yetishmasligi
supplied (adj) => ta'minlangan, yetkazib berilgan

supplement (n) => qo'shimcha, to'ldiruvchi vosita
supplementation (n) => qo'shimcha berish, to'ldirish
supplement (v) => to'ldirmoq, qo'shimcha qilmoq
supplementary (adj) => qo'shimcha, to'ldiruvchi
supplemental (adj) => qo'shimcha
supplementarily (adj) => qo'shimcha tarzda

tip (n) => maslahat, foydali tavsiya, foydali usul
tip (n) => uch, uchi, chekka qism
tipper (n) => choychaqa beruvchi, yukni ag'darib tushiradigan mexanizm yoki transport
tip (v) => choychaqa bermoq, uchini egmoq yoki bukmoq
tippy (adj) => beqaror, ag'darilib ketishga moyil

preposition => predlog

particular => ma'lum bir

vocabulary (n) => so'z boyligi (Insonning biladigan so'zlari), lug'at (ma'lum til yoki mavzudagi so'zlar)
vocabularian (n) => lug'at tuzuvchi

bill (n) => hisob, to'lov qog'ozi, qonun loyihasi, banknota, qog'oz pul, qush tumshug'i
bill (v) => hisob chiqarmoq, hisob taqdim qilmoq, pul undirmoq

parcel => posilka, jo'natma

penpals => xat yozishib turadigan do'stlar

landlady (n) => uy yoki kvartira egasi bo'lgan ayol, ijaraga beruvchi ayol
landlord (n) => uy yoki kvartira egasi bo'lgan erkak, ijaraga beruvchi erkak

toughness (n) => chidamlilik, baquvvatlik, matonat, qattiqqo'llik
tough (adj) => qattiq, chidamli, baquvvat, kuchli, qiyin, og'ir, qo'rqmas, matonatli
toughly (adv) => qattiq tarzda

guy (n) => yigit, bola, erkak
guys (n) => yigitlar, hamma do'stlar (har ikkala jinsga ham)
guy (v) => masxara qilmoq, kulib mazax qilmoq

babe (n) => azizim, jonim, sevgilim, chaqaloq, go'dak, juda yosh bola
babes (n) => babening ko'pligi: chaqaloqlar, go'daklar, jonlarim, azizlarim, jozibali qizlar yoki ayollar
baby (n) => chaqaloq, go'dak, jonim, azizim
baby (v) => erkalatmoq, haddan tashqari parvarish qilmoq
babied (adj) => erkalatib yuborilgan, ortiqcha g'amxo'rlik qilingan
babyish (adj) => bolalarcha, go'daklarcha, yetuk emasdek
babylike (adj) => bolaga o'xshash, go'daklardek

fascination (n) => maftunlik, kuchli qiziqish
fascinator (n) => maftun qiluvchi kishi yoki narsa, kichik shlyapa, ayollar uchun bosh bezagi
fascinate (v) => qiziqtirib qo'ymoq, maftun qilmoq, o'ziga jalb qilmoq
fascinating (adj) => juda qiziqarli, maftunkor, o'ziga tortadigan
fascinated (adj) => maftun bo'lgan, qiziqib ketgan
fascinatingly (adv) => maftunkor tarzda, qiziqarli ravishda

durability (n) => chidamlilik, mustahkamlik, uzoq xizmat qilish xususiyati
durble (adj) => chidamli, mustahkam, uzoq xizmat qiladigan
durably (adv) => chidamli tarzda, uzoq muddat xizmat qiladigan tarzda

caravan (n) => g'ildirakli kichik uy, ko'chma uy, tirkama uy
caravanning (n) => karavanda sayohat qilish yoki yasash
caravan (n) => karvon, transport vositalari kolonnasi, bir yo'nalishda birga ketayotgan mashinalar guruhi
caravan (v) => karvonda sayohat qilmoq, guruh bo'lib harakatlanmoq

exoticization (n) => g'ayrioddiy yoki chet elga xos qilib ko'rsatish
exoticism (n) => g'ayrioddiylik, chet elga xoslik
exoticize (v) => g'ayrioddiy yoki chet elga xos qilib ko'rsatmoq
exotic (adj) => noodatiy, g'ayrioddiy, chet mamlakatlarga xos, begona madaniyatga xos
exoticized (adj) => g'ayrioddiy yoki chet elga xos qilib ko'rsatilgan
exotically (adv) => noodatiy tarzda, g'ayrioddiy tarzda, chet elga xos tarzda

admission (n) => tan olish, iqror, qabul qilish, kirish chiptasi
admissibility (n) => qabul qilish mumkinligi, joizligi
admittance (n) => kirishga ruxsat
admit (v) => tan olmoq, iqror bo'lmoq, qabul qilmoq
admissable (adj) => qabul qilinadigan, joiz, ruxsat etilgan
admittedly (adv) => tan olish kerakki, rostini aytganda
admitted (adj) => tan olingan, e'tirof etilgan, qabul qilingan

absurdity (n) => bema'nilik, mantiqsizlik, ahmoqona holat
absurdist (n) => absurdizm tarafdori, absurdizm g'oyalarini qo'llab-quvvatlovchi
absurdism (n) => absurdizm, hayotning ma'nosizligi haqidagi falsafiy qarash
absurd (adj) => bemani, mantiqsiz, kulgili darajada ahmoqona, aqlga sig'maydigan
absurdly (adv) => bema'nilik bilan, mantiqsiz tarzda, haddan tashqari darajada

moustache or mustache (n) => mo'ylov
moutached (adj) => mo'ylovli
moustachioed (adj) => mo'ylov qo'ygan, mo'ylovli
moustacheless (adj) => mo'ylovi yo'q

award (n) => mukofot, sovrin, taqdirlash
awardee (n) => mukofot oluvchi, mukofot bilan taqdirlangan shaxs
award (v) => mukofotlamoq, taqdirlamoq, mukofot bilan taqdirlamoq
award-winning (adj) => mukofotga sazovor bo'lgan, mukofot olgan
awarded (adj) => mukofotlangan, taqdirlangan

piggy bank => tanga qutisi

jar (n) => banka, shisha idish, keskin silkinish yoki zarba
jar (v) => keskin silkitmoq, keskin ta'sir qilmoq
jaring (adj) => yoqimsiz darajada keskin, quloqqa yoki ko'zga g'alati ta'sir qiladigan
jaringly (adv) => keskin, yoqimsiz tarzda

applause (n) => qarsak, olqish, qarsaklar
applauder (n) => qarsak chaluvchi, olqishlovchi
applaud (v) => qarsak chalmoq, olqishlamoq, maqtamoq
applauded (adj) => olqishlangan, maqtalgan

critic (n) => tanqidchi, tanqidiy baho beruvchi
criticism (n) => tanqid, tanqidiy fikr
criticizer / criticiser (n) => tanqid qiluvchi shaxs
criticize / criticise (v) => tanqid qilmoq
critical (adj) => tanqidiy, juda muhim, hal qiluvchi, kritik
uncritical (adj) => tanqidiy yondashmaydigan, ko'r-ko'rona
critically (adv) => tanqidiy tarzda, tanqidiy nuqtai nazardan, juda muhim darajada, keskin ravishda
uncritically (adv) => tanqidiy yondashmasdan, ko'r-ko'rona

constructive 

backpack (n) => orqaga taqiladigan sumka, ryukzak
backpack (v) => ryukzakda olib yurmoq, ryukzak bilan sayohat qilmoq
backpacker (n) => ryukzak bilan sayohat qiluvchi, yengil yuk bilan sayohat qiluvchi

wallet (n) => hamyon  (odatda cho'ntakka solinadigan, buklanadigan hamyon)
e-wallet / digital wallet (n) => elektron hamyon

fastener (n) => mahkamlagich (tugma, zanjir, qisqich, mix)
fastening (n) => mahkamlash vositasi (ilgak, tugma, bog'ich)
fasten (v) => mahkamlamoq, bog'lamoq, taqmoq, tutashtirmoq
refasten (v) => qayta mahkamlamoq
unfasten (v) => yeshmoq, ochmoq (tugma, kamar, qulf
fastened (adj) => mahkamlangan, bog'langan
unfastened (adj) => mahkamlanmagan, yechilgan
fastenable (adj) => mahkamlash mumkin bo'lgan

excitability (n) => tez hayajonlanish xususiyati
excitement (n) => hayajon, jo'shqinlik, hayajonli holat
excite (v) => hayajonga solmoq, qiziqtirmoq
excited (adj) => hayajonlangan, intiq, hayajondan xursand
exciting (adj) => hayajonli, hayajonga soladigan, qiziqarli
excitable (adj) => tez hayajonlanadigan
excitedly (adv) => hayajon bilan, jo'shqin tarzda

rob => talamoq, qurolli bosqinchilik qilib o'g'irlamoq

somersault => salto

parallel bars => parallel turnik

borrow (v) => qarzga olmoq, vatincha olib turmoq
borrower (n) => qarz oluvchi, qarzga oladigan shaxs

swan (n) => oqqush
cygnet (n) => oqqush bolasi
swan song (n) => oxirgi chiqish, so'nggi asar
swan dive (n) => oqqushdek sakrash
swan (v) => sayr qilib yurmoq, aylanib yurmoq, sayr qilib ketmoq
swanlike (adj) => oqqushdek, oqqushga o'xshash

heat (n) => issiqlik, issiq, jazirama
heater (n) => isitgich, isitgich qurilma
heat (v) => isitmoq, qizdirmoq, qizimoq
heated (adj) => isitilgan, qizdirilgan, qizg'in, keskin
heatable (adj) => isitish mumkin bo'lgan
heatless (adj) => issiqliksiz, issiqlikdan mahrum

teen (n) => o'smir, o'smir yoshdagi odam
teenager (n) => o'smir, 13-19 yoshdagi odam
teen (adj) => o'smirlarga oid, o'smirlar uchun
teenage (adj) => o'smirlikdagi 13-19 yoshdagi

note (n) => kubyura, banknota (🇬🇧)
note (n) => qayd, eslatma, yozuv, izoh, musiqa notasi
notability (n) => mashxurlik, e'tiborga loyiqlik
noteworthiness (n) => e'tiborga loyiqlik
notepad (n) => qayd daftarchasi, yozuvlar uchun bloknot
notebook (n) => daftar, noutbuk
notetaker / note-taker (n) => qayd yozib boruvchi odam
note-taking (n) => qayd yozib borish
note (v) => qayt etmoq, yozib qo'ymoq, e'tibor bermoq, ta'kidlamoq
noted (adj) => mashxur, taniqli, qayd etilgan, e'tirof etilgan
notable (adj) => e'tiborga loyiq, sezilarli, mashhur
noteworthy (adj) => e'tiborga loyiq, alohida ta'kidlashga arziydigan
notably (adv) => ayniqsa, xususan, e'tiborga molik tarzda

scandal => janjal, shov-shuvli voqea, uyatli hodisa

seat => o'rindiq, o'tiradigan joy.

cash (n) => naqd pul, naqd pul mablag'i
cashier (n) => kassir 
cash (v) => naqd pulga aylantirmoq, naqdlashtirmoq
cashless (adj) => naqd pulsiz

edit (n) => tahrir, tahrirlash
editor (n) => muharrir, tahrirlovchi
edition (n) => nashr, nashr turi, chiqarilgan versiya
edit (v) => tahrirlamoq, tahrir qilmoq, o'zgartirib tuzatmoq
edited (adj) => tahrirlangan, o'zgartirilgan

flour (n) => un
flour (v) => unga aylantirmoq, un holiga keltirmoq

wood (n) => o'rmon
woodland (n) => o'rmonzor, o'rmonli hudud
woodwork (n) => yog'ochdan yasalgan buyumlar, duradgorlik
woodworker (n) => duradgor, yog'och ustasi
woodcutter (n) => o'tinchi, daraxt kesuvchi
woodpecker (n) => qizilishton
wooden (adj) => yog'ochdan yasalagan, tarang, jonsiz
woody (adj) => yog'ochsimon, daraxtli, o'rmonli

overcome => yengmoq, yengib o'tmoq

iron (n) => temir
ironwork (n) => temirchilik buyumlari, temir konstruksiya
ironworker (n) => temir konstruksiya ishchisi, temirchi
iron (v) => dazmollamoq
iron (adj) => temirga oid, temirdan yasalgan
ironclad (adj) => temir bilan qoplangan, juda qat'iy o'zgarmas

irony (n)  => kinoya, kutilmagan qarama-qarshi holat
ironic (adj) => kinoyali, istehzoli
ironically (adv) => kinoyali tarzda, kinoyali tomoni shundaki

paper => qog'oz

paper => gazeta

littlleness (n) => kichiklik, ozlik, ahamiyatsizlik
little (adj) => kichik, kichkina

soap => sovun

soup => sho'rva

wharf (v) => kemani pristanga yaqinlashtirmoq, pristanda saqlamoq
wharf (n) => pristan, kema to'xtaydigan joy, iskala
wharfage (n) => pristan haqi (kema to'xtash uchun to'lov), pristan inshootlari
wharfinger (n) => pristan egasi yoki boshqaruvchisi

sheaf => bog'lam (Masalan: bug'doylar bog'lami)

elf (n) => elf, ertak va afsonalardagi kichkina sehrli mavjudot

loaf (n) => non, bir butun non, baton
loafer (n) => bekorchi, dangasa odam, mokasin tufli
loafing (n) => bekorchilik, dangasalik
loaf (v) => bekor yurmoq, dangasalik qilmoq
loafed (adj) => bekor yurgan
loafing (adj) => bekor yuradigan, dangasalik qiladigan
loafingly (adv) => bekorchilik bilan

dwarf (n) => mitti odam, pakana odam, mitti mavjudot
dwarf (v) => ancha kichik ko'rsatmoq, kichraytirib qo'ymoq, yonida juda kichik qilib ko'rsatmoq
dwarfish (adj) => mittiga o'xshash, mitti

reef => dengizdagi marjon toshlar yoki suv ostidagi toshlar)

chief (n) => boshliq, rahbar, boshliq lavozimidagi shaxs
chieftain (n) => qabila boshlig'i, qabila rahbari
chief (adj) => asosiy, bosh, eng muhim
chiefly (adv) => asosan, eng avvalo

chef (n) => oshpaz, professional oshpaz (plural: chefs)

dice (v) => mayda kubik qilib to'g'ramoq, zar o'ynamoq
die (n) => o'yin zari
dice (n) => o'yin zarlari
diced (adj) => mayda kubik qilib to'g'ralgan
dicey (adj) => xavfli, noaniq, tavakkalga asoslangan

death (n) => o'lim
die (v) => o'lmoq, vafot etmoq
dead (adj) => o'lik, vafot etgan
deadly (adj) => halokatli, o'ldiradigan
deadly (adv) => o'ta, juda

fungus (n) => zamburug', qo'ziqorin turidagi organizm (plural: fungi)
fungicide (n) => zamburug'ga qarshi vosita
fungal (adj) => zamburug'ga oid, zamburug'li
fungicidal (adj) => zamburug'ni yo'q qiladigan, zamburug'ga qarshi

focus (n) => fokus, diqqat markazi
focus (v) => diqqatni jamlamoq, e'tibor qaratmoq
focusing (adj) => diqqatini jamlayotgan, e'tibor qaratayotgan
focused (adj) => aniq maqsadga yo'naltirilgan, diqqatni bir narsaga qaratgan, diqqatini jamlagan, e'tiborini qaratgan

nucleus (n) => yadro, markaziy qism, asosiy markaz
nucleation (n) => yadro hosil bo'lishi
nucleate (v) => yadro hosil qilmoq, yadroga ega bo'lmoq
nuclear (adj) => yadroga oid, yadro bilan bog'liq
nucleate (adj) => yadrosi bor, yadroli

crisis (n) => inqiroz, tang vaziyat, og'ir vaziyat (plural: crises)
crisis-ridden (adj) => inqirozga duchor bo'lgan, inqirozlar girdobidagi
crisis-prone (adj) => inqirozga moyil, tez-tez inqirozga uchraydigan

prone (adj) => moyil, duchor bo'lishga moyil
proneness (n) => moyillik, biror holatga moyil bo'lish

thesis (n) => dissertatsiya, ilmiy ish

baselessness (n) => asossizlik, dalilsizlik
basis (n) => negiz, asos, tayanch (plural: bases)
basic (adj) => asosiy, boshlang'ich, oddiy
baseless (adj) => asossiz, dalilsiz
baselessly (adv) => asossiz ravishda, dalilsiz tarzda
basically (adv) => asosan, umuman olganda, mohiytan

oasis (n) => vohadagi suvli va o'simliklar o'sadigan joy, cho'ldagi voha (plural: oases)

diagnosis (n) => tashxis, muammo sababini aniqlash
misdiagnosis (n) => noto'g'ri tashxis
diagnostics (n) => diagnostika, tekshiruv usullari majmuasi
diagnostician (n) => tashxis qo'yuvchi mutaxassis
diagnose (v) => tashxis qo'ymoq, muammo sababini aniqlamoq
misdiagnose (v) => noto'g'ri tashxis qo'ymoq
diagnosable (adj) => tashxis qo'yish mumkin bo'lgan
undiagnosed (adj) => tashxis qo'yilmagan
diagnostically (adv) => diagnostik jihatdan, tashxis nuqtai nazaridan

phenomenon => hodisa

phenomena => hodisalar

media (n) => ommaviy axborot vositalari, media
medium (n) => vosita, aloqa vositasi, o'rta daraja
medium (adj) => o'rtacha, o'rta
medial (adj) => o'rtadagi, markaziy
medially (adv) => o'rtada, markaziy tarzda

backterium (n) => bakteriya (plural: backteria)
backterial (adj) => bakterial, bakteriyaga oid

datum (n) => ma'lumot, ma'lumot birligi, bitta fakt (plural: data)

index (n) => ko'rsatkich, indeks, kitob oxiridagi alifbo ko'rsatkichi, ko'rsatkich bermoq
indices (n) => ko'rsatkichlar, indekslar
indexes (n) => indekslar
indexation (n) => indekslash, narxlarga moslab oshirish
index (v) => indekslamoq, ro'yxatga kiritmoq
reindex (v) => qayta indekslamoq
indexed (adj) => indekslangan
index-linked (adj) => indeksga bog'langan

herbivore (n) => o'txo'r hayvon
herbivorous (adj) => o'txo'r, o'simlik bilan oziqlanadigan
herbivorously (adv) => o'simlik bilan oziqlanib

carnivore (n) => go'shtxo'r hayvon
carnivorous (adj) => go'shtxo'r, go'sh bilan oziqlanadigan

omnivore (n) => o'simlik va hayvon mahsulotlarini iste'mol qiladigan odam yoki hayvon
omnivorousness (n) => o'simlik va hayvon mahsulotlari bilan oziqlanish xususiyati
omnivorous (adj) => ham o'simlik ham hayvon mahsulotlari bilan oziqlanadigan
omnivorously (adv) => o'zimlik va hayvon mahsulotlarini iste'mol qilgan holda

darts (n) => dart o'yini, nishonga kichik o'qlar uloqtiriladigan o'yin
dart (n) => dart o'qi, nishonga uloqtiriladigan kichik o'q
dart (v) => tez otilib yoki uchib ketmoq, shiddat bilan harakatlanmoq

cuisine (n) => milliy taomlar va ularni tayyorlash uslubi, oshxona an'anasi

protest => norozilik bildirmoq (rasmiy, ommaviy)

assist (v) => yordam bermoq, ko'maklashmoq
assistance (n) => yordam, ko'mak
assistant (n) => yordamchi, ko'makchi
assistability (n) => yordam berish mumkinligi
assistant (adj) => ko'makchi, yordam beruvchi, yordamchi lavozimdagi
assisted (adj) => yordam berilgan, ko'mak ko'rsatilgan
assistive (adj) => yordam berishga xizmat qiladigan, ko'makchi, yordamchi
assistively (adv) => yordamchi tarzda

hindrance (n) => to'sqinlik, xalaqit, g'ov
hinderer (n) => to'sqinlik qiluvchi shaxs yoki narsa
hinder (v) => xalaqit bermoq, to'sqinlik qilmoq, rivojlanishga to'sqinlik qilmoq
hindered (adj) => to'sqinlik qilingan, xalaqit berilgan
hinderly (adv) => to'sqinlik bilan

obstruction (n) => g'ov, to'siq, xalaqit, to'sqinlik
obstructor (n) => to'sqinlik qiluvchi shaxs yoki narsa
obstruct (v) => to'smoq, xalaqit bermoq, yo'lini to'smoq, ishiga to'sqinlik qilmoq
obstructive (adj) => to'sqinlik qiluvchi, xalaqit beruvchi, g'ov bo'ladigan
obstructed (adj) => to'silgan, to'sib qo'yilgan
unobstructed (adj) => to'silmagan, to'sqinliksiz, ochiq
obstructively (adv) => to'sqinlik qiluvchi tarzda, xalaqit beradigan tarzda
unobsturctedly (adv) => to'siqsiz, hech narsa xalaqit bermagan holda

try (n) => urinish, harakat, sinab ko'rish
try (v) => urinmoq, harakat qilmoq, sinab ko'rmoq
trying (adj) => qiyin, sabrni sinaydigan
tried (adj) => sinalgan, sinab ko'rilgan
tryable (adj) => sinab ko'rish mumkin bo'lgan

attempt (n) => urinish, harakat
attempt (v) => harakat qilmoq, urinmoq
attemptable (adj) => urinib ko'rish mumkin bo'lgan

reveal => oshkor qilmoq, ochib bermoq

trap (n) => tuzoq, qopqon
trap (v) => tuzoqqa tushirmoq, qamab qo'ymoq, chiqib keta olmaydigan holatga tushirmoq
trapped (adj) => tuzoqda qolgan, qamalib qolgan, chiqib keta olmaydigan

relive => qayta boshdan kechirmoq

government (n) => hukumat, boshqaruv, davlat boshqaruvi
governance (n) => boshqaruv, boshqarish tizimi
governer (n) => gubernator, hokim, boshqaruvchi
governship (n) => gubernatorlik lavozimi
misgovernment (n) => noto'g'ri boshqaruv
govern (v) => boshqarmoq, idora qilmoq, hukmronlik qilmoq, tartibga solmoq, belgilamoq
misgovern (v) => noto'g'ri boshqarmoq
governing (adj) => boshqaruvchi, hukmron
governmental (adj) => hukumatga oid
governable (adj) => boshqarsa bo'ladigan
ungovernable (adj) => boshqarib bo'lmaydigan

enabler (n) => imkon beruvchi vosita yoki shaxs, sharoit yaratuvchi
enablement (n) => imkon yaratish, amalga oshirishga sharoit yaratish
enable (v) => imkon bermoq, imkoniyat yaratmoq, amalga oshirishga sharoit yaratmoq
enabled (adj) => yoqilgan, faollashtirilgan, imkon berilgan

destruction (n) => vayron qilish, yo'q qilish, vayronagarchilik
destroyer (n) => vayron qiluvchi
destructiveness (n) => vayronkorlik, buzg'unchilik
destroy (v) => vayron qilmoq, yo'q qilmoq, barbod etmoq
destructive (adj) => vayron qiluvchi, zararli, halokatli
destructible (adj) => yo'q qilish mumkin bo'lgan
indestructible (adj) => yo'q qilib bo'lmaydigan, mustahkam
self-destructive (adj) => o'ziga zarar yetkazuvchi
destructively (adv) => vayron qiluvchi tarzda, zarar yetkazib

regard=consider => ...deb hisoblamoq

resort (n) => dam olish maskani, kurort

susceptibility (n) => moyillik, ta'sirga beriluvchanlik, tez ta'sirlanish
susceptible (adj) => moyil, tez ta'sirlanadigan, tez kasal bo'ladigan
unsusceptible (adj) => ta'sirlanmaydigan
susceptibly (adv) => moyil tarzda

vulnerability (n) => zaiflik, himoyasizlik, tizimdagi zaif nuqta yoki teshik
invulnerability (n) => daxlsizlik, zarar yetkazib bo'lmaslik
vulnerable (adj) => zaif, himoyasiz, zarar ko'rishi oson
invulnerable (adj) => daxlsiz, zarar yetmaydigan
vulnerably (adv) => himoyasiz holda

sensivity => sezgirlik

open (n) => ochiq musobaqa yoki turnir
openness (n) => samimiylik, ochiqlik, ochiq bo'lish xususiyati
opener (n) => ochgich, boshlovchi narsa yoki gap
openability (n) => ochish mumkinligi
open-mindedness (n) => fikrlar va qarashlarga ochiqlik
opening (n) => ochilish, boshlanish, bo'sh ish o'rni, teshik yoki kirish joyi
reopening (n) => qayta ochilish, qayta ochish
open (v) => ochmoq, ochilmoq, ish boshlamoq
reopen (v) => qayta ochmoq, yana ochilmoq
open (adj) => ochiq, yopilmagan, ochiqchasiga, samimiy
opening (adj) => ochilishdagi, boshlang'ich
opened (adj) => ochilgan
unopened (adj) => ochilmagan
reopened (adj) => qayta ochilgan
openable (adj) => ochish mumkin bo'lgan
unopenable (adj) => ochib bo'lmaydigan
open-minded (adj) => fikri ochiq, yangi g'oya va qarashlarni qabul qila oladigan
opennes-related (adj) => ochiqlik bilan bog'liq
openly (adv) => ochiqchasiga, yashirmasdan, oshkora
open-mindedly (adv) => fikri ochiq holda

liability (n) => majburiyat, qarzdorlik, javobgarlik, noqulaylik tug'diradigan narsa yoki shaxs
liableness (n) => javobgarlik holati
liable (adj) => javobgar, ma'sul, biror narsaga duchor bo'lishi mumkin bo'lgan
liably (adv) => javobgarlik nuqtayi nazaridan yoki ishonchli tarzda

predisposition => oldindan moyillik

vitality (n) => hayotiy kuch, quvvat, serharakatlik
vitals (n) => hayotiy ko'rsatkichlar (puls, bosim, harorat), hayotiy a'zolar
vitalization (n) => jonlantirish
revitalization (n) => qayta jonlantirish, tiklash
vitalize (v) => jonlantirmoq, hayotiy kuch bag'ishlamoq
revitalize (v) => qayta jonlantirmoq, yangi kuch bag'ichlamoq
vital (adj) => muhim, o'ta zarur, hayotiy, baquvvat
vitalizing (adj) => jonlantiruvchi, quvvat beruvchi
revitalizing (adj) => qayta quvvat beruvchi
vitally (adv) => o'ta, nihoyatda, hayotiy darajada

shelter => boshpana

trunk (n) => daraxt tanasi, daraxtning ildiz bilan shoxlar orasidagi qismi
trunk (n) => filning xartumi
trunk (n) => katta sandiq, yuk qutisi, katta chamadon
trunk (n) => gavda, tana
trunk (n) => mashinaning yukxonasi

part of tree => daraxtning bir qismi

effort (n) => harakat, urinish, sa'y-harakat, kuch-g'ayrat
effortful (adj) => ko'p kuch talab qiladigan, kuch safrlashni talab qiladigan
effortless (adj) => oson, zo'riqish talab qilmaydigan
effortlessly (adv) => osonlik bilan, zo'riqmasdan, kuch sarflamasdan

bother (n) => bezovtalik, ovora bo'lish, tashvish, noqulaylik, muammo
botherdness (n) => bezovtalik, tashvishga tushganlik
bother (v) => bezovta qilmoq, xalaqit bermoq, ovora qilmoq, tashvishga solmoq
bothered (adj) => bezovta bo'lgan, tashvishga tushgan, ovora bo'lgan
bothersome (adj) => bezovta qiladigan, xalaqit beradigan, ovora qiladigan
bothersomely (adv) => bezovta qiladigan tarzda

nuance (n) => nozik farq, ma'nodagi nozik jihat, nozik tafovut
nuancing (n) => ma'noni nozik jihatlar bilan ifodalash
nuancer (n) => nozik farqlarni ajratuvchi yoki ifodalovchi
nuance (v) => nozik farq va jihatlarni ko'rsatib ifodalamoq
nuanced (adj) => nozik jihatlari hisobga olingan, nozik farqlarga boy
nuanceful (adj) => nozik jihatlarga boy
nuanceless (adj) => nozik farqlarsiz, soddalashtirilgan 


staff (n) => xodimlar, ishchilar, biror tashkilotda ishlaydigan odamlar
staff (n) => tayoq, hassaga o'xshash uzun tayoq
staffing (n) => xodimlar bilan ta'minlash, xodimlar tarkibini shakllantirish
staffer (n) => xodim, tashkilotda ishlovchi odam
staff (v) => xodimlar bilan ta'minlamoq, xodimlarni ishga joylashtirmoq
staffed (adj) => xodimlar bian ta'minlangan

health (n) => sog'liq, salomatlik
healthiness (n) => sog'lomlik, salomatlik
unhealthiness (n) => nosog'lomlik
healthy (adj) => sog'lom, salmoat
unhealth (adj) => nosog'lom, sog'liq uchun zararli
healthily (adv) => sog'lom tarzda, salomat holda
unhealthily (adv) => nosog'lom tarzda

improvement (n) => yaxshilanish, yaxshilash, yangilik, qo'shilgan yaxshilik
improver (n) => yaxshilovchi, malaka oshiruvchi, boshlovchi o'qituvchi
improve (v) => yaxshilamoq, yaxshilanmoq, o'sib bormoq
reimprove (v) => qayta yaxshilamoq
improvable (adj) => yaxshilash mumkin bo'lgan
improved (adj) => yaxshilangan, takomillashtirilgan
unimproved (adj) => yaxshilanmagan, o'zgarmagan
improvingly (adv) => yaxshilanib borgan holda

also (adv) => ham, yana, shuningdek, bundan tashqari

fate (n) => taqdir, qismat, oqibat, kelajak
fate (v) => taqdir qilmoq, oldindan belgilab qo'ymoq
fated (adj) => taqdirda bitilgan, muqarrar
fateful (adj) => taqdirni hal qiluvchi, oqibatli, muhim
fatal (adj) => halokatli, o'limga olib keladigan, hal qiluvchi
ill-fated  (adj) => baxtsiz, omadsiz, taqdiri yomon
fatefully (adv) => taqdir taqozosi bilan, oqibatli tarzda
fatally (adv) => halokatli darajada

fold (n) => buklama, qatlam, burma
fold (v) => buklamoq, taxlamoq
foldable (adj) => buklanadigan, yig'iladigan
folded (adj) => buklangan, taxlangan

kind (n) => tur, xil, nav
kindness (n) => mehribonlik, yaxshilik, yaxsi muomala
unkindness (n) => mehrsizlik, qo'pollik, yomon muomala
kind (adj) => mehribon, yaxshi muomalali, yaxshilik qiladigan
unkind (adj) => mehrsiz, qo'pol, yaxshi muomala qilmaydigan
kindly (adv) => mehribonlik bilan, iltifot bilan
unkindly (adv) => mehrsizlarcha, qo'pol tarzda

looker-on / onlooker (n) => kuzatuvchi, tomoshabin, chetdan qarab turuvchi
lookers-on / onlookers (n) => kuzatuvchilar, tomoshabinlar

class (n) => dars, sinf, mashg'ulot, guruh
classroom (n) => sinfxona
classmate (n) => sinfdosh, guruhdosh
classwork (n) => sinfda bajariladigan ish, darsdagi topshiriq

brush (n) => cho'tka, mo'yqalam, taroqsimon cho'tka
brusher (n) => cho'tkalovchi, cho'tka bilan tozolovchi
brush (v) => cho'tkalamoq, tozalamoq, yengil tegib o'tib ketmoq
brushed (adj) => cho'tkalangan, tozalangan

dynamo (n) => dinamo, elektr energiyasi ishlab chiqaruvchi generator

fly (n) => pashsha, chivin
flyer / flier (n) => uchuvchi, samalyotda sayohat qiluvchi, reklama varaqasi
flight (n) => parvoz, uchish
fly (v) => uchmoq
flightless (adj) => ucha olmaydigan

lady (n) => ayol, xonim, odobli yoki madaniyatli ayol
ladylikeness (n) => xonimlarga xoslik, nazokat
ladylike (adj) => xonimlarga xos, nazokatli, odobli

leaf (n) => barg, varaq, sahifa
leaflet (n) => varaqa, kichik buklet
leafiness (n) => barglilik, barglarning ko'pligi
leafy (adj) => bargli, barglarga boy, ko'kalamzor
leafless (adj) => bargsiz

thief (n) => o'g'ri
thievery (n) => o'g'rilik
thieving (adj) => o'g'irlik qiladigan
thievish (adj) => o'g'riga xos, o'g'riga o'xshash

self => o'zi

cliff (n) => tik qoyatosh, tik qoya, jarlik
cliffside (n) => qoya yonbag'ri, jarlik cheti
clifftop (n) => qoya tepasi
cliffhanger (n) => voqeaning eng qiziq joyida tugashi, keyingi qismni kutishga majbur qiladigan holat

ox => buqa

oxen => buqalar

louse (n) => bit (odam yoki hayvondagi parazit hasharot) (plural: lice)
lousy (adj) => juda yomon, sifatsiz, rasvo
lousily (adv) => juda yomon tarzda
lousiness (n) => yomonlik, sifatsizlik

species => tur, nav

offspring (n) => avlod, farzand, nasl, hayvon bolasi
offspring (adj) => avlodga oid

ethics (n) => axloqiy qoidalar, etika, axloq falsafasi
ethic (n) => axloqiy tamoyil, qadriyat
ethos (n) => ma'naviy qadriyatlar majmuasi, o'ziga xos ruh
ethical (adj) => axloqiy, odob-axloqqa mos, etik
unethical (adj) => axloqqa zid, nojo'ya
non-ethical (adj) => axloqiy jihatga aloqasi yo'q
ethically (adv) => axloqiy jihatdan, odob-axloq doirasida
unethically (adv) => axloqqa zid tarzda

diabetes (n) => diabet, qand kasalligi
diabetic (n) => diabet bilan kasallangan kishi
diabetologist (n) => diabetolog, diabet bo'yicha shifokor

plier => ombir

binoculars (n) => durbin

adult (n) => voyaga yetgan odam, katta yoshli inson, katta odam
adulthood (n) => voyaga yetganlik, katta yosh davri
adultness (n) => kattalikka xoslik, voyaga yetganlik xususiyati
adult (adj) => voyaga yetgan, katta yoshli, kattalarga oid
adultlike (adj) => kattalarga o'xshash, kattalarcha

keenness (n) => qiziqish, ishtiyoq, ziyraklik, serzgirlik, o'tkirlik
keen (adj) => qiziqqan, ishtiyoqmand, ziyrak, sezgir, o'tkir
keen-eyed (adj) => o'tkir ko'zli, ziyrak, kuzatuvchan
keenly (adv) => katta qiziqish bilan, o'tkir yoki sezgir tarzda

relationship => munosabat, aloqa

summary (n) => xulosa, qisqacha mazmun
summarizer (n) => xulosa qiluvchi shaxs yoki dastur
summarization (n) => qisqartirish, xulosalash
sum (n) => summa, yig'indi
summation (n) => qo'shish, yig'indi, xulosa
sum (v) => qo'shmoq, jamlamoq
summarize / summarise (v) => qisqacha bayon qilmoq, xulosa qilmoq
summary (adj) => qisqa, tezkor, sudsiz
summative (adj) => yakunlovchi
summarily (adv) => darhol, so'zsiz, sud-tergovsiz

gap (n) => bo'shliq, oraliq, tirqish, uzilish, tanaffus, farq, tafovut
gap (v) => tirqich hosil qilmoq, oraliq qoldirmoq
gappy (adj) => tirqishlari ko'p, uzuq-yuluq
gapped (adj) => oraliq qoldirilgan, tirqishli
gap-toothed (adj) => tishlari orasi ochiq

equipment (n) => jihozlar, uskuna, asbob-uskunalar
equipped (adj) => jihozlangan, kerakli vositalar bilan ta'minlangan
equip (v) => jihozlamoq, kerakli vositalar bilan ta'minlamoq

oversleep => uxlab qolmoq

spectator (n) => tomoshabin, musobaqa yoki tadbirni kuzatayotgan odam
spectating (n) => tomoshabin sifatida kuzatish
spectatorship (n) => tomoshabinlik holati, tomoshabin sifatidagi ishtirok
spectate (v) => tomoshabin sifatida kuzatmoq, musobaqani tomosha qilmoq

despiser (n) => nafratlanuvchi kishi
despise (v) => nafratlanmoq, juda yomon ko'rmoq, jirkanmoq
despicable (adj) => jirkanch, past, nafratga loyiq
despicably (adv) => jirkanch tarzda, pastkashlarcha

spite (n) => alam, yomon niyat, o'ch olish istagi, ichi qoralik, birovga yomonlik qilish istagi
spite (v) => o'ch olmoq, ataylab xava qilmoq, birovni xafa qilish uchun ataylab qarshi ish qilmoq
spiteful (adj) => alamzada, ichi qora, o'ch olishga moyil
spitefully (adv) => alam bilan, o'ch olish uchun

popular => hamma taniydi va hammaga birdek yoqadi  

fame (n) => shuhrat, mashxurlik
infamy (n) => yomon nom bilan mashxurlik, sharmandalik
famous (adj) => mashhur, hammaga tanish
famed (adj) => mashhur, nomi chiqqan
infamous (adj) => yomon nom chiqargan, nomi badnom 
world-famous (adj) => butun dunyoga mashxur
famously (adv) => mashxur tarzda, ajoyib

innocence (n) => begunohlik, aybsizlik, soddalik
innocentness (n) => begunohlik
innocent (adj) => aybsiz, begunoh, sodda, beozor
innocently (adv) => begunoh tarzda, beozor yoki sodda tarzda

court (n) => sud, sud zali, maydon, saroy, havli
courtroom (n) => sud zali
courthouse (n) => sud binosi
courtyard (n) => hovli, ichki hovli
courtier (n) => saroy a'yoni, saroy ahli
courtship (n) => uchrashib yurish davri, sevgi izhor qilish
courtesy (n) => xushmuomalalik, odob
courteous (adj) => xushmuomala, odobli
courtly (adj) => saroyga xos, nafis, odobli
courteously (adv) => xushmuomalalik bilan, odob bilan

law (n) => qonun, huquq, qoida
lawlessness (n) => qonunsizlik
lawyer (n) => advokat, yurist
lawmaker (n) => qonun chiqaruvchi, deputat yoki parlament azosi
lawfulness (n) => qonuniylik
lawful (adj) => qonuniy ravishda, qonunga muvofiq
lawless (adj) => qonunsiz, qonunlarga bo'ysunmaydigan
lawlessly (adv) => qonunsiz tarzda

pile => uyum

curve (n) => egri chiziq, egri shakl, burilish, qayrilish
curviness (n) => egrilik, egri-bugrilik, qomatdorlik
curvature (n) => egrilik, egilganlik darajasi
curve (v) => egilmoq, egmoq, qayrilmoq, burilmoq
curved (adj) => egri, egilgan, qayrilgan
curvy (adj) => egri-bugri, egri chiziqlarga ega, qomatdor

soccer (American English) => fudbol

football (n) => futbol (British)
soccer (n) => futbol (American)

hall (n) => zal, dahliz, yo'lak, imorat
hallway (n) => yo'lak, koridor

passage => tor yo'lak, o'tish, matndan parcha

evenness (n) => tekislik, tenglik, xotirjamlik
evens (n) => teng imkoniyat
evening (n) => kechqurun, tekislash jarayoni
even (v) => tekislamoq, tenglashtirmoq
even (adj) => teng, tekis, juft
uneven (adj) => notekis, teng bo'lmagan, toq
even-handed (adj) => adolatli, tarafkashlik qilmaydigan
even (adv) => hatto, yanada 
evenly (adv) => teng, bir tekis, tekis holda
unevenly (adv) => notekis, teng bo'lmagan holda

sound (v) => tuyulmoq, eshitilmoq

sound (n) => suv / dengish chuqurligi, tovush / ovoz

sound (adj) => sog'lom, mustahkam

dirt (n) => tuproq, chang, kir, iflosliklar, mish-mish, sir-asrorlar
dirtiness (n) => kirlilik, ifloslik
dirty (v) => iflos qilmoq, kirlatmoq, obro'sini tushirmoq
dirty (adj) => iflos, kirli, odobsiz, uyatsiz, insofsiz, nopok
dirtly (adv) => iflos tarzda, nopoklik bilan, insofsizlik bilan

beat (n) => urish, zarba, ritm, marom, xizmat hududi yoki patrul hududi
beater (n) => uruvchi asbob yoki shaxs, ko'pirtirgich
beat (v) => yutmoq, urib turmoq, ko'pposlamoq, yengmoq, ritmik tarzda urmoq, aralashtirib yoki ko'pirtirib tayyorlamoq
beaten (adj) => urilgan, do'pposlangan, mag'lub bo'lgan
beatable (adj) => yengish mumkin bo'lgan
unbeatable (adj) => yengib bo'lmaydigan, tengsiz

reasonable => mantiqli, asosli, o'rtacha | maqbul

fair (n) => yarmarka, ko'rgazma
fairness (n) => adolat, xolislik
fairground (n) => yarmarka o'tkaziladigan joy
fair (adj) => adolatli, halol, teng, o'rtacha, yomon emas, oq tanali, sarg'ish soch, musaffo
unfair (adj) => adolatsiz, nohaq
fair (adv) => halol, qoidaga muvofiq
fairly (adv) => adolatli ravishda

form (n) => shakl, ko'rinish, blank, anketa, sinf
formation (n) => shakllanish, tashkil topish, tuzilma
format (n) => format, shakl, tuzilish
formality (n) => rasmiyat, rasmiy qoida
formula (n) => formula, retsept
form (v) => shakllantirmoq, tashkil qimoq, hosil qimoq, tuzmoq
reform (v) => isloq qilmoq, qayta shakllantirmoq
transform (v) => tubdan o'zgartirmoq, aylantirmoq
inform (v) => xabardor qilmoq
former (adj) => sobiq, avvalgi
formal (adj) => rasmiy, qoidaga amal qiladigan
informal (adj) => norasmiy, oddiy
formative (adj) => shakllantiruvchi
formerly (adv) => ilgari, ilgari paytda, avval
formally (adv) => rasmiy ravishda
informally (adv) => norasmiy tarzda

keeper (n) => saqlovchi, qarovchi, qo'riqlovchi, egasi
keeping (n) => saqlash, asrash
keep (v) => saqlamoq, ushlab turmoq, olib qolmoq, davom ettirmoq, rioya qilmoq
kept (adj) => saqlangan, asrab qolingan

drum (n) => baraban, nog'ora, bochka
drummer (n) => barabanchi, nog'orachi
drum (v) => baraban chalmoq, bir maromda urmoq

over => ustidan

backwardness (n) => qoloqlik, rivojlanmaganlik
backward (adv) => orqaga, ortga, teskari yo'nalishda
backward (adj) => orqaga yo'nalgan, orqada qolgan, rivojlanmagan
backward-looking (adj) => o'tmishga qaratilgan, o'tmishga yopishib qolgan, eski qarashlarga asoslangan

forwardness (n) => dadillik, o'zini erkin tutish
forward (n) => hujumchi (fudbolda)
forward (v) => jo'natmoq, yubormoq, boshqa kishiga yetkazmoq
forward (adj) => oldinga yo'nalgan, oldingi, kelajakni ko'zlagan
forward-looking (adj) => kelajakka yo'naltirilgan
forward-thinking (adj) => ilg'or fikrlaydigan, zamonaviy fikrli
forward (adv) => oldinga, ilgari, olg'a

spice (n) => ziravor, taomga ta'm yoki hid beruvchi mahsulot
spiciness (n) => ziravorlilik, achchiqlik, ta'ming o'tkirligi
spicer (n) => ziravor sotuvchi
spice (v) => ziravor solmoq, ziravor bilan ta'minlamoq
spicy (adj) => ziravorli, achchiq, ta'mi kuchli
spiced (adj) => ziravor qo'shilgan, ziravorlangan
spice-free (adj) => ziravorsiz, ziravor qo'shilmagan

hotness (n) => issiqlik, achchiqlik, issiqlik darajasi
hotshot (n) => o'zini katta oladigan yoki o'zini juda zo'r deb biladigan odam, juda mohir yoki mashxur odam, katta mutaxassis, mashxur yoki muvaffaqiyatli shaxs, katta odam
hot (adj) => issiq, achchiq, qaynoq, dolzarb, mashxur
hotshot (adj) => juda mohir, zo'r, yuqori darajadagi, ba'zan o'zini katta oladigan
hotly (adv) => qizg'in tarzda, keskin tarzda

pepper => qalampir

pepper (n) => qalampir, murch
black pepper (n) => qora murch
hot pepper (n) => achchiq qalampir
chili pepper (n) => chili qalampiri

glasses (n) => ko'z oynak, ko'rish uchun taqiladigan ko'zoynak
sunglasses (n) => quyosh ko'zoynagi (Quyoshning kuchli yorug'ligidan himoyalanish uchun)
safety glasses (n) => himoya ko'zoynagi (Ish joyida ko'zni chang, zarracha va etc lardan himoya qiladi)
computer glasses (n) => kompyuter ko'zoynagi (Kompyuterda ishlash uchun)
corrective glasses (n) => ko'rishni tuzatuvchi ko'zoynak (Ko'rish nuqsonini tuzatish ma'nosini ta'kidlaydi)
prescription glasses (n) => ko'rishni to'g'irlovchi ko'zoynak (Ko'rish nuqsoni uchun shifokor belgilagan)

cure (n) => davo, davolash, shifo
curability (n) => davolash mumkinligi
cure (v) => davolamoq, darddan xalos qilmoq
curable (adj) => davolash mumkin bo'lgan
incurable (adj) => davolab bo'lmaydigan
cured (adj) => davolangan, sog'aygan
curative (adj) => davolovchi, shifobaxsh
curatively (adv) => davolovchi tarzda

disease (n) => kasallik, xastalik
diseased (adj) => kasallangan, kasallikdan zararlangan, kasalikka chalingan, nosog'lom

bankrupt (n) => bankrot shaxs yoki tashkilot
bankruptcy (n) => bankrotlik, to'lovga qodir emaslik
prebankruptcy (n) => bankrotlikdan oldingi davr
postbankruptcy (n) => bankrotlikdan keyingi davr
bankrupt (v) => bankrot qilmoq, moliyaviy jihatdan barbod qilmoq
bankrupt (adj) => bankrot, to'lovga qodir bo'lmagan
bankrupted (adj) => bankrot bo'lgan
prebankruptcy (adj) => bankrotlikdan oldingi
postbankruptcy (adj) => bankrotlikdan keyingi

solvency (n) => to'lovga qodirlik, moliyaviy barqarorlik
insolvency (n) => to'lovga qodir emaslik, moliyaviy nochorlik
solvent (adj) => to'lovga qodir, qarzlarini to'lay oladigan
insolvent (adj) => to'lovga qodir emas, nochor

tank (n) => tank, bak, idish
tanker (n) => sisterna, tanker, suyuqlik tashuvchi katta transport

price tag => narx yozilgan label

offer (n) => taklif, taklif etgan shaxs  yoki narsa
offering (n) => taklif, taqdim etilayotgan narsa, ehson
reoffer (n) => qayta taklif
reoffering (n) => qayta taklif qilish
offerer (n) => taklif qiluvchi shaxs
offeree (n) => taklif yo'llangan shaxs
offer (v) => taklif qilmoq, taqdim etmoq, bermoq
reoffer (v) => qayta taklif qilmoq
offering (adj) => taqdim etayotgan, taklif qilayotgan
offered (adj) => taklif qilingan, taqdim etilgan
offerable (adj) => taklif qilish mumkin bo'lgan

belongings (n) => shaxsiy buyumlar, o'ziga tegishli narsalar
belong (v) => tegishli bo'lmoq, tegishli bo'lib turmoq

possession (n) => egalik, mulk, qo'l ostida bo'lish

highly (adv) => nihoyatda, juda, yuqori darajada

bliss (n) => juda katta baxt, cheksiz baxt, oliy huzur
blissfulness (n) => cheksiz baxt holati, baxtiyorlik
blissful (adj) => juda baxtli, huzur-halovatga to'la
blissfully (adv) => juda baxtli tarzda, huzur bilan 

contentment (n) => qoniqish
content (v) => qanoatlantirmoq, mamnun qilmoq
content (adj) => mamnun, hozirgi holatidan qanoat qilgan
contented (adj) => mamnun, xotirjam, tinch, qanoat his qilgan
discontented (adj) => norozir, qoniqmagan
contentedly (adv) => mamnuniyat bilan, xotirjam holda

satisfaction (n) => mamnunlik

delight (n) => katta xursandchilik
delight (v) => juda xursand qilmoq, zavqlantirmoq
delighted (adj) => juda xursand, mamnun, behad quvongan
delightful (adj) => juda yoqimli, zavqli, dilga xush yoqadigan
delightfully (adv) => juda yoqimli tarzda, zavqli tarzda
delightedly (adv) => katta xursandchilik bilan, xursand bo'lib

pleasure (n) => rohat, zavq

joy (n) => quvonch, xursandchilik, zavq
joyful (adj) => quvonchli, xursand, shod
joyous (adj) => quvonchli, shodlikka to'la
joyfully (adv) => quvonch bilan, xursand bo'lib
joyously (adv) => shodlik bilan, katta quvonch bilan

happiness (n) => baxt, xursandchilik, baxtiyorlik
unhappiness (n) => baxtsizlik, xafalik, norozilik
happy (adj) => baxtli, xursand, mamnun
unhappy (adj) => baxtsiz, xafa, norozi
happily (adv) => baxtli tarzda, xursand holda, mamnuniyat bilan
unhappily (adv) => baxtsiz yoki xafa holda, norozi tarzda

human (n) => inson, odam
humanity (n) => insoniyat, insoniylik, odamiylik
humanization / humanisation (n) => insoniylashtirish, insoniy tus berish
humanize / humanise (v) => insoniylashtirmoq, insonga xos xususiyat berish
humanized / humanised (adj) => insoniylashtirilgan, insoniy tus berilgan
human (adj) => insoniy, insonga xos

civil (n) => oddiy fuqaro, harbiy bo'lmagan shaxs (kam ishlatiladi)
civilian (n) => fuqaro, harbiy bo'lmagan shaxs
civilization (n) => sivilizatsiya, tamaddun
civility (n) => xushmuomalalik, odoblilik, muomala madaniyati
uncivility (n) => odobsizlik, qo'pollik, xushmuomalalikning yo'qligi
civilize (v) => madaniylashtirmoq, sivilizatsiyalashmoq
civil (adj) => fuqaroviy, fuqarolikka oid
uncivil (adj) => odobsiz, qo'pol, xushmuomala bo'lmagan
civilized (adj) => madaniyatli, sivilizatsiyalashgan
uncivilized (adj) => madaniyatsiz, yovvoyi, odobsiz
civilly (adv) => muloyimlik yoki odob bilan, fuqaroviy tarzda

pole => qutb

freedom (n) => erkinlik, ozodlik
freebie (n) => tekis narsa, sovg'a
freeman (n) => erkin fuqaro, ozod odam
freelancer (n) => frilanser, mustaqil ishlovchi
free (v) => ozod qilmoq, qutqarmoq, bo'shatmoq
free (adj) => erkin, ozod, bepul, band emas
freeing (adj) => ozod qiluvchi
freed (adj) => ozod qilingan
freely (adv) => erkin ravishda

properly => to'g'ri

nation (n) => millat, xalq, davlat
national (n) => mamlakat fuqarosi, milliy terma jamoa a'zosi
nationality (n) => fuqarolik, millatga mansublik, millat
nationalization (n) => davlat tasarrufiga o'tkazish, milliylashtirish
nationalist (n) => millatchi, milliy manfaat tarafdori
international (n) => xalqaro miqyosdagi shaxs yoki tashkilot
internationalism (n) => baynalmilallik, xalqaro hamkorlik g'oyasi
internationalist (n) => xalqaro hamkorlik tarafdori
denationalization (n) => davlat tasarrufidan chiqarish, xususiylashtirish
multinational (n) => bir nechta mamlakatda faoliyat yurituvchi kompaniya
nationalize (v) => davlat tasarrufiga o'tkazmoq, milliylashtirmoq
denationalize (v) => davlat tasarrufidan chiqarib xususiylashtirmoq
national (adj) => milliy, davlatga oid, mamlakatga oid
nationalized (adj) => davlat tasarrufiga o'tkazilgan
nationalistic (adj) => millatchilikka oid, millatchilik ruhidagi
international (adj) => xalqaro
multinational (adj) => ko'p millatli, bir nechta mamlakatda faoliyat yuritadigan
nationally (adv) => milliy darajada, mamlakat miqyosida
nationalistically (adv) => millatchilik ruhida
internationally (adv) => xalqaro miqyosda

fort (n) => qal'a, harbiy istehkom
fortress (n) => qal'a, mustahkam istehkom
fortification (n) => mustahkamlash, mudofaa inshooti, istehkom
fortification (n) => mudofaa inshooti, istehkom, qal'a va mudofaa inshootlari majmuasi
fortify (v) => mustahkamlamoq, mudofaa bilan mustahkamlamoq
fortified (adj) => mustahkamlangan, mudofaa bilan himoyalangan

gloom (n) => qorong'ilik, xiralik, g'amginlik, tushkunlik
gloominess (n) => g'amginlik, xiralik
gloom (v) => g'amgin ko'rinmoq, xira bo'lib turmoq, qorong'ilashmoq
gloomy (adj) => qorong'i, xira, g'amgin, tushkun, umidsiz
gloomily (adv) => g'amgin holda, tushkunlik bilan, xira ohangda

wrist (n) => bilak
wristwatch (n) => qo'l soati
wristwrap (n) => bilak uchun o'ram yoki bandaj

wrap (n) => o'ram, qadoq, o'rab turuvchi mato yoki kiyim, lavash o'rama
wrapper (n) => o'ram, qadoq materiali, o'rovchi
wrap (v) => o'ramoq, o'rab qo'ymoq, o'rab yopmoq
unwrap (v) => o'ramini ochmoq, yechmoq
rewrap (v) => qayta o'ramoq
wrapped (adj) => o'ralgan, qadoqlangan
unwrapped (adj) => o'ralmagan, qadoqlanmagan

knight (n) => ritsar, qirol tomonidan ritrsarlik unvoni berilgan kishi

phrase => ibora, gap birikmas

cutie (n) => yoqimtoy odam, shirin qiz yoki yigit, yoqimtoy
cuteness (n) => yoqimtoylik, yoqimlilik, shirinlik
cute (adj) => yoqimli, yoqimtoy, shirin, chiroyli
cutely (adv) => yoqimli tarzda, yoqimtoy tarzda

concern (n) => tashivsh, xavotir, muammo yoki masala, aloqadorlik
unconcern (n) => befarqlik, beparvolik
concern (v) => tashvishga solmoq, xavotirga tushirmoq, aloqador bo'lmoq
concerned (adj) => tashvishlangan, xavotirda, aloqador
unconcerned (adj) => tashvishlanmagan, beparvo
unconcernedly (adv) => beparvolik bilan, tashvishlanmay

care (n) => g'amxo'rlik, parvarish, e'tibor, tashvish
carelessness (n) => beparvolik, ehtiyotsizlik
caregiver (n) => parvarish qiluvchi, g'amxo'rlik qiluvchi shaxs
care (v) => g'amxo'rlik qilmoq, parvarish qilmoq, qayg'urmoq, ahamiyat bermoq
careful (adj) => ehtiyotkor, diqqatli
caring (adj) => g'amxo'r, mehribon, e'tiborli
careless (adj) => beparvo, ehtiyotkorsiz
carefully (adv) => ehtiyotkorlik bilan, diqqat bilan
carelessly (adv) => beparvolik bilan, ehtiyotsizlik bilan

gadget (n) => kichik texnik qurilma, asbob, jihoz
gadgetry (n) => texnik qurilmalar to'plami, jihozlar

time (n) => vaqt, marta, davr, zamon
times (n) => marta, davrlar, zamonlar
timing (n) => vaqtni belgilash, vaqtni o'lchash, vaqtni to'g'ri tanlash
time (v) => vaqtini belgilamoq, vaqtini o'lchamoq

jog (n) => yengil yugurish
jogger (n) => yengil yuguruvchi, yugurish bilan shug'ullanuvchi
jog (v) => yengil yugurmoq
jogging (adj) => yugurishga oid, yugurish uchun

hunger (n) => ochlik, kuchli ovqat istagi
hungry (adj) => och, qorni och
hunger (v) => qattiq istamoq, juda xohlamoq
hungrily (adv) => ochlik bilan, ochko'zlarcha
hungerless (adj) => ochliksiz, ochlik his qilmaydigan

boring (n) => zerikarli, qiziqarsiz
boredom (n) => zerikish, zerikarlilik
bore (v) => zeriktirmoq, zerikishiga sabab bo'lmoq
bored (adj) => zerikkan
boringly (adv) => zerikarli tarzda

fright (n) => qo'rquv, cho'chish, vahima
fear (n) => qo'rquv
frighten (v) => qo'rqitmoq, cho'chitmoq
frightened (adj) => qo'rqib ketgan, cho'chigan
frightening (adj) => qo'rqinchli, vahimali
frighteningly (adv) => qo'rqinchli darajada

annoyance (n) => asabiylashish, bezovtalik, jig'iga tegish, bezovta qiluvchi narsa yoki shaxs
annoyedness (n) => asabiylashganlik, jahli chiqqanlik
annoyingness (n) => asabiylashtiruvchanlik, bezovta qiluvchanlik
annoy (v) => asabiylashtirmoq, jig'iga tegmoq, bezovta qilmoq
annoying (adj) => asabiylashtiradigan, jig'iga tegadigan, bezovta qiladigan
annoyed (adj) => jahli chiqqan, asabiylashgan, bezovta bo'lgan
annoyingly (adv) => asabiylashtiradigan tarzda, jig'iga tegadigan tarzda

tiredness (n) => charchoq
tire (v) => charchatmoq
tired (adj) => charchagan
untired (adj) => charchamagan
tiring (adj) => charchatadigan, charchatib yuboradigan
tiredly (adv) => charchagan holda, charchoq bilan

design (n) => dizayn, loyiha, reja, niyat, naqsh
designer (n) => dizayner, loyihachi
redesign (n) => qayta loyihalash, yangi dizayn
designation (n) => nom berish, tayinlash, nom, unvon
design (v) => dizayn qilmoq, loyihalashtirmoq, biror maqsad uchun mo'ljallab yaratmoq
redesign  (v) => qayta loyihalashtirmoq, dizaynini o'zgartirmoq
overdesign (v) => ortiqcha murakkab qilib loyihalashtirmoq
designed (adj) => mo'ljallangan, loyihalangan
designer (adj) => brend, mashxur dizayner tomonidan yaatilgan
designated (adj) => belgilangan, tayinlangan
undesignad (adj) => rejalashtirilmagan, tasodifiy


planning => rejalashtirish


present => taqdim etmoq, ko'rsatmoq, sovg'a, hozirgi, mavjud

daydream (n) => xayol, xayol surish
daydream (v) => xayol surmoq, xayolga berilmoq

complaint (n) => shikoyat, arz, norozilik
complainer (n) => ko'p shikoyat qiladigan odam, noluvchi
complain (v) => shikoyat qilmoq, nolinmoq

now (n) => hozirgi vaqt, ayni payt
now (adj) => hozirgi, mavjud
now (adv) => hozir, ayni paytda, endi
nowadays (adv) => hozirgi kunda, bugungi kunda

currency (n) => valyuta, pul birligi
current (n) => oqim, tok, yo'nalish yoki tendensiya
current (adj) => hozirgi, joriy, amaldagi
currently (adv) => hozirda, ayni paytda, hozirgi vaqtda

seem => tuyulmoq, ko'rinmoq

appearance (n) => ko'rinish, tashqi ko'rinish, paydo bo'lish, chiqish
appearer (n) => paydo bo'luvchi, ko'rinuvchi
apparition (n) => sharpasimon ko'rinish, g'ayritabiiy mavjudotning ko'rinishi
appear (v) => ko'rinmoq, paydo bo'lmoq, namoyon bo'lmoq, tuyulmoq
apparent (adj) => ayon, ko'rinib turgan, ravshan, tuyuladigan
appeared (adj) => paydo bo'lgan, ko'ringan
apparently (adv) => aftidan, ko'rinishidan, chamasi

fur (n) => hayvon juni, mo'yna, mo'ynali kiyim
furrier (n) => mo'yna ustasi, mo'yna sotuvchisi
furriness (n) => hunlilik, tukdorlik
fur (v) => mo'yna bilan qoplamoq, mo'yna bilan astarlamoq, nakip bilan qoplamoq
furry (adj) => junli, tukli, mo'ynali
furred (adj) => mo'yna bilan qoplangan, nakip bosgan

grocer (n) => oziq-ovqat sotuvchi, oziq-ovqat do'koni egasi
grocery (n) => oziq-ovqat do'koni
groceries (n) => oziq-ovqat  mahsulotlari
greengrocer (n) => sabzavot va meva sotuvchi

upcoming (adj) => yaqinlashib kelayotgan, bo'lib o'tishi kutilayotgan, navbatdagi

almostness (n) => deyari-lik, deyarli bo'lish holati
almost (adv) => deyarli, qariyb, sal qolganda

barefootness (n) => yalangoyoq bo'lish holati
barefoot (adj) => yalangoyoq, oyoq kiyimsiz
barefoot (adv) => yalangoyoq holda, oyoq kiyimsiz

darling (n) => azizim, sevgilim, jonim, qadrdonim, sevgilim
darling (adj) => sevimli, aziz, qadrli

lead (n) => yetakchilik, ustunlik, yo'l-yo'riq 
leader (n) => yetakchi, rahbar, lider
leadership (n) => yetakchilik, rahbarlik, boshqaruv
lead (n) => qo'rg'oshin
lead (v) => yetaklamoq, boshqarmoq, olib bormoq, sabab bo'lmoq
leading (adj) => yetakchi, asosiy, eng muhim
leaden (adj) => qo'rg'oshindan yasalgan, og'ir xira

frown (n) => qosh chimirish, qovoq solish
frown (v) => qosh chimirmoq, qovog'ini solmoq, norozilik bildirmoq
frowny (adj) => qovoqli, xafa ko'rinishdagi
frowning (adj) => norozi, qattiq
frowningly (adv) => qosh chimirib, qovog'ini solib

whisper (n) => pichir, pichirlash, mish-mish, mish-mish gap
whisperer (n) => pichirlovchi
whisper (v) => past ovozda gapirmoq, pichirlamoq
whispery (adj) => pichirlayotgan, shivirlagan

underneath (adv) => tagida, ostida

frequency (n) => takrorlanishlar soni, takrorlanish darajasi, chastota
frequentation (n) => tez-tez borib turish
frequenter (n) => doimiy mijoz, tez-tez boradigan kishi
infrequency (n) => kamdan-kam takrorlanish
frequent (v) => tez-tez borib turmoq, qatnamoq
frequent (adj) => tez-tez takrorlanadigan, ko'p uchraydigan
infrequent (adj) => kamdan-kam uchraydigan
high-frequency (adj) => tez-tez ishlatiladigan, yuqori chastotali
frequently (adv) => tez-tez, ko'pincha
infrequently (adv) => kamdan-kam, noyob hollarda

gymnasium (n) => sport zali, gimnaziya
gymnastics (n) => gimnastika
gym-goer (n) => sport zaliga qatnaydigan kishi
gym (n) => sport zali, zport zalida mashq qilish, jismoniy tarbiya darsi
gym-fit (adj) => sport zalida shakllangan, baquvvat
gymnastically (adv) => epchillik bilan

novel (n) => roman, katta hajmdagi badiiy asar
novelness (n) => yangilik, o'ziga xoslik
novelist (n) => romannnavis, roman yozuvchi
novelization (n) => asarni roman shaklga moslashtirish
novelize (v) => asarni roman shakliga molashtirmoq
novel (adj) => yangi, o'ziga xos, ilgari bo'lmagan
novelly (adv) => yangicha tarzda, o'ziga xos tarzda
novelistic (adj) => romanga oid, roman uslubidagi

store (n) => do'kon, ombor, zaxira
stroage (n) => saqlash, saqlash joyi, xotira
storekeeper (n) => omborchi, do'kon egasi yoki boshqaruvchisi
storehouse (n) => ombor, katta saqlash binosi
storefront (n) => do'konning ko'chaga qaragan qismi, savdo nuqtasi
storey (n) => qavat
storeroom (n) => omborxona, saqlash xonasi
store (v) => saqlamoq, omborga joylamoq
stored (adj) => saqlangan
storable (adj) => saqlash mumkin bo'lgan

resign => istefoga chiqmoq

sack (noun) => qop, xalta

sack (verb) => ishdan haydamoq

accusation (n) => ayblov, ayblash, ayb qo'yish
accuser (n) => ayblovchi, ayblayotgan shaxs
accuse (v) => ayblamoq, ayb qo'ymoq, jinoyatda yoki sodir etilgan ishda ayblamoq
accusatory (adj) => ayblovchi, ayblov ohangidagi
accusable (adj) => ayblash mumkin bo'lgan
accused (adj) => ayblanuvchi, ayblangan
accusingly (adv) => ayblov ohangida, ayblovchi tarzda

fence (n) => devor, panjara, to'siq
fencer (n) => qilichboz, qilichbozlik bilan shug'ullanuvchi
fencing (n) => panjara bilan o'rash, qilichbozlik
fence (v) => panjara bilan o'ramoq, to'smoq
fenced (adj) => panjara bilan o'ralgan
fencing (adj) => panjara bilan o'ralgan

mural (n) => devorga chizilgan katta rasm, devoriy surat
muralist (n) => devoriy rasmlar chizadigan rassom
muralization (n) => devoriy rasm bilan bezatish
muralize (v) => devoriy rasm bilan bezatmoq
mural (adj) => devorga oid, devoriy
murally (adv) => devoriy tarzda

budget (n) => byudjet, moliyaviy reja, ajratilgan mablag'
budgeter (n) => byudjet tuzuvchi, xarajatlarni rejalashtiruvchi
budget (adj) => arzon, tejamkor, byudjetga mos
budget (v) => budjet tuzmoq, xarajatlarni rejalashtirmoq
budgetary (adj) => budgetga oid, byudget bilan bog'liq

package => paket, to'plam

regularly => muntazam ravishda, doimo

review (noun) => sharh, tahlil
reviewer => sharhlovchi
review (verb) => ko'rib chiqmoq
reviewable => ko'rib chiqish mumkin bo'lgan
reviewed (adjective) => ko'rib chiqilgan
reviewably => ko'rib chiqiladigan tarzda

instead (adv) => o'rniga, buning o'rniga

injury (n) => jarohat, shikast
injure (v) => yaralanmoq, shikastlanmoq
injured (adj) => jarohatlangan, shikastlangan
injurious (adj) => zararli, shikast yetkazuvchi
injuriously (adv) => zararli tarzda, shikast yetkazadigan tarzda

realize => tushunib olmoq

repaint => qayta bo'yash

robber => qaroqchi

bulb (n) => lampochka, piyozbosh, shishgan dumaloq qism
bulbed (adj) => lampochkali, piyozboshga o'xshash
bulbous (adj) => piyozboshga o'xshash, dumaloq va bo'rtib chiqqan

overtake => quvib o'tmoq

hold (n) => ushlash, tutish, ta'sir, nazorat
holder (n) => egasi, egalik qiluvchi, ushlagich, tutqich
holding (n) => egalik qilinadigan mulk, aksiya, ushlab turish
household (n) => oila xo'jaligi, birga yashovchi oila a'zolari
holdup (n) => to'xtalish, kechikish, qurolli talonchilik
hold (v) => ushlab turmoq, tutmoq, saylov yoki yig'ilish o'tkazmoq, egalik qilmoq, sig'dirmoq, ushlab qolmoq
behold (v) => ko'rmoq, tomosha qilmoq
uphold (v) => qo'llab-quvvatlamoq, kuchda qoldirmoq
withhold (v) => bermay turmoq, yashirmoq, ushlab qolmoq
held (adj) => ushlab turilgan, o'tkazilgan
handheld (adj) => qo'lda ushlab ishlatiladigan
household (adj) => uy-ro'zg'orga oid, hammaga tanish
withholding (adj) => ushlab qoluvchi, ushlab qolinadigan

fun (n) => quvnoqlik, o'yin-kulgi, xursandchilik
funniness (n) => kulgililik, hazilomuzlik
funnyman (n) => komik, hazilkash aktyor
funny (adj) => kululi, qiziqarli, g'alati, shubhali
fun (adj) => qiziqarli, maroqli
funnily (adv) => kulguli tarzda, g'alati tarzda

joke (n) => hazil, latifa, kulgili gap
joker (n) => hazilkash odam, hazil qiluvchi
joking (n) => hazillashish
joke (v) => hazillashmoq
jokey (adj) => hazilomuz, hazilga boy
jokingly (adv) => hazil tariqasida

comprehension (n) => tushunish, anglash, tushunish qobiliyati
comprehensibility (n) => tushunarlilik, tushunish mumkinligi
comprehend (v) => tushunmoq, anglamoq
comprehensive (adj) => keng qamrovli, to'liq, batafsil
comprehensible (adj) => tushunarli, anglash mumkin bo'lgan
incomprehensible (adj) => tushunarsiz, anglab bo'lmaydigan
comprehensively (adv) => keng qamrovli tarzda, to'liq tarzda
incomprehensibly (adv) => tushunarsiz tarzda

drama (n) => drama, dramatik voqea
dramatization (n) => dramatiklashtirish, sahnalashtirish
dramatize (v) => dramatiklashtirmoq, bo'rttirib ko'rsatmoq
dramatic (adj) => keskin, katta o'zgarishli, dramatik
dramatically (adv) => keskin, sezilarli darajada

consume (v) => iste'mol qilmoq, yeb-ichmoq, sarflamoq, yondirib yubormoq
consumption (n) => iste'mol, sarf (energiya, yoqilg'i), sil kasalligi
consumer (n) => iste'molchi
consumerism (n) => iste'molchilar huquini himoya qilish markazi
consumer (adj) => iste'molchilarga oid
consumable (adj) => iste'mol qilsa bo'ladigan, sarflanadigan
consumed (adj) => sarflangan, qamrab olingan
unconsumed (adj) => iste'mol qilinmagan

fortune (n) => omad, baxt, boylik
misfortune (n) => baxtsizlik, omadsizlik, kulfat
fortunate (adj) => omadli, baxtli
unfortunate (adj) => afsusli, noxush, omadsiz
forunately (adv) => yaxshiyamki, baxtga ko'ra, omadga ko'ra
unfortunately (adv) => baxtga qarshi, afsuski, taassufki

neighbor (n) => qo'shni, yon-atrofda yashaydigan odam
neighborhood (n) => mahalla, yashash hududi, atrof-muhit
neighborliness (n) => yaxshi qo'shnichilik, qo'shnilarga yaxshi munosabat
neighbor (v) => qo'shni bo'lib yashamoq, yonma-yon joylashmoq
neighborly (adj) => qo'shnilarcha, qo'shniga xos, yaxshi qo'shnichilikka asoslangan
neighborless (adj) => qo'shnisi yo'q

qualified => tajribali, malakali

attitude (n) => munosabat, qarash, nuqtai nazar, yondashuv
attitudinal (adj) => munosabatga oid, munosabat bilan bog'liq
attitudinally (adv) => munosabat nuqtayi nazaridan, munosabat jihatidan

space => fazo, bo'sh joy

meal (n) => ovqat, taom, ovqatlanish vaqti (nonushta, tushlik, kechqi ovqat
mealtime (n) => ovqatlanish vaqti
meal (n) => un, yorma
mealy (adj) => un kabi, uvoq, rangsiz, oqarib ketgan
mealy-mouthed (adj) => ochiq gapirmaydigan, aylanib o'tadigan

dinner (n) => kechki ovaqt, asosiy ovqat, rasmiy ziyofat
diner (n) => ovqatlanuvchi kishi, yo'l bo'yidagi kichik arzon rostoran
dine (v) => ovaqtlanmoq (odatda kechki yoki rasmiy ovaqt)

judge (n) => sudya, hakam, baholovchi
judgment (n) => kukm, qaror, mulohaza, baholash qobiliyati
misjudgment (n) => noto'g'ri baholash, xato qaror
judge (v) => hukm qilmoq, baholamoq, fikr bildirmoq
misjudge (v) => noto'g'ri baholamoq, xato hukm qilmoq
judgmental (adj) => boshqalarni tez hukm qiladigan, tanqidiy
judmentally (adv) => hukm qiluvchi, tanqidiy tarzda

judiciousness (n) => oqilonalik, mulohazalilik
judicious (adj) => oqilona, mulohazali, puxta o'ylangan
judiciously (adv) => oqilona tarzda, mulohaza bilan

apartness (n) => alohidalik, ajralganlik
apart (adj) => alohida, ajralgan
apart (adv) => alohida, bir-biridan uzoqda

flat / apartment (n) => kvartira
flatmate (n) => kvartiradosh, bir kvartirada birga yashaydigan odam

art (n) => san'at, san'at asari, mahorat
artist (n) => rassom, san'atkor, ijodkor
artlessness (n) => soddalik, tabiiylik, badiiylikning yo'qligi
artisary (n) => san'atkorlik mahorati, ijodiy mahorat
artistic (adj) => sanatga oid, badiiy, san'atkorona
artless (adj) => san'atsiz, badiiylikdan mahrum, samimiy, sodda
artlessly (adv) => sodda tarzda, badiiy bezaksiz, tabiiy ravishda

magazine (n) => jurnal (ommaviy o'quvchilar uchun maqolalar, yangiliklar, moda, sport va etc)
journal (n) => jurnal, ilmiy jurnal (ko'pincha ilmiy, akademik yoki professional maqolalar chop etiladigan nashr)

spend (n) => sarflangan pul yoki miqdor
spending (n) => pul sarflash, xarajat qilish
overspending (n) => ortiqcha pul sarflash
underspending (n) => ajratilganidan kamroq pul sarflash
spendthrift (n) => pulni juda ko'p sarflaydigan isrofgar odam
spender (n) => ko'p pul sarflaydigan odam, pul sarflovchi
spend (v) => sarflamoq, pul ishlatmoq, vaqt o'tkazmoq
overspend (v) => ortiqcha pul sarflamoq
underspend (v) => ajratilgandan kamroq pul sarflamoq
spendable (adj) => sarflash mumkin bo'lgan
spendhrift (adj) => isrofgar, pulni o'ylamasdan sarflaydigan

overseas => ....

wake (n) => kema izidan qoladigan to'lqin, motam marosimi, marhum bilan xayrlashuv kechasi
wakefulness (n) => uyg'oqlik, anglab yetish, ko'z ochilishi
wake (v) => uyg'onmoq, uyg'otmoq
wakeful (adj) => uyqusiz, uyg'oq
woke (adj) => ijtimoiy adolatsizlikdan xabardor
wrakefully (adv) => uyg'oq holda, uyqusiz

awakening (n) => uyg'onish, anglash, ongning uyg'onishi
awake (v) => uyg'onmoq, uyg'otmoq (majoziy ma'noda uyg'onish odatda)
reawaken (v) => qayta uyg‘otmoq, qayta uyg‘onmoq
awake (adj) => uyg'oq, hushyor
awakened (adj) => uyg'ongan, uyg'otilgan, anglagan

overthink => ortiqcha o'ylamoq

proper => to'g'ri

downtown (n) => shahar markazi
downtown (adj) => shahar markazidagi+ 

lending (n) => qarz berish, kredit berish
lender (n) => qarz beruvchi, qarz beradigan shaxs yoki tashkilot
lend (v) => qarzga bermoq, vaqtincha bermoq
lendable (adj) => qarzga berish mumkin bo'lgan

miss => turmushga chiqmagan ayollarga.
mrs => turmushga chiqqan ayollarga.
ms => Turmushga chiqqan yoki chiqmagan ayollar uchun ishlatiladi.
mr => Erkaklar uchun
mx => Jins ko'rsatilmaydigan neytral murojaat
sir => Ser (erkak)
dame => Xonim (ayol)
lord => Lord
lady => Ledi
prince => Shahzoda
princess => Malika
gentleman => Janob

comfort (n) => qulaylik, taskin, tasalli
discomfort (n) => noqulaylik, bezovtalik
comforter (n) => tasalli beruvchi odam, yupatuvchi, yopinchiq, adyol
comfort (v) => tasalli bermoq, yupatmoq
comfortable (adj) => qulay, shinam, o'zini erkin his qiladigan
uncomfortable (adj) => noqulay, o'zini noqulay his qiladigan
comfortably (adv) => qulay tarzda, bemalol
uncomfortably (adv) => noqulay tarzda

painfully => og'riqli 

difference (n) => farq, tafovut, kelishmovchilik
differentiation (n) => farqlash, ajratish
differential (n) => farq, tafovut
differ (v) => farq qilmoq, fikri boshqacha bo'lmoq
differentiate (v) => farqlamoq, ajratmoq, farqlanmoq
different (adj) => turli xil, turlicha, boshqacha
indifferent (adj) => befarq, parvo qilmaydigan
differing (adj) => farq qiluvchi, turlicha
differential (adj) => farqli, tafovutga asoslangan
differently (adv) => boshqacha, boshqa usulda, o'zgacha tarzda
indifferently (adv) => befarqlik bilan

eldest (n) => eng katta farzand, to'ng'ich
eldest (adj) => eng katta, to'ng'ich

ran => duch kelmoq

miss (n) => o'tkazib yuborilgan imkoniyat, xato yoki tegmagan zarba
miss (v) => o'tkazib yubormoq, ulgurmay qolmoq, sog'inmoq, nishonga tekkiza olmaslik
missnig (adj) => yo'qolgan, bedarak, yetishmayotgan
missed (adj) => o'tkazib yuborilgan, qoldirib ketilgan
missable (adj) => o'tkazib yuborish mumkin bo'lgan
unmissable (adj) => albatta ko'rish yoki borish kerak bo'lgan, o'tkazib yuborib bo'lmaydigan
missingly (adv) => yetishmaydigan tarzda, yo'qligi seziladigan tarzda

leave (n) => ta'til, ruxsat, ishdan vaqtincha ozodlik
leaver (n) => ketuvchi, tark etuvchi
left (n) => chap tomon, qolgan qism
leave (v) => ketmoq, tark etmoq, qoldirmoq, tashlab ketmoq, ruxsat bermoq
left (adj) => chap, chap tomondagi, qolgan
left (adv) => chapga, chap tomonga

enjoyment (n) => rohat, zavq, lazzat, zavqlanish
enjoy (v) => rohatlanmoq, zavqlanmoq, yoqimli deb bilmoq
enjoyable (adj) => yoqimli, zavqli, maroqli
unenjoyable (adj) => yoqimsiz, zavq bermaydigan
enjoyably (adv) => yoqimli tarzda, maroqli tarzda

gender (n) => jins, gender
gender (v) => jinsga ajratmoq, jins belgisini bermoq
gendered (adj) => jinsga xos, jinsga bog'liq
gender-neutral (adj) => jinsga bog'liq bo'lmagan, neytral
genderless (adj) => jinssiz, jinsga bog'lanmagan

gear (n) => tishli g'ildirak, mexanizm uzatmasi, uskuna yoki jihoz, anjom
gear lever (n) => uzatmani almashtiradigan dasta
gearing (n) => tishli uzatma mexanizmi, uzatma tizimi
gearbox (n) => uzatmalar qutisi
gearshift / gearstick (n) => uzatmalar darajasi
gear (v) => moslamoq, tayyorlamoq, biror narsaga moslashtirmoq, uzatma o'rnatmoq
geared (adj) => moslashtirilgan, yo'naltirilgan, uzatmali
gearless (adj) => uzatmasiz
`;

// ============================================================
// Pastdan quyi => parser. Bunga tegishning hojati yo'q.
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