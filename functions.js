/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
const fs = require('fs');
const csv = require('csv-parser');

'use strict';

module.exports = {
  setImei: setImei,
  setRequest: setRequest,
};


let imeis = [];
let requests = [];

function loadImei() {
    fs.createReadStream('imei.csv')
        .pipe(csv())
        .on('data', (row) => {
            imeis.push(row);
        })
        .on('end', () => {
        });
}

function loadRequest() {
    fs.createReadStream('tracker_body.csv')
        .pipe(csv())
        .on('data', (row) => {
            requests.push(row);
        });
}

function setImei(context, events, done) {
    let value = '';
    if(!imeis.length) {
        loadImei();
        value = '000f333539363332313034343430303030';
    } else {
        const index = Math.floor(Math.random() * imeis.length);
        value = imeis[index].imei;
    }
    context.vars.imei = value;
    return done();
}

function setRequest(context, events, done) {
    let value = '';
    if(!requests.length) {
        loadRequest();
        value = '0000000000000038080100000174d01043e800140842e514d7023d002600580c0061000803715e52145951044237895400005508437303840157045709c800010000f71a';
    } else {
        const index = Math.floor(Math.random() * requests.length);
        value = requests[index].request;
    }
    context.vars.request = value;
    return done();
}
