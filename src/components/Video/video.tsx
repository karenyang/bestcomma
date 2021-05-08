/**
 *
 * Video.ts
 *
 */

import { useEffect, useState } from 'react';
import videojs from 'video.js';
import './video-js.css';
import './video.css';
import { Button } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';



interface Props {
  src: string;
  fluid: boolean;
  forwardRef: any;
  height?: number;
  width?: number;
  className?: string,
  muted: boolean;
}


function Video(props: Props) {
  const videoPlayerRef = props.forwardRef;
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false); 

  const videoJSOptions = {
    autoplay: true,
    loop: true,
    playsinline: true,
    preload: "auto",
    height: props.height,
    fluid: props.fluid,
    muted: props.muted,
  };

  const handlePlayVideo = () => {
    const player = videojs(videoPlayerRef.current);
    player.play();
    gtag('event', 'click_play_video_button');

  }


  useEffect(() => {
    console.log("start loading", props.src," muted? ", props.muted);
    if (videoPlayerRef) {
      const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
        player.src(props.src);
      });
      player.ready(function () {
        var promise = player.play();

        if (promise !== undefined) {
          promise.then(function () {
            // Autoplay started!
            console.log("autoplay started")
          }).catch(function (error: any) {
            // Autoplay was prevented.
            console.log("autoplay prevented");
            console.log(error);
            setIsPlaying(false);
          });
        }
      });
    }
    return () => { };
  // eslint-disable-next-line
  }, []);

  const onLoadedData = () => {
    console.log("isVideoLoaded: ", isVideoLoaded);
    setIsVideoLoaded(true);
  }
  return (
    <div>
      <video ref={videoPlayerRef} className="video-js" id="video-id" onLoadedData={onLoadedData} />

      { !isPlaying &&
        <Button key="play_button"
          style={{
            position: "absolute", top: "50%", left: "50%", padding: "10px 10px", color: "white", zIndex: 200,
            textTransform: "none", transform: "translate(-50%, -50%)",
          }}
          onClick={() => {
            handlePlayVideo();
            setIsPlaying(true);
          }}
        >
          <PlayCircleOutlineIcon style={{ fontSize: 80 }} />
        </Button>
      }
    </div>
  );

}

export default Video;
