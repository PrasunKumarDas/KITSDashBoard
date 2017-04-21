
function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
        // Delimiters.
        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
        // Quoted fields.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        // Standard fields.
        "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"), "\"");
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    return (arrData);
}


function createJsonMain(csv, postCodeJson) {
    var array = CSVToArray(csv,"|");
    var objArray = {};
    for (var i = 1; i < array.length; i++) {
        console.log(i);
        var masterkey = array[i][0];
        if (!masterkey) {
           continue; 
        }
        //console.log(masterkey);
        objArray[masterkey] = {};
        if (masterkey.localeCompare('241')==0) {
            console.log( array[i]);
        }
        for (var k = 0; k < array[0].length && k < array[i].length; k++) {
            var key = array[0][k];
            objArray[masterkey][key] = array[i][k]
        }
        var postCode = objArray[masterkey]['PostCode'];
        //console.log(postCode);
        //console.log((postCode.split(" ")[0]).toUpperCase());
        
        if ('EIRE'.localeCompare((postCode.split(" ")[0]).toUpperCase()) == 0) {
            objArray[masterkey]['latitude'] = 0;
            objArray[masterkey]['longitude'] = 0;
            continue;
        }
        if ('RH1O'.localeCompare((postCode.split(" ")[0]).toUpperCase()) == 0) {
            objArray[masterkey]['PostCode'] = 'RH10 '+(objArray[masterkey]['PostCode']).split(" ")[1];
            console.log(objArray[masterkey]);
        }
       
       
        var storeArea = postCodeJson[(objArray[masterkey]['PostCode']).split(" ")[0]];
        var lat = storeArea.latitude;
        var long = storeArea.longitude;
        objArray[masterkey]['latitude'] = lat;
        objArray[masterkey]['longitude'] = long;
    }

    var json = JSON.stringify(objArray);
    var str = json.replace(/},/g, "},\r\n");
    return str;
}

var postCodeJson = function (csv) {
    var array = CSVToArray(csv);
    var objArray = {};
    for (var i = 1; i < array.length; i++) {
        var masterkey = array[i][1];
        objArray[masterkey] = {};
        for (var k = 0; k < array[0].length && k < array[i].length; k++) {
            var key = array[0][k];
            objArray[masterkey][key] = array[i][k]
        }
    }

    var json = JSON.stringify(objArray);
    var str = json.replace(/},/g, "},\r\n");
    return str;
}
module.exports.postCodeJson = postCodeJson;
module.exports.createJsonMain = createJsonMain;