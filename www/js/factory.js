angular.module('cfd')

  // A RESTful factory for retreiving contacts from 'contacts.json'

  // Contacts
  .factory('contacts', ['$http', function ($http, utils) {
    var path = 'contacts.json';
    var contacts = $http.get(path).then(function (resp) {
      return resp.data.contacts;
    });

    var factory = {};
    factory.all = function () {
      return contacts;
    };
    factory.get = function (id) {
      return contacts.then(function(){
        return utils.findById(contacts, id);
      })
    };
    return factory;
  }])

  // Students
  .factory('students', ['$http', function ($http, utils) {
  // .factory('students', ['$http', function ($http) {
    var path = 'data/people/students.json';
    var students = $http.get(path).then(function (resp) {
      console.log(resp);
      console.log(resp.data);
      console.log(resp.data.students);
      return resp.data;
    });

// This was working
    // var factory = {};
    // factory.all = function () {
    //   return students;
    // };

    var list = {};
    list.all = function () {
      return students;
    };
    list.get = function (id) {
      return students.then(function(){
        return utils.findById(students, id);
      })
    };

    return list;
  }])

  // Circles
  // .factory('circles', ['$http', function ($http) {
  //   var path = 'data/circles.json';
  //   var students = $http.get(path).then(function (resp) {
  //     return resp.data.circles;
  //   });
  //   var factory = {};
  //   factory.all = function () {
  //     return circles;
  //   };
  //   return factory;
  // }])

  .factory('utils', function () {

    return {

      // Util for finding an object by its 'id' property among an array
      findById: function findById(a, id) {
        for (var i = 0; i < a.length; i++) {
          if (a[i].id == id) return a[i];
        }
        return null;
      },

      // Util for returning a randomKey from a collection that also isn't the current key
      newRandomKey: function newRandomKey(coll, key, currentKey){
        var randKey;
        do {
          randKey = coll[Math.floor(coll.length * Math.random())][key];
        } while (randKey == currentKey);
        return randKey;
      }

    };

  });