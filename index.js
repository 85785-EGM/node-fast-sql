const Mysql = require('./mysql')
const mysqlConfig = require('./config/mysql.json')

const mysql = new Mysql(mysqlConfig)
