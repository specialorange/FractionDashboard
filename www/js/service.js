// var module = angular.module('cfd', []);
angular.module('cfd')
  // .factory('students', ['$http', function ($http, utils) {
  .service('StudentService', [ '$http',
                      function ($http) {
    //students array to hold list of all students
    // $scope.students = [];
    var path = 'data/people/students.json';
    var students = $http.get(path).then(function (resp) {
      // $scope.students = resp.data;
      return resp.data;
    });
     
    //save method create a new student if not already exists
    //else update the existing object
    this.save = function (student) {
      if (student.id == null) {
        //if this is new student, add it in students array
        // TODO make it get the latest id of students{}
        student.id = 51;
        console.warn(student)
        window.students = $scope.students;
        // $scope.students.push(student);
      } else {
        //for existing student, find this student using id
        //and update it.
        for (i in students) {
          if (students[i].id == student.id) {
            students[i] = student;
          }
        }
      }
    };
 
    //simply search students list for given id
    //and returns the student object if found
    this.get = function (id) {
        for (i in students) {
            if (students[i].id == id) {
                return students[i];
            }
        }
 
    };
     
    //iterate through students list and delete 
    //student if found
    this.delete = function (id) {
        for (i in students) {
            if (students[i].id == id) {
                students.splice(i, 1);
            }
        }
    };
 
    //simply returns the students list
    this.list = function () {
        return students;
    };
  }])
;