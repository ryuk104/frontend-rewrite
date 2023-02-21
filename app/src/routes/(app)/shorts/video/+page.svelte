<script>

import "../Video.css";
import VideoFooter from "../VideoFooter";
import VideoSidebar from "../VideoSidebar";

function Video({ url, channel, description, song, likes, messages, shares }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoPress = () => {
    // if video is playing
    // stop it...
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }

    // otherwise if its not playing
    // play it...
  };
}
</script>

    <div className="video">
      <video
        onClick={handleVideoPress}
        className="video__player"
        loop
        ref={videoRef}
        src={url}
      ></video>

      {VideoFooter}
      <VideoFooter channel={channel} description={description} song={song} />

      {VideoSIdebar}
      <VideoSidebar likes={likes} shares={shares} messages={messages} />
    </div>


