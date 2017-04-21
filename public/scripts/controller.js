//HOME TILES CONTROLLER IS WRITTEN OVER HERE
TCSAMSUKApplication.controller('homeTilesController', ['$http', '$scope', '$serviceURLS', function ($http, $scope, $serviceURLS) {

    angular.element('.carousel').carousel(0);
    
    $http.get($serviceURLS.serviceUrlsList['changeDetails'])
        .success(function(response){
            console.log(response);
        })
        .error(function(data, status){
            console.log(data);
        })
}]);

//STORES NOT POLLING CONTROLLER IS WRITTEN OVER HERE
TCSAMSUKApplication.controller('storesNotPollingController', ['$http', '$scope', '$storesNotPollingService', '$mapService', '$serviceURLS', '$window', '$timeout', function ($http, $scope, $storesNotPollingService, $mapService, $serviceURLS, $window, $timeout) {

    google.maps.event.addDomListener(window, 'load', $mapService.initialize());

    google.maps.event.addDomListener(window, "resize", function () {
        var center = $mapService.map.getCenter();
        google.maps.event.trigger($mapService.map, "resize");
        $mapService.map.setCenter(center);
    });


    $scope.storeDetailsList = [];
	$scope.storeList = [];
	$scope.storesArr = [];
    //$scope.storeList = [{"storeCode":"0186"}];
     $http.get($serviceURLS.serviceUrlsList['storeNotPollings'])
        .success(function (response) {
            var result = response;
            $scope.storeList = result['storenotpolled'];
			//console.log($scope.storeList);
			$scope.storeList.forEach(function (item) {
				//console.log(item.storeCode);
				$scope.storesArr.push(item.storeCode);
			}, this);
			console.log($scope.storesArr);
			
			$http.get($serviceURLS.serviceUrlsList['storeDetailsByIDs'] + $scope.storesArr)
				.success(function (stores) {
					$scope.storeNameArray = []
					stores.forEach(function (store) {
						//console.log(store)
						$scope.storeNameArray.push(store['Store Name']);
						$scope.storeDetailsList.push(store);
						$storesNotPollingService.storesNotPolling(store);
                        $scope.tills = store['tillHeartBeatReport'];
					}, this);
					setTimeout(function () {

						$("#storesNotPollingMarquee").marquee({
							direction: 'left',
							duration: 20000,
							duplicated: true,
							startVisible: true,
							pauseOnHover: true
						});
						
					}, 1000);
					
				})
				.error(function (data, status) {
					console.log(data);
				});
			})
        .error(function (data, status) {
            console.log(data);
    }); 
	
	
	console.log($scope.storeList);
	
	
	console.log($scope.storesArr);
	
    
    
    $scope.width = $window.innerWidth;
    
    window.addEventListener('resize', function () {
        $scope.$apply(function () {
            $scope.width = $window.innerWidth;
        });
    }, true);

}]);

//STORES WITH OFFLINR TILLS CONTROLLER IS WRITTEN OVER HERE
TCSAMSUKApplication.controller('storesWithOfflineTillsController', ['$http', '$scope', '$tillsOfflineService', '$mapService', '$window', '$serviceURLS', function ($http, $scope, $tillsOfflineService, $mapService, $window, $serviceURLS) {

    google.maps.event.addDomListener(window, 'load', $mapService.initialize());

    google.maps.event.addDomListener(window, "resize", function () {
        var center = $mapService.map.getCenter();
        google.maps.event.trigger($mapService.map, "resize");
        $mapService.map.setCenter(center);
    });
	$scope.storeDetailsList = [];
    $http.get($serviceURLS.serviceUrlsList['storeOfflineTills'])
        .success(function (stores) {
			//console.log(stores);
            //$scope.storeDetailsList = stores;
            $scope.storeNameArray = [];
            stores.forEach(function (store) {
				if(store['numOfTillsOffline'] != 1 && store['numOfTillsOffline'] != store['totalNumOfTills']){ // Added to adjust high valume off line tills.
					 console.log(store['storeName']);
					 $tillsOfflineService.tillsOffline(store);
					 $scope.storeNameArray.push(store['storeName']);
					 $scope.storeDetailsList.push(store);
				}
            }, this);
            
            setTimeout(function () {
                $("#tillsOfflineMarquee").marquee({
                    direction: 'left',
                    duration: 20000,
                    duplicated: true,
                    startVisible: true,
                    pauseOnHover: true
                });
            }, 1000);
        })
        .error(function (data, status) {
            console.log(data);
        });

    $scope.width = $window.innerWidth;

    window.addEventListener('resize', function () {
        $scope.$apply(function () {
            $scope.width = $window.innerWidth;
        });
    }, true);

}]);

