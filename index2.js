var unirest = require('unirest');

unirest.get("https://adakadavra-smarket.p.mashape.com/api/v1/public/quote/AAPL")
.header("X-Mashape-Key", "4B5APBMEQVmshPhOG6gHcc4bELr6p1z8wQgjsnczgNTYuQPwpx")
.header("X-Mashape-Host", "adakadavra-smarket.p.mashape.com")
.end(function (result) {
    console.log(result.body.quote.financeData);
  //console.log(result.body.quote.financeData.ask);
});