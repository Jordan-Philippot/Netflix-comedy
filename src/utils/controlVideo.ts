import { RefObject } from "react";

export function controlVideo(
  vidFunc: "playVideo" | "pauseVideo",
  videoRef: RefObject<HTMLIFrameElement>
) {
  let iframe = videoRef.current?.contentWindow;
  if (iframe) {
    iframe.postMessage(
      '{"event":"command","func":"' + vidFunc + '","args":""}',
      "*"
    );
  }
}

export function controlBtnType(
  videoRef: RefObject<HTMLIFrameElement>,
  playedVideo: boolean,
  setPlayedVideo: () => void
) {
  if (playedVideo) {
    controlVideo("pauseVideo", videoRef);
  } else {
    controlVideo("playVideo", videoRef);
  }
  setPlayedVideo();
}



