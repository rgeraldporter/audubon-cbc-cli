# CLI Tools for Audubon CBC Data (audubon-cbc-cli)
####v0.2.1

A CLI tool for transforming [Audubon's Christmas Bird Count Data](http://netapp.audubon.org/CBCObservation/).

## Features

Currently, the only feature is transformation of an Audubon CBC "Historical Results by Count" CSV file into a better formatted CSV. More features coming soon!

## Installation

You'll need Node.js installed on your system. After that, in the terminal, you can install with the command:

```
npm install audubon-cbc-cli --global
```

## Usage

It's a pretty simple command-line tool right now. The only command right now is:

```
cbc-csv [CSVFileName]
```
So, for example...

```
cbc-csv HistoricalResultsByCount\ \[ONFV-1901-2016\].csv
```

... which results in a file called `ONFV-transformed-count.csv` in this case.

### Convert to Per-Hour Data

The only flag option available so far is `--per-hour`, which will instead make a CSV out of the count-per-hour data.

```
cbc-csv [CSVFileName] --per-hour
```

Example:

```
cbc-csv HistoricalResultsByCount\ \[ONFV-1901-2016\].csv --per-hour
```

... which results in a file called `ONFV-transformed-per-hour.csv` in this case.

## Additional Terms of Use

Please make note of [Audubon's Terms of Use for CBC Data](http://www.audubon.org/content/policy-regarding-use-christmas-bird-count-data) when downloading and using CBC data. It is not provided as true "Open Data" as there are conditions you must adhere to when making use of the data for non-personal use.

## Copyrights & Notices

The Christmas Bird Count (CBC) is a Registered Trademark of the National Audubon Society. CBC Data is provided by National Audubon Society and through the generous efforts of Bird Studies Canada and countless volunteers across the western hemisphere.

##License

The MIT License (MIT)

Copyright (c) 2016 Robert Gerald Porter

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
