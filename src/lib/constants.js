// src/lib/constants.js
export const STORAGE_KEY = "de_decks";

// Обложки наборов (подбираются по префиксу name.startsWith(...))
export const deckCovers = {
  "Lektion 1.1":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Hallo_Uewagen_2.JPG",
  "Lektion 1.2":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Munich%20-%20Two%20men%20working%20in%20a%20Bicycle%20repair%20shop%20-%205893.jpg",
  "Lektion 3.1":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Senden,%20Dortmund-Ems-Kanal%20--%202024%20--%202144.jpg",
  "Lektion 3 —":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Weltzeituhr%20Alexanderplatz%202020.jpg",
  "Lektion 4":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Street%20in%20Berlin.jpg",
  "Lektion 5 + 6":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Kurf%C3%BCrstendamm%20bei%20Schnee%20und%20K%C3%A4lte.jpg",
};

// Картинки для карточек по front (можно расширять)
export const imageMap = {
  Hallo:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Hallo_Uewagen_2.JPG",
  "Guten Tag":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Brandenburger_Tor_abends.jpg",
  "Guten Morgen":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Senden,%20Dortmund-Ems-Kanal%20--%202024%20--%202144.jpg",
  "Guten Abend":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Kurf%C3%BCrstendamm%20bei%20Schnee%20und%20K%C3%A4lte.jpg",
  "Gute Nacht":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Stars%2002%20(MK).jpg",

  "das Haus":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Fachwerkh%C3%A4user%20in%20Rottweil.jpg",
  "die Straße":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Street%20in%20Berlin.jpg",
  "die Zeit":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Weltzeituhr%20Alexanderplatz%202020.jpg",
  "für immer":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Infinity%20symbol.svg",
  "die Größe":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Steel%20ruler%20closeup.jpg",
};

