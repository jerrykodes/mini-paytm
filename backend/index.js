const { config } = require('dotenv')
const express = require('express')
const cors = require('cors')

const indexRoutes = require('./src/routes/index')
const connectDB = require('./src/configs/db')

const app = express()

config()
connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/v1', indexRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Server running' })
})

const port = process.env.PORT || 8000
app.listen(port, (err) => {
  if (err) {
    console.error('Error while running node server!!!')
  } else {
    console.log(`Application running on the ${port}`)
  }
})
