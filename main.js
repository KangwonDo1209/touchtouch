const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

let count = 0;

// 정적 파일 경로 설정
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    console.log(`count is ${++count}`);
    res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.listen(port, () => {
    console.log(`My App listening on port ${port}`);
    count = 0;
});
