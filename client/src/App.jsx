import MediaPlayer from "./components/MediaPlayer";
import UploadMedia from "./components/UploadMedia";

function App() {
  return (
    <div className="flex h-screen p-4 bg-gray-100">
      <div className="flex-1 p-4 bg-white shadow-md rounded-lg overflow-auto">
        <MediaPlayer />
      </div>

      <div className="w-1/4 p-4 bg-white shadow-lg rounded-lg ml-4">
        <UploadMedia />
      </div>
    </div>
  );
}

export default App;
