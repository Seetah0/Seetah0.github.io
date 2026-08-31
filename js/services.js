/* =========================================
   WIJHA | Services
========================================= */

const counselingToggle =
    document.getElementById("counseling-toggle");

const counselingDetails =
    document.getElementById("counseling-details");


counselingToggle.addEventListener(
    "click",
    function () {

        const isOpen =
            this.getAttribute("aria-expanded") === "true";


        this.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );


        counselingDetails.hidden =
            isOpen;


        if (!isOpen) {

            setTimeout(
                function () {

                    counselingDetails.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                },
                100
            );

        }

    }
);
