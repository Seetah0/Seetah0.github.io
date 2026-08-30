/* =========================================
   WIJHA | وِجهة
   GPA Calculator
========================================= */


/* =========================================
   GPA Scales
========================================= */

const GPA_SCALES = {

    5: [
        { label: "A+", value: 5.00 },
        { label: "A",  value: 4.75 },
        { label: "B+", value: 4.50 },
        { label: "B",  value: 4.00 },
        { label: "C+", value: 3.50 },
        { label: "C",  value: 3.00 },
        { label: "D+", value: 2.50 },
        { label: "D",  value: 2.00 },
        { label: "F",  value: 1.00 }
    ],

    4: [
        { label: "A+", value: 4.00 },
        { label: "A",  value: 3.75 },
        { label: "B+", value: 3.50 },
        { label: "B",  value: 3.00 },
        { label: "C+", value: 2.50 },
        { label: "C",  value: 2.00 },
        { label: "D+", value: 1.50 },
        { label: "D",  value: 1.00 },
        { label: "F",  value: 0.00 }
    ]

};


/* =========================================
   Elements
========================================= */

const coursesList =
    document.querySelector(".courses-list");

const addCourseButton =
    document.querySelector(".add-course-button");

const calculateButton =
    document.querySelector(".calculate-gpa-button");

const previousGpaInput =
    document.getElementById("previous-gpa");

const previousHoursInput =
    document.getElementById("previous-hours");

const previousGpaScaleText =
    document.getElementById("previous-gpa-scale");

const scaleInputs =
    document.querySelectorAll('input[name="gpa-scale"]');

const scaleOptions =
    document.querySelectorAll(".scale-option");

const resultCards =
    document.querySelectorAll(".result-card strong");

const resultScaleTexts =
    document.querySelectorAll(".result-card small");


let currentScale = 5;


/* =========================================
   Grade Options
========================================= */

function buildGradeOptions(selectElement) {

    if (!selectElement) {
        return;
    }

    selectElement.innerHTML =
        '<option value="">اختر</option>';


    GPA_SCALES[currentScale].forEach((grade) => {

        const option =
            document.createElement("option");

        option.value =
            grade.value;

        option.textContent =
            grade.label;

        selectElement.appendChild(option);

    });

}


/* تحديث جميع قوائم التقدير */

function updateAllGradeSelects() {

    const gradeSelects =
        document.querySelectorAll(".course-grade");

    gradeSelects.forEach((select) => {
        buildGradeOptions(select);
    });

}


/* =========================================
   Change GPA Scale
========================================= */

function changeScale(newScale) {

    currentScale =
        Number(newScale);


    /* تحديث الشكل */

    scaleOptions.forEach((option) => {

        const radio =
            option.querySelector('input[name="gpa-scale"]');

        if (Number(radio.value) === currentScale) {

            option.classList.add("active");

        } else {

            option.classList.remove("active");

        }

    });


    /* تحديث المعدل السابق */

    previousGpaInput.max =
        currentScale;

    previousGpaInput.placeholder =
        currentScale === 5
            ? "مثال: 4.25"
            : "مثال: 3.25";


    if (previousGpaScaleText) {

        previousGpaScaleText.textContent =
            `من ${currentScale.toFixed(2)}`;

    }


    /* تحديث التقديرات */

    updateAllGradeSelects();


    /* تحديث نتائج الحاسبة */

    if (resultCards.length >= 3) {

        resultCards[0].textContent = "—";
        resultCards[1].textContent = "—";
        resultCards[2].textContent = "—";

    }


    /* تحديث النص تحت النتائج */

    if (resultScaleTexts.length >= 2) {

        resultScaleTexts[0].textContent =
            `من ${currentScale.toFixed(2)}`;

        resultScaleTexts[1].textContent =
            `من ${currentScale.toFixed(2)}`;

    }

}


/* الاستماع لاختيار النظام */

scaleInputs.forEach((input) => {

    input.addEventListener("change", function () {

        changeScale(this.value);

    });

});


/* =========================================
   Create Course Row
========================================= */

