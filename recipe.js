const Ingredient = require('./ingredient');

class Recipe {
  constructor(/** @type {{ name:string, servingSize:number, ingredients:Ingredient[] }} */ { name, servingSize = 1, ingredients = [] }) {
    this.name = name;
    this.servingSize = servingSize;
    this.ingredients = ingredients;
  }

  /** @param {Recipe} recipe */
  merge(recipe) {
    this.servingSize = recipe.servingSize;
    this.ingredients = [...recipe.ingredients];
  }

  static deserialize(serialized) {
    return new Recipe({
      name: serialized.name,
      servingSize: serialized.servingSize,
      ingredients: serialized.ingredients.map(e => Ingredient.deserialize(e)),
    });
  }

  /** @param {Recipe} recipe */
  static copy(recipe) {
    return new Recipe({
      name: recipe.name,
      servingSize: recipe.servingSize,
      ingredients: recipe.ingredients,
    });
  }
}

module.exports = Recipe;
