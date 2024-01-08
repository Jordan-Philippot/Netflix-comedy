import { RefObject } from "react";

export function controlVideo(
  videoRef: RefObject<HTMLVideoElement>,
  playedVideo: boolean,
  setPlayedVideo: () => void
) {
  const currentVideo = videoRef.current;
  if (playedVideo) {
    currentVideo?.pause();
  } else {
    currentVideo?.play();
  }
  setPlayedVideo();
}
