var express = require('express');
var global = require('../server-modules/global');
// var csvToJson = require('../server-modules/csvToJson');

var stores = require('../JSONFiles/StoreAll.json');

var router = express.Router();
var fs = require('fs');
// var csv = require("fast-csv");
// var postCodeDataCsv = "";
// var postCodeData = "";
var intervals = [];
var files = ["stores_one.json", "stores_two.json", "stores_three.json"];
var fileNumber = 0;
// csv
//     .fromPath("./postcode-outcodes.csv")
//     .on("data", function (data) {
//         postCodeDataCsv += data + "\n";

//     })
//     .on("end", function () {
//         console.log("done");
//         postCodeData = JSON.parse(csvToJson.postCodeJson(postCodeDataCsv));
//     });
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

/* GET home page. */
router.get('/', function (req, res, next) {
    
    res.render('index', { title: '' });
    console.log("base url called");
    // intervals.forEach(function (interval) {
    //     clearInterval(interval);

    // }, this);
    // intervals.length = 0;

    // refreshMarkers();
    // setTimeout(function () {
    //     refreshMarkers();
    // }, 1000);
    // var interval = setInterval(function () {
    //     refreshMarkers();
    // }, global.refreshTime);

    // intervals.push(interval);

});

// router.get('/StoresWithOfflineTills', function (req, res, next) {
//     //console.log("yess");
//     res.render('index', { title: '' });

//     // intervals.forEach(function (interval) {
//     //     clearInterval(interval);

//     // }, this);
//     // intervals.length = 0;

//     // refreshTillMarkers();

//     // var interval = setInterval(function () {
//     //     refreshTillMarkers();
//     // }, global.refreshTime);

//     // intervals.push(interval);

// });

router.get('/store', function (req, res, next) {
    console.log("/store called");
    var storeId = req.query.id;
    console.log(storeId);
    storeId = storeId.substring(1);
    console.log(storeId);
    res.send(stores[storeId]);
});

router.get('/stores', function (req, res, next) {
    console.log("/stores called");
    var storeIds = req.query.ids;
    console.log(storeIds);
    var storeArr = [];
    var storidsArr=storeIds.split(",");
    storidsArr.forEach(function (storeId) {
        storeId = storeId.substring(1);
        console.log(storeId);
        storeArr.push(stores[storeId]);
    }, this);
    console.log(storeArr)
    res.send(storeArr);
});

router.get('/storeOfflineTills', function (req, res, next) {
    
    fs.readFile("tillData.txt", { encoding: 'utf-8' }, function (err, data) {
        var storeList = {};
        var storeDetailsList = [];

        if (!err) {
            data = data.replaceAll("\n", "");
            var tills = data.split(/[\r,\n]/);
			
            tills.forEach(function (till) {
                var storeId = (till.substring(0, till.indexOf('pos'))).replace(/\D/g, '');
				
                var tillId = till.substring(till.indexOf('pos'));
				if(till.indexOf('pos') >= 0){
					if (storeList[storeId]) {
						storeList[storeId].push(tillId);
					} else {
						var store = [tillId];
						storeList[storeId] = store;
					}
				}
                

            }, this);
			//console.log(storeList);
			var count= 0;
            for (var storeId in storeList) {
				count = count+1;
                if (storeList.hasOwnProperty(storeId)) {
                    var store = stores[storeId];
					
                    var postCodeFull = store.PostCode;
                    var postCode = postCodeFull.split(" ")[0];
					console.log(postCode.toUpperCase());
                    if ("EIRE".localeCompare(postCode.toUpperCase()) == 0) {
                        //return;
                    }else{
						var storeNumber = store['Store Number'];
						var storeName = store['Store Name'];
						var address = store['Address Line 1'];
						var town = store['Town'];
						var phone = store['Phone Number'];
						var manager = store['TradePoint Manager'];
						//Bhabani - 8 Feb 2016. Commenting below lines as the till range is not changed to till numbers. The mater store.json file is modified for this
					   /* var tillRanges = store['Till Range'];

						var numOfTills = 0;
						var tillRangesArr = tillRanges.split(",");
						tillRangesArr.forEach(function (tillRange) {
							var min = tillRange.split("-")[0];
							var max = tillRange.split("-")[1];
							if (!max) {
								numOfTills++;
							} else if (!isNaN(min) && !isNaN(max)) {
								numOfTills += parseInt(max) - parseInt(min) + 1;
							};
						}, this); */
						var numberOfOfflineTills = storeList[storeId].length; 
						var numOfTills = store['Till Numbers'];

						var lat = store['latitude'];
						var long = store['longitude'];
						
						var storeDetails = {
							'latitude': lat,
							'longitude': long,
							'storeNumber': storeNumber,
							'storeName': storeName,
							'address': (address + " ," + town + " ," + postCodeFull),
							'manager': manager,
							'phone': phone,
							'totalNumOfTills': numOfTills,
							'numOfTillsOffline': numberOfOfflineTills,
							//'tillsOffline': storeList[storeId]
                            "tillsOffline": [
            {
            "tillId":"131724",
            "lastPostTimestamp":14545785,
            "statusColor":"AMBER",
            "errorDesc":"Till Idle",
            "lastTransactionId":"RT1002020227773737"
            },
            {
            "tillId":"131748",
            "lastPostTimestamp":14545785,
            "statusColor":"RED",
            "errorDesc":"Till Server down"
            },
             {
            "tillId":"131724",
            "lastPostTimestamp":14545785,
            "statusColor":"AMBER",
            "errorDesc":"Till Idle",
            "lastTransactionId":"RT1002020227773737"
            },
            {
            "tillId":"131748",
            "lastPostTimestamp":14545785,
            "statusColor":"RED",
            "errorDesc":"Till Server down"
            }
        ]

						}
						storeDetailsList.push(storeDetails);
					}
                    
                }
				console.log(storeId);
				console.log( count);
            }
			console.log("All done");
            res.send(storeDetailsList);

        } else {
            console.log(err);
        }
    });

});


