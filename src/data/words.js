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

horizontal (adj) => gorizontal, yotiq
horizontally (adv) => gorizontal ravishda
horizontality (n) => gorizontallik 

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

exaggerated (adj) => bo'rttirilgan oshirib yuborilgan haddan tashqari kattalashtirilgan
exaggerate (v) => bo'rttirmoq, oshirib ko'rsatmoq, haddan tashqari kattalashtirib aytmoq
exaggeration (n) => bo'rttirish, oshirib ko'rsatish, mubolag'a

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

except => ...dan tashqari / ...dan boshqa / bundan mustasno
exception (n) => istisno
exceptional (adj) => ajoyib, noodatiy, istisno darajasidagi
exceptionally (adv) => nihoyatda, odatdagidan juda yuqori darajada
exceptional => g'ayrioddiy, odatdagidan farq qiladigan

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

matter (n) => masala, muammo, modda
matter (n) => ahamiyatga ega bo'lmoq, muhim bo'moq

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
argument (n) => bahs, dalil, argument, munozara
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

suitable (adj) => mos, ma'qul, to'g'ri keladigan, yaroqli, talabga javob beradigan
suit (v) => mos kelmoq, yarashmoq, ma'qul bo'lmoq
suitability (n) => moslik, yaroqlilik, maqsadga muvofiqlik
unsuitable (adj) => mos emas, yaroqsiz, to'g'ri kelmaydigan
unsuitably (adv) => nomuvofiq tarzda, mos kelmaydigan tarzda

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

miss (n) => o'tkazib yuborish, xato, nishonga tegmaslik
miss (v) => o'tkazib yubormoq, ko'rmay qolmoq, sog'inmoq, yetib kelolmaslik, qo'ldan boy bermoq, nishonga tekkiza olmaslik

category (n) => toifa, kategoriya, turkum
categorization (n) => tasniflash, toifalarga ajratish, turkumlash
categorize (v) => toifalarga ajratmoq, tasniflamoq, turkumlamoq
categorized (adj) => toifaga ajratilgan, turkumlangan, tasniflangan
categorical (adj) => qat'iy, keskin, shubhasiz
categorically (adv) => qat'iy ravishda, keskin tarzda, shubhasiz tarzda

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

awareness (n) => xabardorlik, anglash, tushunish
unawareness (n) => bexabarlik, xabardor emaslik
aware (adj) => xabardor, biladigan, anglagan, voqif
unaware (adj) => xabarsiz, bexabar, bilmaydiga
awarely (adv) => ongli ravishda, anglagan holda
unawarely (adv) => bexabar holda, bilmagan holda

natively (adv) => asl holatda, o'ziga xos tarzda, bevosite, tabiiy ravishda
native (adj) => mahalliy, asl, o'ziga xos, platformaga xos
native (n) => mahalliy, aholi vakili, ona tilida so'zlashuvchi
nativeness (n) => mahalliylik, asl holat

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

stare (v) => tikilib qaramoq, uzoq vaqt tikilib turmoq, ko'zini uzmay qarammoq
stare (n) => tikilish, tikilib qarash
starer (n) => tikilib qarovchi odam
staring (n) => tikilib qarash

block (v) => to'smoq, bloklamoq, yo'lini to'smoq, kirishni yoki foydalanishni cheklamoq
block (n) => to'sin, blok, to'sqinlik
blocking (n) => to'sish, bloklash
blocker (n) => to'sqinlik qiluvchi narsa, to'suvchi, bloklovchi
blockage (n) => tiqilib qolish, berkilish

kick (v) => tepmoq, chiqarib yubormoq, uzib qo'ymoq
kick (n) => tepki, zarba, zavq, hayajon
kicked (adj) => chiqarib yuborilgan

notify (v) => xabardor qilmoq, xabar bermoq
notification (n) => bildirishnoma, xabarnoma
notifiable (adj) => xabar qilinishi kerak bo'lgan

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

huge (adj) => juda katta, ulkan
hugely (adv) => juda katta darajada, nihoyatda
hugeness (n) => ulkanlik

list (n) => ro'yxat
listing (n) => ro‘yxat, ro‘yxatdagi yozuv, e’lon
list (v) => ro'yxat qilmoq, ro'yxatga kiritmoq

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

grade (n) => baho, darajada
grade (v) => baholamoq
grading (n) => baholash
grader (n) => baholovchi

approach (n) => yondashuv, usul, yo'l, yaqinlashish
approachability (n) => ochiqlik, murojaat qilish osonligi
approach (v) => yaqinlashmoq, yaqin kelmoq, murojaat qilmoq
approachable (adj) => yaqinlashish mumkin bo'lgan, muomila qilish oson bo'lgan, murojaat qilish oson bo'lgan
unapproachable (adj) => murojaat qilish qiyin, yaqinlashish qiyin
approaching (adj) => yaqinlashayotgan, yaqinlashib kelayotgan

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

below (adj) => quyidagi, pastdagi
below (n) => pastki qism, quyida keltirilgan narsa
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

absorb (v) => shimmoq, o'zlashtirmoq
absorption (n) => shimish, o'zlashtirish
absorbed (adj) => singdirilgan, shimdirilgan, berilib ketgan, o'yga cho'mgan
absorbent (adj) => shimuvchi
absorptive (adj) => shimishga yoki o'zlashtirishga oid, shimuvchi xususiyatga ega (ilmiy so'z)
absorbent (n) => shimuvchi material
absorbingly (adv) => o'ziga tortadigan tarzda
absorpivity (n) => yutish qobiliyati, shimuvchanlik

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

generic (adj) => umumiy, konkret bo'lmagan
generically (adv) => umumiy tarzda
genericness / genericity (n) => umumiylik

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

obtain (v) => olmoq, qo'lga kiritmoq
obtainable (adj) => olish mumkin bo'lgan

digit (n) => raqam, barmoq
digitization / digitisation (n) => raqamli shaklga o'tkazish (hujjat, rasm, ovozni)
digitalization / digitalisation (n) => raqamlashtirish (tizim, biznesni)
digitize / digitise (v) => raqamlashtirmoq, raqamli shaklga o'tkazmoq
digitalize / digitalise (v) => raqamli texnalogiyalarni joriy qilmoq, raqamlashtirmoq
digital (adj) => raqamli
digitized (adj) => raqamli shaklga o'tkazilgan
digitalized (adj) => raqamlashtirilgan, raqamli shaklga o'tkazilgan
digitally (adv) => raqamli tarzda

hint (n) => ishora, maslahat, kichik yordamchi ma'lumot
hint (v) => ishora qilmoq

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

inclusion (n) => kiritish, qo'shish
inclusiveness (n) => qamrovlilik
inclusive (adj) => o'z ichiga oluvchi, qamrab oluvchi
inclusively (adv) => qamrab olgan holda
include (v) => o'z ichiga olmoq

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

okay-ish (adj) => o‘rtacharoq, yomon emas, unchalik yaxshi ham emas, bo‘ladi (informal)

excellent (adj) => a'lo, juda yaxshi
excellently (adv) => a'lo darajada
excellence (n) => a'lo daraja, mukammallik

Googling => Google’dan qidirish
ChatGPTing => ChatGPT’dan foydalanish

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

specific (adj) => aniq, muayyan
specifically (adv) => aniq qilib, xususan
specificity (n) => aniqlik, o'ziga xoslik
specify (v) => aniq belgilamoq, ko'rsatmoq

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

statement (n) => bayonot, bildirilgan fikr, bayon, rasmiy ma'lumot
state (v) => bayon qimoq, bildirmoq, aniq aytmoq
stated (adj) => aytilgan, bayon qilingan, ko'rsatilgan
unstated (adj) => aytilmagan, ochiq bayon qilinmagan

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

heck (n) => lanat, jin ursin, nima balo, axir

feed (v) => ovqat bermoq, oziqlantirmoq, ma'lumot kiritmoq, ma'lumot bermoq
feed (n) => oqim, lenta, yangiliklar lentasi

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

term (n) => atama
terms => shartlar

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

ignore (v) => e'tibor bermaslik, mensimaslik, pisand qilmaslik
ignorance (n) => bilmaslik, bexabarlik
ignorant (adj) => bexabar, bilimsiz
ignorantly (adv) => bexabar tarzda

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

teach (v) => o'rgatmoq, ta'lim bermoq
teaching (n) => o'qitish
teaching (adj) => o'qitishga oid
teachability (n) => o'rgatiluvchanlik
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

statics (n) => statika
statistic (n) => statistik ko'rsatkich
statistical (adj) => statistik
statistically (adv) => statistik jihatdan

actual (adj) => haqiqiy, amaldagi, real, aslida mavjud bo‘lgan
actually (adv) => aslida, haqiqatda, rostdan ham
actuality (n) => haqiqat, mavjudlik
actualize (v) => amalga oshirmoq, ro'yobga chiqarmoq
actualization (n) => amalga oshirish, ro'yobga chiqarish
actualized (adj) => amalga oshirilgan, ro'yobga chiqarilgan

fundamental (adj) => asosiy, fundamental, tub
fundamentally (adv) => mohiyatan, tubdan
fundamentalism (n) => fundamentalizm
fundamentalist (n) => fundamentalist

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

maintenance (n) => texnik xizmat ko'rsatish, saqlash, parvarish qilish
maintain (v) => saqlab turmoq, texnik xizmat ko'rsatmoq
maintainable (adj) => oson saqlash mumkin bo'lgan, texnik xizmat ko'rsatish mumkin bo'lgan

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

subtle (adj) => nozik, sezilishi qiyin, darhol bilinmaydigan

defect (n) => nuqson, kamchilik, buzilish
defection (n) => boshqa tomonga o'tish, safni o'zgartirish
defector (n) => boshqa tomon yoki safga o'tgan shaxs
defect (v) => boshqa tomon yoki qarama-qarshi tomonga o'tmoq, safni o'zgartirmoq
defective (adj) => nuqsonli, yaroqsiz, kamchiligi bor
defectively (adv) => nuqsonli tarzda

great (adj) => katta, buyuk, juda yaxshi

overall (adj) => umumiy
overall (adv) => umuman olganda

meetup (n) => uchrashuv, yig‘ilish, biror mavzu bo‘yicha norasmiy tadbir

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

things => narsalar, ishlar, vaziyat, holat

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

sub-point => kichik band, asosiy punktning ichidagi kichik nuqta/band

key point => asosiy/muhim fikr

subproblem => kichik muammo

subcategory => kichik kategoriya
substring => startning bir qismi
subsection => kichik bo'lim

set (v) => qo'ymoq, o'rnatmoq, belgilamoq
set (n) => to'plam

obscure => kam ma’lum, noma’lum, ko‘pchilikka tanish bo‘lmagan

brute (n) => qo'pol odam, vaxshiy odam, kuchli va shafqatsiz odam
brutality (n) => shafqatsizlik, vahshiylik, qo'pollik
brutalization (n) => shafqatsiz munosabatga duchor qilish
brutalize (v) => shafqatsiz munosabatda bo'lmoq, vahshiylarcha muomala qilmoq
brute (adj) => qo'pol, shafqatsiz, vahshiy, hayvonlarcha
brutal (adj) => shafqatsiz, vahshiy, juda qattiq, ayovsiz
brutalized (adj) => shafqatsiz munosabatga uchragan, vahshiylarcha muomala qilingan
brutally (adv) => shafqatsizlarcha, qo'pol tarzda, juda keskin tarzda

straightforward => to‘g‘ridan-to‘g‘ri, sodda, tushunarli, murakkab bo‘lmagan

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

measure (n) => chora, tadbir
measure (n) => o'lchove, o'lcham, o'lchov birligi
measure (v) => o'lchamoq

cheat (n) => aldov, firibgarlik, qoidani buzib ustunlikka erishish
cheater (n) => aldovchi, qoidabuzar, ko'chiruvchi
cheating (n) => aldash, qoidani buzish, ko'chirish
cheat (v) => aldamoq, qoidani buzib foyda olmoq, ko‘chirmoq
cheated (adj) => aldangan, haqqi paymol qilingan
cheating (adj) => aldaydigan, qoidani buzadigan
cheatable (adj) => aldash mumkin bo'lgan, qoidani buzish yoki chetlab o'tish mumkin bo'lgan

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

chuckle (n) => past ovozdagi kulgi, ichidan kulish
chuckle (v) => ichidan kulmoq, past ovozda kulmoq
chuckling (adj) => past ovozda kulayotgan, ichidan kulayotgan
chuckling (n) => past ovozda kulish, ichidan kulish
chuckled (adj) => kulgan, ichidan kulgan

screenful (n) => bir ekranlik miqdor, ekranga sig‘adigan miqdor

suffice (v) => yetarli bo'lmoq, kifoya qilmoq

scan (v) => tezda ko‘zdan kechirmoq, tekshirib chiqmoq, skanerlamoq
scanner (n) => skaner, tekshiruvchi qurilma
scannable (adj) => tez ko'zdan kechirish mumkin bo'lgan

disservice (n) => zarar yetkazadigan yordam yoki xizmat, kutilgan foydaning aksiga olib keladigan ish, zararli munosabat

optionally (adv) => ixtiyoriy ravishda, xohishga ko‘ra, majburiy bo‘lmagan holda
optional (adj) => ixtiyoriy

