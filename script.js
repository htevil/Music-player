let currentMusic = 0

const music  = document.querySelector("#audio");
const songName  = document.querySelector("#track-name");
const artistName  = document.querySelector("#track-artist");
const coverImg  = document.querySelector("#cover_img");
const currentTime  = document.querySelector("#current-time");
const musicDuration = document.querySelector("#song-duration");
const seekBar = document.querySelector("#progress");
const forwardBtn = document.querySelector("#prev-track");
const playBtn = document.querySelector("#play-button");
const backwardBtn = document.querySelector("#next-track");


playBtn.addEventListener('click', () => {
    if (music.paused){
        music.play();
        playBtn.src = "./scr/icon/Stop_fill.svg"
    }else{
        music.pause();
        playBtn.src = "./scr/icon/Play_fill.svg"
    }
});

// set music
const setMusic = (i) => {    
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImg.src = song.cover;

    currentTime.innerHTML= "00.00";
    setTimeout( () => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300); 
    
}

setMusic(0);

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`
    }
    return `${min} : ${sec}`;
}

//seekbar
setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        playBtn.src = "./scr/icon/Play_fill.svg"
        forwardBtn.click();
    }
}, 300)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

const playMusic = () => {
    playBtn.click();  
}

forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length-1){
        currentMusic = 0;
    }else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
})

backwardBtn.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length-1;
    }else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
})