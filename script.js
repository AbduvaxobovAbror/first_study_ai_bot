/* =====================================================
   AI STUDY ASSISTANT
   Main JavaScript
===================================================== */


/* =====================================================
   1. GLOBAL VARIABLES
===================================================== */

let timerInterval = null;

let timeLeft = 25 * 60;

let isTimerRunning = false;

let vocabulary = JSON.parse(
    localStorage.getItem("studyVocabulary")
) || [
    {
        word: "establish",
        meaning: "to create or set up"
    },
    {
        word: "distinct",
        meaning: "clearly different"
    },
    {
        word: "consecutive",
        meaning: "following one after another"
    }
];

let quizScore = 0;


/* =====================================================
   2. PAGE NAVIGATION
===================================================== */

const navItems = document.querySelectorAll(".nav-item");

const sections = {
    dashboard: document.getElementById("dashboard"),
    vocabulary: document.getElementById("vocabulary"),
    quiz: document.getElementById("quiz"),
    timer: document.getElementById("timer"),
    progress: document.getElementById("progress")
};


navItems.forEach(item => {

    item.addEventListener("click", function(event) {

        event.preventDefault();

        const target = this.getAttribute("href")
            .replace("#", "");

        showSection(target);

    });

});


function showSection(sectionName) {

    /*
        Hide dashboard
    */

    sections.dashboard.style.display = "none";


    /*
        Hide other sections
    */

    Object.keys(sections).forEach(key => {

        if (key !== "dashboard") {

            sections[key].classList.remove(
                "active-section"
            );

        }

    });


    /*
        Show selected section
    */

    if (sectionName === "dashboard") {

        sections.dashboard.style.display = "block";

    } else if (sections[sectionName]) {

        sections[sectionName].classList.add(
            "active-section"
        );

    }


    /*
        Update navigation
    */

    navItems.forEach(item => {

        item.classList.remove("active");

        const itemTarget =
            item.getAttribute("href")
                .replace("#", "");

        if (itemTarget === sectionName) {

            item.classList.add("active");

        }

    });


    /*
        Load section data
    */

    if (sectionName === "vocabulary") {

        renderVocabulary();

    }

}


/* =====================================================
   3. DARK MODE
===================================================== */

const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem("studyTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.textContent =
        "☀️ Light Mode";

}


themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");


    const isDark =
        document.body.classList.contains("dark-mode");


    if (isDark) {

        localStorage.setItem(
            "studyTheme",
            "dark"
        );

        themeToggle.textContent =
            "☀️ Light Mode";

    } else {

        localStorage.setItem(
            "studyTheme",
            "light"
        );

        themeToggle.textContent =
            "🌙 Dark Mode";

    }

});


/* =====================================================
   4. DAILY GOALS
===================================================== */

function toggleGoal(button) {

    const goal =
        button.closest(".goal-item");


    goal.classList.toggle("completed");


    if (goal.classList.contains("completed")) {

        button.textContent = "✓";

    } else {

        button.textContent = "○";

    }


    updateGoalCounter();

}


/* Update completed goals */

function updateGoalCounter() {

    const completed =
        document.querySelectorAll(
            ".goal-item.completed"
        ).length;


    const total =
        document.querySelectorAll(
            ".goal-item"
        ).length;


    const counter =
        document.getElementById(
            "completedGoals"
        );


    counter.textContent = completed;


    /*
        Update overall progress
    */

    const percentage =
        Math.round(
            (completed / total) * 100
        );


    document.getElementById(
        "overallProgress"
    ).textContent =
        percentage + "%";


    /*
        Update progress circle
    */

    const circle =
        document.querySelector(
            ".progress-circle"
        );


    circle.style.background =
        `conic-gradient(
            white 0deg ${percentage * 3.6}deg,
            rgba(255,255,255,0.2)
            ${percentage * 3.6}deg 360deg
        )`;

}


/* =====================================================
   5. VOCABULARY SYSTEM
===================================================== */

function addVocabulary() {

    const wordInput =
        document.getElementById(
            "wordInput"
        );

    const meaningInput =
        document.getElementById(
            "meaningInput"
        );


    const word =
        wordInput.value.trim();

    const meaning =
        meaningInput.value.trim();


    /*
        Validation
    */

    if (!word || !meaning) {

        alert(
            "Please enter both the word and its meaning."
        );

        return;

    }


    /*
        Add word
    */

    vocabulary.push({
        word: word,
        meaning: meaning
    });


    /*
        Save to localStorage
    */

    localStorage.setItem(
        "studyVocabulary",
        JSON.stringify(vocabulary)
    );


    /*
        Clear inputs
    */

    wordInput.value = "";

    meaningInput.value = "";


    /*
        Update interface
    */

    renderVocabulary();


    updateVocabularyCount();


    alert(
        `"${word}" has been added successfully!`
    );

}


