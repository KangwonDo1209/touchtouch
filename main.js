const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

let temperture = 22;
let min = 16;
let max = 30;

// 정적 파일 경로 설정
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    // 모든 클라이언트에 카운트 업데이트 전송
    io.emit("updateTemperture", temperture);
    // home.html 파일 전송
    res.sendFile(path.join(__dirname, "public", "home.html"));
});

io.on("connection", (socket) => {
    socket.emit("updateTemperture", temperture); // 현재 카운트를 클라이언트에 전송

    // 이벤트 처리
    socket.on("incrementTemperture", (value) => {
        if (max > temperture) {
            temperture += value;
            io.emit("updateTemperture", temperture);
            console.log(temperture);
        }
    });
    socket.on("decrementTemperture", (value) => {
        if (min < temperture) {
            temperture -= value;
            io.emit("updateTemperture", temperture);
            console.log(temperture);
        }
    });
});

server.listen(port, () => {
    console.log(`My App listening on port ${port}`);
});
