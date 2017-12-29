const Recipe = require('./recipe');
const RecipeSvc = require('./recipe-service');

class RecipesCtrl {
  /** @param {RecipeSvc} recipeSvc */
  constructor(recipeSvc) {
    this.recipeSvc = recipeSvc;
    this.recipes = this.recipeSvc.list();
  }

  add() {
    this.recipeSvc.create();
    this.recipes = this.recipeSvc.list();
    this.onChange();
  }

  /** @param {Recipe} recipe */
  remove(recipe) {
    this.recipeSvc.remove(recipe);
    this.recipes = this.recipeSvc.list();
    this.onChange();
  }

  onChange() {
    this.recipeSvc.persist();
  }
}

RecipesCtrl.$inject = ['recipeSvc'];

module.exports = RecipesCtrl;
