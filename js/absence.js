/* =========================================
   WIJHA | Absence Calculator
========================================= */

const studyWeeksInput =
    document.getElementById("study-weeks");

const weeklyHoursInput =
    document.getElementById("weekly-hours");

const currentAbsenceInput =
    document.getElementById("current-absence-hours");

const calculateAbsenceButton =
    document.getElementById("calculate-absence");


const absencePercentageResult =
    document.getElementById("absence-percentage");

const remainingHoursResult =
    document.getElementById("remaining-hours");

const totalCourseHoursResult =
    document.getElementById("total-course-hours");


const statusBox =
    document.getElementById("absence-status");

const statusTitle =
    document.getElementById("absence-status-title");

const statusText =
    document.getElementById("absence-status-text");


/* =========================================
   Constants
========================================= */

const ABSENCE_LIMIT = 0.15;


/* =========================================
   Format Number
========================================= */

function formatNumber(value) {

    if (Number.isInteger(value)) {
        return value.toString();
    }

    return value.toFixed(2)
        .replace(/0+$/, "")
        .replace(/\.$/, "");
}


/* =========================================
   Calculate
========================================= */

calculateAbsenceButton.addEventListener(
    "click",
    function () {

        const studyWeeks =
            parseFloat(studyWeeksInput.value);

        const weeklyHours =
            parseFloat(weeklyHoursInput.value);

        const absenceHours =
            parseFloat(currentAbsenceInput.value);


        /* Validation */

        if (
            Number.isNaN(studyWeeks) ||
            studyWeeks <= 0
        ) {

            alert(
                "أدخلي عدد أسابيع الدراسة بشكل صحيح."
            );

            return;
        }


        if (
            Number.isNaN(weeklyHours) ||
            weeklyHours <= 0
        ) {

            alert(
                "أدخلي عدد ساعات المقرر أسبوعيًا بشكل صحيح."
            );

            return;
        }


        if (
            Number.isNaN(absenceHours) ||
            absenceHours < 0
        ) {

            alert(
                "أدخلي ساعات الغياب الحالية بشكل صحيح."
            );

            return;
        }


        /* =========================================
           Calculations
        ========================================= */

        const totalCourseHours =
            studyWeeks * weeklyHours;


        if (absenceHours > totalCourseHours) {

            alert(
                "ساعات الغياب لا يمكن أن تكون أكبر من إجمالي ساعات المقرر."
            );

            return;
        }


        const absencePercentage =
            (absenceHours / totalCourseHours) * 100;


        const limitHours =
            totalCourseHours * ABSENCE_LIMIT;


        const remainingHours =
            Math.max(
                limitHours - absenceHours,
                0
            );


        /* =========================================
           Results
        ========================================= */

        absencePercentageResult.textContent =
            absencePercentage.toFixed(2);

        remainingHoursResult.textContent =
            formatNumber(remainingHours);

        totalCourseHoursResult.textContent =
            formatNumber(totalCourseHours);


        /* =========================================
           Status
        ========================================= */

        statusBox.hidden = false;


        if (absencePercentage < 10) {

            statusTitle.textContent =
                "وضعك جيد";

            statusText.textContent =
                "نسبة الغياب الحالية ما زالت منخفضة، لكن استمري في متابعة سجل الحضور الرسمي.";

        }

        else if (
            absencePercentage >= 10 &&
            absencePercentage < 15
        ) {

            statusTitle.textContent =
                "اقتربتِ من حد الغياب";

            statusText.textContent =
                "نسبة غيابك تقترب من 15%. انتبهي للغيابات القادمة وراجعي سجل الحضور الرسمي.";

        }

        else {

            statusTitle.textContent =
                "وصلتِ إلى 15% أو تجاوزتها";

            statusText.textContent =
                "راجعي حالة المقرر وسجل الغياب الرسمي في الجامعة، لأن الحاسبة تقديرية ولا تحدد القرار الأكاديمي النهائي.";

        }

    }
);/* =========================================
   WIJHA | Absence Calculator
========================================= */

