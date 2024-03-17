export class Qusestions {
    constructor(qusestions) {
        this.qusestions = qusestions;
        this.currentQuiz = 0;
        this.results = [];
        this.score = 0;
        this.timer = 0;
        this.counter();
        this.showQuestion();
        document
            .querySelector(".questions-container")
            .addEventListener("click", this.chooseAnswer.bind(this));
    }

    showQuestion() {
        this.results = [
            this.qusestions[this.currentQuiz]?.correct_answer,
            ...this.qusestions[this.currentQuiz]?.incorrect_answers,
        ]
            .sort()
            .reverse();
        document.querySelector(".questions-container").innerHTML = `<div
        class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn">
        <div class="w-100 d-flex justify-content-between">
            <span class="btn btn-category">${this.qusestions[this.currentQuiz]?.category
            }</span>
            <span class="fs-6 btn btn-questions">${this.currentQuiz + 1} of ${this.qusestions?.length
            }</span>
        </div>
        <h2 class="text-capitalize h4 text-center">${this.qusestions[this.currentQuiz]?.question
            }</h2>
        <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
            ${this.results
                ?.map((answer) => {
                    return `<li class="answer animate__animated">${answer}</li>`;
                })
                .join("")}
        </ul>
        <h2 class="text-capitalize text-center score-color h3 fw-bold">
            ⏱︎
            00:${this.timer.toString().length === 1 ? "0" + this.timer : this.timer
            }
        </h2>
    </div>`;
    }

    chooseAnswer(e) {
        console.log(e.target.innerText);
        if (e.target.classList.contains("answer")) {
            if (
                e.target.innerText === this.qusestions[this.currentQuiz].correct_answer
            ) {
                e.target.classList.add("correct", "animate__flipInY");
                e.target.classList.remove("wrong", "animate__shakeX");
            } else {
                e.target.classList.remove("correct", "animate__flipInY");
                e.target.classList.add("wrong", "animate__shakeX");
            }

            this.nextAnimation(
                this.qusestions[this.currentQuiz].correct_answer,
                e.target.innerText
            );
        }
    }

    nextQuestion(correctAnswer, userAnswer) {
        const finishAnswer = [];
        finishAnswer.push({
            qusestion: this.qusestions[this.currentQuiz].question,
            correctAnswer,
            userAnswer,
        });

        if (correctAnswer === userAnswer) {
            this.score++;
        }

        if (this.currentQuiz < this.qusestions?.length) {
            this.currentQuiz++;
            this.showQuestion();
        } else {
            this.currentQuiz = 0;
            console.log("finish");
        }

        console.log(finishAnswer);
    }

    nextAnimation(correctAnswer, userAnswer) {
        setTimeout(() => {
            document
                .querySelector(".question")
                .classList.add("animate__animated", "animate__bounceOutLeft");

            setTimeout(() => {
                document
                    .querySelector(".question")
                    .classList.remove("animate__animated", "animate__bounceOutLeft");
                this.nextQuestion(correctAnswer, userAnswer);
            }, 500);
        }, 1000);
    }

    counter() {
        const time = setInterval(() => {
            this.timer++;
            this.showQuestion();
            document
                .querySelector(".question")
                .classList.remove("animate__animated", "animate__bounceIn");

            if (this.timer === 5) {
                this.nextAnimation(
                    this.qusestions[this.currentQuiz].correct_answer,
                    "no answer"
                );
                setTimeout(() => {
                    this.timer = 0;
                }, 1000);
            }
        }, 1000);
    }
}
// new Qusestions();