//STORES REVENUE SINCE MORNING CONTROLLER IS WRITTEN OVER HERE
TCSAMSUKApplication.controller('storesRevenueSinceMorningController', ['$scope', '$mapService', '$chartService', '$http', '$serviceURLS', '$window', '$storeRevenueSinceMorningService', function ($scope, $mapService, $chartService, $http, $serviceURLS, $window, $storeRevenueSinceMorningService) {

    google.maps.event.addDomListener(window, 'load', $mapService.initialize());

    google.maps.event.addDomListener(window, "resize", function () {
        var center = $mapService.map.getCenter();
        google.maps.event.trigger($mapService.map, "resize");
        $mapService.map.setCenter(center);
    });


    /* $scope.storeList = [{ "id": "0121", "oldSalesValue": 23.00, "newSalesValue": 100.00 },
        { "id": "0166", "oldSalesValue": 20.00, "newSalesValue": 70.00 },
        { "id": "0626", "oldSalesValue": 13.00, "newSalesValue": 20.00 },
        { "id": "0448", "oldSalesValue": 12.00, "newSalesValue": 10.00 },
        { "id": "0809", "oldSalesValue": 11.00, "newSalesValue": 27.00 },
    ]; */

    $scope.storeCode = [];
    $scope.currentRevenue = [];
    $scope.lastWeekRevenue = [];
    $scope.storeRevenueListForlastOneHour = [];
    $scope.storeCodeList = [];
              
     $http.get($serviceURLS.serviceUrlsList['storesRevenueSinceMorning'])
         .success(function (responce) {
             var result = responce;
             $scope.storeRevenueListForlastOneHour = result['topMorningsale'];
             $scope.storeRevenueListForlastOneHour.forEach(function(item){
                 $scope.storeCodeList.push(item.storeCode);
             });
			 //console.log($scope.storeCodeList);
             $http.get($serviceURLS.serviceUrlsList['storeDetailsByIDs'] + $scope.storeCodeList)
                 .success(function (stores) {
                     $scope.storeNameArray = [];
                     stores.forEach(function (store, id) {
                         $scope.storeNameArray.push(store['Store Name']);
                         $scope.storeCode.push(store['Store Abbreviation'] + store['Store Number']);
                         $scope.currentRevenue.push($scope.storeRevenueListForlastOneHour[id].amount);
                         $scope.lastWeekRevenue.push($scope.storeRevenueListForlastOneHour[id].amountHistory);
                         $storeRevenueSinceMorningService.storeRevenueMarkars(angular.extend(store, $scope.storeRevenueListForlastOneHour[id]));
                     }, this);

                     $chartService.setSaleDetails(
                         $chartService.chart,
                         $scope.storeCode,
                         $scope.lastWeekRevenue,
                         $scope.currentRevenue,
                         "Yesterday's Sales",
                         "Since Morning"

                         );
                     setTimeout(function () {
                         $("#revenueSinceMorningMarquee").marquee({
                             direction: 'left',
                             duration: 20000,
                             duplicated: true,
                             startVisible: true,
                             pauseOnHover: true
                         });
                     }, 1000);
                 })
                 .error(function (data, status) {
                     console.log(data);
                 });
         })
         .error(function (data, status) {
             console.log(data);
     });
	 
	 
    
    $chartService.initializeChart();
    /* var storesArr = [];
    $scope.storeList.forEach(function (store) {
        storesArr.push(store.id);
    }, this);
    $http.get($serviceURLS.serviceUrlsList['storeDetailsByIDs'] + storesArr)
        .success(function (stores) {

            $scope.storeNameArray = [];
            stores.forEach(function (store, id) {
                $scope.storeNameArray.push(store['Store Name']);
                $scope.storeCode.push(store['Store Abbreviation'] + store['Store Number']);
                $scope.currentRevenue.push($scope.storeList[id].newSalesValue);
                $scope.lastWeekRevenue.push($scope.storeList[id].oldSalesValue);
                $storeRevenueSinceMorningService.storeRevenueMarkars(angular.extend(store, $scope.storeList[id]));
            }, this);

            $chartService.setSaleDetails(
                $chartService.chart,
                $scope.storeCode,
                $scope.lastWeekRevenue,
                $scope.currentRevenue,
                "Last Week Sales",
                "Current Sales"

                );
                
            setTimeout(function () {

                $("#revenueSinceMorningMarquee").marquee({
                    direction: 'left',
                    duration: 20000,
                    duplicated: true,
                    startVisible: true,
                    pauseOnHover: true
                });
                
            }, 1000);
        })
        .error(function (data, status) {
            console.log(data);
        }); */

    $scope.width = $window.innerWidth;

    window.addEventListener('resize', function () {
        $scope.$apply(function () {
            $scope.width = $window.innerWidth;
        });
    }, true);

}]);

