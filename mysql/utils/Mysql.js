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

    mysqlConnect.waitFunc.then(this.init.bind(this))
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

  async init () {
    let result = await this.query('show tables')

    const tables = result.reduce((pre, current) => {
      pre.push(...Object.values(current))
      return pre
    }, [])

    tables.forEach(async tableName => {
      const query = await this.query(
        'select * from `' + tableName + '` limit 0,1'
      )
    })
  }
}

module.exports = Mysql
