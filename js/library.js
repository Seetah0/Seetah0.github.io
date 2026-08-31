/* =========================================
   WIJHA | Student Library
========================================= */


/* -----------------------------------------
   Main Library Tabs
----------------------------------------- */

const libraryTabs =
    document.querySelectorAll(".library-tab");

const documentsPanel =
    document.getElementById("library-documents");

const faqPanel =
    document.getElementById("library-faq");


libraryTabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

        const selectedTab =
            this.dataset.libraryTab;


        libraryTabs.forEach(function (item) {
            item.classList.remove("active");
        });


        this.classList.add("active");


        if (selectedTab === "documents") {

            documentsPanel.hidden = false;
            faqPanel.hidden = true;

        }


        if (selectedTab === "faq") {

            documentsPanel.hidden = true;
            faqPanel.hidden = false;

        }

    });

});


/* -----------------------------------------
   Student Instructions
----------------------------------------- */

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
