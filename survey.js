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
let isSubmitting = false;

let state = {
    age_group: sessionStorage.getItem("age_group"),
    branch: sessionStorage.getItem("branch") || null,
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
    window.location.href = "index.html";
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

function showRoomsBlockSmooth() {
    roomsBlock.classList.remove("is-hidden");

    roomsBlock.classList.add("is-animating");

    requestAnimationFrame(() => {
        roomsBlock.classList.add("is-visible");
        roomsBlock.classList.remove("is-animating");
    });
}

function transitionToNextQuestion() {
    card.classList.add("is-fading-out");

    setTimeout(() => {
        renderQuestion();

        card.classList.remove("is-fading-out");
        card.classList.add("is-fading-in");

        setTimeout(() => {
            card.classList.remove("is-fading-in");
        }, 250);
    }, 200);
}

function hideRoomsBlock() {
    roomsBlock.classList.remove("is-visible");
    roomsBlock.classList.add("is-hidden");
}

function renderQuestion() {
    const age = state.age_group;
    const lang = state.language;
    const t = TEXTS[lang];

    const questionKey = getQuestionKey();

    state.showRoomsBlock = false;
    hideRoomsBlock();

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

    if (questionKey === "general_comment") {
        bubblesWrap.classList.add("is-hidden");
        sliderWrap.classList.add("is-hidden");
        roomsBlock.classList.add("is-hidden");

        commentWrap.classList.remove("is-hidden");

        if (TEXTS[state.language].comment_placeholder) {
            commentInput.placeholder =
                TEXTS[state.language].comment_placeholder[state.age_group] || "";
        }
        commentInput.value = state.answers.general_comment || "";

        nextBtn.disabled = false;
        return;
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

    const sliderHint = sliderWrap.querySelector(".slider-hint");
    if (sliderHint) {
        sliderHint.textContent =
            TEXTS[state.language].slider_hint?.[state.age_group] || "";
    }
    // īpašs gadījums - 4-7 gadi un telpas

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
    }
    if (
        questionKey === "rooms_overall" &&
        state.showRoomsBlock &&
        state.age_group !== "4-7"
    ) {
        showRoomsBlockSmooth();
        renderRoomsTexts();
    }

    if (state.age_group === "4-7") {
        state.showRoomsBlock = false;
        roomsBlock.classList.add("is-hidden");
    }
}

commentInput.addEventListener("input", () => {
    state.answers.general_comment = commentInput.value.trim();
});

slider.addEventListener("input", () => {
    const questionKey = getQuestionKey();
    state.scores[questionKey] = Number(slider.value);
    nextBtn.disabled = false;

    if (questionKey === "rooms_overall" && state.age_group !== "4-7") {
        if (!state.showRoomsBlock) {
            state.showRoomsBlock = true;
            showRoomsBlockSmooth();
            renderRoomsTexts();
        }
    }
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
            if (questionKey === "gender") {
                const genderMap = {
                    bad: "girl",
                    neutral: "boy",
                };
                state.answers.gender = genderMap[bubbleValue] || null;
            } else {
                state.answers[questionKey] = bubbleValue;
            }
        }

        if (questionKey === "rooms_overall" && state.age_group === "8-12") {
            if (!state.showRoomsBlock) {
                state.showRoomsBlock = true;
                showRoomsBlockSmooth();
                renderRoomsTexts();
            }
        }

        nextBtn.disabled = false;

    });
});

function showThankYou() {
    const t = TEXTS[state.language]?.thank_you || TEXTS.lv.thank_you;

    document.getElementById("thankYouTitle").textContent = t.title;
    document.getElementById("thankYouText").textContent = t.text;

    nextBtn.classList.add("is-hidden");
    skipBtn.classList.add("is-hidden");

    document
        .querySelectorAll(".question-content > *:not(#thankYouScreen)")
        .forEach(el => {
            el.classList.add("is-hidden");
        });

    document.getElementById("thankYouScreen").classList.remove("is-hidden");
}

function sendToSheetsAndFinish() {
    if (isSubmitting) return;
    isSubmitting = true;

    nextBtn.disabled = true;
    skipBtn.disabled = true;
    nextBtn.textContent =
        TEXTS[state.language]?.common?.sending || "Nosūtām...";

    const payload = {
        submission_id: crypto.randomUUID(),
        branch: state.branch,
        language: state.language,
        age_group: state.age_group,

        gender: state.answers.gender ?? null,
        felt_overall: state.answers.felt_overall ?? null,

        felt_safe_score: state.scores.felt_safe ?? null,
        understood_process_score: state.scores.understood_process ?? null,
        staff_attitude_score: state.scores.staff_attitude ?? null,
        rooms_overall_score: state.scores.rooms_overall ?? null,

        visited_waiting_room: state.rooms.waiting_room ?? null,
        visited_interview_room: state.rooms.interview_room ?? null,
        visited_medical_room: state.rooms.medical_room ?? null,
        visited_specialist_room: state.rooms.specialist_room ?? null,

        room_waiting_rating: state.rooms_ratings.waiting_room ?? null,
        room_interview_rating: state.rooms_ratings.interview_room ?? null,
        room_medical_rating: state.rooms_ratings.medical_room ?? null,
        room_specialist_rating: state.rooms_ratings.specialist_room ?? null,

        general_comment: state.answers.general_comment ?? null
    };

    fetch("https://script.google.com/macros/s/AKfycbxlRSb_qLXVmyyJP61DcTMVK6OqA4jppjsi0YrRpL2hCc3AgjiK2ZfZ8T2OdPFZMzOu/exec", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload)
    })
        .then(() => {
            showThankYou();
        })
        .catch(() => {
            nextBtn.textContent = "Kļūda, mēģini vēlreiz";
            nextBtn.disabled = false;
            skipBtn.disabled = false;
            isSubmitting = false;
        });
}

// next
nextBtn.addEventListener("click", () => {
    nextBtn.disabled = true;

    state.currentQuestionIndex++;

    if (state.currentQuestionIndex < QUESTION_ORDER.length) {
        nextBtn.disabled = false;
        transitionToNextQuestion();
    } else {
        console.log("Anketa pabeigta", state);
        sendToSheetsAndFinish();
    }
});

// skip
skipBtn.addEventListener("click", () => {
    const questionKey = getQuestionKey();
    state.answers[questionKey] = "skipped";
    state.scores[questionKey] = "skipped";

    state.currentQuestionIndex++;

    if (state.currentQuestionIndex < QUESTION_ORDER.length) {
        transitionToNextQuestion();
    } else {
        console.log("Anketa pabeigta", state);
        sendToSheetsAndFinish();
    }
});


renderQuestion();

requestAnimationFrame(() => {
    document.body.classList.remove("is-page-entering");
    document.body.classList.add("is-page-visible");
});


