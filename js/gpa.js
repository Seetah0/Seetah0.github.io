/* =========================
   WIJHA | GPA Calculator
========================= */

const coursesList = document.querySelector(".courses-list");
const addCourseButton = document.querySelector(".add-course-button");
const calculateButton = document.querySelector(".calculate-gpa-button");

const previousGpaInput = document.getElementById("previous-gpa");
const previousHoursInput = document.getElementById("previous-hours");

const resultCards = document.querySelectorAll(".result-card strong");

let courseCount = 1;


/* =========================
   Create Course Row
========================= */

function createCourseRow() {
    courseCount++;

    const row = document.createElement("div");
    row.className = "course-row";

    row.innerHTML = `
        <div class="course-number">
            ${courseCount}
        </div>

        <div class="course-fields">

            <div class="form-group course-name">

                <label>
                    اسم المادة
                </label>

                <input
                    type="text"
                    placeholder="مثال: قواعد البيانات"
                >

            </div>

            <div class="form-group">

                <label>
                    الساعات
                </label>

                <select class="course-hours">
                    <option value="">اختر</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

            </div>

            <div class="form-group">

                <label>
                    التقدير
                </label>

                <select class="course-grade">

                    <option value="">
                        اختر
                    </option>

                    <option value="5">
                        A+
                    </option>

                    <option value="4.75">
                        A
                    </option>

                    <option value="4.5">
                        B+
                    </option>

                    <option value="4">
                        B
                    </option>

                    <option value="3.5">
                        C+
                    </option>

                    <option value="3">
                        C
                    </option>

                    <option value="2.5">
                        D+
                    </option>

                    <option value="2">
                        D
                    </option>

                    <option value="1">
                        F
                    </option>

                </select>

            </div>

        </div>

        <button
            type="button"
            class="remove-course-button"
            aria-label="حذف المادة"
        >
            ×
        </button>
    `;

    coursesList.appendChild(row);

    renumberCourses();
}


/* =========================
   Renumber Courses
========================= */

function renumberCourses() {
    const rows = document.querySelectorAll(".course-row");

    rows.forEach((row, index) => {
        const number = row.querySelector(".course-number");

        if (number) {
            number.textContent = index + 1;
        }
    });

    courseCount = rows.length;
}


/* =========================
   Remove Course
========================= */

coursesList.addEventListener("click", function (event) {
    if (!event.target.classList.contains("remove-course-button")) {
        return;
    }

    const rows = document.querySelectorAll(".course-row");

    if (rows.length <= 1) {
        return;
    }

    event.target.closest(".course-row").remove();

    renumberCourses();
});


/* =========================
   Add Course
========================= */

addCourseButton.addEventListener("click", function () {
    createCourseRow();
});


/* =========================
   Calculate GPA
========================= */

calculateButton.addEventListener("click", function () {

    const rows = document.querySelectorAll(".course-row");

    let semesterHours = 0;
    let semesterPoints = 0;

    let hasCompleteCourse = false;


    rows.forEach((row) => {

        const hoursSelect =
            row.querySelector(".course-hours");

        const gradeSelect =
            row.querySelector(".course-grade");


        if (!hoursSelect || !gradeSelect) {
            return;
        }


        const hours =
            parseFloat(hoursSelect.value);

        const grade =
            parseFloat(gradeSelect.value);


        if (
            Number.isNaN(hours) ||
            Number.isNaN(grade)
        ) {
            return;
        }


        semesterHours += hours;

        semesterPoints +=
            hours * grade;

        hasCompleteCourse = true;
    });


    /* No complete courses */

    if (!hasCompleteCourse || semesterHours === 0) {

        alert(
            "أضيفي ساعات وتقدير مادة واحدة على الأقل."
        );

        return;
    }


    /* Semester GPA */

    const semesterGpa =
        semesterPoints / semesterHours;


    /* Previous data */

    const previousGpa =
        parseFloat(previousGpaInput.value);

    const previousHours =
        parseFloat(previousHoursInput.value);


    let cumulativeGpa = semesterGpa;


    const hasPreviousData =
        !Number.isNaN(previousGpa) &&
        !Number.isNaN(previousHours) &&
        previousHours > 0;


    if (hasPreviousData) {

        const previousPoints =
            previousGpa * previousHours;

        const totalPoints =
            previousPoints + semesterPoints;

        const totalHours =
            previousHours + semesterHours;

        cumulativeGpa =
            totalPoints / totalHours;
    }


    /* Output */

    resultCards[0].textContent =
        semesterGpa.toFixed(2);

    resultCards[1].textContent =
        cumulativeGpa.toFixed(2);

    resultCards[2].textContent =
        semesterHours;
});
