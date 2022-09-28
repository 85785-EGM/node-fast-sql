const D = '`'

class Row {
  constructor (table) {
    this._table = table
    this.affairs = []
    this.join = []
  }

  joinLeft (table, equalAffair) {
    return `LEFT JOIN ${D}${table}${D} ON ${equalAffair}`
  }

  joinRight () {
    return `RIGHT JOIN ${D}${table}${D} ON ${equalAffair}`
  }

  /**
   * 保留符合条件的
   *  */
  filter (affair) {
    this.affairs.push(affair)
  }
  filterOr (...affairs) {
    let i = 0,
      count = affairs - 1
    for (; i < count; i++) this.affairs.push(affairs[i], 'OR')
    this.affairs.push(affairs[i])
  }
  filterAnd (...affairs) {
    let i = 0,
      count = affairs - 1
    for (; i < count; i++) this.affairs.push(affairs[i], 'AND')
    this.affairs.push(affairs[i])
  }

  /**
   * 保留不符合条件的
   *  */
  retain () {
    this.affairs.push('NOT', affair)
  }
  retainOr () {
    let i = 0,
      count = affairs - 1
    for (; i < count; i++) this.affairs.push('NOT', affairs[i], 'OR')
    this.affairs.push(affairs[i])
  }
  retainAnd () {
    let i = 0,
      count = affairs - 1
    for (; i < count; i++) this.affairs.push('NOT', affairs[i], 'AND')
    this.affairs.push(affairs[i])
  }

  /**
   * 限制行数
   *  */
  limit (start, end) {
    this._limit = ''
  }
  /**
   * 排序
   *  */
  order () {
    this._limit = ''
  }

  getAffair () {}
}

module.exports = Row
