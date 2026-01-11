const QUESTION_ORDER = [
  "gender",
  "felt_overall",
  "felt_safe",
  "understood_process",
  // "staff_attitude",
  // "rooms_overall"
];

const SLIDER_QUESTIONS = ["felt_safe", "understood_process"];

const BUBBLE_TO_SCORE = {
  felt_safe: { good: 10, neutral: 5, bad: 0 },
  understood_process: { good: 10, neutral: 5, bad: 0 }
};

let state = {
  age_group: sessionStorage.getItem("age_group"),
  language: sessionStorage.getItem("language") || "lv",
  currentQuestionIndex: 0,
  answers: {},
  scores: {}
};

if (!state.age_group) {
  window.location.href = "start_age.html";
}

// ------- DOM refs (один раз) -------
const card = document.querySelector(".card");
const questionEl = document.getElementById("question");

const bubblesWrap = document.getElementById("bubbleOptions");
const bubbleButtons = Array.from(document.querySelectorAll(".bubble"));
const bubbleLabels = Array.from(document.querySelectorAll(".bubble-label"));

const sliderWrap = document.getElementById("safeSliderWrap");
const slider = document.getElementById("safeSlider");
const sliderLeft = document.querySelector(".slider-left");
const sliderRight = document.querySelector(".slider-right");

const nextBtn = document.getElementById("nextBtn");
const skipBtn = document.getElementById("skipQuestion");

// helperi
function getQuestionKey() {
  return QUESTION_ORDER[state.currentQuestionIndex];
}

function resetUI() {
  // reset selection
  bubbleButtons.forEach(b => b.classList.remove("selected"));
  nextBtn.disabled = true;

  // hide blocks
  bubblesWrap.classList.add("is-hidden");
  sliderWrap.classList.add("is-hidden");

  // reset slider default
  slider.value = 5;
}

function applySliderLabels(t, questionKey) {
  // ja labeles definētas tekstos
  if (t.slider_labels && t.slider_labels[questionKey]) {
    sliderLeft.textContent = t.slider_labels[questionKey].left;
    sliderRight.textContent = t.slider_labels[questionKey].right;
  }
}

function renderQuestion() {
  const age = state.age_group;
  const lang = state.language;
  const t = TEXTS[lang];

  const questionKey = getQuestionKey();

  // gender režīms
  card.classList.toggle("gender-mode", questionKey === "gender");

  // jautājuma teksts
  questionEl.textContent = t.questions[questionKey][age];

  // labels bublīšiem
  const labelsArr = (t.bubbles && t.bubbles[questionKey] && t.bubbles[questionKey][age]) || [];
  bubbleLabels.forEach((el, i) => {
    el.textContent = labelsArr[i] ?? ""; // ja trešās atbildes nav, tad tukšums
  });

  // pogas
  nextBtn.textContent = t.common.next;
  skipBtn.textContent = t.common.skip;

  // slaidera labeles
  applySliderLabels(t, questionKey);

  // reset UI
  resetUI();

  // ja jautājums ir slider + bubbles
  if (SLIDER_QUESTIONS.includes(questionKey)) {
    if (age === "4-7") {
      bubblesWrap.classList.remove("is-hidden");
    } else if (age === "8-12") {
      bubblesWrap.classList.remove("is-hidden");
      sliderWrap.classList.remove("is-hidden");
    } else if (age === "13-18") {
      sliderWrap.classList.remove("is-hidden");
    }
  } else {
    // parāda tikai bublīšus
    bubblesWrap.classList.remove("is-hidden");
  }

  // atjaunot saglabāto atbildi, ja tāda ir
  const savedAnswer = state.answers[questionKey];
  if (savedAnswer && savedAnswer !== "skipped") {
    const btn = bubbleButtons.find(b => b.dataset.value === savedAnswer);
    if (btn) {
      btn.classList.add("selected");
      nextBtn.disabled = false;
    }
  }

  const savedScore = state.scores[questionKey];
  if (savedScore != null) {
    slider.value = savedScore;
    
    if (!sliderWrap.classList.contains("is-hidden")) {
      nextBtn.disabled = false;
    }
  }
}


// slider
slider.addEventListener("input", () => {
  const questionKey = getQuestionKey();
  state.scores[questionKey] = Number(slider.value);
  nextBtn.disabled = false;
});

// bubbles
bubbleButtons.forEach(bubble => {
  bubble.addEventListener("click", () => {
    bubbleButtons.forEach(b => b.classList.remove("selected"));
    bubble.classList.add("selected");

    const questionKey = getQuestionKey();
    const bubbleValue = bubble.dataset.value;

    if (BUBBLE_TO_SCORE[questionKey]) {
      const score = BUBBLE_TO_SCORE[questionKey][bubbleValue];
      state.scores[questionKey] = score;

      // sinhronizēt ar slider, ja tas redzим
      if (!sliderWrap.classList.contains("is-hidden")) {
        slider.value = score;
      }
    } else {
      state.answers[questionKey] = bubbleValue;
    }

    nextBtn.disabled = false;
  });
});

// next
nextBtn.addEventListener("click", () => {
  state.currentQuestionIndex++;

  if (state.currentQuestionIndex < QUESTION_ORDER.length) {
    renderQuestion();
  } else {
    console.log("Anketa pabeigta", state);
    // TODO: pāreja uz nākamo soli / sūtīšana uz Sheets
  }
});

// skip
skipBtn.addEventListener("click", () => {
  const questionKey = getQuestionKey();
  state.answers[questionKey] = "skipped";
  state.scores[questionKey] = null;

  state.currentQuestionIndex++;

  if (state.currentQuestionIndex < QUESTION_ORDER.length) {
    renderQuestion();
  } else {
    console.log("Anketa pabeigta", state);
  }
});

// start
renderQuestion();
