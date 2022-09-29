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
  conditionShow (condition, name = '') {
    this.showName = `${condition} AS ${D}${name}${D}`
  }
  show (name = undefined) {
    if (!name) this.showName = this.name
    else this.showName = `${this.name} AS ${D}${name}${D}`
    return this
  }
  hide () {
    this.showName = null
    return this
  }
  set (value) {
    return `${this.name}=${value}`
  }

  clear () {
    this.showName = null
    return this
  }
}

module.exports = Column
