#! /usr/bin/env node

import cbcParse from 'audubon-cbc-csv-parser';
import cbcCsv from 'audubon-cbc-csv';
import fs from 'fs';
import url from 'url';

const userArgs = process.argv.slice(2);
const filename = userArgs[0];
const countData = cbcParse(filename);
const newCsv = cbcCsv(countData);
const path = process.cwd() + '/' + countData.circle.code.emit() + '-transformed.csv';

fs.writeFile(path, newCsv, err => {

    if (err) return console.log(err);

    console.log("The transformed CSV file was saved to " + path);
    return true;
});