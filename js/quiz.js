window.IIE = window.IIE || {};
(function() {
  'use strict';

  function initQuiz() {
    const introScreen = document.getElementById('quiz-intro-screen');
    const questionScreen = document.getElementById('quiz-question-screen');
    const resultScreen = document.getElementById('quiz-result-screen');

    const startBtn = document.getElementById('btn-start-quiz');
    const restartBtn = document.getElementById('btn-restart-quiz');
    const heroStartBtn = document.getElementById('btn-start-quiz-hero');

    const currentQNum = document.getElementById('current-q-num');
    const progressFill = document.getElementById('quiz-progress-fill');
    const questionText = document.getElementById('quiz-question-text');
    const optionsGrid = document.getElementById('quiz-options-grid');
    const feedback = document.getElementById('quiz-feedback');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackText = document.getElementById('feedback-text');
    const finalScore = document.getElementById('quiz-final-score');
    const resultMsg = document.getElementById('quiz-result-message');

    let currentQuestionIndex = 0;
    let score = 0;
    let locked = false;

    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (restartBtn) restartBtn.addEventListener('click', startQuiz);

    if (heroStartBtn) {
      heroStartBtn.addEventListener('click', () => {
        document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
        startQuiz();
      });
    }

    function startQuiz() {
      if (!introScreen) return;
      currentQuestionIndex = 0;
      score = 0;
      locked = false;

      introScreen.classList.add('hidden');
      resultScreen.classList.add('hidden');
      questionScreen.classList.remove('hidden');

      loadQuestion();
    }

    function loadQuestion() {
      locked = false;
      feedback.classList.add('hidden');

      const q = quizQuestions[currentQuestionIndex];
      const shuffledOptions = [...q.options];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }

      currentQNum.innerText = currentQuestionIndex + 1;
      progressFill.style.width = ((currentQuestionIndex + 1) / 8 * 100) + '%';
      questionText.innerText = q.question;

      optionsGrid.innerHTML = '';
      shuffledOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.addEventListener('click', () => selectOption(btn, opt));
        optionsGrid.appendChild(btn);
      });
    }

    function selectOption(clickedBtn, selectedVal) {
      if (locked) return;
      locked = true;

      const q = quizQuestions[currentQuestionIndex];
      const isCorrect = (selectedVal === q.answer);

      const optionBtns = optionsGrid.querySelectorAll('.option-btn');
      optionBtns.forEach(btn => {
        btn.classList.add('disabled');
        if (btn.innerText === q.answer) {
          btn.classList.add('correct');
        }
      });

      if (isCorrect) {
        clickedBtn.classList.add('correct');
        score++;
        showFeedback(true);
      } else {
        clickedBtn.classList.add('wrong');
        showFeedback(false, q.answer);
      }

      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
          loadQuestion();
        } else {
          showResults();
        }
      }, 1800);
    }

    function showFeedback(isCorrect, correctAnswer) {
      feedback.classList.remove('hidden', 'correct', 'wrong');

      if (isCorrect) {
        feedback.classList.add('correct');
        feedbackIcon.innerText = '\u2705';
        feedbackText.innerText = 'Correct! Great job!';
      } else {
        feedback.classList.add('wrong');
        feedbackIcon.innerText = '\u274C';
        feedbackText.innerText = `Incorrect. The answer is ${correctAnswer}`;
      }
    }

    function showResults() {
      questionScreen.classList.add('hidden');
      resultScreen.classList.remove('hidden');

      finalScore.innerText = score;

      if (score === 8) {
        resultMsg.innerText = "Incredible Mastermind! \uD83C\uDFC6 You scored a perfect 8/8! You are an expert on India's vast culinary heritage!";
        document.getElementById('quiz-result-icon').innerText = '\uD83C\uDFC6';
      } else if (score >= 5) {
        resultMsg.innerText = `Great score! \uD83C\uDF1F You got ${score}/8 correct. You have a solid grasp of Indian cuisine!`;
        document.getElementById('quiz-result-icon').innerText = '\uD83C\uDF1F';
      } else {
        resultMsg.innerText = `You scored ${score}/8. Keep exploring the interactive map and food lists to discover more flavors! \uD83C\uDF5B`;
        document.getElementById('quiz-result-icon').innerText = '\uD83C\uDF5B';
      }
    }
  }

  window.IIE.Quiz = { init: initQuiz };
})();
