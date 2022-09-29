# node-fast-sql
A relatively complex tool for quickly building sql code

## select
```javascript
const Mysql = require('node-fast-sql')
const mysqlConfig = require('./config/mysql.json')
/*{
  "host": "localhost",
  "user": "root",
  "password": "123456",
  "database": "workbench",
  "port": 3306
}*/

const mysql = new Mysql(mysqlConfig)

async function main () {
  // Wait for initialization to succeed
  // Get all tables and table structures automatically
  await mysql.waitConnect()
  // Get 'order' table
  const main = mysql.getTable('order')
  // Get the 'id' column in the 'order' table
  const column = main.getColumn('id')
  const row = main.row

  // Connect 'doctor' to the 'order' table on the left if 'order.doctor_id=doctor.id'
  main.joinLeft(mysql.getTable('doctor'), 'doctor_id', 'id')
  // Add judgment conditions ‘order.id=504’
  row.filter(column.equal(504))

  // Show order.id and order.number
  main.showColumns('id', 'number')
  // Show doctor.name
  // Must be after join table
  main.showTableColumns('doctor', 'name')
  // Show doctor.name as doctor_name
  main.showTableColumnAs('doctor', 'name', 'doctor_name')
  // Export sql
  const sql = main.select()
  const conn = await mysql.getConnect()
  console.log(await conn.queryOnce(sql))
  conn.release()
}

main()
```

## insert
```javascript
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
```

## update
```javascript
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
```

## delete
```javascript
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
```