var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var carsFilepath = path.join(__dirname, '../data/info.json');

exports.get = function(callback) {
  fs.readFile(carsFilepath, function(err, data) {
    if(err) return callback(err);
    var cars = JSON.parse(data);
    callback(null, cars);
  });
};

exports.create = function(newCar, callback) {
  this.get((err, cars) => {  
    if(err) return callback(err);
    newCar.id = uuid();
    cars.push(newCar);   
    this.write(cars, function(err) {
      callback(err, newCar);
    }); 
  });
};

exports.write = function(cars, callback) {
  fs.writeFile(carsFilepath, JSON.stringify(cars), callback);
};

exports.delete = function(id, callback) {
  this.get((err, cars) => {
    var length = cars.length;
    cars = cars.filter(function(car) {
      return car.id !== id;
    });
    if(length === cars.length) {
      callback( {err: "Car not found."} );
      return;
    }

    this.write(cars, callback);
  });
};

exports.update = function(id, updatedObj, callback) {
  this.get((err, cars) => {
    var updatedCar;
    cars = cars.map(function(car) {
      if(car.id === id) {
        for(var key in updatedObj) {
          car[key] = updatedObj[key];
        }
        updatedCar = car;
      }
      return car;
    });
    if(!updatedCar) {
      callback( {err: "Shoe not found."} );
      return;
    }
    this.write(cars, function(err) {
      callback(err, updatedCar)
    });
  });
};


