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

const letterGradeResult =
    document.getElementById("letter-grade");

const gradeDescription =
    document.getElementById("grade-description");

const quickWeightButtons =
    document.querySelectorAll(".quick-weights button");


/* =========================================
   Format Number
========================================= */

function formatNumber(value) {

    return value
        .toFixed(2)
        .replace(/0+$/, "")
        .replace(/\.$/, "");
}


/* =========================================
   Letter Grade
========================================= */

function getLetterGrade(percentage) {

    if (percentage >= 95) {
        return {
            grade: "A+",
            description: "ممتاز مرتفع"
        };
    }

    if (percentage >= 90) {
        return {
            grade: "A",
            description: "ممتاز"
        };
    }

    if (percentage >= 85) {
        return {
            grade: "B+",
            description: "جيد جدًا مرتفع"
        };
    }

    if (percentage >= 80) {
        return {
            grade: "B",
            description: "جيد جدًا"
        };
    }

    if (percentage >= 75) {
        return {
            grade: "C+",
            description: "جيد مرتفع"
        };
    }

    if (percentage >= 70) {
        return {
            grade: "C",
            description: "جيد"
        };
    }

    if (percentage >= 65) {
        return {
            grade: "D+",
            description: "مقبول مرتفع"
        };
    }

    if (percentage >= 60) {
        return {
            grade: "D",
            description: "مقبول"
        };
    }

    return {
        grade: "F",
        description: "راسب"
    };
}


/* =========================================
   Quick Weights
========================================= */

quickWeightButtons.forEach((button) => {

    button.addEventListener(
        "click",
        function () {

            weightInput.value =
                this.dataset.weight;

        }
    );

});


/* =========================================
   Calculate
========================================= */

calculateButton.addEventListener(
    "click",
    function () {

        const score =
            parseFloat(scoreInput.value);

        const maxScore =
            parseFloat(maxScoreInput.value);

        const weight =
            parseFloat(weightInput.value);


        /* Validation */

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


        /* Calculations */

        const scorePercentage =
            (score / maxScore) * 100;


        const weightedScore =
            (score / maxScore) * weight;


        const gradeData =
            getLetterGrade(scorePercentage);


        /* Results */

        percentageResult.textContent =
            formatNumber(scorePercentage);


        weightedScoreResult.textContent =
            formatNumber(weightedScore);


        weightedScoreLabel.textContent =
            `من ${formatNumber(weight)}`;


        letterGradeResult.textContent =
            gradeData.grade;


        gradeDescription.textContent =
            gradeData.description;

    }
);
