'use strict';

// simple express server
var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();

app.set('port', (process.env.PORT || 5000));

app.use(express.static('public/'));

// set up our one route to the index.html file
app.get('*', function(req, res) {
    res.sendFile(path.join('./public/index.html'));
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});