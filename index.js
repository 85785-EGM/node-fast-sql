const Mysql = require('./mysql')
const mysqlConfig = require('./config/mysql.json')

const mysql = new Mysql(mysqlConfig)

async function main () {
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
  console.log(await mysql.query(sql))
}

main()