const QUESTION_ORDER = [
    "gender",
    "felt_overall",
    "felt_safe",
    "understood_process",
    "staff_attitude",
    "rooms_overall",
    "general_comment"
];

const SLIDER_QUESTIONS = ["felt_safe", "understood_process", "staff_attitude", "rooms_overall"];

const BUBBLE_TO_SCORE = {
    felt_safe: { good: 10, neutral: 5, bad: 0 },
    understood_process: { good: 10, neutral: 5, bad: 0 },
    staff_attitude: { good: 10, neutral: 5, bad: 0 },
    rooms_overall: { good: 10, neutral: 5, bad: 0 }
};

let state = {
    age_group: sessionStorage.getItem("age_group"),
    language: sessionStorage.getItem("language") || "lv",
    currentQuestionIndex: 0,
    answers: {},
    scores: {},
    rooms: {
        waiting_room: null,
        interview_room: null,
        medical_room: null,
        specialist_room: null
    },
    rooms_ratings: {
        waiting_room: null,
        interview_room: null,
        medical_room: null,
        specialist_room: null
    },
    showRoomsBlock: false
};

if (!state.age_group) {
    window.location.href = "start_age.html";
}

// Some DOM elementi
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
const roomsBlock = document.getElementById("roomsBlock");
const commentWrap = document.getElementById("commentWrap");
const commentInput = document.getElementById("commentInput");


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

function renderRoomsTexts() {
    const t = TEXTS[state.language];

    if (!t.rooms) return;

    const titleEl = document.getElementById("roomsTitle");
    const hintEl = document.getElementById("roomsHint");
    if (titleEl) titleEl.textContent = t.rooms.title || "";
    if (hintEl) hintEl.textContent = t.rooms.hint || "";

    document.querySelectorAll(".room-card").forEach(card => {
        const key = card.dataset.room;

        const label = card.querySelector(".room-label");
        if (label) label.textContent = (t.rooms.labels && t.rooms.labels[key]) ? t.rooms.labels[key] : "";

        const left = card.querySelector(".room-slider-left");
        const right = card.querySelector(".room-slider-right");
        if (left) left.textContent = t.rooms.slider?.left || "";
        if (right) right.textContent = t.rooms.slider?.right || "";
    });
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

    

    const isRoomsOverall = questionKey === "rooms_overall";
    const hasRoomsAnswer =
        state.scores.rooms_overall != null ||
        state.answers.rooms_overall != null;

    state.showRoomsBlock =
        isRoomsOverall &&
        hasRoomsAnswer &&
        state.age_group !== "4-7";


    if (state.showRoomsBlock) {
        roomsBlock.classList.remove("is-hidden");
        renderRoomsTexts();
    } else {
        roomsBlock.classList.add("is-hidden");
    }

    if (questionKey === "gender") {
        bubblesWrap.classList.remove("is-hidden");
        sliderWrap.classList.add("is-hidden");
        return;
    }

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
    // parādīt/noslēpt telpu bloku

    if (state.showRoomsBlock) {
        roomsBlock.classList.remove("is-hidden");
        renderRoomsTexts();
    } else {
        roomsBlock.classList.add("is-hidden");
    }

    if (state.age_group === "4-7") {
        state.showRoomsBlock = false;
        roomsBlock.classList.add("is-hidden");
    }

    if (
        getQuestionKey() === "general_comment" &&
        state.age_group !== "4-7"
    ) {
        commentWrap.classList.remove("is-hidden");

        // placeholder texts
        if (TEXTS[state.language].comment_placeholder) {
            commentInput.placeholder =
                TEXTS[state.language].comment_placeholder[state.age_group] || "";
        }

        nextBtn.disabled = false;
    } else {
        commentWrap.classList.add("is-hidden");
        commentInput.value = "";
    }

}

slider.addEventListener("input", () => {
    const questionKey = getQuestionKey();
    state.scores[questionKey] = Number(slider.value);
    nextBtn.disabled = false;
    renderQuestion();
});

// telpu kartiņas
document.querySelectorAll(".room-card").forEach(card => {
    card.addEventListener("click", () => {
        const roomKey = card.dataset.room;

        card.classList.toggle("selected");

        // telpas stāvoklis
        if (state.rooms[roomKey] === null) {
            state.rooms[roomKey] = true;
        } else {
            state.rooms[roomKey] = !state.rooms[roomKey];
        }

        // ja noņēma selekciju, noņemt vērtību
        if (!card.classList.contains("selected")) {
            state.rooms_ratings[roomKey] = null;
            const slider = card.querySelector(".room-range");
            if (slider) slider.value = 5;
        }
    });

});

document.querySelectorAll(".room-range").forEach(roomSlider => {

    roomSlider.addEventListener("input", (e) => {
        e.stopPropagation();

        const card = e.target.closest(".room-card");
        const roomKey = card.dataset.room;

        state.rooms_ratings[roomKey] = Number(e.target.value);
    });

    roomSlider.addEventListener("click", (e) => {
        e.stopPropagation();
    });

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
        renderQuestion();
    });
});

commentInput.addEventListener("input", () => {
    state.answers.general_comment = commentInput.value;
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
