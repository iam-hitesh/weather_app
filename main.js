$(document).ready(function(){
  if(navigator.geolocation){
    var currentPosition = '';
    navigator.geolocation.getCurrentPosition(function(position){
      currentPosition = position;
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      var url = 'https://api.apixu.com/v1/current.json?key=bf8b4da2346c425c947102440183101&q=';

      $.getJSON(url+latitude+','+longitude,function(data){
        var data = JSON.stringify(data);
        var json = JSON.parse(data);

        var country = json.location.country;
        var state = json.location.region;
        var city = json.location.name;
        var temp = json.current.temp_c;
        var temp_f = json.current.temp_f;
        var last_updated = json.current.last_updated.replace('-',' ');

        var wind = json.current.wind_kph;
        var humidity = json.current.humidity;
        var local_time = json.location.localtime.split(' ')[1];

        var cloud = json.current.cloud;
        $('#weather').html(city+', '+state+', '+country);
        $('#temp').html(temp+'&#x2103;');

        var yes = true;
        $('#switch').on('click',function(){
          if(yes){
            $('#temp').html(temp_f+'&#x2109;');
            $('#switch').html('Change in Celsius');
            yes = false;
          }else{
            $('#temp').html(temp+'&#x2103;');
            $('#switch').html('Change in Fahrenheit');
            yes = true;
          }
        });

        $('#time').html(local_time);
        $('#wind').html('Wind '+wind+' Kph');
        $('#humidity').html('Humidity : '+humidity+'%');

        if(cloud <= 32){
          $('#sky').html('Clear Sky');
        }else{
          $('#sky').html('Cloudy Sky');
        }

        var time_round = local_time.replace(':','');
        if(time_round > 1900 || time_round < 0600){
          $('.grey-jumbo').css({background: 'url(images/night.jpg)',backgroundSize:'cover'});
          $('#tagline').html('Good Night');
        }else{
          if(humidity > 65){
            $('.grey-jumbo').css({background: 'url(images/rainy.jpg)',backgroundSize:'cover'});
            $('#tagline').html('Its High Humidity Today in atmosphere');
          }else{
            if(temp >= 38){
              $('.grey-jumbo').css({background: 'url(images/hot.jpg)',backgroundSize:'cover'});
              $('#tagline').html('Its Hot Day today');
            }else if(temp >= 20 && temp <38){
              $('.grey-jumbo').css({backgroundImage: 'url(images/sunny.jpg)',backgroundSize:'cover'});
              $('#tagline').html('Its Sunny Day Today');
            }else if(temp < 20){
              $('.grey-jumbo').css({background: 'url(images/cold.jpg)',backgroundSize:'cover'});
              $('#tagline').html('Its Cold Day Today');
            }
          }
        }
        $('#last_update').html(last_updated);
      });
    });
  }
});
