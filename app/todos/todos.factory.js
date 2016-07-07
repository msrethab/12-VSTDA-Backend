
//create Todos factory to get, add, delete and update Todos

(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('TodosFactory', TodosFactory);

    TodosFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function TodosFactory($http, $q) {

        var url = 'http://localhost:59090/api/todos/'
        var service = {
            getTodos: getTodos,
            addTodo: addTodo,
            deleteTodo: deleteTodo,
            updateTodo: updateTodo
        };
        return service;

        ////////////////

        // Gets todos using GET API Call

        function getTodos() {

            var defer = $q.defer();

            $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                    if (typeof response.data === 'object') {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;


        }

        //Adds Todos using POST API Call

        function addTodo(todoName, todoPriority){

            var defer = $q.defer();

            var newTodo = {name: todoName, priority: todoPriority};

            $http({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: newTodo
                }).then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject("No data found!");
                        }
                    },
                    function(error) {
                        defer.reject(error);
                    });

                return defer.promise;

        }

        //Deletes Todos using DELETE API Call

        function deleteTodo(todoId){

            var defer = $q.defer();

            $http({
                method: 'DELETE',
                url: url + todoId,
            }).then(function(response) {
                    if (typeof response.data === 'object') {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;      

        }

        //Updates Todos using PUT API Call

        function updateTodo(todoId, todoName, todoPriority){

            var defer = $q.defer();
            var updatedTodo = {todoId: todoId, name: todoName, priority: todoPriority};

            $http({
                method: 'PUT',
                url: url + todoId,
                headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                },
                data: updatedTodo
            }).then(function(response) {
                    if (response.status === 204) {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;      

        }
    }
})();