//STORES REVENUE LAST ONE HOUR CONTROLLER IS WRITTEN OVER HERE
TCSAMSUKApplication.controller('storesRevenueLastOneHourController', ['$scope', '$mapService', '$chartService', '$storeRevenueLastOneHourService', '$http', '$serviceURLS', '$window', function ($scope, $mapService, $chartService, $storeRevenueLastOneHourService, $http, $serviceURLS, $window) {

    google.maps.event.addDomListener(window, 'load', $mapService.initialize());

    google.maps.event.addDomListener(window, "resize", function () {
        var center = $mapService.map.getCenter();
        google.maps.event.trigger($mapService.map, "resize");
        $mapService.map.setCenter(center);
    });

    /* $scope.storeList = [
        { "id": "0374", "oldSalesValue": 123.00, "newSalesValue": 300.00 },
        { "id": "0393", "oldSalesValue": 123.00, "newSalesValue": 170.00 },
        { "id": "0626", "oldSalesValue": 123.00, "newSalesValue": 200.00 },
        { "id": "0448", "oldSalesValue": 123.00, "newSalesValue": 170.00 },
        { "id": "0809", "oldSalesValue": 123.00, "newSalesValue": 270.00 },
    ]; */

    $scope.storeCode = [];
    $scope.currentRevenue = [];
    $scope.lastHourRevenue = [];
    $scope.storeRevenueListForlastOneHour = [];
    $scope.storeCodeList = [];
                
     $http.get($serviceURLS.serviceUrlsList['storesRevenueForLastHour'])
         .success(function (responce) {
             var result = responce;
             $scope.storeRevenueListForlastOneHour = result['tophoursale'];
             $scope.storeRevenueListForlastOneHour.forEach(function(item){
                 $scope.storeCodeList.push(item.storeCode);
             });
             $http.get($serviceURLS.serviceUrlsList['storeDetailsByIDs'] + $scope.storeCodeList)
                 .success(function (stores) {
                     console.log(stores);
                     $scope.storeNameArray = [];
                     stores.forEach(function (store, id) {
                         $scope.storeNameArray.push(store['Store Name']);
                         $scope.storeCode.push(store['Store Abbreviation'] + store['Store Number']);
                         $scope.currentRevenue.push($scope.storeRevenueListForlastOneHour[id].amount);
                         $scope.lastHourRevenue.push($scope.storeRevenueListForlastOneHour[id].amountHistory);
                         $storeRevenueLastOneHourService.storeRevenueMarkars(angular.extend(store, $scope.storeRevenueListForlastOneHour[id]));
                     }, this);

                     $chartService.setSaleDetails(
                         $chartService.chart,
                         $scope.storeCode,
                         $scope.lastHourRevenue,
                         $scope.currentRevenue,
                         "Last hour Sales",
                         "Current Sales"

                         );
                     setTimeout(function () {
                         $("#revenueLatOneHourMarquee").marquee({
                             direction: 'left',
                             duration: 20000,
                             duplicated: true,
                             startVisible: true,
                             pauseOnHover: true
                         });
                     }, 1000);
                 })
                 .error(function (data, status) {
                     console.log(data);
                 });
         })
         .error(function (data, status) {
             console.log(data);
     });
    
    $chartService.initializeChart();
    
    /* var storesArr = [];
    $scope.storeList.forEach(function (store) {
        storesArr.push(store.id);
    }, this);
    
    $http.get($serviceURLS.serviceUrlsList['storeDetailsByIDs'] + storesArr)
        .success(function (stores) {
            $scope.storeNameArray = [];
            stores.forEach(function (store, id) {
                $scope.storeNameArray.push(store['Store Name']);
                $scope.storeCode.push(store['Store Abbreviation'] + store['Store Number']);
                $scope.currentRevenue.push($scope.storeList[id].newSalesValue);
                $scope.lastHourRevenue.push($scope.storeList[id].oldSalesValue);
                $storeRevenueLastOneHourService.storeRevenueMarkars(angular.extend(store, $scope.storeList[id]));
            }, this);

            $chartService.setSaleDetails(
                $chartService.chart,
                $scope.storeCode,
                $scope.lastHourRevenue,
                $scope.currentRevenue,
                "Last hour Sales",
                "Current Sales"

                );
            setTimeout(function () {
                $("#revenueLatOneHourMarquee").marquee({
                    direction: 'left',
                    duration: 20000,
                    duplicated: true,
                    startVisible: true,
                    pauseOnHover: true
                });
            }, 1000);
        })
        .error(function (data, status) {
            console.log(data);
        });
 */
    $scope.width = $window.innerWidth;

    window.addEventListener('resize', function () {
        $scope.$apply(function () {
            $scope.width = $window.innerWidth;
        });
    }, true);

}]);

//STORES REVENUE FOR LAST SIX MONTHS CONTROLLER IS WRITTEN OVER HERE
TCSAMSUKApplication.controller('storesRevenueLastSixMonthController', ['$http', '$scope', '$mapService', '$window', '$serviceURLS', '$storeRevenueLastSixMonthsService', function ($http, $scope, $mapService, $window, $serviceURLS, $storeRevenueLastSixMonthsService) {

    google.maps.event.addDomListener(window, 'load', $mapService.initialize());

    google.maps.event.addDomListener(window, "resize", function () {
        var center = $mapService.map.getCenter();
        google.maps.event.trigger($mapService.map, "resize");
        $mapService.map.setCenter(center);
    });

    $scope.storeList = [
        { "id": "0729", "salesValue": 17.06 },
        { "id": "0692", "salesValue": 15.85 },
        { "id": "0306", "salesValue": 14.69 },
        { "id": "0932", "salesValue": 14.29 },
		{ "id": "0747", "salesValue": 14.08 }
    ];

    $scope.storeDetailsList = [];
    // $http.get($serviceURLS.serviceUrlsList['storeOfflineTills'])
    //     .success(function (response) {
    //         var result = response;
    //         $scope.storeDetailsList = result;
    //         angular.forEach($scope.storeDetailsList, function (value, key) {
    //             $tillsOfflineService.tillsOffline(value);
    //         });
    //     })
    //     .error(function (data, status) {
    //         console.log(data);
    //     });
   

    var storesArr = [];
    $scope.storeList.forEach(function (store) {
        storesArr.push(store.id);
    }, this);
    $http.get($serviceURLS.serviceUrlsList['storeDetailsByIDs'] + storesArr)
        .success(function (stores) {
            console.log(stores);
            $scope.storeNameArray = [];
            stores.forEach(function (store, id) {

                $scope.storeNameArray.push(store['Store Name']);
                $scope.storeDetailsList.push(angular.extend(store, $scope.storeList[id]));
                $storeRevenueLastSixMonthsService.storeRevenueMarkars(angular.extend(store, $scope.storeList[id]));


            }, this);

            setTimeout(function () {

                $("#revenueLastSixMonthsMarquee").marquee({
                    direction: 'left',
                    duration: 20000,
                    duplicated: true,
                    startVisible: true,
                    pauseOnHover: true
                });
            }, 1000);
        })
        .error(function (data, status) {
            console.log(data);
        });

    $scope.width = $window.innerWidth;

    window.addEventListener('resize', function () {
        $scope.$apply(function () {
            $scope.width = $window.innerWidth;
        });
    }, true);

}]);

