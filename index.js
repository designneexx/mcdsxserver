const express = require('express')
const { exec } = require('child_process')
const path = require('path')
const ip = require('ip')
const {JavaCaller} = require('java-caller');

const app = express()
const minecraftServerJar = path.join(__dirname, 'minecraft_server.1.16.1.jar')

const java = new JavaCaller({
  jar: minecraftServerJar,
});


app.listen(process.env.PORT || 3007, (data) => {
  console.log(`Example app listening on port ${data}`)
})

app.get('/', (req, res) => {
  java.run(['-Xmx1024M', '-Xms1024M', 'nogui']).then((data) => {
    console.log('success', data)
    res.send(`123hello, ${ip.address()} ${data}`)
  }).catch(err => {
    res.send(`123hello, ${ip.address()} ${err}`)
  })
})

module.exports = app
