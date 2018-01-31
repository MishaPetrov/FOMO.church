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
  var coinTest = "";
  var fiatType;
  var fiatAmount;

  $.get("https://min-api.cryptocompare.com/data/all/coinlist", function(response) {
    console.log(response);
    var listItems = '';
    //var listItems = '<option selected="selected" value="0">- Select -</option>';

    Object.keys(response.Data).forEach(function(key) {
      var imgUrl = response.Data[key].ImageUrl;
      listItems += "<li value='" + key + "'><a><img class='crypto-icon' src='https://www.cryptocompare.com" + imgUrl + "'><span class='key-span'>" + key + "</span></a></li>";
    });
    //$("#coinType").append('<input class="form-control" id="coin-type-input" type="text" placeholder="Search..">');
    $("#coinType").append(listItems);
    $("#coin-type-input").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#coinType li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
    $("li").click(function() {
      coinTest = $(this).text();
      $(".crypto-search-btn").text(coinTest);
    });

  });

  $("button#calculate").click(function(event) {
    event.preventDefault();
    var buyPrice;
    var sellPrice;
    startDate = $("input#buy-date").val();

    //coinTest = $("#coinType").val();
    fiatTest = $("#fiatType").val();
    fiatAmount = parseFloat($("input#fiat-amount").val());

    startDate = Date.parse($("input#buy-date").val());
    startDate /= 1000;
    console.log("Bought on " + startDate);
    endDate = Date.parse($("input#sell-date").val());
    endDate /= 1000;
    console.log("Sold on " + endDate);
    // Config for HTTP request urls
    var requestBuyPrice = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinTest + "&tsyms=" + fiatTest + "&ts=" + startDate;
    var requestSellPrice = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinTest + "&tsyms=" + fiatTest + "&ts=" + endDate;

    // Output variables
    var buyDate = new Date((startDate * 1000) + 86400000);
    console.log("THIS BUYDATE" + buyDateOutput);
    var sellDate = new Date((endDate * 1000) + 86400000);
    var DateDifferenceOutput = false;
    var fiatSymbol = function convertToSymbol(fiatSymbol) {
      if (fiatSymbol === "USD") {
        fiatSymbol = "$";
      } else if (fiatSymbol === "EUR") {
        fiatSymbol = "€";
      } else if (fiatSymbol === "CAD") {
        fiatSymbol = "$";
      } else if (fiatSymbol === "GBP") {
        fiatSymbol = "£";
      }
      else if (fiatSymbol === "RUR") {
        fiatSymbol = "₽";
      } else if (fiatSymbol === "JPY") {
        fiatSymbol = "¥";
      } else if (fiatSymbol === "CNY") {
        fiatSymbol = "¥";
      } else {
        fiatSymbol = "$";
      }
      return fiatSymbol;
    };

    // These functions change the output date format to month/date/year, e.g. 01/12/2018
    var buyDateOutput = function formatDate(value)
        {
           return value.getMonth()+1 + "/" + value.getDate() + "/" + (value.getYear()+1900); console.log(value.getYear());
        }
    var sellDateOutput = function formatDate(value)
        {
           return value.getMonth()+1 + "/" + value.getDate() + "/" + (value.getYear()+1900); console.log(value.getYear());
        }


    $.get(requestBuyPrice, function(response) {
      console.log(requestBuyPrice)
      var coinVarBuy = response[coinTest];
      buyPrice = coinVarBuy[fiatTest];
      console.log("HERE" + buyPrice);


      $.get(requestSellPrice, function(response) {

        var coinVarSell = response[coinTest];
        sellPrice = coinVarSell[fiatTest];

        var numberOfCoins = fiatAmount / buyPrice;
        var calculateAmountNow = numberOfCoins * sellPrice;

        $(".result").text("If I had invested " + fiatSymbol(fiatTest) + fiatAmount + "  in " + coinTest + " on " + buyDateOutput(buyDate) + " and sold that investment on " + sellDateOutput(sellDate) + " I would have made " + fiatSymbol(fiatTest) + Math.round(calculateAmountNow.toFixed(2) - fiatAmount));

        $
      });




    });



  })
});
