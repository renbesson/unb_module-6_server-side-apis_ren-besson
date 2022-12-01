$(function () {
  var API_KEY = "1914961ce3e50675c3b4e7d5d0a3aa5b";
  var cityInput = $("#city-input");

  /////*** Prints one history button per localStorage key ***///////
  var printHistoryBtns = function () {
    var searchColEl = $("#history");

    searchColEl.html("");

    const localStorageKeys = Object.keys(localStorage);

    $.each(localStorageKeys, function (index, key) {
      searchColEl.append(
        `<button class="btn mb-2" id="${key}">${key}</button>`
      );
    });
  };
  //////////////////////////////////////////////////////////////////
  /////*** Prints both today and 5-day forecasts ***////////////////
  var printForecast = function (data) {
    var todayEl = $("#today-forecast");
    var fiveDayEl = $("#five-day-forecast");

    var todayForecast = `<h3>${
      data.city.name
    } - ${data.list[0].dt_txt.substring(
      0,
      10
    )} <img src="http://openweathermap.org/img/wn/${
      data.list[0].weather[0].icon
    }@2x.png"></img></h3>
<p>Temp: ${data.list[0].main.temp} C</p>
<p>Wind: ${data.list[0].wind.speed} Km/h</p>
<p>Humidity: ${data.list[0].main.humidity} %</p>
`;

    todayEl.html("");
    fiveDayEl.html("");

    todayEl.append(todayForecast);

    $.each(data.list, function (index, value) {
      var card = `
  <div class="card w-60 shadow-xl bg-white m-2">
    <div class="card-body">
      <p class="card-title">${value.dt_txt.substring(0, 10)}</p>
      <p>Temp: ${value.main.temp} C</p>
      <p>Wind: ${value.wind.speed} Km/h</p>
      <p>Humidity: ${value.main.humidity} %</p>
    </div>
    <figure><img src="http://openweathermap.org/img/wn/${
      value.weather[0].icon
    }@2x.png"></img></figure>
  </div>
    `;

      fiveDayEl.append(card);
    });
  };
  //////////////////////////////////////////////////////////////////
  /////*** Fetch the weather info for the typed city ***////////////
  var getApi = function (city) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    if (!city) {
      alert("Please type a valid city");
      return;
    }

    fetch(requestUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            printForecast(data);
            localStorage.setItem(data.city.name, JSON.stringify(data));
            printHistoryBtns();
          });
        } else {
          alert("Error: City " + response.statusText);
        }
      })
      .catch(function (error) {
        alert("Unable to fetch!");
      });
  };
  //////////////////////////////////////////////////////////////////
  /////*** Starts the application ***///////////////////////////////

  var searchBtn = $("#search-btn");

  searchBtn.on("click", () => getApi(cityInput.val()));

  printHistoryBtns();

  $("#history").on("click", function (event) {
    var data = JSON.parse(localStorage.getItem(event.target.id));
    printForecast(data);
  });
});
