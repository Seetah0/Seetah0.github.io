/* =========================================
   WIJHA | News & Events
========================================= */


/* =========================================
   Main Tabs
========================================= */

const newsTabs =
    document.querySelectorAll(".news-tab");

const newsPanel =
    document.getElementById("news-panel");

const eventsPanel =
    document.getElementById("events-panel");


newsTabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

        const selected =
            this.dataset.newsTab;


        newsTabs.forEach(function (item) {
            item.classList.remove("active");
        });


        this.classList.add("active");


        if (selected === "news") {

            newsPanel.hidden = false;
            eventsPanel.hidden = true;

        }


        if (selected === "events") {

            newsPanel.hidden = true;
            eventsPanel.hidden = false;

        }

    });

});


/* =========================================
   News Filters
========================================= */

const newsFilters =
    document.querySelectorAll(".news-filter");

const newsCards =
    document.querySelectorAll(".wijha-news-card");

const newsNoResults =
    document.getElementById("news-no-results");


newsFilters.forEach(function (filterButton) {

    filterButton.addEventListener("click", function () {

        const selectedFilter =
            this.dataset.filter;


        newsFilters.forEach(function (button) {
            button.classList.remove("active");
        });


        this.classList.add("active");


        let visibleCount = 0;


        newsCards.forEach(function (card) {

            const category =
                card.dataset.category;


            const shouldShow =
                selectedFilter === "all" ||
                category === selectedFilter;


            card.hidden =
                !shouldShow;


            if (shouldShow) {
                visibleCount++;
            }

        });


        newsNoResults.hidden =
            visibleCount !== 0;

    });

});


/* =========================================
   Events Data
   TEST DATA ONLY
========================================= */

/*
    هذه البيانات للتجربة فقط.

    لاحقًا نستبدلها بفعاليات رسمية من IAU.

    start:
    بداية الفعالية

    end:
    نهاية الفعالية

    registrationUrl:
    إذا لم يوجد رابط تسجيل نضع null
*/

const events = [

    {
        title: "فعالية طلابية تجريبية",
        category: "فعالية طلابية",

        location: "المدينة الجامعية",

        start: "2026-09-15T10:00:00+03:00",
        end: "2026-09-15T13:00:00+03:00",

        detailsUrl: "#",
        registrationUrl: "#"
    },

    {
        title: "لقاء أكاديمي تجريبي",
        category: "فعالية أكاديمية",

        location: "جامعة الإمام عبدالرحمن بن فيصل",

        start: "2026-09-23T09:00:00+03:00",
        end: "2026-09-23T11:00:00+03:00",

        detailsUrl: "#",
        registrationUrl: null
    },

    /*
        فعالية قديمة متعمدة حتى نتأكد
        أنها تنتقل تلقائيًا إلى السابقة.
    */

    {
        title: "فعالية سابقة تجريبية",
        category: "فعالية طلابية",

        location: "الجامعة",

        start: "2026-08-20T10:00:00+03:00",
        end: "2026-08-20T12:00:00+03:00",

        detailsUrl: "#",
        registrationUrl: null
    }

];


/* =========================================
   Event Rendering
========================================= */

const upcomingEventsContainer =
    document.getElementById("upcoming-events");

const pastEventsContainer =
    document.getElementById("past-events");

const upcomingEmpty =
    document.getElementById("upcoming-empty");

const pastEmpty =
    document.getElementById("past-empty");


const arabicMonths = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر"
];


function formatTime(date) {

    return date.toLocaleTimeString(
        "ar-SA",
        {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        }
    );

}


function createEventCard(event) {

    const start =
        new Date(event.start);

    const end =
        new Date(event.end);


    const card =
        document.createElement("article");

    card.className =
        "event-directory-card";


    let registrationButton = "";


    if (event.registrationUrl) {

        registrationButton = `
            <a
                href="${event.registrationUrl}"
                class="event-action event-register"
                target="_blank"
                rel="noopener"
            >
                سجّل الآن ↗
            </a>
        `;

    }


    card.innerHTML = `

        <div class="event-date-box">

            <strong>
                ${start.getDate()}
            </strong>

            <span>
                ${arabicMonths[start.getMonth()]}
            </span>

        </div>


        <div class="event-content">

            <h3>
                ${event.title}
            </h3>


            <div class="event-information">

                <span>
                    📍 ${event.location}
                </span>

                <span>
                    🕐 ${formatTime(start)} – ${formatTime(end)}
                </span>

                <span>
                    🏷️ ${event.category}
                </span>

            </div>


            <div class="event-actions">

                <a
                    href="${event.detailsUrl}"
                    class="event-action"
                    target="_blank"
                    rel="noopener"
                >
                    تفاصيل الفعالية ↗
                </a>

                ${registrationButton}

            </div>

        </div>
    `;


    return card;

}


/* =========================================
   Automatic Upcoming / Past Sorting
========================================= */

function renderEvents() {

    const now =
        new Date();


    upcomingEventsContainer.innerHTML = "";
    pastEventsContainer.innerHTML = "";


    const upcoming =
        events
            .filter(function (event) {

                return new Date(event.end) >= now;

            })
            .sort(function (a, b) {

                return (
                    new Date(a.start) -
                    new Date(b.start)
                );

            });


    const past =
        events
            .filter(function (event) {

                return new Date(event.end) < now;

            })
            .sort(function (a, b) {

                return (
                    new Date(b.start) -
                    new Date(a.start)
                );

            });


    upcoming.forEach(function (event) {

        upcomingEventsContainer.appendChild(
            createEventCard(event)
        );

    });


    past.forEach(function (event) {

        pastEventsContainer.appendChild(
            createEventCard(event)
        );

    });


    upcomingEmpty.hidden =
        upcoming.length !== 0;


    pastEmpty.hidden =
        past.length !== 0;

}


renderEvents();
