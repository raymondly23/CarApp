'use strict';

var express = require('express');
var router = express.Router();
var Car = require('../models/car')
var bodyParser = require('body-parser')

router.get('/', function(req, res) {
  Car.get(function(err, cars) {
    if(err) {
      res.status(400).send(err);
      return;
    };
    res.send(cars);
  });
});

router.post('/', function(req, res) {
  var newCar = req.body;
  console.log(newCar)
  Car.create(newCar, function(err) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(newCar);
    }
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Car.delete(id, function(err) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send();
    }
  });
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
  var updatedObj = req.body;
  Car.update(id, updatedObj, function(err, updatedCar) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(updatedCar);
    }
  });
});

module.exports = router;