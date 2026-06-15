/* ==========================
   PRISMA DASHBOARD ENGINE
   ========================== */

function addDatabase(){

    const div = document.createElement("div");

    div.className = "database-row";

    div.innerHTML = `
        <input
            class="dbName"
            placeholder="Nome da Base (Ex: Scopus)"
        >

        <input
            class="dbCount"
            type="number"
            min="0"
            value="0"
            placeholder="Registros"
        >
    `;

    document
        .getElementById("databases")
        .appendChild(div);
}


/* ==========================
   DASHBOARD
   ========================== */
function renderDashboard(data){

const title =
    document.getElementById("projectTitle").value;

const authors =
    document.getElementById("projectAuthors").value;

const start =
    document.getElementById("researchStart").value;

const end =
    document.getElementById("researchEnd").value;
    const dashboard =
        document.getElementById("dashboard");

    let dbList = "";

    document
        .querySelectorAll(".database-row")
        .forEach(row => {

            const name =
                row.querySelector(".dbName").value;

            const count =
                row.querySelector(".dbCount").value;

            if(name){

                dbList += `
                <div class="line">
                    <span>${name}</span>
                    <strong>n=${count}</strong>
                </div>
                `;
            }
        });

dashboard.innerHTML = `

<div style="
background:#fce5cd;
border:5px solid red;
padding:25px;
margin-bottom:25px;
">

    <h1>${title}</h1>

    <p>
        <strong>Authors:</strong>
        ${authors}
    </p>

    <p>
        <strong>Research Period:</strong>
        ${start} to ${end}
    </p>

</div>


    <div class="prisma-section">

        <h2>IDENTIFICATION</h2>

        <div class="prisma-box">

            <h3>Records identified from databases</h3>

            ${dbList}

            <hr>

<div class="line total highlight-total">
    <span>INITIAL TOTAL</span>
    <strong>n=${data.identified}</strong>
</div>

        </div>

        <div class="arrow">↓</div>

        <div class="prisma-box">

            <h3>Records removed before screening</h3>

            <div class="line">
                <span>Duplicates</span>
                <strong>n=${duplicates.value || 0}</strong>
            </div>

            <div class="line">
                <span>Outside Time Frame</span>
                <strong>n=${outsideTime.value || 0}</strong>
            </div>

            <div class="line">
                <span>Not Related</span>
                <strong>n=${notRelated.value || 0}</strong>
            </div>

            <hr>

<div class="line total highlight-total">
    <span>TOTAL REMOVED</span>
    <strong>n=${data.removed}</strong>
</div>

        </div>

    </div>

    <div class="prisma-section">

        <h2>SCREENING</h2>

        <div class="prisma-box">

<div class="line total highlight-total">
    <span>Records after initial removals</span>
    <strong>n=${data.afterRemoval}</strong>
</div>
        </div>

        <div class="arrow">↓</div>

        <div class="prisma-box">

            <div class="line">
                <span>Records excluded</span>
                <strong>n=${screeningExcluded.value || 0}</strong>
            </div>

        </div>

    </div>

    <div class="prisma-section">

        <h2>ELIGIBILITY</h2>

        <div class="prisma-box">

<div class="line total highlight-total">
    <span>Full-text assessed</span>
    <strong>n=${data.screening}</strong>
</div>

        </div>

        <div class="arrow">↓</div>

        <div class="prisma-box">

            <div class="line">
                <span>Excluded</span>
                <strong>n=${eligibilityExcluded.value || 0}</strong>
            </div>

        </div>

    </div>

    <div class="prisma-section">

        <h2>INCLUDED</h2>

        <div class="prisma-box final">

            <div class="line total">
                <span>Studies Included</span>
                <strong>n=${data.eligible}</strong>
            </div>

        </div>

    </div>
    `;
}



/* ==========================
   PROJECT REPORT
   ========================== */

