let score = 0;
let currentAnswer = 0;

const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');

// Funktion för meddelanden som försvinner
function showFeedback(text, isCorrect) {
    feedbackElement.textContent = text;
    feedbackElement.className = isCorrect ? 'feedback correct' : 'feedback wrong';
}

// Skapa ett nytt mattetal
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1; // Tal 1-10
    const num2 = Math.floor(Math.random() * 10) + 1; // Tal 1-10
    
    currentAnswer = num1 + num2;
    questionElement.textContent = `${num1} + ${num2}`;
    answerInput.value = '';
    answerInput.focus();
}

// Kontrollera svaret
function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);

    if (isNaN(userAnswer)) {
        showFeedback("Skriv ett nummer först!", false);
        return;
    }

    if (userAnswer === currentAnswer) {
        score++;
        scoreElement.textContent = score;
        showFeedback("Snyggt! Rätt svar! 🎉", true);
        generateQuestion();
    } else {
        showFeedback("Hoppsan, försök igen! ❌", false);
        answerInput.value = '';
        answerInput.focus();
    }
}

// Event Listeners (Klick och Enter-tryck)
submitBtn.addEventListener('click', checkAnswer);
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
});

// Starta spelet direkt när sidan laddas
generateQuestion();
