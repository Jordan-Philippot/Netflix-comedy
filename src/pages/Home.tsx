import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { RefObject, useRef } from "react";
import { COLOR_GREY_LIGHT, COLOR_WHITE } from "utils/colors";
import useToggle from "hooks/useToggle";
// import { controlBtnType } from "utils/controlVideo";

// ----------
// Components / UI
// ----------
import Button from "components/ui/Button";
import InfoCircle from "components/icon/InfoCircle";
import CarouselsContainer from "components/carousel/CarouselsContainer";
import Loader from "components/ui/Loader";
import ButtonPlay from "components/ui/ButtonPlay";

// ----------
// Api 
// ----------
import { getVidéoYoutubeById } from "api/video";


interface VideosProps {
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
  // const dispatch = useDispatch();

  // const videoHomepageId = process.env.REACT_APP_HOMEPAGE_VIDEO_ID as string;
  const videoHomepageId = "Z7M1mW9Xlgc";

  const videoRef: RefObject<HTMLIFrameElement> = useRef(null);

  const { data: videoHomepage } = useQuery({
    queryKey: ["videoHomepage"],
    queryFn: () => getVidéoYoutubeById(videoHomepageId),
  });


  // useEffect(() => {
  //   if (videoHomepage) dispatch(provideHomeVideo(videoHomepage));
  //   if (channels) dispatch(provideChannels(channels));
  // }, [videoHomepage, channels, dispatch]);

  // --------------------------
  // Loading Vidéo autoplay
  // --------------------------
  const [playedVideo, setPlayedVideo] = useToggle(false);

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
  return (
    <>
      {videoHomepage ? (
        <>
          <StyledContainerHome>
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
                <ButtonPlay
                  videoRef={videoRef}
                  setPlayedVideo={setPlayedVideo}
                  playedVideo={playedVideo}
                />
                <Button
                  color="dark"
                  label={"Informations"}
                  icon={<InfoCircle />}
                  onClick={() => console.log("ok")}
                />
              </StyledBtnContainer>
            </StyledHomeInfos>
          </StyledContainerHome>

          <CarouselsContainer />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
