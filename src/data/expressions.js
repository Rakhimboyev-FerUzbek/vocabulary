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

I agree ... => Men roziman ...

To summarize, ... => Xulosa qilib aytganda, ...

To greatly simplify, ... => Juda soddalashtirib aytganda, ...

By the way, ... => Aytgancha, ... / Darvoqe, ...

Notice, ... => E'tibor bering, ...

In fact, ... => Aslida, ...

Anyway, ... => Har holda, ...

First of all, ... => Avvalo, ...

On the other hand, ... => Boshqa tomondan, ... / Ammmo boshqa tarafdan qaraganda, ...

Just a side note, ... => Aytgancha, ... / Qo'shimcha qilib aytganda, ...

And one more time: ... => Yana bir bor: ...

I wish ... => Qaniydi ... / ... bo'lishini istardim.

In that case, ... => Unday bo'lsa, ... / Bunday holatda, ... / Unda, ...

You see, ... => Gap shundagi, ... / Tushunyapsizmi, ... / Ko'ryapsizmi, ...

In reality, ... => Aslida, ... / Haqiqatda, ... / Amalda, ...

At best, ... => Eng yaxshi holatda, ... / Ko'pi bilan, ... / Yaxshi tomoni bilan qaraganda, ...

To be clear, ... => Aniq qilib aytganda, ... / Tushunarli bo'lishi uchun, ...

Well, ... => Xo'sh, ... / Ha endi, ... / Demak, ... / Mayli, ... / Hmm, ...

First, ... => Birinchidan, ...

Needless to say, ... => Aytishga hojat yo'qki, ... / O'z-o'zidan ma'lumki, ... / Aytishning hojati yo'q, ...

Instead, ... => Buning o'rniga, ... / Aksincha, ...

At that point, ... => O'sha paytda, ... / O'sha bosqichda, ... / O'sha vaziyatda, ...

In princple, ... => Nazariy jihatdan, ... / Prinspial jihatdan, ... / Aslida bu g'oya bo'yicha, ...

In general, ... => Umuman olganda, ...

Typically, ... => Odatda, ...

Well, ... => Xo'sh, ... / Demak, ... / Mayli, ... / Aslida, ...

For once ... => Bir marta bo'lsa ham ... / Hech bo'lmasa bir marta ...
For once, listen to me. => Bir marta bo'lsa ham, meni tingla. 
For once, do it yourself. => Bir marta bo'lsa ham, o'zing qil.

Could you clarify ...? => Aniqlashtirib bera olasizmi ...? / Biroz tushuntirib bera olasizmi ...?

I'm not completely sure, but ... => To'liq ishonchim komil emas, lekin ...

I'm having difficulty with ... => Men ...da qiynalyapman.

I mean ... => Men nazarda tutayotganim ... / Demoqchimanki ... 
I mean you are right. => Men sen haq ekaningni aytmoqchiman. 
I mean it is difficult. => Men bu qiyin demoqchiman.
I mean this part. => Men bu qismini nazarda tutyapman.
I mean the first one. => Men birinchisini nazarda tutyapman.
I mean what you said. => Men sen aytgan narsani nazarda tutyapman.
I mean, we should wait. => Demoqchimanki, biz kutishimiz kerak.
I mean, I don't understand. => Demoqchimanki, men tushunmayapman.

I see your point, but ... => Fikringizni tushundim, lekin ...

So, If I understand correctly ... => Demak, agar to'g'ri tushunayotgan bo'lsam ... 
So, If I understand correctly, I need to finish this by Friday. => Demak, agar to'g'ri tushungan bo'lsam, buni jumagacha tugatishim kerak.

So, If I understood correctly ... => Demak, agar to'g'ri tushungan bo'lsam ... 
So, If I understood correctly, I need to update the document first. => Demak, Agar to'g'ri tushungan bo'lsam, avval hujjatni yangilashim kerak.

