//
// This is only a SKELETON file for the 'Pascals Triangle' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Triangle {
  constructor(count) {
    this.count = count;
    this._rows = [[1]];
  }

  get lastRow() {
    const rows = this.rows;
    return rows[rows.length - 1];
  }

  get rows() {
    for(let i = 2; i <= this.count; i++) {
      const previousRow = this._rows[i - 2];
      let currentRow = [];
      for(let j = 0; j < i; j++) {
        if(j === 0 || j === i - 1) {
          currentRow[j] = 1;
        } else {
          currentRow[j] = previousRow[j - 1] + previousRow[j];
        }
      }
      this._rows.push(currentRow);
    }
    return this._rows;
  }
}
