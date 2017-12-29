const RecipeSvc = require('./recipe-service');

class ImportExportCtrl {
  /** @param {RecipeSvc} recipeSvc */
  constructor(recipeSvc) {
    this.recipeSvc = recipeSvc;
    /** @type {string} */
    this.importText = null;
    /** @type {string} */
    this.exportText = null;
    /** @type {string} */
    this.importMessage = null;
    /** @type {boolean} */
    this.importError = false;
  }

  import() {
    if (this.importText) {
      try {
        this.recipeSvc.import(JSON.parse(this.importText));
        this.importMessage = 'Import success!';
        this.importError = false;
      } catch (e) {
        this.importMessage = `Error! ${e}`;
        this.importError = true;
      }
    }
  }

  generateExport() {
    this.exportText = JSON.stringify(this.recipeSvc.generateExport());
  }
}

ImportExportCtrl.$inject = ['recipeSvc'];

module.exports = ImportExportCtrl;