//ITEMS REVENUE LAST ONE HOUR CONTROLLER IS WRITTEN OVER HERE
TCSAMSUKApplication.controller('itemsRevenueLastOneHourController', ['$http','$scope', '$itemRevenueService', '$serviceURLS', '$timeout', '$window', function ($http,$scope, $itemRevenueService, $serviceURLS, $timeout, $window) {
    $scope.itemListRevenueForLastOneHour = $itemRevenueService.itemListRevenueForLastOneHour;
    $scope.scenceSevenUrl = $serviceURLS.serviceUrlsList['scenceSevenUrl'];
    
    $http.get($serviceURLS.serviceUrlsList['topEANSales'])
        .success(function (response) {
            var result = response;
			console.log(result['topEANSales'])
            $scope.itemListRevenueForLastOneHour = result['topEANSales'];
            /* angular.forEach($scope.storeDetailsList, function (value, key) {
                $tillsOfflineService.tillsOffline(value);
            }); */
        })
        .error(function (data, status) {
            console.log(data);
        });
    
    $scope.width = $window.innerWidth;
    window.addEventListener('resize', function () {
        $scope.$apply(function () {
            $scope.width = $window.innerWidth;
            if ($scope.width < 990) {
                $timeout.cancel(itemRevenueModal);
                // angular.element('#itemRevenueModal').modal('toggle');
            }
        });
    }, true);

    if ($scope.width >= 990) {
        var itemRevenueModal = $timeout(function () {
            angular.element('#itemRevenueModal').on('show.bs.modal', function () {
                angular.element('.carousel').carousel(0);
            });
            angular.element('#itemRevenueModal').modal('show');
            $timeout(function () { angular.element('#itemRevenueModal').modal('hide'); }, 30000);
        }, 5000);
    }
    else {
        $timeout.cancel(itemRevenueModal);
    }

    angular.element('#itemRevenueModal').click(function (eventObject) { 
        angular.element('#itemRevenueModal').modal('toggle');
        // return false; 
    });

}]);

//ITEMS SELLING LAST ONE HOUR CONTROLLER IS WRITTEN OVER HERE
TCSAMSUKApplication.controller('itemsSellingLastOneHourController', ['$http','$scope', '$itemRevenueService', '$serviceURLS', '$timeout', '$window', function ($http, $scope, $itemRevenueService, $serviceURLS, $timeout, $window) {
    $scope.itemListSellingLastOneHour = $itemRevenueService.itemListSellingLastOneHour;
    $scope.scenceSevenUrl = $serviceURLS.serviceUrlsList['scenceSevenUrl'];
    
    $http.get($serviceURLS.serviceUrlsList['topEANQuantity'])
        .success(function (response) {
            var result = response;
			console.log(result['topEANQuantity'])
            $scope.itemListSellingLastOneHour = result['topEANQuantity'];
            /* angular.forEach($scope.storeDetailsList, function (value, key) {
                $tillsOfflineService.tillsOffline(value);
            }); */
        })
        .error(function (data, status) {
            console.log(data);
        });
    
    $scope.width = $window.innerWidth;
    window.addEventListener('resize', function () {
        $scope.$apply(function () {
            $scope.width = $window.innerWidth;
            if ($scope.width < 990) {
                $timeout.cancel(itemSellingModal);
                // angular.element('#itemSellingModal').modal('toggle');
            }
        });
    }, true);
    
    if ($scope.width >= 990) {
        var itemSellingModal = $timeout(function () {
            angular.element('#itemSellingModal').on('show.bs.modal', function () {
                angular.element('.carousel').carousel(0);
            });
            angular.element('#itemSellingModal').modal('show');
            $timeout(function () { angular.element('#itemSellingModal').modal('hide'); }, 30000);
        }, 5000);
    }
    else {
        $timeout.cancel(itemSellingModal);
    }

    angular.element('#itemSellingModal').click(function (eventObject) { 
        angular.element('#itemSellingModal').modal('toggle');
        // return false; 
    });

}]);

