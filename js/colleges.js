/* =========================================
   WIJHA | Colleges & Programs
========================================= */

const programTabs =
    document.querySelectorAll(".program-tab");

const bachelorPanel =
    document.getElementById("bachelor-programs");

const diplomaPanel =
    document.getElementById("diploma-programs");

const searchInput =
    document.getElementById("program-search");

const noResults =
    document.getElementById("program-no-results");


/* =========================================
   Program Type Tabs
========================================= */

programTabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

        const selected =
            this.dataset.programTab;


        programTabs.forEach(function (item) {
            item.classList.remove("active");
        });


        this.classList.add("active");


        if (selected === "bachelor") {

            bachelorPanel.hidden = false;
            diplomaPanel.hidden = true;

        }


        if (selected === "diploma") {

            bachelorPanel.hidden = true;
            diplomaPanel.hidden = false;

        }


        searchInput.value = "";

        resetSearch();

    });

});


/* =========================================
   College Expand / Collapse
========================================= */

document
    .querySelectorAll(".college-toggle")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const group =
                    this.closest(".college-group");

                const programs =
                    group.querySelector(".college-programs");

                const isOpen =
                    this.getAttribute("aria-expanded") === "true";


                this.setAttribute(
                    "aria-expanded",
                    String(!isOpen)
                );


                programs.hidden =
                    isOpen;

            }
        );

    });


/* =========================================
   Search
========================================= */

function normalizeText(value) {

    return value
        .toLowerCase()
        .trim();

}


function resetSearch() {

    const cards =
        document.querySelectorAll(".program-card");

    const groups =
        document.querySelectorAll(".college-group");


    cards.forEach(function (card) {
        card.hidden = false;
    });


    groups.forEach(function (group) {

        group.hidden = false;

        const programs =
            group.querySelector(".college-programs");

        const toggle =
            group.querySelector(".college-toggle");

        if (programs) {
            programs.hidden = false;
        }

        if (toggle) {
            toggle.setAttribute(
                "aria-expanded",
                "true"
            );
        }

    });


    noResults.hidden = true;

}


searchInput.addEventListener(
    "input",
    function () {

        const query =
            normalizeText(this.value);


        if (!query) {

            resetSearch();

            return;

        }


        const visiblePanel =
            bachelorPanel.hidden
                ? diplomaPanel
                : bachelorPanel;


        const cards =
            visiblePanel.querySelectorAll(
                ".program-card"
            );


        const groups =
            visiblePanel.querySelectorAll(
                ".college-group"
            );


        let matchCount = 0;


        cards.forEach(function (card) {

            const programName =
                normalizeText(
                    card.dataset.program || ""
                );

            const degree =
                normalizeText(
                    card.dataset.degree || ""
                );

            const college =
                normalizeText(
                    card.closest(".college-group")
                        ?.dataset.college || ""
                );


            const matches =
                programName.includes(query) ||
                degree.includes(query) ||
                college.includes(query);


            card.hidden =
                !matches;


            if (matches) {
                matchCount++;
            }

        });


        groups.forEach(function (group) {

            const visibleCards =
                Array.from(
                    group.querySelectorAll(
                        ".program-card"
                    )
                )
                .filter(
                    card =>
                        !card.hidden
                );


            group.hidden =
                visibleCards.length === 0;


            if (!group.hidden) {

                const programs =
                    group.querySelector(
                        ".college-programs"
                    );

                const toggle =
                    group.querySelector(
                        ".college-toggle"
                    );


                programs.hidden =
                    false;

                toggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });


        noResults.hidden =
            matchCount !== 0;

    }
);


/* =========================================
   Initial State
========================================= */

resetSearch();
