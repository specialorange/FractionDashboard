angular.module('cfd')
  .controller('StudentController', function ($scope, StudentService) {
 
    $scope.students = StudentService.list();
 
    $scope.saveStudent = function () {
        StudentService.save($scope.newstudent);
        $scope.newstudent = {};
    };
 
 
    $scope.delete = function (id) {
        StudentService.delete(id);
        if ($scope.newstudent.id == id) $scope.newstudent = {};
    };
 
 
    $scope.edit = function (id) {
        $scope.newstudent = angular.copy(StudentService.get(id));
    };
});