//REPLENISHMENT JOURNEY CONTROLLER IS WRITTEN OVER HERE
TCSAMSUKApplication.controller('replenishmentJourneyController', ['$http', '$scope', '$serviceURLS', function ($http, $scope, $serviceURLS) {

    /* var replenishmentCsvData = "ZSHPADV,Z005,R196,0223,11034810223\n" +
        "ZSHPADV,Z005,R135,0494,11034820494\n" +
        "ZSHPADV,Z005,R135,0494,11034830497\n" +
        "ZSHPADV,Z005,R135,0494,11034830326\n" +
        "ZSHPADV,Z005,R135,0494,11034830486\n" +
        "ZSHPADV,Z009,503135,D985,9506701\n" +
        "ZSHPADV,Z009,503135,D985,9506704\n" +
        "ZSHPADV,Z009,200045,R177,9506702\n" +
        "ZSHPADV,Z009,200045,R177,9506706\n" +
        "ZSHPADV,Z009,200045,R177,9506708\n" +
        "ZSHPADV,Z006,D800,R213,1103485R213\n" +
        "ZSHPADV,Z006,D800,R213,1103485R215\n" +
        "ZSHPADV,Z006,D800,R213,1103485R217\n" +
        "ZSHPADV,Z006,D800,R213,1103485R219\n" +
        "ZSHPADV,Z011,D985,0494,D98500512345\n" +
        "ZSHPADV,Z011,D985,0123,D98500515645"; */
    // var replenishmentCsvData = "ZSHPADV,Z005,R196,0223,11034810223\n" +
    //     "ZSHPADV,Z005,R135,0494,11034820494\n" +
    //     "ZSHPADV,Z005,R135,0494,11034830497\n" +
    //     "ZSHPADV,Z005,R135,0494,11034830326\n" +
    //     "ZSHPADV,Z005,R135,0494,11034830486\n" +
    //     "ZSHPADV,Z005,R213,0622,11034840622\n" +
    //     "ZSHPADV,Z005,R177,0111,11034850111\n" +
    //     "ZSHPADV,Z009,503135,D985,9506701\n" +
    //     "ZSHPADV,Z009,503135,D985,9506704\n" +
    //     "ZSHPADV,Z009,503136,R196,9504702\n" +
    //     "ZSHPADV,Z009,200048,R135,9505703\n" +
    //     "ZSHPADV,Z009,200045,R177,9506702\n" +
    //     "ZSHPADV,Z009,200045,R177,9506706\n" +
    //     "ZSHPADV,Z009,200045,R177,9506708\n" +
    //     "ZSHPADV,Z006,D985,R177,1103484R177\n" +
    //     "ZSHPADV,Z006,D800,R213,1103485R213\n" +
    //     "ZSHPADV,Z006,D800,R213,1103485R215\n" +
    //     "ZSHPADV,Z006,D800,R213,1103485R217\n" +
    //     "ZSHPADV,Z006,D800,R213,1103485R219\n" +
    //     "ZSHPADV,Z006,R135,R196,1103486R196\n" +
    //     "ZSHPADV,Z011,D985,0494,D98500512345\n" +
    //     "ZSHPADV,Z011,D985,0123,D98500515645";
	
	var replenishmentCsvData = [];
	 $http.get($serviceURLS.serviceUrlsList['replenData'])
        .success(function(response){
            //console.log(response);
			replenishmentCsvData = response;
			var replenishmentDataArray = replenishmentCsvData.split(/\n/);
    var relplenishmentData = [];
    replenishmentDataArray.forEach(function (idocDetails) {
        if(idocDetails.length > 0){
			var idocDetailsArr = idocDetails.split(",");

			var idocType = idocDetailsArr[0];
			var source = idocDetailsArr[1];
			var destination = idocDetailsArr[2];
			var idocNumber = idocDetailsArr[3];
			var sourceType = "stores";
			if (source.indexOf('R') > -1) {
				sourceType = "rdc";
			} else if (source.indexOf('D') > -1) {
				sourceType = "dc";
			} else if (source.length > 4) {
				sourceType = "ven";
			}

			var destinationType = "stores";
			if (destination.indexOf('R') > -1) {
				destinationType = "rdc";
			} else if (destination.indexOf('D') > -1) {
				destinationType = "dc";
			}
			var idoc = {
				"idocType": idocType,
				"source": source,
				"destination": destination,
				"idocNumber": idocNumber,
				"destinationType": destinationType,
				"sourceType": sourceType
			}
			if (!relplenishmentData[source + "-" + destination]) {
				relplenishmentData[source + "-" + destination] = [idoc]
			} else {
				relplenishmentData[source + "-" + destination].push(idoc);
			}
		}

    }, this);

    $scope.transactionDetailsList = [];
    //$scope.$apply();
    
    for (var source_dep in relplenishmentData) {
        if (relplenishmentData.hasOwnProperty(source_dep)) {
            //console.log(source_dep + " -> " + relplenishmentData[source_dep]);
            //console.log(relplenishmentData[source_dep]);
            var idocs = relplenishmentData[source_dep];
            if (idocs.length > 0) {
                var idocNumberArray = [];
                idocs.forEach(function (idoc) {
                    idocNumberArray.push(idoc.idocNumber);
                }, this);
                var replenishmentDisplayData = {
                    "source": idocs[0]["source"],
                    "destination": idocs[0]["destination"],
                    "sourceType": idocs[0]["sourceType"],
                    "destinationType": idocs[0]["destinationType"],
                    "idocNumberArray": idocNumberArray
                }
                $scope.transactionDetailsList.push(replenishmentDisplayData);
                console.log($scope.transactionDetailsList);
            }
        }
    }

    setTimeout(function () {

        $("#ticker").marquee({
            direction: 'up',
            duration: 10000,
            duplicated: true,
            startVisible: true,
            pauseOnHover: true
        });
        
    }, 1000);
        })
        .error(function(data, status){
            console.log(data);
        })
		
		
    
    // setTimeout(function () {

    //     $('#ticker').easyTicker({
    //         direction: 'up'
    //     });
    // }, 2000);
    
    // $scope.transactionDetailsList = relplenishmentData;
    // var gridster = $(".gridster ul").gridster({
    //     widget_margins: [0, 0],
    //     widget_base_dimensions: [30, 30],
    //     resize: {
    //         enabled: true
    //     }
    // }).data('gridster');
    // // resize widgets on hover
    // gridster.$el
    //     .on('mouseenter', '> .stores', function () {
    //         gridster.resize_widget($(this), 6, 6);
    //     })
    //     .on('mouseleave', '> .stores', function () {
    //         gridster.resize_widget($(this), 3, 3);
    //     });
    
    //$canvasDrawService.draw();
    
}]);

