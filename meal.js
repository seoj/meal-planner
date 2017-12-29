const Ingredient = require('./ingredient');
const Recipe = require('./recipe');

class Meal {
  constructor(/** @type {{ recipe:Recipe, servingSize:number }} */ { recipe, servingSize }) {
    this.recipe = recipe;
    this.servingSize = servingSize;
  }

  /** @return {Ingredient[]} */
  getIngredients() {
    const factor = this.servingSize / this.recipe.servingSize;
    return this.recipe.ingredients.map(e => new Ingredient({
      name: e.name,
      amount: e.amount * factor,
      unit: e.unit,
    }));
  }
}

module.exports = Meal;
