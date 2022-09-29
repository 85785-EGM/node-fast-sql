const MysqlConnect = require('./utils/MysqlConnect')
const _Mysql = require('./utils/Mysql')

class Mysql {
  constructor (config) {
    /** @private */
    this._mysqlConnect = new MysqlConnect(config)
    /** @private */
    this._mysql = new _Mysql(this._mysqlConnect)
  }

  async waitConnect () {
    await this._mysqlConnect.waitFunc
    await this._mysql.waitFunc
  }

  /** @returns {import("./utils/Table.js")} */
  getTable (name) {
    return this._mysql.table[name]
  }

  async query (sql) {
    return await this._mysql.query(sql)
  }

  async getConnect () {
    return await this._mysqlConnect.getConnObject()
  }
}

module.exports = Mysql
