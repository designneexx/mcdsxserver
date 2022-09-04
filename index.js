const express = require('express')
const { exec } = require('child_process')
const path = require('path')
const ip = require('ip')

const app = express()
const serverAddress = path.join(__dirname, 'minecraft_server.1.16.1.jar')

app.listen(process.env.PORT || 3007, (port) => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
  const child = exec(
    `java -Xmx1024M -Xms1024M -jar ${serverAddress} nogui`,
    (error, stdout, stderr) => {
      console.log('load.')

      if (error) {
        return res.send(`hello world, ${ip.address()} ${error}`)
      }

      if (stderr) {
        return res.send(`hello world, ${ip.address()} ${stderr}`)
      }

      if (stdout) {
        return res.send(`hello world, ${ip.address()} ${stdout}`)
      }

      res.send(`hello world, ${ip.address()} ${stdout}`)
    }
  )

  console.log(child)
})

module.exports = app
