const Mysql = require('./mysql')
const mysqlConfig = require('./config/mysql.json')

const mysql = new Mysql(mysqlConfig)

async function select () {
  await mysql.waitConnect()

  const main = mysql.getTable('order')
  const column = main.getColumn('id')
  const row = main.row

  main.joinLeft(mysql.getTable('doctor'), 'doctor_id', 'id')
  row.filter(column.equal(504))

  main.showColumns('id', 'number')
  main.showTableColumns('doctor', 'name')
  main.showTableColumnAs('doctor', 'name', 'doctor_name')

  const sql = main.select()
  const conn = await mysql.getConnect()
  console.log(await conn.queryOnce(sql))
  conn.release()
}

async function update () {
  await mysql.waitConnect()

  const main = mysql.getTable('order')
  const column = main.getColumn('id')
  const row = main.row

  row.filter(column.equal(504))

  const sql = main.update(['pull_date'], ['NOW()'])

  const conn = await mysql.getConnect()
  console.log(await conn.query(sql))
  conn.release()
}

async function remove () {
  await mysql.waitConnect()

  const main = mysql.getTable('order')
  const column = main.getColumn('id')
  const row = main.row

  row.filter(column.equal(440))

  const sql = main.delete()

  const conn = await mysql.getConnect()
  console.log(await conn.query(sql))
  conn.release()
}

async function insert () {
  await mysql.waitConnect()

  const main = mysql.getTable('password')

  const sql = main.insert(
    ['email', 'pswd'],
    ['12345', 'asdf1234'],
    ['54321', 'asdf1234']
  )

  const conn = await mysql.getConnect()
  console.log(await conn.query(sql))
  conn.release()
}
insert()
