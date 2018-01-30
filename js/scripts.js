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


  $("button#calculate").click(function() {
    var buyPrice;
    var sellPrice;
    startDate = $("input#buy-date").val();
    // var lastDateDigit = parseInt(startDate.slice(9,10)) + 1;
    // startDate = startDate.slice(0,9) + lastDateDigit;
    coinTest = $("input#coinType").val();
    fiatTest = $("input#fiatType").val();
    fiatAmount = parseFloat($("input#fiat-amount").val());
    //console.log("Bought " + numberOfCoins + " " + coinType);

    startDate = Date.parse($("input#buy-date").val());
    startDate /= 1000;
    // console.log("Bought on " + startDate);
    endDate = Date.parse($("input#sell-date").val());
    endDate /= 1000;
    // console.log("Sold on " + endDate);
    // Config for HTTP request urls
    var requestBuyPrice = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinTest + "&tsyms=" + fiatTest + "&ts=" + startDate;
    var requestSellPrice = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinTest + "&tsyms=" + fiatTest + "&ts=" + endDate;


    $.get(requestBuyPrice, function(response) {
      console.log(requestBuyPrice)

      var coinVarBuy = response[coinTest];
      buyPrice = coinVarBuy[fiatTest];
      //  testVar.push(coinVar[fiatTest]);

      $.get(requestSellPrice, function(response) {

        console.log(requestSellPrice)
        var coinVarSell = response[coinTest];
        sellPrice = coinVarSell[fiatTest];
        console.log("buy price: " + buyPrice + ", sell price: " + sellPrice);

        var numberOfCoins = fiatAmount / buyPrice;
        var calculateAmountNow = numberOfCoins * sellPrice;

        console.log("I would have: " + calculateAmountNow);
      });
      //$(".test").text(buyPrice);


      //console.log(buyPrice);

    });




    //calculate(coinType, fiatAmount, fiatType, startDate, endDate);
  })
});
