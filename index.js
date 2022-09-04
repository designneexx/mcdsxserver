const express = require('express')
const { exec } = require('child_process')
const path = require('path')
const ip = require('ip')
const {JavaCaller} = require('java-caller');

const app = express()
const minecraftServerJar = path.join(__dirname, 'minecraft_server.1.16.1.jar')


app.listen(process.env.PORT || 3007, (data) => {
  console.log(`Example app listening on port ${data}`)
})

app.get('/', (req, res) => {
  const java = new JavaCaller({
    jar: 'minecraft_server.1.16.1.jar',
    javaType: 'jdk'
  });

  java.run(['-Xmx1024M', '-Xms1024M', 'nogui'], { detached: true }).then((data) => {
    console.log('success', data)
    res.send(`SUCCESS 123hello, ${ip.address()} ${JSON.stringify(data)}`)
  }).catch(err => {
    res.send(`ERROR 123hello, ${ip.address()} ${err}`)
  })
})

module.exports = app
