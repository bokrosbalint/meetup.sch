var express = require('express');
var sqlite = require('sqlite3');
var router = express.Router();

var date = new Date()
var sqlname = "emails_" + (date.getYear() + 1900) + "_" + ((date.getMonth() + 1) < 7 ? "1" : "2")

var db = new sqlite.Database('../emails.db');
db.run('CREATE TABLE IF NOT EXISTS ' + sqlname + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, comesfrom TEXT, info TEXT);');

/* post registration. */
router.post('/', function(req, res) {

    if (date.getTime() > new Date(2017,03,15,00,00,00).getTime()) {

        res.send('A regisztráció időszaka lezárult.')
    }
    else {
        if (req.body.name === '' || req.body.email === '' || req.body.comesfrom === '' || req.body.info === '') {
            res.send('Hiányzó adat!');
        } else {
            var stmt = db.prepare('INSERT INTO ' + sqlname + ' (name, email, comesfrom, info) VALUES (?, ?, ?, ?)');

            stmt.run(req.body.name, req.body.email, req.body.comesfrom, req.body.info, function(err) {
                if(err) {
                    console.log(err); //TODO: better error handling
                    res.send('Már regisztráltak ezzel az e-mail címmel!')
                }
                else {
                    res.send('Köszönjük, hogy regisztráltál!');
                }

            });
            stmt.finalize();

            db.each('SELECT * FROM ' + sqlname, function(err, row) {
                console.log(row);
            });

        }
    }





});

module.exports = router;
