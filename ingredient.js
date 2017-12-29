class Ingredient {
  constructor(/** @type {{ name:string, amount:number, unit:string }} */ { name, amount = 1, unit = 'each' }) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;
  }

  /** @return {*} */
  serialize() {
    return {
      name: this.name,
      amount: this.amount,
      unit: this.unit,
    };
  }

  hash() {
    return `${this.name}_${this.unit}`;
  }

  static deserialize(serialized) {
    return new Ingredient({
      name: serialized.name,
      amount: serialized.amount,
      unit: serialized.unit,
    });
  }
}

module.exports = Ingredient;
