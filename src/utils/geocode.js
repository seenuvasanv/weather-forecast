const request = require('request');

const getGeoCode = (address, callback, weatherCB) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2VlbnV2YXNhbnYiLCJhIjoiY2s2bm82cjJ2MG1zdjNsbHluem1vb2l6NiJ9.YG31obvil8Me6qIGJsEM6Q&limit=1`;
    request({
        url,
        json: true
    }, (err, {body} = {}) => {
        if (err) {
            weatherCB('unable to connect', undefined);
        } else if (body.error || !body.features || !body.features.length) {
            weatherCB('unable to connect', undefined);
        } else {
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const location = body.features[0].place_name;
            console.log(`Longitute is : ${longitude} and Latitude is : ${latitude}`);

            callback(undefined,
                {
                    latitude,
                    longitude,
                    location
                },
                weatherCB
            );
        }
    });
};

module.exports = getGeoCode;