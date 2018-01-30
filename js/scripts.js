var SDK = typeof window !== 'undefined' ? window.COIN_API_SDK : require("./coinapi_v1")["default"]

var cryptoApi = new SDK("7F2E3F11-2194-4945-9888-16822C39CCD0"); //"2014-11-02T23:59:59"
//var numberOfCoins;


// function calculate(coinType, fiatAmount, fiatType, startDate, endDate) {
//   var sellPrice;
//   var buyPrice;
//   var result;
//   var numberOfCoins;
//   var BuyPriceObject;
//
//   $.get('http://138.197.214.133/api/v1/attendee', function(response) {
// };

$(document).ready(function() {

  var startDate;
  var endDate;
  var coinType;
  var fiatType;
  var fiatAmount;
  var buyPrice;

  $("button#calculate").click(function() {

    startDate = $("input#buy-date").val();
    // var lastDateDigit = parseInt(startDate.slice(9,10)) + 1;
    // startDate = startDate.slice(0,9) + lastDateDigit;
    coinType = "BTC";
    fiatType = "USD";
    fiatAmount = parseFloat($("input#fiat-amount").val());
    //console.log("Bought " + numberOfCoins + " " + coinType);
    startDate = Date.parse($("input#buy-date").val());
    // console.log("Bought on " + startDate);
    endDate = Date.parse($("input#sell-date").val());
    // console.log("Sold on " + endDate);

    // Config for HTTP request urls
    var requestBuyPrice = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinType + "&tsyms=" + fiatType + "&ts=" + startDate;
    var requestSellPrice = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinType + "&tsyms=" + fiatType + "&ts=" + endDate;


    $.get(requestBuyPrice, function(response) {
      debugger;
      var obj = response.coinType;
      buyPrice = obj.fiatType;
      debugger;
    });

    $.get(requestSellPrice, function(response) {
      var obj = response.BTC;
      buyPrice = obj.USD;
    });

    $(".test").text(buyPrice);

    console.log(buyPrice);

    //calculate(coinType, fiatAmount, fiatType, startDate, endDate);
  })
});
