import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAudioChunks, getAudioUrl } from "../../../redux/selectors";
import {
  setAudioElement,
  setCurrentLyrics,
  setShowLyrics,
} from "../../../redux/actions/action";
import PlayerButton from "./PlayerButton";
import ProgressBar from "./ProgressBar";
import Timeline from "./Timeline";
import { useRefHook } from "../../../custom-hooks";
import { secondToPercent } from "../../../helpers";

const Player = React.memo((props) => {
  const {
    audioUrl,
    audioChunks,
    setAudioElement,
    setShowLyrics,
    setCurrentLyrics,
  } = props;
  const [progressPercent, setProgressStatus] = useState(0);
  const [audioElement, setAudio] = useState(null);
  const audioPlayer = useRefHook(audioElement);

  useEffect(() => {
    setAudioElement(audioElement);
  }, [audioElement, setAudioElement]);

  const onShowLyrics = (time) => {
    const currPlayingChunk = audioChunks.find(
      (chunk) => chunk.start <= time && chunk.end > time
    );
    if (currPlayingChunk) {
      setCurrentLyrics(currPlayingChunk.textParams.text);
      setShowLyrics(true);
    } else if (!currPlayingChunk) {
      setShowLyrics(false);
    }
  };

  const updateProgressBar = () => {
    const timePercent = secondToPercent(
      audioPlayer.currentTime,
      audioPlayer.duration
    );
    onShowLyrics(audioPlayer.currentTime);
    setProgressStatus(timePercent);
  };

  return (
    <div>
      <audio ref={setAudio} src={audioUrl} onTimeUpdate={updateProgressBar} />
      <div className="G-flex G-flex-column G-align-center">
        <PlayerButton />
        <ProgressBar progressPercent={progressPercent} />
        <Timeline progressPercent={progressPercent} />
      </div>
    </div>
  );
});

const mapStateToProps = (state) => ({
  audioUrl: getAudioUrl(state),
  audioChunks: getAudioChunks(state),
});

export default connect(mapStateToProps, {
  setAudioElement,
  setShowLyrics,
  setCurrentLyrics,
})(Player);
