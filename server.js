require('dotenv').config()

const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();

app.use(express.static(path.join(__dirname, 'pages')));

app.get("/", (req, res) => {
  fs.readFile("./pages/index.html", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
})

// サーバーを起動
const server = app.listen(3000, () => {
    console.log(`サーバーを開きました`);
  });

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('❌ ポート3000は既に使用されています');
    console.error('別のプロセスを終了するか、別のポートを使用してください');
    process.exit(1);
  } else {
    throw err;
  }
});
  
  if (process.env.TOKEN == undefined || process.env.TOKEN == "") {
    console.log("TOKENを設定してください");
  }

  require('./main.js')