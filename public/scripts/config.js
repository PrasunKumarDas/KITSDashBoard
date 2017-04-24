var TCSAMSUKApplication = angular.module('TCSAMSUKApplication', ['ngRoute', 'ui.bootstrap']);

var timeSlot = 60000;

//SINGLE PAGE APPLICATION CONFIGURATION IS DONE OVER HERE
TCSAMSUKApplication.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/HomeTiles', {
                templateUrl: '/pages/HomeTiles.html',
                controller: 'homeTilesController'
            })
            .when('/StoresNotPolling', {
                templateUrl: '/pages/StoresNotPolling.html',
                controller: 'storesNotPollingController'
            })
            .when('/StoresWithOfflineTills', {
                templateUrl: '/pages/StoresWithOfflineTills.html',
                controller: 'storesWithOfflineTillsController'
            })
            // .when('/StoresRevenueSinceMorning', {
            //     templateUrl: '/pages/StoresRevenueSinceMorning.html',
            //     controller: 'storesRevenueSinceMorningController'
            // })
            // .when('/StoresRevenueLastOneHour', {
            //     templateUrl: '/pages/StoresRevenueLastOneHour.html',
            //     controller: 'storesRevenueLastOneHourController'
            // })
            // .when('/StoresRevenueLastSixMonth', {
            //     templateUrl: '/pages/StoresRevenueLastSixMonth.html',
            //     controller: 'storesRevenueLastSixMonthController'
            // })
            // .when('/ItemsRevenueLastOneHour', {
            //     templateUrl: '/pages/ItemsRevenueLastOneHour.html',
            //     controller: 'itemsRevenueLastOneHourController'
            // })
            // .when('/ItemsSellingLastOneHour', {
            //     templateUrl: '/pages/ItemsSellingLastOneHour.html',
            //     controller: 'itemsSellingLastOneHourController'
            // })
            // .when('/ReplenishmentJourney', {
            //     templateUrl: '/pages/ReplenishmentJourney.html',
            //     controller: 'replenishmentJourneyController'
            // })
            // .when('/atgOrder', {
            //     templateUrl: '/pages/atgOrder.html',
            //     controller: 'atgOrderController'
            // })
            // .when('/IncidentDashboard', {
            //     templateUrl: '/pages/IncidentDashboard.html',
            //     controller: 'incidentDashboardController'
            // })
            // .when('/IDocFailure', {
            //     templateUrl: '/pages/IDocFailure.html',
            //     controller: 'IDocFailureController'
            // })
            // .when('/DocLinks', {
            //     templateUrl: '/pages/DocLinks.html',
            //     controller: 'docLinksController'
            // })
            // .when('/NDO', {
            //     templateUrl: '/pages/NextDayOrder.html',
            //     controller: 'nextDayOrderController'
            // })
            // .when('/Gomez', {
            //     templateUrl: '/pages/Gomez.html',
            //     controller: 'docLinksController'
            // })
            .otherwise({
                redirectTo: '/HomeTiles'
            });
    }])
    .run(function($rootScope, $location, $timeout) {
        $rootScope.$on("$routeChangeStart", function(event, next, current) {

            window.addEventListener('click', function() {
                // if ($location.path() === "/HomeTiles") {
                //     $timeout.cancel(StoresNotPolling);
                //     $timeout.cancel(StoresWithOfflineTills);
                //     $timeout.cancel(StoresRevenueSinceMorning);
                //     $timeout.cancel(StoresRevenueLastOneHour);
                //     $timeout.cancel(StoresRevenueLastSixMonth);
                //     $timeout.cancel(ItemsRevenueLastOneHour);
                //     $timeout.cancel(ItemsSellingLastOneHour);
                //     $timeout.cancel(ReplenishmentJourney);
                //     $timeout.cancel(IDocFailure);
                //     $timeout.cancel(atgOrder);
                //     $timeout.cancel(IncidentDashboard);
                //     $timeout.cancel(Gomez);
                //     $timeout.cancel(DocLinks);
                //     $timeout.cancel(NDO);
                // };
                // if ($location.path() === "/StoresNotPolling") {
                //     $timeout.cancel(HomeTiles);
                //     $timeout.cancel(StoresWithOfflineTills);
                //     $timeout.cancel(StoresRevenueSinceMorning);
                //     $timeout.cancel(StoresRevenueLastOneHour);
                //     $timeout.cancel(StoresRevenueLastSixMonth);
                //     $timeout.cancel(ItemsRevenueLastOneHour);
                //     $timeout.cancel(ItemsSellingLastOneHour);
                //     $timeout.cancel(ReplenishmentJourney);
                //     $timeout.cancel(IDocFailure);
                //     $timeout.cancel(atgOrder);
                //     $timeout.cancel(IncidentDashboard);
                //     $timeout.cancel(Gomez);
                //     $timeout.cancel(DocLinks);
                //     $timeout.cancel(NDO);
                // };
                // if ($location.path() === "/StoresWithOfflineTills") {
                //     $timeout.cancel(HomeTiles);
                //     $timeout.cancel(StoresNotPolling);
                //     $timeout.cancel(StoresRevenueSinceMorning);
                //     $timeout.cancel(StoresRevenueLastOneHour);
                //     $timeout.cancel(StoresRevenueLastSixMonth);
                //     $timeout.cancel(ItemsRevenueLastOneHour);
                //     $timeout.cancel(ItemsSellingLastOneHour);
                //     $timeout.cancel(ReplenishmentJourney);
                //     $timeout.cancel(IDocFailure);
                //     $timeout.cancel(atgOrder);
                //     $timeout.cancel(IncidentDashboard);
                //     $timeout.cancel(Gomez);
                //     $timeout.cancel(DocLinks);
                //     $timeout.cancel(NDO);
                // };
                // if ($location.path() === "/StoresRevenueSinceMorning") {
                //     $timeout.cancel(HomeTiles);
                //     $timeout.cancel(StoresNotPolling);
                //     $timeout.cancel(StoresWithOfflineTills);
                //     $timeout.cancel(StoresRevenueLastOneHour);
                //     $timeout.cancel(StoresRevenueLastSixMonth);
                //     $timeout.cancel(ItemsRevenueLastOneHour);
                //     $timeout.cancel(ItemsSellingLastOneHour);
                //     $timeout.cancel(ReplenishmentJourney);
                //     $timeout.cancel(IDocFailure);
                //     $timeout.cancel(atgOrder);
                //     $timeout.cancel(IncidentDashboard);
                //     $timeout.cancel(Gomez);
                //     $timeout.cancel(DocLinks);
                //     $timeout.cancel(NDO);
                // };
                // if ($location.path() === "/StoresRevenueLastOneHour") {
                //     $timeout.cancel(HomeTiles);
                //     $timeout.cancel(StoresNotPolling);
                //     $timeout.cancel(StoresWithOfflineTills);
                //     $timeout.cancel(StoresRevenueSinceMorning);
                //     $timeout.cancel(StoresRevenueLastSixMonth);
                //     $timeout.cancel(ItemsRevenueLastOneHour);
                //     $timeout.cancel(ItemsSellingLastOneHour);
                //     $timeout.cancel(ReplenishmentJourney);
                //     $timeout.cancel(IDocFailure);
                //     $timeout.cancel(atgOrder);
                //     $timeout.cancel(IncidentDashboard);
                //     $timeout.cancel(Gomez);
                //     $timeout.cancel(DocLinks);
                //     $timeout.cancel(NDO);
                // };
                // if ($location.path() === "/StoresRevenueLastSixMonth") {
                //     $timeout.cancel(HomeTiles);
                //     $timeout.cancel(StoresNotPolling);
                //     $timeout.cancel(StoresWithOfflineTills);
                //     $timeout.cancel(StoresRevenueSinceMorning);
                //     $timeout.cancel(StoresRevenueLastOneHour);
                //     $timeout.cancel(ItemsRevenueLastOneHour);
                //     $timeout.cancel(ItemsSellingLastOneHour);
                //     $timeout.cancel(ReplenishmentJourney);
                //     $timeout.cancel(IDocFailure);
                //     $timeout.cancel(atgOrder);
                //     $timeout.cancel(IncidentDashboard);
                //     $timeout.cancel(Gomez);
                //     $timeout.cancel(DocLinks);
                //     $timeout.cancel(NDO);
                // };
                // if ($location.path() === "/ItemsRevenueLastOneHour") {
                //     $timeout.cancel(HomeTiles);
                //     $timeout.cancel(StoresNotPolling);
                //     $timeout.cancel(StoresWithOfflineTills);
                //     $timeout.cancel(StoresRevenueSinceMorning);
                //     $timeout.cancel(StoresRevenueLastOneHour);
                //     $timeout.cancel(StoresRevenueLastSixMonth);
                //     $timeout.cancel(ItemsSellingLastOneHour);
                //     $timeout.cancel(ReplenishmentJourney);
                //     $timeout.cancel(IDocFailure);
                //     $timeout.cancel(atgOrder);
                //     $timeout.cancel(IncidentDashboard);
                //     $timeout.cancel(Gomez);
                //     $timeout.cancel(DocLinks);
                //     $timeout.cancel(NDO);
                // };
                // if ($location.path() === "/ItemsSellingLastOneHour") {
                //     $timeout.cancel(HomeTiles);
                //     $timeout.cancel(StoresNotPolling);
                //     $timeout.cancel(StoresWithOfflineTills);
                //     $timeout.cancel(StoresRevenueSinceMorning);
                //     $timeout.cancel(StoresRevenueLastOneHour);
                //     $timeout.cancel(StoresRevenueLastSixMonth);
                //     $timeout.cancel(ItemsRevenueLastOneHour);
                //     $timeout.cancel(ReplenishmentJourney);
                //     $timeout.cancel(IDocFailure);
                //     $timeout.cancel(atgOrder);
                //     $timeout.cancel(IncidentDashboard);
                //     $timeout.cancel(Gomez);
                //     $timeout.cancel(DocLinks);
                //     $timeout.cancel(NDO);
                // };
                // if ($location.path() === "/ReplenishmentJourney") {
                //     $timeout.cancel(HomeTiles);
                //     $timeout.cancel(StoresNotPolling);
                //     $timeout.cancel(StoresWithOfflineTills);
                //     $timeout.cancel(StoresRevenueSinceMorning);
                //     $timeout.cancel(StoresRevenueLastOneHour);
                //     $timeout.cancel(StoresRevenueLastSixMonth);
                //     $timeout.cancel(ItemsRevenueLastOneHour);
                //     $timeout.cancel(ItemsSellingLastOneHour);
                //     $timeout.cancel(IDocFailure);
                //     $timeout.cancel(atgOrder);
                //     $timeout.cancel(IncidentDashboard);
                //     $timeout.cancel(Gomez);
                //     $timeout.cancel(DocLinks);
                //     $timeout.cancel(NDO);
                // };

                // if ($location.path() === "/atgOrder") {
                //     $timeout.cancel(HomeTiles);
                //     $timeout.cancel(StoresNotPolling);
                //     $timeout.cancel(StoresWithOfflineTills);
                //     $timeout.cancel(StoresRevenueSinceMorning);
                //     $timeout.cancel(StoresRevenueLastOneHour);
                //     $timeout.cancel(StoresRevenueLastSixMonth);
                //     $timeout.cancel(ItemsRevenueLastOneHour);
                //     $timeout.cancel(ItemsSellingLastOneHour);
                //     $timeout.cancel(IDocFailure);
                //     $timeout.cancel(ReplenishmentJourney);
                //     $timeout.cancel(IncidentDashboard);
                //     $timeout.cancel(Gomez);
                //     $timeout.cancel(DocLinks);
                //     $timeout.cancel(NDO);
                // };
                // if ($location.path() === "/IncidentDashboard") {
                //     $timeout.cancel(HomeTiles);
                //     $timeout.cancel(StoresNotPolling);
                //     $timeout.cancel(StoresWithOfflineTills);
                //     $timeout.cancel(StoresRevenueSinceMorning);
                //     $timeout.cancel(StoresRevenueLastOneHour);
                //     $timeout.cancel(StoresRevenueLastSixMonth);
                //     $timeout.cancel(ItemsRevenueLastOneHour);
                //     $timeout.cancel(ItemsSellingLastOneHour);
                //     $timeout.cancel(ReplenishmentJourney);
                //     $timeout.cancel(IDocFailure);
                //     $timeout.cancel(atgOrder);
                //     $timeout.cancel(Gomez);
                //     $timeout.cancel(DocLinks);
                //     $timeout.cancel(NDO);
                // };
                // if ($location.path() === "/IDocFailure") {
                //     $timeout.cancel(HomeTiles);
                //     $timeout.cancel(StoresNotPolling);
                //     $timeout.cancel(StoresWithOfflineTills);
                //     $timeout.cancel(StoresRevenueSinceMorning);
                //     $timeout.cancel(StoresRevenueLastOneHour);
                //     $timeout.cancel(StoresRevenueLastSixMonth);
                //     $timeout.cancel(ItemsRevenueLastOneHour);
                //     $timeout.cancel(ItemsSellingLastOneHour);
                //     $timeout.cancel(ReplenishmentJourney);
                //     $timeout.cancel(atgOrder);
                //     $timeout.cancel(IncidentDashboard);
                //     $timeout.cancel(Gomez);
                //     $timeout.cancel(DocLinks);
                //     $timeout.cancel(NDO);
                // };
                // if ($location.path() === "/Gomez") {
                //     $timeout.cancel(HomeTiles);
                //     $timeout.cancel(StoresNotPolling);
                //     $timeout.cancel(StoresWithOfflineTills);
                //     $timeout.cancel(StoresRevenueSinceMorning);
                //     $timeout.cancel(StoresRevenueLastOneHour);
                //     $timeout.cancel(StoresRevenueLastSixMonth);
                //     $timeout.cancel(ItemsRevenueLastOneHour);
                //     $timeout.cancel(ItemsSellingLastOneHour);
                //     $timeout.cancel(ReplenishmentJourney);
                //     $timeout.cancel(IncidentDashboard);
                //     $timeout.cancel(IDocFailure);
                //     $timeout.cancel(atgOrder);
                //     $timeout.cancel(NDO);
                // };
                // if ($location.path() === "/NDO") {
                //     $timeout.cancel(HomeTiles);
                //     $timeout.cancel(StoresNotPolling);
                //     $timeout.cancel(StoresWithOfflineTills);
                //     $timeout.cancel(StoresRevenueSinceMorning);
                //     $timeout.cancel(StoresRevenueLastOneHour);
                //     $timeout.cancel(StoresRevenueLastSixMonth);
                //     $timeout.cancel(ItemsRevenueLastOneHour);
                //     $timeout.cancel(ItemsSellingLastOneHour);
                //     $timeout.cancel(ReplenishmentJourney);
                //     $timeout.cancel(IncidentDashboard);
                //     $timeout.cancel(IDocFailure);
                //     $timeout.cancel(atgOrder);
                // };
                // if ($location.path() === "/DocLinks") {
                //     $timeout.cancel(HomeTiles);
                //     $timeout.cancel(StoresNotPolling);
                //     $timeout.cancel(StoresWithOfflineTills);
                //     $timeout.cancel(StoresRevenueSinceMorning);
                //     $timeout.cancel(StoresRevenueLastOneHour);
                //     $timeout.cancel(StoresRevenueLastSixMonth);
                //     $timeout.cancel(ItemsRevenueLastOneHour);
                //     $timeout.cancel(ItemsSellingLastOneHour);
                //     $timeout.cancel(ReplenishmentJourney);
                //     $timeout.cancel(IncidentDashboard);
                //     $timeout.cancel(IDocFailure);
                //     $timeout.cancel(Gomez);
                //     $timeout.cancel(atgOrder);
                //     $timeout.cancel(NDO);
                // };
            });
            if ($location.path() === "/HomeTiles") {
                var HomeTiles = $timeout(function() {
                    $location.path('/StoresNotPolling');
                }, timeSlot);
            };
            if ($location.path() === "/StoresNotPolling") {
                var StoresNotPolling = $timeout(function() {
                    $location.path('/StoresWithOfflineTills');
                }, timeSlot);
            };
            // if ($location.path() === "/StoresWithOfflineTills") {
            //     var StoresWithOfflineTills = $timeout(function() {
            //         $location.path('/StoresRevenueSinceMorning');
            //     }, timeSlot);
            // };
            // if ($location.path() === "/StoresRevenueSinceMorning") {
            //     var StoresRevenueSinceMorning = $timeout(function() {
            //         $location.path('/StoresRevenueLastOneHour');
            //     }, timeSlot);
            // };
            // if ($location.path() === "/StoresRevenueLastOneHour") {
            //     var StoresRevenueLastOneHour = $timeout(function() {
            //         $location.path('/StoresRevenueLastSixMonth');
            //     }, timeSlot);
            // };
            // if ($location.path() === "/StoresRevenueLastSixMonth") {
            //     var StoresRevenueLastSixMonth = $timeout(function() {
            //         $location.path('/ItemsRevenueLastOneHour');
            //     }, timeSlot);
            // };
            // if ($location.path() === "/ItemsRevenueLastOneHour") {
            //     var ItemsRevenueLastOneHour = $timeout(function() {
            //         $location.path('/ItemsSellingLastOneHour');
            //     }, timeSlot);
            // };
            // if ($location.path() === "/ItemsSellingLastOneHour") {
            //     var ItemsSellingLastOneHour = $timeout(function() {
            //         $location.path('/atgOrder');
            //     }, timeSlot);
            // };
            // if ($location.path() === "/ReplenishmentJourney") {
            //     var ReplenishmentJourney = $timeout(function() {
            //         $location.path('/atgOrder');
            //     }, timeSlot);
            // };
            // if ($location.path() === "/IDocFailure") {
            //     var IDocFailure = $timeout(function() {
            //         $location.path('/NDO');
            //     }, timeSlot);
            // };
            // if ($location.path() === "/atgOrder") {
            //     var atgOrder = $timeout(function() {
            //         $location.path('/IDocFailure');
            //     }, timeSlot);
            // };
            // if ($location.path() === "/NDO") {
            //     var NDO = $timeout(function() {
            //         $location.path('/HomeTiles');
            //     }, timeSlot);
            // };
            // if ($location.path() === "/IncidentDashboard") {
            //     var IncidentDashboard = $timeout(function() {
            //         $location.path('/Gomez');
            //     }, timeSlot);
            // };
            // if ($location.path() === "/Gomez") {
            //     var Gomez = $timeout(function() {
            //         $location.path('/HomeTiles');
            //     }, timeSlot);
            // };
            // if ($location.path() === "/DocLinks") {
            //     var DocLinks = $timeout(function() {
            //         $location.path('/HomeTiles');
            //     }, timeSlot);
            // };
        });
    });