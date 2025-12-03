import React, { useContext } from "react";
import { ScoreContext } from "../context/scoreContext";
import { files } from "../answers.json";
import { useState } from "react";
//useContext to move score from Guess Component to this component

const PixelVideo = () => {
  const score = useContext(ScoreContext);
  console.log(score);
  let fileSuffix = files[`file_${score.score}`];
  console.log("", fileSuffix);
  return (
    <div>
      <div id="videoFrame">
        <video
          id="clueImage"
          src={fileSuffix}
          width="60%"
          alt="the clue of the day"
          autoplay
          loop
          playsinline
        ></video>
      </div>
    </div>
  );
};

export default PixelVideo;
