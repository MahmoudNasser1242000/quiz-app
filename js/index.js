export class StratQuiz {
    constructor() {
        this.category = document.querySelector("#categoryMenu");
        this.difficultyOptions = document.querySelector("#difficultyOptions");
        this.questionsNumber = document.querySelector("#questionsNumber");
        document
            .querySelector("#startQuiz")
            .addEventListener("click", this.startQuiz.bind(this));
        this.questions;
    }

    async startQuiz() {
        if (!this.questionsNumber.value) {
            $(".alert-danger").fadeIn(800);
        } else {
            $(".alert-danger").fadeOut(800);
            this.questions = await this.getQuizes();
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
