angular.module('MyApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/projects');

	$stateProvider.state('home', {
		url: '/home',
		template: '<h1>Index</h1>'
	});

	$stateProvider.state('employees', {
		alias : ['Empleados'],
		url: '/employees',
		templateUrl: 'employees/index.html',
		controller : 'EmployeesController'
	});
	$stateProvider.state('projects', {
		alias : ['Proyectos'],
		url: '/projects',
		templateUrl: 'projects/index.html',
		controller : 'ProjectosController'
	});

	$stateProvider.state('projectDetail', {
		alias : ['Proyectos', 'Detalles'],
		url: '/projects/:projectID/details',
		templateUrl: 'projects/detail.html',
		controller : 'ProjectDetailController'
	});

	$stateProvider.state('projectForm', {
		alias : ['Proyectos', 'Formulario'],
		url: '/projects/:projectID',
		templateUrl: 'projects/form.html',
		controller : 'ProjectFormController'
	});
})

.service('MyService', function () {
	this.projects = [
		{
			id  : 1,
			name : 'Projecto 1',
			comercialDen : 'KO',
			status : '1',
			tasks : [
				{ name : 'Levantamiento' },
				{ name : 'Documentacion' }
			]
		},
		{
			id  : 2,
			name : 'Projecto 2',
			comercialDen : 'KO',
			status : '1',
			tasks : [
				{ name : 'Levantamiento' },
				{ name : 'test' }
			]
		},
		{
			id  : 3,
			name : 'Projecto 3',
			comercialDen : 'KO',
			status : '1',
			tasks : [
				{ name : 'Levantamiento' },
				{ name : 'test' }
			]
		},
		{
			id  : 4,
			name : 'Projecto 3',
			comercialDen : 'KO',
			status : '1'
		}
	];

	this.employees = [
		{ id : 1, name : 'Eren Jaeger'},
		{ id : 2, name : 'Mikasa Ackerman'},
		{ id : 3, name : 'Armin Arlet'}
	]
})

.factory('MyFactory', function (MyService) {
	var obj = {};

	obj.getProjectById = function (projectID) {

		for (var i in MyService.projects) {
			var project = MyService.projects[i];

			if (project.id == projectID) {
				return project;
			}
		}
	}

	return obj;
})


.run(function($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    	$rootScope.current_state = toState.alias;
    });
})

.controller('EmployeesController', function ($scope, $state, MyService) {
	$scope.state = $state.current.name;
	$scope.employees = MyService.employees;
})

.controller('ProjectosController', function ($scope, $state, MyService) {
	$scope.state = $state.current.name;
	$scope.projects = MyService.projects;
})

.controller('ProjectDetailController', function ($scope, $stateParams, MyFactory) {
	var projectID = $stateParams.projectID;
	$scope.project = MyFactory.getProjectById(projectID);
})

.controller('ProjectFormController', function ($scope, $stateParams, MyService, MyFactory) {
	$scope.project = {};

	$scope.saveProject = function () {
		MyService.projects.push($scope.project);
		$scope.project = {};
	}
})

