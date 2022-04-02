// need to have a few const for the JSON strings

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = firstQuestions.concat(
    randomQuestions.sort(() => Math.random() - 0.5)
  );
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// var question1 = db.query('SELECT Ques FROM Quiz WHERE Q_id = "Q1"', function (err, result){
//   if(err){
//     console.error(err);
//     return;
//   }
// });
// var option1 = db.query('SELECT Op1 FROM Quiz WHERE Q_id = "Q1"', function (err, result){
//   if(err){
//     console.error(err);
//     return;
//   }
// });

const firstQuestions = [
  {
    question: "question1", //"question1" will be replcaed with JSONstring.Ques
    answers: [
      { text: "option1", correct: false },
      { text: "hip-hop", correct: false },
      { text: "classical", correct: true },
      { text: "RnB", correct: false },
      { text: "House", correct: false },
    ],
  },
  {
    question: "What year of rap did you enjoy the most?",
    answers: [
      { text: "80s", correct: false },
      { text: "90s", correct: false },
      { text: "00s", correct: false },
      { text: "10s", correct: true },
      { text: "20s", correct: false },
    ],
  },
];

const randomQuestions = [
  {
    question: "Do you before male artists or female artists?",
    answers: [
      { text: "male", correct: true },
      { text: "female", correct: false },
      { text: "does not matter", correct: false },
    ],
  },
  {
    question: "Solo or feature(s)",
    answers: [
      { text: "Solo", correct: true },
      { text: "Features", correct: false },
    ],
  },
];
