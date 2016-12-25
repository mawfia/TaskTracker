	var app = angular.module('todoApp');
	
	app.factory('todoService', function(){
		
		var todosCreated = 5;
	  
		var todos = [
						{id : 1, task : "Clean Chimney"									, completed : false},
						{id : 2, task : "Reorganize Christmas Stamp Collection"			, completed : false},
						{id : 3, task : "Mail Chrismas Cards"							, completed : false},
						{id : 4, task : "Buy Christmas Gifts for 2017"					, completed : false},
						{id : 5, task : "Mail belongings back to ex"					, completed : false},
						{id : 6, task : "Re-gift fruit cake recieved from neighbors"	, completed : false},
					];
	  
		var getTodos = function(){
			return todos;
		}

		var createTodo = function(todo) {
			todo.id = ++todosCreated;
			todos.push(todo);
		}

		var deleteTodo = function(todo) {
			todos.splice(todos.indexOf(todo),1);
			todosCreated--;
		}

		var updateTodo = function(todo) {
			todos.forEach(function(val) {
				if (val.id === todo.id) {
					val.task = todo.task;
					return;
				}
			});
		}

		return {
			getTodos : getTodos,
			createTodo : createTodo,
			deleteTodo : deleteTodo,
			updateTodo : updateTodo
		};
		// return service;
    });