export const defaultDecks = [
  {
    name: "Lektion 1.2 — Глаголы, профессии, фразы (CORE)",
    tags: ["Lektion1", "Словарь", "Глаголы", "Профессии", "Фразы", "A1"],
    cards: [
      {
        front: "wiederholen",
        back: "повторять",
      },
      {
        front: "arbeiten",
        back: "работать, трудиться",
      },
      {
        front: "reden",
        back: "разговаривать, беседовать",
      },
      {
        front: "antworten",
        back: "отвечать",
      },
      {
        front: "übersetzen",
        back: "переводить",
      },
      {
        front: "kochen",
        back: "готовить",
      },
      {
        front: "joggen",
        back: "бегать (трусцой)",
      },
      {
        front: "reisen",
        back: "путешествовать",
      },
      {
        front: "singen",
        back: "петь",
      },
      {
        front: "der Verkäufer",
        back: "продавец",
      },
      {
        front: "die Kellnerin",
        back: "официантка",
      },
      {
        front: "der Paketzusteller",
        back: "курьер, доставщик",
      },
      {
        front: "der Ingenieur",
        back: "инженер",
      },
      {
        front: "der Kfz‑Mechatroniker",
        back: "автомеханик",
      },
      {
        front: "der Friseur",
        back: "парикмахер",
      },
      {
        front: "die Ärztin",
        back: "женщина-врач",
      },
      {
        front: "der Lehrer",
        back: "учитель",
      },
      {
        front: "zur Schule",
        back: "в школу (направление)",
      },
      {
        front: "wer",
        back: "кто",
      },
      {
        front: "was",
        back: "что",
      },
      {
        front: "wo",
        back: "где",
      },
      {
        front: "wie",
        back: "как",
      },
      {
        front: "arbeiten als",
        back: "работать кем-либо",
      },
      {
        front: "Schönes Wochenende!",
        back: "Хороших выходных!",
      },
      {
        front: "Alles Gute!",
        back: "Всего хорошего!",
      },
      {
        front: "Viel Erfolg!",
        back: "Успехов! Удачи!",
      },
      {
        front: "Ist alles in Ordnung?",
        back: "Всё в порядке?",
      },
      {
        front: "Was ist los?",
        back: "Что случилось?",
      },
      {
        front: "Was gibt es Neues?",
        back: "Что нового?",
      },
      {
        front: "Sehen wir uns noch?",
        back: "Ещё увидимся?",
      },
      {
        front: "gleichfalls / ebenso",
        back: "взаимно, и вам того же",
      },
    ],
  },
  {
    name: "Lektion 3 — Предметы, прилагательные, вопросы (CORE)",
    tags: [
      "Lektion1",
      "Словарь",
      "Существительные",
      "Прилагательные",
      "Вопросы",
      "A1",
    ],
    cards: [
      {
        front: "kein",
        back: "не (отрицание существительного)",
      },
      {
        front: "nur",
        back: "только",
      },
      {
        front: "sehr",
        back: "очень",
      },
      {
        front: "da",
        back: "там",
      },
      {
        front: "aber",
        back: "но",
      },
      {
        front: "später",
        back: "позже",
      },
      {
        front: "die Wohnung",
        back: "квартира",
      },
      {
        front: "der Schrank",
        back: "шкаф",
      },
      {
        front: "das Regal",
        back: "полка",
      },
      {
        front: "der Euro",
        back: "евро",
      },
      {
        front: "die Lampe",
        back: "лампа",
      },
      {
        front: "der Stuhl",
        back: "стул",
      },
      {
        front: "der Sessel",
        back: "кресло",
      },
      {
        front: "der Tisch",
        back: "стол",
      },
      {
        front: "die Stadt",
        back: "город",
      },
      {
        front: "die Lust",
        back: "желание",
      },
      {
        front: "der Käse",
        back: "сыр",
      },
      {
        front: "teuer",
        back: "дорогой",
      },
      {
        front: "praktisch",
        back: "практичный",
      },
      {
        front: "neu",
        back: "новый",
      },
      {
        front: "modern",
        back: "современный",
      },
      {
        front: "bequem",
        back: "удобный",
      },
      {
        front: "günstig",
        back: "выгодный",
      },
      {
        front: "schön",
        back: "красивый",
      },
      {
        front: "klein",
        back: "маленький",
      },
      {
        front: "schade",
        back: "жаль",
      },
      {
        front: "kosten",
        back: "стоить",
      },
      {
        front: "bleiben",
        back: "оставаться",
      },
      {
        front: "wann",
        back: "когда",
      },
      {
        front: "wo",
        back: "где",
      },
      {
        front: "wie",
        back: "как",
      },
    ],
  },
  {
    name: "Lektion 3.1 — Глаголы, существительные, время",
    tags: ["Lektion1", "Словарь", "Глаголы", "Существительные", "Время"],
    cards: [
      {
        front: "wissen",
        back: "знать",
      },
      {
        front: "möchten",
        back: "хотеть (вежливая форма)",
      },
      {
        front: "mögen",
        back: "любить, нравиться",
      },
      {
        front: "tun",
        back: "делать, выполнять",
      },
      {
        front: "Sport treiben",
        back: "заниматься спортом",
      },
      {
        front: "buchstabieren",
        back: "говорить по буквам",
      },
      {
        front: "lesen",
        back: "читать",
      },
      {
        front: "das Buch, die Bücher",
        back: "книга, учебник",
      },
      {
        front: "das Zimmer, die Zimmer",
        back: "комната, номер",
      },
      {
        front: "das Ticket, die Tickets",
        back: "билет",
      },
      {
        front: "der Meerblick, -",
        back: "вид на море",
      },
      {
        front: "der Film, die Filme",
        back: "фильм",
      },
      {
        front: "die Suppe, die Suppen",
        back: "суп",
      },
      {
        front: "der Tee, -",
        back: "чай",
      },
      {
        front: "nach",
        back: "в (направление)",
      },
      {
        front: "nach Hause",
        back: "домой",
      },
      {
        front: "zu Hause",
        back: "дома",
      },
      {
        front: "heute",
        back: "сегодня",
      },
      {
        front: "morgen",
        back: "завтра",
      },
      {
        front: "warum",
        back: "почему",
      },
    ],
  },
  {
    name: "Lektion 4 — Общие фразы, существительные, глаголы (CORE)",
    tags: [
      "Lektion1",
      "Словарь",
      "Фразы",
      "Глаголы",
      "Существительные",
      "A1-A2",
    ],
    cards: [
      {
        front: "dann",
        back: "потом",
      },
      {
        front: "auch",
        back: "тоже, также",
      },
      {
        front: "danke",
        back: "спасибо",
      },
      {
        front: "oder",
        back: "или",
      },
      {
        front: "ein bisschen",
        back: "немного",
      },
      {
        front: "gerade",
        back: "сейчас, как раз",
      },
      {
        front: "etwas",
        back: "что-нибудь",
      },
      {
        front: "allein",
        back: "один, одинокий",
      },
      {
        front: "lecker",
        back: "вкусный",
      },
      {
        front: "formell",
        back: "официальный",
      },
      {
        front: "informell",
        back: "неофициальный",
      },
      {
        front: "alt",
        back: "старый",
      },
      {
        front: "klein",
        back: "маленький",
      },
      {
        front: "bequem",
        back: "удобный",
      },
      {
        front: "trinken",
        back: "пить",
      },
      {
        front: "möchten",
        back: "хотеть (вежливо)",
      },
      {
        front: "nehmen",
        back: "брать",
      },
      {
        front: "machen",
        back: "делать",
      },
      {
        front: "schreiben",
        back: "писать",
      },
      {
        front: "lesen",
        back: "читать",
      },
      {
        front: "bedeuten",
        back: "означать",
      },
      {
        front: "herein",
        back: "внутрь (направление)",
      },
      {
        front: "das Café, die Cafés",
        back: "кафе",
      },
      {
        front: "der Kaffee, -",
        back: "кофе",
      },
      {
        front: "der Kuchen, die Kuchen",
        back: "пирог, пирожное",
      },
      {
        front: "die E-Mail, die E-Mails",
        back: "электронное письмо",
      },
      {
        front: "das Kind, die Kinder",
        back: "ребёнок, дети",
      },
      {
        front: "im Internet surfen",
        back: "сидеть в интернете",
      },
      {
        front: "unser / mein",
        back: "наш / мой",
      },
    ],
  },
  {
    name: "Lektion 5–6 — Действия, время, люди, выражения (CORE)",
    tags: [
      "Lektion1",
      "Словарь",
      "Глаголы",
      "Существительные",
      "Фразы",
      "A1-A2",
    ],
    cards: [
      {
        front: "schwimmen",
        back: "плавать",
      },
      {
        front: "helfen",
        back: "помогать",
      },
      {
        front: "einkaufen",
        back: "закупаться",
      },
      {
        front: "kochen",
        back: "готовить",
      },
      {
        front: "aufräumen",
        back: "убираться",
      },
      {
        front: "fernsehen",
        back: "смотреть телевизор",
      },
      {
        front: "fragen",
        back: "спрашивать",
      },
      {
        front: "besuchen",
        back: "посещать, навещать",
      },
      {
        front: "spazieren gehen",
        back: "гулять",
      },
      {
        front: "verlängern",
        back: "продлевать",
      },
      {
        front: "mitnehmen",
        back: "взять с собой",
      },
      {
        front: "bleiben",
        back: "оставаться",
      },
      {
        front: "der Urlaub, -e",
        back: "отпуск",
      },
      {
        front: "die Oma, -s",
        back: "бабушка",
      },
      {
        front: "der Arzt, die Ärzte",
        back: "врач",
      },
      {
        front: "die Tochter, die Töchter",
        back: "дочь",
      },
      {
        front: "die Aufenthaltserlaubnis",
        back: "разрешение на пребывание (ВНЖ)",
      },
      {
        front: "der Stock, die Stockwerke",
        back: "этаж",
      },
      {
        front: "am Montag",
        back: "в понедельник",
      },
      {
        front: "am Nachmittag",
        back: "после обеда",
      },
      {
        front: "hoffentlich",
        back: "в надежде, надеюсь",
      },
      {
        front: "vielleicht",
        back: "возможно",
      },
      {
        front: "beide",
        back: "оба, обе",
      },
      {
        front: "schneller",
        back: "быстрее",
      },
      {
        front: "länger",
        back: "дольше",
      },
      {
        front: "leider",
        back: "к сожалению",
      },
      {
        front: "zusammen",
        back: "вместе",
      },
      {
        front: "Das ist nicht fair",
        back: "Так не честно",
      },
    ],
  },
  {
    name: "Lektion 7 — Время, вещи, работа (CORE)",
    tags: ["Lektion1", "Словарь", "Глаголы", "Существительные", "Связки", "A2"],
    cards: [
      {
        front: "erst",
        back: "сперва, только",
      },
      {
        front: "einschalten",
        back: "включать",
      },
      {
        front: "einmal",
        back: "один раз",
      },
      {
        front: "der Computer",
        back: "компьютер",
      },
      {
        front: "die Stunde",
        back: "час, урок",
      },
      {
        front: "erste",
        back: "первая",
      },
      {
        front: "ruhig",
        back: "спокойный, тихий",
      },
      {
        front: "öffnen",
        back: "открывать",
      },
      {
        front: "die Mailbox",
        back: "почтовый ящик",
      },
      {
        front: "beantworten",
        back: "отвечать (на вопрос, письмо)",
      },
      {
        front: "halb (Uhrzeit)",
        back: "половина (о времени): halb neun = 8:30",
      },
      {
        front: "der Kindergarten",
        back: "детский сад",
      },
      {
        front: "die wichtigste",
        back: "самая важная",
      },
      {
        front: "das Ding, die Dinge",
        back: "вещь, предмет",
      },
      {
        front: "telefonieren",
        back: "говорить по телефону",
      },
      {
        front: "mit",
        back: "с, вместе с",
      },
      {
        front: "der Kunde, die Kunden",
        back: "клиент",
      },
      {
        front: "mittags",
        back: "в полдень, днём",
      },
      {
        front: "ein paar",
        back: "пара, несколько",
      },
      {
        front: "andere",
        back: "другие",
      },
      {
        front: "die Abteilung",
        back: "отдел",
      },
      {
        front: "essen",
        back: "есть, кушать",
      },
      {
        front: "immer",
        back: "всегда",
      },
      {
        front: "weil",
        back: "потому что",
      },
      {
        front: "lustig",
        back: "весёлый, смешной",
      },
      {
        front: "die Geschichte",
        back: "история, рассказ",
      },
      {
        front: "die Arbeit",
        back: "работа",
      },
      {
        front: "erzählen",
        back: "рассказывать",
      },
      {
        front: "manchmal",
        back: "иногда",
      },
      {
        front: "fragen",
        back: "спрашивать",
      },
    ],
  },
  {
    name: "Lektion 8 — Общение, неделя, работа (CORE)",
    tags: ["Lektion1", "Словарь", "Глаголы", "Местоимения", "Время", "A2"],
    cards: [
      {
        front: "die Cola (die Colas)",
        back: "кола",
      },
      {
        front: "lieb / liebe",
        back: "милый, дорогой (обращение в письме)",
      },
      {
        front: "deine",
        back: "твоя (притяжательное)",
      },
      {
        front: "die Einladung (die Einladungen)",
        back: "приглашение",
      },
      {
        front: "das Wochenende (die Wochenenden)",
        back: "выходные",
      },
      {
        front: "nach (Präp.)",
        back: "в (к городам/странам); после",
      },
      {
        front: "kennenlernen",
        back: "знакомиться, узнавать",
      },
      {
        front: "kennen",
        back: "знать (быть знакомым)",
      },
      {
        front: "ihn",
        back: "его (Akk. от er)",
      },
      {
        front: "sie / Sie",
        back: "она; они; Вы (вежл.)",
      },
      {
        front: "schon",
        back: "уже",
      },
      {
        front: "studieren",
        back: "учиться (в вузе)",
      },
      {
        front: "noch",
        back: "ещё",
      },
      {
        front: "können",
        back: "мочь, уметь",
      },
      {
        front: "seit",
        back: "с (какого момента); в течение",
      },
      {
        front: "die Woche",
        back: "неделя",
      },
      {
        front: "fast",
        back: "почти",
      },
      {
        front: "alles",
        back: "всё",
      },
      {
        front: "ausgeben",
        back: "тратить (деньги)",
      },
      {
        front: "bestimmt",
        back: "определённо, наверняка",
      },
      {
        front: "sich freuen",
        back: "радоваться; ждать с радостью (auf)",
      },
      {
        front: "mich",
        back: "меня (Akk. от ich)",
      },
      {
        front: "viel",
        back: "много",
      },
      {
        front: "der Spaß",
        back: "удовольствие, забава",
      },
      {
        front: "der Gruß (die Grüße)",
        back: "приветствие; наилучшие пожелания",
      },
      {
        front: "an (Dat./Akk.)",
        back: "у/на (верт. пов.); в выражениях времени: am Montag",
      },
      {
        front: "der Arbeitstag (die Arbeitstage)",
        back: "рабочий день",
      },
      {
        front: "meistens",
        back: "чаще всего, обычно",
      },
      {
        front: "gegen (7 Uhr)",
        back: "около (по времени)",
      },
      {
        front: "das Büro (die Büros)",
        back: "офис",
      },
    ],
  },
  {
    name: "Lektion 9–10 — Семья, профессия, действия (CORE)",
    tags: ["Lektion1", "Словарь", "Глаголы", "Существительные", "Фразы", "A2"],
    cards: [
      {
        front: "eigentlich",
        back: "собственно говоря, вообще-то",
      },
      {
        front: "besondere",
        back: "особенные",
      },
      {
        front: "das Geld",
        back: "деньги",
      },
      {
        front: "verheiratet sein",
        back: "быть женатым/замужем",
      },
      {
        front: "der Urlaub, die Urlaube",
        back: "отпуск",
      },
      {
        front: "das Wörterbuch",
        back: "словарь",
      },
      {
        front: "der Lehrer",
        back: "учитель",
      },
      {
        front: "glücklich",
        back: "счастливый",
      },
      {
        front: "das Glück",
        back: "счастье",
      },
      {
        front: "Glück haben",
        back: "повезти",
      },
      {
        front: "die Freizeit",
        back: "свободное время",
      },
      {
        front: "der Schüler",
        back: "ученик",
      },
      {
        front: "der Hund",
        back: "собака",
      },
      {
        front: "der Beruf",
        back: "профессия",
      },
      {
        front: "das Auto (die Autos)",
        back: "машина",
      },
      {
        front: "natürlich",
        back: "конечно",
      },
      {
        front: "gestern",
        back: "вчера",
      },
      {
        front: "anfangen (trennbar)",
        back: "начинать",
      },
      {
        front: "beenden",
        back: "заканчивать",
      },
      {
        front: "sich verlassen (auf + Akk.)",
        back: "полагаться (на кого-л.)",
      },
      {
        front: "lassen",
        back: "оставлять, позволять",
      },
      {
        front: "mitmachen",
        back: "участвовать",
      },
      {
        front: "sich auskennen",
        back: "ориентироваться, разбираться",
      },
      {
        front: "passieren",
        back: "случаться",
      },
      {
        front: "einräumen / aufräumen",
        back: "убирать; расставлять по местам / приводить в порядок",
      },
      {
        front: "einladen (trennbar)",
        back: "приглашать",
      },
      {
        front: "der Bus",
        back: "автобус",
      },
      {
        front: "die Fahrkarte",
        back: "билет, проездной",
      },
      {
        front: "das Zeichen",
        back: "знак",
      },
      {
        front: "das Abenteuer",
        back: "приключение",
      },
    ],
  },
  {
    name: "Дополнения — Пропущенные слова и фразы",
    tags: ["Lektion1", "Дополнения", "Пропущенные", "Глаголы", "Фразы"],
    cards: [
      { front: "dürfen", back: "мочь (разрешено), иметь право" },
      { front: "müssen", back: "должен, нужно" },
      { front: "sollen", back: "следует, должен (по указанию)" },
      { front: "wollen", back: "хотеть" },

      { front: "schlafen", back: "спать" },
      { front: "fahren", back: "ехать, ездить" },
      { front: "sehen", back: "видеть" },
      { front: "laufen", back: "бежать; ходить (быстро)" },
      { front: "sprechen", back: "говорить" },
      { front: "geben", back: "давать" },
      { front: "gefallen", back: "нравиться (кому-л., Dat.)" },
      { front: "bestellen", back: "заказывать" },
      { front: "aufmachen", back: "открывать" },
      { front: "reinkommen", back: "заходить, входить" },
      { front: "bezahlen", back: "платить, оплачивать" },
      { front: "waschen", back: "мыть, стирать" },
      { front: "regnen", back: "идти (о дожде)" },
      { front: "sagen", back: "говорить, сказать" },

      { front: "Rad fahren", back: "кататься на велосипеде" },
      { front: "Was war die Hausaufgabe?", back: "Что было задано?" },
      { front: "Haben Sie gemacht?", back: "Вы сделали?" },
    ],
  },
];

