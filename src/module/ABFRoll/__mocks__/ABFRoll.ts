/**
 * Custom implementation of Roll from foundry.js
 * Test methods are unique methods used for unit testing
 */
export default class ABFRoll {
  _formula: string;
  data: {};

  _rolled = false;
  _total: number;

  results: (number | string)[];
  terms: DicePool[];

  // Test variable
  static nextValue: number;

  constructor(formula: string, data?: {}) {
    this._formula = formula;
    this.data = data;

    this.results = [];
    this.terms = [];
  }

  setNextValue(nextValue: number) {
    ABFRoll.nextValue = nextValue;
  }

  recalculateTotal() {
    this._total = this.getResults().reduce((prev, curr) => prev + curr);
  }

  get total() {
    return this._total;
  }

  getResults(): number[] {
    return this.results.map(res => parseInt(res.toString()));
  }

  evaluate() {
    if (this._rolled) throw new Error('Already rolled');

    const value = ABFRoll.nextValue ?? Math.floor(Math.random() * 100);
    const result = { result: value, active: true } as DiceTerm.Result;
    const results = { results: [result] } as DicePool;

    this.results.push(value);
    this.terms.push(results);

    this._total = this.getResults().reduce((val, curr) => val + curr);
    this._rolled = true;
    ABFRoll.nextValue = null;

    return this;
  }
}