/* Render vocabulary */

function renderVocabulary() {

    const list =
        document.getElementById(
            "vocabularyList"
        );


    if (!list) return;


    list.innerHTML = "";


    vocabulary.forEach((item, index) => {

        const vocabularyItem =
            document.createElement("div");


        vocabularyItem.className =
            "vocabulary-item";


        vocabularyItem.innerHTML = `

            <div>
                <strong>${escapeHTML(item.word)}</strong>

                <span>
                    ${escapeHTML(item.meaning)}
                </span>
            </div>

            <button
                class="delete-word"
                onclick="deleteVocabulary(${index})"
            >
                🗑️
            </button>

        `;


        list.appendChild(
            vocabularyItem
        );

    });

}


/* Delete vocabulary */

function deleteVocabulary(index) {

    vocabulary.splice(index, 1);


    localStorage.setItem(
        "studyVocabulary",
        JSON.stringify(vocabulary)
    );


    renderVocabulary();

    updateVocabularyCount();

}


/* Update vocabulary counter */

function updateVocabularyCount() {

    document.getElementById(
        "vocabularyCount"
    ).textContent =
        vocabulary.length;

}


/* Prevent unsafe HTML */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* Quick vocabulary button */

function openVocabulary() {

    showSection("vocabulary");


    setTimeout(() => {

        document.getElementById(
            "wordInput"
        ).focus();

    }, 100);

}


/* =====================================================
   6. QUIZ SYSTEM
===================================================== */

const quizQuestions = [

    {
        question:
            'What does "establish" mean?',

        options: [
            "To destroy",
            "To create or set up",
            "To forget",
            "To reduce"
        ],

        answer: 1
    },


    {
        question:
            'What does "distinct" mean?',

        options: [
            "Clearly different",
            "Very small",
            "Difficult to understand",
            "Temporary"
        ],

        answer: 0
    },


    {
        question:
            'What does "consecutive" mean?',

        options: [
            "Occurring randomly",
            "Following one after another",
            "Extremely difficult",
            "Completely unrelated"
        ],

        answer: 1
    },


    {
        question:
            'What does "regulate" mean?',

        options: [
            "To control",
            "To remove",
            "To increase quickly",
            "To discover"
        ],

        answer: 0
    },


    {
        question:
            'What does "implication" mean?',

        options: [
            "A direct command",
            "A possible consequence",
            "A vocabulary list",
            "A mathematical formula"
        ],

        answer: 1
    }

];


let currentQuestion = 0;

let currentQuizScore = 0;


/* Start quiz */

function startQuiz() {

    showSection("quiz");

    currentQuestion = 0;

    currentQuizScore = 0;

    loadQuestion();

}


/* Load question */

function loadQuestion() {

    const question =
        quizQuestions[currentQuestion];


    document.getElementById(
        "questionNumber"
    ).textContent =
        currentQuestion + 1;


    document.getElementById(
        "questionText"
    ).textContent =
        question.question;


    const options =
        document.getElementById(
            "quizOptions"
        );


    options.innerHTML = "";


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                option;


            button.onclick = () => {

                checkAnswer(
                    button,
                    index === question.answer
                );

            };


            options.appendChild(
                button
            );

        }
    );


    document.getElementById(
        "quizResult"
    ).textContent = "";

}


/* Check answer */

function checkAnswer(
    button,
    isCorrect
) {

    /*
        Disable all answers
    */

    const buttons =
        document.querySelectorAll(
            "#quizOptions button"
        );


    buttons.forEach(btn => {

        btn.disabled = true;

    });


    /*
        Correct answer
    */

    if (isCorrect) {

        button.classList.add(
            "correct"
        );

        currentQuizScore++;

        document.getElementById(
            "quizResult"
        ).textContent =
            "Correct! 🎉";

    } else {

        button.classList.add(
            "wrong"
        );

        document.getElementById(
            "quizResult"
        ).textContent =
            "Not quite. Keep practising!";

    }


    /*
        Go to next question
    */

    setTimeout(() => {

        currentQuestion++;


        if (
            currentQuestion <
            quizQuestions.length
        ) {

            loadQuestion();

        } else {

            finishQuiz();

        }

    }, 1000);

}


