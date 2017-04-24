//SERVICE URLS CONTAIN OBJECT
TCSAMSUKApplication.service('$serviceURLS', function () {
    this.serviceUrlsList = {
        storesRevenueForLastHour: 'http://10.1.2.197:8080/DashboardService/REST/Dashboard/getTopStoreHourSale',
		storesRevenueSinceMorning: 'http://10.1.2.197:8080/DashboardService/REST/Dashboard/getTopStoreMorningSale',
		topEANSales: 'http://10.1.2.197:8080/DashboardService/REST/Dashboard/getTopEANSales',
		topEANQuantity: 'http://10.1.2.197:8080/DashboardService/REST/Dashboard/getTopEANQuantity',
        scenceSevenUrl: 'https://kingfisher.scene7.com/is/image/Kingfisher/',
        storeDetailsByID: '/store?id=',
        storeDetailsByIDs: '/stores?ids=',
       // storeNotPollings: 'http://10.246.73.229:8080/DashboardService/REST/Dashboard/getStoreNotPolledNew',
        storeNotPollings: '/getStoreNotPolledNew',
		nextDayOrderStats: 'http://10.1.2.197:8080/DashboardService/REST/Dashboard/getNextDayOrderStats',
        storeOfflineTills: '/storeOfflineTills',
        changeDetails: '/changeDetails',
		replenData: '/replenData',
		serviceNowStats: 'http://10.1.2.197:8080/DashboardService/REST/Dashboard/getSNStats',
		idocfailurePRZDetails:'http://10.1.2.197:8080/DashboardService/REST/Dashboard/getPRZFailedIdocList' ,
        idocfailurePR1Details:'http://10.1.2.197:8080/DashboardService/REST/Dashboard/getR3FailedIdocList' ,
		atgOrderStatusUK: 'http://10.1.2.197:8080/DashboardService/REST/Dashboard/getATGOrderStatusUK',
        atgOrderStatusCE: 'http://10.1.2.197:8080/DashboardService/REST/Dashboard/getATGOrderStatusCE'
    };
});

//MAP SERVICE IS WRITTEN OVER HERE
TCSAMSUKApplication.service('$mapService', [  function () {
    var self = this;

    this.mapProp = {
        center: new google.maps.LatLng(53.6970, -5.0600),
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        scrollwheel: false,
        draggableCursor: 'pointer',
        draggingCursor: 'crosshair',
        styles: [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }] }]
    };
    this.initialize = function () {
        self.map = new google.maps.Map(document.getElementById('googleMap'), this.mapProp);

    }
    var markers = this.markers = [];
    var infowindows = this.infowindows = [];

    // $ .socket.on('refresh', function (data) {
    //     markers.forEach(function (marker) {
    //         marker.setMap(null);
    //     }, this);
    //     markers.length = 0;
    // });

    this.transformInfoWindow = function (infowindow) {

        google.maps.event.addListener(infowindow, 'domready', function () {

            // Reference to the DIV that wraps the bottom of infowindow
            var iwOuter = $('.gm-style-iw');

            /* Since this div is in a position prior to .gm-div style-iw.
             * We use jQuery and create a iwBackground variable,
             * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
            */
            var iwBackground = iwOuter.prev();

            // Removes background shadow DIV
            iwBackground.children(':nth-child(2)').css({ 'display': 'none' });

            // Removes white background DIV
            iwBackground.children(':nth-child(4)').css({ 'display': 'none' });

            // Moves the infowindow 115px to the right.
            iwOuter.parent().parent().css({ left: '100px' });

            // Moves the shadow of the arrow 76px to the left margin.
            iwBackground.children(':nth-child(1)').attr('style', function (i, s) { return s + 'left: 76px !important;' });

            // Moves the arrow 76px to the left margin.
            iwBackground.children(':nth-child(3)').attr('style', function (i, s) { return s + 'left: 76px !important;' });

            // Changes the desired tail shadow color.
            iwBackground.children(':nth-child(3)').find('div').children().css({ 'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index': '1' });

            // Reference to the div that groups the close button elements.
            var iwCloseBtn = iwOuter.next();

            // Apply the desired effect to the close button
            iwCloseBtn.css({ opacity: '1', right: '38px', top: '3px',  'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9' });

            // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
            if ($('.iw-content').height() < 140) {
                $('.iw-bottom-gradient').css({ display: 'none' });
            }

            // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
            iwCloseBtn.mouseout(function () {
                $(this).css({ opacity: '1' });
            });
        });
    }
    this.manageMarkers = function (infowindow,marker) {
         google.maps.event.addListener(marker, 'click', function () {
            for (var i = 0; i < self.infowindows.length; i++) {  //I assume you have your infoboxes in some array
                self.infowindows[i].close();
            }
            infowindow.open(self.map, marker);
        });

        google.maps.event.addListener(marker, 'mouseout', function () {
            //infowindow.close();
        });
        google.maps.event.addListener(self.map, "click", function (event) {
            console.log(self.infowindows.length);
            for (var i = 0; i < self.infowindows.length; i++) {  //I assume you have your infoboxes in some array
                self.infowindows[i].close();
            }
        });
        self.transformInfoWindow(infowindow);

        self.markers.push(marker);
        self.infowindows.push(infowindow);
    }

}]);

