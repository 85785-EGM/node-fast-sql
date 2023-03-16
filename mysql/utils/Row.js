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

    this.filterOr = this._filterOr.bind(this, 'OR')
    this.filterAnd = this._filterAnd.bind(this, 'AND')
    this.retainOr = this._retainOr.bind(this, 'OR')
    this.retainAnd = this._retainAnd.bind(this, 'AND')
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
  _filterOr (before, ..._condition) {
    if (this._condition.length > 0) this._condition.push(before)
    let i = 0,
      count = _condition.length - 1
    if (count > 0) this._condition.push('(')
    for (; i < count; i++) this._condition.push(_condition[i], 'OR')
    this._condition.push(_condition[i])
    if (count > 0) this._condition.push(')')
    return this
  }
  _filterAnd (before, ..._condition) {
    if (this._condition.length > 0) this._condition.push(before)
    let i = 0,
      count = _condition.length - 1
    if (count > 0) this._condition.push('(')
    for (; i < count; i++) this._condition.push(_condition[i], 'AND')
    this._condition.push(_condition[i])
    if (count > 0) this._condition.push(')')
    return this
  }

  /**
   * 保留不符合条件的
   *  */
  _retainOr (before, ..._condition) {
    if (this._condition.length > 0) this._condition.push(before)
    let i = 0,
      count = _condition.length - 1
    if (count > 0) this._condition.push('(')
    for (; i < count; i++) this._condition.push('NOT', _condition[i], 'OR')
    this._condition.push('NOT', _condition[i])
    if (count > 0) this._condition.push(')')
    return this
  }
  _retainAnd (before, ..._condition) {
    if (this._condition.length > 0) this._condition.push(before)
    let i = 0,
      count = _condition.length - 1
    if (count > 0) this._condition.push('(')
    for (; i < count; i++) this._condition.push('NOT', _condition[i], 'AND')
    this._condition.push('NOT', _condition[i])
    if (count > 0) this._condition.push(')')
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
  orderBy (column, order) {
    if (!column?.name) this._order = []
    this._order = [column.name, order.toUpperCase()]
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
