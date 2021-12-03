const fs = require('fs')
const path = require('path')
const router = require('./router')
const utf8 = 'utf-8'

const roomsFileName = path.join(__dirname, 'rooms.json')
const studentsFileName = path.join(__dirname, 'students.json')

module.exports = {
  getRooms,
  getStudents,
  getRoomsWithStudents
}

function getRoomsWithStudents(fnc) {
  // get rooms
  getRooms((err, roomObject) => {
    if (err) {
      fnc(new Error({ message: err.message }))
    } else {
      // get students
      getStudents((err, studentsNames) => {
        if (err) {
          fnc(new Error({ message: err.message }))
        }
        else {
          let index = 0
          const roomsWithStudents = roomObject.rooms.map((ele) => {
            return { ...ele, student1: studentsNames[index++], student2: studentsNames[index++]}
        })
          roomObject.rooms = roomsWithStudents
          fnc(null, roomObject)
        }
      })
    }
  })
}

// return JSON object of rooms
function getRooms(fnc) {
  //read the data.json file using fs.readFile
  fs.readFile(roomsFileName, utf8, (err, contents) => {
    if (err) {
      // error in reading the file
      fnc(new Error("Failed in reading the file"))
    } else {
      try {
        // error in parsing the string data into a JSON object
        const jsonObject = JSON.parse(contents)
        fnc(null, jsonObject)
      } catch (parseError) {
        fnc(new Error("Failed in parsing the JSON object"))
      }
    }
  })
}

// return JSON object of rooms
function getStudents(fnc) {
  //read the data.json file using fs.readFile
  fs.readFile(studentsFileName, utf8, (err, contents) => {
    if (err) {
      // error in reading the file
      fnc(new Error("Failed in reading the file"))
    } else {
      let studentObject = {}
      try {
        // error in parsing the string data into a JSON object
        studentObject = JSON.parse(contents)
      } catch (parseError) {
        fnc(new Error("Failed in parsing the JSON object"))
      }
      const studentNames = studentObject.students.map((ele) => ele.name)
      // using randomiser
      const randomisedStudentNames = randomise(studentNames)
      // return students
      fnc(null, randomisedStudentNames)
    }
  })
}

// randomiser
function randomise(name) {
  for (let i = name.length - 1; i >= 0; i--) {
    const randomI = Math.floor(Math.random() * (i + 1))
    const currentStudent = name[randomI]
    name[randomI] = name[i]
    name[i] = currentStudent
  }
  return name
}