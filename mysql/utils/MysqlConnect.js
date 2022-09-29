const mysql = require('mysql')

async function delay (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function tryIt (func, count = 5, time = 50) {
  let error = new Error('no function')
  for (let i = 0; i < count; i++) {
    try {
      return await func()
    } catch (e) {
      console.log(e)
      error = e
    }
    await delay(time)
  }
  throw error
}

class MysqlConnect {
  constructor (config = {}) {
    this.retryTimes = 3
    this.waitTime = 500
    this.config = config
    this.createConnection()
  }

  async createConnection () {
    function func () {
      return mysql.createPool(this.config)
    }
    this.waitFunc = tryIt(func.bind(this), this.retryTimes, this.waitTime)
    this._pool = await this.waitFunc
  }

  get pool () {
    return this._pool
  }

  getConn () {
    return new Promise((resolve, reject) => {
      this.pool.getConnection(function (err, conn) {
        if (err) reject(err)
        else resolve(conn)
      })
    })
  }

  async getConnObject () {
    const conn = await this.getConn()
    const obj = {
      query (sql, data) {
        return new Promise((resolve, reject) => {
          conn.query(sql, data, function (error, result) {
            if (error) reject(error)
            else resolve(result)
          })
        })
      },
      queryOnce (sql, data) {
        return new Promise((resolve, reject) => {
          conn.query(sql, data, function (error, result) {
            if (error) reject(error)
            else resolve(result.shift())
          })
        })
      },
      release () {
        return conn.release()
      }
    }
    return obj
  }
}

module.exports = MysqlConnect
