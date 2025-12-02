import React from "react";

const PixelVideo = () => {
  return (
    <div>
      <div id="videoFrame">
        <video
          id="clueImage"
          src="public\_256res.mp4"
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
