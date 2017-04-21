var socketIo = require('socket.io');
var io;
var socket;
var text='A';
var refreshTime=200000;

exports.socketIo = socketIo;
exports.io = io;
exports.socket = socket;
exports.text = text;
exports.refreshTime = refreshTime;