const request = require('request');
geocodeAddress = (address,callback) => {
    //use encodeURIComponent to code the uri into %20 format
    var encodedAddress = encodeURIComponent(address)
    request({
        url: `https://www.mapquestapi.com/geocoding/v1/address?key=JpNTSifYPgkNeK8O7RURZqsbYVneV13j&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        // console.log(JSON.stringify(body,undefined,2));
        var test = body
        if (test) {
            if (error) {
                callback('Unable to connect to Google servers')
            } else if (test.info.messages[0]) {
                callback(test.info.messages[0])
            } else {
                callback(undefined,{
                    address: test.results[0].locations[0].street +' '+ test.results[0].locations[0].adminArea5,
                    Latitude: test.results[0].locations[0].latLng.lat,
                    Longitude: test.results[0].locations[0].latLng.lng,

                })
                // console.log(`Address: ${test.results[0].locations[0].street} ${test.results[0].locations[0].adminArea5}`);
                // console.log(`Latitude: ${test.results[0].locations[0].latLng.lat}`);
                // console.log(`Longitude: ${test.results[0].locations[0].latLng.lng}`);
            }
        }else{
            callback('Unable to find location')
        }
    
    });
}

geocodeWeather = (arr,callback) => {
    var encodedAddress = encodeURIComponent(`${arr.Latitude},${arr.Longitude}`)
    request({
        url: `https://api.darksky.net/forecast/b3866d7e7b1bff2efd4cdb42b4eb87cc/${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        // console.log(JSON.stringify(body,undefined,2));
        var test =body;
        if (test) {
            if (error) {
                callback('Unable to connect to servers')
            } else if (test.error) {
                callback(test.error)
            } else {
                callback(undefined,{
                    temperature: test.currently.temperature,
                    current_weather: test.currently.summary,
                    summary: test.hourly.summary,

                })
            }
        }else{
            callback('Something went wrong! Please retry later')
        }
    });
}

module.exports={
    geocodeAddress,
    geocodeWeather
}