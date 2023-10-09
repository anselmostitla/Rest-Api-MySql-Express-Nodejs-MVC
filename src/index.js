const express = require("express")
const {connector, pool} = require('./db/initDB')
const router = require('./routes/rest.router')

require('dotenv').config()

const app = express()

// app.get('/ping', async(req, res) => {
//   const [result] = await pool.query('SELECT "Pong" AS result')
//   res.json(result[0])
// })

app.use(express.json())
app.use("/", router)
app.use((req, res, next) => {
  res.status(404).json("Page not found")
})

PORT=process.env.PORT || 4500

app.listen(PORT, () => {
  // connector()
  console.log(`Server running on port ${PORT}`) 
})

 