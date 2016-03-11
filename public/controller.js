var app = angular.module('carApp')

app.controller('mainCtrl', function($scope, $http, CarService){

  

$scope.fetch = function() {
  CarService.fetch()
  .then(function(res) {
    $scope.cars = res.data;
  }, function(err) {
    console.log(err)
  });
}

$scope.fetch()

$scope.deleter = function(car) {
  console.log(car)
  CarService.delete(car)
    .then(function(res) {
      $scope.cars = $scope.cars.filter(val => val.id !== car.id);
      console.log('success')
    }, function(err) {
      console.error('err: ', err)
    });
}

$scope.addCar = function() {
  CarService.create($scope.newCar)
  .then(function(res) {
    $scope.cars.push(res.data)
  }, function(err) {
  });
  newCar = {};
};

$scope.clear = function() {
  $scope.newCar = {};
}

$scope.delete = function(car) {
  swal({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!',
  closeOnConfirm: false
},
function(isConfirm) {
  if (isConfirm) {
    swal(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    );
  $scope.deleter(car)
  }
})
};

$scope.edittCar = function(car) {
$scope.editCar = angular.copy(car); 
if(!$scope.editCar.pic){
  $scope.editCar.pic = 'http://rs304.pbsrc.com/albums/nn180/4chanRus/Awesome%20Face/1213841779552.png~c200'
 }
};


$scope.cancelEdit = function() {
  $scope.editCar = null;
};

$scope.confirm = function(car) {
  CarService.put(car)
  .then(function(res) {
    $scope.fetch();
   }, function(err) {
    console.error('err: ', err)
  })
}

$scope.picture = function(car) {
$scope.car = angular.copy(car); 
 if(!$scope.car.pic){
  $scope.car.pic = 'http://rs304.pbsrc.com/albums/nn180/4chanRus/Awesome%20Face/1213841779552.png~c200'
 }

}




});


