function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

crypt_single_base_currency = typeof crypt_single_base_currency == "undefined" ? "Bitcoin (BTC)" : crypt_single_base_currency;
crypt_single_target_currency = typeof crypt_single_target_currency == "undefined" ? "US Dollar (USD)" : crypt_single_target_currency;
crypt_single_background_color = typeof crypt_single_background_color == "undefined" ? "#FFFFFF" : crypt_single_background_color;
crypt_single_transperency = typeof crypt_single_transperency == "undefined" ? true : crypt_single_transperency;
crypt_single_border_width = typeof crypt_single_border_width == "undefined" ? 1 : crypt_single_border_width;
crypt_single_border_color = typeof crypt_single_border_color == "undefined" ? "#CCCCCC" : crypt_single_border_color;
crypt_single_border_corners = typeof crypt_single_border_corners == "undefined" ? "rounded" : crypt_single_border_corners;
crypt_single_font_family = typeof crypt_single_font_family == "undefined" ? "Arial" : crypt_single_font_family;
crypt_single_font_size = typeof crypt_single_font_size == "undefined" ? "medium" : crypt_single_font_size;
crypt_single_font_color = typeof crypt_single_font_color == "undefined" ? "#000000" : crypt_single_font_color;
crypt_single_display_time = typeof crypt_single_display_time == "undefined" ? true : crypt_single_display_time;

crypt_single_getPar = eval('(' + httpGet("https://api.cryptonator.com/api/ticker/" +
    crypt_single_base_currency.toLowerCase().match(/.*?\(([0-9a-z]+)\)/i)[1] + "-" + crypt_single_target_currency.toLowerCase().match(/.*?\(([0-9a-z]+)\)/i)[1]) + ')');

crypt_single_month_name = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

crypt_single_date = new Date(crypt_single_getPar.timestamp * 1000);
crypt_single_day = FormatNumberLength(crypt_single_date.getDate(), 2);
crypt_single_month = crypt_single_month_name[crypt_single_date.getMonth()];
crypt_single_year = crypt_single_date.getFullYear();
crypt_single_hour = FormatNumberLength(crypt_single_date.getHours(), 2);
crypt_single_minutes = FormatNumberLength(crypt_single_date.getMinutes(), 2);
crypt_single_seconds = FormatNumberLength(crypt_single_date.getSeconds(), 2);
crypt_single_time_zone = "UTC+0:00";

if (crypt_single_transperency)
    crypt_single_background_color = 'transparent';

switch (crypt_single_font_size) {
    case 'small':
        crypt_single_font_size = "90%";
        break;

    case 'medium':
        crypt_single_font_size = "110%";
        break;

    case 'large':
        crypt_single_font_size = "150%";
        break;
}

crypt_single_style = 'background: ' + crypt_single_background_color +
    '; border: ' + crypt_single_border_width + 'px solid ' + crypt_single_border_color + ';' +
    'font-family: ' + crypt_single_font_family +'; font-size: ' + crypt_single_font_size +
    '; color: ' + crypt_single_font_color + ';';

if (crypt_single_border_corners == "square") {
    crypt_single_style += "-webkit-border-radius: 0 !important; -moz-border-radius: 0 !important; border-radius: 0 !important;";
}

if (crypt_single_getPar.success != false) {
    if (crypt_single_getPar.ticker.price > 1)
        crypt_single_price = Math.round(crypt_single_getPar.ticker.price * 100) / 100;
    else
        crypt_single_price = crypt_single_getPar.ticker.price

    var crypt_single_text_style = '<font style="color:#cc0000;"><b>&darr;</b></font>';

    if (crypt_single_getPar.ticker.change >= 0) {
        crypt_single_text_style = '<font style="color:#009900;"><b>&uarr;</b></font>';
    }

    document.write('\
    <div class="cryptonatorwidget" style="border-radius:4px;padding:10px;' + crypt_single_style + '">\
    <div><font style="font-size:90%;">' + crypt_single_base_currency + '</font>\
    <b>' + crypt_single_price + '</b> ' + crypt_single_target_currency.match(/.*?\(([0-9a-z]+)\)/i)[1] +'\
    <b>' + crypt_single_text_style + '</b>\
    </div>');
}
else {

}

if (crypt_single_display_time && crypt_single_getPar.success != false) {
    document.write('<div style="font-size:70%;opacity:0.6;padding-top:10px;">\
            Updated ' + crypt_single_day + ' ' + crypt_single_month + ' ' + crypt_single_year + ' '
            + crypt_single_hour + ':' + crypt_single_minutes + ':' + crypt_single_seconds + ' '
            + crypt_single_time_zone + '\
        </div>');

    document.write('<div style="font-size:10px;opacity:0.6;padding-top:10px;">Powered by <a href="https://www.cryptonator.com" style="color:' + crypt_single_font_color + ';" target="_blank">Cryptonator</a></div>\
    </div>');
} else {

}
