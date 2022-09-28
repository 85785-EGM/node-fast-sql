const D = '`'
class Column {
  constructor (table, name) {
    this._name = name
    this._table = table
    this.quote = `${D}${this.tableName}${D}.${D}${this._name}${D}`
  }

  get name () {
    return this._name
  }

  get tableName () {
    return this._table.name
  }

  toString () {
    return this._name
  }

  isnull () {
    return `ISNULL(${this.quote})`
  }
  equalColumn (column) {
    return `${this.quote}=${column.toString()}`
  }
  equal (value) {
    value = JSON.stringify(value)
    return `${this.quote}=${value}`
  }
  show (name = undefined) {
    if (!name) return this.quote
    else return `${this.quote} AS ${name}`
  }
  set (value) {
    value = JSON.stringify(value)
    return `${this.quote}=${value}`
  }
}

module.exports = Column
