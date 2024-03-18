export class FinalRsult {
    constructor(finalResult, userScore) {
        this.finalResult = finalResult;
        this.userScore = userScore;
        this.showResults();

        document
            .querySelector("#play-again")
            .addEventListener("click", this.playAgain.bind(this));
    }

    showResults() {
        document.querySelector(".questions-container").innerHTML = `
            <div class="animate__animated animate__backInDown final-result shadow-lg col-lg-8 offset-lg-2 p-4 rounded-3 gap-3">
                <div class='d-flex justify-content-center align-items-center'>
                    ${this.userScore === this.finalResult.length
                        ? "<h3 class='text-center text-success py-4'>🎉 Congratulations, You Answered All Questions</h3>"
                        : this.userScore === 0
                            ? "<h3 class='text-center text-danger pb-4'>❌ You Didn't Answer Any Question (يا فااااشل)</h3>"
                            : `<h3 class='text-center text-dark pb-4'>👌 Your Score IS: (<span class='text-success'>${this.userScore}</span> / ${this.finalResult.length})</h3>`
                    }
                </div>

                <ul>
                    ${this.finalResult.map((quiz) => {
                return `<li>
                                <h5>${quiz.qusestion}</h5>
                                <span class='text-success d-block'>- ✅ ${quiz.correctAnswer
                    }</span>
                                <span class='text-danger d-block'>${quiz.userAnswer === "no answer"
                        ? "- 👎 you didn't answer"
                        : quiz.userAnswer === quiz.correctAnswer
                            ? ""
                            : `- 👎 ${quiz.userAnswer}`
                    }</span>
                            </li>`;
            })}

                    <button type="button" class="btn btn-start rounded-1 mt-4 d-block ms-auto" id="play-again">
                        Play Again
                    </button>
                </ul>
            </div>
        `;
    }

    playAgain() {
        // document.querySelector(".questions-container").classList.replace("d-block", "d-none");
        // document.querySelector(".start-quiz").classList.replace("d-none", "d-block")
        window.location.href = "http://127.0.0.1:5501/index.html";
    }
}
