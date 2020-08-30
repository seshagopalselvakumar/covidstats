let country = document.querySelector(".h3-country");
let countryUpdatedTime = document.querySelector(".h3-countryupdated");
let countryConfirmed = document.querySelector(".p-countryconfirmed");
let countryDeaths = document.querySelector(".p-countrydeaths");
let countryRecovered = document.querySelector(".p-countryrecovered");
let countryActive = document.querySelector(".p-countryactive");

window.onload = () => {
  let countryurl = `https://disease.sh/v3/covid-19/gov/india`;
  getCountryResults(countryurl);
};

getCountryResults = (url) => {
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then(displayResults)
    .catch((error) => console.log("error", error));
};

goBack = () => {
  window.history.back();
};
displayResults = (result) => {
  console.log("result", result)
  let updatedTime = new Date(result.updated);
  let countryConfirmedCounter = new CountUp(
    "p-countryconfirmed",
    0,
    result.total.cases
  );
  let countryDeathsCounter = new CountUp("p-countrydeaths", 0, result.total.deaths);
  let countryRecoveredCounter = new CountUp(
    "p-countryrecovered",
    0,
    result.total.recovered
  );
  let countryActiveCounter = new CountUp("p-countryactive", 0, result.total.active);
  countryUpdatedTime.innerHTML = updatedTime;
  countryConfirmed.innerHTML = countryConfirmedCounter;
  countryDeaths.innerHTML = countryDeathsCounter;
  countryRecovered.innerHTML = countryRecoveredCounter;
  countryActive.innerHTML = countryActiveCounter;
  countryConfirmedCounter.start();
  countryDeathsCounter.start();
  countryRecoveredCounter.start();
  countryActiveCounter.start();


  let countryData = result.states.map(state=>{
    return state
  })
  let countryNames = []
  let countryActiveArray = []
  let countryDeathsArray = []
  let countryRecoveredArray = []
  let countryTotalCases = []
  for(let i=0; i<countryData.length; i++){
    countryNames.push(countryData[i].state)
    countryActiveArray.push(countryData[i].active)
    countryDeathsArray.push(countryData[i].deaths)
    countryRecoveredArray.push(countryData[i].recovered)
    countryTotalCases.push(countryData[i].total)
  }

  displayChart(countryNames, countryTotalCases, countryActiveArray, countryDeathsArray, countryRecoveredArray)
};

displayChart = (country, totalCases, activeCases, deaths, recoveredCases) => {
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: country,
      datasets: [
        {
          label: "Total cases",
          backgroundColor: "rgba(37, 37, 37, 0.66)",
          borderColor: "rgba(37, 37, 37, 0.66)",
          data: totalCases,
        },
        {
          label: "Active cases",
          backgroundColor: "rgb(0, 0, 128)",
          borderColor: "rgb(0, 0, 128)",
          data: activeCases,
          type:"line"
        },
        {
          label: "Deaths",
          backgroundColor: "rgb(230, 37, 37",
          borderColor: "rgb(230, 37, 37",
          data: deaths,
          type:"line"
        },
        {
          label: "Recovered cases",
          backgroundColor: "rgb(7, 197, 61)",
          borderColor: "rgb(7, 197, 61)",
          data: recoveredCases,
          type:"line"
        },
      ]
    },

    // Configuration options go here
    options: {
      responsive: "true",
      maintainAspectRatio: "false",
      title: {
        display: "true",
        text: "Total number of cases in each state in India",
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