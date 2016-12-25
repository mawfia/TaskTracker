	var app = angular.module('todoApp'); 

	app.component('todosTable', {
	
		controller : function(todoService) {
			var vm = this;
			vm.todoID = 0;
			vm.todos = todoService.getTodos();

			vm.destroy = function(todo){
				todoService.deleteTodo(todo);
			}
			
			vm.selectTodo = function(todo){				
				console.log("update clicked for: "+ vm.todoID);
				if(vm.todoID > 0) vm.todoID = 0;
				else if(vm.todoID === 0) vm.todoID = todo.id;
				//return vm.todoID;
			}
			
			vm.updateTodo1 = function(todo){
				if(todo.id === vm.todoID) return true;
				else return false;
			}
			
			vm.updateTodo2 = function(todo){
				todoService.updateTodo(todo);
				vm.selectTodo(todo);
			}
		
		},
		
		template : `
			<div class="row">
				<div class="container" >
					<table class="table table-striped">
						<thead>
							<tr>
								<th>Todos:</th><th>Mark:</th><th>Done?:</th><th id="action">Action:</th>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="t in $ctrl.todos | completeFilter:$ctrl.showAll | orderBy:'task'" ng-class="(t.completed) ? 'strike':'';">
								<td ng-show="!$ctrl.updateTodo1(t)">{{t.task}}</td>
								<td ng-show="$ctrl.updateTodo1(t)"><div class="form-group row"><div class="col-sm-10"><input name="updateT" class="form-control" type="text" ng-model="t.task"></div></div></td>
								<td><div class="form-check"><label class="form-check-label"><input class="form-check-input" type="checkbox" ng-model="t.completed"></label></div></td>
								<td>{{t.completed}}</td>
								<td id="action" ng-show="!$ctrl.updateTodo1(t)"><div class="btn-group"><button type="input" class="btn btn-primary" ng-click="$ctrl.destroy(t)" focus>Delete</button><button type="input" class="btn btn-primary" ng-click="$ctrl.selectTodo(t)" focus>Update</button></div></td>
								<td id="action" ng-show="$ctrl.updateTodo1(t)"><div class="btn-group"><button type="input" class="btn btn-primary" ng-click="$ctrl.updateTodo2(t)" ng-model="t.task" focus>Submit</button><button type="input" class="btn btn-primary" ng-click="$ctrl.selectTodo(t)" focus>Cancel</button></div></td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<th><div class="form-check "><label class="form-check-label" ><input class="form-check-input" type="checkbox" ng-model="$ctrl.showAll">Show Completed Tasks</label></div></th>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		`,
	
		bindings : {
			todos: '=',
			showAll: '<',
		}
	});