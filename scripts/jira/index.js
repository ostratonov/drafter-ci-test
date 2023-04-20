'use strict'

module.exports = () => {
    process.argv.forEach(function (val, index) {
        console.log(index + ' : ' + val);
    });
}