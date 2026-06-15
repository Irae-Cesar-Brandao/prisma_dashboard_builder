/* ==========================
   EXPORT TXT REPORT
   ========================== */

function exportTXT(){

    const report =
        generateNarrative();

    const blob =
        new Blob(
            [report],
            {
                type:"text/plain"
            }
        );

    const a =
        document.createElement("a");

    a.href =
        URL.createObjectURL(blob);

    a.download =
        "PRISMA_Report.txt";

    a.click();
}


/* ==========================
   EXPORT JSON
   ========================== */

function exportJSON(){

    const data =
        localStorage.getItem(
            "prismaProject"
        );

    const blob =
        new Blob(
            [data],
            {
                type:"application/json"
            }
        );

    const a =
        document.createElement("a");

    a.href =
        URL.createObjectURL(blob);

    a.download =
        "PRISMA_Project.json";

    a.click();
}


/* ==========================
   IMPORT JSON
   ========================== */

function importJSON(event){

    const file =
        event.target.files[0];

    if(!file) return;

    const reader =
        new FileReader();

    reader.onload = function(){

        localStorage.setItem(
            "prismaProject",
            reader.result
        );

        loadProject();

        alert(
            "Projeto importado!"
        );
    };

    reader.readAsText(file);
}

/* ==========================
   EXPORT PDF
   ========================== */

function exportDashboardPDF() {

    const source =
        document.getElementById("dashboard");

    // CLONE LIMPO PARA PDF
    const clone =
        source.cloneNode(true);

    // força layout vertical (REMOVE GRID PROBLEMA)
    clone.style.display = "block";
    clone.style.width = "210mm";
    clone.style.background = "#fff";

    // força tudo em coluna
    clone.querySelectorAll("*").forEach(el => {
        el.style.maxWidth = "100%";
        el.style.boxSizing = "border-box";
    });

    const wrapper =
        document.createElement("div");

    wrapper.appendChild(clone);

    document.body.appendChild(wrapper);

    html2pdf()
        .set({
            margin: 8,
            filename: "PRISMA_Dashboard.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                scrollY: 0,
                windowWidth: clone.scrollWidth
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            },
            pagebreak: {
                mode: ["css", "legacy"]
            }
        })
        .from(clone)
        .save()
        .then(() => {
            document.body.removeChild(wrapper);
        });
}