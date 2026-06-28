/* ============================================================
   עדכון אקטואליה — script.js
   רינדור כרטיסים, חיפוש, סינון, משחק, וכפתור "חזרה למעלה".
   הנתונים נטענים מהקבצים שבתיקיית data/.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- עזר: בריחה מ-HTML למניעת בעיות ---------- */
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------- תאריך עדכון אחרון ---------- */
  function setLastUpdate() {
    var el = document.getElementById("lastUpdate");
    if (!el) return;
    var now = new Date();
    var dd = String(now.getDate()).padStart(2, "0");
    var mm = String(now.getMonth() + 1).padStart(2, "0");
    var yyyy = now.getFullYear();
    el.textContent = dd + "." + mm + "." + yyyy;
  }

  /* ============================================================
     בלוק נופלים — סקציית הנצחה (memorial)
     ============================================================ */
  function memorialHTML(item, index) {
    return (
      '<article class="memorial-card">' +
        '<div class="memorial-media">' +
          '<img class="memorial-photo" src="' + esc(item.image) + '" ' +
            'alt="' + esc(item.name) + '" loading="lazy" ' +
            'onerror="this.src=\'images/fallen/placeholder.svg\'" />' +
        '</div>' +
        '<div class="memorial-info">' +
          (item.verified
            ? ""
            : '<span class="card-tag">יש לעדכן לפי מקור רשמי</span>') +
          '<span class="memorial-candle" aria-hidden="true">🕯️</span>' +
          '<h3 class="memorial-name">' + esc(item.name) + '</h3>' +
          '<div class="card-meta memorial-meta">' +
            '<span>גיל ' + esc(item.age) + '</span>' +
            '<span>' + esc(item.rank) + '</span>' +
            '<span>' + esc(item.unit) + '</span>' +
          '</div>' +
          '<p class="card-place">' + esc(item.place) + ' · ' + esc(item.date) + '</p>' +
          '<p class="memorial-short">' + esc(item.shortText) + '</p>' +
          '<div class="card-more" id="fallen-more-' + index + '">' +
            '<div class="card-more-inner">' +
              '<p>' + esc(item.fullText) + '</p>' +
              (item.source
                ? '<p><a href="' + esc(item.source) + '" target="_blank" rel="noopener noreferrer">מקור</a></p>'
                : "") +
            '</div>' +
          '</div>' +
          '<div class="card-actions">' +
            '<button class="btn read-more-btn" data-toggle="fallen-more-' + index + '">קרא עוד</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function initFallen() {
    var wrap = document.getElementById("fallenMemorial");
    if (!wrap) return;
    var data = (typeof fallenData !== "undefined") ? fallenData : [];
    if (!data.length) {
      wrap.innerHTML = '<p class="empty-state">אין נתונים להצגה כעת.</p>';
      return;
    }
    wrap.innerHTML = data.map(memorialHTML).join("");
  }

  /* ============================================================
     בלוק חדשות בארץ
     ============================================================ */
  function newsCardHTML(item, index) {
    return (
      '<article class="card news-card" data-category="' + esc(item.category) + '">' +
        '<div class="card-body">' +
          '<span class="card-tag">' + esc(item.category) + '</span>' +
          '<h3 class="card-name">' + esc(item.title) + '</h3>' +
          '<p class="card-text">' + esc(item.shortText) + '</p>' +
          '<div class="card-more" id="news-more-' + index + '">' +
            '<div class="card-more-inner">' +
              '<p><strong>למה זה חשוב:</strong> ' + esc(item.whyImportant) + '</p>' +
              '<p>' + esc(item.fullText) + '</p>' +
              (item.source
                ? '<p><a href="' + esc(item.source) + '" target="_blank" rel="noopener noreferrer">מקור</a></p>'
                : "") +
            '</div>' +
          '</div>' +
          '<div class="card-actions">' +
            '<button class="btn read-more-btn" data-toggle="news-more-' + index + '">פרטים נוספים</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderNews(list) {
    var grid = document.getElementById("newsGrid");
    var empty = document.getElementById("newsEmpty");
    if (!grid) return;

    if (!list.length) {
      grid.innerHTML = "";
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    grid.innerHTML = list.map(newsCardHTML).join("");
  }

  function initNews() {
    var data = (typeof newsIsraelData !== "undefined") ? newsIsraelData : [];
    renderNews(data);

    var filterBar = document.getElementById("newsFilter");
    if (filterBar) {
      filterBar.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter-btn");
        if (!btn) return;

        filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");

        var f = btn.getAttribute("data-filter");
        if (f === "all") { renderNews(data); return; }
        renderNews(data.filter(function (item) { return item.category === f; }));
      });
    }
  }

  /* ============================================================
     בלוק יהודים בעולם
     ============================================================ */
  function worldCardHTML(item, index) {
    return (
      '<article class="card world-card">' +
        '<div class="card-body">' +
          '<span class="card-tag">' + esc(item.location) + '</span>' +
          '<h3 class="card-name">' + esc(item.title) + '</h3>' +
          '<p class="card-text">' + esc(item.shortText) + '</p>' +
          '<div class="card-more" id="world-more-' + index + '">' +
            '<div class="card-more-inner">' +
              '<p><strong>הקשר לקהילות יהודיות:</strong> ' + esc(item.whyRelated) + '</p>' +
              '<p>' + esc(item.fullText) + '</p>' +
              (item.source
                ? '<p><a href="' + esc(item.source) + '" target="_blank" rel="noopener noreferrer">מקור</a></p>'
                : "") +
            '</div>' +
          '</div>' +
          '<div class="card-actions">' +
            '<button class="btn read-more-btn" data-toggle="world-more-' + index + '">פרטים נוספים</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function initWorld() {
    var grid = document.getElementById("worldGrid");
    if (!grid) return;
    var data = (typeof worldJewishData !== "undefined") ? worldJewishData : [];
    grid.innerHTML = data.map(worldCardHTML).join("");
  }

  /* ============================================================
     "קרא עוד" — האזנה גלובלית להרחבת כרטיסים
     ============================================================ */
  function initReadMore() {
    document.body.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-toggle]");
      if (!btn) return;
      var target = document.getElementById(btn.getAttribute("data-toggle"));
      if (!target) return;

      var isOpen = target.classList.toggle("open");
      if (btn.classList.contains("read-more-btn")) {
        if (!btn.dataset.label) btn.dataset.label = btn.textContent;
        btn.textContent = isOpen ? "הסתר" : btn.dataset.label;
      }
    });
  }

  /* ============================================================
     משחק "מה היית עושה?"
     ============================================================ */
  function initGame() {
    var questions = (typeof activityQuestions !== "undefined") ? activityQuestions : [];
    if (!questions.length) return;

    var progressEl = document.getElementById("gameProgress");
    var situationEl = document.getElementById("gameSituation");
    var optionsEl = document.getElementById("gameOptions");
    var feedbackEl = document.getElementById("gameFeedback");
    var nextBtn = document.getElementById("gameNext");
    var gameCard = document.getElementById("gameCard");
    var resultEl = document.getElementById("gameResult");
    var restartBtn = document.getElementById("gameRestart");

    var current = 0;

    function renderQuestion() {
      var q = questions[current];
      progressEl.textContent = "שאלה " + (current + 1) + " מתוך " + questions.length;
      situationEl.textContent = q.situation;
      feedbackEl.hidden = true;
      feedbackEl.textContent = "";
      nextBtn.hidden = true;

      optionsEl.innerHTML = "";
      q.options.forEach(function (opt, i) {
        var b = document.createElement("button");
        b.className = "game-option";
        b.type = "button";
        b.textContent = opt.text;
        b.addEventListener("click", function () { choose(i); });
        optionsEl.appendChild(b);
      });
    }

    function choose(i) {
      var q = questions[current];
      var btns = optionsEl.querySelectorAll(".game-option");
      var chosen = q.options[i];

      btns.forEach(function (b, idx) {
        b.disabled = true;
        if (q.options[idx].correct) b.classList.add("correct");
        if (idx === i && !chosen.correct) b.classList.add("wrong");
      });

      feedbackEl.hidden = false;
      feedbackEl.textContent = chosen.explanation;

      nextBtn.hidden = false;
      nextBtn.textContent = (current === questions.length - 1) ? "לסיום" : "הבא";
    }

    nextBtn.addEventListener("click", function () {
      if (current < questions.length - 1) {
        current++;
        renderQuestion();
      } else {
        gameCard.hidden = true;
        resultEl.hidden = false;
      }
    });

    restartBtn.addEventListener("click", function () {
      current = 0;
      resultEl.hidden = true;
      gameCard.hidden = false;
      renderQuestion();
    });

    renderQuestion();
  }

  /* ============================================================
     ניווט במובייל (כפתור המבורגר)
     ============================================================ */
  function initNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("siteNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.classList.contains("nav-link")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ============================================================
     כפתור "חזרה למעלה"
     ============================================================ */
  function initBackToTop() {
    var btn = document.getElementById("backToTop");
    if (!btn) return;

    window.addEventListener("scroll", function () {
      btn.hidden = window.scrollY < 400;
    });

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ============================================================
     אתחול
     ============================================================ */
  document.addEventListener("DOMContentLoaded", function () {
    setLastUpdate();
    initFallen();
    initNews();
    initWorld();
    initReadMore();
    initGame();
    initNav();
    initBackToTop();
  });
})();
