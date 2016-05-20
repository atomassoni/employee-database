var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM employees WHERE active=TRUE', function (err, result) {
      done();

      console.log(result.rows);

      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var employee = req.body;

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO employees (first_name, last_name, job_title, annual_salary) ' +
                  'VALUES ($1, $2, $3, $4)',
                   [employee.employeefirstname, employee.employeelastname, employee.employeetitle, employee.employeesalary],
                 function (err, result) {
                   done();

                   if (err) {
                     res.sendStatus(500);
                     return;
                   }

                   res.sendStatus(201);
                 });
  });
});

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var movie = req.body;
  console.log(req.body);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('UPDATE employees ' +
                  'SET active = $1 ' +
                  'WHERE id = ' + id,
                   [false],
                 function (err, result) {
                   done();

                   if (err) {
                     res.sendStatus(500);
                     return;
                   }

                   res.sendStatus(200);
                 });
  });
});


module.exports = router;
