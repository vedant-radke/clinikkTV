import React from "react";

const MediaItem = ({ media }) => {
  return (
    <div>
      <h3>{media.title}</h3>
      <p>{media.description}</p>
      {media.type === "video" ? (
        <video width="600" controls>
          <source src={media.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <audio controls>
          <source src={media.url} type="audio/mp3" />
          Your browser does not support the audio tag.
        </audio>
      )}
    </div>
  );
};

export default MediaItem;
