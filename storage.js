/* ==========================
   LOCAL STORAGE
   ========================== */

function saveProject(){

    const databases = [];

    document
        .querySelectorAll(".database-row")
        .forEach(row => {

            databases.push({

                name:
                    row.querySelector(".dbName").value,

                count:
                    row.querySelector(".dbCount").value
            });

        });

    const data = {

        title:
            document.getElementById("projectTitle").value,

        databases,

        duplicates:
            document.getElementById("duplicates").value,

        outsideTime:
            document.getElementById("outsideTime").value,

        notRelated:
            document.getElementById("notRelated").value,

        screeningExcluded:
            document.getElementById("screeningExcluded").value,

        eligibilityExcluded:
            document.getElementById("eligibilityExcluded").value

    };

    localStorage.setItem(
        "prismaProject",
        JSON.stringify(data)
    );

    alert("Projeto salvo!");
}


/* ==========================
   LOAD PROJECT
   ========================== */

function loadProject(){

    const data =
        JSON.parse(
            localStorage.getItem("prismaProject")
        );

    if(!data) return;

    projectTitle.value =
        data.title || "";

    databases.innerHTML = "";

    data.databases.forEach(db => {

        addDatabase();

        const rows =
            document.querySelectorAll(".database-row");

        const last =
            rows[rows.length - 1];

        last.querySelector(".dbName").value =
            db.name;

        last.querySelector(".dbCount").value =
            db.count;

    });

    duplicates.value =
        data.duplicates || 0;

    outsideTime.value =
        data.outsideTime || 0;

    notRelated.value =
        data.notRelated || 0;

    screeningExcluded.value =
        data.screeningExcluded || 0;

    eligibilityExcluded.value =
        data.eligibilityExcluded || 0;
}


/* ==========================
   DELETE PROJECT
   ========================== */

function deleteProject(){

    if(
        confirm("Excluir projeto salvo?")
    ){

        localStorage.removeItem(
            "prismaProject"
        );

        location.reload();
    }
}