evaluate (v) => baholamoq, tekshirib baho bermoq, qiymatini aniqlamoq.

eligibility (n) => moslik, talabga javob berish, huquqqa ega bo‘lish
eligible (adj) => mos, talabga javob beradigan, huquqqa ega
ineligible (adj) => talabga javob bermaydigan, huquqqa ega bo'lmagan, mos kelmaydigan
eligibly (adv) => talablarga javob bergan holda

undertaking (n) => zimmasiga olingan ish yoki majburiyat
undertaker (n) => dafn marosimlarini tashkil qiluvchi shaxs
undertake (v) => zimmasiga olmoq, bajarishga kirishmoq

illegal (adj) => noqonuniy
legal (adj) => huquqiy, yuridik, qonuniy

fuss (n) => ortiqcha shov-shuv, tashvish, bezovtalik, keragidan ortiq gap-so‘z

ideally (adv) => ideal holatda, eng yaxshi holatda, aslida xohlaganimizdek.

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

specified (adj) => belgilangan, aniq ko'rsatilgan
specify (v) => aniq ko'rsatmoq, belgilamoq

mistake (n) => xato

competion (n) => tugatish, yakunlash, tugallash
completeness (n) => to'liqlik, mukammallik
complete (v) => tugatmoq, yakunlamoq, to'ldirmoq
complete (adj) => to'liq, butun, mukammal, tugallangan
competed (adj) => tugallangan, yakunlangan, to'ldirilgan
completely (adv) => butunlay, to‘liq, tamoman, mutlaqo
completeable (adj) => tugatish mumkin bo'lgan, yakunlash mumkin bo'lgan

state (v) => bayon qilmoq, aytmoq, ma'lum qilmoq

otherwise => boshqacha, aks holda, bo'lmasa, bundan tashqari, boshqa jihatdan

related (adj) => bog‘liq, aloqador, tegishli.
relation (n) => aloqa, munosabat
relationship (n) => munosabat (Odatda odamlar va guruhlar orasidagi munosabat)
related (adj) => bog'liq, aloqador (Kengroq ma'noga ega. Formal asosan)
relate (v) => bog'lamoq, aloqador bo'lmoq

fundamental (adj) => asosiy, fundamental
fundamentally (adv) => asosiy jihatdan, tubdan, mohiyatan

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

stress (n) => stress, bosim
stressful (adj) => stressli, asabiylashtiradigan
stressed (adj) => stressda, bosim ostida

substring (n) => qism-satr, satr ichidagi qism

pass (n) => ruxsatnoma, yo'llanma
pass (v) => uzatmoq, o'tmoq

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
accessibility (n) => kirish yoki foydalanish qulayligi va imkoniyati
accessibly (adv) => foydalanish mumkin bo'lgan tarzda, kirish mumkin bo'lgan tarzda
inaccessibly (adv) => kirish imkoni bo'lmagan tarzda, foydalanib bo'lmaydigan tarzda

obvious (adj) => aniq, yaqqol
abviously => aniqki, yaqqol ravishda, albatta, ko'rinib turibdiki

formulate (v) => shakllantirmoq, ishlab chiqmoq, aniq qilib tuzmoq.

noticeable (adj) => eziladigan, ko‘zga tashlanadigan, yaqqol bilinadigan.

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

large chunks => katta qismlar, katta bo'laklar

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

feasible (adj) => amalga oshirish mumkin bo‘lgan, amaliy jihatdan mumkin, bajarishning iloji bor (real sharoitda, mavjud vaqt/resurs/imkoniyatlar bilan amalga oshirish mumkin)

realistically (adv) => realistik tarzda, amalda, haqiqiy sharoitni hisobga olib, real nuqtai nazardan.

aim (n) => maqsad, niyat, ko'zlangan natija
aimlessness (n) => maqsadsizlik, yo'nalishsiz holat
aim (v) => maqsad qilmoq, intilmoq, nishonga olmoq, yo'naltirmoq
aimless (adj) => maqsadsiz, yo'nalishsiz
aimlessly (adv) => maqsadsiz ravishda, yo'nalishsiz ravishda
aimed (adj) => yo'naltirilgan, mo'ljallangan, qaratilgan

though (gap oxirida) => lekin, ammo, shunga qaramay, baribir
though => ammo / garchi ... bo‘lsa ham
thought => aql, farsoat 
although (conjunction) => garchi (Rasmiyroq va asosan gap boshida keladi)
though (conjunction) => garcha, bo'lsa ham (norasmiyroq)

estimate (n) => taxminiy hisob, baho
estimate (v) => taxmin qilmoq, chamalamoq

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

genuine (adj) => haqiqiy, samimiy
genuinely (adv) => chin dildan, haqiqatan ham, samimiy ravishda, rostdan.

existing (adj) => mavjud, allaqachon bor bo‘lgan

strengthen (v) => mustahkamlamoq, kuchaytirmoq
strength (n) => kuch, mustahkamlik

strongly (adv) => kuchli tarzda
strong (adj) => kuchli

ensure (v) => ta’minlamoq, ishonch hosil qilmoq, kafolatlamoq

responsible (adj) => mas’uliyatli, javobgar
responsibly (adv) => ma'suliyat bilan, ma'suliyatli tarzda

cooperation (n) => hamkorlik, birgalikda ishlash
cooperator (n) => hamkor, hamkorlik qiluvchi
cooperate (v) => hamkorlik qilmoq, birgalikda ishlamoq, ko'maklashmoq
cooperative (adj) => hamkorlikka tayyor, hamkorlikdagi, yordam beradigan
uncooperative (adj) => hamkorlik qilmaydigan, qarshilik qiladigan
cooperatively (adv) => hamkorlikda, hamkorlik ruhida
uncooperatively (adv) => hamkorlik qilmasdan, istamay

