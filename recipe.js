const Ingredient = require('./ingredient');

class Recipe {
  constructor(/** @type {{ name:string, category:string, servingSize:number, ingredients:Ingredient[] }} */ { name, category, servingSize = 1, ingredients = [] }) {
    this.name = name;
    this.category = category;
    this.servingSize = servingSize;
    this.ingredients = ingredients;
  }

  /** @param {Recipe} recipe */
  merge(recipe) {
    this.category = recipe.category;
    this.servingSize = recipe.servingSize;
    this.ingredients = [...recipe.ingredients];
  }

  static deserialize(serialized) {
    return new Recipe({
      name: serialized.name,
      category: serialized.category,
      servingSize: serialized.servingSize,
      ingredients: serialized.ingredients.map(e => Ingredient.deserialize(e)),
    });
  }

  /** @param {Recipe} recipe */
  static copy(recipe) {
    return new Recipe({
      name: recipe.name,
      category: recipe.category,
      servingSize: recipe.servingSize,
      ingredients: recipe.ingredients,
    });
  }
}

module.exports = Recipe;
