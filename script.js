const quizData = [
    {
        question: "Quantas comunidades quilombolas foram identificadas no Brasil pelo Censo 2022 do IBGE?",
        options: [
            "151 comunidades",
            "1.700 comunidades",
            "5.935 localidades",
            "495 territórios"
        ],
        answer: 2 // Índice da resposta correta
    },
    {
        question: "Quantas comunidades quilombolas são certificadas pela Fundação Cultural Palmares em Pernambuco?",
        options: [
            "151 comunidades",
            "495 comunidades",
            "1.700 comunidades",
            "5.935 comunidades"
        ],
        answer: 0
    },
    {
        question: "Qual foi o quilombo formado no século XIX na região do Recife e Zona da Mata, liderado por Malunguinho?",
        options: [
            "Quilombo dos Palmares",
            "Quilombo do Catucá",
            "Quilombo de Castainho",
            "Quilombo Sacopã"
        ],
        answer: 1
    },
    {
        question: "Qual importante líder é o principal símbolo da resistência contra a escravidão, cuja morte em 20 de novembro deu origem ao Dia da Consciência Negra?",
        options: [
            "Ganga Zumba",
            "Malunguinho",
            "Joaquim Nabuco",
            "Zumbi dos Palmares"
        ],
        answer: 3
    },
    {
        question: "O Quilombo de Conceição das Crioulas, em Salgueiro/PE, teve sua formação historicamente associada a:",
        options: [
            "Seis mulheres negras que produziam algodão para adquirir suas terras",
            "Uma expedição militar liderada por Malunguinho",
            "Uma fazenda abandonada na Chapada dos Veadeiros",
            "Uma parceria abolicionista organizada por Joaquim Nabuco"
        ],
        answer: 0
    },
    {
        question: "O Quilombo Cafundó (SP) é historicamente reconhecido por preservar qual tradição cultural linguística?",
        options: [
            "A prática da ciranda e do afoxé",
            "A língua Cupópia de matriz africana",
            "Documentos escritos pelo Quilombo dos Palmares",
            "O cultivo tradicional de algodão cru"
        ],
        answer: 1
    },
    {
        question: "Em qual estado fica localizado o Quilombo Kalunga, uma das maiores comunidades quilombolas do Brasil?",
        options: [
            "Pernambuco",
            "Alagoas",
            "Goiás",
            "Rio de Janeiro"
        ],
        answer: 2
    }
];

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');

const scoreNumberEl = document.getElementById('score-number');
const totalQuestionsEl = document.getElementById('total-questions');
const scoreFeedbackEl = document.getElementById('score-feedback');

let currentQuestionIndex = 0;
let score = 0;

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', loadNextQuestion);
restartBtn.addEventListener('click', startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');

    showQuestion();
}

function showQuestion() {
    resetState();
    
    const currentQuestion = quizData[currentQuestionIndex];
    
    const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    questionNumberEl.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
    
    questionTextEl.textContent = currentQuestion.question;

    currentQuestion.options.forEach((optionText, index) => {
        const button = document.createElement('button');
        button.textContent = optionText;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(button, index));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';
}

function selectOption(selectedBtn, selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    const correctIndex = currentQuestion.answer;
    const allButtons = optionsContainer.querySelectorAll('.option-btn');

    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
        allButtons[correctIndex].classList.add('correct');
    }

    if (currentQuestionIndex < quizData.length - 1) {
        nextBtn.classList.remove('hidden');
    } else {
        nextBtn.textContent = 'Ver Resultado';
        nextBtn.classList.remove('hidden');
    }
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    scoreNumberEl.textContent = score;
    totalQuestionsEl.textContent = quizData.length;

    if (score === 7) {
        scoreFeedbackEl.textContent = "Excelente! Você demonstrou conhecimento total sobre a história dos Quilombos no Brasil e em PE!";
    } else if (score >= 4) {
        scoreFeedbackEl.textContent = "Muito bem! Você tem um bom conhecimento sobre a história e resistência quilombola.";
    } else {
        scoreFeedbackEl.textContent = "Bom esforço! Que tal revisar o conteúdo e tentar novamente para aprimorar seus conhecimentos?";
    }
}