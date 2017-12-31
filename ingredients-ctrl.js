const Ingredient = require('./ingredient');
const RecipeSvc = require('./recipe-service');
const Recipe = require('./recipe');

class IngredientsCtrl {
  /**
   * @param {*} $routeParams
   * @param {RecipeSvc} recipeSvc 
   */
  constructor($routeParams, recipeSvc) {
    this.recipe = [];

    recipeSvc.get($routeParams['recipeName']).then(recipe => {
      this.recipe = recipe;
    });
  }
}

IngredientsCtrl.$inject = ['$routeParams', 'recipeSvc'];

module.exports = IngredientsCtrl;
