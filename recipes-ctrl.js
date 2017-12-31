const Recipe = require('./recipe');
const RecipeSvc = require('./recipe-service');

class RecipesCtrl {
  /** @param {RecipeSvc} recipeSvc */
  constructor(recipeSvc) {
    this.recipes = [];

    recipeSvc.list().then(recipes => {
      this.recipes = recipes;
    });
  }
}

RecipesCtrl.$inject = ['recipeSvc'];

module.exports = RecipesCtrl;
