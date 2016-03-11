'use strict'

var app = angular.module('carApp')

app.service('CarService', function($http) {
  
  this.fetch = function() {
    return $http.get('/cars');
  };

  this.create = function(newCar) {
    return $http.post('/cars', newCar)
  };

  this.delete = function(car) {
    return $http.delete(`/cars/${car.id}`)
  }

  this.put = function(editCar) {
    return $http.put(`/cars/${editCar.id}`, editCar)
  }
});