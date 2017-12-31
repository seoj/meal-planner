const angular = require('angular');
const IngredientsCtrl = require('./ingredients-ctrl');
const ngRoute = require('angular-route');
const PlannerCtrl = require('./planner-ctrl');
const RecipesCtrl = require('./recipes-ctrl');
const RecipeSvc = require('./recipe-service');
require('./dist/templates');

// TODO: rename to meal-planner
angular.module('recipes', [ngRoute, 'templates'])
  .config(['$routeProvider', ($routeProvider) => {
    $routeProvider
      .when('/planner', {
        controller: PlannerCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'planner.ng.html',
      })

      .when('/recipes', {
        controller: RecipesCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'recipes.ng.html',
      })

      .when('/recipes/:recipeName/ingredients', {
        controller: IngredientsCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'ingredients.ng.html',
      })

      .otherwise('/planner');
  }])
  .service('recipeSvc', RecipeSvc);
