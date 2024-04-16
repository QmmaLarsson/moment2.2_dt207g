"use strict";

//Funktion för att hämta jobb från APIet
async function getJobs() {
    const url = "https://moment21dt207g.onrender.com/api/jobs";

    const response = await fetch(url);

    const data = await response.json();

    console.log(data);

    displayJobs(data);
}

//Funktion för att skriva ut alla job
function displayJobs(jobs) {
    const jobContainer = document.querySelector(".jobContainer");

    //Loopa igenom varje jobb och skapa ett HTML-element
    jobs.forEach(job => {
        const jobElement = document.createElement("div");

        //IF-sats som kollar om endDate är definierat eller null
        let endDateText;
        if (job.enddate === null) {
            endDateText = "Pågående";
        } else {
            endDateText = job.enddate;
        }

        jobElement.innerHTML = `
        <p><strong>Företag:</strong> ${job.companyname}</p>
        <p><strong>Titel:</strong> ${job.jobtitle}</p>
        <p><strong>Plats:</strong> ${job.location}</p>
        <p><strong>Startdatum</strong> ${job.startdate}</p>
        <p><strong>Slutdatum:</strong> ${endDateText}</p>
        <button class="deleteBtn">Ta bort</button>
`;

        // Lägg till jobbets ID som ett data-attribut
        jobElement.dataset.jobId = job.id;

        jobContainer.appendChild(jobElement);

        //Variabel för delete-knapp
        const deleteBtn = jobElement.querySelector(".deleteBtn");

        //Händelsehanterare för delete-knapp
        deleteBtn.addEventListener("click", () => {
            const jobId = jobElement.dataset.jobId;
            deleteJob(jobId);
            //Tar bort jobbet från sidan när användaren klickar på knappen
            jobElement.remove();
        });
    });
}

//Funktion för att ta bort ett jobb från APIet
async function deleteJob(jobId) {
    let deleteUrl = `https://moment21dt207g.onrender.com/api/jobs/${jobId}`;

    const response = await fetch(deleteUrl, {
        method: "DELETE"
    });

    const data = await response.json();
    console.log(data);
}

//Funktion som gör att funktionerna ovanför kör direkt när sidan laddas in
window.onload = function () {
    getJobs();
};