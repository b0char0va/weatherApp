window.onload = getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    $.get("https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude, function (data) {
        var response = data;
        var temp = Math.floor(response.main.temp);
        var city = response.name;
        var weatherType = response.weather[0].main;
        var country = response.sys.country;
        var icon = response.weather[0].icon;

        $('#demo').html(city + " " + country);
        $('#type').html(weatherType);
        $('#temp').html(temp);
        $('#unit').html("&#8451");
        $('#btnDiv').add('button').addClass('btn btn-primary btn-lg unitBtn').html('In Fahrenheit').click(function () {
            if ($('#temp').text() === temp.toString()) {
                toF(temp);
            } else {
                toC(temp);
            }
        });
        showIcon(data.weather[0].main);
    });
}

function toF(temp) {
    var f = (temp * 9 / 5) + 32;
    $('#temp').html(f);
    $('#unit').html("&#8457");
    $('.unitBtn').html("In Celsius");
}

function toC(temp) {
    $('#temp').html(temp);
    $('#unit').html("&#8451");
    $('.unitBtn').html("In Fahrenheit");
}

function showIcon(desc) {
    var desc = desc.toLowerCase();
    switch (desc) {
        case 'drizzle':
            addIcon(desc);
            break;
        case 'clouds':
            addIcon(desc);
            break;
        case 'rain':
            addIcon(desc);
            break;
        case 'snow':
            addIcon(desc);
            break;
        case 'clear':
            addIcon(desc);
            break;
        case 'thunderstom':
            addIcon(desc);
            break;
        default:
            $('div.clouds').removeClass('hide');
    }
}

function addIcon(desc) {
    $('div.' + desc).removeClass('hide');
}

