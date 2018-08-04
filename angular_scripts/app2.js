const request = require('request-promise');

request('https://iyz9xlw3ba.execute-api.us-east-1.amazonaws.com/Prod/getIndividualStockTickers')
.then(function(res)
{
    var TickerNames = [];
    for(let item of JSON.parse(res).Items)
    {
        console.log(item.tickerName.S);
        TickerNames.push(item.tickerName.S);
        request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + item.tickerName.S + '&apikey=9cjx6en2H1_XFehNXrGx')
        .then(function(done) {
        //    console.log(JSON.parse(done)['Time Series (Daily)']['2018-05-17']);
            let tickerDetails = JSON.parse(done)['Time Series (Daily)']['2018-05-17'];
            tickerDetails.ticker = item.tickerName.S;
            console.log(tickerDetails);

        }).catch(function(Err){
            console.log(Err);
        })

    }
})
.catch(function(err) {
    console.log(err)
})


//request('https://iyz9xlw3ba.execute-api.us-east-1.amazonaws.com/Prod/getIndividualStockTickers')
//.then(function(res)
//{
//    console.log(res);
//    console.log(JSON.parse(res)['data']['Time Series (Daily)']['2018-05-17']);
//})
//.catch(function(err) {
//    console.log(err)
//})