Just to clarify, ... => Aniqlik kiritish uchun, ... / Shunchaki aniqlashtirib olay, ...
Just to clarify, what should I do next? => Aniqlik kiritish uchun, keyin nima qilishim kerak?
Just to clarify, when is the deadline? => Aniqlik kiritish uchun, deadline qachon?
Just to clarify, do I need to join the meeting? => Aniqlik kiritish uchun, meetingga qo'shilishim kerakmi?

Does that mean ...? => Bu ...deganimi?

I understand your point, but ... => Sizning fikringizni tushunaman, lekin ...

I'm having some trouble with ... => Men ... bilan biroz qiynalyapman.
I'm having some trouble understanding this. => Buni tushunishda biroz qiynalyapman.

It seems like ... => Aftidan ... / Ko'rinishidan ...
It seems like something is wrong with the file. => Ko'rinishidan, faylda nimadir noto'g'ri.

As far as I can tell ... => Men tushunishimcha ... / Men aniqlay olganimcha ...
As far as I can tell, everything looks fine. => Men tushunishimcha, hammasi joyida ko'rinyapti. 
As far as I can tell, everything is ready. => Men tushunishim bo'yicha, hamma narsa tayyor.

I think the issue might be ... => Menimcha, muammo ... bo'lishi mumkin.
I think the issue might be related to the settings. => Menimcha, muammo sozlamalar bilan bog'liq bo'lishi mumkin.

It works sometimes, but ... => Ba'zida ishlaydi, lekin ...
It works sometimes, but then the same problem comes back. => Ba'zida ishlaydi, lekin keyin xuddi shu muammo yana paydo bo'ladi.

I would suggest ... => Men ...ni taklif qilgan bo'lardim.
I would suggest starting with the first task. => Men birinchi vazifadan boshlashni taklif qilgan bo'lardim.

I would rather ... => Men ...ni avfzal ko'rardim.

What If we ...? => Agar biz ... qilsak-chi?
What if we start with the easier task? => Osonroq vazifadan boshlasak-chi?

The main issue was ... => Asosiy muammo ... edi.
The main issue was a problem with the configuration. => Asosiy muammo konfiguratsiya bilan bog'liq edi.

I found that ... => Men ... ekanini aniqladim.
I found that the file was outdated. => Fayl eskirgan ekanini aniqladim.

It turned out that ... => Ma'lum bo'lishicha ... / Oxir-oqibat ... ekanligi ma'lumot bo'ldi.
It turned out that the problem was caused by the settings. => Ma'lum bo'lishicha, muammoga sozlamalar sbab bo'lgan ekan.

I've managed to ... => Men ... qilishga muvaffaq bo'ldim.
I've managed to fix the issue. => Muammoni tuzatishga muvaffaq bo'ldim.
I managed to finish it. => Men uni tugatishga muvaffaq bo'ldim. (O'tgan)
I managed to finish the work yesterday. => Men kecha ishni tugatishga muvaffaq bo'ldim. (O'tgan)
I managed to solve the problem. => Men muammoni hal qildim. / Men muammoni hal qilishga muvaffaq bo'ldim. (O'tgan)

We could ... => Biz ...qilishimiz mumkin.
We could split the task into smaller parts. => Vazifani kichikroq qismlarga bo'lishimiz mumkin.

Why don't we ...? => Nega qilmaymiz ...?
Why don't we start with the easier part? => Nega eng oson qismdan boshlamaymiz?

How about ...? => ... qilsak qanday bo'ladi?
How about trying again? => Yana urinib ko'rsak-chi?
How about starting with the first question? => Birinchi savoldan boshlasakchi?
How about taking a break? => Tanaffus qilsakchi?
HOw about going tomorrow? => Ertaga borsakchi?

It might be better to ... => ... qilganimiz yaxshiroq bo'lishi mumkin.

We may want to ... => Biz ...ni ko'rib chiqishimiz kerak. / Biz ...qilishni ko'rib chiqishimiz mumkin.

I'm having trouble with ... => Men ...bilan muammoga duch kelyapman.
I'm having trouble with the database connnection. => Men ma'lumotlar bazasiga ulanishda muammoga duch kelyapman.

