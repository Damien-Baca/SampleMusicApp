import "./styles.css";
import { button } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [songs] = useState([
    {
      title: "Alone",
      artist: "COLOR OUT",
      album: "Alone",
      img: "./img/AloneColorOut.jpg",
      audio_src: "./src/AloneColorOut.mp3"
    },
    {
      title: "Change Your Mind",
      artist: "BJ WILBANKS",
      album: "BJ WILBANKS",
      img: "./img/ChangeYourMind.jpg",
      audio_src: "./src/ChangeYourMind.mp3"
    },
    {
      title: "The Deep",
      artist: "ANITEK",
      album: "DEADSPACE",
      img: "./img/TheDeep.jpg",
      audio_src: "./src/TheDeep.mp3"
    }
  ]);

  const audioElement = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  });

  const SkipSong = (forwards = true) => {
    if (forwards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp++;
        if (temp > songs.length - 1) {
          temp = 0;
        }
        return temp;
      });
    } else {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp--;
        if (temp < 0) {
          temp = songs.length - 1;
        }
        return temp;
      });
    }
  };

  return (
    <div className="App">
      {/* Audio */}
      <audio src={songs[currentSongIndex].audio_src} ref={audioElement}></audio>

      {/* Player Display */}
      <div>
        <img
          src={songs[currentSongIndex].img}
          alt={songs[currentSongIndex].title}
        />
        <h3>{songs[currentSongIndex].title}</h3>
        <h4>
          {songs[currentSongIndex].artist} - {songs[currentSongIndex].album}
        </h4>
      </div>

      {/* Player Control Panel */}
      <button onClick={() => SkipSong(false)}>
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
      </button>
      <button onClick={() => SkipSong()}>
        <FontAwesomeIcon icon={faForward} />
      </button>
    </div>
  );
}

export default App;
