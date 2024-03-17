import { Qusestions } from "./questions.js";
export class StratQuiz {
    constructor() {
        this.category = document.querySelector("#categoryMenu");
        this.difficultyOptions = document.querySelector("#difficultyOptions");
        this.questionsNumber = document.querySelector("#questionsNumber");
        document
            .querySelector("#startQuiz")
            .addEventListener("click", this.startQuiz.bind(this));
    }

    async startQuiz() {
        if (Number(this.questionsNumber.value)) {
            $(".alert-danger").fadeOut(800);
            const questions = await this.getQuizes();
            new Qusestions(questions);

            document.querySelector(".start-quiz").classList.replace("d-block", "d-none")
            document.querySelector(".questions-container").classList.replace("d-none", "d-block")
        } else {
            $(".alert-danger").fadeIn(800);
        }
    }

    async getQuizes() {
        const data = await fetch(
            `https://opentdb.com/api.php?amount=${this.questionsNumber.value}&category=${this.category.value}&difficulty=${this.difficultyOptions.value}`
        );
        const quizes = await data.json();
        return quizes.results;
    }
}
new StratQuiz();
