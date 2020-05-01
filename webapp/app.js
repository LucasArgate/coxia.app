var app = angular.module('app', ['ngRoute', 'dndLists']);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {templateUrl: 'views/home.html?v=' + v, controller: 'home'})
        .when('/peca/:id', {templateUrl: 'views/peca.html?v=' + v, controller: 'peca'})
})
