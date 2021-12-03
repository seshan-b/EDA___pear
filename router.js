const express = require('express')
const utils = require('./utils')
const router = express.Router()

module.exports = router

/**********************************/
// draw
/**********************************/
router.get('/', (req, res) => {
  utils.getRoomsWithStudents((err, roomsWithStudents) => {
    if (err) {
      res.status(500).send('Error!')
      return
    }
    else {
      res.render('result', roomsWithStudents)
    }
  })
})