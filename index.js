const express = require('express')
const ip = require('ip')
const {JavaCaller} = require('java-caller');

const app = express()

const java = new JavaCaller({
  rootPath: __dirname,
  jar: 'mcserver.jar',
});

app.listen(process.env.PORT || 3007, (data) => {
  console.log(`Example app listening on port ${data}`)
})

app.get('/', (req, res) => {
  java.run(['-Xmx1024M', '-Xms1024M', 'nogui'], { detached: true }).then((data) => {
    console.log('success', data)
    res.send(`SUCCESS 123hello, ${ip.address()} ${JSON.stringify(data)}`)
  }).catch(err => {
    res.send(`ERROR 123hello, ${ip.address()} ${err}`)
  })
})

module.exports = app