function generateNarrative(){

    const identified =
        getDatabaseTotal();

    const duplicates =
        Number(document.getElementById("duplicates").value || 0);

    const outsideTime =
        Number(document.getElementById("outsideTime").value || 0);

    const notRelated =
        Number(document.getElementById("notRelated").value || 0);

    const screeningExcluded =
        Number(document.getElementById("screeningExcluded").value || 0);

    const eligibilityExcluded =
        Number(document.getElementById("eligibilityExcluded").value || 0);

    const removed =
        duplicates +
        outsideTime +
        notRelated;

    const finalStudies =
        identified -
        removed -
        screeningExcluded -
        eligibilityExcluded;

    return `
A total of ${identified} records were identified through database searching.

After removing ${removed} records (duplicates and ineligible studies), ${identified - removed} records remained for screening.

After screening, ${screeningExcluded} studies were excluded.

A total of ${eligibilityExcluded} full-text articles were excluded during eligibility assessment.

Finally, ${finalStudies} studies were included in the review.
`;
}


/* ==========================
   INITIAL DATABASES
   ========================== */

window.onload = function(){

    addDatabase();

    const report =
        document.createElement("div");

    report.id = "report";

    document
        .querySelector(".container")
        .appendChild(report);
};



/* ==========================
   RELATÓRIO PRISMA GENERATE
   ========================== */

function generatePRISMAReport(){

    const title =
        document.getElementById("projectTitle").value || "Untitled Project";

    const identified =
        getDatabaseTotal();

    const duplicates =
        Number(document.getElementById("duplicates").value || 0);

    const outside =
        Number(document.getElementById("outsideTime").value || 0);

    const related =
        Number(document.getElementById("notRelated").value || 0);

    const screening =
        Number(document.getElementById("screeningExcluded").value || 0);

    const eligibility =
        Number(document.getElementById("eligibilityExcluded").value || 0);


    const removed =
        duplicates +
        outside +
        related;

    const afterRemoval =
        identified - removed;

    const finalStudies =
        afterRemoval -
        screening -
        eligibility;

    let dbText = "";

    document
        .querySelectorAll(".database-row")
        .forEach(row => {

            const name =
                row.querySelector(".dbName").value;

            const count =
                row.querySelector(".dbCount").value;

            if(name){

                dbText +=
                `${name} (n=${count}), `;
            }
        });

    dbText =
        dbText.replace(/,\s*$/, "");

    const report = `

PRISMA STUDY SELECTION FLOW

Project Title:
${title}

IDENTIFICATION

A total of ${identified} records were identified through database searches.

Sources consulted:
${dbText}.

Before screening, ${removed} records were removed, including duplicates (n=${duplicates}), studies outside the time frame (n=${outside}), and studies not related to the topic (n=${related}).

SCREENING

After the initial removals, ${afterRemoval} records remained for title and abstract screening.

During screening, ${screening} records were excluded.

ELIGIBILITY

The remaining studies were assessed in full text.

A total of ${eligibility} studies were excluded during the eligibility assessment phase.

INCLUDED

After all stages, ${finalStudies} studies met the inclusion criteria and were included in the final review.

FINAL RESULT

The literature review was conducted according to the PRISMA framework and resulted in the inclusion of ${finalStudies} studies considered relevant to the research objectives.

`;

document.getElementById("reportText").innerHTML =
    report.replace(/\n/g,"<br>");
}


function generateReport(){
    generatePRISMAReport();
}


/*==========================================
  *MOSTRAR TUTORIAL COMPLETO 
 ==========================================*/
function toggleTutorial() {
    const tutorial = document.querySelector(".tutorial");

    if (tutorial.style.display === "none" || tutorial.style.display === "") {
        tutorial.style.display = "block";
    } else {
        tutorial.style.display = "none";
    }
}


/*==========================================
 TRAVAR A CÓPIA CONTEÚDO COM REF. AUTOR 
      bY: IRAÊ CÉSAR BRANDÃO - 05-2026
 ==========================================*/

//---------- BLOQUEAR CLIQUE DIREITO ----------
document.addEventListener('contextmenu', function(e) {
    e.preventDefault(); // Bloqueia o menu do botão direito
    alert("Copiar conteúdo não é permitido sem referência ao autor '© 2026 Iraê César Brandão - https://luckway.com.br' .");
});

// ---------- BLOQUEAR CTRL+C E CTRL+X ----------
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'c' || e.key === 'x')) {
        e.preventDefault(); // Bloqueia copiar e recortar
        alert("Copiar/Recortar desativado. Cite o autor! '© 2026 Iraê César Brandão - https://luckway.com.br'");
    }
});


mostrarSecao('home');

window.addEventListener("beforeunload",e=>{e.preventDefault();e.returnValue="Faça backup antes de sair!"});
listar();