const studyWeeksInput =
    document.getElementById("study-weeks");

const weeklyHoursInput =
    document.getElementById("weekly-hours");

const currentAbsenceInput =
    document.getElementById("current-absence-hours");

const calculateAbsenceButton =
    document.getElementById("calculate-absence");


const absencePercentageResult =
    document.getElementById("absence-percentage");

const remainingHoursResult =
    document.getElementById("remaining-hours");

const totalCourseHoursResult =
    document.getElementById("total-course-hours");


const statusBox =
    document.getElementById("absence-status");

const statusTitle =
    document.getElementById("absence-status-title");

const statusText =
    document.getElementById("absence-status-text");


/* =========================================
   Constants
========================================= */

const ABSENCE_LIMIT = 0.15;


/* =========================================
   Format Number
========================================= */

function formatNumber(value) {

    if (Number.isInteger(value)) {
        return value.toString();
    }

    return value.toFixed(2)
        .replace(/0+$/, "")
        .replace(/\.$/, "");
}


/* =========================================
   Calculate
========================================= */

calculateAbsenceButton.addEventListener(
    "click",
    function () {

        const studyWeeks =
            parseFloat(studyWeeksInput.value);

        const weeklyHours =
            parseFloat(weeklyHoursInput.value);

        const absenceHours =
            parseFloat(currentAbsenceInput.value);


        /* Validation */

        if (
            Number.isNaN(studyWeeks) ||
            studyWeeks <= 0
        ) {

            alert(
                "أدخلي عدد أسابيع الدراسة بشكل صحيح."
            );

            return;
        }


        if (
            Number.isNaN(weeklyHours) ||
            weeklyHours <= 0
        ) {

            alert(
                "أدخلي عدد ساعات المقرر أسبوعيًا بشكل صحيح."
            );

            return;
        }


        if (
            Number.isNaN(absenceHours) ||
            absenceHours < 0
        ) {

            alert(
                "أدخلي ساعات الغياب الحالية بشكل صحيح."
            );

            return;
        }


        /* =========================================
           Calculations
        ========================================= */

        const totalCourseHours =
            studyWeeks * weeklyHours;


        if (absenceHours > totalCourseHours) {

            alert(
                "ساعات الغياب لا يمكن أن تكون أكبر من إجمالي ساعات المقرر."
            );

            return;
        }


        const absencePercentage =
            (absenceHours / totalCourseHours) * 100;


        const limitHours =
            totalCourseHours * ABSENCE_LIMIT;


        const remainingHours =
            Math.max(
                limitHours - absenceHours,
                0
            );


        /* =========================================
           Results
        ========================================= */

        absencePercentageResult.textContent =
            absencePercentage.toFixed(2);

        remainingHoursResult.textContent =
            formatNumber(remainingHours);

        totalCourseHoursResult.textContent =
            formatNumber(totalCourseHours);


        /* =========================================
           Status
        ========================================= */

        statusBox.hidden = false;


        if (absencePercentage < 10) {

            statusTitle.textContent =
                "وضعك جيد";

            statusText.textContent =
                "نسبة الغياب الحالية ما زالت منخفضة، لكن استمري في متابعة سجل الحضور الرسمي.";

        }

        else if (
            absencePercentage >= 10 &&
            absencePercentage < 15
        ) {

            statusTitle.textContent =
                "اقتربتِ من حد الغياب";

            statusText.textContent =
                "نسبة غيابك تقترب من 15%. انتبهي للغيابات القادمة وراجعي سجل الحضور الرسمي.";

        }

        else {

            statusTitle.textContent =
                "وصلتِ إلى 15% أو تجاوزتها";

            statusText.textContent =
                "راجعي حالة المقرر وسجل الغياب الرسمي في الجامعة، لأن الحاسبة تقديرية ولا تحدد القرار الأكاديمي النهائي.";

        }

    }
);
