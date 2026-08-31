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
   Render Schedule
========================================= */

function renderSchedule() {

    schedulePreview.innerHTML = "";


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


    const daysOrder = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
    ];


    daysOrder.forEach((day) => {

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
            return;
        }


        const daySection =
            document.createElement("section");

        daySection.className =
            "schedule-day";


        const heading =
            document.createElement("h3");

        heading.className =
            "schedule-day-title";

        heading.textContent =
            dayNames[day];


        daySection.appendChild(heading);


        dayCourses.forEach((course) => {

            const card =
                document.createElement("article");

            card.className =
                "schedule-course-card";


            card.innerHTML = `

                <div class="schedule-course-info">

                    <h4>
                        ${course.name}
                    </h4>

                    <p>
                        ${formatTime(course.startTime)}
                        —
                        ${formatTime(course.endTime)}
                    </p>

                    ${
                        course.room
                            ? `<span>القاعة: ${course.room}</span>`
                            : ""
                    }

                </div>


                <button
                    type="button"
                    class="schedule-remove-button"
                    data-id="${course.id}"
                    aria-label="حذف المادة"
                >
                    ×
                </button>

            `;


            daySection.appendChild(card);

        });


        schedulePreview.appendChild(
            daySection
        );

    });

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

            id: Date.now(),

            name: name,

            day: day,

            startTime: startTime,

            endTime: endTime,

            room: room

        };


        courses.push(course);


        renderSchedule();


        /* تفريغ الحقول */

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
