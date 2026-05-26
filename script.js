let currentLevel = 1;
let score = 0;
let currentAnswer = 0;

// Hämta element
const answerInput = document.getElementById('answer-input');
const questionElement = document.getElementById('question');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');
const levelIndicator = document.getElementById('level-indicator');

// Funktion för att byta skärm
function goToScreen(screenId) {
    // Göm alla skärmar
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    // Visa den valda skärmen
    document.getElementById(screenId).classList.remove('hidden');
}

// Starta en specifik nivå
function startLevel(levelNumber) {
    currentLevel = levelNumber;
    score = 0;
    scoreElement.textContent = score;
    levelIndicator.textContent = `Nivå ${currentLevel}`;
    
    goToScreen('game-screen');
    generateQuestion();
}

// Generera mattetal baserat på nivå
function generateQuestion() {
    let num1, num2;
    feedbackElement.textContent = ""; // Rensa feedback
    answerInput.value = "";
    answerInput.focus();

    if (currentLevel === 1) {
        // Nivå 1: Enkel addition (1-10)
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        currentAnswer = num1 + num2;
        questionElement.textContent = `${num1} + ${num2}`;
    } else if (currentLevel === 2) {
        // Nivå 2: Subtraktion (1-30)
        num1 = Math.floor(Math.random() * 20) + 10;
        num2 = Math.floor(Math.random() * 10) + 1;
        currentAnswer = num1 - num2;
        questionElement.textContent = `${num1} - ${num2}`;
    } else if (currentLevel === 3) {
        // Nivå 3: Multiplikation (2-9)
        num1 = Math.floor(Math.random() * 8) + 2;
        num2 = Math.floor(Math.random() * 8) + 2;
        currentAnswer = num1 * num2;
        questionElement.textContent = `${num1} × ${num2}`;
    }
}

// Kontrollera svaret
function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);

    if (isNaN(userAnswer)) return;

    if (userAnswer === currentAnswer) {
        score++;
        scoreElement.textContent = score;
        feedbackElement.textContent = "Snyggt! Rätt svar. ✨";
        feedbackElement.className = "feedback correct";
        
        // Kolla om nivån är avklarad (t.ex. vid 5 poäng)
        if (score >= 5) {
            setTimeout(() => {
                alert(`Grymt jobbat! Du klarade Nivå ${currentLevel}! 🎉`);
                goToScreen('level-screen');
            }, 500);
        } else {
            setTimeout(generateQuestion, 1000); // Gå till nästa fråga efter 1 sekund
        }
    } else {
        feedbackElement.textContent = "Försök igen! ❌";
        feedbackElement.className = "feedback wrong";
        answerInput.value = "";
        answerInput.focus();
    }
}

// Eventlisteners
document.getElementById('submit-btn').addEventListener('click', checkAnswer);
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
});
