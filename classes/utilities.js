"use strict";
var utilities = {
    functionWithCallBack: function (functionX, timeout) {
        var promise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                functionX;
                resolve();
            }, timeout);
        });
        return promise;
    },
    isContain: function (input, value) {
        if (input.includes(value)) {
            return value;
        }
    }
};
module.exports = utilities;
