import styled from "styled-components";
import {
  /*getSavedTrackList, */ getVidéoById,
  getVidéosByChannelId,
} from "api/youtube";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  provideChannelPanamArt,
  provideChannelRomanFrayssinet,
  provideHomeVideo,
} from "redux/youtube";
import { COLOR_GREY_LIGHT, COLOR_WHITE } from "utils/colors";
// import SvgButton from "components/ui/SvgButton";
// import Add from "components/icon/Add";
// import Like from "components/icon/Like";
import Button from "components/ui/Button";
import Play from "components/icon/Play";
import InfoCircle from "components/icon/InfoCircle";
import CarouselsContainer from "components/carousel/CarouselsContainer";

// import { SavedTrackType } from "api/track.type";
// import SavedTrack from "./SavedTrack";
// ----------
// Redux
// ----------
//import { provideHomepageVideo } from 'redux/youtube'

const StyledIframeHome = styled.iframe`
  position: relative;
  z-index: -1;
  min-width: 100vw;
  height: 100vh;
  margin: -40px 0 0 -60px;
  border: none;
`;
const StyledHomeInfos = styled.div`
  position: absolute;
  top: calc(50% - 140px);
  transform: translateY(calc(-50% - 140px));
  z-index: 2;
  width: 40vw;
  margin-left: 25px;
`;
const StyledTitleIframe = styled.h2`
  font-size: 36px;
  color: ${COLOR_WHITE};
  text-transform: uppercase;
  text-shadow: 0px 0px 5px ${COLOR_WHITE};
`;
const StyledDescriptionIframe = styled.p`
  margin-top: 15px;
  font-size: 18px;
  color: ${COLOR_GREY_LIGHT};
  font-style: italic;
  fon-weight: bold;
  text-shadow: 0px 0px 1px ${COLOR_WHITE};
`;
const StyledBtnContainer = styled.div`
  display: flex;
  margin-top: 25px;
`;
export default function Home() {
  // const { data, status } = useQuery({
  //   queryKey: ["savedTrack"],
  //   queryFn: () => getSavedTrackList(),
  // });
  const dispatch = useDispatch();

  const videoHomepageId = "Z7M1mW9Xlgc";

  //SI6Q1XZ5AVw  blanche gardin
  // I-8uCMkKjeU panam art boug

  const { data: videoHomepage } = useQuery({
    queryKey: ["videoHomepage"],
    queryFn: () => getVidéoById(videoHomepageId),
  });

  const { data: channelPanamArt } = useQuery({
    queryKey: ["channelPanamArt"],
    queryFn: () => getVidéosByChannelId("UChRDMSM10aB3lr_4rBPO_VA"),
  });

  const { data: channelRomanFrayssinet } = useQuery({
    queryKey: ["channelRomanFrayssinet"],
    queryFn: () => getVidéosByChannelId("UCmHfCD8c8CmjlyWa8d4GObg"),
  });

  // console.log(channelRomanFrayssinet)

  useEffect(() => {
    if (videoHomepage) dispatch(provideHomeVideo(videoHomepage));
    if (channelPanamArt) dispatch(provideChannelPanamArt(channelPanamArt));
    if (channelRomanFrayssinet)
      dispatch(provideChannelRomanFrayssinet(channelRomanFrayssinet));
  }, [videoHomepage, channelPanamArt, channelRomanFrayssinet, dispatch]);

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

  useEffect(() => {
    if (load) controlVideo("playVideo");
  }, [load]);

  window.addEventListener("scroll", function () {
    const windowHeght = window.innerHeight as number;
    const scrollOffset = window.scrollY as number;
    if (scrollOffset > windowHeght) {
      controlVideo("pauseVideo");
    } else {
      controlVideo("playVideo");
    }
  });
  // ----------------------------
  // End Loading Vidéo autoplay
  // ---------------------------

  return (
    <>
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
      />

      {videoHomepage && (
        <StyledHomeInfos>
          <StyledTitleIframe>{videoHomepage.title}</StyledTitleIframe>
          <StyledDescriptionIframe>
            {videoHomepage.description.substring(0, 150) + "..."}
          </StyledDescriptionIframe>
          <StyledBtnContainer>
            <Button label={"Lecture"} icon={<Play />} />
            <Button secondary label={"Informations"} icon={<InfoCircle />} />

            {/* <SvgButton title="Ajouter à ma liste" onClick={() => console.log('ok')}><Add/></SvgButton>
            <SvgButton title="J'aime ce titre" onClick={() => console.log('ok')}><Like/></SvgButton> */}
          </StyledBtnContainer>
        </StyledHomeInfos>
      )}

      <CarouselsContainer />
      {/* {data &&
          data.map((tracks: SavedTrackType) => (
            <SavedTrack track={tracks.track} />
          ))} */}

      <section>okkkkkkkkkkkkk</section>
    </>
  );
}
