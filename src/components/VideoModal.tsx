import { useEffect, useState, useRef, RefObject } from "react";
import styled from "styled-components";
import { useModal } from "components/context/ModalContext";
import { COLOR_BLACK_LIGHT, COLOR_WHITE } from "utils/colors";

// --------------
// Components
// --------------
import Modal from "components/ui/Modal";
import Title from "components/ui/Title";
import Text from "components/ui/Text";
import Button from "components/ui/Button";
import Play from "components/icon/Play";
import SvgButton from "components/ui/SvgButton";
import Add from "components/icon/Add";
import Like from "components/icon/Like";
import Tooltip from "components/ui/Tooltip";
import Mute from "components/icon/Mute";
import UnMute from "components/icon/UnMute";
import Wifi from "./icon/Wifi";

interface VideosProps {
  ref: RefObject<HTMLVideoElement>;
}

const StyledModalVideo = styled.video<VideosProps>`
  width: 100%;
  height: 500px;
  border-radius: 6px 6px 0 0;
  display: block;
  opacity: 1;
`;

const StyledModalHeader = styled.div`
  position: relative;
  background: ${COLOR_BLACK_LIGHT};

  :before{
    pointer-events: none; 
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    content: "";
    background: linear-gradient(0deg, ${COLOR_BLACK_LIGHT}, transparent 90%);
  }
}`;

const StyledModalBody = styled.div`
  padding: 40px;
`;

const StyledBtnContainer = styled.div`
  display: flex;
  margin-bottom: 25px;
`;

const StyledDescriptionContainer = styled.div`
  background-color: #212121;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 25px;
`;

const StyledChannelData = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const StyledChannelBannerContainer = styled.div`
  display: flex;
`;
const StyledBanner = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;
const StyledBannerInfos = styled.div`
  margin: auto auto auto 15px;
`;

export default function VideoModal() {
  const { selectedVideo, selectedChannel, isModalOpen, closeModal } =
    useModal();

  const videoRef: RefObject<HTMLVideoElement> = useRef(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [videoPath, setVideoPath] = useState<string>();
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const playVideo = () => {
    videoRef?.current?.play();
    videoRef?.current?.requestFullscreen();
  };

  useEffect(() => {
    if (isModalOpen) setIsLoaded(true);
  }, [isModalOpen]);

  useEffect(() => {
    if (isLoaded && selectedVideo?.filePath) {
      // const truc = require(`videos/${selectedVideo.filePath}`);
      // setVideoPath(truc);
    }
  }, [selectedVideo, isLoaded]);

  return (
    <Modal opened={isModalOpen} onClose={closeModal}>
      <StyledModalHeader>
        {videoPath && isLoaded && (
          <StyledModalVideo
            src={videoPath}
            controls
            ref={videoRef}
            muted={isMuted ? true : false}
            poster={
              selectedVideo?.thumbnails &&
              selectedVideo?.thumbnails?.medium?.url
            }
          >
            <source type="video/mp4" />
          </StyledModalVideo>
        )}
      </StyledModalHeader>

      <StyledModalBody>
        <StyledBtnContainer>
          <Button
            label={"Lecture"}
            icon={<Play inverted />}
            onClick={playVideo}
            color="light"
          />
          <Tooltip
            position="top"
            label={
              <SvgButton onClick={() => console.log("ok")}>
                <Add />
              </SvgButton>
            }
          >
            <Text
              size="xl"
              weight={"800"}
              color={"secondary"}
              style={{ textAlign: "center" }}
            >
              Ajouter à ma liste
            </Text>
          </Tooltip>
          <Tooltip
            position="top"
            label={
              <SvgButton onClick={() => console.log("ok")}>
                <Like />
              </SvgButton>
            }
          >
            <Text
              size="xl"
              weight={"800"}
              color={"secondary"}
              style={{ textAlign: "center" }}
            >
              J'aime ce contenu
            </Text>
          </Tooltip>

          <SvgButton
            onClick={() => setIsMuted(!isMuted)}
            style={{ marginLeft: "auto" }}
          >
            {isMuted ? <Mute /> : <UnMute />}
          </SvgButton>
        </StyledBtnContainer>

        {/* Channel Informations */}
        <StyledChannelData>
          <StyledChannelBannerContainer>
            <StyledBanner
              src={selectedChannel?.thumbnails?.medium?.url}
              alt="Chaine youtube"
            />
            <StyledBannerInfos>
              <Text weight="800">{selectedChannel?.title}</Text>
              <Text> {selectedChannel?.subscriberCount} abonnés</Text>
            </StyledBannerInfos>
          </StyledChannelBannerContainer>

          <Button
            label={"S'abonner"}
            icon={<Wifi />}
            onClick={() => console.log("ok")}
            color="red"
            style={{
              margin: "auto 0 auto auto",
              borderRadius: "35px",
            }}
          />
        </StyledChannelData>

        <Title
          size="h3"
          weight="600"
          style={{ marginBottom: "15px", width: "90%" }}
        >
          {selectedVideo?.title}
        </Title>

        <StyledDescriptionContainer>
          <div style={{ display: "flex" }}>
            <Text
              size="l"
              color="secondary"
              style={{
                marginBottom: "25px",
                backgroundColor: COLOR_BLACK_LIGHT,
                color: COLOR_WHITE,
                borderRadius: "6px",
                padding: "10px 20px",
                width: "fit-content",
                marginRight: "15px",
              }}
            >
              542 235 vues
            </Text>
            <Text
              size="l"
              color="secondary"
              style={{
                marginBottom: "25px",
                backgroundColor: COLOR_BLACK_LIGHT,
                color: COLOR_WHITE,
                borderRadius: "6px",
                padding: "10px 20px",
                width: "fit-content",
              }}
            >
              Publié le {selectedVideo?.publishedAt?.substring(0, 10)}
            </Text>
          </div>
          <Text style={{ color: COLOR_WHITE }} weight="800">
            {selectedVideo?.description}
          </Text>
        </StyledDescriptionContainer>

        <StyledDescriptionContainer>
          <Text style={{ color: COLOR_WHITE }} weight="800" size="s">
            {selectedVideo?.tags?.map((tag: string) => "#" + tag + " - ")}
          </Text>
        </StyledDescriptionContainer>
      </StyledModalBody>
    </Modal>
  );
}
