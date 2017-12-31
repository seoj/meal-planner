const Recipe = require('./recipe');

// TODO: rename to RecipeService
class RecipeSvc {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
    /** @type {Recipe[]} */
    this.recipes = null;
  }

  /** @return {Promise<Recipe[]>} */
  list() {
    if (this.recipes) {
      return this.$q.resolve([...this.recipes]);
    }
    return this.$http.get('https://storage.googleapis.com/elite-buttress-190723/recipes.json?')
      .then(response => {
        this.recipes = response.data.map(e => Recipe.deserialize(e)).sort((a, b) => a.name.localeCompare(b.name));
        return [...this.recipes];
      });
  }

  /**
   * @param {string} name
   * @return {Promise<Recipe>}
   */
  get(name) {
    return this.list().then(recipes => Recipe.copy(recipes.find(e => e.name === name)));
  }
}

RecipeSvc.$inject = ['$http', '$q'];

module.exports = RecipeSvc;