// export const defaultDecks = [
//   {
//     name: "Lektion 1.1 — Приветствия, фразы, глаголы",
//     tags: ["Lektion1", "Словарь", "Артикли", "Глаголы"],
//     cards: [
//       { front: "Hallo", back: "Привет" },
//       { front: "Guten Tag", back: "Добрый день" },
//       { front: "Guten Morgen", back: "Доброе утро" },
//       { front: "Guten Abend", back: "Добрый вечер" },
//       { front: "Gute Nacht", back: "Доброй ночи" },

//       { front: "Wie geht es dir?", back: "Как у тебя дела?" },
//       { front: "Wie geht es Ihnen?", back: "Как у Вас дела?" },
//       { front: "Wie geht es euch?", back: "Как у вас дела?" },
//       { front: "Es geht", back: "Пойдёт" },
//       { front: "Danke! Gut", back: "Спасибо! Хорошо" },

//       { front: "Entschuldigung", back: "Извините" },
//       { front: "Entschuldigen Sie bitte", back: "Извините, пожалуйста" },

//       { front: "Darf ich hinein?", back: "Могу я войти?" },
//       { front: "Darf ich hinaus?", back: "Могу я выйти?" },

//       { front: "ja", back: "да" },
//       { front: "nein", back: "нет" },

//       { front: "Tschüss", back: "пока" },
//       { front: "Auf Wiedersehen", back: "до свидания" },
//       { front: "Bis morgen", back: "до завтра" },
//       { front: "bis bald", back: "до скорого" },

//       { front: "der Tag", back: "день" },
//       { front: "der Morgen", back: "утро" },
//       { front: "der Abend", back: "вечер" },
//       { front: "die Nacht", back: "ночь" },

//       { front: "machen", back: "делать" },
//       { front: "spielen", back: "играть" },
//       { front: "wohnen", back: "жить" },
//       { front: "hören", back: "слушать" },
//       { front: "kommen", back: "приходить" },
//       { front: "lernen", back: "учиться" },
//       { front: "lieben", back: "любить" },
//       { front: "fragen", back: "спрашивать" },
//       { front: "lügen", back: "лгать" },
//       { front: "heißen", back: "называться" },
//     ],
//   },
//   {
//     name: "Lektion 1.2 — Глаголы, профессии, фразы",
//     tags: ["Lektion1", "Словарь", "Глаголы", "Профессии", "Артикли"],
//     cards: [
//       { front: "wiederholen", back: "повторять" },
//       { front: "Ich wiederhole jeden Tag.", back: "Я повторяю каждый день." },

//       { front: "arbeiten", back: "работать, трудиться" },
//       { front: "Wo arbeitest du?", back: "Где ты работаешь?" },

//       { front: "reden", back: "разговаривать, беседовать" },
//       { front: "Wir reden Deutsch.", back: "Мы говорим по-немецки." },

//       { front: "antworten", back: "отвечать, давать ответ" },
//       { front: "Er antwortet schnell.", back: "Он быстро отвечает." },

//       { front: "übersetzen", back: "переводить" },

//       { front: "kochen", back: "готовить" },
//       { front: "Sie kocht jeden Tag.", back: "Она готовит каждый день." },

//       { front: "joggen", back: "бегать (трусцой)" },
//       { front: "Du joggst gern.", back: "Ты любишь бегать." },

//       { front: "reisen", back: "путешествовать" },
//       { front: "Er reist oft.", back: "Он часто путешествует." },

//       { front: "singen", back: "петь" },
//       { front: "Sie singt schön.", back: "Она красиво поёт." },

//       { front: "der Verkäufer", back: "продавец" },
//       {
//         front: "Der Verkäufer arbeitet hier.",
//         back: "Продавец работает здесь.",
//       },

//       { front: "die Kellnerin", back: "официантка" },
//       {
//         front: "Die Kellnerin работает im Restaurant.",
//         back: "Официантка работает в ресторане.",
//       },

//       { front: "der Paketzusteller", back: "курьер, доставщик" },

//       { front: "der Ingenieur", back: "инженер" },
//       { front: "Ich arbeite als Ingenieur.", back: "Я работаю инженером." },

//       { front: "der Kfz-Mechatroniker", back: "автомеханик" },
//       {
//         front: "Der Kfz-Mechatroniker repariert Autos.",
//         back: "Автомеханик чинит машины.",
//       },

//       { front: "der Friseur", back: "парикмахер" },
//       {
//         front: "Arbeitest du als Friseur?",
//         back: "Ты работаешь парикмахером?",
//       },

//       { front: "die Ärztin", back: "женщина-врач" },
//       { front: "Ich arbeite als Ärztin.", back: "Я работаю врачом." },

//       { front: "der Lehrer", back: "учитель" },
//       {
//         front: "Der Lehrer erklärt die Aufgabe.",
//         back: "Учитель объясняет задание.",
//       },

//       { front: "zur Schule", back: "в школу" },
//       { front: "Ich gehe zur Schule.", back: "Я иду в школу." },

//       { front: "wo", back: "где" },
//       { front: "wie", back: "как" },

//       { front: "Sehen wir uns noch", back: "Увидимся ещё" },
//       { front: "Schönes Wochenende!", back: "Хороших выходных!" },
//       { front: "gleichfalls / ebenso", back: "Взаимно, и вам того же" },
//       { front: "Alles Gute!", back: "Всего хорошего!" },
//       { front: "Viel Erfolg!", back: "Успехов! Удачи!" },

//       { front: "Ist alles in Ordnung?", back: "Всё в порядке?" },
//       { front: "Was ist los?", back: "Что случилось?" },
//       { front: "Was gibt es Neues?", back: "Что нового?" },
//       { front: "Was war die Hausaufgabe?", back: "Что было задано?" },
//       { front: "Haben Sie gemacht?", back: "Вы сделали?" },

//       { front: "arbeiten als", back: "работать кем-либо" },
//       {
//         front: "Ich arbeite nicht als Ingenieur.",
//         back: "Я не работаю инженером.",
//       },

//       { front: "wer", back: "кто" },
//       { front: "was", back: "что" },
//     ],
//   },
//   {
//     name: "Lektion 3.1 — Глаголы, существительные, время",
//     tags: ["Lektion1", "Словарь", "Глаголы", "Существительные", "Время"],
//     cards: [
//       { front: "wissen", back: "знать" },
//       { front: "möchten", back: "хотеть (вежливая форма)" },
//       { front: "mögen", back: "любить, нравиться" },
//       { front: "tun", back: "делать, выполнять" },
//       { front: "Sport treiben", back: "заниматься спортом" },
//       { front: "buchstabieren", back: "говорить по буквам" },
//       { front: "lesen", back: "читать" },

//       { front: "das Buch, die Bücher", back: "книга, учебник" },
//       { front: "das Zimmer, die Zimmer", back: "комната, номер" },
//       { front: "das Ticket, die Tickets", back: "билет" },
//       { front: "der Meerblick, -", back: "вид на море" },
//       { front: "der Film, die Filme", back: "фильм" },
//       { front: "die Suppe, die Suppen", back: "суп" },
//       { front: "der Tee, -", back: "чай" },

//       { front: "nach", back: "в (направление)" },
//       { front: "nach Hause", back: "домой" },
//       { front: "zu Hause", back: "дома" },

//       { front: "heute", back: "сегодня" },
//       { front: "morgen", back: "завтра" },

//       { front: "warum", back: "почему" },
//     ],
//   },
//   {
//     name: "Lektion 3 — Предметы, прилагательные, вопросы",
//     tags: ["Lektion1", "Словарь", "Артикли", "Прилагательные", "Вопросы"],
//     cards: [
//       { front: "kein", back: "не (отрицание)" },
//       { front: "Ich habe kein Geld.", back: "У меня нет денег." },

//       { front: "nur", back: "только" },
//       { front: "Ich lerne nur Deutsch.", back: "Я учу только немецкий." },

//       { front: "sehr", back: "очень" },
//       { front: "Ich spiele sehr gut.", back: "Я очень хорошо играю." },

//       { front: "da", back: "там" },
//       { front: "aber", back: "но" },

//       { front: "später", back: "позже" },
//       { front: "Wir gehen später nach Hause.", back: "Мы пойдём домой позже." },

//       { front: "die Wohnung, -en", back: "квартира" },
//       { front: "Die Wohnung ist klein.", back: "Квартира маленькая." },

//       { front: "der Schrank, die Schränke", back: "шкаф" },
//       { front: "Der Schrank ist teuer.", back: "Шкаф дорогой." },

//       { front: "das Regal, die Regale", back: "полка" },
//       { front: "Das Regal ist praktisch.", back: "Полка практичная." },

//       { front: "der Euro, -", back: "евро" },

//       { front: "die Lampe, die Lampen", back: "лампа" },
//       { front: "Die Lampe kostet 10 Euro.", back: "Лампа стоит 10 евро." },

//       { front: "der Stuhl, die Stühle", back: "стул" },
//       { front: "Der Stuhl ist bequem.", back: "Стул удобный." },

//       { front: "der Sessel, die Sessel", back: "кресло" },
//       { front: "der Tisch, die Tische", back: "стол" },

//       { front: "die Stadt, die Städte", back: "город" },
//       {
//         front: "Ich wohne in der Stadt Bischkek.",
//         back: "Я живу в городе Бишкек.",
//       },

//       { front: "die Lust, -", back: "желание" },
//       { front: "Ich habe keine Lust.", back: "У меня нет желания." },

//       { front: "der Käse, -", back: "сыр" },

//       { front: "teuer", back: "дорогой" },
//       { front: "Das Ticket ist teuer.", back: "Билет дорогой." },

//       { front: "praktisch", back: "практичный" },
//       { front: "neu", back: "новый" },
//       { front: "Die Wohnung ist neu.", back: "Квартира новая." },

//       { front: "modern", back: "современный" },
//       { front: "bequem", back: "удобный" },
//       { front: "günstig", back: "выгодный" },

//       { front: "schön", back: "красивый" },
//       { front: "Bischkek ist schön.", back: "Бишкек красивый." },

//       { front: "klein", back: "маленький" },

//       { front: "schade", back: "жаль" },
//       { front: "Das ist schade.", back: "Это жаль." },

//       { front: "kosten", back: "стоить" },
//       { front: "Was kostet die Lampe?", back: "Сколько стоит лампа?" },

//       { front: "bleiben", back: "оставаться" },
//       { front: "Ich bleibe in Bischkek.", back: "Я остаюсь в Бишкеке." },

//       { front: "wann", back: "когда" },
//       { front: "Wann kommst du?", back: "Когда ты придёшь?" },

//       { front: "wo", back: "где" },
//       { front: "wie", back: "как" },

