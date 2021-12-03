const express = require('express')
const hbs = require('express-handlebars')

const pearRouter = require('./router')
const utils = require('./utils')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))



// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

server.use('/draw', pearRouter)
module.exports = server

// show rooms
server.get('/', (req, res) => {
  // get the rooms
  const rooms = utils.getRooms((err, jsonObject) => {
    if (err) {
      res.status(500).render('error', {message:err.message})
    } else {
      res.render('home', jsonObject)
    }
  })
})