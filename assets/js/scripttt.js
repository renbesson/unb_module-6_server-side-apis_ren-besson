$(function () {
  var API_KEY = "1914961ce3e50675c3b4e7d5d0a3aa5b";
  var cityInput = $("#city-input");

  //////////////////////////////////////////////////////////////////
  var printHistoryBtns = function () {
    var searchColEl = $("#history");

    searchColEl.html("");

    const localStorageKeys = Object.keys(localStorage);

    $.each(localStorageKeys, function (index, key) {
      searchColEl.append(
        `<button class="history-btn" id="${key}">${key}</button>`
      );
    });
  };
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
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
  <div class="card">
    <p>${value.dt_txt.substring(0, 10)}</p>
    <img src="http://openweathermap.org/img/wn/${
      value.weather[0].icon
    }@2x.png"></img>
    <p>Temp: ${value.main.temp} C</p>
<p>Wind: ${value.wind.speed} Km/h</p>
<p>Humidity: ${value.main.humidity} %</p>
    `;

      fiveDayEl.append(card);
    });
  };
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  var getApi = function (city) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    fetch(requestUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            printForecast(data);
            localStorage.setItem(data.city.name, JSON.stringify(data));
            printHistoryBtns();
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function (error) {
        alert("Unable to connect to GitHub");
      });
  };
  //////////////////////////////////////////////////////////////////

  var searchBtn = $("#search-btn");

  searchBtn.on("click", () => getApi(cityInput.val()));

  printHistoryBtns();

  $("#history").on("click", function (event) {
    var data = JSON.parse(localStorage.getItem(event.target.id));
    printForecast(data);
  });
});
