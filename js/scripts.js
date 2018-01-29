var SDK = typeof window !== 'undefined' ? window.COIN_API_SDK : require("./coinapi_v1")["default"]

var sdk = new SDK("7F2E3F11-2194-4945-9888-16822C39CCD0"); //"2014-11-02T23:59:59"

var startDate = new Date(Date.parse("2014-11-02T23:59:59"));
var endDate = new Date(Date.parse("2017-11-02T23:59:59"));

function calculate(startDate, endDate) {
  sdk.exchange_rates_get_specific_rate("BTC", "EUR", t).then(function (Exchange_rates_get_specific_rate) {
    var output = Exchange_rates_get_specific_rate;
    console.log(output);
  });
}