I'm unable to ... => Men ... qila olmayman.
I'm unable to access the server. => Men serverga kira olmayman.

I'm getting an error when ... => Men ... qilganimda xatolik chiqdi.
I'm getting an error when I try to run the application. => Ilovani ishga tushirishga harakat qilganimda xatolik chiqyapti.

It looks like ... => ... ga o'xshaydi. / Ko'rinishidan ...
It looks like the server is down. => Ko'rinishidan, server ishlamayapti.

Could you give me a hand with ...? => ...da menga yordam bera olasizmi?
Could you give me a hand with this problem? => Shu muammoda menga yordam bera olasizmi?

Would you mind helping me with ...? => ...da menga yordam berib yubora olasizmi? / ...da menga yordam berishga qarshi emasmisiz?
Would you mind helping me with my homework? => Uy vazifamda menga yordam berib yubora olasizmi?
What would you suggest? => Siz nima qilishni tavsiya qilgan bo'lardingiz?

I could use some help with ... => ...da menga biroz yordam kerak. / ... bo'yicha yordam bersangiz yaxshi bo'lardi.

We've been asked to ... => Bizdan ...qilish so'raldi.
We've been asked to update the document. => Bizdan hujjatni yangilash so'raldi.

I was expecting to ... => Men ...deb kutgandim.
I was expecting to finish this today. => Men buni bugun tugataman deb kutgandim. 

I'll need to ... => ...qilishimga to'g'ri keladi.
I'll need to adjust my plan. => Rejamni o'zgartirishimga to'g'ri keldi.
I'll need to adjust my plan because of the new requirements. => Yangi talablar sababli rejamni o'zgartirishimga to'g'ri keldi.

Given the cahnge ... => O'zgarishni hisobga olsak ...
Given the change, we may need to revise the schedule. => O'zgarishni hisobga olsak, jadvalni qayta ko'rib chiqishimiz kerak bo'lishi mumkin.

In my experience ... => Mening tajribamda ...
In my experience, this approach works well. => Menimg tajribamda, bu yondashuv yaxshi ishlaydi.

The main reason is ... => Asosiy sabab ...
The main reason is that it saves time. => Asosiy sabab - bu vaqtni tejaydi.
The main reason is that it's cheaper. => Asosiy sabab - uning arzonroq ekanidir

The way I see it ... => Menimcha ...
From what I can see ... => Men ko'rib turganimga ko'ra ...
From what I can see, the first option is safer => Men ko'rib turganimga ko'ra, birinchi variant xavfsizroq.

The advantage is that ... => Afzalligi shundaki ...
The advantage is that it's easier to maintain. => Afzalligi shundaki, uni boshqarish osonroq.

The downside is that ... => Kamchiligi shundagi ...

The reason I prefer this option is ... => Men bu variantni afzal ko'rishimning sababi ...
The reason I prefer this option is that it's simpler. => Men bu variantni afzal ko'rishimning sababi - u soddaroq.

It would be more practical to ... => ...qilish amaliyroq bo'lardi.
It would be more practical to do this in stages. => Buni bosqichma-bosqich qilish amaliyroq bo'lardi.

For that reason ... => Shu sababli ...
For that reason, I would choose the second option. => Shu sababli, men ikkinchi variantni tanlagan bo'lardim.

I agree with the first part, but ... => Birinchi qismiga qo'shilaman, lekin ...

Just to make sure I understand ... => To'g'ri tushunganimga ishonch hosil qilish uchun ...
Just to make sure I understand, you want me to update the repost first. => To'g'ri tushunganimga ishonch hosil qilish uchun, avval hisobotni yangilashimni xohlaysiz shundaymi.

If I understand correctly ... => Agar to'g'ri tushungan bo'lsam ...
If I understand correctly, the deadline has been moved to Friday. => Agar to'g'ri tushungan bo'lsam, deadline juma kuniga ko'chirilgan.

