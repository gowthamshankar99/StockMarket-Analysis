const express = require('express');
const path = require('path');
var app = express();

const unirest = require('unirest');

var server = require('http').Server(app);
var io = require('socket.io')(server);
const request = require('request-promise');

io.on('connection', function (socket) {



    console.log("Connection has been made");


    i = 1;
    j = 1;

//    setInterval(function () {
//        i++;
//        socket.ecmit('message-from-server', i * 3);
//    }, 1000);

    let myvar = setInterval(function () {
        i++;
        let tickerDetails = "";
        request('https://iyz9xlw3ba.execute-api.us-east-1.amazonaws.com/Prod/getIndividualStockTickers')
            .then(function (res) {
                var apikeyArray = ['CJqvD6sse8Gx9zxJBh4p','9cjx6en2H1_XFehNXrGx','3HVYUBy4scnsqVNyy7AH','8k_XdGhz3ZpQsrkmAQ7x','oxPe-NKycTsLufBSnHA1','Vw5hfcefYBXg5XAizZAz','bCh1bj_eBdxoAuPnBnc2','VL6p13eesf19Geg7Nt5C','DLUJj3K6wpyaRaY1NGwx','bKbzZJyh6KG6tCHRoirm','wumWvhTeZXoujr66ezmo','-ohyDNNXT4DA-b5bTw_H','sGYM8_o--Wn7s9bUhe9d','ATSizL4SqPs3wsDJ3PAu'];

                console.log("unique messages .. please log these");
                var TickerNames = [];
                for (let item of JSON.parse(res).Items) {
                    var rand = apikeyArray[Math.floor(Math.random() * apikeyArray.length)];
                    console.log("item "  + item.tickerName.S);
                    // the new api call should go here....
                    let tickerDetails = "";
                    unirest.get("https://adakadavra-smarket.p.mashape.com/api/v1/public/quote/" + item.tickerName.S)
                    .header("X-Mashape-Key", "4B5APBMEQVmshPhOG6gHcc4bELr6p1z8wQgjsnczgNTYuQPwpx")
                    .header("X-Mashape-Host", "adakadavra-smarket.p.mashape.com")
                    .end(function (result) {
                      console.log(result.body.quote);
                      //console.log(result.body.quote.financeData.ask);
                      tickerDetails = result.body.quote.financeData;
                      tickerDetails.ticker = item.tickerName.S;
                      TickerNames.push(tickerDetails);
                      socket.emit('message-from-server2', TickerNames);


                    });
                }


            })
            .catch(function (err) {
                console.log(err)
            })


    }, 10000);


    socket.on('disconnect', function (reason) {
        clearInterval(myvar);
        console.log("connection disconnected " + reason);
        socket.disconnect();
    });

});

function getTickerDetails() {
    let tickerDetails = "";
    request('https://iyz9xlw3ba.execute-api.us-east-1.amazonaws.com/Prod/getIndividualStockTickers')
        .then(function (res) {
            var TickerNames = [];
            for (let item of JSON.parse(res).Items) {
                console.log(item.tickerName.S);
                TickerNames.push(item.tickerName.S);
                request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + item.tickerName.S + '&apikey=9cjx6en2H1_XFehNXrGx')
                    .then(function (done) {
                        if (JSON.parse(done)['Time Series (Daily)'] != undefined) {
                            tickerDetails = JSON.parse(done)['Time Series (Daily)']['2018-07-27'];
                            tickerDetails.ticker = item.tickerName.S;
                            tickerDetails.previousClose = JSON.parse(done)['Time Series (Daily)']['2018-07-26']['4. close'];
                            console.log(tickerDetails);
                        }
                    }).catch(function (Err) {
                        console.log(Err);
                    })

            }


        })
        .catch(function (err) {
            console.log(err)
        })


    return tickerDetails;
}

function myName(i) {
    return "Gowtham" + i;
}

app.use(express.static(__dirname + '/web_pages'));
app.use(express.static(__dirname + '/angular_scripts'));
app.use(express.static(__dirname + "/node_modules/socket.io-client/dist"));
console.log(__dirname + '/angular_scripts');

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/web_pages/index.html"));
})

app.get("/submitPage", function (req, res) {
    console.log(req.query.stockTicker);
    res.send("SubmitPage");
})

var port = 8007;

server.listen(port, function () {
    console.log("app listening in port " + port);
})