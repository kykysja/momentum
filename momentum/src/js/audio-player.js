import sounds from "../assets/sounds/sounds";
import { getTimeCodeFromNum } from "./helpers";

const audioPlayer = document.querySelector(".audio-player");
const playListContainer = document.querySelector(".play-list");
const trackName = document.querySelector(".track-name");
const trackLength = document.querySelector(".length");
const playBtn = document.querySelector(".play");
const playNextBtn = document.querySelector(".play-next");
const playprevBtn = document.querySelector(".play-prev");
const timeline = audioPlayer.querySelector(".timeline");
const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
const volumeBtn = audioPlayer.querySelector(".volume-button");

export const setAudioPlayer = () => {
  let currentAudioNum = 0;
  let isPlay = false;

  const audio = new Audio();
  audio.src = sounds[currentAudioNum].src;

  for (let i = 0; i < sounds.length; i++) {
    const li = document.createElement("li");
    li.classList.add("play-item");
    li.textContent = sounds[i].title;
    playListContainer.append(li);
  }

  const playListItems = document.querySelectorAll(".play-item");

  const play = () => {
    playBtn.classList.add("pause");
    document.querySelector(".item-active").classList.add("play-mode");
    isPlay = true;
    audio.play();
  };

  const pause = () => {
    playBtn.classList.remove("pause");
    document.querySelector(".item-active").classList.remove("play-mode");
    isPlay = false;
    audio.pause();
  };

  const setActiveClass = () => {
    playListItems.forEach((item) => item.classList.remove("item-active"));
    playListItems[currentAudioNum].classList.add("item-active");
  };

  const handlePlayBtnClick = () => {
    setActiveClass();

    trackName.textContent = sounds[currentAudioNum].title;
    trackLength.textContent = getTimeCodeFromNum(sounds[currentAudioNum].duration);

    isPlay ? pause() : play();
  };

  const handleNextPrevAudioButtonsClick = () => {
    isPlay = false;

    if (event.target.classList.contains("play-next")) {
      currentAudioNum < 3 ? currentAudioNum++ : (currentAudioNum = 0);
    } else {
      currentAudioNum > 0 ? currentAudioNum-- : (currentAudioNum = 3);
    }

    audio.src = sounds[currentAudioNum].src;
    trackName.textContent = sounds[currentAudioNum].title;
    trackLength.textContent = getTimeCodeFromNum(sounds[currentAudioNum].duration);

    setActiveClass();
    play();
  };

  const handlePlayListItemClick = () => {
    if (event.target.classList.contains("play-item")) {
      setActiveClass();
      const clickedTrackNum = sounds.findIndex((el) => el.title === event.target.textContent);

      if (clickedTrackNum === currentAudioNum) {
        isPlay ? pause() : play();
      } else {
        currentAudioNum = clickedTrackNum;
        audio.src = sounds[currentAudioNum].src;
        trackName.textContent = sounds[currentAudioNum].title;
        trackLength.textContent = getTimeCodeFromNum(sounds[currentAudioNum].duration);

        setActiveClass();
        play();
      }
    }
  };

  const toggleVolumeMode = () => {
    const volumeEl = audioPlayer.querySelector(".volume-container .volume");
    audio.muted = !audio.muted;
    if (audio.muted) {
      volumeEl.classList.remove("volume-icon");
      volumeEl.classList.add("volume-icon-mute");
    } else {
      volumeEl.classList.add("volume-icon");
      volumeEl.classList.remove("volume-icon-mute");
    }
  };

  const updateCurrenTime = () => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = (event.offsetX / parseInt(timelineWidth)) * sounds[currentAudioNum].duration;
    audio.currentTime = timeToSeek;
  };

  const changeVolume = () => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = event.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + "%";
  };

  playBtn.addEventListener("click", handlePlayBtnClick);
  playNextBtn.addEventListener("click", handleNextPrevAudioButtonsClick);
  playprevBtn.addEventListener("click", handleNextPrevAudioButtonsClick);
  playListItems.forEach((item) => addEventListener("click", handlePlayListItemClick));
  volumeBtn.addEventListener("click", toggleVolumeMode);
  timeline.addEventListener("click", updateCurrenTime, false);
  volumeSlider.addEventListener("click", changeVolume, false);

  setInterval(() => {
    const progressBar = audioPlayer.querySelector(".progress");
    progressBar.style.width = (audio.currentTime / sounds[currentAudioNum].duration) * 100 + "%";
    audioPlayer.querySelector(".track-time .current").textContent = getTimeCodeFromNum(
      audio.currentTime,
    );
    if (audio.currentTime === sounds[currentAudioNum].duration) {
      playNextBtn.click();
    }
  }, 500);
};
