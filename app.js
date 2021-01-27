const express = require('express')
const app = express()
const port = 3000
const index = require('./routers/index')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.set('trust proxy', 1)
app.use(session ({
  secret: 'hacktivcat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true}
}))

app.use('/', index)

app.listen(port, () => {
  console.log("This app listen on port", port);
})