//INCIDENT DASHBOARD CONTROLLER IS WRITTEN OVER HERE
TCSAMSUKApplication.controller('incidentDashboardController', ['$scope', '$window', '$serviceURLS','$http', function ($scope, $window, $serviceURLS, $http) {

	/* $scope.incidentDetails = [
        { groupName: "Agile App Supp UK", totalOpenNow: 100, lastHourCount: 50, yesterdayCloseCount: 70, p1: 20, p2: 50, p3: 130, MI: "" },
        { groupName: "Retail App Supp UK", totalOpenNow: 70, lastHourCount: 40, yesterdayCloseCount: 100, p1: 10, p2: 20, p3: 40, MI: "" },
        { groupName: "Supply Chain App Supp UK", totalOpenNow: 70, lastHourCount: 100, yesterdayCloseCount: 60, p1: 5, p2: 10, p3: 55, MI: "" },
        { groupName: "BI App Supp UK", totalOpenNow: 50, lastHourCount: 80, yesterdayCloseCount: 70, p1: 2, p2: 8, p3: 40, MI: "" },
        { groupName: "App Integration Supp UK", totalOpenNow: 60, lastHourCount: 70, yesterdayCloseCount: 70, p1: 2, p2: 8, p3: 50, MI: "INC0991218 - B&Q - Unable to connect to C&C Server" },
        { groupName: "Fin App Supp UK", totalOpenNow: 30, lastHourCount: 40, yesterdayCloseCount: 70, p1: 2, p2: 8, p3: 20, MI: "" },
        { groupName: "HR App Supp UK", totalOpenNow: 55, lastHourCount: 80, yesterdayCloseCount: 70, p1: 2, p2: 18, p3: 35, MI: "" },
        { groupName: "Legacy MI App Support UK", totalOpenNow: 70, lastHourCount: 80, yesterdayCloseCount: 70, p1: 12, p2: 28, p3: 40, MI: "" },
        { groupName: "Logistics App Supp UK", totalOpenNow: 60, lastHourCount: 80, yesterdayCloseCount: 70, p1: 10, p2: 10, p3: 40, MI: "" },
        { groupName: "SAP F&R Supp UK TCS", totalOpenNow: 50, lastHourCount: 40, yesterdayCloseCount: 70, p1: 2, p2: 8, p3: 40, MI: "" },
        { groupName: "STEP Supp UK", totalOpenNow: 50, lastHourCount: 30, yesterdayCloseCount: 70, p1: 2, p2: 8, p3: 40, MI: "" },
        { groupName: "E-Commerce App Supp UK", totalOpenNow: 60, lastHourCount: 70, yesterdayCloseCount: 70, p1: 2, p2: 8, p3: 50, MI: "" }
    ]; */
    
    $http.get($serviceURLS.serviceUrlsList['serviceNowStats'])
         .success(function (response) {
             var result = response;
             $scope.incidentDetails = result['SNStats'];
			 console.log($scope.incidentDetails);
         })
         .error(function (data, status) {
             console.log(data);
         });
    
    $scope.width = $window.innerWidth;
    
    window.addEventListener('resize', function () {
        $scope.$apply(function () {
            $scope.width = $window.innerWidth;
        });
    }, true);

}]);


