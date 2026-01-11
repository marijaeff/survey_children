const QUESTION_ORDER = [
    "felt_overall",
    "felt_safe",
    "understood_process",
    "staff_attitude",
    "rooms_overall"
];

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

// renderē aktuālo jautājumu
function renderQuestion() {
    const age = state.age_group;
    const lang = state.language;
    const t = TEXTS[lang];

    const questionKey = QUESTION_ORDER[state.currentQuestionIndex];

    document.getElementById("question").textContent =
        t.questions[questionKey][age];

    document.querySelectorAll(".bubble-label").forEach((el, i) => {
        el.textContent = t.bubbles[questionKey][age][i];
    });

    document.getElementById("nextBtn").textContent = t.common.next;
    document.getElementById("skipQuestion").textContent = t.common.skip;

    document.querySelectorAll(".bubble").forEach(b =>
        b.classList.remove("selected")
    );
    document.getElementById("nextBtn").disabled = true;

const sliderWrap = document.getElementById("safeSliderWrap");
const bubblesWrap = document.getElementById("bubbleOptions");

// RESET
bubblesWrap.classList.add("is-hidden");
sliderWrap.classList.add("is-hidden");

// burbuļoi visos jautājumos, izņemot felt_safe
if (questionKey !== "felt_safe") {
  bubblesWrap.classList.remove("is-hidden");
  return;
}

// felt_safe
if (age === "4-7") {
  bubblesWrap.classList.remove("is-hidden");
}

if (age === "8-12") {
  bubblesWrap.classList.remove("is-hidden");
  sliderWrap.classList.remove("is-hidden");
}

if (age === "13-18") {
  sliderWrap.classList.remove("is-hidden");
}


}

const slider = document.getElementById("safeSlider");

slider.addEventListener("input", () => {
  const questionKey = QUESTION_ORDER[state.currentQuestionIndex];
  state.answers[questionKey] = slider.value;
  document.getElementById("nextBtn").disabled = false;
});

document.querySelectorAll(".bubble").forEach(bubble => {
    bubble.addEventListener("click", () => {
        document.querySelectorAll(".bubble")
            .forEach(b => b.classList.remove("selected"));

        bubble.classList.add("selected");

        const questionKey = QUESTION_ORDER[state.currentQuestionIndex];
        state.answers[questionKey] = bubble.dataset.value;

        document.getElementById("nextBtn").disabled = false;
    });
});

document.getElementById("nextBtn").addEventListener("click", () => {
    goNext();
});

document.getElementById("skipQuestion").addEventListener("click", () => {
    const questionKey = QUESTION_ORDER[state.currentQuestionIndex];
    state.answers[questionKey] = "skipped";
    goNext();
});

function goNext() {
    state.currentQuestionIndex++;

    if (state.currentQuestionIndex < QUESTION_ORDER.length) {
        renderQuestion();
    } else {
        console.log("Anketa pabeigta", state.answers);
        // būs pāreja
    }


}

renderQuestion();
