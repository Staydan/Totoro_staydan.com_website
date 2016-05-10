/*jshint unused:false */
'use strict';

var consts = require('../libs/consts');
var _ = require('lodash');
module.exports = {
    fetchProductByKey: function (key) {
        return _.find(consts.showcases, {key: key});
    }
};

