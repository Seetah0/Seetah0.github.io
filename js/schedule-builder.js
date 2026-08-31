/* =========================================
   WIJHA | Schedule Builder
========================================= */

const courseNameInput =
    document.getElementById("course-name");

const courseDayInput =
    document.getElementById("course-day");

const startTimeInput =
    document.getElementById("start-time");

const endTimeInput =
    document.getElementById("end-time");

const courseRoomInput =
    document.getElementById("course-room");

const addCourseButton =
    document.getElementById("add-schedule-course");

const schedulePreview =
    document.querySelector(".schedule-preview");

const scheduleActions =
    document.getElementById("schedule-actions");

const printScheduleButton =
    document.getElementById("print-schedule");


const daysOrder = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday"
];


const dayNames = {
    Sunday: "الأحد",
    Monday: "الاثنين",
    Tuesday: "الثلاثاء",
    Wednesday: "الأربعاء",
    Thursday: "الخميس"
};


let courses = [];


/* =========================================
   Time Formatter
========================================= */

function formatTime(time) {

    if (!time) {
        return "";
    }

    const [hourString, minute] =
        time.split(":");

    let hour =
        Number(hourString);

    const period =
        hour >= 12 ? "م" : "ص";

    hour =
        hour % 12;

    if (hour === 0) {
        hour = 12;
    }

    return `${hour}:${minute} ${period}`;
}


/* =========================================
   Escape HTML
========================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


/* =========================================
   Update Actions
========================================= */

function updateScheduleActions() {

    if (courses.length > 0) {

        scheduleActions.hidden = false;

    } else {

        scheduleActions.hidden = true;

    }

}


/* =========================================
   Render Schedule
========================================= */

function renderSchedule() {

    schedulePreview.innerHTML = "";


    updateScheduleActions();


    if (courses.length === 0) {

        schedulePreview.innerHTML = `

            <div class="schedule-empty">

                <div class="schedule-empty-icon">
                    🗓️
                </div>

                <h3>
                    جدولك فارغ حاليًا
                </h3>

                <p>
                    أضف أول مادة من الأعلى لتبدأ بتصميم جدولك.
                </p>

            </div>

        `;

        return;
    }


    const wrapper =
        document.createElement("div");

    wrapper.className =
        "weekly-schedule-wrapper";


    const grid =
        document.createElement("div");

    grid.className =
        "weekly-schedule-grid";


    daysOrder.forEach((day) => {

        const column =
            document.createElement("section");

        column.className =
            "weekly-day-column";


        const heading =
            document.createElement("div");

        heading.className =
            "weekly-day-heading";

        heading.textContent =
            dayNames[day];


        column.appendChild(heading);


        const content =
            document.createElement("div");

        content.className =
            "weekly-day-content";


        const dayCourses =
            courses
                .filter(
                    course =>
                        course.day === day
                )
                .sort(
                    (a, b) =>
                        a.startTime.localeCompare(
                            b.startTime
                        )
                );


        if (dayCourses.length === 0) {

            const empty =
                document.createElement("div");

            empty.className =
                "weekly-day-empty";

            empty.textContent =
                "لا توجد محاضرات";

            content.appendChild(empty);

        }


        dayCourses.forEach((course) => {

            const card =
                document.createElement("article");

            card.className =
                "weekly-course-card";


            card.innerHTML = `

                <button
                    type="button"
                    class="schedule-remove-button"
                    data-id="${course.id}"
                    aria-label="حذف المادة"
                >
                    ×
                </button>

                <h4>
                    ${escapeHTML(course.name)}
                </h4>

                <div class="weekly-course-time">

                    ${formatTime(course.startTime)}

                    <span>
                        —
                    </span>

                    ${formatTime(course.endTime)}

                </div>

                ${
                    course.room
                        ? `
                            <div class="weekly-course-room">
                                القاعة ${escapeHTML(course.room)}
                            </div>
                          `
                        : ""
                }

            `;


            content.appendChild(card);

        });


        column.appendChild(content);

        grid.appendChild(column);

    });


    wrapper.appendChild(grid);

    schedulePreview.appendChild(wrapper);

}


/* =========================================
   Add Course
========================================= */

addCourseButton.addEventListener(
    "click",
    function () {

        const name =
            courseNameInput.value.trim();

        const day =
            courseDayInput.value;

        const startTime =
            startTimeInput.value;

        const endTime =
            endTimeInput.value;

        const room =
            courseRoomInput.value.trim();


        if (!name) {

            alert(
                "أدخلي اسم المادة."
            );

            return;
        }


        if (!day) {

            alert(
                "اختاري يوم المحاضرة."
            );

            return;
        }


        if (!startTime) {

            alert(
                "اختاري وقت البداية."
            );

            return;
        }


        if (!endTime) {

            alert(
                "اختاري وقت النهاية."
            );

            return;
        }


        if (endTime <= startTime) {

            alert(
                "وقت النهاية يجب أن يكون بعد وقت البداية."
            );

            return;
        }


        const course = {

            id:
                Date.now() +
                Math.floor(
                    Math.random() * 1000
                ),

            name: name,

            day: day,

            startTime: startTime,

            endTime: endTime,

            room: room

        };


        courses.push(course);


        renderSchedule();


        courseNameInput.value = "";
        courseRoomInput.value = "";

    }
);


/* =========================================
   Remove Course
========================================= */

schedulePreview.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.classList.contains(
                "schedule-remove-button"
            )
        ) {
            return;
        }


        const id =
            Number(
                event.target.dataset.id
            );


        courses =
            courses.filter(
                course =>
                    course.id !== id
            );


        renderSchedule();

    }
);


/* =========================================
   Print / Save PDF
========================================= */

printScheduleButton.addEventListener(
    "click",
    function () {

        if (courses.length === 0) {

            alert(
                "أضيفي مادة واحدة على الأقل قبل الطباعة."
            );

            return;
        }


        window.print();

    }
);


/* =========================================
   Initial
========================================= */

updateScheduleActions();
