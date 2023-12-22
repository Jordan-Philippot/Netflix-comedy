import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { RefObject, useRef } from "react";
import {
  COLOR_BLUE,
  COLOR_GREY,
  COLOR_GREY_LIGHT,
  COLOR_RED,
  COLOR_WHITE,
} from "utils/colors";
import useToggle from "hooks/useToggle";
import { device } from "utils/breakpoints";
// import { controlBtnType } from "utils/controlVideo";

// ----------
// Component
// ----------
import Button from "components/ui/Button";
import InfoCircle from "components/icon/InfoCircle";
import CarouselsContainer from "components/carousel/CarouselsContainer";
import Loader from "components/ui/Loader";
import ButtonPlay from "components/ui/ButtonPlay";
import CardItem from "components/CardItem";
import Title from "components/ui/Title";
import Text from "components/ui/Text";

// ----------
// Api
// ----------
import { getVidéoYoutubeById } from "api/video";
import { RootState } from "redux/store";
import { useSelector } from "react-redux";
import {
  StyledPageContainer,
  StyledVideosContainer,
} from "./UserSubscriptions";

interface VideosProps {
  ref: RefObject<HTMLIFrameElement>;
}

const StyledContainerHome = styled.div`
  position: relative;
  z-index: 0;
  min-width: 100vw;
  height: 100%;
  margin-top: 40px;
  @media ${device.laptop} {
    height: 100vh;
  }
`;

const StyledIframeHome = styled.iframe<VideosProps>`
  position: relative;
  top: 0;
  width: 100%;
  height: 100%;
  min-height: 50vh;
  border: none;
  @media ${device.laptop} {
    position: relative;
    top: 0;
    height: 100vh;
  }
`;

const StyledHomeInfos = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  margin-left: 20px;
  width: calc(90vw - 20px);
  @media ${device.mobile} {
    margin-left: 40px;
    width: calc(90vw - 40px);
  }
  @media ${device.tablet} {
    width: 60%;
  }
  @media ${device.laptop} {
    position: relative;
    z-index: 2;
    top: -50%;
    transform: translateY(calc(-50% - 40px));
    z-index: 2;
    margin-left: 60px;
    width: 40vw;
  }
`;

const StyledTitleIframe = styled.h1`
  text-transform: uppercase;
  text-shadow: 0px 0px 5px #00000030;
  color: ${COLOR_WHITE};
  font-size: 16px;
  padding-bottom: 10px;
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.laptop} {
    font-size: 20px;
  }
  @media ${device.laptopL} {
    font-size: 26px;
  }
`;

const StyledDescriptionIframe = styled.p`
  margin-top: 15px;
  font-size: 12px;
  color: ${COLOR_GREY_LIGHT};
  font-style: italic;
  fon-weight: bold;
  text-shadow: 0px 0px 5px #00000030;
  @media ${device.laptop} {
    font-size: 14px;
  }
  @media ${device.laptopL} {
    font-size: 16px;
  }
  @media ${device.desktop} {
    font-size: 18px;
  }
`;

const StyledBtnContainer = styled.div`
  display: flex;
  margin-top: 25px;
  pointer-events: auto;
`;

export default function Home() {
  // const videoHomepageId = process.env.REACT_APP_HOMEPAGE_VIDEO_ID as string;
  const videoHomepageId = "kpLxL7Uvsxw";
 // I0zFWSsz8zk
  //roman : Z7M1mW9Xlgc
  const videoRef: RefObject<HTMLIFrameElement> = useRef(null);

  const { data: videoHomepage } = useQuery({
    queryKey: ["videoHomepage"],
    queryFn: () => getVidéoYoutubeById(videoHomepageId),
  });

  // --------------------------
  // Loading Vidéo autoplay
  // --------------------------
  const [playedVideo, setPlayedVideo] = useToggle(false);

  const { searchResult, isLoading, search } = useSelector(
    (state: RootState) => state.video
  );

  console.log(videoHomepage);
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
      {(() => {
        if (isLoading) {
          return <Loader />;
        } else if (search.length > 0) {
          return (
            <StyledPageContainer>
              <Title weight="800" style={{ marginTop: "120px" }}>
                Les résultats de votre recherche :
              </Title>
              <Title
                weight="800"
                size="h3"
                style={{
                  textShadow: "1px 1px 30px" + COLOR_BLUE,
                  color: COLOR_GREY
                }}
              >
                {search.toLocaleUpperCase()}
              </Title>
              {/* Search Results */}
              <StyledVideosContainer>
                {searchResult.length > 0 ? (
                  searchResult?.map((result, key) => (
                    <CardItem
                      item={result}
                      key={key}
                      channel={(({ videos, ...channel }) => channel)(
                        result.channel
                      )}
                    />
                  ))
                ) : (
                  <Text>Aucun résultat n'est disponible</Text>
                )}
              </StyledVideosContainer>
            </StyledPageContainer>
          );
        } else if (videoHomepage) {
          return (
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
          );
        } else {
          return <Loader />;
        }
      })()}
    </>
  );
}
