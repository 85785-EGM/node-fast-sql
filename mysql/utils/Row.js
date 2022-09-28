export class Row {
  constructor (table) {
    this._table = table
    this.affairs = []
  }

  /**
   * 保留符合条件的
   *  */
  filter () {}
  filterOr () {}
  filterAnd () {}

  /**
   * 保留不符合条件的
   *  */
  retain () {}
  retainOr () {}
  retainAnd () {}

  /**
   * 限制行数
   *  */
  limit () {}
  /**
   * 排序
   *  */
  order () {}
}

module.exports = Column
