const Table = require('./Table')

function parseKey (key) {
  return (key.match(/_[a-z]/g) ?? [])
    .map(s => s.replace('_', '').toUpperCase())
    .reduce((r, v) => {
      return r.replace(`_${v.toLowerCase()}`, v)
    }, key)
}

class Mysql {
  constructor (mysqlConnect) {
    this._mysqlConnect = mysqlConnect
    this.table = {}

    this.waitFunc = this.init()
  }

  get query () {
    const mysql = this._mysqlConnect.getConnObject()

    return async function (...args) {
      const _mysql = await mysql

      return new Promise(async (resolve, reject) => {
        let result = null
        let err = false
        try {
          result = await _mysql.query(...args)
        } catch (e) {
          result = e
          err = true
        }
        _mysql.release()
        if (err) reject(result)
        else resolve(result)
      })
    }
  }

  get queryOnce () {
    const mysql = this._mysqlConnect.getConnObject()

    return async function (...args) {
      const _mysql = await mysql

      return new Promise(async (resolve, reject) => {
        let result = null
        let err = false
        try {
          result = await _mysql.queryOnce(...args)
        } catch (e) {
          result = e
          err = true
        }
        _mysql.release()
        if (err) reject(result)
        else resolve(result)
      })
    }
  }

  async init () {
    await this._mysqlConnect.waitFunc
    let result = await this.query('show tables')

    const tables = result.reduce((pre, current) => {
      pre.push(...Object.values(current))
      return pre
    }, [])

    await Promise.all(
      tables.map(async tableName => {
        const row = await this.query('DESC `' + tableName + '`')
        const columns = row.map(({ Field }) => Field)
        this.table[tableName] = new Table(tableName, columns)
      })
    )
  }
}

module.exports = Mysql
