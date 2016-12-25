	var app = angular.module('todoApp');


	app.filter('completeFilter', function(){

		// var todos = todoService.getTodos();
	
		return function(todos, completed){
			var results = [];
			todos.forEach(function(todo){
				if (!todo.completed || completed) {
					results.push(todo);
				}
			});
			return results;
		}
    });