function createCourseRow() {

    const rows =
        document.querySelectorAll(".course-row");

    const courseNumber =
        rows.length + 1;


    const row =
        document.createElement("div");

    row.className =
        "course-row";


    row.innerHTML = `

        <div class="course-number">
            ${courseNumber}
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

                    <option value="">
                        اختر
                    </option>

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


    /* تعبئة درجات النظام الحالي */

    const newGradeSelect =
        row.querySelector(".course-grade");

    buildGradeOptions(newGradeSelect);


    renumberCourses();

}


/* =========================================
   Renumber Courses
========================================= */

function renumberCourses() {

    const rows =
        document.querySelectorAll(".course-row");


    rows.forEach((row, index) => {

        const number =
            row.querySelector(".course-number");

        if (number) {
            number.textContent =
                index + 1;
        }

    });

}


/* =========================================
   Add Course
========================================= */

addCourseButton.addEventListener(
    "click",
    function () {

        createCourseRow();

    }
);


/* =========================================
   Remove Course
========================================= */

coursesList.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.classList.contains(
                "remove-course-button"
            )
        ) {
            return;
        }


        const rows =
            document.querySelectorAll(".course-row");


        if (rows.length <= 1) {

            alert(
                "يجب أن تبقى مادة واحدة على الأقل."
            );

            return;
        }


        event.target
            .closest(".course-row")
            .remove();


        renumberCourses();

    }
);


/* =========================================
   Calculate GPA
========================================= */

calculateButton.addEventListener(
    "click",
    function () {

        const rows =
            document.querySelectorAll(".course-row");


        let semesterHours = 0;
        let semesterPoints = 0;

        let completeCourses = 0;


        /* حساب مواد الفصل */

        rows.forEach((row) => {

            const hoursSelect =
                row.querySelector(".course-hours");

            const gradeSelect =
                row.querySelector(".course-grade");


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


            semesterHours +=
                hours;

            semesterPoints +=
                hours * grade;

            completeCourses++;

        });


        /* لا توجد مواد مكتملة */

        if (
            completeCourses === 0 ||
            semesterHours === 0
        ) {

            alert(
                "أضيفي ساعات وتقدير مادة واحدة على الأقل."
            );

            return;

        }


        /* المعدل الفصلي */

        const semesterGpa =
            semesterPoints / semesterHours;


        /* البيانات السابقة */

        const previousGpaValue =
            previousGpaInput.value.trim();

        const previousHoursValue =
            previousHoursInput.value.trim();


        let cumulativeGpa =
            semesterGpa;


        /* إذا تم إدخال إحدى القيم السابقة فقط */

        if (
            (previousGpaValue && !previousHoursValue) ||
            (!previousGpaValue && previousHoursValue)
        ) {

            alert(
                "إذا كنتِ تريدين حساب المعدل التراكمي، أدخلي المعدل السابق والساعات السابقة معًا."
            );

            return;

        }


        /* حساب المعدل التراكمي */

        if (
            previousGpaValue &&
            previousHoursValue
        ) {

            const previousGpa =
                parseFloat(previousGpaValue);

            const previousHours =
                parseFloat(previousHoursValue);


            if (
                Number.isNaN(previousGpa) ||
                previousGpa < 0 ||
                previousGpa > currentScale
            ) {

                alert(
                    `المعدل السابق يجب أن يكون بين 0 و ${currentScale.toFixed(2)}.`
                );

                return;

            }


            if (
                Number.isNaN(previousHours) ||
                previousHours <= 0
            ) {

                alert(
                    "أدخلي عدد الساعات السابقة بشكل صحيح."
                );

                return;

            }


            const previousPoints =
                previousGpa * previousHours;


            const totalPoints =
                previousPoints + semesterPoints;


            const totalHours =
                previousHours + semesterHours;


            cumulativeGpa =
                totalPoints / totalHours;

        }


        /* =========================================
           Results
        ========================================= */

        resultCards[0].textContent =
            semesterGpa.toFixed(2);

        resultCards[1].textContent =
            cumulativeGpa.toFixed(2);

        resultCards[2].textContent =
            semesterHours;

    }
);


/* =========================================
   Initial State
========================================= */

changeScale(5);
