var SDK = typeof window !== 'undefined' ? window.COIN_API_SDK : require("./coinapi_v1")["default"]

var cryptoApi = new SDK("7F2E3F11-2194-4945-9888-16822C39CCD0"); //"2014-11-02T23:59:59"
//var numberOfCoins;

function SortCoin(name, id, imgUrl) {
  this.name = name;
  this.id = id;
  this.imgUrl = imgUrl;
}

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
    var listItems = '';
    var sortedCoins = [];
    //var listItems = '<option selected="selected" value="0">- Select -</option>';
    Object.keys(response.Data).forEach(function(key) {
      var coinName = key;
      var sortId = response.Data[key].SortOrder;
      var imgUrl = response.Data[key].ImageUrl;
      var sortedCoin = new SortCoin(coinName, sortId, imgUrl);
      sortedCoins.push(sortedCoin);
    });

    sortedCoins.sort(function(a, b){
      return a.id-b.id;
    });

    sortedCoins.forEach(function(sortedCoin) {
      listItems += "<li value='" + sortedCoin.name + "'><a href='#'><img class='crypto-icon' src='https://www.cryptocompare.com" + sortedCoin.imgUrl + "'><span class='key-span'>" + sortedCoin.name + "</span></a></li>";
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


    $.get(requestBuyPrice, function(response) {
      console.log(requestBuyPrice)
      var coinVarBuy = response[coinTest];
      buyPrice = coinVarBuy[fiatTest];


      $.get(requestSellPrice, function(response) {

        console.log(requestSellPrice)
        var coinVarSell = response[coinTest];
        sellPrice = coinVarSell[fiatTest];
        console.log("buy price: " + buyPrice + ", sell price: " + sellPrice);

        var numberOfCoins = fiatAmount / buyPrice;
        var calculateAmountNow = numberOfCoins * sellPrice;

        $(".result").text("I would have: " + fiatTest + "  " + calculateAmountNow.toFixed(2));
      });


    });



  })
});
