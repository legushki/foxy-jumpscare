const jumpscareSound = new Audio("modules/foxy-jumpscare/assets/jumpscare-sound.mp3");
const jumpscareGif = document.createElement("img");
jumpscareGif.src = "modules/foxy-jumpscare/assets/foxy-jumpscare.gif";
Object.assign(jumpscareGif.style, {
    position: "fixed",
    top: 0, left: 0,
    width: "100vw", height: "100vh",
    objectFit: "contain",
    pointerEvents: "none",
    zIndex: 100000
});

function playGifOverlay(duration = 1000) {
    document.body.appendChild(jumpscareGif);
    setTimeout(() => {
        let src = jumpscareGif.src;
        jumpscareGif.src = "";
        //firefox fix
        jumpscareGif.src = src.split("?")[0] + "?t=" + Date.now();
        jumpscareGif.remove();
    }, duration);
}

function playSound() {
    jumpscareSound.play();
    setTimeout(() => {
        jumpscareSound.pause();
        jumpscareSound.currentTime = 0;
    }, 1000);
}



function checkJumpscare() {
    if (parseInt(Math.random() * 10000) === 1) {
        game.socket.emit("module.foxy-jumpscare");
        handleJumpscare();
    }
}

Hooks.on("ready", () => {
    game.socket.on("module.foxy-jumpscare", () => {
        handleJumpscare();
    })
    if (game.user === game.users.activeGM)
        setInterval(checkJumpscare, 1000);
});

function handleJumpscare() {
    playGifOverlay();
    playSound();
}
