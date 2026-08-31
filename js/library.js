/* =========================================
   WIJHA | Student Library
========================================= */

const instructionsToggle =
    document.getElementById("student-instructions-toggle");

const instructionsDetails =
    document.getElementById("student-instructions-details");


instructionsToggle.addEventListener(
    "click",
    function () {

        const isOpen =
            this.getAttribute("aria-expanded") === "true";

        this.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        instructionsDetails.hidden =
            isOpen;

    }
);