So, you mean that ...? => Demak, siz ... demoqchisiz?
So, you mean that we don't need to change the original version? => Demak, asl variantni o'zgartirishimiz shart emas, demoqchisiz?

Could you clarify what do you mean by ...? => ...deganda nimani nazarda tutayotganingizni tushuntirib bera olasizmi?

What do you mean by ...? => ...deganda nimani nazarda tutyapsiz? 

Just to clarify ... => Aniqlashtirib olsam ..
Just to clarify, should I send the report today? => Aniqlashtirib olsam, hisobotni bugun yuborishim kerakmi?

So, If I understand correctly ... => Demak, agar to'g'ri tushungan bo'lsam ...

I'm very fond of ... => ... ni juda yaxshi ko'raman. / ...ga juda mehrim bor.
I'm very fond of books. => Men kitoblarni juda yaxshi ko'raman.
I'm very fond of my hometown. => Men tug'ilib o'sgan shahrimni juda yaxshi ko'raman.
I'm very fond of reading. => Men kitob o'qishni juda yaxshi ko'raman.

To put it simply, ... => Oddiy qilib aytganda, ...

It's great If ... => Agar ... bo'lsa, bu ajoyib.

For once ... => Bir marta bo'lsa ham ... / Hech bo'lmasa bir marta ...
For once, listen to me. => Bir marta bo'lsa ham, meni tingla. 
For once, do it yourself. => Bir marta bo'lsa ham, o'zing qil.

You should pretend like ... => Sen ...dek o'zingni tutishing kerak. / Sen ...dek qilib ko'rsatishing kerak.

Do you mind if ...? => ... qilsam qarshi emasmisan?

What If ...? => ... bo'lsa-chi? / ...-chi?
What If the love is over? => Agar sevgi tugagan bo'lsachi? / Agar sevgimiz tugagan bo'lsachi?

This is why + sentence => Mana nima uchun ... / Shuning uchun ...

I wonder if ... => Qiziq ...mikan? / ... deb o'ylapman.

First things first, ... => Avvalo, ... / Birinchi navbatda, ... 
First things first, let’s introduce ourselves. => Avvalo, o‘zimizni tanishtirib olaylik.

Time for you to ... => Sen uchun ... vaqti bo'ldi.

I'd better + verb => Yaxshis, ... qilganim ma'qul.

What's the point of ...? => ...ning nima keragi bor? / ...dan nima foyda?

Would you please ...? => Iltimos, ... qilsa olasizmi?

I wish I could ... => Qaniydi ... qilsa olsam edi.

I would say ... => Menimcha ... / Men shunday derdim ... / Men aytardimki ...

What it comes to ... => ...ga kelganda. / ... masalasida. / ... borasida.

What I do is + ... => Men qiladigan narsa ... / Men qiladigan ish ... / Men esa shunday qilaman ...

I should have ... => Men ...qilishim kerak edi. / ... qilgan bo'lishim kerak edi.
I should have known. => Men bilishim kerak edi.

From where I stand, ... => Mening nutayi nazarimdan, ... / Men ko'rib turganimcha, ...

I am supposing ... => Men taxmin qilyapman ... / Deb o'ylayapman ...

I want to stress that ... => Men shuni ta'kidlamoqchimanki ...

By the way, ... => Aytgancha, ... / Darvoqe, ... / Aytgancha, shu o'rinda, ...
Please note that ... => Iltimos, shuni e'tiborga olingki ... / E'tibor beringki ...

What at heck ...? => Nima balo ...? / Nima o'zi ...? / Jin ursin, nima ...?

Why on earth ...? => Axir nega ...? / Nima uchun o'zi ...?

At we can say is, ... => Biz ayta oladigan yagona narsa, ... / Bizning qo'limizdan keladigan narsa, ...

It's better + to V + than + to V => ... qilish ... qilishdan yaxshiroq. / ... qilgandan ko'ra, ... qilgan yaxshiroq.

It would be better to + V1 => ... qilgan ma'qulroq bo'lardi.


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
