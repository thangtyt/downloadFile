/**
 * Created by thangnv on 6/23/15.
 */
    'use strict';
const request   = require('request');
const progress  = require('progress');
const fs        = require('fs');
var bar;

//parameter url to download
var url = process.argv[2] ;
//parameter name of file to save from download
var nameOfFfile = 'download';
//nameOfFfile = process.argv[3];
//console.log(url +' ******* '+nameOfFfile);
///
let req = request.get(url, function (error,response,data) {
    if (error) {
        console.log('ERROR FOUND !! PLEASE ENTER ANOTHER URL ... ');

    }else {
        if (response.statusCode !== 200) {
            console.log('URL NOT FOUND !! PLEASE TYPE URL AGAIN ...');

        }
    }

});
////

console.time('downloadTime');

req.on('response', function (resData) {
    var len = parseInt(resData.headers['content-length'], 10);
    console.log('\n*****************');
    bar = new progress('Downloading [:bar] :percent :etas', {
        complete: '>',
        incomplete: ' ',
        width: 50,
        total: len
    });
});
req.on('data', function (chunk) {
    bar.tick(chunk.length);
});
req.on('end', function () {
    console.log('*****************\n');
});


req.pipe(fs.createWriteStream(nameOfFfile+'.png')
        .on('finish', function(){
            console.timeEnd('downloadTime');
            console.log('Done write to file');
        })
        .on('error', function (err) {
            console.log('Error write to file', err);
        })
);
