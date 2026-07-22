/* ==========================================================================
   FOOD QUIZ GAME MODULE
   ========================================================================== */

function initQuiz() {
    const quizContainer = document.getElementById('quiz');
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

    if (!introScreen || typeof quizQuestions === 'undefined') return;

    // Idempotency guard
    if (introScreen.dataset.listenerBound === "true") return;
    introScreen.dataset.listenerBound = "true";

    let currentQuestionIndex = 0;
    let score = 0;
    let locked = false;

    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (restartBtn) restartBtn.addEventListener('click', startQuiz);

    if (heroStartBtn) {
        heroStartBtn.addEventListener('click', () => {
            if (quizContainer) {
                quizContainer.scrollIntoView({ behavior: 'smooth' });
            }
            startQuiz();
        });
    }

    function startQuiz() {
        if (!introScreen) return;
        currentQuestionIndex = 0;
        score = 0;
        locked = false;

        introScreen.classList.add('hidden');
        if (resultScreen) resultScreen.classList.add('hidden');
        if (questionScreen) questionScreen.classList.remove('hidden');

        loadQuestion();
    }

    function loadQuestion() {
        locked = false;
        if (feedback) feedback.classList.add('hidden');

        const q = quizQuestions[currentQuestionIndex];
        const shuffledOptions = [...q.options];
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }

        if (currentQNum) currentQNum.innerText = currentQuestionIndex + 1;
        if (progressFill) progressFill.style.width = ((currentQuestionIndex + 1) / quizQuestions.length * 100) + '%';
        if (questionText) questionText.innerText = q.question;

        if (optionsGrid) {
            optionsGrid.innerHTML = '';
            shuffledOptions.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerText = opt;
                btn.addEventListener('click', () => selectOption(btn, opt));
                optionsGrid.appendChild(btn);
            });
        }
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
        if (!feedback) return;
        feedback.classList.remove('hidden', 'correct', 'wrong');

        if (isCorrect) {
            feedback.classList.add('correct');
            if (feedbackIcon) feedbackIcon.innerText = '✅';
            if (feedbackText) feedbackText.innerText = 'Correct! Great job!';
        } else {
            feedback.classList.add('wrong');
            if (feedbackIcon) feedbackIcon.innerText = '❌';
            if (feedbackText) feedbackText.innerText = `Incorrect. The answer is ${correctAnswer}`;
        }
    }

    function showResults() {
        if (questionScreen) questionScreen.classList.add('hidden');
        if (resultScreen) resultScreen.classList.remove('hidden');

        if (finalScore) finalScore.innerText = score;

        const resultIcon = document.getElementById('quiz-result-icon');
        if (score === quizQuestions.length) {
            if (resultMsg) resultMsg.innerText = `Incredible Mastermind! 🥳 You scored a perfect ${score}/${quizQuestions.length}! You are an expert on India's vast culinary heritage!`;
            if (resultIcon) resultIcon.innerText = '🎉';
        } else if (score >= Math.ceil(quizQuestions.length * 0.6)) {
            if (resultMsg) resultMsg.innerText = `Great score! 👍 You got ${score}/${quizQuestions.length} correct. You have a solid grasp of Indian cuisine!`;
            if (resultIcon) resultIcon.innerText = '🎉';
        } else {
            if (resultMsg) resultMsg.innerText = `You scored ${score}/${quizQuestions.length}. Keep exploring the interactive map and food lists to discover more flavors! 🍛`;
            if (resultIcon) resultIcon.innerText = '🍛';
        }
    }
}

window.initQuiz = initQuiz;
