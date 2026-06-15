/* ==========================
   CALCULATIONS.JS
   ========================== */

function getDatabaseTotal() {

    let total = 0;

    document
        .querySelectorAll(".dbCount")
        .forEach(input => {

            total += Number(input.value || 0);

        });

    return total;
}

function calculate() {

    let identified =
        getDatabaseTotal();

    let duplicates =
        Number(
            document.getElementById("duplicates").value || 0
        );

    let outsideTime =
        Number(
            document.getElementById("outsideTime").value || 0
        );

    let notRelated =
        Number(
            document.getElementById("notRelated").value || 0
        );

    let screeningExcluded =
        Number(
            document.getElementById("screeningExcluded").value || 0
        );

    let eligibilityExcluded =
        Number(
            document.getElementById("eligibilityExcluded").value || 0
        );

    let removed =
        duplicates +
        outsideTime +
        notRelated;

    let afterRemoval =
        identified -
        removed;

    let screening =
        afterRemoval -
        screeningExcluded;

    let eligible =
        screening -
        eligibilityExcluded;

    renderDashboard({

        identified,
        removed,
        afterRemoval,
        screening,
        eligible

    });

    generateReport();
}