/**********Modified By Prasun***********/
router.get('/getStoreNotPolledNew', function (req, res, next) {
   fs.readFile("JSONFiles/storeNotPulled.json", { encoding: 'utf-8' }, function (err, data) {
        var storeList = {};
        var storeDetailsList = [];

        if (!err) {
           
            res.send(data);

        } else {
            console.log(err);
        }
    });

});

/***********End modified By Prasun********/



router.get('/changeDetails', function(req, res, next){
    fs.readFile("changes.csv", { encoding: 'utf-8' }, function (err, data) {
       if(!err){
           console.log(data);
           res.send(data);
       } 
    });
});

router.get('/replenData', function(req, res, next){
    fs.readFile("C://dashboardfiles//REPLEN//replen.txt", { encoding: 'utf-8' }, function (err, data) {
       if(!err){
           console.log(data);
           res.send(data);
       } 
    });
});

// function refreshTillMarkers() {
//     global.socket.emit('refresh', '');
//     global.socket.emit('refreshTill', '');

//     fs.readFile("tillData.txt", { encoding: 'utf-8' }, function (err, data) {
//         var storeList = {};
//         if (!err) {
//             data = data.replaceAll("\n", "");
//             var tills = data.split(/[\r,\n]/);
//             tills.forEach(function (till) {
//                 var storeId = (till.substring(0, till.indexOf('pos'))).replace(/\D/g, '');
//                 var tillId = till.substring(till.indexOf('pos'));
//                 //console.log(storeId + ' : ' + tillId);

//                 if (storeList[storeId]) {
//                     storeList[storeId].push(tillId);
//                 } else {
//                     var store = [tillId];
//                     storeList[storeId] = store;
//                 }

//             }, this);
//             console.log(storeList);
//             for (var storeId in storeList) {
//                 if (storeList.hasOwnProperty(storeId)) {
//                     //console.log(storeId + " -> " + storeList[storeId]);
//                     var store = stores[storeId];

//                     var postCodeFull = store.PostCode;
//                     var postCode = postCodeFull.split(" ")[0];
//                     if ("EIRE".localeCompare(postCode.toUpperCase()) == 0) {
//                         return;
//                     }
//                     var storeNumber = store['Store Number'];
//                     var storeName = store['Store Name'];
//                     var address = store['Address Line 1'];
//                     var town = store['Town'];
//                     var phone = store['Phone Number'];
//                     var manager = store['TradePoint Manager'];
//                     var tillRanges = store['Till Range'];

//                     var numOfTills = 0;
//                     var tillRangesArr = tillRanges.split(",");
//                     // console.log(tillRangesArr);
//                     tillRangesArr.forEach(function (tillRange) {
//                         var min = tillRange.split("-")[0];
//                         var max = tillRange.split("-")[1];
//                         if (!max) {
//                             numOfTills++;
//                         } else if (!isNaN(min) && !isNaN(max)) {
//                             numOfTills += parseInt(max) - parseInt(min) + 1;
//                         };
//                     }, this);
//                     // console.log();
//                     // console.log();
//                     var numberOfOfflineTills = storeList[storeId].length;
//                     // console.log();
//                     console.log();

//                     var lat = store['latitude'];
//                     var long = store['longitude'];

//                     var markerData = {
//                         'latitude': lat,
//                         'longitude': long,
//                         'storeNumber': storeNumber,
//                         'storeName': storeName,
//                         'address': (address + " ," + town + " ," + postCodeFull),
//                         'manager': manager,
//                         'phone': phone,
//                         'totalNumOfTills': numOfTills,
//                         'numOfTillsOffline': numberOfOfflineTills,
//                         'tillsOffline': storeList[storeId]
//                     }
//                     global.socket.emit('dataTill', markerData);
//                 }
//             }
//         } else {
//             console.log(err);
//         }
//     });

    
// var file = require("../tilltext.txt");
    
