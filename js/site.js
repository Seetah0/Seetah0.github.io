/* =========================================
   WIJHA | Global Site Controls
========================================= */

const themeButton =
    document.querySelector(
        'button[aria-label="الوضع الليلي"]'
    );

const notificationButton =
    document.querySelector(
        'button[aria-label="الإشعارات"]'
    );


/* =========================================
   Dark Mode
========================================= */

function applySavedTheme() {

    const savedTheme =
        localStorage.getItem("wijha-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        if (themeButton) {
            themeButton.textContent = "☀️";
            themeButton.setAttribute(
                "aria-label",
                "الوضع النهاري"
            );
        }

    }

}


if (themeButton) {

    themeButton.addEventListener(
        "click",
        function () {

            const darkMode =
                document.body.classList.toggle(
                    "dark-mode"
                );


            if (darkMode) {

                localStorage.setItem(
                    "wijha-theme",
                    "dark"
                );

                this.textContent = "☀️";

                this.setAttribute(
                    "aria-label",
                    "الوضع النهاري"
                );

            } else {

                localStorage.setItem(
                    "wijha-theme",
                    "light"
                );

                this.textContent = "🌙";

                this.setAttribute(
                    "aria-label",
                    "الوضع الليلي"
                );

            }

        }
    );

}


/* =========================================
   Notifications
========================================= */

let notificationPanel = null;


function createNotificationPanel() {

    if (notificationPanel) {
        return;
    }


    notificationPanel =
        document.createElement("div");

    notificationPanel.className =
        "notification-panel";

    notificationPanel.hidden = true;


    notificationPanel.innerHTML = `

        <div class="notification-header">

            <div>
                <span>وِجهة</span>
                <h3>التنبيهات</h3>
            </div>

            <button
                type="button"
                class="notification-close"
                aria-label="إغلاق التنبيهات"
            >
                ×
            </button>

        </div>


        <div class="notification-content">

            <div class="notification-item">

                <div class="notification-item-icon">
                    📅
                </div>

                <div>

                    <strong>
                        الأحداث القادمة
                    </strong>

                    <p>
                        تابع أهم المواعيد والفعاليات الجامعية القادمة من الصفحة الرئيسية.
                    </p>

                </div>

            </div>


            <div class="notification-item">

                <div class="notification-item-icon">
                    📰
                </div>

                <div>

                    <strong>
                        أخبار الجامعة
                    </strong>

                    <p>
                        الأخبار المعروضة في وِجهة تأتي من المصادر الرسمية للجامعة.
                    </p>

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(
        notificationPanel
    );


    const closeButton =
        notificationPanel.querySelector(
            ".notification-close"
        );


    closeButton.addEventListener(
        "click",
        function () {

            notificationPanel.hidden = true;

        }
    );

}


if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            createNotificationPanel();

            notificationPanel.hidden =
                !notificationPanel.hidden;

        }
    );

}


/* إغلاق التنبيهات عند الضغط خارجها */

document.addEventListener(
    "click",
    function (event) {

        if (
            notificationPanel &&
            !notificationPanel.hidden &&
            !notificationPanel.contains(event.target) &&
            event.target !== notificationButton
        ) {

            notificationPanel.hidden = true;

        }

    }
);


/* تشغيل الثيم عند تحميل الصفحة */

applySavedTheme();