TCSAMSUKApplication.controller('docLinksController', ['$scope', '$window', function ($scope, $window) {

    $scope.documentLinks = [
        { name: "Overviews", url:"https://collaboration.kfplc.com/sites/ApplicationServicesandSupport/Applications/_layouts/15/start.aspx#/Lists/PostLive%20Documents/Supported.aspx"},
        { name: "Operating manual", url:"https://collaboration.kfplc.com/sites/ApplicationServicesandSupport/Team%20Area/AMS%20standard%20Operating%20Processes%20manual%20V1.2.doc"},
        { name: "Support docs", url:"https://collaboration.kfplc.com/sites/ApplicationServicesandSupport/Applications/_layouts/15/start.aspx#/All%20Application%20Documents/Forms/Tower.aspx "},
        { name: "KEDB", url:"https://collaboration.kfplc.com/sites/ApplicationServicesandSupport/_layouts/15/start.aspx#/Lists/Known%20Errors%20List/AllItems.aspx"},
        { name: "Team docs", url:"https://collaboration.kfplc.com/sites/ApplicationServicesandSupport/_layouts/15/start.aspx#/Team%20Area/Forms/By%20Team.aspx"},
        { name: "Team overview Operational guide for the teams", url:"https://collaboration.kfplc.com/sites/ApplicationServicesandSupport/Team%20Area/Team%20guidelines%20Overview.docx"},
        { name: "DOU", url:"https://collaboration.kfplc.com/sites/ApplicationServicesandSupport/EASIER_Supp/_layouts/15/start.aspx#/Shared%20Documents/Forms/AllItems.aspx?RootFolder=%2Fsites%2FApplicationServicesandSupport%2FEASIER%5FSupp%2FShared%20Documents%2FKT%20Documents%2FDocument%20of%20Understanding&FolderCTID=0x0120005B30B63FC6D44D4ABA89BDA69A52BFC1&View=%7B4CD51859%2D2D34%2D46F9%2D9EE4%2D0DDDBFEAE274%7D"},
        { name: "Support WIKI", url:"https://collaboration.kfplc.com/sites/ApplicationServicesandSupport/Applications/_layouts/15/start.aspx#/Wiki%20Pages/Support%20Documents%20-%20Home%20Page.aspx"}
        ];
    
    // $http.get($serviceURLS.serviceUrlsList['storeOfflineTills'])
    //     .success(function (response) {
    //         var result = response;
    //         $scope.storeDetailsList = result;
    //         angular.forEach($scope.storeDetailsList, function (value, key) {
    //             $tillsOfflineService.tillsOffline(value);
    //         });
    //     })
    //     .error(function (data, status) {
    //         console.log(data);
    //     });
    
    // setTimeout(function() {
        
    //     $("#incidentMarquee").marquee({
    //         direction: 'up',
    //         duration: 20000,
    //         pauseOnHover: true
    //     });
    
    $scope.width = $window.innerWidth;
    
    window.addEventListener('resize', function () {
        $scope.$apply(function () {
            $scope.width = $window.innerWidth;
        });
    }, true);

}]);

//HEADER CONTROLLER IS WRITTEN OVER HERE
TCSAMSUKApplication.controller('headerController', ['$scope', '$window', '$location', function ($scope, $window, $location) {
    $scope.isActive = function (title) {
        return title === $location.path();
    };

    $scope.width = $window.innerWidth;
    window.addEventListener('resize', function () {
        $scope.$apply(function () {
            $scope.width = $window.innerWidth;
        });
    }, true);

}]);

//FOOTER CONTROLLER IS WRITTEN OVER HERE
TCSAMSUKApplication.controller('footerController', ['$scope', '$window', function ($scope, $window) {
    $scope.width = $window.innerWidth;
    window.addEventListener('resize', function () {
        $scope.$apply(function () {
            $scope.width = $window.innerWidth;
        });
    }, true);
}]);

//IDocFailure DASHBOARD CONTROLLER IS WRITTEN OVER HERE
TCSAMSUKApplication.controller('IDocFailureController', ['$scope', '$window','$serviceURLS','$http', function ($scope, $window,$serviceURLS,$http) {

    $scope.idocfailurePR1Details = [
    //    {type:"WPUUMS" , description:"test1",lastHourOpenCount: 5,Count:6},
    //    {type:"WPUFIB" , description:"test2",lastHourOpenCount: 3,Count:3},
    //    {type:"WMMBXY" , description:"test3",lastHourOpenCount: 9,Count:7},
    //    {type:"ARTMAS" , description:"test4",lastHourOpenCount: 4,Count:5},
    //    {type:"CREMAS" , description:"test5",lastHourOpenCount: 1,Count:0},
    //    {type:"COND_A" , description:"test6",lastHourOpenCount: 6,Count:6},
    //    {type:"INFREC" , description:"test7",lastHourOpenCount: 7,Count:6},
    //    {type:"SHPCON" , description:"test8",lastHourOpenCount: 0,Count:3}    

    ];
    
     $scope.idocfailurePRZDetails = [
        //  {type:"PORDCR1" , description:"test1",lastHourOpenCount: 9,Count:6},
        //  {type:"ZSERIAL" , description:"test2",lastHourOpenCount: 8,Count:9},
        //  {type:"PORDCH" , description:"test3",lastHourOpenCount: 5,Count:5},
        //  {type:"DESADV" , description:"test4",lastHourOpenCount: 7,Count:6},
        //  {type:"MBGMCR" , description:"test5",lastHourOpenCount: 6,Count:6},
        //  {type:"WMMBXY" , description:"test6",lastHourOpenCount: 0,Count:2},
        //  {type:"WPUUMS" , description:"test7",lastHourOpenCount: 1,Count:1},
        //  {type:"WPUFIB" , description:"test8",lastHourOpenCount: 3,Count:4},
        //  {type:"WPUTAB" , description:"test9",lastHourOpenCount: 7,Count:6}      

    ];
    
    $http.get($serviceURLS.serviceUrlsList['idocfailurePR1Details'])
        .success(function (response) {
            var result = response;
            $scope.idocfailurePR1Details = result['SAPFailedIdocs'];
        })
        .error(function (data, status) {
            console.log(data);
        });
    
    $http.get($serviceURLS.serviceUrlsList['idocfailurePRZDetails'])
        .success(function (response) {
            var result = response;
            $scope.idocfailurePRZDetails = result['SAPFailedIdocs'];
        })
        .error(function (data, status) {
            console.log(data);
        });
    
    // setTimeout(function() {
        
    //     $("#incidentMarquee").marquee({
    //         direction: 'up',
    //         duration: 20000,
    //         pauseOnHover: true
    //     });
    
    $scope.width = $window.innerWidth;
    
    window.addEventListener('resize', function () {
        $scope.$apply(function () {
            $scope.width = $window.innerWidth;
        });
    }, true);

}]);

