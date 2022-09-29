const D = '`'

class Column {
  constructor (table, name) {
    /** @private */
    this._name = name
    /** @private */
    this._table = table
    this.showName = null
  }

  get name () {
    return `${this._table.name}.${D}${this._name}${D}`
  }

  isnull () {
    return `ISNULL(${this.name})`
  }
  equalColumn (column) {
    return `${this.name}=${column.name}`
  }
  equal (value) {
    value = JSON.stringify(value)
    return `${this.name}=${value}`
  }
  show (name = undefined) {
    if (!name) this.showName = this.name
    else this.showName = `${this.name} AS ${D}${name}${D}`
  }
  hide () {
    this.showName = null
  }
  set (value) {
    value = JSON.stringify(value)
    return `${this.name}=${value}`
  }
}

module.exports = Column
