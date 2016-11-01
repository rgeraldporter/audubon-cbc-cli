#! /usr/bin/env node
'use strict';

var _audubonCbcCsvParser = require('audubon-cbc-csv-parser');

var _audubonCbcCsvParser2 = _interopRequireDefault(_audubonCbcCsvParser);

var _audubonCbcCsv = require('audubon-cbc-csv');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userArgs = process.argv.slice(2);
var filename = userArgs[0];
var defaultCsvFn = _audubonCbcCsv.createCountCsv;
var countData = (0, _audubonCbcCsvParser2.default)(filename);
var perHour = userArgs[1] && userArgs[1] === '--per-hour';
var newCsv = void 0;

switch (userArgs[1]) {

    case '--per-hour':

        newCsv = (0, _audubonCbcCsv.createPerHourCsv)(countData);
        break;

    case '--reverse':

        newCsv = (0, _audubonCbcCsv.createCountReverseCsv)(countData);
        break;

    default:

        newCsv = defaultCsvFn(countData);
        break;
}

var suffix = perHour ? '-transformed-per-hour.csv' : '-transformed-count.csv';
var path = process.cwd() + '/' + countData.circle.code.emit() + suffix;

_fs2.default.writeFile(path, newCsv, function (err) {

    if (err) return console.log(err);

    console.log("The transformed CSV file was saved to " + path);
    return true;
});