#! /usr/bin/env node
'use strict';

var _audubonCbcCsvParser = require('audubon-cbc-csv-parser');

var _audubonCbcCsvParser2 = _interopRequireDefault(_audubonCbcCsvParser);

var _audubonCbcCsv = require('audubon-cbc-csv');

var cbcCsv = _interopRequireWildcard(_audubonCbcCsv);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userArgs = process.argv.slice(2);
var filename = userArgs[0];
var defaultCsvFn = cbcCsv.createCountCsv;
var countData = (0, _audubonCbcCsvParser2.default)(filename);
var newCsv = void 0,
    suffix = void 0;

var options = userArgs.reduce(function (prev, current, index) {

    if (!index) return prev;

    if (prev.skipNext) {
        prev.skipNext = false;
        return prev;
    }

    switch (current) {

        case '--data':
        case '-d':

            prev.data = userArgs[index + 1];
            prev.skipNext = true;
            break;

        case '--reverse':
        case '-r':

            prev.reverse = true;
            break;

        default:

            prev.unknown = current;
            break;
    }

    return prev;
}, { data: null });

switch (options.data) {

    case 'per-hour':

        newCsv = options.reverse ? cbcCsv.createPerHourReverseCsv(countData) : cbcCsv.createPerHourCsv(countData);
        suffix = '-transformed-per-hour.csv';
        break;

    case 'count':
    case null:

        newCsv = options.reverse ? cbcCsv.createCountReverseCsv(countData) : defaultCsvFn(countData);
        suffix = '-transformed-count.csv';
        break;

    default:

        options.unknown = options.data;
        break;
}

if (options.unknown) {
    console.log('Unknown argument: ' + options.unknown);
    process.exit(1);
}

var path = process.cwd() + '/' + countData.circle.code.emit() + suffix;

_fs2.default.writeFile(path, newCsv, function (err) {

    if (err) return console.log(err);

    console.log('The transformed CSV file was saved to ' + path);
    return true;
});