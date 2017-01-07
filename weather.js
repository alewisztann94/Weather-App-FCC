getLocation();

function getLocation() {
	$.get('http://ip-api.com/json', function (loc) {
		$('#city').text(loc.city + ', ' + loc.region + ', ' + loc.country);
		getWeather(loc.lat, loc.lon, loc.countryCode);
	})
	.fail(function (err) {
		getWeather();
	});
}

function getWeather(lat, lon, countryCode) {
	var key = 'd186addaee6b4cc3b9c4411e09bc41b7';
	var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon +'&type=accurate' + '&units=metric' + '&APPID=' + key;
	$.get(weatherAPI, function (weatherData) {
		temp = weatherData.main.temp.toFixed(0);
		tempF = ((temp * 9) / 5 + 32).toFixed(0);

		var city = weatherData.name, 
		condition = weatherData.weather[0].description,
		id = weatherData.weather[0].id,
		speed = Number((weatherData.wind.speed * 1.94384).toFixed(1)),
		deg = weatherData.wind.deg,
		countryShort = weatherData.sys.country,
		windDir,
		icon = 'http://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png',

		backgroundURL,
		bckImage = weatherData.weather[0].main;
		var backgrounds = {Thunderstorm: 'http://martinschmaltz.com/wp-content/uploads/thunderstorm.jpg',
							Drizzle: 'http://www.metoffice.gov.uk/media/image/d/n/light_rain.jpg',
							Rain: 'http://www.trbimg.com/img-579cb259/turbine/cgnews-heavy-rain-today-and-sunday-20160730',
							Snow: 'http://weknowyourdreams.com/image.php?pic=/images/snow/snow-05.jpg',
							Clear: 'http://img14.deviantart.net/701f/i/2009/150/8/0/clear_sky___stock_by_stonekeeper.jpg',
							Clouds: 'http://www.gazetteseries.co.uk/resources/images/5360796/'};

		if (backgrounds.hasOwnProperty(bckImage)) {
			backgroundURL = backgrounds[bckImage]; //accessing the key-value pair in an object. bckImage is a string, so you can't use backgrounds.bckImage , use bracket notation.
		}
		var val = Math.floor((deg / 22.5) + 0.5),
		arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'],
		windDir = arr[(val % 16)];
		$('#temperature').text(temp + '°C');	
		$('#condition').text(condition);
		$('#wind-speed').text(speed + ' Knots ' + windDir);
		$('#condition').prepend('<img src=' + icon + '>');
		$('body').css('background-image', 'url(' + backgroundURL + ')');

	});
}

$('#convert-button').click(function () {
	if ($('#temperature').text().indexOf('C') > -1) {
		$('#temperature').text(tempF + '° F');
		$('#convert-button').val('Convert to °C');
	}
	else {
		$('#temperature').text(temp + '°C');
		$('#convert-button').val('Convert to ° F');
	}
});
