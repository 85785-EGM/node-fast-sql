class Column {
  constructor (table, name) {
    this._name = name
    this._table = table
  }

  get name () {
    return this._name
  }

  isnull () {}
  equal () {}
  show () {}
  set () {}
}

module.exports = Column