//       { front: "Ist alles in Ordnung?", back: "Всё в порядке?" },
//       { front: "Was ist los?", back: "Что случилось?" },
//       { front: "Was gibt es Neues?", back: "Что нового?" },
//       { front: "Was war die Hausaufgabe?", back: "Что было задано?" },
//     ],
//   },
//   {
//     name: "Lektion 4 — Общие фразы, существительные, глаголы",
//     tags: ["Lektion1", "Словарь", "Артикли", "Глаголы", "Фразы"],
//     cards: [
//       { front: "dann", back: "потом" },

//       { front: "auch", back: "тоже, также" },
//       { front: "Ich spiele auch Fußball.", back: "Я тоже играю в футбол." },

//       { front: "danke", back: "спасибо" },
//       { front: "Danke für deine Hilfe.", back: "Спасибо за твою помощь." },

//       { front: "oder", back: "или, либо" },
//       {
//         front: "Möchtest du Wasser или Kaffee trinken?",
//         back: "Хочешь воду или кофе?",
//       },

//       { front: "ein bisschen", back: "немного" },
//       {
//         front: "Ich spreche ein bisschen auf Deutsch.",
//         back: "Я немного говорю на немецком.",
//       },

//       { front: "gerade", back: "как раз, сейчас" },
//       { front: "Ich esse gerade.", back: "Я сейчас ем." },

//       { front: "etwas", back: "что-нибудь" },
//       {
//         front: "Ich habe etwas für dich.",
//         back: "У меня есть кое-что для тебя.",
//       },

//       { front: "allein", back: "один, одинокий" },
//       {
//         front: "Ich wohne allein in Bischkek.",
//         back: "Я живу один в Бишкеке.",
//       },

//       { front: "lecker", back: "вкусный" },
//       { front: "Meine Mutter kocht lecker.", back: "Моя мама вкусно готовит." },

//       { front: "formell", back: "официальный" },
//       { front: "informell", back: "неофициальный" },

//       { front: "alt", back: "старый" },
//       {
//         front: "Mein Großvater ist уже sehr alt.",
//         back: "Мой дедушка уже очень старый.",
//       },

//       { front: "klein", back: "маленький" },
//       { front: "Die Kinder sind noch klein.", back: "Дети ещё маленькие." },

//       { front: "bequem", back: "удобный" },
//       {
//         front: "Das Bett hier ist nicht bequem.",
//         back: "Эта кровать неудобная.",
//       },

//       { front: "trinken", back: "пить" },
//       { front: "Trinkst du Kaffee?", back: "Ты пьёшь кофе?" },

//       { front: "möchten", back: "хотеть (вежливо)" },
//       {
//         front: "Wir möchten in Deutschland arbeiten.",
//         back: "Мы хотим работать в Германии.",
//       },

//       { front: "nehmen", back: "брать" },
//       { front: "Ich nehme Wasser.", back: "Я беру воду." },

//       { front: "machen", back: "делать" },
//       {
//         front: "Machst du jeden Tag Hausaufgaben?",
//         back: "Ты делаешь каждый день ДЗ?",
//       },

//       { front: "schreiben", back: "писать" },
//       { front: "Ich schreibe einen Brief.", back: "Я пишу письмо." },

//       { front: "lesen", back: "читать" },
//       { front: "Liest du gern Bücher?", back: "Ты любишь читать книги?" },

//       { front: "bedeuten", back: "значить, означать" },
//       { front: "Что означает dieses Wort?", back: "Что означает это слово?" },

//       { front: "herein", back: "внутрь" },
//       { front: "Darf ich herein?", back: "Можно войти?" },

//       { front: "das Cafe, die Cafes", back: "кафе" },
//       { front: "Arbeitest du im Cafe?", back: "Ты работаешь в кафе?" },

//       { front: "der Kaffee, -", back: "кофе" },

//       { front: "der Kuchen, die Kuchen", back: "пирог" },
//       { front: "Wie viel kostet Kuchen?", back: "Сколько стоит пирог?" },

//       { front: "die E-Mail, die E-Mails", back: "электронная почта" },
//       {
//         front: "Ich schreibe eine E-Mail.",
//         back: "Я пишу электронное письмо.",
//       },

//       { front: "das Kind, die Kinder", back: "ребёнок, дети" },
//       { front: "Die Kinder spielen im Garten.", back: "Дети играют в саду." },

//       { front: "im Internet surfen", back: "сидеть в интернете" },
//       { front: "Surfst du im Internet?", back: "Ты сидишь в интернете?" },

//       { front: "unser", back: "наш" },
//       {
//         front: "Unser Lehrer ist sehr nett.",
//         back: "Наш учитель очень добрый.",
//       },

//       { front: "mein", back: "мой" },
//       { front: "Das ist mein Buch.", back: "Это моя книга." },
//     ],
//   },
//   {
//     name: "Lektion 5 + 6 — Действия, время, люди, выражения",
//     tags: ["Lektion1", "Словарь", "Глаголы", "Существительные", "Фразы"],
//     cards: [
//       { front: "schwimmen", back: "плавать" },
//       { front: "Er schwimmt im See.", back: "Он плавает в озере." },

//       { front: "helfen", back: "помогать" },
//       {
//         front: "Der Lehrer hilft uns mit den Hausaufgaben.",
//         back: "Учитель помогает нам с домашним заданием.",
//       },

//       { front: "einkaufen", back: "закупаться" },
//       {
//         front: "Ich gehe сегодня einkaufen.",
//         back: "Я сегодня иду за покупками.",
//       },

//       { front: "kochen", back: "готовить" },
//       {
//         front: "Was kannst du gut kochen?",
//         back: "Что ты можешь хорошо готовить?",
//       },

//       { front: "aufräumen", back: "убираться" },
//       {
//         front: "Ich räume am Wochenende auf.",
//         back: "Я на выходных убираюсь.",
//       },

//       { front: "fernsehen", back: "смотреть телевизор" },
//       {
//         front: "Ich sehe jeden Abend fern.",
//         back: "Я смотрю телевизор каждый вечер.",
//       },

//       { front: "fragen", back: "спрашивать" },
//       { front: "Darf ich Sie fragen?", back: "Могу ли я Вас спросить?" },

//       { front: "besuchen", back: "посещать, навещать" },
//       {
//         front: "Ich besuche Deutschkurs bei IWEX jeden Tag.",
//         back: "Я посещаю курсы немецкого в IWEX каждый день.",
//       },

//       { front: "spazieren gehen", back: "гулять" },
//       {
//         front: "Möchtest du mit mir spazieren gehen?",
//         back: "Ты хочешь пойти со мной на прогулку?",
//       },

//       { front: "verlängern", back: "продлевать" },
//       {
//         front: "Kannst du bitte das Ticket verlängern?",
//         back: "Можешь, пожалуйста, продлить билет?",
//       },

//       { front: "mitnehmen", back: "взять с собой" },
//       {
//         front: "Was möchtest du nach Deutschland mitnehmen?",
//         back: "Что ты хотел бы взять с собой в Германию?",
//       },

//       { front: "bleiben", back: "оставаться" },
//       {
//         front: "Ich möchte in Deutschland für 3 Monate bleiben.",
//         back: "Я хотел бы остаться в Германии на 3 месяца.",
//       },

//       { front: "der Urlaub, -", back: "отпуск" },
//       { front: "Ich nehme im Sommer Urlaub.", back: "Я беру отпуск летом." },

//       { front: "die Oma, -s", back: "бабушка" },
//       {
//         front: "Oma, wie geht es dir?",
//         back: "Бабушка, как ты себя чувствуешь?",
//       },

//       { front: "der Arzt, die Ärzte", back: "врач" },
//       { front: "Er arbeitet als Arzt.", back: "Он работает врачом." },

//       { front: "die Tochter, die Töchter", back: "дочь" },
//       {
//         front: "Meine Tochter spielt gerne Klavier.",
//         back: "Моя дочь любит играть на пианино.",
//       },

//       {
//         front: "die Aufenthaltserlaubnis, die Aufenthaltserlaubnisse",
//         back: "вид на жительство",
//       },
//       {
//         front: "Er hat Aufenthaltserlaubnis für drei Jahre.",
//         back: "У него разрешение на пребывание на три года.",
//       },

//       { front: "der Stock, die Stockwerke", back: "этаж" },

//       { front: "am Montag", back: "в понедельник" },
//       {
//         front: "Am Montag fahren wir nach Talas.",
//         back: "В понедельник мы поедем в Талас.",
//       },

//       { front: "am Nachmittag", back: "после обеда" },
//       {
//         front: "Am Nachmittag gehen wir ins Kino.",
//         back: "После обеда мы идём в кино.",
//       },

//       { front: "hoffentlich", back: "в надежде" },
//       {
//         front: "Hoffentlich kommt er bald.",
//         back: "Надеюсь, он скоро придёт.",
//       },

//       { front: "vielleicht", back: "возможно" },
//       { front: "Vielleicht ist er zu Hause.", back: "Возможно, он дома." },

//       { front: "beide", back: "оба, обе" },
//       { front: "Beide Teams spielen gut.", back: "Оба клуба играют хорошо." },

//       { front: "schneller", back: "быстрее" },
//       {
//         front: "Er läuft schneller als ich.",
//         back: "Он бегает быстрее, чем я.",
//       },

//       { front: "länger", back: "дольше" },
//       {
//         front: "Ich kann heute länger arbeiten.",
//         back: "Я могу работать сегодня дольше.",
//       },

//       { front: "leider", back: "к сожалению" },
//       {
//         front: "Ich kann leider heute nicht kommen.",
//         back: "К сожалению, я не смогу сегодня прийти.",
//       },

//       { front: "zusammen", back: "вместе" },
//       {
//         front: "Wir möchten zusammen in Deutschland arbeiten.",
//         back: "Мы хотели бы вместе работать в Германии.",
//       },

//       { front: "Das ist nicht fair.", back: "Так не честно." },
//     ],
//   },
//   {
//     name: "Lektion 1.2– 5 — Глаголы и базовая лексика (A1 — 60)",
//     tags: ["Lektion1", "Словарь", "Глаголы", "Артикли", "A1"],
//     cards: [
//       {
//         front: "wiederholen — Ich wiederhole jeden Tag.",
//         back: "повторять — Я повторяю каждый день.",
//       },
//       {
//         front: "arbeiten — Wo arbeitest du?",
//         back: "работать — Где ты работаешь?",
//       },
//       {
//         front: "reden — Wir reden Deutsch.",
//         back: "разговаривать — Мы говорим по-немецки.",
//       },
//       {
//         front: "antworten — Er antwortet schnell.",
//         back: "отвечать — Он быстро отвечает.",
//       },
//       {
//         front: "kochen — Sie kocht jeden Tag.",
//         back: "готовить — Она готовит каждый день.",
//       },
//       {
//         front: "reisen — Er reist oft.",
//         back: "путешествовать — Он часто путешествует.",
//       },
//       { front: "singen — Sie singt schön.", back: "петь — Она красиво поёт." },

