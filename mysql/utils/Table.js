const Row = require('./Row')
const Column = require('./Column')

class Table {
  constructor (columnKeys) {
    this._columnKeys = columnKeys
    this._row = new Row(this)

    for (const name of columnKeys) this[name] = new Column(this, name)
  }

  get columns () {
    return this._columns
  }

  get row () {
    return this._row
  }

  get operation () {
    return {
      select: this._select,
      insert: this._insert,
      remove: this._remove,
      update: this._update
    }
  }

  _select () {}
  _insert () {}
  _remove () {}
  _update () {}
}

module.exports = Table