// var tills = file.split("pos");
// console.log(tills);
    
// fileNumber++;
// fileNumber %= 3;

// var file = require("../JSONFiles/" + files[fileNumber]);

// file.forEach(function (storeId) {
// var store = stores[storeId];

// var postCodeFull = store.PostCode;
// var postCode = postCodeFull.split(" ")[0];
// if ("EIRE".localeCompare(postCode.toUpperCase()) == 0) {
//     return;
// }
// var storeNumber = store['Store Number'];
// var storeName = store['Store Name'];
// var address = store['Address Line 1'];
// var town = store['Town'];
// var phone = store['Phone Number'];
// var manager = store['TradePoint Manager'];
// var tillRanges = store['Till Range'];

// var numOfTills = 0;
// var tillRangesArr = tillRanges.split(",");

// tillRangesArr.forEach(function (tillRange) {

//     if (isNaN(tillRange.split("-")[0]) && isNaN(tillRange.split("-")[1])) {
//         numOfTills += parseInt(tillRange.split("-")[1]) - parseInt(tillRange.split("-")[0]) + 1;
//     };
// }, this);
// // console.log(tillRanges);
// // console.log(numOfTills);
// // console.log();
            
// var lat = store['latitude'];
// var long = store['longitude'];

// var markerData = {
//     'latitude': lat,
//     'longitude': long,
//     'storeNumber': storeNumber,
//     'storeName': storeName,
//     'address': (address + " ," + town),
//     'manager': manager,
//     'phone': phone,
//     'numOfTills': Math.floor((Math.random() * 30) + 1)
// }
// global.socket.emit('dataTill', markerData);

// }, this);

// };

// function refreshMarkers() {
//     global.socket.emit('refresh', '');

//     fileNumber++;
//     fileNumber %= 3;

//     var file = require("../JSONFiles/" + files[fileNumber]);

//     file.forEach(function (storeId) {
//         var store = stores[storeId];

//         var postCodeFull = store.PostCode;
//         var postCode = postCodeFull.split(" ")[0];
//         if ("EIRE".localeCompare(postCode.toUpperCase()) == 0) {
//             return;
//         }
//         var storeNumber = store['Store Number'];
//         var storeName = store['Store Name'];
//         var address = store['Address Line 1'];
//         var town = store['Town'];
//         var phone = store['Phone Number'];
//         var manager = store['TradePoint Manager'];
//         var tillRanges = store['Till Range'];

//         var numOfTills = 0;
//         var tillRangesArr = tillRanges.split(",");

//         tillRangesArr.forEach(function (tillRange) {

//             if (isNaN(tillRange.split("-")[0]) && isNaN(tillRange.split("-")[1])) {
//                 numOfTills += parseInt(tillRange.split("-")[1]) - parseInt(tillRange.split("-")[0]) + 1;
//             };
//         }, this);
//         // console.log(tillRanges);
//         // console.log(numOfTills);
//         // console.log();
            
//         var lat = store['latitude'];
//         var long = store['longitude'];

//         var markerData = {
//             'latitude': lat,
//             'longitude': long,
//             'storeNumber': storeNumber,
//             'storeName': storeName,
//             'address': (address + " ," + town),
//             'manager': manager,
//             'phone': phone,
//             'numOfTills': numOfTills
//         }
//         global.socket.emit('data', markerData);

//     }, this);

// var noOfStores = Math.floor((Math.random() * 30) + 1);
// for (var index = 0; index < noOfStores; index++) {
//     var store = stores[Math.floor((Math.random() * 350) + 1)];
//     //console.log(store);
//     var postCodeFull = store.PostCode;
//     var postCode = postCodeFull.split(" ")[0];
//     var upperCasePostCode = postCode.toUpperCase();


//     if ("EIRE".localeCompare(upperCasePostCode) == 0) {
//         continue;
//     }
//     var storeNumber = store['Store Number'];
//     var storeName = store['Store Name'];
//     var address = store['Address Line 1'];
//     var town = store['Town'];
//     var phone = store['Phone Number'];
//     var manager = store['TradePoint Manager'];
//     var tillRange = store['Till Range'];

//     var numOfTills = 0;
//     if (isNaN(tillRange.split("-")[0]) && isNaN(tillRange.split("-")[1])) {
//         numOfTills = parseInt(tillRange.split("-")[1]) - parseInt(tillRange.split("-")[0]) + 1;
//     };
            
//     //console.log(Object.keys(postCodeData).length);
//     // console.log(postCodeData[postCode]);
            
//     var storeArea = postCodeData[postCode];
//     var lat = storeArea.latitude;
//     var long = storeArea.longitude;

//     var markerData = {
//         'latitude': lat,
//         'longitude': long,
//         'storeNumber': storeNumber,
//         'storeName': storeName,
//         'address': (address + " ," + town),
//         'manager': manager,
//         'phone': phone,
//         'numOfTills': numOfTills
//     }
//     global.socket.emit('data', markerData);
// }

//}


module.exports = router;