//       {
//         front: "kosten — Was kostet die Lampe?",
//         back: "стоить — Сколько стоит лампа?",
//       },
//       {
//         front: "lesen — Liest du gern Bücher?",
//         back: "читать — Ты любишь читать книги?",
//       },
//       {
//         front: "schreiben — Ich schreibe einen Brief.",
//         back: "писать — Я пишу письмо.",
//       },
//       {
//         front: "machen — Machst du jeden Tag Hausaufgaben?",
//         back: "делать — Ты делаешь каждый день домашнее задание?",
//       },
//       {
//         front: "übersetzen — Ich übersetze den Text.",
//         back: "переводить — Я перевожу текст.",
//       },
//       { front: "joggen — Du joggst gern.", back: "бегать — Ты любишь бегать." },
//       { front: "lieben — Ich liebe Kaffee.", back: "любить — Я люблю кофе." },
//       {
//         front: "fragen — Darf ich Sie fragen?",
//         back: "спрашивать — Могу ли я Вас спросить?",
//       },
//       { front: "lügen — Er lügt nie.", back: "лгать — Он никогда не лжёт." },

//       {
//         front: "der Verkäufer — Der Verkäufer arbeitet hier.",
//         back: "продавец — Продавец работает здесь.",
//       },
//       {
//         front: "die Kellnerin — Die Kellnerin arbeitet im Restaurant.",
//         back: "официантка — Официантка работает в ресторане.",
//       },
//       {
//         front: "der Ingenieur — Ich arbeite als Ingenieur.",
//         back: "инженер — Я работаю инженером.",
//       },
//       {
//         front: "der Friseur — Arbeitest du als Friseur?",
//         back: "парикмахер — Ты работаешь парикмахером?",
//       },
//       {
//         front: "die Ärztin — Ich arbeite als Ärztin.",
//         back: "врач (ж) — Я работаю врачом.",
//       },

//       {
//         front: "die Wohnung — Die Wohnung ist klein.",
//         back: "квартира — Квартира маленькая.",
//       },
//       {
//         front: "der Schrank — Der Schrank ist teuer.",
//         back: "шкаф — Шкаф дорогой.",
//       },
//       {
//         front: "das Regal — Das Regal ist praktisch.",
//         back: "полка — Полка практичная.",
//       },
//       {
//         front: "die Lampe — Die Lampe kostet 10 Euro.",
//         back: "лампа — Лампа стоит 10 евро.",
//       },
//       {
//         front: "der Tisch — Der Tisch ist groß.",
//         back: "стол — Стол большой.",
//       },
//       {
//         front: "der Stuhl — Der Stuhl ist bequem.",
//         back: "стул — Стул удобный.",
//       },
//       {
//         front: "der Sessel — Der Sessel ist weich.",
//         back: "кресло — Кресло мягкое.",
//       },
//       {
//         front: "die Stadt — Ich wohne in der Stadt Bischkek.",
//         back: "город — Я живу в городе Бишкек.",
//       },
//       { front: "der Käse — Der Käse ist frisch.", back: "сыр — Сыр свежий." },

//       {
//         front: "teuer — Das Ticket ist teuer.",
//         back: "дорогой — Билет дорогой.",
//       },
//       {
//         front: "praktisch — Das ist praktisch.",
//         back: "практичный — Это практично.",
//       },
//       { front: "neu — Die Wohnung ist neu.", back: "новый — Квартира новая." },
//       {
//         front: "modern — Die Küche ist modern.",
//         back: "современный — Кухня современная.",
//       },
//       {
//         front: "bequem — Der Stuhl ist bequem.",
//         back: "удобный — Стул удобный.",
//       },
//       {
//         front: "günstig — Das Ticket ist günstig.",
//         back: "выгодный — Билет выгодный.",
//       },
//       {
//         front: "schön — Bischkek ist schön.",
//         back: "красивый — Бишкек красивый.",
//       },
//       {
//         front: "klein — Das Zimmer ist klein.",
//         back: "маленький — Комната маленькая.",
//       },
//       { front: "schade — Das ist schade.", back: "жаль — Это жаль." },

//       { front: "wo — Wo wohnst du?", back: "где — Где ты живёшь?" },
//       { front: "wie — Wie heißt du?", back: "как — Как тебя зовут?" },
//       { front: "wann — Wann kommst du?", back: "когда — Когда ты придёшь?" },
//       {
//         front: "warum — Warum lernst du Deutsch?",
//         back: "почему — Почему ты учишь немецкий?",
//       },

//       {
//         front: "nur — Ich lerne nur Deutsch.",
//         back: "только — Я учу только немецкий.",
//       },
//       {
//         front: "sehr — Ich spiele sehr gut.",
//         back: "очень — Я очень хорошо играю.",
//       },
//       { front: "da — Ich bin da.", back: "там — Я там/я здесь (на месте)." },
//       {
//         front: "aber — Es ist leicht, aber langweilig.",
//         back: "но — Это легко, но скучно.",
//       },
//       {
//         front: "später — Wir gehen später nach Hause.",
//         back: "позже — Мы пойдём домой позже.",
//       },
//       {
//         front: "danke — Danke für deine Hilfe.",
//         back: "спасибо — Спасибо за твою помощь.",
//       },
//       {
//         front: "kein — Ich habe kein Geld.",
//         back: "не (отрицание) — У меня нет денег.",
//       },

//       {
//         front: "die Lust — Ich habe keine Lust.",
//         back: "желание — У меня нет желания.",
//       },
//       {
//         front: "alt — Mein Großvater ist alt.",
//         back: "старый — Мой дедушка старый.",
//       },
//       {
//         front: "formell — Das ist sehr formell.",
//         back: "официальный — Это очень официально.",
//       },
//       {
//         front: "informell — Das Treffen ist informell.",
//         back: "неофициальный — Встреча неофициальная.",
//       },
//       {
//         front: "lecker — Meine Mutter kocht lecker.",
//         back: "вкусный — Моя мама вкусно готовит.",
//       },

//       { front: "mein — Das ist mein Buch.", back: "мой — Это моя книга." },
//       {
//         front: "unser — Unser Lehrer ist sehr nett.",
//         back: "наш — Наш учитель очень добрый.",
//       },
//       {
//         front: "etwas — Ich habe etwas für dich.",
//         back: "что-нибудь — У меня есть кое-что для тебя.",
//       },
//       {
//         front: "auch — Ich spiele auch Fußball.",
//         back: "тоже, также — Я тоже играю футбол.",
//       },
//     ],
//   },
//   {
//     name: "Lektion 1-6 — Приветствия и базовая лексика (исправлено, A1)",
//     tags: ["Lektion1", "Словарь", "Фразы", "Глаголы", "A1"],
//     cards: [
//       { front: "Hallo!", back: "Привет!" },
//       { front: "Guten Tag (der Tag)!", back: "Добрый день" },
//       { front: "Guten Morgen (der Morgen)!", back: "Доброе утро" },
//       { front: "Guten Abend (der Abend)!", back: "Добрый вечер" },
//       { front: "Gute Nacht (die Nacht)!", back: "Доброй ночи" },

//       { front: "Wie geht es dir?", back: "Как у тебя дела?" },
//       { front: "Wie geht es Ihnen?", back: "Как у Вас дела?" },
//       { front: "Wie geht es euch?", back: "Как у вас дела?" },
//       { front: "Es geht.", back: "Пойдёт." },
//       { front: "Danke, gut.", back: "Спасибо, хорошо." },

//       { front: "Entschuldigung!", back: "Извините!" },
//       { front: "Entschuldigen Sie bitte.", back: "Извините, пожалуйста." },

//       { front: "Darf ich hinein?", back: "Могу я войти?" },
//       { front: "Darf ich hinaus?", back: "Могу я выйти?" },

//       { front: "ja", back: "да" },
//       { front: "nein", back: "нет" },

//       { front: "Tschüss!", back: "Пока!" },
//       { front: "Auf Wiedersehen!", back: "До свидания!" },
//       { front: "Bis morgen!", back: "До завтра!" },
//       { front: "Bis bald!", back: "До скорого!" },

//       { front: "der Tag — Der Tag ist lang.", back: "день — День длинный." },
//       {
//         front: "der Morgen — Heute Morgen war kalt.",
//         back: "утро — Сегодня утром было холодно.",
//       },
//       {
//         front: "der Abend — Heute Abend habe ich Zeit.",
//         back: "вечер — Сегодня вечером у меня есть время.",
//       },
//       {
//         front: "die Nacht — In der Nacht ist es still.",
//         back: "ночь — Ночью тихо.",
//       },

//       {
//         front: "machen — Machst du jeden Tag Hausaufgaben?",
//         back: "делать — Ты делаешь каждый день домашнее задание?",
//       },
//       {
//         front: "spielen — Wir spielen Fußball.",
//         back: "играть — Мы играем в футбол.",
//       },
//       {
//         front: "wohnen — Ich wohne in Bischkek.",
//         back: "жить — Я живу в Бишкеке.",
//       },
//       {
//         front: "hören — Hörst du Musik?",
//         back: "слушать — Ты слушаешь музыку?",
//       },
//       {
//         front: "kommen — Kommst du morgen?",
//         back: "приходить — Ты придёшь завтра?",
//       },
//       {
//         front: "lernen — Ich lerne Deutsch.",
//         back: "учиться — Я учу немецкий.",
//       },
//       { front: "lieben — Ich liebe Kaffee.", back: "любить — Я люблю кофе." },
//       {
//         front: "fragen — Darf ich Sie fragen?",
//         back: "спрашивать — Могу ли я Вас спросить?",
//       },
//       { front: "lügen — Er lügt nie.", back: "лгать — Он никогда не лжёт." },
//       { front: "heißen — Wie heißt du?", back: "называться — Как тебя зовут?" },
//       {
//         front: "wiederholen — Ich wiederhole jeden Tag.",
//         back: "повторять — Я повторяю каждый день.",
//       },

