var SDK = typeof window !== 'undefined' ? window.COIN_API_SDK : require("./coinapi_v1")["default"]

var cryptoApi = new SDK("7F2E3F11-2194-4945-9888-16822C39CCD0"); //"2014-11-02T23:59:59"

var startDate;
var endDate;
var coinType;
var fiatType;
var fiatAmount;
//var numberOfCoins;

function calculate(coinType, fiatAmount, fiatType, startDate, endDate) {
  var sellPrice;
  var buyPrice;
  var result;
  var numberOfCoins;

  cryptoApi.exchange_rates_get_specific_rate(coinType, fiatType, startDate);
  buyPrice = Exchange_rates_get_specific_rate;

  console.log(buyPrice.rate);

  //numberOfCoins = fiatAmount / buyPrice;
  //console.log("NOC outside: " + getSellPrice);
  //return result = (numberOfCoins * sellPrice);
  //console.log(result);
};

$(document).ready(function() {
  $("button#calculate").click(function() {
    startDate = $("input#buy-date").val();
    // var lastDateDigit = parseInt(startDate.slice(9,10)) + 1;
    // startDate = startDate.slice(0,9) + lastDateDigit;
    coinType = "BTC";
    fiatType = "USD";
    fiatAmount = parseFloat($("input#fiat-amount").val());
    //console.log("Bought " + numberOfCoins + " " + coinType);
    startDate = new Date(Date.parse($("input#buy-date").val()));
    console.log("Bought on " + startDate);
    endDate = new Date(Date.parse($("input#sell-date").val()));
    console.log("Sold on " + endDate);
    calculate(coinType, fiatAmount, fiatType, startDate, endDate);
  })
});
