# עדכון אקטואליה — זוכרים, מבינים ופועלים

אתר סטטי בעברית (RTL) המיועד לעדכון קצר, ברור ומכבד על אירועים חשובים בישראל
ובעולם היהודי. הפוקוס המרכזי הוא זכר הנופלים, ולצידו חדשות בארץ, מצב יהודים
בעולם, פעילות אינטראקטיבית ומידע אזרחי מועיל (תרומת דם וכרטיס אדי).

האתר עובד כ-**frontend בלבד**: HTML / CSS / JavaScript, ללא Docker, ללא backend,
ללא בסיס נתונים וללא שרת. כל המידע נשמר בקבצים מקומיים בתיקיית `data/` וניתן
לעריכה ידנית בקלות.

> ⚠️ הנתונים באתר הם **נתוני דמו** עם הסימון "יש לעדכן לפי מקור רשמי".
> אין להזין שמות אמיתיים של נופלים ללא אימות מול מקור רשמי (יזכור / דובר צה"ל).

---

## מבנה הפרויקט

```
newsPage/
├── index.html               # מבנה העמוד
├── style.css                # עיצוב (RTL, רספונסיבי, אנימציות)
├── script.js                # לוגיקה: כרטיסים, חיפוש, סינון, משחק
├── data/
│   ├── fallen.js            # נתוני נופלים
│   ├── newsIsrael.js        # חדשות בארץ
│   ├── worldJewish.js       # יהודים בעולם
│   └── activityQuestions.js # שאלות המשחק "מה היית עושה?"
├── images/
│   └── fallen/
│       └── placeholder.svg  # תמונת ברירת מחדל
└── README.md
```

---

## הרצה מקומית

מכיוון שזהו אתר סטטי, אפשר פשוט **לפתוח את `index.html` בדפדפן**.

להרצה מלאה ותקינה (מומלץ), הפעילו שרת מקומי פשוט מתוך תיקיית הפרויקט:

```bash
# Python 3
python3 -m http.server 8000
```

ואז פתחו בדפדפן: `http://localhost:8000`

> אם משתמשים ב-VS Code, אפשר גם להשתמש בתוסף **Live Server**.

---

## איך מחליפים חדשות

ערכו את הקובץ המתאים בתיקיית `data/`:

- **חדשות בארץ** → `data/newsIsrael.js`
- **יהודים בעולם** → `data/worldJewish.js`

כל ידיעה היא אובייקט. פשוט עדכנו את הטקסטים והקישור (`source`). שמרו את הקובץ
ורעננו את הדף.

לחדשות בארץ, שדה `category` חייב להיות אחד מאלה (משמש לסינון):
`"ביטחון"`, `"חברה"`, `"כלכלה"`, `"ממשלה"`.

---

## איך מוסיפים חייל

1. פתחו את `data/fallen.js`.
2. העתיקו אובייקט קיים והדביקו אותו בתוך הרשימה.
3. עדכנו את השדות לפי מקור רשמי:

```js
{
  name: "שם החייל",
  age: 21,
  rank: "סמ\"ר",
  unit: "שם היחידה",
  date: "28.06.2026",
  place: "דרום רצועת עזה",
  shortText: "נפל בקרב במהלך פעילות מבצעית.",
  fullText: "מידע נוסף על נסיבות נפילתו ועל חייו.",
  image: "images/fallen/example.jpg",
  source: "https://..."
}
```

4. שמרו תמונה בתיקייה `images/fallen/` והזינו את הנתיב בשדה `image`.
   אם אין תמונה — השאירו `images/fallen/placeholder.svg`.

---

## איך מעלים ל-GitHub Pages

1. צרו מאגר (repository) חדש ב-GitHub והעלו אליו את כל קבצי הפרויקט:

```bash
git init
git add .
git commit -m "אתר עדכון אקטואליה"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

2. במאגר ב-GitHub: **Settings → Pages**.
3. תחת **Build and deployment → Source** בחרו **Deploy from a branch**.
4. בחרו ענף `main` ותיקייה `/ (root)`, ולחצו **Save**.
5. לאחר כדקה האתר יהיה זמין בכתובת:
   `https://USERNAME.github.io/REPO/`

---

## מקורות אמינים

- אתר יזכור של משרד הביטחון — https://www.izkor.gov.il
- אתר צה"ל — https://www.idf.il
- gov.il / משרד החוץ — https://www.gov.il
- מד"א — https://www.mdais.org
- כרטיס אדי / משרד הבריאות — https://www.gov.il/en/service/organ_donation_adi_card
- Ynet, כאן 11, Times of Israel, The Jerusalem Post
- ADL, AJC, אוניברסיטת תל אביב (דוחות אנטישמיות)
