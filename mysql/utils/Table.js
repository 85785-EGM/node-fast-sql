const Row = require('./Row')
const Column = require('./Column')

const D = '`'

class Table {
  constructor (name, columnKeys) {
    this.name = name
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

  /**
   * 返回匹配的行，并按column输出
   * @param column * 输出所有列
   *  */
  _select (column = '*') {}
  /**
   * 插入行
   * @param columns 列对象列表，不能为空
   * @param ...values 值列表，不能为空
   *  */
  _insert (columns = [], ...values) {}
  /**
   * 删除选中的行
   *  */
  _remove () {}
  /**
   * 更新选中的行
   *  */
  _update () {}
}

module.exports = Table
