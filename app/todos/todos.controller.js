
//Create Todos controller to pass Todos factory todo functions to view

(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('TodosController', TodosController);

    TodosController.$inject = ['TodosFactory'];

    /* @ngInject */
    function TodosController(TodosFactory) {
        var vm = this;
        vm.title = 'TodosController';
        vm.addTodo = addTodo;
        vm.deleteTodo = deleteTodo;
        vm.updateTodo = updateTodo;
        vm.updateItemProp = updateItemProp;
        var reverse = true;

        activate();

        ////////////////

        //Initializes with GET method from API

        function activate() {
            TodosFactory.getTodos()
                .then(function(response) {

                        vm.todos = response.data;
                        toastr.success('Todos Loaded!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        //Add Function calls Todos Factory to POST item to Database and pushes returned item to model array

        function addTodo(todoName, todoPriority) {
            TodosFactory.addTodo(todoName, todoPriority).then(function(response) {

                    vm.todoAdded = response.data;
                    vm.todos.push(vm.todoAdded);
                    toastr.success('Todo Successfully Added!');


                },
                function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.info(error);
                    }
                });
        }

        //Delete Function calls Todos Factory to DELETE item from Database and splices object from model array

        function deleteTodo(data) {
            var index = vm.todos.indexOf(data);
            TodosFactory.deleteTodo(data.todoId).then(function(response) {

                    vm.todoDel = response.data;
                    toastr.success('Todo Successfully Deleted!');


                },
                function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.info(error);
                    }
                });

            return vm.todos.splice(index, 1);

        }

        //Update Function calls Todos Factory to PUT and save new item into Database based on updated data in input form

        function updateTodo(data) {
            TodosFactory.updateTodo(data.todoId, data.name, data.priority).then(function(response) {

                    toastr.success('Todo Successfully Updated!');

                },
                function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.info(error);
                    }
                });
        }

        //Updates item property to new value for use with editInPlace directive

        function updateItemProp(value, item, prop){
            item[prop] = value;
        };
    }
})();
