"use strict";

async function getJobs() {
    const url = "https://moment21dt207g.onrender.com/api/jobs";

    const response = await fetch(url);

    const data = await response.json();

    console.log(data);

    displayJobs(data);
}

function displayJobs(jobs) {
    const jobContainer = document.querySelector(".jobContainer");

    //Loopa igenom varje jobb och skapa ett HTML-element
    jobs.forEach(job => {
        const jobElement = document.createElement("div");
        jobElement.innerHTML = `
        <p><strong>Företag:</strong> ${job.companyname}</p>
        <p><strong>Titel:</strong> ${job.jobtitle}</p>
        <p><strong>Plats:</strong> ${job.location}</p>
        <p><strong>Startdatum</strong> ${job.startdate}</p>
        <p><strong>Slutdatum:</strong> ${job.enddate}</p>
        <button>Ta bort</button>
`;
        jobContainer.appendChild(jobElement);
    });
}

window.onload = function () {
    getJobs();
};