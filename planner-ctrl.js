const Ingredient = require('./ingredient');
const Meal = require('./meal');
const Recipe = require('./recipe');
const RecipeSvc = require('./recipe-service');

class PlannerCtrl {
  /** @param {RecipeSvc} recipeSvc */
  constructor(recipeSvc) {
    /** @type {Recipe[]} */
    this.recipes = recipeSvc.list();
    /** @type {Meal[]} */
    this.meals = [];
    /** @type {Recipe} */
    this.selectedRecipe = null;
    /** @type {number} */
    this.selectedRecipeServingSize = 1;
    /** @type {Ingredient[]} */
    this.ingredients = [];
  }

  add() {
    if (this.selectedRecipe) {
      this.meals.push(new Meal({ recipe: this.selectedRecipe, servingSize: this.selectedRecipeServingSize }));
      this.selectedRecipe = null;
      this.selectedRecipeServingSize = 1;
      this.onChange();
    }
  }

  /** @param {Meal} meal */
  remove(meal) {
    this.meals.splice(this.meals.findIndex(e => e === meal), 1);
    this.onChange();
  }

  onChange() {
    /** @type {Map<string,Ingredient>} */
    const map = new Map();
    this.meals.forEach(meal => {
      meal.getIngredients().forEach(e => {
        let ingredient = map.get(e.hash());
        if (!ingredient) {
          ingredient = new Ingredient({
            name: e.name,
            unit: e.unit,
            amount: 0,
          });
          map.set(e.hash(), ingredient);
        }
        ingredient.amount += e.amount;
      });
    });
    this.ingredients = Array.from(map.values()).sort((a, b) => a.hash().localeCompare(b.hash()));
  }
}

PlannerCtrl.$inject = ['recipeSvc'];

module.exports = PlannerCtrl;
