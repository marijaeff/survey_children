let state = {
  age_group: "4-7",
  overall_feeling: null
};

const ageGroup = sessionStorage.getItem('age_group');

if (!ageGroup) {
  window.location.href = 'start_age.html';
}


// bubble selection
document.querySelectorAll('.bubble').forEach(bubble => {
  bubble.addEventListener('click', () => {
    document.querySelectorAll('.bubble')
      .forEach(b => b.classList.remove('selected'));

    bubble.classList.add('selected');
    state.overall_feeling = bubble.dataset.value;
    document.getElementById('nextBtn').disabled = false;
  });
});

function updateQuestion() {
  const q = document.getElementById('question');

  if (state.age_group === "4-7") {
    q.textContent = "Kā Tu juties, esot Bērna mājā?";
  } else if (state.age_group === "8-12") {
    q.textContent = "Kā Tu kopumā juties Bērna mājā?";
  } else {
    q.textContent = "Kā Tu kopumā vērtē savu pieredzi Bērna mājā?";
  }
}

// 1.jaut. teksts atkarībā no vecuma
const age = sessionStorage.getItem('age_group');

const labelsByAge = {
  "4-7": ["Labi", "Tā pa vidu", "Slikti"],
  "8-12": ["Labi", "Normāli", "Slikti"],
  "13-18": ["Labi", "Neitrāli", "Slikti"]
};

const labels = labelsByAge[age] || labelsByAge["8-12"];

document.querySelectorAll('.bubble-label').forEach((el, i) => {
  el.textContent = labels[i];
});

// skip poga
document.getElementById('skipQuestion').addEventListener('click', () => {
  saveAnswer(""); 
  goToNextQuestion();
});
