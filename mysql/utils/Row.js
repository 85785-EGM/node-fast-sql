const D = '`'

class Row {
  constructor (table) {
    /** @private */
    this._table = table
    /** @private */
    this._condition = []
    /** @private */
    this._limit = []
    /** @private */
    this._order = []
  }

  /**
   * 保留符合条件的
   *  */
  filter (affair) {
    this._condition.push(affair)
  }
  filterOr (..._condition) {
    let i = 0,
      count = _condition - 1
    for (; i < count; i++) this._condition.push(_condition[i], 'OR')
    this._condition.push(_condition[i])
  }
  filterAnd (..._condition) {
    let i = 0,
      count = _condition - 1
    for (; i < count; i++) this._condition.push(_condition[i], 'AND')
    this._condition.push(_condition[i])
  }

  /**
   * 保留不符合条件的
   *  */
  retain () {
    this._condition.push('NOT', affair)
  }
  retainOr () {
    let i = 0,
      count = _condition - 1
    for (; i < count; i++) this._condition.push('NOT', _condition[i], 'OR')
    this._condition.push(_condition[i])
  }
  retainAnd () {
    let i = 0,
      count = _condition - 1
    for (; i < count; i++) this._condition.push('NOT', _condition[i], 'AND')
    this._condition.push(_condition[i])
  }

  /**
   * 限制行数
   *  */
  limit (start, end) {
    this._limit = [start, end]
  }
  /**
   * 排序
   *  */
  order (column, order) {
    this._order = [column.toString(), order.toUpperCase()]
  }

  get condition () {
    return this._condition.join(' ')
  }

  get limit () {
    if (!this._limit.length) return ''
    return `LIMIT ${this._limit.join(',')}`
  }

  get order () {
    if (!this._order.length) return ''
    return `ORDER BY ${this._order.join(' ')}`
  }

  get sql () {
    return [this.condition, this.limit, this.order].join(' ')
  }
}

module.exports = Row
