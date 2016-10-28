#! /usr/bin/env node

import cbcParse from 'audubon-cbc-csv-parser';
import {createCountCsv, createPerHourCsv} from 'audubon-cbc-csv';
import fs from 'fs';
import url from 'url';

const userArgs = process.argv.slice(2);
const filename = userArgs[0];
const defaultCsvFn = createCountCsv;
const countData = cbcParse(filename);
const perHour = userArgs[1] && userArgs[1] === '--per-hour';
const newCsv =  perHour ? createPerHourCsv(countData) : defaultCsvFn(countData);
const suffix = perHour ? '-transformed-per-hour.csv' : '-transformed-count.csv';
const path = process.cwd() + '/' + countData.circle.code.emit() + suffix;

fs.writeFile(path, newCsv, err => {

    if (err) return console.log(err);

    console.log("The transformed CSV file was saved to " + path);
    return true;
});