export class FinalRsult {
    constructor(finalRsult, userScore) {
        this.finalRsult = finalRsult;
        this.userScore = userScore;
        this.showResults();
    }

    showResults() {
        document.querySelector(".questions-container").innerHTML = `
            <div style="height: 400px" class="animate__animated animate__backInDown final-result shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3">
            
            </div>
        `
    }
}