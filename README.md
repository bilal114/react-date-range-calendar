# react-select-date-range-calendar

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

React Calendar to pick the range between two dates and easily customizable.



### Usage Guide
| Property Name | Description | Type| Short Example |
| ------ | ------ | ------ | ------ |
| onSelect | this method is called, when user selects both start and end date | function| <Calendar onSelect= (startDate, endDate) => { // do whatever you want to do } | 
|selectedRange | date range that will be by default selected, should be of type **Array e.g.[startDate,endDate]** | Array | <Calendar selectedRange= ["2019-03-03","2019-03-07"]|
disabledDates| disable the dates those get returned by this method in the array format| function |<Calendar disabledDates= () => { return ["2019-03-01","2019-03-02","2019-03-08"] }|


[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
