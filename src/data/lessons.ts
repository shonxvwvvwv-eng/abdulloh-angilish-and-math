import { Lesson, GradeNumber, Subject } from '../types';

export const ALL_GRADES: GradeNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const GRADE_LESSONS: Record<GradeNumber, Record<Subject, Lesson[]>> = {
  1: {
    math: [
      {
        id: 'm1-1',
        title: 'Sonlar dunyosi (1 dan 10 gacha)',
        description: '1 dan 10 gacha bo\'lgan sonlarni o\'rganamiz va sanashni mashq qilamiz',
        content: '# Sonlar va Sanash\n\nSalom, kichik matematik! Bugun biz 1 dan 10 gacha bo\'lgan sonlarni sanashni o\'rganamiz.\n\nHar bir son o\'ziga xos shaklga ega:\n- 1 - bitta olma 🍎\n- 2 - ikkita kuchukcha 🐶🐶\n- 3 - uchta o\'yinchoq 🧸🧸🧸\n\nKeling, birga sanaymiz: Bir, Ikki, Uch, To\'rt, Besh, Olti, Yetti, Sakkiz, To\'qqiz, O\'n!',
        examples: [
          '🍎 = 1 (Bir)',
          '🍎🍎 = 2 (Ikki)',
          '🍎🍎🍎 = 3 (Uch)'
        ],
        quiz: [
          {
            question: 'Savatda 3 ta olma bor edi, yana 1 ta olma solindi. Jami nechta olma bo\'ldi?',
            options: ['2 ta', '3 ta', '4 ta', '5 ta'],
            correctAnswer: '4 ta',
            explanation: '3 ga 1 ni qo\'shganda 4 ta bo\'ladi: 3 + 1 = 4.'
          },
          {
            question: 'Qaysi son "BESH" deb o\'qiladi?',
            options: ['3', '4', '5', '6'],
            correctAnswer: '5',
            explanation: '5 soni o\'zbek tilida "Besh" deb aytiladi.'
          }
        ]
      },
      {
        id: 'm1-2',
        title: 'Qo\'shish va Ayirish (+ va -)',
        description: 'Sodda qo\'shish va ayirish amallari bilan tanishamiz',
        content: '# Qo\'shish va Ayirish\n\n**Qo\'shish (+)** - narsalarni bir-biriga birlashtirish demakdir.\nMasalan: 2 ta mashina va yana 1 ta mashina birlashsa, 3 ta mashina bo\'ladi.\n`2 + 1 = 3`\n\n**Ayirish (-)** - narsalarni guruhdan olib tashlash demakdir.\nMasalan: 5 ta konfetdan 2 tasini yesangiz, 3 ta qoladi.\n`5 - 2 = 3`',
        examples: [
          '3 + 2 = 5',
          '4 - 1 = 3',
          '2 + 2 = 4'
        ],
        quiz: [
          {
            question: '2 + 3 tenglamaning javobi nechchi?',
            options: ['3', '4', '5', '6'],
            correctAnswer: '5',
            explanation: '2 ta nuqtaga 3 ta nuqtani qo\'shsak jami 5 ta bo\'ladi.'
          },
          {
            question: '4 - 2 ayirish amali javobini toping.',
            options: ['1', '2', '3', '4'],
            correctAnswer: '2',
            explanation: '4 dan 2 ni ayirsak 2 qoladi.'
          }
        ]
      }
    ],
    english: [
      {
        id: 'e1-1',
        title: 'English Alphabet (Ingliz tili alifbosi)',
        description: 'Ingliz Alifbosini birinchi harflarini o\'rganamiz',
        content: '# The English Alphabet\n\nIngliz tili alifbosi ajoyib! Unda 26 ta harf bor.\nBugun biz dastlabki harflarni o\'rganamiz:\n\n- **A** is for **Apple** (Olma) 🍎\n- **B** is for **Ball** (To\'p) ⚽\n- **C** is for **Cat** (Mushuk) 🐱\n- **D** is for **Dog** (Kuchuk) 🐶',
        examples: [
          'A /a/ - Apple 🍎',
          'B /b/ - Ball ⚽',
          'C /k/ - Cat 🐱'
        ],
        quiz: [
          {
            question: 'Qaysi ingliz harfi "Cat" (Mushuk) so\'zining birinchi harfi hisoblanadi?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'C',
            explanation: 'Mushuk ingliz tilida "Cat" deyiladi va u C harfi bilan boshlanadi.'
          },
          {
            question: 'Ingliz tilida "Olma" nima deyiladi?',
            options: ['Banana', 'Apple', 'Orange', 'Cherry'],
            correctAnswer: 'Apple',
            explanation: 'Olma ingliz tilida "Apple" deyiladi.'
          }
        ]
      }
    ]
  },
  2: {
    math: [
      {
        id: 'm2-1',
        title: 'Ko\'paytirish asoslari',
        description: 'Ketma-ket qo\'shishdan ko\'paytirishga o\'tamiz',
        content: '# Ko\'paytirish Amali\n\nKo\'paytirish - bu bir xil sonlarni tezkor va oson qo\'shishdir!\nMasalan: 3 ta qutining har birida 2 tadan olma bo\'lsa:\n`2 + 2 + 2 = 6`\nBuni qisqacha ko\'paytirish bilan yozish mumkin: \n`2 * 3 = 6` (Ikkini uchga ko\'paytirganda olti bo\'ladi).',
        examples: [
          '2 + 2 + 2 + 2 = 2 * 4 = 8',
          '5 + 5 = 5 * 2 = 10',
          '3 * 3 = 9'
        ],
        quiz: [
          {
            question: '3 * 4 amali nimaga teng?',
            options: ['7', '10', '12', '15'],
            correctAnswer: '12',
            explanation: '3 * 4 degani 4 ta 3 ning yig\'indisi: 3 + 3 + 3 + 3 = 12.'
          }
        ]
      }
    ],
    english: [
      {
        id: 'e2-1',
        title: 'Colors and Numbers (Ranglar va Sonlar)',
        description: 'Asosiy ranglar va 1 dan 10 gacha inglizcha sanash',
        content: '# Colors & Numbers\n\nRanglarni yod qilaylik:\n- **Red** - Qizil ❤️\n- **Blue** - Ko\'k 💙\n- **Green** - Yashil 💚\n- **Yellow** - Sariq 💛\n\nSonlar (Numbers):\n- **One** (1), **Two** (2), **Three** (3), **Four** (4), **Five** (5), **Six** (6), **Seven** (7), **Eight** (8), **Nine** (9), **Ten** (10).',
        examples: [
          'A red apple - Qizil olma',
          'Three blue balls - Uchta ko\'k to\'p',
          'Five green frogs - Beshta yashil baqa'
        ],
        quiz: [
          {
            question: 'Ingliz tilida "Sariq" rangi nima deyiladi?',
            options: ['Red', 'Green', 'Yellow', 'Blue'],
            correctAnswer: 'Yellow',
            explanation: 'Sariq ingliz tilida "Yellow" deb ataladi.'
          },
          {
            question: '"Seven" soni nechchi raqamini anglatadi?',
            options: ['5', '6', '7', '8'],
            correctAnswer: '7',
            explanation: 'Seven - yetti (7) deganidir.'
          }
        ]
      }
    ]
  },
  3: {
    math: [
      {
        id: 'm3-1',
        title: 'Bo\'lish Amali',
        description: 'Sonlarni teng guruhlarga taqsimlashni o\'rganamiz',
        content: '# Bo\'lish Amali (:)\n\nBo\'lish - sonni teng qismlarga bo\'lish demakdir. Bu ko\'paytirishga teskari amal.\nMasalan: 12 ta shakolad bor. Uni 3 ta do\'shingizga teng taqsimlamoqchisiz.\n`12 : 3 = 4`\nHar bir do\'stingiz 4 tadan shakolad oladi.',
        examples: [
          '10 : 2 = 5',
          '15 : 3 = 5',
          '20 : 4 = 5'
        ],
        quiz: [
          {
            question: '16 ni 4 ga bo\'lganda javob necha bo\'ladi?',
            options: ['2', '3', '4', '5'],
            correctAnswer: '4',
            explanation: 'Chunki 4 * 4 = 16, demak 16 : 4 = 4.'
          }
        ]
      }
    ],
    english: [
      {
        id: 'e3-1',
        title: 'My House (Mening Uyim)',
        description: 'Uy jihozlari va xonalarni inglizcha nomlanishi',
        content: '# My House & Family\n\nUydagi xonalar:\n- **Living room** - Mehmonxona 🛋️\n- **Bedroom** - Yotoqxona 🛏️\n- **Kitchen** - Oshxona 🍳\n- **Bathroom** - Yuvinish xonasi 🚿\n\nOilamiz:\n- **Father** - Otam / Dada\n- **Mother** - Onam / Oyi\n- **Brother** - Aka/Uka\n- **Sister** - Opa/Singil',
        examples: [
          'Mother is in the kitchen. - Oyi oshxonada.',
          'This is my bedroom. - Bu mening yotoqxonam.'
        ],
        quiz: [
          {
            question: '"Oshxona" ingliz tilida qaysi so\'z bilan ifodalanadi?',
            options: ['Bedroom', 'Living room', 'Kitchen', 'Bathroom'],
            correctAnswer: 'Kitchen',
            explanation: 'Oshxona ingliz tilida "Kitchen" deyiladi.'
          }
        ]
      }
    ]
  },
  4: {
    math: [
      {
        id: 'm4-1',
        title: 'Ko\'p xonali sonlarni qo\'shish va ayirish',
        description: 'Xonalar bo\'yicha ustun shaklida hisoblashlar',
        content: '# Ustun usulida qo\'shish va ayirish\n\nKatta sonlarni hisoblashda ustun usulidan foydalanamiz. Buning uchun birliklar tagiga birliklar, o\'nliklar tagiga o\'nliklar va yuzliklar tagiga yuzliklar yoziladi.\n\nMasalan:\n```\n  452\n+ 327\n -----\n  779\n```',
        examples: [
          '125 + 243 = 368',
          '876 - 345 = 531'
        ],
        quiz: [
          {
            question: '321 + 154 yig\'indisini hisoblang.',
            options: ['475', '485', '471', '465'],
            correctAnswer: '475',
            explanation: '321 + 154 = 475.'
          }
        ]
      }
    ],
    english: [
      {
        id: 'e4-1',
        title: 'Daily Routines (Kun tartibi)',
        description: 'Kundalik ishlarimiz haqida gapirish',
        content: '# My Day\n\nKun mobaynida bajaradigan ajoyib ishlarimiz:\n- **Get up** - Uyg\'onmoq ☀️\n- **Brush teeth** - Tishlarni yuvish 🪥\n- **Have breakfast** - Nonushta qilish 🍳\n- **Go to school** - Maktabga borish 🏫\n\nAsosiy shakl ("I" bilan):\n- *I get up at 7 o\'clock.* (Men soat 7 da uyg\'onaman.)\n- *I go to school by bus.* (Men maktabga avtobusda boraman.)',
        examples: [
          'I brush my teeth every morning. - Har tong tishlarimni tozalayman.',
          'We study English at school. - Maktabda ingliz tili o\'rganamiz.'
        ],
        quiz: [
          {
            question: '"I ____ breakfast at 8 AM" - Nuqtalar o\'rniga mos so\'zni qo\'ying.',
            options: ['go', 'have', 'brush', 'tell'],
            correctAnswer: 'have',
            explanation: 'Nonushta qilish borasida "have breakfast" iborasi ishlatiladi.'
          }
        ]
      }
    ]
  },
  5: {
    math: [
      {
        id: 'm5-1',
        title: 'Kasrlar dunyosiga sayohat',
        description: 'Kasr sonlar va ularni o\'qish sirlari',
        content: '# Kasrlar nima?\n\nBir butun narsani teng bo\'laklarga bo\'lgandagi qismlarga **kasrlar** deyiladi.\nPizza tasavvur qiling! Pizzani 4 bo\'lakka bo\'ldik va siz 1 bo\'lagini yedingiz. Siz pizzaning **to\'rtdan bir (1/4)** qismini yedilar.\n\nKasrning tuzilishi:\n- **Surat (tepadagi son)** - nechta qism olinganligi. \n- **Maxraj (pastdagi son)** - butun narsa jami nechta teng qismga bo\'lingani.\n\n`1/4` -> 1 - surat, 4 - maxraj.',
        examples: [
          '1/2 - yarim',
          '1/3 - uchdan bir',
          '3/4 - to\'rtdan uch'
        ],
        quiz: [
          {
            question: 'Kasrning pastki qismidagi son nima deb ataladi?',
            options: ['Surat', 'Maxraj', 'Butun', 'Bo\'luvchi'],
            correctAnswer: 'Maxraj',
            explanation: 'Kasr chizig\'ining pastidagi son maxraj deyiladi va jami teng qismlarni anglatadi.'
          },
          {
            question: 'Tarvuz 8 bo\'lakka bo\'lindi va 3 ta bo\'lagi yeyildi. Qolgan tarvuz ulushini kasrda tasvirlang.',
            options: ['3/8', '5/8', '8/3', '1/2'],
            correctAnswer: '5/8',
            explanation: '8 bo\'lakdan 3 tasi yeyilsa, 5 tasi qoladi. Demak javob: 5/8.'
          }
        ]
      }
    ],
    english: [
      {
        id: 'e5-1',
        title: 'Ingliz tilida Zamonlar: Present Tenses (Hozirgi Zamonlar)',
        description: 'Hozirgi zamon guruhining 4 xil ko\'rinishi: Simple, Continuous, Perfect va Perfect Continuous',
        content: '# Present Tenses Guide (Hozirgi Zamonlar)\n\nIngliz tilida 12 ta asosiy zamon bor. Ulardan birinchi guruh - **Present (Hozirgi)** zamonlar:\n\n### 1. Present Simple (Hozirgi oddiy zamon)\n*Doimiy, takrorlanuvchi ish-harakatlar uchun.*\n- **Formulasi:** `Subject + V1 (s/es)`\n- **Kalit so\'zlar:** always, usually, every day.\n- *Example:* I write code every day. / He writes code.\n\n### 2. Present Continuous (Hozirgi davomli zamon)\n*Ayni vaqtda sodir bo\'layotgan harakatlar.* \n- **Formulasi:** `Subject + am/is/are + V-ing`\n- **Kalit so\'zlar:** now, at the moment.\n- *Example:* We are studying English now.\n\n### 3. Present Perfect (Hozirgi tugallangan zamon)\n*O\'tmishda bajarilgan, ammo natijasi hozir bilan bog\'liq harakatlar.*\n- **Formulasi:** `Subject + has/have + V3`\n- **Kalit so\'zlar:** already, just, yet, ever, never.\n- *Example:* I have finished my math homework.\n\n### 4. Present Perfect Continuous (Hozirgi tugallangan davomli zamon)\n*O\'tmishda boshlanib, hozirgacha davom etayotgan harakat.*\n- **Formulasi:** `Subject + have/has been + V_ing`\n- **Kalit so\'zlar:** since, for.\n- *Example:* I have been learning math for five years.',
        examples: [
          'Present Simple: He plays football. (U futbol o\'ynaydi - odatda)',
          'Present Continuous: He is playing football. (U ayni vaqtda o\'ynayapti)',
          'Present Perfect: I have already eaten. (Men allaqachon ovqatlandim)',
          'Present Perfect Continuous: She has been singing since morning. (U tongdan beri qo\'shiq aytmoqda)'
        ],
        quiz: [
          {
            question: '"She is cooking dinner right now." - Ushbu gap qaysi hozirgi zamonda yozilgan?',
            options: ['Present Simple', 'Present Continuous', 'Present Perfect', 'Present Perfect Continuous'],
            correctAnswer: 'Present Continuous',
            explanation: 'cooking va "right now" kalit so\'zi bu ayni hozir sodir bo\'layotgan "Continuous" zamon ekanligini bildiradi.'
          },
          {
            question: '"have/has + V3" qaysi zamonning formulasi?',
            options: ['Present Simple', 'Present Continuous', 'Present Perfect', 'Past Perfect'],
            correctAnswer: 'Present Perfect',
            explanation: 'Present Perfect formulasida egadan so\'ng has/have yordamchi fe\'llari hamda asosiy fe\'lning 3-shakli (V3/V-ed) ishlatiladi.'
          }
        ]
      }
    ]
  },
  6: {
    math: [
      {
        id: 'm6-1',
        title: 'Musbat va manfiy sonlar koordinatalarda',
        description: 'Noldan kichik sonlar va ularning hayotdagi ahamiyati',
        content: '# Musbat va Manfiy sonlar\n\nHarorat haqida eshitgansiz-a? Qishda havo sovuq bo\'lganda harorat nol darajadan pastga, ya\'ni minus darajaga tushadi. Masalan, `-5 °C`.\n\nSonlar o\'qida:\n- Nol (0) - boshlang\'ich nuqta.\n- O\'ng tomonda **musbat sonlar (+)** joylashadi: 1, 2, 3...\n- Chap tomonda **manfiy sonlar (-)** joylashadi: -1, -2, -3...\n\n**Amallar qoidalari:**\n- Ikki manfiy son qo\'shilsa, manfiy son hosil bo\'ladi: `-3 + (-2) = -5`\n- Manfiy sonni manfiy songa ko\'paytirganda musbat bo\'ladi: `(-3) * (-2) = 6`',
        examples: [
          '-5 + 8 = 3',
          '-2 * 4 = -8',
          '-10 - (-3) = -10 + 3 = -7'
        ],
        quiz: [
          {
            question: '(-4) * (-3) hisoblash natijasini toping.',
            options: ['-12', '12', '-7', '7'],
            correctAnswer: '12',
            explanation: 'Minusni minusga ko\'paytirganda plyus belgisiga aylanadi. 4 * 3 = 12.'
          }
        ]
      }
    ],
    english: [
      {
        id: 'e6-1',
        title: 'Ingliz tilida Zamonlar: Past Tenses (O\'tgan Zamonlar)',
        description: 'O\'tgan zamon guruhining 4 xil ko\'rinishi: Simple, Continuous, Perfect va Perfect Continuous',
        content: '# Past Tenses Guide (O\'tgan Zamonlar)\n\nO\'tgan zamonlar o\'tmishda bo\'lib o\'tgan ish-harakatlarni ifodalaydi:\n\n### 1. Past Simple (O\'tgan oddiy zamon)\n*O\'tmishda ma\'lum bir vaqtda sodir bo\'lib tugagan harakat.*\n- **Formulasi:** `Subject + V2 / V-ed`\n- **Kalit so\'zlar:** yesterday, ago, last week.\n- *Example:* We climbed a mountain last Sunday. / I saw a movie yesterday.\n\n### 2. Past Continuous (O\'tgan davomli zamon)\n*O\'tmishda ma\'lum bir vaqtda davom etayotgan bo\'lgan harakat.*\n- **Formulasi:** `Subject + was/were + V-ing`\n- **Kalit so\'zlar:** while, when, at 5 PM yesterday.\n- *Example:* I was watching TV when my friend called.\n\n### 3. Past Perfect (O\'tgan tugallangan zamon)\n*O\'tmishda boshqa bir uchinchi o\'tmish harakatidan avval yakunlangan ish.*\n- **Formulasi:** `Subject + had + V3`\n- **Kalit so\'zlar:** by the time, before.\n- *Example:* The train had left by the time we arrived.\n\n### 4. Past Perfect Continuous (O\'tgan tugallangan davomli zamon)\n*O\'tmishdagi boshqa o\'tmish nuqtasigacha ma\'lum muddat davom etgan harakat.*\n- **Formulasi:** `Subject + had been + V-ing`\n- *Example:* They had been talking for an hour before they agreed.',
        examples: [
          'Past Simple: I lived in Samarkand. (Men Samarqandda yashaganman)',
          'Past Continuous: We were playing games yesterday at 3 o\'clock. (Kechasi soat 3 da o\'ynayotgandik)',
          'Past Perfect: She had cleaned the room before guests came. (Mehmonlar kelishidan oldin tozalab bo\'lgandi)'
        ],
        quiz: [
          {
            question: '"yesterday", "last year", "two days ago" so\'zlari qaysi zamonning kalit so\'zlari?',
            options: ['Present Simple', 'Past Simple', 'Past Continuous', 'Past Perfect'],
            correctAnswer: 'Past Simple',
            explanation: 'Ushbu so\'zlar o\'tmishdagi aniq bir yakunlangan vaqtni (Past Simple) anglatadi.'
          },
          {
            question: 'Agar gap "I was reading a book while my sister ____" shaklida bo\'lsa, nuqtalar o\'rniga Past Continuous fe\'lini tanlang.',
            options: ['sleeps', 'is sleeping', 'was sleeping', 'had slept'],
            correctAnswer: 'was sleeping',
            explanation: 'While bog\'lovchisi bilan parallel davom etayotgan o\'tgan harakatlar uchun Past Continuous ishlangan ma\'qul: was sleeping.'
          }
        ]
      }
    ]
  },
  7: {
    math: [
      {
        id: 'm7-1',
        title: 'Chiziqli tenglamalar va algebra olami',
        description: 'Noma\'lum x sonini topish texnikasini o\'rganamiz',
        content: '# Algebra va Sodda Tenglamalar\n\nTenglamalar - bu chap va o\'ng tomonlari o\'zaro teng bo\'lgan taroziga o\'xshaydi. Maqsad tarozi pallasini buzmagan holda noma\'lum `x` ni yolg\'iz qoldirishdir.\n\nMasalan:\n`2x + 5 = 15`\n\n**Qadamlar:**\n1. `+5` ni tenglikning o\'ng tomoniga ishorasini plyusdan minusga o\'zgartirib o\'tkazamiz: `2x = 15 - 5` -> `2x = 10`\n2. Noma\'lum x ni topish uchun 10 ni 2 ga bo\'lamiz: `x = 10 / 2` -> `x = 5.`',
        examples: [
          'x - 7 = 10 => x = 17',
          '3x = 18 => x = 6',
          '5x + 3 = 23 => 5x = 20 => x = 4'
        ],
        quiz: [
          {
            question: '3x - 4 = 11 tenglamaning ildizini (x ni) toping.',
            options: ['3', '4', '5', '6'],
            correctAnswer: '5',
            explanation: '3x = 11 + 4 => 3x = 15 => x = 15/3 => x = 5.'
          }
        ]
      }
    ],
    english: [
      {
        id: 'e7-1',
        title: 'Ingliz tilida Zamonlar: Future Tenses (Kelasi Zamonlar)',
        description: 'Kelajakdagi niyat va rejalarni kelasi zamon guruhlari orqali ifodalash',
        content: '# Future Tenses Guide (Kelasi Zamonlar)\n\nKelasi zamonlar kelajakdagi orzular va rejalarimiz haqida gaplashishga xizmat qiladi:\n\n### 1. Future Simple (Kelasi oddiy zamon)\n*Kelajakdagi spontan qarorlar yoki taxminlar.*\n- **Formulasi:** `Subject + will + V1`\n- **Kalit so\'zlar:** tomorrow, in 2030, next week.\n- *Example:* I think it will rain tomorrow. / I will help you.\n\n### 2. Future Continuous (Kelasi davomli zamon)\n*Kelajakda ma\'lum bir vaqtda davom etayotgan bo\'ladigan harakat.*\n- **Formulasi:** `Subject + will be + V-ing`\n- **Kalit so\'zlar:** at this time tomorrow.\n- *Example:* At 3 PM tomorrow, I will be playing tennis.\n\n### 3. Future Perfect (Kelasi tugallangan zamon)\n*Kelajakdagi ma\'lum bir nuqtagacha bajarilib tugaydigan harakat.*\n- **Formulasi:** `Subject + will have + V3`\n- **Kalit so\'zlar:** by tomorrow, by the end of this year.\n- *Example:* I will have finished my high-school studies by 2028.\n\n### 4. Future Perfect Continuous\n*Kelajakdagi ma\'lum bir vaqtgacha qancha vaqt davom etganligini ifodalash uchun.*\n- **Formulasi:** `Subject + will have been + V_ing`\n- *Example:* By next month I will have been living here for ten years.',
        examples: [
          'Future Simple: Space travel will become normal. (Kosmik sayohat oddiy bo\'ladi)',
          'Future Continuous: Tomorrow evening I will be studying. (Ertaga kechqurun dars qilayotgan bo\'laman)',
          'Future Perfect: By Friday, we will have completed the project. (Jumagacha loyihani yakunlagan bo\'lamiz)'
        ],
        quiz: [
          {
            question: '"By next Sunday, we will have completed our exams." - gap qaysi kelasi zamonda?',
            options: ['Future Simple', 'Future Continuous', 'Future Perfect', 'Future Perfect Continuous'],
            correctAnswer: 'Future Perfect',
            explanation: '"will have completed" (will have + V3) va "by next Sunday" kelasi tugallangan (Future Perfect) zamoniga mos keladi.'
          }
        ]
      }
    ]
  },
  8: {
    math: [
      {
        id: 'm8-1',
        title: 'Kvadrat Ildiz va Arifmetik Amallar',
        description: 'Kvadratga oshirishning teskarisi bo\'lgan kvadrat ildiz amalining mohiyati',
        content: '# Kvadrat Ildizlar (√)\n\nKvadrat ildiz - bu ko\'paytirganda o\'zini beradigan sonni qidirish demakdir.\nMasalan, qaysi sonni o\'ziga ko\'paytirganda 25 bo\'ladi? Albatta, 5. Demak, 25 ning kvadrat ildizi 5 ga teng: `√25 = 5`.\n\n**Xossalari:**\n- `√0 = 0`\n- `√1 = 1`\n- Manfiy sondan haqiqiy arifmetik ildiz chiqarib bo\'lmaydi: `√(-9)` mavjud emas (chunki bir xil sonlarning ko\'paytmasi doim musbat).',
        examples: [
          '√16 = 4  (4 * 4 = 16)',
          '√49 = 7  (7 * 7 = 49)',
          '√100 = 10 (10 * 10 = 100)'
        ],
        quiz: [
          {
            question: '√64 ifodaning qiymati nimaga teng?',
            options: ['6', '7', '8', '9'],
            correctAnswer: '8',
            explanation: 'Chunki 8 ni o\'ziga ko\'paytirganda 64 kelib chiqadi.'
          }
        ]
      }
    ],
    english: [
      {
        id: 'e8-1',
        title: 'Passive Voice (Majhul Nisbat)',
        description: 'Ish-harakat bajaruvchisining o\'zi emas, uning ustidagi ta\'sirni ifodalash',
        content: '# Active vs Passive Voice\n\nGaplarda ikki xil nisbat bor:\n- **Active Voice (Faol):** Ega o\'zi ishni bajaradi. \n  *Example:* "The cat ate the cheese." (Mushuk pishloqni yedi)\n- **Passive Voice (Majhul):** Ega ustida ish-harakat bajariladi.\n  *Example:* "The cheese was eaten by the cat." (Pishloq mushuk tomonidan yeyildi)\n\n**Passive Voice formulasi:**\n`Object + Form of BE (is/are/was/were/been...) + V3`',
        examples: [
          'Active: Shakespeare wrote Hamlet. -> Passive: Hamlet was written by Shakespeare.',
          'Active: They design beautiful apps. -> Passive: Beautiful apps are designed by them.'
        ],
        quiz: [
          {
            question: '"Many English novels were read by children." - Ushbu gap qaysi zamondagi Passive Voice ko\'rinishida?',
            options: ['Present Simple Passive', 'Past Simple Passive', 'Future Simple Passive', 'Present Perfect Passive'],
            correctAnswer: 'Past Simple Passive',
            explanation: '"were read" ("were" + V3) o\'tgan oddiy zamondagi majhul nisbat shaklidir.'
          }
        ]
      }
    ]
  },
  9: {
    math: [
      {
        id: 'm9-1',
        title: 'Trigonometriya sari ilk qadamlar',
        description: 'To\'g\'ri burchakli uchburchak, Sinus va Kosinus munosabatlari',
        content: '# Trigonometriya Asoslari\n\nTrigonometriya - burchaklar va tomonlar o\'rtasidagi munosabatlarni o\'rganuvchi ajoyib fan tarmog\'idir. Uni o\'rganish uchun boshlang\'ich to\'g\'ri burchakli uchburchakdan boshlaymiz.\n\n- **Gipotenuza** - to\'g\'ri burchak (90°) ro\'parasidagi eng uzun tomon.\n- **Katetlar** - burchakka yondosh va qarshisidagi tomonlar.\n\nSiz bilishingiz kerak bo\'lgan eng asosiy 2 ta funksiya:\n1. **Sinus (sin α)** = Qarshidagi katet / Gipotenuza\n2. **Kosinus (cos α)** = Yopishgan katet / Gipotenuza',
        examples: [
          'sin(30°) = 1/2',
          'cos(60°) = 1/2',
          'sin(90°) = 1'
        ],
        quiz: [
          {
            question: 'To\'g\'ri burchakli uchburchakda qarshisidagi katetning gipotenuza munosabati nima deyiladi?',
            options: ['Sinus', 'Kosinus', 'Tangens', 'Kotangens'],
            correctAnswer: 'Sinus',
            explanation: 'Burchak qarshisidagi katetning gipotenuza munosabati sinus deyiladi.'
          }
        ]
      }
    ],
    english: [
      {
        id: 'e9-1',
        title: 'Conditionals: Zero & First Conditional',
        description: 'Shart gaplarning "Zero" va "First" turlari tahlili',
        content: '# Conditional Sentences (Shart Ergashtirgan Gaplar)\n\nShart gaplar ingliz tilida "If" (Agar) so\'zi orqali tuziladi. Ular 4 xil turga bo\'linadi. Bugun ulardan 2 tasini tajriba qilamiz:\n\n### 1. Zero Conditional (Ilmiy faktlar va umumiy haqiqat)\n*Agar bir amal bajarilsa, ikkinchisi doimo sodir bo\'ladi.*\n- **Strukturasi:** `If + Present Simple, Present Simple`\n- *Example:* If you heat water to 100°C, it boils. (Suvni isitsak, qaynaydi).\n\n### 2. First Conditional (Kelajakdagi real ehtimollar)\n*Agar shart bajarilsa, kelajakda amal sodir bo\'lishi haqiqatga yaqin.*\n- **Strukturasi:** `If + Present Simple, will + V1`\n- *Example:* If you study hard, you will pass the math exam. (Ko\'p o\'qisang, imtihondan o\'tasan).',
        examples: [
          'Zero: If you freeze water, it becomes ice. - Suvni muzlatsangiz muzga aylanadi.',
          'First: If it is sunny on Sunday, we will go out. - Agar yakshanba quyosh bo\'lsa, biz ko\'chaga chiqamiz.'
        ],
        quiz: [
          {
            question: '"If it rains tomorrow, we ____ at home." - nuqtalar o\'rniga First Conditional qoidasiga ko\'ra mos so\'zni tanlang.',
            options: ['stay', 'will stay', 'stayed', 'would stay'],
            correctAnswer: 'will stay',
            explanation: 'First Conditional asosi: (If + Present Simple) dan so\'ng kelasi zamon (will + V1) ishlatiladi: will stay.'
          }
        ]
      }
    ]
  },
  10: {
    math: [
      {
        id: 'm10-1',
        title: 'Logarifm tushunchasi va soddalashtirish',
        description: 'Daraja ko\'rsatkichini qidirish mashqini o\'rganamiz',
        content: '# Logarifm nima?\n\nLogarifm - shunday savol beradi: "Men ma\'lum bir songa yetish uchun qaysi darajaga ko\'tarishim kerak?"\nLogarifm belgisi: `log_a (b)`\nMasalan:\n`log_2 (8)` -> 2 ni nechchi darajaga oshirsa 8 bo\'ladi? Albatta, 3 (chunki 2 * 2 * 2 = 8).\nJavob: `log_2 (8) = 3`.\n\n**Natural logarifm (ln)** - asosi e soniga teng bo\'lgan logarifmdir (e ≈ 2.718).',
        examples: [
          'log_10 (100) = 2',
          'log_3 (81) = 4',
          'log_5 (5) = 1'
        ],
        quiz: [
          {
            question: 'log_5 (25) nimaga teng?',
            options: ['1', '2', '3', '5'],
            correctAnswer: '2',
            explanation: 'Chunki 5 ning 2-darajasi (kvadrati) 25 ga teng: 5^2 = 25.'
          }
        ]
      }
    ],
    english: [
      {
        id: 'e10-1',
        title: 'Reported Speech (O\'zgalar Gapi)',
        description: 'Kimningdir so\'zini boshqa kishi tilidan aytganda zamon o\'zgarish qoidalari',
        content: '# Direct and Indirect Speech\n\nNutqimiz ikki guruhga bo\'linadi:\n1. **Direct Speech (To\'g\'ri gap):** Gapiruvchining o\'z so\'zlari o\'zgartirmasdan beriladi. \n   *Example:* He said, "I am happy today."\n2. **Indirect / Reported Speech (Ko\'chirma gap):** Kimningdir fikri boshqalar tomonidan yetkaziladi. Bunda asrlar davomida bo\'lganidek, gap bir qadam **o\'tmishga** siljiydi:\n\n**O\'zgarish qoidalari (Zamonlarning bir qadam orqaga ketishi):**\n- Present Simple -> Past Simple\n- Present Continuous -> Past Continuous\n- am/is/are -> was/were\n- here -> there / today -> that day\n\n*Direct:* He said, "I write code."\n*Reported:* He said that he **wrote** code.',
        examples: [
          'Direct: "I can play math games," Leyla said. -> Reported: Leyla said that she could play math games.',
          'Direct: She said, "I have finished." -> Reported: She said that she had finished.'
        ],
        quiz: [
          {
            question: 'Direct: She said, "I like English." reported nushasini toping.',
            options: [
              'She said that she likes English.',
              'She said that she liked English.',
              'She said that she had liked English.',
              'She said that she was liked English.'
            ],
            correctAnswer: 'She said that she liked English.',
            explanation: 'Present Simple ("like") Reported Speech qatlamida Past Simple ("liked") shakliga o\'tadi.'
          }
        ]
      }
    ]
  },
  11: {
    math: [
      {
        id: 'm11-1',
        title: 'Hosila va uning geometrik ma\'nosi',
        description: 'Funksiyaning o\'zgarish tezligini aniqlash fani',
        content: '# Hosila va Oniy Tezlik\n\nHosila (derivative) - funksiyaning ma\'lum bir nuqtadagi o\'zgarish tezligini ifodalaydi. Masalan, jismning harakat qonuniyatidan olingan vaqt bo\'yicha birinchi darajali hosila uning oniy tezligini beradi.\n\nHosila belgisi: `f\'(x)`\n\n**Asosiy hosila jadvali qoidalari:**\n- O\'zgarmas (son) ning hosilasi 0 dir: `(C)\' = 0`\n- `(x^n)\' = n * x^(n-1)`\n- `(sin x)\' = cos x`\n- `(cos x)\' = -sin x`',
        examples: [
          '(x^2)\' = 2x',
          '(5x)\' = 5',
          '(x^3 + 4)\' = 3x^2'
        ],
        quiz: [
          {
            question: "y = x^3 + 2x funksiyaning birinchi tartibli hosilasini toping.",
            options: ['3x^2 + 2', 'x^2 + 2', '3x + 2', '3x^2'],
            correctAnswer: '3x^2 + 2',
            explanation: '(x^3)\' = 3x^2 va (2x)\' = 2. Ularning yig\'indisi 3x^2 + 2 ni tashkil qiladi.'
          }
        ]
      }
    ],
    english: [
      {
        id: 'e11-1',
        title: 'Inversion (Teskari Gaplar)',
        description: 'Gap tuzilishidagi urg\'uni oshirish maqsadida fe\'lni egadan avval joylashtirish san\'ati',
        content: '# Advanced Grammar: Inversion\n\nIngliz tilining eng oliy darajadagi sintaktik qoidalaridan biri bu **Inversion**dir. Urg\'uni yoki hissiyotni kuchaytirish uchun gapdagi odatiy tartib buzilib, yordamchi fe\'l egadan oldinga o\'tkaziladi:\n\nAsosan manfiy yoki cheklovchi ma\'nodagi so\'zlar (Never, Seldom, Rarely, Hardly, No sooner) gapning boshida kelganda inversion sodir bo\'ladi.\n\n- **Oddiy gap:** I have never seen such a beautiful school.\n- **Inversion gap:** **Never have I seen** such a beautiful school.\n\nE\'tibor bering, borki gap xuddi so\'roq gap shaklidatuziladi, lekin undov/gap bo\'lib qoladi.',
        examples: [
          'Hardly had I arrived at school when the bell rang. - Maktabga kelishim bilanoq qo\'ng\'iroq chalindi.',
          'Not only does he study math, but he also learns English. - U nafaqat matematikani o\'qiydi, balki ingliz tilini ham o\'rganadi.'
        ],
        quiz: [
          {
            question: '"Rarely ____ such advanced math problems." - Nuqtala o\'rniga inversionga muvofiq gapni to\'ldiring.',
            options: ['I solve', 'do I solve', 'I do solve', 'solved I'],
            correctAnswer: 'do I solve',
            explanation: '"Rarely" inkor so\'zi gap boshida kelgani uchun yordamchi fe\'l (do) egadan (I) oldinga kelishi kerak: do I solve.'
          }
        ]
      }
    ]
  }
};