//       {
//         front: "arbeiten — Wo arbeitest du?",
//         back: "работать, трудиться — Где ты работаешь?",
//       },
//       {
//         front: "reden — Wir reden Deutsch.",
//         back: "разговаривать — Мы говорим по-немецки.",
//       },
//       {
//         front: "antworten — Er antwortet schnell.",
//         back: "отвечать — Он быстро отвечает.",
//       },
//       {
//         front: "übersetzen — Ich übersetze den Text.",
//         back: "переводить — Я перевожу текст.",
//       },
//       {
//         front: "kochen — Sie kocht jeden Tag.",
//         back: "готовить — Она готовит каждый день.",
//       },
//       { front: "joggen — Du joggst gern.", back: "бегать — Ты любишь бегать." },
//       {
//         front: "reisen — Er reist oft.",
//         back: "путешествовать — Он часто путешествует.",
//       },
//       { front: "singen — Sie singt schön.", back: "петь — Она красиво поёт." },

//       { front: "Sehen wir uns noch?", back: "Увидимся ещё?" },
//       { front: "Schönes Wochenende!", back: "Хороших выходных!" },
//       { front: "gleichfalls / ebenso.", back: "Взаимно / и вам того же." },
//       { front: "Alles Gute!", back: "Всего хорошего!" },
//       { front: "Viel Erfolg!", back: "Успехов! Удачи!" },

//       { front: "Ist alles in Ordnung?", back: "Всё в порядке?" },
//       { front: "Was ist los?", back: "Что случилось?" },
//       { front: "Was gibt es Neues?", back: "Что нового?" },
//       { front: "Was war die Hausaufgabe?", back: "Что было задано?" },
//       { front: "Haben Sie es gemacht?", back: "Вы сделали (это)?" },

//       {
//         front: "arbeiten als — Ich arbeite nicht als Ingenieur.",
//         back: "работать кем-либо — Я не работаю инженером.",
//       },
//       {
//         front: "zur Schule — Ich gehe zur Schule.",
//         back: "в школу — Я иду в школу.",
//       },

//       { front: "wer — Wer ist das?", back: "кто — Кто это?" },
//       { front: "was — Was machst du?", back: "что — Что ты делаешь?" },
//       {
//         front: "kein — Ich habe kein Geld.",
//         back: "не/никакой (отрицание существительного) — У меня нет денег.",
//       },

//       {
//         front: "nur — Ich lerne nur Deutsch.",
//         back: "только — Я учу только немецкий.",
//       },
//       {
//         front: "sehr — Ich spiele sehr gut.",
//         back: "очень — Я очень хорошо играю.",
//       },
//       {
//         front: "da — Ich bin gleich da.",
//         back: "там/тут (на месте) — Я скоро буду на месте.",
//       },
//       {
//         front: "aber — Es ist leicht, aber langweilig.",
//         back: "но — Это легко, но скучно.",
//       },
//       {
//         front: "später — Wir gehen später nach Hause.",
//         back: "позже — Мы пойдём домой позже.",
//       },

//       {
//         front: "die Wohnung, -en — Die Wohnung ist klein.",
//         back: "квартира — Квартира маленькая.",
//       },
//       {
//         front: "der Schrank, die Schränke — Der Schrank ist teuer.",
//         back: "шкаф — Шкаф дорогой.",
//       },
//       {
//         front: "das Regal, die Regale — Das Regal ist praktisch.",
//         back: "полка — Полка практичная.",
//       },
//       {
//         front: "der Euro — Das Ticket kostet 10 Euro.",
//         back: "евро — Билет стоит 10 евро.",
//       },
//       {
//         front: "die Lampe, die Lampen — Die Lampe kostet 10 Euro.",
//         back: "лампа — Лампа стоит 10 евро.",
//       },
//       {
//         front: "der Stuhl, die Stühle — Der Stuhl ist bequem.",
//         back: "стул — Стул удобный.",
//       },
//       {
//         front: "der Sessel, die Sessel — Der Sessel ist weich.",
//         back: "кресло — Кресло мягкое.",
//       },
//       {
//         front: "der Tisch, die Tische — Der Tisch ist groß.",
//         back: "стол — Стол большой.",
//       },
//       {
//         front: "die Stadt, die Städte — Ich wohne in der Stadt Bischkek.",
//         back: "город — Я живу в городе Бишкек.",
//       },
//       {
//         front: "die Lust — Ich habe keine Lust.",
//         back: "желание — У меня нет желания.",
//       },
//       { front: "der Käse — Der Käse ist frisch.", back: "сыр — Сыр свежий." },

//       {
//         front: "teuer — Das Ticket ist teuer.",
//         back: "дорогой — Билет дорогой.",
//       },
//       {
//         front: "praktisch — Das ist praktisch.",
//         back: "практичный — Это практично.",
//       },
//       { front: "neu — Die Wohnung ist neu.", back: "новый — Квартира новая." },
//       {
//         front: "modern — Die Küche ist modern.",
//         back: "современный — Кухня современная.",
//       },
//       {
//         front: "bequem — Das Bett ist bequem.",
//         back: "удобный — Кровать удобная.",
//       },
//       {
//         front: "günstig — Das Ticket ist günstig.",
//         back: "выгодный — Билет выгодный.",
//       },
//       {
//         front: "schön — Bischkek ist schön.",
//         back: "красивый — Бишкек красивый.",
//       },
//       {
//         front: "klein — Das Zimmer ist klein.",
//         back: "маленький — Комната маленькая.",
//       },
//       { front: "schade — Das ist schade.", back: "жаль — Это жаль." },

//       {
//         front: "kosten — Was kostet die Lampe?",
//         back: "стоить — Сколько стоит лампа?",
//       },
//       {
//         front: "bleiben — Ich bleibe in Bischkek.",
//         back: "оставаться — Я остаюсь в Бишкеке.",
//       },

//       { front: "wann — Wann kommst du?", back: "когда — Когда ты придёшь?" },
//       { front: "wo — Wo wohnst du?", back: "где — Где ты живёшь?" },
//       { front: "wie — Wie heißt du?", back: "как — Как тебя зовут?" },

//       {
//         front: "wissen — Ich weiß es nicht.",
//         back: "знать — Я этого не знаю.",
//       },
//       {
//         front: "möchten — Möchten Sie Wasser oder Kaffee?",
//         back: "хотеть (вежливо) — Вы хотите воду или кофе?",
//       },
//       {
//         front: "mögen — Ich mag Tee.",
//         back: "любить, нравиться — Мне нравится чай.",
//       },
//       {
//         front: "tun — Was tust du am Wochenende?",
//         back: "делать, выполнять — Что ты делаешь на выходных?",
//       },
//       {
//         front: "Sport treiben — Ich treibe jeden Tag Sport.",
//         back: "заниматься спортом — Я каждый день занимаюсь спортом.",
//       },
//       {
//         front: "buchstabieren — Können Sie das buchstabieren?",
//         back: "говорить по буквам — Вы можете произнести это по буквам?",
//       },
//       {
//         front: "lesen — Liest du gern Bücher?",
//         back: "читать — Ты любишь читать книги?",
//       },

//       {
//         front: "das Buch, die Bücher — Das Buch ist neu.",
//         back: "книга, учебник — Книга новая.",
//       },
//       {
//         front: "das Zimmer, die Zimmer — Mein Zimmer ist klein.",
//         back: "комната, номер — Моя комната маленькая.",
//       },
//       {
//         front: "das Ticket, die Tickets — Ich habe ein Ticket.",
//         back: "билет — У меня есть билет.",
//       },
//       {
//         front: "der Meerblick, die Meerblicke — Das Zimmer hat Meerblick.",
//         back: "вид на море — Из номера вид на море.",
//       },
//       {
//         front: "der Film, die Filme — Der Film war interessant.",
//         back: "фильм — Фильм был интересный.",
//       },
//       {
//         front: "die Suppe, die Suppen — Die Suppe ist lecker.",
//         back: "суп — Суп вкусный.",
//       },
//       { front: "der Tee — Ich trinke Tee.", back: "чай — Я пью чай." },

//       {
//         front: "nach — Wir fahren nach Deutschland.",
//         back: "в (направление) — Мы едем в Германию.",
//       },
//       {
//         front: "nach Hause — Ich gehe nach Hause.",
//         back: "домой — Я иду домой.",
//       },
//       { front: "zu Hause — Ich bin zu Hause.", back: "дома — Я дома." },

//       {
//         front: "heute — Heute lerne ich viel.",
//         back: "сегодня — Сегодня я много учусь.",
//       },
//       {
//         front: "morgen — Morgen habe ich Zeit.",
//         back: "завтра — Завтра у меня есть время.",
//       },

//       {
//         front: "warum — Warum lernst du Deutsch?",
//         back: "почему — Почему ты учишь немецкий?",
//       },
//       {
//         front: "dann — Dann gehen wir nach Hause.",
//         back: "потом — Потом мы пойдём домой.",
//       },

//       {
//         front: "auch — Ich spiele auch Fußball.",
//         back: "тоже, также — Я тоже играю в футбол.",
//       },
//       {
//         front: "danke — Danke für deine Hilfe.",
//         back: "спасибо — Спасибо за твою помощь.",
//       },
//       {
//         front: "oder — Möchtest du Wasser oder Kaffee?",
//         back: "или, либо — Хочешь воду или кофе?",
//       },
//       {
//         front: "ein bisschen — Ich spreche ein bisschen Deutsch.",
//         back: "немного — Я немного говорю по-немецки.",
//       },
//       {
//         front: "gerade — Ich esse gerade.",
//         back: "как раз, сейчас — Я сейчас ем.",
//       },
//       {
//         front: "etwas — Ich habe etwas für dich.",
//         back: "что-нибудь — У меня есть кое-что для тебя.",
//       },

//       {
//         front: "allein — Ich wohne allein in Bischkek.",
//         back: "один, одинокий — Я живу один в Бишкеке.",
//       },
//       {
//         front: "lecker — Meine Mutter kocht lecker.",
//         back: "вкусный — Моя мама вкусно готовит.",
//       },
//       {
//         front: "formell — Das ist sehr formell.",
//         back: "официальный — Это очень официально.",
//       },
//       {
//         front: "informell — Das Treffen ist informell.",
//         back: "неофициальный — Встреча неофициальная.",
//       },
//       {
//         front: "alt — Mein Großvater ist schon sehr alt.",
//         back: "старый — Мой дедушка уже очень старый.",
//       },
//       {
//         front: "bequem — Der Stuhl ist bequem.",
//         back: "удобный — Стул удобный.",
//       },

