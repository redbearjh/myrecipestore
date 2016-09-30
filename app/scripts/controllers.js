'use strict';

angular.module('myrecipestoreApp')

.controller('MyRecipesController', ['$scope', '$state', 'recipeFactory', 'ngDialog', '$window', function ($scope, $state, recipeFactory, ngDialog, $window) {

    $scope.filtText = '';
    $scope.message = "Loading ...";

    recipeFactory.query(
        function (response) {
            $scope.recipes = response;

        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    
    
    
   $scope.deleteRecipe = function(recipeid) {
    var deleteConfirm = $window.confirm('Are you sure you want to delete?');
    if(deleteConfirm)
        {
            console.log('Delete recipe', recipeid);
            recipeFactory.delete({id: recipeid});
            //$location.url('/myrecipes');
            $window.location.reload();
        }
    }; 
    
    
    
    
    $scope.addRecipe = function () {
        ngDialog.open({ template: 'views/newrecipe.html', scope: $scope, className: 'ngdialog-theme-default', controller:"newRecipeController" });
    };       

}])

// implement the IndexController and About Controller here

.controller('HomeController', ['$scope', 'ngDialog', 'recipeFactory', function ($scope, ngDialog, recipeFactory) {
        
    $scope.openSearch = function () {
        ngDialog.open({ template: 'views/search.html', scope: $scope, className: 'ngdialog-theme-default', controller:"SearchController" });
    }; 
    
    recipeFactory.query(
        function (response) {
            $scope.recipes = response;

        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
}])


.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

    $scope.loggedIn = false;
    $scope.username = '';
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };   
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('RecipeDetailController', ['$scope', '$state', '$stateParams', 'recipeFactory', function ($scope, $state, $stateParams, recipeFactory) {

    $scope.recipe = {};
    $scope.showRecipe = false;
    $scope.message = "Loading ...";

    $scope.recipe = recipeFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.recipe = response;
                $scope.showRecipe = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );


}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };
            
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };
    
}])



.controller('newRecipeController', ['$scope', 'ngDialog',  function ($scope, ngDialog) {

    $scope.donewrecipe = function () {

        recipeFactory.save($scope.newrecipe);

        $state.go($state.current, {}, {reload: true});
        
        $scope.newrecipeForm.$setPristine();
    }
}])    




.controller('OccasionCtrl', function($scope) {
    $scope.items = [
        { id: 1, name: 'Christmas' },
        { id: 2, name: 'Party' },
        { id: 3, name: 'Picnic' }
    ];
})

.controller('CuisineCtrl', function($scope) {
    $scope.items = [
        { id: 1, name: 'Indian' },
        { id: 2, name: 'Chinese' },
        { id: 3, name: 'French' },
        { id: 2, name: 'Chinese' },
        { id: 2, name: 'Italian' },
        { id: 2, name: 'Japanese' },
        { id: 2, name: 'Spanish' },
        { id: 2, name: 'Greek' },
        { id: 2, name: 'British' },
        { id: 2, name: 'Chinese' }
    ];
})

.controller('CourseCtrl', function($scope) {
    $scope.items = [
        { id: 1, name: 'Starter' },
        { id: 2, name: 'Main' },
        { id: 3, name: 'Dessert' }
    ];
})

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);
        
        ngDialog.close();

    };
}])









;
