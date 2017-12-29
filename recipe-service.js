const Recipe = require('./recipe');

// TODO: rename to RecipeService
class RecipeSvc {
  constructor() {
    /** @type {Recipe[]} */
    this.recipes = [];
  }

  /** @return {Recipe[]} */
  list() {
    return [...this.recipes].sort((a, b) => a.name.localeCompare(b.name));
  }

  /** @param {Recipe} recipe */
  remove(recipe) {
    this.recipes.splice(this.recipes.findIndex(e => e === recipe), 1);
  }

  create() {
    this.recipes.push(new Recipe({}));
  }

  /**
   * @param {string} name
   * @return {Recipe}
   */
  get(name) {
    return Recipe.copy(this.recipes.find(e => e.name === name));
  }

  persist() {
    localStorage.setItem('recipes', JSON.stringify(this.generateExport()));
  }

  load() {
    const serialized = localStorage.getItem('recipes');
    if (serialized) {
      this.recipes = JSON.parse(serialized).map(e => Recipe.deserialize(e));
    }
  }

  /** @param {*[]} json */
  import(json) {
    const importedRecipes = json.map(e => Recipe.deserialize(e));
    for (const importedRecipe of importedRecipes) {
      const existingRecipe = this.recipes.find(e => e.name === importedRecipe.name);
      if (existingRecipe) {
        existingRecipe.merge(importedRecipe);
      } else {
        this.recipes.push(importedRecipe);
      }
    }
    this.persist();
  }

  generateExport() {
    return this.recipes.map(e => e.serialize());
  }
}

module.exports = RecipeSvc;
