
	var app = angular.module('todoApp');

		function appController() {
		console.log("loaded")
		var vm = this;

			
		}
		
	app.component('appComponent', {

		template : `<todos-component></todos-component>`,

		controller : appController
	
	});