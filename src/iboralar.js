// ============================================================
// IBORALAR — YANGI IBORA QO'SHISH:
//     Ingliz jumla => tarjima
// Tartib muhim emas, xohlagan joyga qo'shavering.
// ============================================================
const RAW_PHRASES = `
Got it => Tushundim.
I see => Tushundim (Ma'nosini angladim)
That makes sense => Ha, endi tushunarli bo'ldi.
Let me check => Tekshirib ko'ray
Give me a moment => Bir oz vaqt bering
Give me a second => Bir soniya bering
I'll get back to you => Sizga keyinroq javob beraman
Let me think => Biroz o'ylab olay
One moment, please => Bir daqiqa iltimos
Just a moment => Bir oz kuting
I have a question => Menda savol bor
I have an idea => Menda bir fikr bor
I'm having a problem => Menda muammo yuzaga keldi
Sure => Albatta. Mayli
Of course => Albatta
Absolutely => Albatta. Mutlaqo
Certainly => Albatta (Rasmiy)
No problem => Muammo yo'q
Anytime => Har doim (norasmiyroq)
Happy to help. => Yordam bera olganimdan xursadnman.
You're welcome => Arzimaydi
Could you introduce yourself? => O'zingizni tanishtirib bera olasizmi?
Good morning, everyone. => Hammaga hayrli tong.
Hello everyone => Hammaga salom
Welcome to the Internship program. => Internship dasturiga xush kelibsiz
My name is Alex. I'll be your mentor => Mening ismim Alex. Men sizning mentoringiz bo'laman.
Before we begin, let's introduce ourselves => Boshlashdan oldin, keling, o'zimizni tanishtiraylik
Feruzbek, would you like to go first? => Feruzbek, birinchi bo'lib boshlashni xohlaysizmi?
Can everyone hear me? => Hamma meni eshityaptimi?
`;

// ------------------------------------------------------------
// Parser — bunga tegishning hojati yo'q
// ------------------------------------------------------------
function buildPhrases(raw){
  return raw.split('\n').map(l => l.trim()).filter(Boolean).map(line => {
    const idx = line.indexOf('=>');
    if (idx === -1) return null;
    return { en: line.slice(0, idx).trim(), uz: line.slice(idx + 2).trim() };
  }).filter(Boolean);
}

const PHRASES = buildPhrases(RAW_PHRASES);
