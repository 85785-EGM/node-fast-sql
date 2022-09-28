const MysqlConnect = require('./utils/MysqlConnect')
const _Mysql = require('./utils/Mysql')

class Mysql {
  constructor (config) {
    this.mysqlConnect = new MysqlConnect(config)
    this._mysql = new _Mysql(this.mysqlConnect)
  }
}

module.exports = Mysql
