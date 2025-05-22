console.log("Welcome to my Museek app!");

// Initialize
let songIndex = 0;
let audioElement = new Audio("Song/PrettyLittleBaby.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let audio =document.getElementById("audio");

// Song list
let songs = [
  {
    songName: "Pretty Little Baby",
    artist: "The Shirelles",
    duration: "2:30",
    filePath: "Song/PrettyLittleBaby.mp3",
    coverPath: "covers/PrettyLittleBaby.jpeg",
  },
  {
    songName: "Laal Pari",
    artist: "Jonita Gandhi",
    duration: "3:10",
    filePath: "Song/LaalPari.mp3",
    coverPath: "covers/LaalPari.jpeg",
  },
  {
    songName: "Ek Jaisa Haal Tera Mera",
    artist: "Lata Mangeshkar",
    duration: "2:50",
    filePath: "Song/ekJaisaHaalTeraMera.mp3",
    coverPath: "covers/ekJaisaHaalTeraMera.jpg",
  },
  {
    songName: "Maaye",
    artist: "Anuv Jain",
    duration: "3:20",
    filePath: "Song/Maaye.mp3",
    coverPath: "covers/Maaye.jpeg",
  },
  {
    songName: "Ishq Hai",
    artist: "Ritviz",
    duration: "2:58",
    filePath: "Song/ishqHai.mp3",
    coverPath: "covers/ishqhi.webp",
  },
  {
    songName: "Ve Haniya",
    artist: "Arijit Singh",
    duration: "3:12",
    filePath: "Song/VeHaniya.mp3",
    coverPath: "covers/VeHaniya.jpg",
  },
];

audioElement.addEventListener("ended", () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    })
// Populate song UI
songItems.forEach((element, i) => {
  element.querySelector("img").src = songs[i].coverPath;
  element.querySelector(".songName").innerText = songs[i].songName;
  let playButton = element.querySelector(".songItemPlay");
  playButton.setAttribute("data-index", i); // important
});

// Reset all play icons
const makeAllPlays = () => {
  document.querySelectorAll(".songItemPlay").forEach((el) => {
    el.classList.remove("fa-pause-circle");
    el.classList.add("fa-play-circle");
  });
};

// Update current song icon
const updateCurrentSongPlayIcon = () => {
  makeAllPlays();
  let currentPlayBtn = document.querySelector(`.songItemPlay[data-index="${songIndex}"]`);
  if (currentPlayBtn) {
    currentPlayBtn.classList.remove("fa-play-circle");
    currentPlayBtn.classList.add("fa-pause-circle");
  }
};

// Load & Play a Song
const loadAndPlaySong = (index) => {
  if (index >= 0 && index < songs.length) {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    if (masterSongName) {
      masterSongName.innerText = songs[songIndex].songName;
    }
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
    gif.style.opacity = 1;
    updateCurrentSongPlayIcon();
  } 
};

// Master play/pause
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
    gif.style.opacity = 1;
    updateCurrentSongPlayIcon();
  } else {
    audioElement.pause();
    masterPlay.classList.replace("fa-pause-circle", "fa-play-circle");
    gif.style.opacity = 0;
    makeAllPlays();
  }
});

// Song progress
audioElement.addEventListener("timeupdate", () => {
  const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress || 0;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Song end
audioElement.addEventListener("ended", () => {
  masterPlay.classList.replace("fa-pause-circle", "fa-play-circle");
  gif.style.opacity = 0;
  makeAllPlays();
});

// SongItem play clicks
document.querySelectorAll(".songItemPlay").forEach((element) => {
  element.addEventListener("click", (e) => {
    let clickedIndex = parseInt(e.target.getAttribute("data-index"));
    if (clickedIndex === songIndex && !audioElement.paused) {
      audioElement.pause();
      e.target.classList.remove("fa-pause-circle");
      e.target.classList.add("fa-play-circle");
      masterPlay.classList.replace("fa-pause-circle", "fa-play-circle");
      gif.style.opacity = 0;
    } else {
      loadAndPlaySong(clickedIndex);
    }
  });
});

// Next
document.getElementById("next").addEventListener("click", () => {
  let nextIndex = (songIndex + 1) % songs.length;
  loadAndPlaySong(nextIndex);
});

// Previous
document.getElementById("previous").addEventListener("click", () => {
  let prevIndex = (songIndex - 1 + songs.length) % songs.length;
  loadAndPlaySong(prevIndex);
});
