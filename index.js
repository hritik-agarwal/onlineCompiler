const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');
const ejs = require('ejs');
const { mainModule } = require('process');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {});
});

app.post('/', (req, res) => {
  fs.writeFile('bro.cpp', req.body.codeArea, () => {
    fs.writeFile('input.txt', req.body.inputArea, () => {
      exec("g++ bro.cpp -o bro", (err, stdout, stderr) => {
        if (err) res.send(stderr);
        else exec(".\\bro < input.txt", (err, stdout, stderr) => {
          if (err) res.send(stderr);
          else {
            res.render('output', { stdout: stdout });
          }
        })
      })
    })
  })
});

app.listen(3000, () => console.log("Serving running at port 3000"));