import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import clinikkLogo from "../../public/clinikk-logo.avif" 

const MediaPlayer = () => {
  const [mediaList, setMediaList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaType, setMediaType] = useState("");

  const fetchMedia = useCallback(async () => {
    try {
      const params = {};
      if (searchQuery) params.title = searchQuery;
      if (mediaType) params.type = mediaType;

      const response = await axios.get("http://localhost:3000/api/media/search", { params });
      setMediaList(response.data);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  }, [searchQuery, mediaType]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white bg-red-500 rounded-lg p-2 text-center shadow-lg flex items-center justify-center gap-3">
        <img src={clinikkLogo} alt="Clinikk Logo" className="h-6 w-auto" />
        Clinikk TV
      </h2>

      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchMedia()}
          className="w-full md:w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="">All Media</option>
          <option value="video">Videos</option>
          <option value="audio">Audios</option>
        </select>

      </div>

      {/* Media Display Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaList.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No media available.</p>
        ) : (
          mediaList.map((media) => (
            <div key={media._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">{media.title}</h3>
              <p className="text-gray-600">{media.description}</p>
              {media.type === "video" ? (
                <video className="w-full rounded-md mt-2" controls>
                  <source src={media.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <audio className="w-full mt-2" controls>
                  <source src={media.url} type="audio/mp3" />
                  Your browser does not support the audio tag.
                </audio>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;
