const Ingredient = require('./ingredient');
const RecipeSvc = require('./recipe-service');
const Recipe = require('./recipe');

class IngredientsCtrl {
  /**
   * @param {*} $routeParams
   * @param {RecipeSvc} recipeSvc 
   */
  constructor($routeParams, recipeSvc) {
    this.recipeSvc = recipeSvc;
    this.recipe = this.recipeSvc.get($routeParams['recipeName']);
  }

  add() {
    this.recipe.ingredients.push(new Ingredient({}));
    this.onChange();
  }

  remove(ingredient) {
    this.recipe.ingredients.splice(this.recipe.ingredients.findIndex(e => e === ingredient), 1);
    this.onChange();
  }

  onChange() {
    this.recipeSvc.persist();
  }
}

IngredientsCtrl.$inject = ['$routeParams', 'recipeSvc'];

module.exports = IngredientsCtrl;
