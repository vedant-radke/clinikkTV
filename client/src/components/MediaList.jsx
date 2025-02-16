import React from "react";
import MediaItem from "./MediaItem";

const MediaList = ({ mediaList }) => {
  return (
    <div>
      {mediaList.length === 0 ? (
        <p>No media found.</p>
      ) : (
        mediaList.map((media) => <MediaItem key={media._id} media={media} />)
      )}
    </div>
  );
};

export default MediaList;
