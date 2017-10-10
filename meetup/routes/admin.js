var express = require('express');
var sqlite = require('sqlite3');
var router = express.Router();

var contacts = new sqlite.Database('../contacts.db');
var emails = new sqlite.Database('../emails.db');

/* GET listings. */
router.get('/', function(req, res) {
  console.log(req.body);

    var contactResults = [];
    var emailResults = [];

    contacts.each('SELECT * FROM contacts', function(err, row) {
      contactResults.push(row);
    });


    emails.each('SELECT * FROM emails', function(err, row) {
      emailResults.push(row);
    });

    res.send(JSON.stringify(emailResults) + JSON.stringify(contactResults));
});

module.exports = router;
