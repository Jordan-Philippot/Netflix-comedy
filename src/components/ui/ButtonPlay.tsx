import { RefObject } from "react";
import { controlBtnType } from "utils/controlVideo";
// ----------------------------
// Components
// ----------------------------
import Play from "components/icon/Play";
import Stop from "components/icon/Stop";
import Button from "./Button";

interface ButtonPlayType {
  videoRef: RefObject<HTMLIFrameElement>;
  playedVideo: boolean;
  setPlayedVideo: () => void;
}

export default function ButtonPlay({
  videoRef,
  playedVideo,
  setPlayedVideo,
}: ButtonPlayType) {

  const iconStopStyle = {
    width: "22px",
    height: "22px",
    marginRight: "25px",
    marginLeft: "10px",
  };
  
  return (
    <Button
      label={playedVideo ? "Pause" : "Lecture"}
      icon={
        playedVideo ? (
          <Stop inverted style={iconStopStyle} />
        ) : (
          <Play inverted />
        )
      }
      color="light"
      onClick={() => controlBtnType(videoRef, playedVideo, setPlayedVideo)}
      style={{ width: "170px", justifyContent: "start" }}
    />
  );
}
