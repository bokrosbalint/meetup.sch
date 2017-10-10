var express = require('express');
var sqlite = require('sqlite3');
var router = express.Router();

var date = new Date()
var sqlname = "emails_" + (date.getYear() + 1900) + "_" + ((date.getMonth() + 1) < 7 ? "1" : "2")

var db = new sqlite.Database('../emails.db');

router.get('/', function(req, res) {
    db.get('SELECT count(id) AS cnt FROM ' + sqlname, function(err, row) {
        if(err) {
            res.send(err)
        }
        else {
            res.send(row.cnt.toString());
        }
    })
});

module.exports = router;
