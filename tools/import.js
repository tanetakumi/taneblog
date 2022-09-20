const path = require('path')
const XLSX = require('xlsx')

function main () {
  const source = path.join(__dirname, 'Book1.xlsx')
  const workbook = XLSX.readFile(source) // <1>
  const sheet = workbook.Sheets[workbook.SheetNames[0]] // <2>
  const rows = XLSX.utils.sheet_to_json(sheet, {header: 1}) // <3>

  console.log(rows)
}

main();