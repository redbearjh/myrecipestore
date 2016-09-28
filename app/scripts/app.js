'use strict';

angular.module('myrecipestoreApp', ['ui.router','ngResource','ngDialog'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'HomeController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the aboutus page
            .state('app.myrecipes', {
                url:'myrecipes',
                views: {
                    'content@': {
                        templateUrl : 'views/myrecipes.html',
                        controller  : 'MyRecipesController'                  
                    }
                }
            })
        
            // route for the reipedetail page
            .state('app.recipedetails', {
                url: 'recipe/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/recipedetail.html',
                        controller  : 'RecipeDetailController'
                   }
                }
            })
        
    
        $urlRouterProvider.otherwise('/');
    })
;