//STORE NOT POLLING SERVICE IS WRITTEN OVER HERE
TCSAMSUKApplication.service('$storesNotPollingService', ['$mapService', function ($mapService) {

    this.storesNotPolling = function (store) {

        console.log("Service called");
        var image = '/photos/red.png';
        var newCenter = new google.maps.LatLng(store['latitude'], store['longitude']);
        var str ='';
         store['tillsAffected'].forEach(function(till){
            str += '<a class="btn btn-success" data-toggle="modal" data-target="#myModal-'+till.tillId+'">'+till.tillId+'</a>&nbsp;&nbsp;&nbsp;';
        });

        var contentString =
            '<div id="iw-container">' +
            '<div class="iw-title">' + store['Store Name'] + '</div>' +
            '<div class="iw-content">' +
            '<b>Store No: </b>' + store['Store Number'] + "</br>" +
            '<b></b>' + store['Address Line 1'] + store['Town'] + ' ' + store['PostCode'] + "</br></br>" +
            '<b>Trade point Manager: </b>' + store['TradePoint Manager'] + "</br>" +
            '<b>Contact number : </b>' + store['Phone Number'] + "</br>" +
            '<b>Tills : </b>'+str+"</br>" +
            '</div>' +
            '<div class="iw-bottom-gradient"></div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 350
        });

        var marker = new google.maps.Marker({
            position: newCenter,
            map: $mapService.map,
            title: store['store Name'],
            icon: image
        });

        $mapService.manageMarkers(infowindow,marker);
        

    };

}]);

//MAP SERVICE IS WRITTEN OVER HERE
TCSAMSUKApplication.service('$tillsOfflineService', ['$mapService', function ($mapService) {

    this.tillsOffline = function (data) {
        console.log( data.tillsOffline);
        var offlineTills = '';
        var str ='';
        var toolTipTxt ='';
        

        for (var i = 0; i < data.tillsOffline.length; i++) {
            if(data.tillsOffline[i].statusColor == 'AMBER'){
                 statusColorIcon = 'amber-icon';
                 toolTipTxt = data.tillsOffline[i].lastTransactionId+"\n"+(new Date(data.tillsOffline[i].lastPostTimestamp)).toUTCString();
                 offlineTills += '<span class="'+statusColorIcon+'"><a data-tooltip="'+toolTipTxt+'" class="btn  btn-warning ">'+data.tillsOffline[i].tillId+'</a></span>&nbsp;&nbsp;';     

            }else if (data.tillsOffline[i].statusColor == 'RED') {
                 statusColorIcon = 'red-icon';
                 offlineTills += '<span class="btn btn-danger '+statusColorIcon+'">'+data.tillsOffline[i].tillId+'</span>&nbsp;&nbsp;';     
            }
             
           
           //console.log(text);
        }


        // var image = '/photos/exclamation.png';
        var image = '/photos/pos.png';

        var newCenter = new google.maps.LatLng(data.latitude, data.longitude);

        var contentString =
            '<div id="iw-container">' +
            '<div class="iw-title">' + data.storeName + '</div>' +
            '<div class="iw-content">' +
            '<b>Store No: </b>' + data.storeNumber + "</br>" +
            '<b></b>' + data.address + "</br></br>" +
            '<b>Trade point Manager: </b>' + data.manager + "</br>" +
            '<b>Contact number : </b>' + data.phone + "</br>" +
            '<b>Total tills : </b>' + data.totalNumOfTills + "</br>" +
            '<b>Tills offline: ' + data.numOfTillsOffline + '</b> -' + offlineTills.replace(/,\s*$/, "") + "</br>" +
            '</div>' +
            '<div class="iw-bottom-gradient"></div>' +
            '</div>';


        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 350
        });

        var marker = new google.maps.Marker({
            position: newCenter,
            map: $mapService.map,
            title: data.storeName,
            icon: image
        });

        $mapService.manageMarkers(infowindow,marker);
    }

}]);