//       { front: "trinken — Trinkst du Kaffee?", back: "пить — Ты пьёшь кофе?" },
//       { front: "nehmen — Ich nehme Wasser.", back: "брать — Я беру воду." },
//       {
//         front: "schreiben — Ich schreibe einen Brief.",
//         back: "писать — Я пишу письмо.",
//       },
//       {
//         front: "bedeuten — Was bedeutet dieses Wort?",
//         back: "значить, означать — Что означает это слово?",
//       },
//       { front: "herein — Darf ich herein?", back: "внутрь — Можно войти?" },

//       {
//         front: "das Café, die Cafés — Arbeitest du im Café?",
//         back: "кафе — Ты работаешь в кафе?",
//       },
//       {
//         front: "der Kaffee — Ich trinke gern Kaffee.",
//         back: "кофе — Я люблю пить кофе.",
//       },
//       {
//         front: "der Kuchen, die Kuchen — Wie viel kostet der Kuchen?",
//         back: "пирог, торт — Сколько стоит торт?",
//       },
//       {
//         front: "die E-Mail, die E-Mails — Ich schreibe eine E-Mail.",
//         back: "электронная почта — Я пишу электронное письмо.",
//       },
//       {
//         front: "das Kind, die Kinder — Die Kinder spielen im Garten.",
//         back: "ребёнок, дети — Дети играют в саду.",
//       },

//       {
//         front: "im Internet surfen — Surfst du im Internet?",
//         back: "сидеть в интернете — Ты сидишь в интернете?",
//       },
//       {
//         front: "unser — Unser Lehrer ist sehr nett.",
//         back: "наш — Наш учитель очень добрый.",
//       },
//       { front: "mein — Das ist mein Buch.", back: "мой — Это моя книга." },

//       {
//         front: "schwimmen — Er schwimmt im See.",
//         back: "плавать — Он плавает в озере.",
//       },
//       {
//         front: "helfen — Der Lehrer hilft uns bei den Hausaufgaben.",
//         back: "помогать — Учитель помогает нам с домашним заданием.",
//       },
//       {
//         front: "einkaufen — Ich gehe heute einkaufen.",
//         back: "закупаться — Я сегодня иду за покупками.",
//       },
//       {
//         front: "kochen — Was kannst du gut kochen?",
//         back: "готовить — Что ты можешь хорошо готовить?",
//       },
//       {
//         front: "aufräumen — Ich räume am Wochenende auf.",
//         back: "убираться — Я на выходных убираюсь.",
//       },
//       {
//         front: "fernsehen — Ich sehe jeden Abend fern.",
//         back: "смотреть телевизор — Я смотрю телевизор каждый вечер.",
//       },
//       {
//         front: "besuchen — Ich besuche jeden Tag den Deutschkurs bei IWEX.",
//         back: "посещать, навещать — Я каждый день посещаю курс немецкого в IWEX.",
//       },
//       {
//         front: "spazieren gehen — Möchtest du mit mir spazieren gehen?",
//         back: "гулять — Ты хочешь пойти со мной на прогулку?",
//       },
//       {
//         front: "verlängern — Kannst du bitte das Ticket verlängern?",
//         back: "продлевать — Можешь, пожалуйста, продлить билет?",
//       },
//       {
//         front: "mitnehmen — Was möchtest du nach Deutschland mitnehmen?",
//         back: "взять с собой — Что ты хотел(а) бы взять с собой в Германию?",
//       },
//       {
//         front: "bleiben — Ich möchte in Deutschland drei Monate bleiben.",
//         back: "оставаться — Я хотел(а) бы остаться в Германии три месяца.",
//       },

//       {
//         front: "der Urlaub — Ich nehme im Sommer Urlaub.",
//         back: "отпуск — Я беру отпуск летом.",
//       },
//       {
//         front: "die Oma, -s — Oma, wie geht es dir?",
//         back: "бабушка — Бабушка, как ты себя чувствуешь?",
//       },
//       {
//         front: "der Arzt, die Ärzte — Er arbeitet als Arzt.",
//         back: "врач — Он работает врачом.",
//       },
//       {
//         front: "die Tochter, die Töchter — Meine Tochter spielt gern Klavier.",
//         back: "дочь — Моя дочь любит играть на пианино.",
//       },
//       {
//         front:
//           "die Aufenthaltserlaubnis, die Aufenthaltserlaubnisse — Er hat eine Aufenthaltserlaubnis für drei Jahre.",
//         back: "разрешение на пребывание (ВНЖ) — У него разрешение на пребывание на три года.",
//       },
//       {
//         front: "der Stock, die Stockwerke — Ich wohne im dritten Stock.",
//         back: "этаж — Я живу на третьем этаже.",
//       },

//       {
//         front: "am Montag — Am Montag fahren wir nach Talas.",
//         back: "в понедельник — В понедельник мы поедем в Талас.",
//       },
//       {
//         front: "am Nachmittag — Am Nachmittag gehen wir ins Kino.",
//         back: "после обеда (днём) — После обеда мы идём в кино.",
//       },

//       {
//         front: "hoffentlich — Hoffentlich kommt er bald.",
//         back: "надеюсь — Надеюсь, он скоро придёт.",
//       },
//       {
//         front: "vielleicht — Vielleicht ist er zu Hause.",
//         back: "возможно — Возможно, он дома.",
//       },
//       {
//         front: "beide — Beide Teams spielen gut.",
//         back: "оба, обе — Оба клуба играют хорошо.",
//       },
//       {
//         front: "schneller — Er läuft schneller als ich.",
//         back: "быстрее — Он бегает быстрее, чем я.",
//       },
//       {
//         front: "länger — Ich kann heute länger arbeiten.",
//         back: "дольше — Я могу сегодня работать дольше.",
//       },
//       {
//         front: "leider — Ich kann leider heute nicht kommen.",
//         back: "к сожалению — К сожалению, я не смогу сегодня прийти.",
//       },
//       {
//         front: "zusammen — Wir möchten zusammen in Deutschland arbeiten.",
//         back: "вместе — Мы хотели бы вместе работать в Германии.",
//       },
//       { front: "Das ist nicht fair.", back: "Это нечестно." },

//       {
//         front: "der Verkäufer — Der Verkäufer arbeitet hier.",
//         back: "продавец — Продавец работает здесь.",
//       },
//       {
//         front: "die Kellnerin — Die Kellnerin arbeitet im Restaurant.",
//         back: "официантка — Официантка работает в ресторане.",
//       },
//       {
//         front: "der Paketzusteller — Der Paketzusteller bringt ein Paket.",
//         back: "курьер, доставщик — Курьер приносит посылку.",
//       },
//       {
//         front: "der Ingenieur — Ich arbeite als Ingenieur.",
//         back: "инженер — Я работаю инженером.",
//       },
//       {
//         front: "der Kfz-Mechatroniker — Der Kfz-Mechatroniker repariert Autos.",
//         back: "автомеханик — Автомеханик чинит машины.",
//       },
//       {
//         front: "der Friseur — Arbeitest du als Friseur?",
//         back: "парикмахер — Ты работаешь парикмахером?",
//       },
//       {
//         front: "die Ärztin — Ich arbeite als Ärztin.",
//         back: "женщина-врач — Я работаю врачом.",
//       },
//       {
//         front: "der Lehrer — Der Lehrer erklärt die Aufgabe.",
//         back: "учитель — Учитель объясняет задание.",
//       },
//     ],
//   },
//   {
//     name: "Lektion 1.2 — Первая очередь (после 1.1)",
//     tags: ["Lektion1", "Приоритет:P1", "Словарь", "Глаголы", "A1"],
//     cards: [
//       { front: "sein — Ich bin zu Hause.", back: "быть — Я дома." },
//       { front: "haben — Ich habe Zeit.", back: "иметь — У меня есть время." },

//       { front: "wer — Wer ist das?", back: "кто — Кто это?" },
//       { front: "was — Was machst du?", back: "что — Что ты делаешь?" },
//       { front: "wie — Wie heißt du?", back: "как — Как тебя зовут?" },
//       { front: "wo — Wo wohnst du?", back: "где — Где ты живёшь?" },
//       { front: "wann — Wann kommst du?", back: "когда — Когда ты придёшь?" },
//       {
//         front: "warum — Warum lernst du Deutsch?",
//         back: "почему — Почему ты учишь немецкий?",
//       },

//       {
//         front: "nur — Ich lerne nur Deutsch.",
//         back: "только — Я учу только немецкий.",
//       },
//       {
//         front: "auch — Ich spiele auch Fußball.",
//         back: "тоже, также — Я тоже играю футбол.",
//       },
//       {
//         front: "aber — Es ist leicht, aber langweilig.",
//         back: "но — Это легко, но скучно.",
//       },
//       {
//         front: "oder — Möchtest du Wasser oder Kaffee?",
//         back: "или, либо — Хочешь воду или кофе?",
//       },
//       {
//         front: "sehr — Ich spiele sehr gut.",
//         back: "очень — Я очень хорошо играю.",
//       },
//       {
//         front: "ein bisschen — Ich spreche ein bisschen Deutsch.",
//         back: "немного — Я немного говорю по-немецки.",
//       },
//       {
//         front: "etwas — Ich habe etwas für dich.",
//         back: "что-нибудь — У меня есть кое-что для тебя.",
//       },
//       {
//         front: "dann — Dann gehen wir nach Hause.",
//         back: "потом — Потом мы пойдём домой.",
//       },
//       {
//         front: "kein — Ich habe kein Geld.",
//         back: "не/никакой (отрицание сущ.) — У меня нет денег.",
//       },

//       {
//         front: "nach — Wir fahren nach Deutschland.",
//         back: "в (направление) — Мы едем в Германию.",
//       },
//       {
//         front: "nach Hause — Ich gehe nach Hause.",
//         back: "домой — Я иду домой.",
//       },
//       { front: "zu Hause — Ich bin zu Hause.", back: "дома — Я дома." },
//       {
//         front: "heute — Heute lerne ich viel.",
//         back: "сегодня — Сегодня я много учусь.",
//       },
//       {
//         front: "morgen — Morgen habe ich Zeit.",
//         back: "завтра — Завтра у меня есть время.",
//       },

