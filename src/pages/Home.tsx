import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { RefObject, useEffect, useRef, useState } from "react";
import { COLOR_GREY_LIGHT, COLOR_WHITE } from "utils/colors";

// ----------
// Components / UI
// ----------
import Button from "components/ui/Button";
import Play from "components/icon/Play";
import InfoCircle from "components/icon/InfoCircle";
import CarouselsContainer from "components/carousel/CarouselsContainer";

// ----------
// Api / Redux
// ----------
import { useDispatch } from "react-redux";
import { provideChannels, provideHomeVideo } from "redux/youtube";
import { getVidéoById, getVidéoYoutubeById } from "api/video";
import { getChannelsVideos } from "api/channel";
import Loader from "components/ui/Loader";
import { useLike } from "hooks/useLike";
import { LikeTypeType } from "api/like.type";
import { removeLike } from "api/like";
import { useSubscription } from "hooks/useSubscription";

// ----------
// Assets
// ----------
// import VideoHomepage from "videos/panamArt/Paname_Comedy_Club___Les_radins.mp4";

interface VideosProps {
  // ref: RefObject<HTMLVideoElement>;
  ref: RefObject<HTMLIFrameElement>;

}

const StyledContainerHome = styled.div`
  position: relative;
  z-index: 0;
  min-width: 100vw;
  height: 100vh;
  margin: -40px 0 0 -60px;
`;

const StyledIframeHome = styled.iframe<VideosProps>`
  width: 100%;
  height: 100vh;
  border: none;
`;

const StyledHomeInfos = styled.div`
  position: relative;
  top: -50%;
  transform: translateY(calc(-50% - 40px));
  z-index: 2;
  width: 40vw;
  margin-left: 40px;
`;

const StyledTitleIframe = styled.h2`
  font-size: 36px;
  color: ${COLOR_WHITE};
  text-transform: uppercase;
  text-shadow: 0px 0px 5px #00000030;
`;

const StyledDescriptionIframe = styled.p`
  margin-top: 15px;
  font-size: 18px;
  color: ${COLOR_GREY_LIGHT};
  font-style: italic;
  fon-weight: bold;
  text-shadow: 0px 0px 5px #00000030;
`;

const StyledBtnContainer = styled.div`
  display: flex;
  margin-top: 25px;
`;

export default function Home() {
  const dispatch = useDispatch();

  // const videoHomepageId = process.env.REACT_APP_HOMEPAGE_VIDEO_ID as string;
  const videoHomepageId = "Z7M1mW9Xlgc";

  // const videoRef: RefObject<HTMLVideoElement> = useRef(null);
  const videoRef: RefObject<HTMLIFrameElement> = useRef(null);

  const { data: videoHomepage } = useQuery({
    queryKey: ["videoHomepage"],
    queryFn: () => getVidéoYoutubeById(videoHomepageId),
  });

  const { data: channels } = useQuery({
    queryKey: ["channels"],
    queryFn: () => getChannelsVideos(),
  });

  useEffect(() => {
    if (videoHomepage) dispatch(provideHomeVideo(videoHomepage));
    if (channels) dispatch(provideChannels(channels));
  }, [videoHomepage, channels, dispatch]);

  // --------------------------
  // Loading Vidéo autoplay
  // --------------------------
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!load)
      setTimeout(() => {
        setLoad(true);
      }, 1000);
  }, [load]);

  function controlVideo(vidFunc: "playVideo" | "pauseVideo") {
    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
    if (iframe) {
      iframe.postMessage(
        '{"event":"command","func":"' + vidFunc + '","args":""}',
        "*"
      );
    }
  }

  // useEffect(() => {
  //   if (load) controlVideo("playVideo");
  // }, [load]);

  // window.addEventListener("scroll", function () {
  //   const windowHeght = window.innerHeight as number;
  //   const scrollOffset = window.scrollY as number;
  //   if (scrollOffset > windowHeght) {
  //     controlVideo("pauseVideo");
  //   } else {
  //     controlVideo("playVideo");
  //   }
  // });
  // ----------------------------
  // End Loading Vidéo autoplay
  // ---------------------------
  const { removeSubscription } = useSubscription();
  return (
    <>
      {load && videoHomepage ? (
        <>
          <StyledContainerHome>
            {/* <StyledVideoHome
              src={VideoHomepage}
              controls
              ref={videoRef}
              //muted={isMuted ? true : false}
              poster={
                videoHomepage.thumbnails &&
                videoHomepage.thumbnails.maxres?.url
              }
            >
              <source type="video/mp4" />
            </StyledVideoHome> */}
            <StyledIframeHome
              src={
                "https://www.youtube.com/embed/" +
                videoHomepageId +
                "?controls=0&amp;modestbranding=1&amp;showinfo=0&enablejsapi=1"
              }
              title="YouTube video player"
              allow="accelerometer; encrypted-media; fullscreen"
              allowFullScreen
              id="fullscreenIframe"
              ref={videoRef}
            />

            <StyledHomeInfos>
              <StyledTitleIframe>{videoHomepage.title}</StyledTitleIframe>
              <StyledDescriptionIframe>
                {videoHomepage.description &&
                  videoHomepage.description.substring(0, 150) + "..."}
              </StyledDescriptionIframe>
              <StyledBtnContainer>
                <Button
                  label={"Lecture"}
                  color="light"
                  icon={<Play inverted />}
                  onClick={() => controlVideo("playVideo")}
                />
                <Button
                  color="dark"
                  label={"Informations"}
                  icon={<InfoCircle />}
                  onClick={() => removeSubscription("UChRDMSM10aB3lr_4rBPO_VA")}
                />
              </StyledBtnContainer>
            </StyledHomeInfos>
          </StyledContainerHome>

          {/* <CarouselsContainer /> */}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
