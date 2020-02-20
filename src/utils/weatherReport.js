const request = require('request');

const getWeatherReport = (err, data, callback) => {
    const {latitude, longitude, location} = data ? data : {};
    if (err) {
        callback('not found', undefined);
    } else {
        const url = `https://api.darksky.net/forecast/dbdd8670919019260d8a13e729802ce1/${latitude},${longitude}`;
        request({
            url,
            json: true
        }, (err, data) => {
            const body = data ? data.body : undefined;
            if (err) {
                callback('getting error', undefined);
            } else if (body.error) {
                callback('unable to get weather details', undefined);
            } else {
                const { temperature, precipProbability } = body.currently
                callback(undefined, {data: `${body.daily.data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain`, location})
            }
        });
    }
};

module.exports = getWeatherReport;