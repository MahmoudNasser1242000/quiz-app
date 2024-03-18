import { FinalRsult } from "./final-result.js";

export class Qusestions {
    constructor(qusestions) {
        this.qusestions = qusestions;
        this.currentQuiz = 0;
        this.results = [];
        this.score = 0;
        this.timer = 0;
        this.finishAnswer = [];
        this.showQuestion();
        this.counter();
        document
            .querySelector(".questions-container")
            .addEventListener("click", this.chooseAnswer.bind(this));
    }

    showQuestion() {
        if (this.currentQuiz !== this.qusestions.length) {
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
                <span class="fs-6 btn btn-questions">${this.currentQuiz + 1
                } of ${this.qusestions?.length}</span>
            </div>
            <h2 class="text-capitalize h4 text-center">${this.qusestions[this.currentQuiz]?.question
                }</h2>
            <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
                ${this.results
                    ?.map((answer) => {
                        return `<li class="answer">${answer}</li>`;
                    })
                    .join("")}
            </ul>
            <h2 class="text-capitalize text-center score-color h3 fw-bold timer">
                
            </h2>
        </div>`;
        } else {
            this.results = [];
            document.querySelector(".questions-container").innerHTML = "";
        }
    }

    chooseAnswer(e) {
        if (this.currentQuiz !== this.qusestions.length) {
            if (e.target.classList.contains("answer")) {
                if (
                    e.target.innerText ===
                    this.qusestions[this.currentQuiz].correct_answer
                ) {
                    e.target.classList.add(
                        "correct",
                        "animate__animated",
                        "animate__flipInY"
                    );
                } else {
                    e.target.classList.add(
                        "wrong",
                        "animate__animated",
                        "animate__shakeX"
                    );
                }
            }

            this.nextAnimation(
                this.qusestions[this.currentQuiz].correct_answer,
                e.target.innerText
            );
        } else {
            new FinalRsult(this.finishAnswer, this.score);
        }
    }

    nextQuestion(correctAnswer, userAnswer) {
        this.finishAnswer.push({
            qusestion: this.qusestions[this.currentQuiz].question,
            correctAnswer,
            userAnswer,
        });

        if (correctAnswer === userAnswer) {
            this.score++;
        }

        this.currentQuiz++;

        this.showQuestion();
    }

    nextAnimation(correctAnswer, userAnswer) {
        setTimeout(() => {
            document
                .querySelector(".question")
                .classList.add("animate__animated", "animate__bounceOutLeft");

            setTimeout(() => {
                this.nextQuestion(correctAnswer, userAnswer);
            }, 500);
        }, 1000);
    }

    counter() {
        const time = setInterval(() => {
            if (this.currentQuiz !== this.qusestions.length) {
                this.timer++;
                document.querySelector(".timer").innerHTML = `⏱︎
                00:${this.timer.toString().length === 1
                        ? "0" + this.timer
                        : this.timer
                    }`;
                // this.showQuestion();
                // document
                //     .querySelector(".question")
                //     .classList.remove("animate__animated", "animate__bounceIn");

                if (this.timer === 20) {
                    this.timer = 0;
                    this.nextAnimation(
                        this.qusestions[this.currentQuiz].correct_answer,
                        "no answer"
                    );
                }
            } else {
                clearInterval(time);
                new FinalRsult(this.finishAnswer, this.score);
            }
        }, 1000);
    }
}
// new Qusestions();
