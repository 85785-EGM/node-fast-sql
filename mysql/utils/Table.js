const Row = require('./Row')
const Column = require('./Column')

const D = '`'

class Table {
  constructor (name, columnKeys) {
    /** @private */
    this._name = name
    /** @private */
    this._tableJoin = []
    /** @private */
    this._tableJoinClass = []
    this.columnKeys = columnKeys
    this.row = new Row(this)
    this.columns = {}

    for (const name of columnKeys) this.columns[name] = new Column(this, name)
  }

  get name () {
    return `${D}${this._name}${D}`
  }

  /** @returns {import("./Column.js")} */
  getColumn (name) {
    return this.columns[name]
  }

  /**
   * 如果没有第三参数，需要传入 Column.equalColumn 的返回值\
   * 如果传入第三参数，判断本表和传入表的列
   * @param {Table} table
   * @param {String} condition
   * @param {String} condition
   * @returns
   */
  joinLeft (table, condition1, condition2) {
    this._tableJoinClass.push(table)
    if (condition2) {
      const condition = this.getColumn(condition1).equalColumn(
        table.getColumn(condition2)
      )
      this._tableJoin.push(`RIGHT JOIN ${table.name} ON ${condition}`)
    } else {
      this._tableJoin.push(`LEFT JOIN ${table.name} ON ${condition1}`)
    }
  }

  joinRight (table, condition1, condition2) {
    this._tableJoinClass.push(table)
    if (condition2) {
      const condition = this.getColumn(condition1).equalColumn(
        table.getColumn(condition2)
      )
      this._tableJoin.push(`RIGHT JOIN ${table.name} ON ${condition}`)
    } else {
      this._tableJoin.push(`RIGHT JOIN ${table.name} ON ${condition1}`)
    }
  }

  clone () {
    return new this.constructor(this._name, this.columnKeys)
  }

  showColumns (...columnNames) {
    this.showTableColumns(this._name, ...columnNames)
  }

  showColumnAs (columnName, asName) {
    this.showTableColumns(this._name, columnName, asName)
  }

  showTableColumns (tableName = this._name, ...columnNames) {
    const table = [this, ...this._tableJoinClass].find(
      ({ _name }) => _name === tableName
    )
    columnNames.forEach(n => table.getColumn(n)?.show())
  }

  showTableColumnAs (tableName = this._name, columnName, asName) {
    const table = [this, ...this._tableJoinClass].find(
      ({ _name }) => _name === tableName
    )
    table.getColumn(columnName).show(asName)
  }

  /**
   * 返回匹配的行，并按column输出
   * @param column * 输出所有列
   *  */
  select (column) {
    if (column === '*') {
      return `SELECT * FROM ${this.name} ${this.tableJoin} WHERE ${this.row.sql}`
    } else {
      const columnName = [this, ...this._tableJoinClass]
        .flatMap(({ columns }) => {
          return Object.values(columns).map(({ showName }) => showName)
        })
        .filter(n => n)
        .join(', ')
      return `SELECT ${columnName} FROM ${this.name} ${this.tableJoin} WHERE ${this.row.sql}`
    }
  }
  /**
   * 插入行
   * @param columns 列的name列表，不能为空
   * @param ...values 值列表，不能为空
   *  */
  insert (columns = [], ...values) {
    const insertValue = values
      .map(value => {
        return `(${value.map(v => JSON.stringify(v)).join(',')})`
      })
      .join(',')
    return `INSERT ${this.name} (${columns.join(',')}) VALUES ${insertValue}`
  }
  /**
   * 删除选中的行
   *  */
  delete () {
    return `DELETE FROM ${this.name} WHERE ${this.row.condition}`
  }
  /**
   * 更新选中的行
   *  */
  update (columns = [], values = []) {
    const equalSql = columns.map((c, i) => this.getColumn(c).set(values[i]))
    return `UPDATE ${this.name} SET ${equalSql.join(',')} WHERE ${
      this.row.condition
    }`
  }

  get tableJoin () {
    return this._tableJoin.join(' ')
  }
}

module.exports = Table
