import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather-service.js'


function clearFields() {
  $('#location').val("");
  $('.showErrors').text("");
  $('.showHumidity').text("");
  $('.showTemp').text("");
  $('.showWind').text("");

}

$(document).ready(function () {
  $('#weatherLocation').click(function () {
    let city = $('#location').val();
    clearFields();
    let promise = WeatherService.getWeather(city);


    function convertToF(kelvin) {
      let fahrenheit = ((kelvin - 273.15) * 1.8) + 32;
      return fahrenheit;
    }



    promise.then(function (response) {
      const body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in F is ${convertToF(body.main.temp)} degrees.`);
      $('.showWind').text(`Wind is ${body.wind.speed} mph.`);
    }, function (error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });
});

