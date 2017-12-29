const angular = require('angular');
const ImportExportCtrl = require('./import-export-ctrl');
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

      .when('/import-export', {
        controller: ImportExportCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'import-export.ng.html',
      });
  }])
  .service('recipeSvc', RecipeSvc)
  .run(['recipeSvc', (/** @type {RecipeSvc} */ recipeSvc) => {
    recipeSvc.load();
  }]);
