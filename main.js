let confirmedCases = document.querySelector(".p-confirmed");
let updatedTime = document.querySelector(".h3-updated");
let deathsRecorded = document.querySelector(".p-deaths");
let recoveredCases = document.querySelector(".p-recovered");
let activeCases = document.querySelector(".p-active");
let criticalCases = document.querySelector(".p-critical");
window.onload = () => {
  let baseurl = "https://disease.sh/v3/covid-19/all";
  let historyurl = "https://disease.sh/v3/covid-19/historical/all?lastdays=15";
  getHistory(historyurl);
  getResults(baseurl);
};
getResults = (url) => {
  fetch(url)
    .then((results) => {
      return results.json();
    })
    .then(displayResults)
    .catch((error) => console.log(error));
};

getHistory = (url) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then(addDataToArray)
    .catch((error) => console.log(error));
};

addDataToArray = (response) => {
  console.log("response", response);
  dateArray = [];
  casesArray = [];
  deathArray = [];
  recoveredArray = [];
  dateArray = Object.keys(response.cases);
  casesArray = Object.values(response.cases);
  deathArray = Object.values(response.deaths);
  recoveredArray = Object.values(response.recovered);
  displayChart(dateArray, casesArray, deathArray, recoveredArray);
};

displayChart = (date, cases, deaths, recoveries) => {
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "Coronavirus cases",
          backgroundColor: "#006eb8",
          borderColor: "#006eb8",
          data: cases,
        },
        {
          label: "Deaths",
          backgroundColor: "rgb(230, 37, 37)",
          borderColor: "rgb(230, 37, 37)",
          data: deaths,
          type:"line"
        },
        {
          label: "Recovered cases",
          backgroundColor: "rgb(7, 197, 61)",
          borderColor: "rgb(7, 197, 61)",
          data: recoveries,
          type:"line"
        },
      ],
    },

    // Configuration options go here
    options: {
      responsive: "true",
      maintainAspectRatio: "false",
      title: {
        display: "true",
        text: "Worldwide Coronavirus cases",
        fontSize: 25,
      },
      elements: {
        line: {
          fill: "false",
          borderWidth: 2,
        },
        point: {
          radius: 1.5,
        },
      },
    },
  });
};
displayResults = (results) => {
  console.log(results);
  let trialDate = new Date(results.updated);
  let confirmedCounter = new CountUp("p-confirmed", 0, results.cases);
  let deathCounter = new CountUp("p-deaths", 0, results.deaths);
  let recoveredCounter = new CountUp("p-recovered", 0, results.recovered);
  let affectedCountriesCounter = new CountUp(
    "p-affectedcountries",
    0,
    results.affectedCountries
  );
  let activeCounter = new CountUp("p-active", 0, results.active);
  let criticalCounter = new CountUp("p-critical", 0, results.critical);
  updatedTime.innerHTML = trialDate;
  confirmedCases.innerHTML = confirmedCounter;
  deathsRecorded.innerHTML = deathCounter;
  recoveredCases.innerHTML = recoveredCounter;
  activeCases.innerHTML = activeCounter;
  criticalCases.innerHTML = criticalCounter;
  confirmedCounter.start();
  deathCounter.start();
  recoveredCounter.start();
  activeCounter.start();
  criticalCounter.start();
};
