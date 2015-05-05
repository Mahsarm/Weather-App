        
    $(document).ready(function(){
    
    
    function get_weather(user_location){
    
    API_key='c563e6abfb646665';
    
    
    array=user_location.split(",", 2);
    console.log(array);
    city=array[0];
    country=array[1];
    console.log(country);
    console.log(city);
    
    // link to get lon and lat from the website        
    var coordinates_url='http://api.wunderground.com/api/c563e6abfb646665/geolookup/q/' + country + '/' + city + '.json';
    console.log(coordinates_url);
  
    
    // sending request to get on an lat of user location
    $.ajax(coordinates_url, {
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            
            
            console.log(data.response.error);
            // the website doesnt give error if we have a typo entering country for example paris, aa
            console.log(data.location);
            if(data.response.error || data.location==undefined ){
                $('.error').text('No cities match your search query, please be more sepcific');
                $('.place h1').text('');
                    $('.date h3').empty();
                    $('.temp p').empty();
                    $('.icon p').empty();
                    $('.feel_temp p').empty();
                    $('.rel_humid p').empty();
                    $('.wind p').empty(); 
                    $('.w_icon img').removeAttr('src');
                    $('.w_container').removeClass('border');
                    $('.w_container').hide();
                
            
       
        }else{
           
            $('.error').text('');
            var lat=data.location.lat;
            var lon=data.location.lon;
            
            var user_country = data.location.country;
            var user_city= data.location.city
            console.log(user_city);
            console.log(user_country);
             
            
            var conditions_url='http://api.wunderground.com/api/' + API_key + '/forecast/geolookup/conditions/q/' + lat + ',' + lon + '.json';
             console.log(conditions_url);
             
            
            $.ajax(conditions_url, {
                type: 'GET',
                dataType: 'jsonp',
            
                success: function(data) {
             
                    var w = data.current_observation;
                    var temp_c = Math.round(w.temp_c);
                    var temp_f = Math.round(w.temp_f);
                    var feel_temp_c = Math.round(w.feelslike_c);
                    var date = w.local_time_rfc822.slice(0,16);
                    var time = w.local_time_rfc822.slice(17,19)
                    var rel_humid = w.relative_humidity;  
                    var windDirection = w.wind_dir;
                    var windSpeed = w.wind_kph;
                    var icon=w.weather;
                    console.log(time);
          
                    
                    // uploading the weather icon
                    
                    var icon_url = 'images/' + icon.replace(/\s+/g,'').toLowerCase() + '.svg';
                        
                    if ( (time <=5 || time >= 18 ) && icon === 'Clear') {
                        $('.w_icon img').attr('src', 'images/nt_clear.svg');
                    } else if ( (time <=5 || time >= 18)  && icon === 'Partly Cloudy') {
                        $('.w_icon img').attr('src', 'images/nt_partlycloudy.svg');
                        } else {
                            $('.w_icon img').attr('src', icon_url);
                        }
                    
                   // inserting values into the divs 

                    $('.w_container').addClass('border');
                    $('.place h1').text( user_city + ', '+ user_country);
                    $('.date h3').text(date);
                    $('.temp p').text(temp_c + ' °C');
                    $('.icon p').text(icon.toUpperCase());
                    $('.feel_temp p').text( 'feels like ' + feel_temp_c + ' °C');
                    $('.rel_humid p').text( 'Humidity: ' + rel_humid);
                    $('.wind p').text('Wind: ' + windDirection + ' ' + windSpeed + ' km/h');
                    
                    
                                            
            }   //end of second  success
           
                
            }) //end of second  ajax
 
    
        }               
        } //end of first success
        
    }) //end of first ajax
    
    
    
    } // end of function  get_weather 
    
    //getting the submitted location in the form: format : city, country
    
    $('.location-form').on('submit', function(e) {
        e.preventDefault();
        var user_location=$('.user_location').val();
        get_weather(user_location);
        $('.w_container').show(); 
        
        
        
    }); // end of form
    

    }); // end of document ready
    
    
  


      
