/* =========================================
   WIJHA | Grade Converter
========================================= */

const scoreInput =
    document.getElementById("score");

const maxScoreInput =
    document.getElementById("max-score");

const weightInput =
    document.getElementById("weight");

const calculateButton =
    document.getElementById("calculate-grade");

const percentageResult =
    document.getElementById("score-percentage");

const weightedScoreResult =
    document.getElementById("weighted-score");

const weightedScoreLabel =
    document.getElementById("weighted-score-label");

const lostScoreResult =
    document.getElementById("lost-score");

const quickWeightButtons =
    document.querySelectorAll(".quick-weights button");


function formatNumber(value) {

    return value
        .toFixed(2)
        .replace(/0+$/, "")
        .replace(/\.$/, "");
}


/* الأوزان السريعة */

quickWeightButtons.forEach((button) => {

    button.addEventListener("click", function () {

        weightInput.value =
            this.dataset.weight;

    });

});


/* الحساب */

calculateButton.addEventListener(
    "click",
    function () {

        const score =
            parseFloat(scoreInput.value);

        const maxScore =
            parseFloat(maxScoreInput.value);

        const weight =
            parseFloat(weightInput.value);


        if (
            Number.isNaN(score) ||
            score < 0
        ) {

            alert(
                "أدخلي درجتك بشكل صحيح."
            );

            return;
        }


        if (
            Number.isNaN(maxScore) ||
            maxScore <= 0
        ) {

            alert(
                "أدخلي الدرجة الكاملة بشكل صحيح."
            );

            return;
        }


        if (score > maxScore) {

            alert(
                "درجتك لا يمكن أن تكون أكبر من الدرجة الكاملة."
            );

            return;
        }


        if (
            Number.isNaN(weight) ||
            weight <= 0 ||
            weight > 100
        ) {

            alert(
                "أدخلي وزن التقييم بين 0 و100."
            );

            return;
        }


        const scorePercentage =
            (score / maxScore) * 100;


        const weightedScore =
            (score / maxScore) * weight;


        const lostScore =
            weight - weightedScore;


        percentageResult.textContent =
            formatNumber(scorePercentage);


        weightedScoreResult.textContent =
            formatNumber(weightedScore);


        weightedScoreLabel.textContent =
            `من ${formatNumber(weight)}`;


        lostScoreResult.textContent =
            formatNumber(lostScore);

    }
);
