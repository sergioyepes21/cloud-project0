const express = require('express')
const app = express()
const port = 3000
const DbConnection = require('./db_connection').default

app.get('/', async (req, res) => {
  console.log(DbConnection());
  
  res.send(await DbConnection().getUsers())
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})