/* Finish quiz */

function finishQuiz() {

    const options =
        document.getElementById(
            "quizOptions"
        );


    options.innerHTML = "";


    document.getElementById(
        "questionText"
    ).textContent =
        "Quiz Completed! 🎉";


    document.getElementById(
        "quizResult"
    ).innerHTML = `

        You scored

        <strong>
            ${currentQuizScore}/${quizQuestions.length}
        </strong>

        <br><br>

        <button
            class="primary-button"
            onclick="startQuiz()"
        >
            Try Again
        </button>

    `;


    /*
        Update quiz count
    */

    const quizCount =
        document.getElementById(
            "quizCount"
        );


    let completedQuizzes =
        parseInt(
            localStorage.getItem(
                "completedQuizzes"
            )
        ) || 3;


    completedQuizzes++;


    localStorage.setItem(
        "completedQuizzes",
        completedQuizzes
    );


    quizCount.textContent =
        completedQuizzes;

}


/* Load saved quiz count */

function loadQuizCount() {

    const saved =
        localStorage.getItem(
            "completedQuizzes"
        );


    if (saved) {

        document.getElementById(
            "quizCount"
        ).textContent =
            saved;

    }

}


/* =====================================================
   7. STUDY TIMER
===================================================== */

function updateTimerDisplay() {

    const minutes =
        Math.floor(
            timeLeft / 60
        );


    const seconds =
        timeLeft % 60;


    const formattedMinutes =
        String(minutes).padStart(
            2,
            "0"
        );


    const formattedSeconds =
        String(seconds).padStart(
            2,
            "0"
        );


    document.getElementById(
        "timerDisplay"
    ).textContent =
        `${formattedMinutes}:${formattedSeconds}`;

}


/* Start timer */

function startTimer() {

    if (isTimerRunning) return;


    isTimerRunning = true;


    timerInterval =
        setInterval(() => {

            timeLeft--;


            updateTimerDisplay();


            if (timeLeft <= 0) {

                clearInterval(
                    timerInterval
                );


                isTimerRunning = false;


                alert(
                    "Study session completed! 🎉"
                );


                addStudySession();

            }

        }, 1000);

}


/* Pause timer */

function pauseTimer() {

    clearInterval(
        timerInterval
    );


    isTimerRunning = false;

}


/* Reset timer */

function resetTimer() {

    clearInterval(
        timerInterval
    );


    isTimerRunning = false;


    timeLeft = 25 * 60;


    updateTimerDisplay();

}


/* Quick timer button */

function startStudySession() {

    showSection("timer");


    resetTimer();


    startTimer();

}


/* =====================================================
   8. STUDY TIME TRACKING
===================================================== */

function addStudySession() {

    let totalMinutes =
        parseInt(
            localStorage.getItem(
                "totalStudyMinutes"
            )
        ) || 155;


    totalMinutes += 25;


    localStorage.setItem(
        "totalStudyMinutes",
        totalMinutes
    );


    updateStudyTime();

}


/* Update study time */

function updateStudyTime() {

    const totalMinutes =
        parseInt(
            localStorage.getItem(
                "totalStudyMinutes"
            )
        ) || 155;


    const hours =
        Math.floor(
            totalMinutes / 60
        );


    const minutes =
        totalMinutes % 60;


    document.getElementById(
        "studyTime"
    ).textContent =
        `${hours}h ${minutes}m`;

}


/* =====================================================
   9. INITIAL DATA
===================================================== */

function initializeApp() {

    updateVocabularyCount();

    loadQuizCount();

    updateStudyTime();

    updateTimerDisplay();

    updateGoalCounter();

}


/* =====================================================
   10. KEYBOARD SHORTCUTS
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        /*
            Space = Start/Pause timer
        */

        if (
            event.code === "Space" &&
            document.activeElement.tagName !== "INPUT"
        ) {

            event.preventDefault();


            if (isTimerRunning) {

                pauseTimer();

            } else {

                startTimer();

            }

        }


        /*
            Escape = Pause timer
        */

        if (event.key === "Escape") {

            pauseTimer();

        }

    }
);


/* =====================================================
   11. START APPLICATION
===================================================== */

initializeApp();