//       { front: "nehmen — Ich nehme Wasser.", back: "брать — Я беру воду." },
//       { front: "trinken — Trinkst du Kaffee?", back: "пить — Ты пьёшь кофе?" },
//       {
//         front: "lesen — Liest du gern Bücher?",
//         back: "читать — Ты любишь читать книги?",
//       },
//       {
//         front: "schreiben — Ich schreibe eine E-Mail.",
//         back: "писать — Я пишу электронное письмо.",
//       },
//       {
//         front: "kosten — Was kostet die Lampe?",
//         back: "стоить — Сколько стоит лампа?",
//       },
//       {
//         front: "bleiben — Ich bleibe in Bischkek.",
//         back: "оставаться — Я остаюсь в Бишкеке.",
//       },
//       {
//         front: "helfen — Der Lehrer hilft uns bei den Hausaufgaben.",
//         back: "помогать — Учитель помогает нам с домашним заданием.",
//       },
//       {
//         front: "möchten — Wir möchten in Deutschland arbeiten.",
//         back: "хотеть (вежливо) — Мы хотим работать в Германии.",
//       },
//       {
//         front: "mögen — Ich mag Tee.",
//         back: "любить, нравиться — Мне нравится чай.",
//       },
//       {
//         front: "wissen — Ich weiß es nicht.",
//         back: "знать — Я этого не знаю.",
//       },
//       {
//         front: "buchstabieren — Können Sie das buchstabieren?",
//         back: "говорить по буквам — Вы можете произнести это по буквам?",
//       },
//       { front: "herein — Darf ich herein?", back: "внутрь — Можно войти?" },

//       {
//         front: "die Wohnung — Die Wohnung ist neu.",
//         back: "квартира — Квартира новая.",
//       },
//       {
//         front: "der Stuhl — Der Stuhl ist bequem.",
//         back: "стул — Стул удобный.",
//       },
//       {
//         front: "das Zimmer — Mein Zimmer ist klein.",
//         back: "комната — Моя комната маленькая.",
//       },
//       {
//         front: "die Lampe — Die Lampe kostet 10 Euro.",
//         back: "лампа — Лампа стоит 10 евро.",
//       },
//       {
//         front: "der Tisch — Der Tisch ist groß.",
//         back: "стол — Стол большой.",
//       },
//       {
//         front: "die Stadt — Ich wohne in der Stadt Bischkek.",
//         back: "город — Я живу в городе Бишкек.",
//       },
//       {
//         front: "der Euro — Das Ticket kostet 10 Euro.",
//         back: "евро — Билет стоит 10 евро.",
//       },
//       { front: "das Buch — Das Buch ist neu.", back: "книга — Книга новая." },
//       {
//         front: "das Café — Arbeitest du im Café?",
//         back: "кафе — Ты работаешь в кафе?",
//       },
//       {
//         front: "der Lehrer — Der Lehrer erklärt die Aufgabe.",
//         back: "учитель — Учитель объясняет задание.",
//       },
//       {
//         front: "die Ärztin — Ich arbeite als Ärztin.",
//         back: "женщина-врач — Я работаю врачом.",
//       },
//     ],
//   },
//   {
//     name: "Lektion 1.3 — Вторая очередь",
//     tags: ["Lektion1", "Приоритет:P2", "Словарь", "Глаголы", "A1"],
//     cards: [
//       {
//         front: "aufräumen — Ich räume am Wochenende auf.",
//         back: "убираться — Я на выходных убираюсь.",
//       },
//       {
//         front: "fernsehen — Ich sehe jeden Abend fern.",
//         back: "смотреть телевизор — Я каждый вечер смотрю телевизор.",
//       },
//       {
//         front: "mitnehmen — Was möchtest du mitnehmen?",
//         back: "взять с собой — Что ты хотел(а) бы взять с собой?",
//       },
//       {
//         front: "besuchen — Ich besuche den Deutschkurs.",
//         back: "посещать — Я посещаю курс немецкого.",
//       },
//       {
//         front: "einkaufen — Ich gehe heute einkaufen.",
//         back: "закупаться — Я сегодня иду за покупками.",
//       },
//       {
//         front: "spazieren gehen — Gehst du mit mir spazieren?",
//         back: "гулять — Ты пойдёшь со мной на прогулку?",
//       },
//       {
//         front: "verlängern — Kannst du das Ticket verlängern?",
//         back: "продлевать — Можешь продлить билет?",
//       },
//       {
//         front: "Sport treiben — Ich treibe jeden Tag Sport.",
//         back: "заниматься спортом — Я каждый день занимаюсь спортом.",
//       },
//       {
//         front: "kochen — Was kannst du gut kochen?",
//         back: "готовить — Что ты хорошо умеешь готовить?",
//       },
//       {
//         front: "sprechen — Ich spreche ein bisschen Deutsch.",
//         back: "говорить — Я немного говорю по-немецки.",
//       },

//       {
//         front: "teuer — Das Ticket ist teuer.",
//         back: "дорогой — Билет дорогой.",
//       },
//       {
//         front: "günstig — Das Ticket ist günstig.",
//         back: "выгодный — Билет выгодный.",
//       },
//       {
//         front: "bequem — Das Bett ist bequem.",
//         back: "удобный — Кровать удобная.",
//       },
//       { front: "neu — Die Wohnung ist neu.", back: "новый — Квартира новая." },
//       {
//         front: "modern — Die Küche ist modern.",
//         back: "современный — Кухня современная.",
//       },
//       {
//         front: "schön — Bischkek ist schön.",
//         back: "красивый — Бишкек красивый.",
//       },
//       {
//         front: "klein — Das Zimmer ist klein.",
//         back: "маленький — Комната маленькая.",
//       },
//       { front: "schade — Das ist schade.", back: "жаль — Это жаль." },
//       {
//         front: "lecker — Die Suppe ist lecker.",
//         back: "вкусный — Суп вкусный.",
//       },
//       {
//         front: "allein — Ich wohne allein.",
//         back: "один, одинокий — Я живу один.",
//       },
//       {
//         front: "formell — Das ist sehr formell.",
//         back: "официальный — Это очень официально.",
//       },
//       {
//         front: "informell — Das Treffen ist informell.",
//         back: "неофициальный — Встреча неофициальная.",
//       },
//       {
//         front: "hoffentlich — Hoffentlich kommt er bald.",
//         back: "надеюсь — Надеюсь, он скоро придёт.",
//       },
//       {
//         front: "vielleicht — Vielleicht ist er zu Hause.",
//         back: "возможно — Возможно, он дома.",
//       },
//       {
//         front: "leider — Ich kann leider nicht kommen.",
//         back: "к сожалению — К сожалению, я не смогу прийти.",
//       },
//       {
//         front: "zusammen — Wir lernen zusammen.",
//         back: "вместе — Мы учимся вместе.",
//       },
//       {
//         front: "schneller — Er läuft schneller als ich.",
//         back: "быстрее — Он бегает быстрее, чем я.",
//       },
//       {
//         front: "länger — Ich kann heute länger arbeiten.",
//         back: "дольше — Я могу сегодня работать дольше.",
//       },

//       {
//         front: "der Schrank — Der Schrank ist teuer.",
//         back: "шкаф — Шкаф дорогой.",
//       },
//       {
//         front: "das Regal — Das Regal ist praktisch.",
//         back: "полка — Полка практичная.",
//       },
//       {
//         front: "der Sessel — Der Sessel ist weich.",
//         back: "кресло — Кресло мягкое.",
//       },
//       { front: "der Käse — Der Käse ist frisch.", back: "сыр — Сыр свежий." },
//       {
//         front: "die E-Mail — Ich schreibe eine E-Mail.",
//         back: "электронная почта — Я пишу электронное письмо.",
//       },
//       {
//         front: "der Kuchen — Wie viel kostet der Kuchen?",
//         back: "пирог/торт — Сколько стоит торт?",
//       },
//       {
//         front: "der Kaffee — Ich trinke gern Kaffee.",
//         back: "кофе — Я люблю пить кофе.",
//       },
//     ],
//   },
//   {
//     name: "Lektion 1.4 — Третья очередь",
//     tags: ["Lektion1", "Приоритет:P3", "Словарь", "Фразы", "A1"],
//     cards: [
//       { front: "Sehen wir uns noch?", back: "Увидимся ещё?" },
//       { front: "Gleichfalls! / Ebenso.", back: "Взаимно! / И вам того же." },
//       { front: "Alles Gute!", back: "Всего хорошего!" },
//       { front: "Viel Erfolg!", back: "Успехов! Удачи!" },
//       { front: "Ist alles in Ordnung?", back: "Всё в порядке?" },
//       { front: "Was ist los?", back: "Что случилось?" },
//       { front: "Was gibt es Neues?", back: "Что нового?" },
//       { front: "Was war die Hausaufgabe?", back: "Что было задано?" },
//       { front: "Haben Sie es gemacht?", back: "Вы сделали это?" },

//       {
//         front: "am Montag — Am Montag fahren wir nach Talas.",
//         back: "в понедельник — В понедельник мы поедем в Талас.",
//       },
//       {
//         front: "am Nachmittag — Am Nachmittag gehen wir ins Kino.",
//         back: "после обеда (днём) — После обеда мы идём в кино.",
//       },

//       {
//         front: "der Film — Der Film war interessant.",
//         back: "фильм — Фильм был интересный.",
//       },
//       {
//         front: "die Suppe — Die Suppe ist lecker.",
//         back: "суп — Суп вкусный.",
//       },
//       {
//         front: "das Ticket — Ich habe ein Ticket.",
//         back: "билет — У меня есть билет.",
//       },
//       {
//         front: "der Meerblick — Das Zimmer hat Meerblick.",
//         back: "вид на море — Из номера вид на море.",
//       },
//       {
//         front: "der Urlaub — Ich nehme im Sommer Urlaub.",
//         back: "отпуск — Я беру отпуск летом.",
//       },
//       {
//         front: "die Oma — Oma, wie geht es dir?",
//         back: "бабушка — Бабушка, как ты себя чувствуешь?",
//       },
//       {
//         front: "der Arzt — Er arbeitet als Arzt.",
//         back: "врач — Он работает врачом.",
//       },
//       {
//         front: "die Tochter — Meine Tochter spielt Klavier.",
//         back: "дочь — Моя дочь играет на пианино.",
//       },
//       {
//         front:
//           "die Aufenthaltserlaubnis — Er hat eine Aufenthaltserlaubnis für drei Jahre.",
//         back: "разрешение на пребывание (ВНЖ) — У него ВНЖ на три года.",
//       },
//       {
//         front: "der Stock — Ich wohne im dritten Stock.",
//         back: "этаж — Я живу на третьем этаже.",
//       },
//       {
//         front: "das Kind — Die Kinder spielen im Garten.",
//         back: "ребёнок — Дети играют в саду.",
//       },

//       {
//         front: "im Internet surfen — Surfst du im Internet?",
//         back: "сидеть в интернете — Ты сидишь в интернете?",
//       },
//       {
//         front: "unser — Unser Lehrer ist sehr nett.",
//         back: "наш — Наш учитель очень добрый.",
//       },
//       { front: "mein — Das ist mein Buch.", back: "мой — Это моя книга." },
//     ],
//   },
// ];
