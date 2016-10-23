#! /usr/bin/env node
'use strict';

var _audubonCbcCsvParser = require('audubon-cbc-csv-parser');

var _audubonCbcCsvParser2 = _interopRequireDefault(_audubonCbcCsvParser);

var _audubonCbcCsv = require('audubon-cbc-csv');

var _audubonCbcCsv2 = _interopRequireDefault(_audubonCbcCsv);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userArgs = process.argv.slice(2);
var filename = userArgs[0];
var countData = (0, _audubonCbcCsvParser2.default)(filename);
var newCsv = (0, _audubonCbcCsv2.default)(countData);
var path = process.cwd() + '/' + countData.circle.code.emit() + '-transformed.csv';

_fs2.default.writeFile(path, newCsv, function (err) {

    if (err) return console.log(err);

    console.log("The transformed CSV file was saved to " + path);
    return true;
});