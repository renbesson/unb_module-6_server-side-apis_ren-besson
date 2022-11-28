var API_KEY = "1914961ce3e50675c3b4e7d5d0a3aa5b";
var city = $("#city-input").val();

var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

var responseText = document.getElementById("response-text");

function getApi(requestUrl) {
  fetch(requestUrl).then(function (response) {
    console.log(response);
    if (response.status === 200) {
      responseText.textContent = response.status;
    }
    return response.json();
  });
}

getApi(requestUrl);
