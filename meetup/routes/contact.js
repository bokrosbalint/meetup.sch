var express = require('express');
var sqlite = require('sqlite3');
var router = express.Router();

var db = new sqlite.Database('../contacts.db');
db.run('CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, message TEXT);');

/* GET users listing. */
router.post('/', function(req, res) {
  console.log(req.body);

   if (req.body.name === '' || req.body.email === '' || req.body.message === '') {
    res.send('Hiányzó adatok, kérlek töltsd ki a mezőket megfelelően!');
  } else {
 
    var stmt = db.prepare('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)');

    stmt.run(req.body.name, req.body.email, req.body.message);
    stmt.finalize();

    db.each('SELECT * FROM contacts', function(err, row) {
    console.log(row);
    });

    res.send('Az üzeneted megkaptuk, hamarosan válaszolunk rá!');
  }
});

module.exports = router;