//STORE REVENUE SINCE MONRING SERVICE IS WRITTEN OVER HERE
TCSAMSUKApplication.service('$storeRevenueSinceMorningService', ['$mapService', function ($mapService) {

    this.storeRevenueMarkars = function (store) {

        var newCenter = new google.maps.LatLng(store['latitude'], store['longitude']);
        var image = '/photos/pound.png';
        var contentString =
            '<div id="iw-container">' +
            '<div class="iw-title">' + store['Store Name'] + '</div>' +
            '<div class="iw-content">' +
            '<b>Store No: </b>' + store['Store Number'] + "</br>" +
            '<b></b>' + store['Address Line 1'] + store['Town'] + store['PostCode'] + "</br></br>" +
            '<b>Trade point Manager: </b>' + store['TradePoint Manager'] + "</br>" +
            '<b>Contact number : </b>' + store['Phone Number'] + "</br>" +
            '<b>Previous Week Same day Sales (£) : </b>' + store['oldSalesValue'] + "K </br>" +
            '<b>Sales Since Morning (£) : </b>' + store['newSalesValue'] + "K </br>" +
            '</div>' +
            '<div class="iw-bottom-gradient"></div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 350
        });

        var marker = new google.maps.Marker({
            position: newCenter,
            map: $mapService.map,
            title: store['store Name'],
            icon: image
        });

        $mapService.manageMarkers(infowindow,marker);
    };

}]);

//STORE REVENUE LAST ONE HOUR SERVICE IS WRITTEN OVER HERE
TCSAMSUKApplication.service('$storeRevenueLastOneHourService', ['$mapService', function ($mapService) {

    this.storeRevenueMarkars = function (store) {
        var image = '/photos/pound.png';
        var newCenter = new google.maps.LatLng(store['latitude'], store['longitude']);

        var contentString =
            '<div id="iw-container">' +
            '<div class="iw-title">' + store['Store Name'] + '</div>' +
            '<div class="iw-content">' +
            '<b>Store No: </b>' + store['Store Number'] + "</br>" +
            '<b></b>' + store['Address Line 1'] + store['Town'] + store['PostCode'] + "</br></br>" +
            '<b>Trade point Manager: </b>' + store['TradePoint Manager'] + "</br>" +
            '<b>Contact number : </b>' + store['Phone Number'] + "</br>" +
            '<b>Last To Last Hour Sales (£) : </b>' + store['amountHistory'] + "K </br>" +
            '<b>Last Hour Sales (£) : </b>' + store['amount'] + "K </br>" +
            '</div>' +
            '<div class="iw-bottom-gradient"></div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 350
        });

        var marker = new google.maps.Marker({
            position: newCenter,
            map: $mapService.map,
            title: store['store Name'],
            icon: image
        });

        $mapService.manageMarkers(infowindow,marker);
    };

}]);

//STORE REVENUE LAST SIX MONTH (ROLLING) SERVICE IS WRITTEN OVER HERE
TCSAMSUKApplication.service('$storeRevenueLastSixMonthsService', ['$mapService', function ($mapService) {

    this.storeRevenueMarkars = function (store) {

        var newCenter = new google.maps.LatLng(store['latitude'], store['longitude']);

        var image = '/photos/pound.png';
        var contentString =
            '<div id="iw-container">' +
            '<div class="iw-title">' + store['Store Name'] + '</div>' +
            '<div class="iw-content">' +
            '<b>Store No: </b>' + store['Store Number'] + "</br>" +
            '<b></b>' + store['Address Line 1'] + store['Town'] + store['PostCode'] + "</br></br>" +
            '<b>Trade point Manager: </b>' + store['TradePoint Manager'] + "</br>" +
            '<b>Contact number : </b>' + store['Phone Number'] + "</br>" +
            '<b>Last Six Months Sales (£) : </b>' + store['salesValue'] + "k</br>" +
            '</div>' +
            '<div class="iw-bottom-gradient"></div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 350
        });

        var marker = new google.maps.Marker({
            position: newCenter,
            map: $mapService.map,
            title: store['store Name'],
            icon: image
        });

        $mapService.manageMarkers(infowindow,marker);
    };

}]);

