const socket = io();
let audio = new Audio(`data/whitenoise.mp3`);
audio.loop = true;

// 서버로부터 카운트 업데이트 수신
socket.on("updateTemperture", (temperture) => {
    document.getElementById("countDisplay").innerText = temperture; // 카운트 업데이트
    audio.volume = calculateVolume(temperture);
});

// 온도 증가
function incrementTemperture() {
    socket.emit("incrementTemperture", 1);
}

// 온도 감소
function decrementTemperture() {
    socket.emit("decrementTemperture", 1);
}

function executeAudio() {
    if (audio.paused) {
        audio.play().then(() => {
            console.log("on");
        });
    } else {
        audio.pause();
        console.log("off");
    }
}

function calculateVolume(value) {
    return 2.0286 - 0.0643 * value;
}