mature (adj) => yetuk, ulg'aygan, oqilona
immature (adj => bolalarcha, yetuk emas

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

pitfall (n) => yashirin xavf, tuzoq, kutilmagan muammo, xato

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

milestone (n) => muhim bosqich, muhim natija, katta qadam.

major => mutaxassislik 

graduate => bitirmoq

internship => amaliyot dasturi

experience => tajriba, taasurot, malaka
experienced (adj) => tajribali

mention => eslatmoq, aytib o'tmoq

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

necessity (n) => zarurat, ehtiyoj
unnecessariness (n) => zarur emaslik
necessary (adj) => zarur, kerakli, shart
unnecessary (adj) => keraksiz, zarur bo'lmagan, ehtijoy bo'lmagan
necessarily (adv) => zarur ravishda, albatta
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

once => bir marta 
once + gap => ...gach / ...bilanoq / ...gandan keyin
once + past event => bir paytlar

outdated => eskirgan, zamonaviy emas, endi amalda bo‘lmagan degani.

necessary (adj) => kerakli, lozim, zarur

need (v) => kerak bo'lmoq , muhtoj bo'lmoq

exact (adj) => aniq
exactly (adv) => aynan, aniq
exactly => aynan 
exactly => huddi o'sha

include (v) => o'z ichiga olmoq, kiritmoq, qo'shmoq, ichiga qo'shmoq, hisobga olmoq

specific (adj) => aniq, muayyan, ma'lum bir

preferred (adj) => avfzal, ma'qul ko'rilgan

adjustment (n) => moslashtirish, sozlash, o'zgartirish
adjust (v) => moslashtirmoq, sozlamoq, o'zgartirib mos qilmoq
adjustable (adj) => sozlanadigan, moslashtiriladigan
adjusted (adj) => sozlangan, moslashtirilgan, o'zgartirib mos qilingan

revise => qayta ko‘rib chiqmoq, o‘zgartirmoq

need (v) => kerak bo'lmoq
need to + V1 => ... qilishi kerak bo'lmoq

tell (v) => aniqlamoq, ajrata olmoq
tell (v) => aytmoq

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

suitable => mos, muvofiq, to‘g‘ri keladigan, yaroqli

relevant (adj) => aloqador, tegishli, mavzuga mos, kerakli

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

anymore (adv) => endi, bundan buyon, boshqa ... emas, endi ...emas

etc or et cetera (phrase => va hokazo

involve (v) => jalb qilmoq, o‘z ichiga olmoq, bog‘liq bo‘lmoq

greatly (adv) => juda, katta darajada, sezilarli darajada

primarily (adv) => asosan, birinchi navbatda, eng avvalo degani.

success (n) => muvaffaqiyat
successful (adj) => muvaffaqiyatli
successfully (adv) => muvaffaqiyatli ravishda
succeed => muvaffaqiyatga erishmoq, uddalamoq, muvaffaqiyatli bo'lmoq

hometown => tug‘ilib o‘sgan shahar yoki joy, ona shahar

extent => daraja, ko‘lam, miqyos

feasible => amalga oshirish mumkin bo‘lgan, uddalasa bo‘ladigan, real

internship (n) => stajirovka, amaliyot

plot (n) => syujet, film, serial, kitobdagi voqealar rivoji.
plot (v) => rejalashtirmoq, yashirincha reja tuzmoq.

intonation => ohang, gapirishdagi ovozning ko‘tarilishi va pasayishi

tension => taranglik, zo‘riqish, keskinlik

consecuition (n) => ketma-ketlik
consecutive (adj) => ketma-ket, birin-ketin
consecutively (adv) => ketma-ket, birin-ketin, tartib bilan

humble (v) => kamtar qilmoq, kibrini tushirmoq, o‘zining ojizligini yoki chegarasini anglatmoq
humble => kamtar
humbly => kamtarlik bilan
humility => kamtarlik

stranger => begona yoki notanish odam

witness (n) => guvoh (odam), guvohlik, dalil
eyewitness (n) => ko'z bilan ko'rgan guvoh, voqea guvohi
witness (v) => guvoh bo'lmoq, ko'rmoq, guvoh sifatida imzolab tasdiqlamoq

negotiation => muzokara, kelishuvga erishish uchun olib boriladigan suhbat

terrific => ajoyib, zo‘r, juda yaxshi

eternal => abadiy, mangulik, tugamaydigan

fossil => qazilma qoldiq, qadimgi organizmning toshga aylangan qoldig‘i yoki izi

tournament => turnir, musobaqa

drug (n) => dori, giyohvand modda yoki dori vositasi
drug dealer (n) => giyohvand modda sotuvchisi, narkotik sotuvchi
drug (v) => giyohvand modda bilan ta'minlamoq, dori bermoq

counteract (v) => qarshi ta’sir qilmoq, ta’sirini kamaytirmoq, zararsizlantirmoq
counteractive (n) => qarshi ta'sir, qarshi harakat
counteragent (n) => qarshi ta'sir qiluvchi vosita
counteractive (adj) => qarshi ta'sir qiluvchi, ta'sirini kamaytiruvchi
counteractively (adv) => qarshi ta'sir qiladigan tarzda

hooded => kapyushonli, kapyushon kiygan

pivotal => hal qiluvchi, juda muhim, burilish yasaydigan

intense => kuchli, juda kuchli, keskin, shiddatli, zo‘r berilgan

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

loathe => juda yomon ko‘rmoq, jirkanmoq, nafratlanmoq.

mortify => juda qattiq uyalishga majbur qilmoq, sharmanda qilmoq, qattiq xijolatga solmoq

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

heed => e’tibor bermoq, quloq solmoq, ogohlantirishni jiddiy qabul qilmoq

subdue => bo‘ysundirmoq, taslim qilmoq, jilovlamoq

vault (n) => seyf, pul yoki qimmatbaho narsalar saqlanadigan joy yoki xona

burial (n) => dafn, ko‘mish, dafn marosimi
burier (n) => dafn qiluvchi, ko'muvchi
bury (v) => dafn qilmoq, ko'mmoq
buried (adj) => dafn qilingan, ko'milgan, ko'mib qo'yilgan

glance => qisqa qarash, nigoh

extirpate => biror narsani ildizi bilan butunlay yo‘q qilmoq, sug‘urib tashlamoq

dullness (n) => zerikarlilik, xiralik, o'tmaslik, fahmning sustligi
dull (v) => og'riqni susaytirmoq, o'tmaslashtirmoq
dull (adj) => zerikarli, qiziqarsiz, xira, o'tmas, fahmi sust
dully (adv) => zerikarli tarzda, xira tarzda


extirpate => butunlay yo‘q qilmoq, ildizi bilan tugatmoq, tag-tomiri bilan sug‘urib tashlamoq.

ex => sobiq, oldingi, Sobiq sevgili / sobiq turmush o‘rtoq

impertinenet => hurmatsiz, betga chopar, odobsiz, o‘ziga ortiqcha erkinlik beradigan.

desert (n) => munosib mukofot yoki jazo
deserve (v) => loyiq bo‘lmoq, haqli bo‘lmoq
deserving (adj) => loyiq, yordamga munosib
deserved (adj) => munosib, haqli
undeserved (adj) => nohaq, loyiq bo'lmagan
well-deserved (adj) => to'liq loyiq, juda munosib
deservedly (adv) => haqli ravishda, adolat bilan
undeservedly (adv) => nohaq, loyiq bo'lmagan holda

gladly => mamnuniyat bilan

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

normality (n) => me'yoriylik, odatiylik
normalization (n) => me'yorlashtirish, normallashtirish
normalize (v) => me'yorlashtirmoq, normallashtirmoq
normal (adj) => normal, me'yoriy
normally (adv) => odatda, normal tarzda

breast (n) => ko‘krak, ayol ko‘kragi, ko'krak bezi
breastfeeding (n) => emizish, bolani emizish
breast (v) => qarshi turmoq, mardona qarshilamoq, ko'krak bilan qarshilamoq
breastfeed (v) => emizmoq, bolani emizmoq

sunbathe => quyoshda toblanmoq

sunbathing => quyoshda toblanish

slender => ozg‘in, ingichka, nozik qomatli.

sluggish => sust, lanj, lohas, sekin harakat qiladigan.

hormone => gormon

pubescent => balog‘atga yetayotgan

attic (n) => chordoq, tom ostidagi xona yoki joy
attic (adj) => chordoqqa oid, tom ostidagi
atticky (adj) => chordoqqa o'xshash, chordoqsimon

puberty => balog‘at davri, jinsiy yetilish davri.

happiness => baxt, baxtiyorlik, xursandchilik

necessitate => zarurat tug‘dirmoq, talab qilmoq

harmony => uyg‘unlik, hamjihatlik, totuvlik, muvofiqlik.

the mopes => xafa/tushkun holatda yurmoq, kayfiyatsiz yurmoq.a

mope => xafa/tushkun holatda yurmoq, kayfiyatsiz yurmoq.

destiny (n) => taqdir, qismat, peshona
destination (n) => borish joyi, manzil, yetib boriladigan joy
destine (v) => taqdir qilmoq, m'ljallab qo'ymoq
destined (adj) => taqdirda bitilgan, mo'ljallangan

suite => mehmonxonadagi bir nechta xonadan iborat maxsus xona / lyuks

honeymoon => asal oyi

requisition => rasmiy, hujjatli talabnoma

requisition => rasmiy ravishda talab qilmoq / talabnoma orqali so‘ramoq.

beneficence (n) => yaxshilik qilish, xayrixohlik, saxovat, boshqalarga foyda keltirish
beneficent (adj) => yaxshilik qiluvchi, boshqalarga foyda keltiruvchi, xayrixoh, saxovatli
beneficently (adv) => yaxshilik qilib foyda keltirgan holda, xayrixohlik bilan

fatherhood => otalik

motherhood => onalik

parenthood => ota-onalik

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

evenly => teng ravishda, bir tekisda, baravar taqsimlab.

amalgam (n) => aralashma, qorishma, birlashgan narsa
amalgamation (n) => birlashish, qo'shilish, bir necha narsaning yagona narsaga aylanishi
amalgamate (v) => birlashtirmoq, qo'shmoq, bir butunga aylantirmoq
amalgamative (adj) => birlashtiruvchi, qo'shuvchi
amalgamatively (adv) => birlashtiruvchi tarzda

ease (n) => yengillik, xotirjamlik, qulaylik, qiyinchiliklarning kamayishi
ease (v) => yengillashtirmoq, kamaytirmoq, yengil qilmoq, tinchlantirmoq
easy (adj) => oson, yengil, qiynalmaydigan, qulay
easily (adv) => osonlik bilan, osongina, qiynalmasdan, bemalol

nonsense => bema'nilik, safsata

pack => bitta pachka / qadoq

fail => muvaffaqiyatsizlikka uchramoq, uddalay olmaslik, imtihondan o‘tolmaslik.

drain (n) => drenaj, suv chiqadigan joy yoki quvur, kuch yoki resurslarning kamayishi
drainer (n) => suyuqlikni chiqaruvchi moslama, drenaj moslamasi
drainage (n) => drenaj, suvni chiqarish tizimi
drain (v) => suyuqlikni chiqarib yubormoq, kuchini tugatmoq, resurslarni kamaytirmoq
drainable (adj) => suyuqligini chiqarish mumkin bo'lgan
drained (adj) => holdan toygan, butunlay charchagan
draining (adj) => holdan toydiradigan, kuchini oladigan

melt => erimoq / eritmoq.

fledged => qanotlari chiqqan, uchishga tayyor.

fledge => Qush bolasining qanot chiqarib, uchishga tayyor bo‘lishi.

fully-fledged => to‘laqonli, to‘liq huquq va maqomga ega, to‘liq shakllangan.

pack => joylamoq, yig‘moq, qadoqlamoq

demoralization (n) => ruhiy tushkunlik, ruhiyatning tushishi, umidsizlanish
demoralize (v) => ruhiyatini tushirmoq, umidsizlantirmoq, ruhini sindirmoq
demoralized (adj) => ruhan tushkun, umidsizlangan, ruhi singan
demoralizing (adj) => ruhiyatni tushiradigan, umidsizlantiradigan
demoralizingly (adv) => ruhiyatni tushiradigan tarzda

leonine => sherga o‘xshash, sherga xos 

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

nondescript => o‘ziga xosligi yo‘q, oddiy, ko‘zga tashlanmaydigan, ajralib turmaydigan.

impertinent => odobsiz, betga chopar, o‘rinsiz gapiradigan, haddidan oshgan.

joyful => juda xursand, quvonchga to‘la, shod.

kid => bola, farzand.

liar => yolg‘onchi, ya’ni yolg‘on gapiradigan odam.

teardrops => ko‘z yosh tomchilari, ko‘zdan oqayotgan yosh tomchilari.

smash => qattiq urib sindirmoq / chil-chil qilmoq

smithereens => juda mayda bo‘laklar, chil-chil

dither (n) => ikkilanish, qarorsizlik, bir qarorga kela olmaslik
ditherer (n) => ko'p ikkilanadigan odam, qaror qabul qilishda qiynaladigan odam
dither (v) => ikkilanmoq, bir qarorga kela olmay turmoq, nima qilishni bilmay qolmoq

aspect (n) => jihat, tomon, qirra, nuqtayi nazar, ko'rinish, tashqi kifoya

hereinabove => yuqorida aytib o‘tilgan / yuqorida keltirilgan.

gorgeous => juda chiroyli, nihoyatda go‘zal, ko‘zni qamashtiradigan.

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

foolishly => ahmoqona tarzda, nodonlarcha, o‘ylamay

foretell => oldindan aytmoq, bashorat qilmoq, kelajakda nima bo‘lishini oldindan aytish.

envelopes => konvertlar

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

lighten => yengillashtirmoq, yengil qilmoq; yorqinlashtirmoq.

ultimatum (n) => qat'iy oxirgi talab, so'nggi shart
ultimate (adj) => eng so'nggi, yakuniy, eng oliy, eng muhim
ultimately (adv) => oxir-oqibat, yakunda, pirovardida

squirm => tipirchilamoq, bezovta bo‘lib qimirlash

threshold => bo‘sag‘a, chegara, me’yor.

distractibility (n) => tez chalg'ish xususiyati, diqqatning oson bo'linish
distraction (n) => chalg'ituvchi narsa, diqqatning bo'linishi
distract (v) => chalg‘itmoq, diqqatini bo‘lmoq
distracted (adj) => chalg'igan, diqqati bo'lingan
distracting (adj) => chalg'ituvchi, diqqatni bo'luvchi
distractedly (adv) => chalg'igan holda, diqqati bo'lingan holda

chronicity (n) => surunkalilik, uzoq davom etish
chronic (adj) => surunkali, uzoq davom etadigan, doimiy
chronically (adv) => surunkali tarzda, doimiy ravishda

forgiveness => kechirim, afv, kechirish.

gridlock => tirbandlik, transport harakatining butunlay to‘xtab qolishi;


arrive (v) => kelmoq, yetib kelmoq
arrival (n) => kelish, yetib kelish
arrived (adj) => yetib kelgan, kelgan
rearrive (v) => qayta kelmoq, yana yetib kelmoq
rearrival (n) => qayta yetib kelish, yana yetib kelish

stagger => muvozanatni yo‘qotib, gandiraklab yurmoq.

arm (n) => qo'l, bilak
armful (n) => qo‘lga quchoqlab sig‘adigan miqdor, bir quchoq, bir dasta
arm (v) => qurollantirmoq, qurol bilan ta'minlamoq
armed (adj) => qurollangan

retort => birovning gapiga keskin yoki tezda javob qaytarmoq, ayniqsa bahsda.

batrayer (n) => xiyonat qiluvchi, sotqin
betrayal (n) => xiyonat, sotqinlik, ishonchni oqlamaslik
betray (v) => xiyonat qilmoq, ishonchni oqlamaslik, sotmoq, sirni oshkor qilmoq
betrayed (adj) => xiyonat qilingan, ishonchi oqlamagan, sotilgan

ferry => parom, ya’ni odamlar va mashinalarni suv orqali bir joydan boshqa joyga olib o‘tadigan kema/qayiq.

pier => pristan, suv ustiga chiqib turgan yo‘lak

tension => taranglik, zo‘riqish, ruhiy bosim

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

swarm => to‘da bo‘lib yig‘ilmoq / yopirilmoq
swarm => asosan to‘da, gala

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

megalomaniac => o‘zini haddan tashqari buyuk deb biladigan odam (noun)

megalomaniacal => o‘zini haddan tashqari buyuk deb biladigan, megalomaniyaga xos (adjective)

megalomaniacally => megalomaniyaga xos tarzda (adverb, kam ishlatiladi)

megalomania => o‘zini haddan tashqari buyuk deb bilish, megalomaniya (noun)

evolve => rivojlanmoq, o‘zgarib/takomillashib bormoq, evolyutsiyaga uchramoq.

prejudices => oldindan shakllangan noto‘g‘ri qarashlar, xurofotlar, biryoqlama qarashlar 

thankful => minnatdor, shukronali d

shortcut => qisqa yo‘l, ko‘chma ma’noda ishni tezroq yoki osonroq bajarish usuli.

shitty => juda yomon, sifatsiz, rasvo, be'maza.

homemade => uyda tayyorlangan, uy sharoitida tayyorlangan.

vainty (n) => manmanlik, o'ziga bino qo'yish, behuda faxrlanish
vain (adj) => behuda, samarasiz, natijasiz, o'ziga bino qo'ygan, manman
vainly (adv) => behuda, natijasiz tarzda, o'ziga bino qo'yib

strive => astoydil harakat qilmoq, urinmoq

rook => qarg‘asimon qush

rook => ladya (shaxmatdagi dona) ♟

choke (n) => bo'g'ilish, bo'g'uvchi holat
choker (n) => bo'g'uvchi narsa yoki shaxs, bo'yinbog', choker
choke (v) => bo‘g‘moq, bo‘g‘ilib qolmoq
choky (adj) => bo'g'uvchi, tiqilib qolishga moyil
choked (adj) => bo'g'ilgan, bog'ilib qolgan


intentionally => ataylab, qasddan, bila turib.

fishbone => baliq suyagi; ba’zan “baliq skeleti” degan ma’noda ham ishlatiladi.

deficit (n) => kamomad, yetishmovchilik, zarar

dogma (n) => qat'iy qarash, shubhasiz haqiqat deb qabul qilinadigan fikr
dogmatization (n) => biror fikrni mutlaq haqiqatga aylantirish, qat'iylashtirish
dogmatize (v) => biror fikrni mutlaq haqiqat sifatida ilgari surmoq; o‘z qarashini qat’iy va shubhasiz to‘g‘ri deb ko'rsatmoq
dogmatic (adj) => o'z fikrini mutlaq to'g'ri deb biladigan, murosasiz
dogmatically (adv) => o'z fikrini mutlaq to'g'ri deb hisoblab, murosasiz tarzda

influential (adj) => nufuzli, ta’sirga ega, ta’sir o‘tkaza oladigan

filtration => filtrlash, filtratsiya

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

stroke (n) => insult

extirpate (v) => ildizi bilan yo‘q qilmoq, butunlay tugatmoq, yo‘qotib tashlamoq

chuck (n) => molning bo'yin-yelka qismidagi go'sht
chuck (v) => uloqtirmoq, otmoq, tashlab yubormoq, tashlab ketmoq, voz kechmoq
chocker (n) => uloqtiruvchi, otuvchi

madhouse (n) => jinnixona, tartibsiz yoki shovqin-suron joy

murderer (n) => qotil, odam o‘ldirgan shaxs

confession (n) => tan olish, iqrorlik, gunohni tan olish
confessor (n) => tan oluvchi, gunoh iqrorini tinglovchi ruhoniy
confessional (n) => tan olish xonasi yoki kabinasi (cherkovda)
confess (v) => tan olmoq, iqror bo‘lmoq
confessional (adj) => tan olishga oid, shaxsiy sirlarni ochiq aytadigan 
confessed (adj) => ochiq tan olingan, e'lon qilingan
confessedly (adv) => o'zini tan olganidek, ochiq e'tirof etib

objection (n) => e’tiroz, qarshilik, norozilik

quota => limit, ajratilgan miqdor, me’yor

kempt => ozoda, tartibli, parvarishlangan 

unkemptness (n) => qarovsiz holat, pala-partishlik
kempt (adj) => tartibli, ozoda, parvarishlangan
unkempt (adj) => pala-partish, qarovsiz, ozoda emas, tartibsiz
unkemptly (adv) => qarovsiz, pala-partish tarzda

ferry => parom, ya’ni odamlar yoki mashinalarni suv orqali bir qirg‘oqdan boshqasiga olib o‘tadigan kema.


pretend => o‘zini …dek tutmoq, rol o‘ynamoq, soxta qilib ko‘rsatmoq

drag (n) => sudrash, tortish, sekin va zerikarli jarayon
dragger (n) => sudrovchi, sudraydigan odam yoki narsa
drag (v) => sudramoq, tortib olib obrmoq, sekin harakatlantirmoq

exile => surgun, badarg‘alik

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

pour tea => choy quymoq.

meritorious => savobli, maqtovga loyiq, ezgu

nuance (n) => nozik farq, nuans, sezilar-sezilmas farq (ma'no yoki ohangda)

nuanced (adj) => nozik jihatlarni e'tiborga olgan, chuqur tahlil qilingan, ko'p qirrali (masalan, nuanced 

nuance (v) => nozik farq bermoq, ohangdor yoki tabaqalashtirgan holda yondashmoq (kamroq ishlatiladigan fe'l shakli)

mess (v) => tartibni buzish, bulg'ash, chalkashtirib yuborish

mess (n) => tartibsizlik, to'polon, kir-chir holat; chalkash / qiyin vaziyat

messiness (n) => tartibsizlik, to'zg'iganlik holati (abstrakt tushuncha)

messy (adj) => tartibsiz, to'zg'igan, kir, chigal

messily (adv) => tartibsiz ravishda, iflos qilib

deed (n) => rasmiy hujjat, mulkka egalik huquqini tasdiqlovchi hujjat
deed (n) => qilmish, amal, xatti-harakat
deed (v) => rasmiy hujjat orqali mulkni boshqa shaxsga o'tkazmoq

bid (n) => taklif, narx taklifi, savdoda berilgan narx
bid (v) => taklif bermoq, narx taklif qilmoq, savdoda ma'lum narx taklif qilmoq

favor => iltimos / yaxshilik

amulet (n) => tumor, himoya tumori, yomonlikdan asraydi deb ishoniladigan buyum
amuletic (adj) => tumorga oid, himoya tumori sifatidagi

jealous => hasadgo‘y / hasad qilmoq / havas qilmoq

casualty (n) => qurbon, jarohatlangan yoki halok bo'lgan odam, talofat

tense => tarang, zo‘riqqan, asabiy

arrogance (n) => kibr, manmanlik, o'zini katta olish, takabburlik
arrogant (adj) => takabbur, o‘zini katta oladigan, manman
arrogantish (adj) => biroz takabbur, takabburga o'xshash
arrogantly (adv) => takabburlik bilan, manmanlarcha, o'zini katta olib

spoiled => erkatoy, haddan tashqari erkalatilgan

finalizing => yakunlash / oxiriga yetkazish / rasman tugatish

sorrow => qayg‘u, g‘am

erase => o‘chirmoq, yo‘q qilmoq

interfere => aralashmoq, xalaqit bermoq, ishga qo‘shilmoq.

caution (n) => ehtiyotkorlik, ogohlantirish, ehtiyot bo‘lish 
precaution (n) => ehtiyot chorasi, xavfsizlik chorasi, oldini olish chorasi
caution (v) => ogohlantirmoq, ehtiyot bo'lish haqida ogohlantirmoq
cautious (adj) => ehtiyotkor, ehtiyotkorona
cautiously (adv) => ehtiyotkorlik bilan

miracle => mo‘jiza

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

throughout => davomida / butun davomida / har bir qismida.

fluctuate => o‘zgarib turmoq, tebranib turmoq, ko‘tarilib-tushib turmoq.

prune => Quritilgan olxo‘ri (bir dona)

shore => qirg‘oq, sohil.

folks => Ota-ona yoki oila a’zolari (norasmiy, kundalik tilda).

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

movement => harakat, siljish, jarayonning boshlanishi

dent (n) => botiq, ezilgan joy, urilishdan qolgan botiq, pachoq joy
denter (n) => botiq hosil qiluvchi
dent (v) => botiq hosil qilmoq, ezmoq, botiq qilib qo'ymoq
dent (adj) => botiq bo'lgan, ezilgan

underestimate (n) => past baholash, kam baholash
underestimate (v) => past baholamoq, aslidan kam deb hisoblamoq, imkoniyati yoki ahamiyatini yetarlicha baholamaslik
underestimated (adj) => yetarlicha baholanmagan, asl qiymati past baholangan

misunderstanding => tushunmovchilik, noto‘g‘ri tushunish.

mistake (noun) => Xato

mistake (verb) => Xato qilmoq

cliché (n) => siyqasi chiqqan ibora, ko'p takrorlangan g'oya yoki fikr
cliched (adj) => siyqasi chiqqan, original bo'lmagan

literally => So‘zma-so‘z / Tom ma’noda / Rostdan ham (ta’kidlash uchun, norasmiy suhbatda)

feast => katta ziyofat, mo‘l-ko‘l taomlar tortiladigan dasturxon.
obsession => haddan tashqari berilish, kuchli qiziqish

obsessed => berilib ketgan, haddan tashqari o‘ylaydigan

mansion => katta/hashamatli uy, qasr

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

keen => biror narsaga/kimgadir juda qiziqqan, ishtiyoqmand.

divorce (n) => ajrashish, nikohning bekor qilinishi
divorcee (n) => ajrashgan erkak yoki ayol
divorce (v) => ajrashmoq, nikohni bekor qilmoq
divorced (adj) => ajrashgan

disgust (n) => jirkanch, kuchli nafrat yoki jirkanish hissi
disgust (v) => jirkanmoq, jirkanish hissini uyg'otmoq
disgusting (adj) => jirkanch, ko'ngil aynitadigan, juda yoqimsiz
disgusted (adj) => jirkanib ketgan, jirkanayotgan, nafratlangan
disgustedly (adv) => jirkanib, jirkanish bilan

inclined => qiya, egilgan

retort => keskin javob qaytarmoq / darhol javob qaytarmoq.

toxic => zaharli; inson yoki munosabatga zararli ta’sir qiladigan.

trait (n) => irsiy belgi, xususiyat
trait (n) => xarakter xususiyati, o‘ziga xos belgi, shaxsiy xususiyat

reduce => kamaytirmoq, qisqartirmoq, pasaytirmoq

anticipation (n) => oldindan kutish, kutish hissi, taxmin, oldindan sezish
anticipator (n) => oldindan kutuvchi, oldindan taxmin qiluvchi
anticipate (v) => oldindan kutmoq, taxmin qilmoq, sodir bo'lishini oldindan kutib tayyorlanmoq
anticipatory (adj) => oldindan kutishga asoslangan, oldindan tayyorgarlik ko'ruvchi
anticipated (adj) => oldindan taxmin qilingan, kutilgan
anticipatively (adv) => oldindan kutgan holda, oldindan taxmin qilib

exposure => ta’sirga duchor bo‘lish; ta’sir; ochiq qolish; tanishuv

hesitant => ikkilanayotgan, qat’iy qaror qila olmayotgan, tortinayotgan

recognize => tanimoq, tanib olmoq, anglamoq

retrieve => qayta topmoq, qaytarib olmoq, xotiradan esga tushirmoq

cognition (n) => bilish jarayoni, idrok etish va fikrlash jarayoni
cognitive (adj) => aqliy jarayonlarga oid, bilishga oid, idrok va fikrlashga oid
cognitively (adv) => aqliy jihatdan, bilish jarayoni nuqtayi nazaridan

luckily => yaxshiyamki, omadimizga, baxtimizga

ash (n) => kul, kul qoldig'i
ash (v) => kulga aylantirmoq, kuydirib kul qilmoq
ashy (adj) => kulrang, kul tusidagi
ashed (adj) => kulga aylangan, kul bilan qoplangan

shady => shubhali, ishonchsiz, g‘alati; soyali.

girlies => qizlar / qizchalar / dugonalar

inflator => havo bosadigan/qamaydigan moslama, shishirgich.

puncture => teshib qo‘ymoq / teshib ketmoq

tire => shina; charchatmoq; bezdirib yubormoq.

grind => maydalamoq; qattiq mehnat qilmoq; mashaqqatli ish/rutina.

locksmith => qulfsoz / qulf ustasi

spare => zaxira; ortiqcha; bo‘sh vaqt/vaqt ajratmoq.

weirdness (n) => g'alatilik, noodatiylik
weirdo (n) => g'alati odam, telba (kamsituvchi)
weird (adj) => g'alati, noodatiy, ajabtovur, sirli
weirdish (adj) => biroz g'alati
weirdly (adv) => g'alati tarzda, ajabtovur

mature => yetuk, aqli raso, mas’uliyatli

sparkling => yaltirab turgan; yarqiragan; juda quvnoq/jilvali.

dazzlement (n) => ko'zning qamashishi, hayratga tushish
dazzle (v) => ko'zni qamashtirmoq, hayratga solmoq
dazzled (adj) => ko'zi qamashgan, hayratga tushgan
dazzlingly (adv) => ko'zni qamashtiradigan darajada, juda ajoyib tarzda

hotshot => o‘zini katta oladigan mashhur/zo‘r odam; katta mutaxassis.

paralegal => yurist yordamchisi / advokat yordamchisi.

air (n) => havo, atmosfera, muhit, kayfiyat, efir
airness (n) => havodorlik, keng va havo yaxshi kiradiganlik
airlessness (n) => havosizlik, dimlik
air (v) => shamollatmoq, havolatmoq, efirga uzatmoq, ochiq bildirmoq
airy (adj) => havodor, havo yaxshi kiradigan, yengil, erkin
aired (adj) => efirga uzatilgan, havoga chiqarilgan
airless (adj) => havosiz, havo almashinuvi yomon
airly (adv) => beparvolik bilan, yengil tarzda

festive => bayramona, bayramga oid, bayram kayfiyatidagi 

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

lowlife => pastkash odam, tuban odam, hech narsaga yaramaydigan odam degan haqoratli so‘z.

stably => barqaror ravishda, bir maromda, mustahkam tarzda.

jerk => ahmoq, tentak, bezori, qo‘pol odam

jerk => keskin tortmoq / siltamoq

threaten => tahdid qilmoq, qo‘rqitmoq

addict (n) => qaram odam, biror narsaga kuchli berilib ketgan odam
addiction (n) => qaramlik, kuchli bog'lanib qolish
addictiveness (n) => qaramlik keltiruvchanlik, o'ziga kuchli tortish xususiyati
addict (v) => qaram qilib qo'ymoq, o'ziga qattiq bog'lab qo'ymoq
addictive (adj) => qaramlik keltirib chiqaradigan, o'ziga qattiq bog'lab qo'yadigan
addicted (adj) => qaram bo'lgan, biror narsaga qattiq berilib ketgan
addictively (adv) => qaramlik keltiradigan tarzda, juda o'ziga tortadigan tarzda

madly => telbalarcha, aqldan ozgudek.

sentence => sud hukmi / jazo ⚖️

sentence => hukm qilmoq, jazo tayinlamoq

oblige => majbur qilmoq, majburiyat yuklamoq; ba’zan iltimosni bajarmoq / yordam bermoq.

suicide => o‘z joniga qasd qilish, o‘zini o‘ldirish.

commitment (n) => majburiyat, sadoqat, qat'iylik
commit (v) => sodir etmoq, amalga oshirmoq
committed (adj) => sodiq, qat'iy bel bog'langan, majburiyat olgan
committedly (adv) => qat'iylik bilan, sadoqat bilan

returnee => boshqa joyga ketib, keyin qaytib kelgan odam.

paranoia => paranoya, asossiz shubha va qo‘rquv, ta’qib qilinayotgandek his qilish.

ruin => barbod qilmoq, buzmoq, vayron qilmoq.

marriage => nikoh, turmush, er-xotinlik.

mansion => hashamatli katta uy, saroy, qasr.

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

junk => keraksiz yoki yaroqsiz narsa

hunk => katta bo‘lak, parcha.

gracious => mehribon, xushmuomala, nazokatli, marhamatli.

otherwise => aks holda, bo‘lmasa, yo‘qsa.

seaside => dengiz bo‘yi, sohil

ruin => barbod qilmoq / buzmoq

ruined => barbod bo‘lgan / buzilgan

nope => Yo‘q / Yo‘q-e / Yo‘q, unday emas.

charm (n) => tumor, omad keltiruvchi narsa, joziba, maftunkorlik
charmlessness (n) => jozibasizlik
charmer (n) => odamlarni o'ziga rom eta oladigan, jozibali odam
charm (v) => maftun qilmoq, o'ziga rom etmoq
charming (adj) => maftunkor, jozibali, yoqimli
charmless (adj) => jozibasiz, maftunkorligi yo'q
charmingly (adv) => jozibali ravishda, maftunkor tarzda

insist => qat’iy talab qilmoq, turib olmoq

ethics => axloqiy qoidalar / etika

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

fabric => mato

struggle => qiynalmoq, kurashmoq, mashaqqat bilan harakat qilmoq

aspiration (n) => intilish, orzu, yuksak maqsad
aspirant (n) => biror lavozim yoki maqsadga intiluvchi, nomzod
aspirer (n) => intiluvchi, orzu qiluvchi
aspire (v) => intilmoq, orzu qilmoq
aspirational (adj) => yuksak maqsadga intiluvchi, orzu-umidga asoslangan
aspirationally (adv) => yuksak maqsad ko'zlagan holda, intilish nuqtayi nazaridan

provoke => qo‘zg‘atmoq, keltirib chiqarmoq, sabab bo‘lmoq, ataylab jahlini chiqarmoq

tingle => jimirlash, mayin titroq hissi

fire => olov; yong‘in; ishdan bo‘shatmoq; o‘q uzmoq

mate => do‘st, o‘rtoq, og‘ayni.

stun => karaxt qilmoq / hayratda qoldirmoq / lol qoldirmoq.

truth (n) => haqiqat, rost gap
truthfulness (n) => rostgo'ylik
truthful (adj) => rostgo'y, rost gapiradigan
true (adj) => rost, haqiqiy, to'g'ri
untrue (adj) => yolg'on, noto'g'ri, haqiqatga mos kelmaydigan
truly (adv) => haqiqatan ham, rostdan ham, chin dildan
truthfully (adv) => rostini aytganda, rostgo'ylik bilan

playful => o‘ynoqi, hazilkash, sho‘x.

interrupt => gapini bo‘lmoq / xalaqit bermoq / bo‘lmoq

cross (n) => xoch, kesishgan belgi
crossing (n) => kesib o'tish, kesishuv, piyodalar o'tish joyi
crossroads (n) => chorraha, yo'l ayrilishi
cross (v) => kesib o'tmoq, kesishmoq, chalishtirmoq
cross (adj) => jahldor, badjahl, achchiqlangan
cross-border (adj) => chegaralararo, davlatlar o‘rtasidagi, chegaradan o‘tuvchi.
crossly (adv) => jahl bilan, achchiqlanib

instantiate => yaratmoq, konkret nusxasini yaratmoq, instance hosil qilmoq.

entrepreneur (n) => tadbirkor, biznes tashkil qiluvchi, yangi biznes boshlovchi
entrepreneurship (n) => tadbirkorlik, biznes tashkil etish faoliyati
entrepreneurial (adj) => tadbirkorlikka oid, tadbirkorona
entrepreneurially (adv) => tadbirkorona tarzda

mainly => asosan, ko‘pincha, ayniqsa asosiy qismi

labour => mehnat, ishchi kuchi

corridor (n) => yo‘lak, koridor

employee (n) => xodim, ishchi, yollanma xodim
employer (n) => ish beruvchi
employment (n) => bandlik, ish bilan ta’minlanganlik, ish, bandlik, ishga yollash
unemployment (n) => ishsizlik
employed (adj) => ish bilan band, ishlayotgan
unemployed (adj) => ishsiz

taxation => soliqqa tortish, soliq solish tizimi.

mobility => harakatchanlik, ko‘chib yurish imkoniyati, harakatlanish qobiliyati.

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

influencer => ta’sir o‘tkazuvchi shaxs, ayniqsa ijtimoiy tarmoqlarda ko‘p odamlarning fikri yoki xarid qaroriga ta’sir qiladigan odam.

scary => qo‘rqinchli, qo‘rquv uyg‘otadigan. (adv)

structured => tuzilgan, tartibga solingan, tizimli.

representative => vakil

relocate => ko‘chib o‘tmoq, boshqa joyga ko‘chirmoq.

relocation => ko‘chib o‘tish / joyini o‘zgartirish (noun)

rudimentary => oddiy, sodda, boshlang‘ich darajadagi, mukammal rivojlanmagan

passionate => ishtiyoqli, juda qiziqqan, ehtirosli

literally => so’zma-so’z, aynan, haqiqatan ham

excitement => hayajon, jo‘shqinlik, xursand hayajon

specifically => aynan, aniqrog‘i, xususan, maxsus ravishda 

interact => o‘zaro muloqot qilmoq, aloqada bo‘lmoq, o‘zaro ta’sirlashmoq

eloboration (n) => batafsil tushuntirish, kengaytirilgan izoh, tafsilotlar bilan bayon qilish
eloborate (v) => batafsil tushuntirmoq, kengroq izohlamoq, tafsilotlarni qo'shib tushuntirmoq
eloborative (adj) => batafsil tushuntiruvchi, tafsilotlarni kengaytiruvchi

relevant => tegishli, aloqador, mavzuga

reduce => kamaytirmoq, qisqartirmoq, pasaytirmoq

grab => olib olmoq / tezda olmoq; ushlamoq

drawback (n) => kamchilik, salbiy tomon, noqulay jihat

ergonomically => foydalanish qulayligi nuqtai nazaridan, qulay tarzda

ergonomic => inson foydalanishi uchun qulay qilib ishlab chiqilgan

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

observe => kuzatmoq, kuzatib ko‘rmoq, payqamoq

precise => aniq, aniq-ravshan, batafsil va xatosiz 

notable => e’tiborga molik, mashhur, ajralib turadigan

underlie (v) => asosida yotmoq, negizini tashkil qilmoq, sabab bo'lmoq
underlying (adj) => asosiy, negizidagi, tagida yotgan, yashirin yoki asosiy sabab bo'lgan

evaluate => baholamoq / qiymatini aniqlamoq

evaluation => baholash / qiymatini aniqlash jarayoni

evaluated => baholangan / qiymati aniqlangan

impurity => aralashma, ifloslik, nopoklik.

coincidence (n) => tasodif, tasodifan bir xil yoki ustma-ust kelish, tasodifiy mos kelish
coincidental (adj) => tasodifiy, tasodifan yuz bergan, tasodifan bir-biriga mos kelgan
coincidentally (adv) => tasodifan, tasodifiy ravishda

compliment (n) => maqtov, yaxshi gap, iltifot
compliment (v) => maqtamoq, iltifot bildirmoq
complimentary (adj) => maqtov bildiruvchi, maqtov tarzidagi, bepul, tekin
complimentarily (adv) => maqtov tarzida

monument => yodgorlik, haykal, monument

memorial => xotira yodgorligi / xotira majmuasi

religion => din, diniy e’tiqod

coherence (n) => izchillik, mantiqiy bog‘liqlik, yaxlitlik
coherent (adj) => izchil, mantiqan bog'langan, yaxlit
coherently (adv) => izchil tarzda, mantiqan bog'langan holda

slightly => biroz, ozgina, sal

suffering => azob, iztirob

spirit => kontekstga qarab ruh / ruhiyat / kayfiyat / ruhiy kuch.

snuggling => quchoqlashib yotish / mehr bilan bag‘riga bosib o‘tirish

beauty (n) => go'zallik, chiroy
beautification (n) => obodonlashtirish, bezatish, chiroyli qilish
beautifulness (n) => chiroylilik, go'zallik
beautify (v) => chiroyli qilmoq, bezamoq
beautiful (adj) => chiroyli, go'zal
beautifully (adv) => chiroyli tarzda , go‘zal tarzda, juda chiroyli qilib

makeup => pardoz vositalari / kosmetika / bo‘yanish

practical => amaliy / kerakli

teen => o‘smir, odatda 13–19 yoshdagi odam.

frustrate => hafsalasini pir qilmoq / asabini buzmoq / ranjitmoq

elevation (n) => ko'tarish, balandlik, yuksaltirish
elevate (v) => ko'tarmoq, yuqoriga ko'tarmoq, oshirmoq, yuqori darajaga olib chiqmoq
elevated (adj) => yuqori, ko'tarilgan, baland
elevatedly (adv) => yuqori tarzda

presently => hozir / ayni paytda / hozirda

identification => shaxsni tasdiqlovchi hujjat / shaxsni aniqlash.

examiner => imtihon oluvchi / imtihon tekshiruvchisi.

candidate (n) => nomzod, lavozimga yoki ishga yoki saylovga davogar
candidacy (n) => nomzodlik, nomzod bo'lish holati

equalizer => tenglashtiruvchi / muvozanatlashtiruvchi.

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

haircut => soch turmagi / soch oldirish

outfit => kiyim-kechak to‘plami / kiyinish uslubi

bless (v) => duo qilmoq, Xudoning marhamatini tilamoq

halfway => yarim-yorti / chala

sore => og‘rigan, og‘riqli, achishgan

like this => shunday tarzda, bunday qilib

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

surprise => syurpriz, kutilmagan sovg‘a

grotty => iflos, kir, xarob, yoqimsiz

upstairs (n) => yuqori qavat
upstairs (adj) => yuqori qavatdagi

flatmate => bir kvartirada birga yashaydigan odam, kvartiradosh

spoonful => bir qoshiq (miqdorida)

sharp => aniq, aynan; o‘tkir; keskin

appointment (n) => uchrashuv, belgilangan qabul, tayinlash
appointee (n) => tayinlangan shaxs, lavozimga tayinlangan odam
appoint (v) => tayinlamoq, belgilamoq, lavozimga tayinlamoq
appointive (adj) => tayinlashga oid, tayinlash orqali amalga oshiriladigan
appointed (adj) => tayinlangan, belgilangan

marvelous => ajoyib, zo‘r, juda yaxshi, hayratlanarli

let someone down => kimnidir hafsalasini pir qilmoq, umidini oqlamaslik.

launch => ishga tushirmoq, boshlamoq

rationale => sabab, asos, mantiqiy izoh

glory => shon-sharaf, ulug‘vorlik, sharaf.

nightmare => dahshatli tush, qo‘rqinchli tus

forgive => kechirmoq, afv etmoq.

valet (n) => shaxsiy xizmatkor (odatda erkak), boy yoki yuqori martabali erkakka kiyinish yoki shaxsiy buyumlari va kundalik ishlarida xizmat qiladigan erkak, mehmonxona yoki restoran va shunga o'xshash joylarda mijozning mashinasini qabul qilib parkovka qilib beradigan xodim

buddy (n) => do‘stim, og‘ayni, jo'ra, o'rtoq
buddy (v) => do'stlashmoq, do'st bo'lmoq

precious => qimmatli, bebaho, aziz.

gorgeous => juda chiroyli, go‘zal, ko‘rkam, ajoyib.

audacity (n) => surbetlik, betlik, haddan oshish, o'ta dadillik, kutilmagan jasorat
audaciousness (n) => surbetlik, haddan tashqari dadillik, 
audacious (adj) => surbet, beti qalin, haddan tashqari dadil, jasur, dadil
audaciously (adv) => surbetlarcha, haddan tashqari dadillik bilan, dadil tarzda

infuriated => juda qattiq g‘azablangan, jahli chiqqan, qattiq achchiqlangan.

madly => telbalarcha, juda qattiq, haddan tashqari.

brazenness (n) => surbetlik, uyatsizlik, betakalluflik, haddidan oshish
brazen (v) => betga choparlik qilmoq, dadil va uyatsizlarcha qarshi turmoq
brazen (adj) => surbet, uyatsiz, betakalluf, haddidan oshgan
brazenly (adv) => surbetlarcha, uyatsizlarcha, ochiqchasiga va betakalluf tarzda

provoking => qo‘zg‘atish, jahlini chiqarish, g‘ashiga tegish

drunkenness (n) => mastlik, ichkilikbozlik holati
drunk (n) => mast odam, ichib mast bo'lgan odam
drunk (adj) => mast, ichimlikdan mast bo'lgan

pestered => bezovta qilishdi, tinchlik bermadilar

splendid => ajoyib, zo‘r, juda yaxshi

deception (n) => aldov, firib, yolg'on yo'l bilan chalg'itish
deceiver (n) => firbgar, aldamchi odam
deceive (v) => aldamoq, yanglishtirmoq, aldov bilan chalg'itmoq
deceptive (adj) => aldamchi, chalg'ituvchi, noto'g'ri tasavvur uyg'otadigan
deceptively (adv) => aldamchi tarzda, chalg'ituvchi tarzda

greeting => salomlashish, salom, tabrik 

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

gallop (v) => chopmoq (otning chopishi)
gallop (n) => chopish, otning chopishi

homies => norasmiy so‘z, yaqin do‘stlar / og‘aynilar / ulfatlar 

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

mandatory => majburiy, shart bo‘lgan, albatta bajarilishi kerak bo‘lgan 

bilingualism (n) => ikki tillilik, ikki tilni bilish va ishlatish holati
bilingual (n) => ikki tilda gapira oladigan odam, ikki tilli kishi
bilingual (adj) => ikki tilli, ikki tilda gapira oladigan, ikki tilda ishlatiladigan
bilingually (adv) => ikki tilda, ikki tilli tarzda

prior => oldingi / avvalgi / oldin

estate => mulk / ko‘chmas mulk / yer-mulk

obtain => olmoq, qo‘lga kiritmoq, ega bo‘lmoq

invoke => chaqirmoq, ishga tushirmoq

once => bir marta; bir paytlar; ...gach / ...dan so‘ng

exotic => noodatiy, g‘ayrioddiy, ekzotik, begona

specify => aniq ko‘rsatmoq, belgilamoq

invocation => chaqirish / ishga tushirish

within (n) => ichki qism
within (adv) => ichkarida, ichida

power (n) => ...

provide => ta’minlamoq, bermoq, taqdim etmoq

temporarily => vaqtincha, muvaqqat ravishda

towards => tomon, sari, yo‘nalishida

reproducibility => qayta tiklanish imkoniyati, qayta aynan takrorlash mumkinligi

reproducible => qayta takrorlash mumkin bo‘lgan, qayta aynan yaratish mumkin bo‘lgan.

identical => aynan bir xil, mutlaqo bir xil, bir-biridan farq qilmaydigan.

familiarity => tanishlik, tanish bo‘lish darajasi, biror narsani yaxshi bilish.

produce => ishlab chiqarmoq / hosil qilmoq / yaratmoq

partially => qisman, to‘liq emas

altogether (adv) => umuman, butunlay, to'liq ravishda
altogether (adv) => jami, hammasini qo'shib hisoblaganda
altogether (adv) => umuman olganda, bir butun holda

festive => bayramona, bayramga oid, tantanali

vast (n) => bepayon kenglik
vast (adj) => keng, ulkan, juda katta, bepoyon
vastly (adv) => ancha, juda katta darajada

trifle (n) => arzimas narsa, ahamiyatsiz narsa, mayda-chuyda
trifle (v) => arzimas deb hisoblamoq, yengil qaramoq
trifling (adj) => arzimas, ahamiyatsiz, mayda-chuyda
trifingly (adv) => arzimas tarzda, ahamiyatsiz tarzda

okay => kontekstga qarab “xo‘p”, “mayli”, “yaxshi”, “bo‘ldi”

yacht (n) => yaxta, hashamatli qayiq yoki kema
yacht (v) => yaxtada sayohat qilmoq, yaxtada suzmoq
yachtsman (n) => yaxtachi, yaxtada suzuvchi erkak
yachtswooman (n) => yaxtachi, yaxtada suzuvchi ayol

offend => xafa qilmoq, ranjitmoq, haqorat qilmoq
offended => xafa bo‘lgan, ranjigan

quarreling => janjallashish, tortishish

chatterbox (n) => ko‘p gapiradigan odam, gapdon, sergap odam (hazilona)
chatter (n) => valdirash, mayda-chuyda gaplar 
chatterer (n) => sergap odam, ko'p gapiruvchi (neytralroq )
chatter (v) => valdiramoq, mayda-chuyda gaplashmoq, sergaplik qilmoq

sweetheart => azizim, jonim, sevgilim 

pursuit => ta’qib qilish, quvish, izlash, intilish.

stubborn => o‘jar, qaysar

salvation => najot, qutqarilish

sacrifice => qurbon qilmoq, voz kechmoq, fidoyilik qilmoq.

resist => qarshilik qilmoq, bo‘ysunmaslik

scraps => qolgan-qutgan narsalar, arzimas qoldiqlar

fuss => ortiqcha tashvishlanmoq, shovqin-suron qilmoq, mayda narsaga ko‘p e’tibor bermoq

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


insane => aqldan ozgan, telba

impertinent => surbet, behayo, odobsiz, hurmatsiz

spout => ko‘p yoki bema’ni gaplarni gapirmoq, valdiramoq

flirting => noz-karashma qilish, romantik tarzda gaplashish|

slap => shapaloq, tarsaki

jealous => rashkchi / rashk qilayotgan

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

freak => g‘alati odam, noodatiy odam; haqorat sifatida “g‘alati maxluq” kabi ishlatilishi mumkin.

idiot => ahmoq, tentak, esi past odam.

pathetic => ayanchli, juda yomon, xarob

tangled => chirmashib/qaltashib qolgan

bruise (n) => ko‘karish, lat yeyishdan hosil bo'lgan ko'karma
bruise (v) => ko'karmoq, lat yemoq, ko'kartirmoq
bruised (adj) => ko'kargan, lat yegan
bruiser (n) => baquvvat, mushtlashuvchan odam, kuchli zarba beruvchi odamb


flustered => sarosimaga tushgan, hayajonlangan, dovdiragan

startle someone => kimnidir to‘satdan cho‘chitib yubormoq.

fall => yiqilmoq, tushmoq 

drown (v) => cho'kib ketmoq, suvga cho'ktirmoq
drowner (n) => boshqa odamni yoki jonivorni suvga cho'ktiruvchi shaxs

sand => silliqlamoq, zımpara qilmoq

hull => kema korpusi

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

to reduce => kamaytirish uchun

exemplary => o‘rnak bo‘ladigan, namunali, a’lo darajadagi.

idealist => idealist, orzuga berilgan, idealga intiluvchi odam.

narrowly => arang, zo‘rg‘a, sal qolsa.

anew (adv) => yangidan, qaytadan, boshqatdan

moldy => mog‘orlagan, mog‘or bosgan

throat => tomoq

relieve => yengillashtirmoq, xalos qilmoq, og‘riqni kamaytirmoq.

commute (n) => ishga yoki o'qishga borib kelish, muntazam qatnov
commuter (n) => ishga yoki o'qishga borib keladigan odam, qatnovchi
commute (v) => uy bilan ish yoki o'qish joyi o'rtasida muntazam borib-kelish

croissants (n) => krussanlar

mearby => yaqin, yaqin atrofda

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

stamina => chidamlilik, bardoshlilik, uzoq vaqt kuchni saqlash qobiliyati

the steering wheel => rul

nightmare => kabus, qo‘rqinchli tush

obtaining => olish, qo‘lga kiritish, ega bo‘lish 

throughout => davomida, butun davomida, mobaynida 

business (n) => ish, biznes, tijorat, korxona
busyness (n) => bandlik, ish bilan band bo'lish holati
busy (adj) => band, gavjum, odam ko'p, ish bilan band, serqatnov
busily (adv) => band holda, faol tarzda

stuff => kontekstga qarab narsalar, buyumlar, ishlar 

situations => vaziyatlar, holatlar 

organized => tartibli, uyushgan, ishlarini reja asosida qiladigan 

discovery (n) => kashfiyot, topilma, yangi narsani aniqlash
discoverer (n) => kashfiyotchi, biror narsani kashf qilgan yoki topgan shaxs
discover (v) => kashf etmoq, topmoq, bilib olmoq, aniqlamoq
discoverable (adj) => aniqlash yoki topish mumkin bo'lgan

recognize => tanimoq, anglamoq, tushunib yetmoq, tan olmoq, e'tirof etmoq

subset => qism to'plam, bir to'plamning ichidagi to'plam

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

individual (noun) => shaxs, alohida inson, odam

individual (adj) => alohida, individual

collaboration (n) => hamkorlik, birgalikda ishlash, o'zaro hamkorlik
collaborate (v) => hamkorlik qilmoq
collaborative (adj) => hamkorlikka asoslangan
collaborator (n) => hamkor

flex (v) => egmoq, bukmoq

flexible (adj) => moslashuvchan
flexibility (n) => moslashuvchanlik 

scale (n) => masshtab 
scale (v) => masshtablamoq
scalable (adj) => masshtablanadigan
scalibility (n) => masshtablanish qobiliyati

notably (adv) => ayniqsa, xususan, e'tiborga molik tarzda, alohida ta'kidlash joizki

safeguard (v) => himoya qilmoq, muhofaza qilmoq, xavfsizligini ta'minlamoq
safeguard (n) => himoya chorasi, xavfsizlik chorasi

paramount (adj) => eng muhim, birinchi darajali, nihoyatda muhim, ustuvor 

integrity (n) => halollik, yaxlitlik, buzilmaganlik

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

operational (adj) => ishlayotgan, faol, ish holatidagi
operate (v) => ishlamoq, boshqarmoq
operation (n) => operatsiya

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

maintenance (n) => texnik xizmat, saqlash, xizmat ko'rsatish
maintain (v) => saqlab turmoq

hesitate => ikkilanmoq, tortinmoq, jurat qilolmay turmoq

ambiguity (n) => noaniqlik, ikki ma'nolilik, turlicha talqin qilish imkoniyati
disambiguation (n) => noaniqlikni bartaraf etish, ma'nosini aniqlashtirish
disambiguate (v) => noaniqlikni bartaraf etmoq, aniq ma'nosini belgilamoq
ambiguous (adj) => noaniq, ikki xil ma'noga ega, bir nechta talqinga ega, tushunarsiz
disambiguated (adj) => ma'nosi aniqlashtirilgan, noaniqligi bartaraf etilgan
ambiguously (adv) => noaniq tarzda, ikki ma'noli tarzda, turlicha talqin qilinadigan tarzda

teammate => jamoadosh, bir jamoada ishlaydigan yoki o'ynaydigan odam

mate => sherik, hamroh

colleague (n) => hamkasb (bir tashkilot yoki sohada ishlaydigan odam)
ccoworker (n) => hamkasb, birga ishlaydigan odam (bir ish joyida ishlaydigan odam)

roommate => bir xonada yashaydigan odam (xonadosh)

schoolmate => maktabdosh

sure. => Mayli. / Albatta. (Oddiy rozilik yoki "ha" deyish uchun ishlatiladi.)

sounds good. => Yaxshi ekan. / Menga ma'qul. (Taklif, reja yoki g‘oyani ma'qullash uchun ishlatiladi.)

better (n) => yaxshiroq natija yoki holat, yaxshilanish
better (v) => yaxshilamoq, yaxshiroq qilmoq
better (adj) => yaxshiroq, ma'qulroq
better (adv) => yaxshiroq, yaxshiroq tarzda

suggest => taklif qilmoq

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

listed => sanab o'tilgan

enclosure (n) => ilova qilingan hujjat yoki narsa
enclose (v) => ichiga solmoq, qo'shib yubormoq, o'rab yoki qamrab olmoq
enclosed (adj) => ichiga solingan, ilova qilingan, o'ralgan, yopiq

honest => Rostdan ham

ham (noun) => rolini bo'rttirib o'ynaydigan aktyor yoki odam 

to ham => bo'rttirib o'ynamoq, bo'rttirib harakat qilmoq

lap (noun) => aylana (poygada krug)
lap (verb) => yalamoq
lap (noun) => tizzaning ustki qismi (o'tirganda bel va tizza orasidagi qism)

tissue => salfetka, ro'molcha

reserve => bron qilmoq (formal)
reservation => bron qilingan joy

book (n) => kitob, daftar yoki jurnal, kitoblar ro'yxati yoki hisob-kitob yozuvlari
booker (n) => bron qiluvchi shaxs, bron qilihs bilan shug'ullanuvchi shaxs
booking (n) => bron qilish jarayoni, bron
bookstore (n) => kitob do'kon (🇺🇸)
bookshop (n) => kitob do'koni (🇺🇸)
book (v) => bron qilmoq, oldindan joy yoki bilat yoki xona ajratmoq
booked (adj) => bron qilingan, band qilingan
bookable (adj) => bron qilish mumkin bo'lgan

foreword => so'zboshi, kirish so'zi, muqaddima

audience (n) => auditoriya, tomoshabin, tinglovchi
audient (n) => tinlovchi, auditoriya a'zosi
audienced (adj) => auditoriya oldida namoyish etilgan

intrigue => qiziqtirmoq, hayratga solmoq, qiziqish uyg'otmoq
intrigued (adj) => qiziqib qolgan, qiziqishi uyg'ongan

quickly (adv) => tezda, tez

accomplishment (n) => yutuq, muvaffaqiyat, erishilgan natija, bajarilgan ish
accomplisher (n) => bajaruvchi, amalga oshiruvchi
accomplish (v) => bajarib tugatmoq, amalga oshirmoq, muvaffaqiyatli uddalamoq, erishmoq
accomplishable (adj) => amalga oshirish mumkin bo'lgan, bajarish mumkin bo'lgan
accomplished (adj) => mohir, yetuk, yuqori malakali, amalga oshirilgan, bajarilgan
accomplishedly (adv) => mohirona, yuqori mahorat bilan

stealth (noun) => sezdirmasdan harakat qilish, yashirinlik, maxfiylik
stealthy (adj) => yashirin, sezilmaydigan

aircraft (n) => havo kemasi, uchish apparati, havoda uchadigan transport vositasi
aircraftman (n) => aviatsiya xodimi, havo kemasi bilan ishlovchi shaxs
aircraft carrier (n) => aviatashuvchi kema

morph => asta-sekin boshqa shaklga yoki holatga o'zgarmoq, aylanmoq, transformatsiyalanmoq, shaklini o'zgartirmoq

relegate => biror narsani yoki odamni pastroq mavqega tushirmoq, ikkinchi darajaga surmoq, chetga surib qo'ymoq, kamroq muhim holatga o'tkazmoq.

to suit => mos kelmoq, to'g'ri kelmoq, ma'qul bo'lmoq

need (birlik) => ehtiyoj

needs (ko'plik) => ehtiyojlar

gradually (adv) => asta-sekin, bosqichma-bosqich, sekinlik bilan
gradual (adj) => asta-sekin sodir bo'ladigan

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

matter => masala, muammo, mavzu

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

honestly => rostini aytsam

maybe => balki ehtimol

sure => ishonchim komil

answer (n) => javob, yechim
answer (v) => javob bermoq, javob qaytarmoq
answerable (adj) => javob berish mumkin bo'lgan, javob talab qiladigan
answerably (adv) => javob berish mumkin bo'lgan tarzda
answerer (n) => javob beruvchi, javob qaytaruvchi
answered (adj) => javob berilgan, hal qilingan
answerphone (n) => avtomatik javob beruvchi telefon qurilmasi, telefon xabarini yozib oluvchi qurilma

moment => lahza

diet (n) => ovqatlanish tartibi, odatiy ratsion, dieta, parhez
dieter (n) => dieta saqlovchi kishi
dietitian / dietician (n) => dietolog, ovqatlanish bo'yicha mutaxassis
dietetics (n) => dietologiya, ovqatlanish ilmi
diet (v) => dieta saqlamoq, ovqatlanishni cheklamoq
diet (adj) => dietali, kaloriyasi kam

slowly => asta-sekin, sekinlik bilan

rope => arqon

stamp => pechat

handbag => qo’l sumka

reflection => aks, ko’rinish

insurance => sug'urta

chaos (n) => tartibsizlik, betartiblik, boshboshdoqlik
chaotic (adj) => tartibsiz, betartib, boshboshdoq
chaotically (adv) => tartibsiz tarzda, betartib ravishda

luggagge => bagaj

sadness => qayg'u holati, xafalik, g'amginlik

happiness => baxt, xursandchilik, baxtiyorlik

litter = rubbish => axlat, chiqindi

research => tadqiqot, ilmiy izlanish

knowledge => bilim

arrangement (n) => tartib, kelishuv, kelishib olingan reja, tashkil etish, joylashtirish
arranger (n) => tashkil qiluvchi, tartibga soluvchi, aranjirovkachi
arrange (v) => tartibga solmoq, tashkil qilmoq, kelishib olmoq, joylashtirmoq
arranged (adj) => tartibga solingan, tashkil qilingan, kelishilgan
arrangeable (adj) => tartibga solish mumkin bo'lgan, kelishish mumkin bo'lgan

guess => taxmin qilmoq

translation (n) => tarjima
translator (n) => tarjimon
translate (v) => tarjima qilmoq
translatable (adj) => tarjima qilish mumkin bo'lgan
untranslated (adj) => tarjima qilinmagan

explain => tushuntirmoq

repeat => takrorlamoq
repetition => takrorlash, qayta-qayta qilish

pronounce => talaffuz qilmoq
pronouncation => talaffuz

have a chat => suhbatlashmoq (informal)

conversation (n) => suhbat, gaplashuv
conversationalist (n) => suhbatdosh, suhbatni yaxshi olib boruvchi odam
converse (v) => suhbatlashmoq, gaplashmoq
conversational (adj) => so'zlashuv uslubidag, suhbatga oid
conversant (adj) => xabardor, yaxshi biladigan
conversationally (adv) => suhbat uslubida, oddiy so'zlashuv tarzida

origin => kelib chiqish, asl kelib chiqishi

supply (v) => ta'minlamoq
supply (n) => ta'minot, zaxira, yetkazib berish

tip => maslahat

identify => aniqlamoq

preposition => predlog

particular => ma'lum bir

everyday => kunlik, kundalik

vocabulary (n) => so'z boyligi (Insonning biladigan so'zlari), lug'at (ma'lum til yoki mavzudagi so'zlar)
vocabularian (n) => lug'at tuzuvchi

fancy (v) => yoqtirmoq

fancy (adj) => noodatiy, o'zgacha, chiroyli, hashamatli

bill (n) => hisob, to'lov qog'ozi, qonun loyihasi, banknota, qog'oz pul, qush tumshug'i
bill (v) => hisob chiqarmoq, hisob taqdim qilmoq, pul undirmoq

parcel => posilka, jo'natma

penpals => xat yozishib turadigan do'stlar

landlady => uyini yoki kvartirasini ijaraga beradigan ayol

tough => qattiq, kuchli, chidamli, qo'rqmas

guy => yigit, erkak, odam

babe (n) => azizim, jonim, sevgilim, chaqaloq, go'dak, juda yosh bola
babes (n) => babening ko'pligi: chaqaloqlar, go'daklar, jonlarim, azizlarim, jozibali qizlar yoki ayollar
baby (n) => chaqaloq, go'dak, jonim, azizim
baby (v) => erkalatmoq, haddan tashqari parvarish qilmoq
babied (adj) => erkalatib yuborilgan, ortiqcha g'amxo'rlik qilingan
babyish (adj) => bolalarcha, go'daklarcha, yetuk emasdek
babylike (adj) => bolaga o'xshash, go'daklardek

fascinating => juda qiziqarli, maftunkor, o'ziga tortadigan

durability (n) => chidamlilik, mustahkamlik, uzoq xizmat qilish xususiyati
durble (adj) => chidamli, mustahkam, uzoq xizmat qiladigan
durably (adv) => chidamli tarzda, uzoq muddat xizmat qiladigan tarzda

caravan (n) => g'ildirakli kichik uy, ko'chma uy, tirkama uy
caravanning (n) => karavanda sayohat qilish yoki yasash
caravan (n) => karvon, transport vositalari kolonnasi, bir yo'nalishda birga ketayotgan mashinalar guruhi
caravan (v) => karvonda sayohat qilmoq, guruh bo'lib harakatlanmoq

exotic => ekzotik, chet mamlakatlarga xos

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

moustache or mustache => mo'ylov

award (n) => mukofot, sovrin, taqdirlash
awardee (n) => mukofot oluvchi, mukofot bilan taqdirlangan shaxs
award (v) => mukofotlamoq, taqdirlamoq, mukofot bilan taqdirlamoq
award-winning (adj) => mukofotga sazovor bo'lgan, mukofot olgan
awarded (adj) => mukofotlangan, taqdirlangan

greengrocer => meva va sabzavot sotuvchi

piggy bank => tanga qutisi

jar => shisha idish

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

fasten => mahkamlamoq, bog'lamoq, taqmoq, qadamoq

excited => hayajonlangan, intiq bo'lgan

rob => talamoq, qurolli bosqinchilik qilib o'g'irlamoq

species => tur, nav

somersault => salto

parallel bars => parallel turnik

borrow (v) => qarzga olmoq, vatincha olib turmoq
borrower (n) => qarz oluvchi, qarzga oladigan shaxs

swan => oqqush

hippo | hippopotamus => begemot

heat => issiqlik

note => kubyura, banknota

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

flour => un

wood (n) => o'rmon
woodland (n) => o'rmonzor, o'rmonli hudud
woodwork (n) => yog'ochdan yasalgan buyumlar, duradgorlik
woodworker (n) => duradgor, yog'och ustasi
woodcutter (n) => o'tinchi, daraxt kesuvchi
woodpecker (n) => qizilishton
wooden (adj) => yog'ochdan yasalagan, tarang, jonsiz
woody (adj) => yog'ochsimon, daraxtli, o'rmonli

hair => soch, soch tolasi

overcome => yengmoq, yengib o'tmoq


iron => temir

iron => dazmol

paper => qog'oz

paper => gazeta

little => kichkina

soap => sovun

soup => sho'rva

wharf (v) => kemani pristanga yaqinlashtirmoq, pristanda saqlamoq
wharf (n) => pristan, kema to'xtaydigan joy, iskala
wharfage (n) => pristan haqi (kema to'xtash uchun to'lov), pristan inshootlari
wharfinger (n) => pristan egasi yoki boshqaruvchisi

sheaf => bog'lam (Masalan: bug'doylar bog'lami)

elf (n) => elf, ertak va afsonalardagi kichkina sehrli mavjudot

loaf => non bo'lagi

dwarf (n) => mitti odam, pakana odam, mitti mavjudot
dwarf (v) => ancha kichik ko'rsatmoq, kichraytirib qo'ymoq, yonida juda kichik qilib ko'rsatmoq
dwarfish (adj) => mittiga o'xshash, mitti

reef => dengizdagi marjon toshlar yoki suv ostidagi toshlar)

chief (n) => boshliq, rahbar, boshliq lavozimidagi shaxs
chieftain (n) => qabila boshlig'i, qabila rahbari
chief (adj) => asosiy, bosh, eng muhim
chiefly (adv) => asosan, eng avvalo

chef (n) => oshpaz, professional oshpaz (plural: chefs)

handkerchief => ro'molcha

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

fungus => zamburug', qo'ziqorin turidagi organizm

focus (n) => diqqat, e'tibor

nucleus => markaz, asosiy qism, yadro

crisis (n) => inqiroz, tang vaziyat, og'ir vaziyat (plural: crises)
crisis-ridden (adj) => inqirozga duchor bo'lgan, inqirozlar girdobidagi
crisis-prone (adj) => inqirozga moyil, tez-tez inqirozga uchraydigan

prone (adj) => moyil, duchor bo'lishga moyil
proneness (n) => moyillik, biror holatga moyil bo'lish

thesis => dissertatsiya

baselessness (n) => asossizlik, dalilsizlik
basis (n) => negiz, asos, tayanch (plural: bases)
basic (adj) => asosiy, boshlang'ich, oddiy
baseless (adj) => asossiz, dalilsiz
baselessly (adv) => asossiz ravishda, dalilsiz tarzda
basically (adv) => asosan, umuman olganda, mohiytan

oasis => voha

diagnosis (n) => tashxis, muammo sababini aniqlash
misdiagnosis (n) => noto'g'ri tashxis
diagnostics (n) => diagnostika, tekshiruv usullari majmuasi
diagnostician (n) => tashxis qo'yuvchi mutaxassis
diagnose (v) => tashxis qo'ymoq, muammo sababini aniqlamoq
misdiagnose (v) => noto'g'ri tashxis qo'ymoq
diagnosable (adj) => tashxis qo'yish mumkin bo'lgan
undiagnosed (adj) => tashxis qo'yilmagan
diagnostically (adv) => diagnostik jihatdan, tashxis nuqtai nazaridan

hypothesis => gipoteza

synthesis => sintez

phenomenon => hodisa

phenomena => hodisalar

medium => vosita

media => vositalar

backterium (n) => bakteriya (plural: backteria)
backterial (adj) => bakterial, bakteriyaga oid

datum (n) => ma'lumot, ma'lumot birligi, bitta fakt (plural: data)

index => ko'rsatkich 

indices => ko'rsatkichlar

herbivore => o'txo'r

carnivore (n) => go'shtxo'r hayvon
carnivorous (adj) => go'shtxo'r, go'sh bilan oziqlanadigan

omnivore ()=> hamma narsani yeydigan

herbivorous (adj) => o'txo'r


omnivorous (adj) => hamma narsani yeydigan

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

struggle => kurashmoq, yoqalashmoq

relive => qayta boshdan kechirmoq

govern => boshqarmoq, idora qilmoq

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

susceptibility => moyillik, ta'sirga beriluvchanlik

vulnerability (n) => zaiflik, himoyasizlik, tizimdagi zaif nuqta yoki teshik
invulnerability (n) => daxlsizlik, zarar yetkazib bo'lmaslik
vulnerable (adj) => zaif, himoyasiz, zarar ko'rishi oson
invulnerable (adj) => daxlsiz, zarar yetmaydigan
vulnerably (adv) => himoyasiz holda

sensivity => sezgirlik

openness => ochiqlik, ta'sirga ochiq bo'lish

liability => moyillik (salbiy ma'noda)

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

the last part => oxirgi qism, so'ngi qism

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

naunce (n) => nozik jihat, juda kichik farq

staff => xodimlar guruhi, ishchilar

healthily (adv) => sog'lom tarzda, sog'lom holda

healthy (adj) => sog'lom

health (n) => sog'lik

improve => yaxshilamoq, yaxshilanmoq
improve => yaxshilamoq

also (adv) => ham, yana, shuningdek, bundan tashqari

nearly => deyarli, qariyb

fate => taqdir

fade away => yo'qolib ketmoq

fold => ayb

kindness => mehribonchilik

looker-on => qarab turuvchi odam

father-in-law => qaynota

class (n) => dars, sinf, mashg'ulot, guruh
classroom (n) => sinfxona
classmate (n) => sinfdosh, guruhdosh
classwork (n) => sinfda bajariladigan ish, darsdagi topshiriq

brush (n) => cho'tka, mo'yqalam, taroqsimon cho'tka
brusher (n) => cho'tkalovchi, cho'tka bilan tozolovchi
brush (v) => cho'tkalamoq, tozalamoq, yengil tegib o'tib ketmoq
brushed (adj) => cho'tkalangan, tozalangan

dynamo (n) => dinamo, elektr energiyasi ishlab chiqaruvchi generator

fly (n) => pashsha
fly (v) => uchmoq

lady => xonim

leaf => barg

thief => o'g'ri 

self => o'zi

giraffe => jirafa

cliff (n) => tik qoyatosh, tik qoya, jarlik
cliffside (n) => qoya yonbag'ri, jarlik cheti
clifftop (n) => qoya tepasi
cliffhanger (n) => voqeaning eng qiziq joyida tugashi, keyingi qismni kutishga majbur qiladigan holat

ox => buqa

oxen => buqalar

louse => bit (sochda yashaydigan)

species => tur, nav

offspring => ... ni bolasi

sunny => charag'on

no longer => ortiq

means => vosita, qurilmaga (asosan transport vositalari bilan keladi)

mean => o'rtacha

ethics => etikashunoslik

diabetes (n) => diabet, qand kasalligi
diabetic (n) => diabet bilan kasallangan kishi
diabetologist (n) => diabetolog, diabet bo'yicha shifokor

plier => ombir

binoculars (n) => durbin

teenager => o'smir (13-17 age)

adult (n) => voyaga yetgan odam, katta yoshli inson, katta odam
adulthood (n) => voyaga yetganlik, katta yosh davri
adultness (n) => kattalikka xoslik, voyaga yetganlik xususiyati
adult (adj) => voyaga yetgan, katta yoshli, kattalarga oid
adultlike (adj) => kattalarga o'xshash, kattalarcha

teenagers => o'smirlar

keen (adj) => o'tkir

keen to do something => juda xohlamoq, ishtiyoq bilan qilish

keen on something => qiziqqan, juda xohlaydigan

relationship => munosabat, aloqa

go out => tashqariga chiqmoq

learn to share => bo'lishishni o'rgan

summary => xulosa, qisqacha mazmun

gap => bo'shliq

equip => ta'minlamoq

oversleep => uxlab qolmoq

spectator => tomoshabin

despiser (n) => nafratlanuvchi kishi
despise (v) => nafratlanmoq, juda yomon ko'rmoq, jirkanmoq
despicable (adj) => jirkanch, past, nafratga loyiq
despicably (adv) => jirkanch tarzda, pastkashlarcha

spite (n) => alam, yomon niyat, o'ch olish istagi, ichi qoralik, birovga yomonlik qilish istagi
spite (v) => o'ch olmoq, ataylab xava qilmoq, birovni xafa qilish uchun ataylab qarshi ish qilmoq
spiteful (adj) => alamzada, ichi qora, o'ch olishga moyil
spitefully (adv) => alam bilan, o'ch olish uchun

popular => hamma taniydi va hammaga birdek yoqadi  

famous => hamm taniydi va hamma ham yaxshi ko'rmaydi

standing still => qimirlamasdan turmoq

innocent => aybsiz

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

law => qonun

give a talk | speech => nutq so'zlamoq

pile => uyum

extremely => juda, nihoyatda

hand => qo'l bilan bermoq, uzatmoq

hold => ushlab turmoq

curve (n) => egri chiziq, egri shakl, burilish, qayrilish
curviness (n) => egrilik, egri-bugrilik, qomatdorlik
curvature (n) => egrilik, egilganlik darajasi
curve (v) => egilmoq, egmoq, qayrilmoq, burilmoq
curved (adj) => egri, egilgan, qayrilgan
curvy (adj) => egri-bugri, egri chiziqlarga ega, qomatdor

soccer (American English) => fudbol

football (British English) => fudbol

hall => yo'lak, katta zal

passage => tor yo'lak, o'tish, matndan parcha

even => hatto

sound (v) => tuyulmoq, eshitilmoq

sound (n) => suv / dengish chuqurligi, tovush / ovoz

sound (adj) => sog'lom, mustahkam

dirt (n) => tuproq, chang, kir, iflosliklar, mish-mish, sir-asrorlar
dirtiness (n) => kirlilik, ifloslik
dirty (v) => iflos qilmoq, kirlatmoq, obro'sini tushirmoq
dirty (adj) => iflos, kirli, odobsiz, uyatsiz, insofsiz, nopok
dirtly (adv) => iflos tarzda, nopoklik bilan, insofsizlik bilan

the rest of the gold => oltinning qolgan qismi

beat (n) => urish, zarba, ritm, marom, xizmat hududi yoki patrul hududi
beater (n) => uruvchi asbob yoki shaxs, ko'pirtirgich
beat (v) => yutmoq, urib turmoq, ko'pposlamoq, yengmoq, ritmik tarzda urmoq, aralashtirib yoki ko'pirtirib tayyorlamoq
beaten (adj) => urilgan, do'pposlangan, mag'lub bo'lgan
beatable (adj) => yengish mumkin bo'lgan
unbeatable (adj) => yengib bo'lmaydigan, tengsiz

reasonable => mantiqli, asosli, o'rtacha | maqbul

fair (adv) => ancha, yetarli daraja
fair (adj) => adolatli, halol, teng
fair (n) => yarmarka, ko'rgazma

form => hosil qilmoq, shakllantirmoq, yaratmoq

keep => davom etmoq, ushlab turmoq, saqlamoq


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

melt => erimoq, eritmoq

spicy => ziravorli, achchiq

spice => ziravor

hot => achchiq, issiq

pepper => qalampir

chili pepper => chili qalampiri
hot pepper => achchiq qalampir
black pepper => qora murch

glasses => ko'z oynak, ko'rish uchun taqiladigan ko'zoynak

sunglasses => quyosh ko'zoynagi

eyeglasses => ko'rish uchun taqiladigan ko'zoynak (rasmiy)

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

the elderyly => qarilar

the homeless => uysizlar

to whom => kimga

tank => bak

price tag => narx yozilgan label

offer => taklif

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

joy (n) => quvonch

happiness (n) => baxt
happy (adj) => baxtli
happier (adj, comparative) => yanada baxtli
happiest (adj, superlative) => eng baxtli
happily (adv) => xursand holda

humanization (American) => insoniylashtirish
humanisation (British) => insoniylashtirish

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

freedom => erkinlik

properly => to'g'ri

nationality => millat, fuqarolik

fortress => qal'a, mustahkam istehkom

gear lever, gear => skorost

gloom => qayg'u, g'amginlik, tushkunlik

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

knight => ritsar

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

gadget => texnika qurilmasi, asbob, jihoz

times => marta, ko'paytirish, davr/zamon

jogging => sekin yugurish, yengil yugurish

maths => Matematika (British)

math => Matematika (American)

now => hozir (umumiy)

hunger => ochlik (ot)

hungry => och (sifat)

boring (n) => zerikarli, qiziqarsiz
boredom (n) => zerikish, zerikarlilik
bore (v) => zeriktirmoq, zerikishiga sabab bo'lmoq
bored (adj) => zerikkan
boringly (adv) => zerikarli tarzda

surprising => hayratlanarli

surprised => hayratlangan

frightening => qo'rqinchli
frightened => qo'rqib ketgan

annoyance (n) => asabiylashish, bezovtalik, jig'iga tegish, bezovta qiluvchi narsa yoki shaxs
annoyedness (n) => asabiylashganlik, jahli chiqqanlik
annoyingness (n) => asabiylashtiruvchanlik, bezovta qiluvchanlik
annoy (v) => asabiylashtirmoq, jig'iga tegmoq, bezovta qilmoq
annoying (adj) => asabiylashtiradigan, jig'iga tegadigan, bezovta qiladigan
annoyed (adj) => jahli chiqqan, asabiylashgan, bezovta bo'lgan
annoyingly (adv) => asabiylashtiradigan tarzda, jig'iga tegadigan tarzda

tiring => charchatadigan
tired => charchagan

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

nowadays => shu kunlarda, hozirgi vaqtda

currency (n) => valyuta, pul birligi
current (n) => oqim, tok, yo'nalish yoki tendensiya
current (adj) => hozirgi, joriy, amaldagi
currently (adv) => hozirda, ayni paytda, hozirgi vaqtda

meaning => ma'no

seem => tuyulmoq, ko'rinmoq

appearance (n) => ko'rinish, tashqi ko'rinish, paydo bo'lish, chiqish
appearer (n) => paydo bo'luvchi, ko'rinuvchi
apparition (n) => sharpasimon ko'rinish, g'ayritabiiy mavjudotning ko'rinishi
appear (v) => ko'rinmoq, paydo bo'lmoq, namoyon bo'lmoq, tuyulmoq
apparent (adj) => ayon, ko'rinib turgan, ravshan, tuyuladigan
appeared (adj) => paydo bo'lgan, ko'ringan
apparently (adv) => aftidan, ko'rinishidan, chamasi

fur => yung, mo'yna

grocer => oziq-ovqat sotadigan odam

upcoming (adj) => yaqinlashib kelayotgan, bo'lib o'tishi kutilayotgan, navbatdagi

almostness (n) => deyari-lik, deyarli bo'lish holati
almost (adv) => deyarli, qariyb, sal qolganda

barefootness (n) => yalangoyoq bo'lish holati
barefoot (adj) => yalangoyoq, oyoq kiyimsiz
barefoot (adv) => yalangoyoq holda, oyoq kiyimsiz

mess => tartibsizlik / pala-partishlik, yomon holat / muammo, Iflos qilmoq / Buzmoq, bezovta qilmoq / aralashmoq
messy => tartibsiz 

miss => o'tkazib yubormoq, sog'inmoq, xonim

darling (n) => azizim, sevgilim, jonim, qadrdonim, sevgilim
darling (adj) => sevimli, aziz, qadrli

lead => boshlamoq, yetaklamoq

lead (noun) => yetakchi

frown => qoshni chimirmoq, norozilik bilan qaramoq, jiddiy / g'azablangan yuz ifodasi qilmoq

whisper (n) => pichir, pichirlash, mish-mish, mish-mish gap
whisperer (n) => pichirlovchi
whisper (v) => past ovozda gapirmoq, pichirlamoq
whispery (adj) => pichirlayotgan, shivirlagan

underneath (adv) => tagida, ostida

frequently => tez-tez, ko'p hollarda

frequency (n) => takrorlanishlar soni/darajasi, chastota

gym => sport zali

gymnasium => sport zali (rasmiy)

novel => roman, doston, masal, asar hammasi ingliz tilida hammasi

make sure => ishonch hosil qiling

store => saqlamoq, do'kon

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

fence (noun) => to'siq, panjara, zabor, devor

fence (verb) => qilishbozlik qilmoq, to'siq qurmoq

mural => freska, devoriy rasm (devorga chiziladi)

budget (n) => byudjet, moliyaviy reja, ajratilgan mablag'
budgeter (n) => byudjet tuzuvchi, xarajatlarni rejalashtiruvchi
budget (adj) => arzon, tejamkor, byudjetga mos
budget (v) => budjet tuzmoq, xarajatlarni rejalashtirmoq
budgetary (adj) => budgetga oid, byudget bilan bog'liq

explanation => tushuntirish, izoh
explanation => izoh, tushuntirish, sabab
explanation (n) => tushuntirish, izoh

package => paket, to'plam

regularly => muntazam ravishda, doimo

review (noun) => sharh, tahlil
reviewer => sharhlovchi
review (verb) => ko'rib chiqmoq
reviewable => ko'rib chiqish mumkin bo'lgan
reviewed (adjective) => ko'rib chiqilgan
reviewably => ko'rib chiqiladigan tarzda

instead => o'rniga

injure => yaralanmoq

realize => tushunib olmoq

repaint => qayta bo'yash

robber => qaroqchi

retell => qayta hikoya qilmoq

light bulb => lampochka

overtake => quvib o'tmoq

hold => o'tkazmoq (saylovlarda o'tkazmoq)

helpful => foydali

novelists => yozmachilar, romanchilar

funny => kulguli

jokes => hazillar

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

neighborhood => mahalla

qualified => tajribali, malakali

stand for => mean

attitude (n) => munosabat, qarash, nuqtai nazar, yondashuv
attitudinal (adj) => munosabatga oid, munosabat bilan bog'liq
attitudinally (adv) => munosabat nuqtayi nazaridan, munosabat jihatidan

space => fazo, bo'sh joy

meal => ovqat, ovqat payti

dinner (n) => kechki ovaqt, asosiy ovqat, rasmiy ziyofat
diner (n) => ovqatlanuvchi kishi, yo'l bo'yidagi kichik arzon rostoran
dine (v) => ovaqtlanmoq (odatda kechki yoki rasmiy ovaqt)

judge => baho bermoq, sudya

flat, apartment => kvartira

art (n) => san'at, san'at asari, mahorat
artist (n) => rassom, san'atkor, ijodkor
artlessness (n) => soddalik, tabiiylik, badiiylikning yo'qligi
artisary (n) => san'atkorlik mahorati, ijodiy mahorat
artistic (adj) => sanatga oid, badiiy, san'atkorona
artless (adj) => san'atsiz, badiiylikdan mahrum, samimiy, sodda
artlessly (adv) => sodda tarzda, badiiy bezaksiz, tabiiy ravishda

magazine, journal => jurnal

spend => o'tkazmoq, (vaqtga nisbatan sarflamoq)

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

legal => qonuniy, huquqiy

proper => to'g'ri

downtown (n) => shahar markazi
downtown (adj) => shahar markazidagi+ 

lend => qarz bermoq

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

missing => yo'qolgan

enjoyment (n) => rohat, zavq, lazzat, zavqlanish
enjoy (v) => rohatlanmoq, zavqlanmoq, yoqimli deb bilmoq
enjoyable (adj) => yoqimli, zavqli, maroqli
unenjoyable (adj) => yoqimsiz, zavq bermaydigan
enjoyably (adv) => yoqimli tarzda, maroqli tarzda

gender (n) => jins, gender
dendered (adj) => jinsga bog'liq, jins bo'yicha ajratilgan
genderless (adj) => jinsga xos bo'lmagan, jinsdan holi

gear (n) => tishli g'ildirak, mexanizm uzatmasi, uskuna yoki jihoz, anjom
gearing (n) => tishli uzatma mexanizmi, uzatma tizimi
gear (v) => moslamoq, tayyorlamoq, biror narsaga moslashtirmoq
geared (adj) => moslashtirilgan, yo'naltirilgan

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