//ITEM REVENUE AND SELLING SERVICE IS WRITTEN OVER HERE
TCSAMSUKApplication.service('$itemRevenueService', function () {

    this.itemListRevenueForLastOneHour = [
        { ean: '5014957045545', productName: 'PSE Smooth Planed Timber 70mm x 18mm x 2700mm', senceSevenCode: '5014957045545_01c', value: 11230.29 },
        { ean: '5010214862450', productName: 'Ronseal Woodstain Fern, 750ml', senceSevenCode: '5010214862450_01c', value: 10030.29 },
        { ean: '5038428038218', productName: 'JSP Wet Floor Hazard Sign Pack of 2 70mm x 18mm x 2700mm', senceSevenCode: '5038428038218_01c', value: 9430.00 },
        { ean: '5000403106793', productName: 'Evo-Stik Mitre Adhesive Opaque / 50G', senceSevenCode: '5000403106793_01c', value: 8745.98 },
        { ean: '5019676006495', productName: 'Valor Black Heartbeat Gas Fire', senceSevenCode: '5019676006495_01c', value: 7230.69 },
        { ean: '5014957045545', productName: 'PSE Smooth Planed Timber 70mm x 18mm x 2700mm', senceSevenCode: '5014957045545_01c', value: 7230.69 }
    ];

    this.itemListSellingLastOneHour = [
        { ean: '1048940', productName: 'Gold Straight Handle, Pack of 2 70mm x 18mm x 2700mm', senceSevenCode: '1048940_01c', count: 1200 },
        { ean: '1053289', productName: 'Bright Zinc Plated Threaded Rod M10, Pack of 5', senceSevenCode: '5010214862450_01c', count: 1000 },
        { ean: '9006547104011', productName: 'Ximax Vertirad Electric Radiator White, (H)1800 mm (W)370mm', senceSevenCode: '9006547104011_01c', count: 980 },
        { ean: '3846698', productName: '4 Panel Oak Veneer Glazed Internal Bi-Fold Door, (H)1981mm (W)762mm', senceSevenCode: '3846698_01c', count: 770 },
        { ean: '5013795927532', productName: 'Metpost Post Support 90mm', senceSevenCode: '5013795927532_01c', count: 500 },
        { ean: '1048940', productName: 'Gold Straight Handle, Pack of 2 70mm x 18mm x 2700mm', senceSevenCode: '1048940_01c', count: 500 }
    ];
});

//CHART SERVICE IS WRITTEN OVER HERE
TCSAMSUKApplication.service('$chartService', [ function () {

    var chart;

    this.initializeChart = function () {

        chart = new Highcharts.Chart({
            chart: {
                type: 'column',
                backgroundColor: 'rgba(0,0,0,0)',
                animation: {
                    duration: 4000
                },
                style: {
                    fontFamily: 'Verdana'
                },
                renderTo: 'chartContainer'
            },
            title: {
                text: '',
                align: 'center'
            },
            subtitle: {
                text: '',
                align: 'center'
            },
            xAxis: {
                categories: [
                    'Store 1',
                    'Store 2',
                    'Store 3',
                    'Store 4',
                    'Store 5'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Sales GBP(£) in thousands'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} K GBP(£)</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Old Sales',
                data: [49.9, 71.5, 106.4, 129.2, 144.0]

            }, {
                    name: 'New Sales',
                    data: [83.6, 78.8, 98.5, 93.4, 106.0]

                }]
        });
        
        this.chart = chart;
    }

    this.setSaleDetails = function (chart, storeCode, oldSales, newSales, catOneName, catTwoName) {
        //console.log(chart);
        chart.xAxis[0].setCategories(storeCode);
        console.log(oldSales);
        chart.series[0].setData(oldSales);
        chart.series[1].setData(newSales);

        chart.series[0].update({ name: catOneName }, true);;
        chart.series[1].update({ name: catTwoName }, true);;
    }
}]);

