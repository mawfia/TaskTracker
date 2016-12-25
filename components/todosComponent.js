	var app = angular.module('todoApp'); 
	
	var todosController = function(todoService) {
		var vm = this;
		vm.todos = todoService.getTodos();
		vm.showAll = false;
						
		vm.addTodo = function(task){
			todoService.createTodo({task : task, completed : false});
			vm.newTask = "";
		}
		
		vm.numIncompleteTodos = function(){
			numIncomplete = 0;
			vm.todos.forEach(function(todo){
				if (!todo.completed) {
					numIncomplete++;
				}
			});
			return numIncomplete;
		}
			
		
		vm.todosStatus = function(){
			num = vm.numIncompleteTodos();
			if(num <= 3) return "todosStatus-green";
			else if(num >= 4 && num <= 6) return "todosStatus-yellow";
			else if(num > 6) return "todosStatus-red";
			else return "todosStatus-default";
		}
}

	app.component('todosComponent', {

		template : `
			<div class="row">
				<div class="col-md-6 col-md-offset-3 well" id="header"><h3>ngTodo <span ng-class="$ctrl.todosStatus()">{{$ctrl.numIncompleteTodos()}}</span></h3></div>
			</div>
			<div class="row">
				<div class="container">
					<fieldset class="form-group">
						<legend>New Todo:</legend>
						<form class="form-horizontal" >
							<label></label><input name="newTodo" class="form-control" type="text" placeholder="Add Task" id="newTodo" ng-model="newTask"/>
							<button type="input" class="btn btn-primary" id="addTodo" ng-click="$ctrl.addTodo(newTask)"  focus>Add Todo</button>
						</form>
					</fieldset>
					<todos-table todos="$ctrl.todos" show-All="$ctrl.showAll"></todos-table>
				</div>
			</div>
			<div class="row">
				<my-footer todos="$ctrl.todos"></my-footer>
			</div
		`,

		controller : todosController,
		
		bindings : {
		}
			
	});