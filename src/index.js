#! /usr/bin/env node

import cbcParse from 'audubon-cbc-csv-parser';
import * as cbcCsv from 'audubon-cbc-csv';
import fs from 'fs';
import url from 'url';

const userArgs = process.argv.slice(2);
const filename = userArgs[0];
const defaultCsvFn = cbcCsv.createCountCsv;
const countData = cbcParse(filename);
let newCsv, suffix;

const options = userArgs.reduce((prev, current, index) => {

    if (!index) return prev;

    if (prev.skipNext) {
        prev.skipNext = false;
        return prev;
    }

    switch(current) {

        case '--data':
        case '-d':

            prev.data = userArgs[index+1];
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
}, {data: null});

switch(options.data) {

    case 'per-hour':

        newCsv = options.reverse ?
            cbcCsv.createPerHourReverseCsv(countData) : cbcCsv.createPerHourCsv(countData);
        suffix = '-transformed-per-hour.csv'
        break;

    case 'count':
    case null:

        newCsv = options.reverse ?
            cbcCsv.createCountReverseCsv(countData) : defaultCsvFn(countData);
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

const path = process.cwd() + '/' + countData.circle.code.emit() + suffix;

fs.writeFile(path, newCsv, err => {

    if (err) return console.log(err);

    console.log('The transformed CSV file was saved to ' + path);
    return true;
});