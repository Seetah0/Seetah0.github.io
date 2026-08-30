/* =========================
   WIJHA | وِجهة
   Main JavaScript
========================= */


/* =========================
   Upcoming Event Countdown
========================= */

const eventCard = document.getElementById("next-event");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");


function updateCountdown() {

    if (!eventCard) {
        return;
    }

    const targetDate = new Date(
        eventCard.dataset.date
    ).getTime();

    const now = new Date().getTime();

    const difference =
        targetDate - now;


    /* إذا انتهى الحدث */

    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";

        return;
    }


    /* حساب الوقت */

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );


    const minutes = Math.floor(
        (difference % (1000 * 60 * 60))
        / (1000 * 60)
    );


    /* عرض النتائج */

    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");
}


/* تشغيل العداد مباشرة */

updateCountdown();


/* تحديثه كل دقيقة */

setInterval(
    updateCountdown,
    60000
);
