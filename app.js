var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.use('/StoresWithOfflineTills', routes);
app.use('/store', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//fileGeneration();
function fileGeneration() {
    // var Converter=require("csvtojson").Converter;
    // var csvConverter=new Converter({constructResult:false}); // The parameter false will turn off final result construction. It can avoid huge memory consumption while parsing. The trade off is final result will not be populated to end_parsed event. 
 
    // var readStream=require("fs").createReadStream("Store_Details.csv");
 
    // var writeStream=require("fs").createWriteStream("outpuData.json");
 
    // readStream.pipe(csvConverter).pipe(writeStream);
    var fs = require('fs');
    var csvToJson = require('./server-modules/csvToJson');


    var csv = require("fast-csv");
    // var postCodeDataCsv = "";
    // var postCodeData = "";

    // var storeDataCsv = "";

    // var storeJsonAll = "";
    // csv
    //     .fromPath("./postcode-outcodes.csv")
    //     .on("data", function (data) {
    //         postCodeDataCsv += data + "\n";

    //     })
    //     .on("end", function () {
    //         console.log("done");
    //         postCodeData = JSON.parse(csvToJson.postCodeJson(postCodeDataCsv));
    //         csv
    //             .fromPath("./Store_Details_tab.txt")
    //             .on("data", function (data) {
    //                 storeDataCsv += data + "\n";

    //             })
    //             .on("end", function () {
    //                 console.log("done All");
    //                 console.log("storeDataCsv");
    //                 storeJsonAll = csvToJson.createJsonMain(storeDataCsv, postCodeData);


    //                 fs.writeFile("./JSONFiles/StoreAll.json", storeJsonAll, function (err) {
    //                     if (err) {
    //                         return console.log(err);
    //                     }

    //                     console.log("The file was saved!");
    //                 });
    //             });
    //     });
    
    // var idocDatacsv = "";     
    // csv
    //     .fromPath("./ReplenishmentDashboardDummydata.csv")
    //     .on("data", function (data) {
    //         idocDatacsv += data + "\n";

    //     })
    //     .on("end", function () {
    //         console.log("done All");
    //         console.log("storeDataCsv");
    //         storeJsonAll = csvToJson.createJsonMain(idocDatacsv);


    //         fs.writeFile("./JSONFiles/StoreAll.json", storeJsonAll, function (err) {
    //             if (err) {
    //                 return console.log(err);
    //             }

    //             console.log("The file was saved!");
    //         });
    //     });

}


module.exports = app;
