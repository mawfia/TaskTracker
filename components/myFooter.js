	var app = angular.module('todoApp');

		var myFooterController = function(todoService) {
			console.log("myFooter loaded")
			var vm = this;
			vm.todos = todoService.getTodos();

			vm.numCompleteTodos = function(){
				numComplete = 0;
				vm.todos.forEach(function(todo){
					if (todo.completed) {
						numComplete++;
					}
				});
				return numComplete;
			}
		}
		
	app.component('myFooter', {

		template : `<div class="col-md-4 col-md-offset-4" id="footer"><h3>Total Tasks Completed: <span id="completeTodos">{{$ctrl.numCompleteTodos()}}</span></h3></div>`,

		controller : myFooterController,
		
		bindings : {
			todos : '<'
		}
	
	});