TCSAMSUKApplication.controller('nextDayOrderController', ['$scope', '$window','$serviceURLS','$http', function ($scope, $window,$serviceURLS,$http) {
	$scope.nextDayOrderStats;
    $http.get($serviceURLS.serviceUrlsList['nextDayOrderStats'])
        .success(function (response) {
            var result = response;
            $scope.nextDayOrderStats = result['nextDayOrder'];
			console.log($scope.nextDayOrderStats);
        })
		//console.log($scope.nextDayOrderStats);
        .error(function (data, status) {
            console.log(data);
        });
    
   
    
    // setTimeout(function() {
        
    //     $("#incidentMarquee").marquee({
    //         direction: 'up',
    //         duration: 20000,
    //         pauseOnHover: true
    //     });
    
    $scope.width = $window.innerWidth;
    
    window.addEventListener('resize', function () {
        $scope.$apply(function () {
            $scope.width = $window.innerWidth;
        });
    }, true);

}]);

//ATG Order status  CONTROLLER IS WRITTEN OVER HERE
TCSAMSUKApplication.controller('atgOrderController', ['$scope', '$window','$serviceURLS','$http', function ($scope, $window, $serviceURLS, $http) {

//  $scope.transactionDetailsListATG = [
//         { orderStat: "Placeholder_oderstatus", orderDesc: "Placeholder_oderdesc", Ordercount: 50, TotalCount: 70 },
//          { orderStat: "Placeholder_oderstatus2", orderDesc: "Placeholder_oderdesc2", Ordercount: 51, TotalCount: 71 },
//         { orderStat: "Placeholder_oderstatus3", orderDesc: "Placeholder_oderdesc3", Ordercount: 53, TotalCount: 73 }
//     ];

    $scope.transactionDetailsListATG = [];
     $scope.transactionDetailsListATGFR = [];
    $scope.CurrentDate = new Date();
   // $scope.totalCount;

    $http.get($serviceURLS.serviceUrlsList['atgOrderStatusUK'])
        .success(function (response) {
            var result = response;
            $scope.transactionDetailsListATG = result['atgOrderStatus'];
            /****  Playing with date */

             $scope.showToday = false;
             $scope.showTomorrow = false;
         $scope.CurrentDate = new Date();   
         $scope.tomorrow = new Date();
         $scope.yesterday = new Date();


        $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
        $scope.yesterday.setDate($scope.yesterday.getDate() - 1);
     

     /** One hour less */
        
           var today1 = new Date();
//alert("before "+today1);
today1.setDate(today1.getDate() -1);
var yestOneHour =today1;
//alert("after"+yestOneHour);
var todayHour = new Date();
var yestHour;



todayHour.setHours(todayHour.getHours()-1);

//alert("Hour " + todayHour);
yestOneHour.setHours(yestOneHour.getHours()-1);
//alert("YestHour " + yestOneHour);

 $scope.todayHourPage = todayHour;
 $scope.yestOneHourPage = yestOneHour;

          //  $scope.totalCount =  $scope.transactionDetailsListATG[0]['totalCount'];
            console.log($scope.transactionDetailsListATG);
        })
        .error(function (data, status) {
            console.log(data);
        });


       

    $http.get($serviceURLS.serviceUrlsList['atgOrderStatusCE'])
        .success(function (response) {
            var result = response;
            $scope.transactionDetailsListATGFR = result['atgOrderStatus'];
          //  $scope.totalCount =  $scope.transactionDetailsListATG[0]['totalCount'];
            console.log($scope.transactionDetailsListATGFR);
        })
        .error(function (data, status) {
            console.log(data);
        });


        



    setTimeout(function () {

        $("#ticker").marquee({
            direction: 'up',
            duration: 20000,
            duplicated: true,
            startVisible: true,
            pauseOnHover: true
        });
        
    }, 1000);
    // setTimeout(function () {

    //     $('#ticker').easyTicker({
    //         direction: 'up'
    //     });
    // }, 2000);
    
    // $scope.transactionDetailsList = relplenishmentData;
    // var gridster = $(".gridster ul").gridster({
    //     widget_margins: [0, 0],
    //     widget_base_dimensions: [30, 30],
    //     resize: {
    //         enabled: true
    //     }
    // }).data('gridster');
    // // resize widgets on hover
    // gridster.$el
    //     .on('mouseenter', '> .stores', function () {
    //         gridster.resize_widget($(this), 6, 6);
    //     })
    //     .on('mouseleave', '> .stores', function () {
    //         gridster.resize_widget($(this), 3, 3);
    //     });
    
    //$canvasDrawService.draw();
    
}]);




