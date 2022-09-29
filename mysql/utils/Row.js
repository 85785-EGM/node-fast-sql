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

  clear () {
    this._condition = []
    this._limit = []
    this._order = []
    return this
  }

  /**
   * 保留符合条件的
   *  */
  filter (affair) {
    this._condition.push(affair)
    return this
  }
  filterOr (..._condition) {
    let i = 0,
      count = _condition - 1
    for (; i < count; i++) this._condition.push(_condition[i], 'OR')
    this._condition.push(_condition[i])
    return this
  }
  filterAnd (..._condition) {
    let i = 0,
      count = _condition - 1
    for (; i < count; i++) this._condition.push(_condition[i], 'AND')
    this._condition.push(_condition[i])
    return this
  }

  /**
   * 保留不符合条件的
   *  */
  retain () {
    this._condition.push('NOT', affair)
    return this
  }
  retainOr () {
    let i = 0,
      count = _condition - 1
    for (; i < count; i++) this._condition.push('NOT', _condition[i], 'OR')
    this._condition.push(_condition[i])
    return this
  }
  retainAnd () {
    let i = 0,
      count = _condition - 1
    for (; i < count; i++) this._condition.push('NOT', _condition[i], 'AND')
    this._condition.push(_condition[i])
    return this
  }

  /**
   * 限制行数
   *  */
  limit (start, end) {
    this._limit = [start, end]
    return this
  }
  /**
   * 排序
   *  */
  order (column, order) {
    this._order = [column.toString(), order.toUpperCase()]
    return this
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
