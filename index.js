const questions = [
   {
      question: "1. What does HTML stand for?",
      answers: [
         { text: "Hyper Text Markup Language", correct: true },
         { text: "Hyperlink and Text Markup Language", correct: false },
         { text: "High Tech Modern Language", correct: false },
         { text: "Home Tool Markup Language", correct: false }
      ]
   },
   {
      question: "2. Which CSS property is used to change the text color of an element?",
      answers: [
         { text: "text-color", correct: false },
         { text: "foreground-color", correct: false },
         { text: "color", correct: true },
         { text: "font-color", correct: false }
      ]
   },
   {
      question: "3. Which JavaScript keyword is used to declare a variable?",
      answers: [
         { text: "var", correct: false },
         { text: "let", correct: false },
         { text: "const", correct: false },
         { text: "All of the above", correct: true }
      ]
   },
   {
      question: "4. What is the purpose of the 'alt' attribute in an <img> tag?",
      answers: [
         { text: "To define an alternate image", correct: false },
         { text: "To provide alternative text for screen readers", correct: true },
         { text: "To style the image", correct: false },
         { text: "To add a tooltip", correct: false }
      ]
   },
   {
      question: "5. Which HTTP method is used to submit form data securely?",
      answers: [
         { text: "GET", correct: false },
         { text: "POST", correct: true },
         { text: "PUT", correct: false },
         { text: "DELETE", correct: false }
      ]
   }
];


const btn = document.getElementById("btn");
const welcome = document.getElementById("welcome");
const quizz = document.getElementById("quizz");
const timerDisplay = document.getElementById("timer");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const questionsDisplay = document.getElementById("questions");
const progress = document.getElementById("progress");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const count = document.getElementById("count");
const ansElements = document.querySelectorAll(".ans");
const resultContainer = document.getElementById("result");
const finalScoreDisplay = document.getElementById("final-score");
const highScoreDisplay = document.getElementById("high-score");
const restartBtn = document.getElementById("restart");


let currentIndex = 0;
let score = 0;
let selectedAnswers = [];
let timeLeft = 15 * 60;


let highScore = localStorage.getItem("highScore") || 0;
highScoreDisplay.textContent = highScore;


btn.addEventListener("click", () => {
   welcome.style.display = "none";
   quizz.style.display = "flex";
   loadQuestion();
   startTimer();
});


function loadQuestion() {
   const currentQuestion = questions[currentIndex];
   questionsDisplay.textContent = currentQuestion.question;
   option1.textContent = currentQuestion.answers[0].text;
   option2.textContent = currentQuestion.answers[1].text;
   option3.textContent = currentQuestion.answers[2].text;
   option4.textContent = currentQuestion.answers[3].text;
   count.textContent = `${currentIndex + 1}`;

  
   progress.value = ((currentIndex + 1) / questions.length) * 100;
}


function startTimer() {
   let countdown = setInterval(() => {
      let minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      timerDisplay.textContent = `${minutes}:${seconds}`;
      if (timeLeft > 0) {
         timeLeft--;
      } else {
         clearInterval(countdown);
         showResults();
      }
   }, 1000);
}


ansElements.forEach((option, index) => {
   option.addEventListener("click", () => {
      const isCorrect = questions[currentIndex].answers[index].correct;

      
      selectedAnswers.push({ question: questions[currentIndex].question, correct: isCorrect });

      if (isCorrect) {
         score++;
      }

      console.log(`Question: ${questions[currentIndex].question} | Answer: ${option.textContent} | Correct: ${isCorrect}`);

      if (currentIndex < questions.length - 1) {
         currentIndex++;
         loadQuestion();
      } else {
         showResults();
      }
   });
});


function showResults() {
   quizz.style.display = "none";
   resultContainer.style.display ="flex";
   finalScoreDisplay.textContent = `Your Score: ${score} / ${questions.length}`;

  
   if (score > highScore) {
      localStorage.setItem("highScore", score);
      highScore = score;
      highScoreDisplay.textContent = highScore;
   }
}


next.addEventListener("click", () => {
   if (currentIndex < questions.length - 1) {
      currentIndex++;
      loadQuestion();
   }
});


prev.addEventListener("click", () => {
   if (currentIndex > 0) {
      currentIndex--;
      loadQuestion();
   }
});

restartBtn.addEventListener("click", () => {
   
   currentIndex = 0;
   score = 0;
   selectedAnswers = [];
   timeLeft = 15 * 60; 

   
   resultContainer.style.display="none";
   welcome.style.display = "flex"; 
   quizz.style.display = "none";

   
   startTimer();

   
   loadQuestion();
});