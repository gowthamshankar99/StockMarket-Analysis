var module = angular.module("ngModule", ["ngRoute",'ui.bootstrap']);
var socket = io('http://localhost:8007');
module.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/main.html',
            controller: 'ngController'
        })
        .when('/ticker', {
            templateUrl: '/addTicker.html',
            controller: 'ngAddTicker'
        })
        .when('/portfolio', {
            templateUrl: '/portfolio.html',
            controller: 'ngPortfolio'
        })
        .when('/removeticker', {
            templateUrl: '/removeTicker.html',
            controller: 'ngRemoveTicker'
        })
        .otherwise({
            redirectTo: '/ticker'
        });
});

module.controller("maincontroller",function($scope){
    $scope.removeRefresh = function()
    {
        location.reload();
    }
});

module.controller("ngController", controllerFunction);



function controllerFunction($scope, $http) {
    $scope.gowthamshankar = "newValue"
//    var socket = io('http://localhost:8080');

    socket.on('message-from-server', function (message) {

        $scope.gowthamshankar = message;
        $scope.$apply(function () { $scope.gowthamshankar = message; });
        console.log($scope.gowthamshankar);
    });
    $scope.tableFlag = false;

    $scope.submitClick = function () {
        console.log();

        getStockDetails($scope.stockTicker);
        $scope.tableFlag = true;
    }

    function getStockDetails(ticker) {
        $http.get('https://akgmh5uvlc.execute-api.us-east-1.amazonaws.com/Prod/' + ticker.toUpperCase()).then(function (done) {
            var priceArray = [];
            $scope.response = done.data;
            console.log(JSON.parse($scope.response.message));

            $scope.tableTicker = $scope.stockTicker;
            $scope.tableTicker = $scope.tableTicker.toUpperCase();

            // iterate through the data.
            for (var i = 0; i < JSON.parse($scope.response.message).length; i++) {
                console.log(JSON.parse($scope.response.message)[i].price.S);
                priceArray.push(JSON.parse($scope.response.message)[i].price.S);
            }

            // attach the array to the scope object
            $scope.SpriceArray = priceArray;
        });
    }
}

module.controller("ngAddTicker", function ($scope, $http) {




    $scope.closeAlert = function(index) {
        $scope.show = false;

    };
    $scope.closeAlert2 = function(index) {
        $scope.show2 = false;
        
    };

    $scope.addClick = function () {
        console.log("hello");
        $http.get('https://arzktrqj0a.execute-api.us-east-1.amazonaws.com/PROD/' + $scope.stockTickerAdder.toUpperCase().trim()).then(function (data) {
            $scope.resonse = data;
            console.log(typeof data.status);
            if(data.status == 200)
            {
                $scope.show = true;
                
            }
            else{
                $scope.show2 = true;
            }
        });
    }
})

module.controller("ngPortfolio", function ($scope,$http) {


//    var socket = io('http://localhost:8080');
    $http.get('https://iyz9xlw3ba.execute-api.us-east-1.amazonaws.com/Prod/getIndividualStockTickers').then(function(done){
        if(done.status == 200)
        {


            //accessQUANDLapi(done.data.Items).then(function(result) {
            //    $scope.tickerNames = result;
            //    console.log("as 1 " + JSON.stringify(result));
            //});
            
            socket.on('message-from-server2', function (message) {

                $scope.tickerNames = message;
                $scope.$apply(function () { $scope.tickerNames = message; });
                console.log("message " + message);
            });



            
            
        }
    });

    function accessQUANDLapi(tickerName)
    {
        return new Promise(function(resolve,reject)
        {
            
            let tickerNames = [];
            var temp = 0;
            tickerName.forEach(function(listItem, index){
//                $http.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + listItem.tickerName.S + '&apikey=9cjx6en2H1_XFehNXrGx').then(function(data){
//                    if(data.status == 200)
//                    {
//                        console.log(data);
//                        console.log(data);
//                        data['data']['Time Series (Daily)']['2018-05-24'].ticker = listItem.tickerName.S;
//                        tickerNames.push(data['data']['Time Series (Daily)']['2018-05-24']);
//                        temp++;
//                        console.log("Temp " + temp);
//                        console.log("tickerName.length " + tickerName.length);
//                        if(temp == tickerName.length)
//                       {
//                            console.log("as2 " + tickerNames);
//                            resolve(tickerNames);
//                        }
//                    }
//                    else{
//                        
//                        reject('error return code');
//                    }
                    
//                });

                $http.defaults.headers.common['X-Mashape-Key'] = '4B5APBMEQVmshPhOG6gHcc4bELr6p1z8wQgjsnczgNTYuQPwpx';
                $http.defaults.headers.common['X-Mashape-Host'] = 'adakadavra-smarket.p.mashape.com';

                $http.get('https://adakadavra-smarket.p.mashape.com/api/v1/public/quote/' + listItem.tickerName.S).then(function(data) {
                        console.log(data);
                })

            });




        }
    );

    }

    console.log("ngPortfolio");
});

module.controller("ngRemoveTicker",function($scope,$http){

    console.log("socket disconnect call");


        socket.emit('disconnect');

        socket.close();

    

    $scope.closeAlert = function(index) {
        $scope.show = false;

    };
    $scope.closeAlert2 = function(index) {
        $scope.show2 = false;
        
    };

    $scope.removeClick = function() {
        console.log($scope.stockTickerAdder);
        $http.get('https://gcj1pujdl1.execute-api.us-east-1.amazonaws.com/Prod/'+$scope.stockTickerAdder.toUpperCase().trim()).then(function(data){
            console.log('remove success');
            if(data.status == 200)
            {
                $scope.show = true;
                
            }
            else{
                $scope.show2 = true;
            }
        });
    }

})