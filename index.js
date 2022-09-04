const express = require('express');
const { exec } = require('child_process')
const path = require('path')
const ip = require('ip')

const app = express();
const serverAddress = path.join(__dirname, 'minecraft_server.1.16.1.jar')

app.listen(process.env.PORT || 3007, (port) => {
  console.log(`Example app listening on port ${port}`)

  const child = exec(
    `java -Xmx1024M -Xms1024M -jar ${serverAddress} nogui`,
    (error, stdout, stderr) => {
      console.log('load.')

      console.log('stdout: ' + stdout)
      console.log('stderr: ' + stderr)

      if (error !== null) {
        console.log('exec error: ' + error)
      }
    }
  )

  console.log(child)
});

app.get('/', (req, res) => {
  res.send(`hello world, ${ip.address()}`);
})

module.exports = app
