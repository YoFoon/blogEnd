/**
 * mongo模块提供mongodb数据库连接功能，返回的是数据库连接实例。
 * @module mongo
 */
var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, settings.port), {safe: true});