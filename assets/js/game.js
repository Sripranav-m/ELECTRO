const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = {}
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: " I should take showers instead of baths to conserve energy.",
        choice1: "True",
        choice2: "False",
        choice3: "I wont Take Bath",
        choice4: "None",
        answer: 2,
    },
    {
        question: " Fluorescent lights are more energy-efficient than incandescent lights.",
        choice1: "True",
        choice2: "False",
        choice3: "Both are equivalent",
        choice4: "None",
        answer: 1,
    },
    {
        question: "Microwave ovens are more energy-efficient than regular stoves.",
        choice1: "True",
        choice2: "False",
        choice3: "Both are equivalent",
        choice4: "None",
        answer: 1,
    },
    {
        question: "Which of the following is a fossil fuel?",
        choice1: "Wind",
        choice2: "Coal",
        choice3: "Solar",
        choice4: "Biomass",
        answer: 2,
    },
    {
        question: "Which of the following is a nonrenewable resource?",
        choice1: "Milk",
        choice2: "Coal",
        choice3: "Water",
        choice4: "Biomass",
        answer: 2,
    },
    {
        question: "What are two advantages of geothermal energy?",
        choice1: "cheap and a lot pollution",
        choice2: "expensive and a lot of pollution",
        choice3: "cheap and little pollution",
        choice4: "expensive and little pollution",
        answer: 3,
    },
    {
        question: "When one large nucleus is split into two smaller nuclei, the process is nuclear",
        choice1: "Fusion",
        choice2: "Fission",
        choice3: "Tracing",
        choice4: "Decay",
        answer: 2,
    },
    {
        question: "Which among the following have a large amount of installed grid interactive renewable power capacity in India",
        choice1: "Wind power",
        choice2: "Solar power",
        choice3: "Hydro power",
        choice4: "Biomass power",
        answer: 1,
    },
    {
        question: "Wood is a renewable resource.",
        choice1: "True",
        choice2: "False",
        choice3: "Cannot be determined",
        choice4: "Not any of these",
        answer: 1,
    },
    {
        question: "The main composition of biogas is",
        choice1: "Methane",
        choice2: "Carbon dioxide",
        choice3: "Nitrogen",
        choice4: "Hydrogen",
        answer: 1,
    },
    {
        question: "Nuclear Energy is a Renewable Energy.",
        choice1: "True",
        choice2: "False",
        choice3: "Cannot be determined",
        choice4: "Not any of these",
        answer: 2,
    },
    {
        question: "Energy resources derived from natural organic materials are called ",
        choice1: "geothermal energy sources",
        choice2: "fossil fuels",
        choice3: "biomass",
        choice4: "All of these",
        answer: 2,
    },
    {
        question: "Which of the following is a disadvantage of renewable energy ",
        choice1: "High Pollution",
        choice2: "Available only in few places",
        choice3: "High running cost",
        choice4: "Unreliable supply",
        answer: 4,
    }
]


const SCORE_POINTS = 15
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/ MAX_QUESTIONS) * 100}%`
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        
        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        else if(classToApply === 'incorrect'){
            decrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

decrementScore = num1 => {
    score -= num1
    scoreText.innerText =  score
}
startGame()