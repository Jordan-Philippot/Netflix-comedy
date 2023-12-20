import { useEffect, useState, useRef, RefObject } from "react";
import styled from "styled-components";
import { useModal } from "components/context/ModalContext";
import { COLOR_BLACK_LIGHT, COLOR_WHITE } from "utils/colors";
import { useLike } from "hooks/useLike";
import { useFavorite } from "hooks/useFavorite";
import { LikeTypeType } from "api/like.type";
// import { controlBtnType, controlVideo } from "utils/controlVideo";

// --------------
// Components
// --------------
import Modal from "components/ui/Modal";
import Title from "components/ui/Title";
import Text from "components/ui/Text";
import SvgButton from "components/ui/SvgButton";
import Add from "components/icon/Add";
import Like from "components/icon/Like";
import Tooltip from "components/ui/Tooltip";
import Mute from "components/icon/Mute";
import UnMute from "components/icon/UnMute";
import useToggle from "hooks/useToggle";
import ButtonPlay from "components/ui/ButtonPlay";
import ChannelDescription from "./ChannelDescription";
import Check from "components/icon/Check";
import LikeFull from "components/icon/LikeFull";
import { useAuth } from "hooks/useAuth";
import { device } from "utils/breakpoints";

interface VideosProps {
  ref: RefObject<HTMLIFrameElement>;
}

const StyledModalVideo = styled.iframe<VideosProps>`
  width: 100%;
  height: 500px;
  border-radius: 6px 6px 0 0;
  border: none;
  display: block;
  opacity: 1;
  z-index:5:
  background-color:red;
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
  padding: 20px;
  @media ${device.tablet} {
    padding: 40px;
  }
`;

const StyledBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  @media ${device.mobile} {
    flex-direction: row;
  }
`;
const StyledIconContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 25px;
  @media ${device.mobile} {
    margin-top: 0;
  }
`;
const StyledDescriptionContainer = styled.div`
  background-color: #212121;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 25px;
`;

export default function VideoModal() {
  const { selectedVideo, isModalOpen, closeModal } = useModal();
  const { user } = useAuth();
  const { addLike, removeLike, userLikeList, findUserLike } = useLike();
  const { addFavorite, findUserFavorite, userFavorites, removeFavorite } =
    useFavorite();

  const videoRef: RefObject<HTMLIFrameElement> = useRef(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [videoPath, setVideoPath] = useState<string>();
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playedVideo, setPlayedVideo] = useToggle(true);

  useEffect(() => {
    if (isModalOpen) setIsLoaded(true);
  }, [isModalOpen]);

  useEffect(() => {
    if (isLoaded && selectedVideo?.filePath) {
      setVideoPath(selectedVideo.filePath);
    }
  }, [selectedVideo, isLoaded]);

  const [isFavorite, setIsFavorite] = useState<boolean>();
  useEffect(() => {
    if (selectedVideo) findUserFavorite(selectedVideo.videoId, setIsFavorite);
  }, [userFavorites, selectedVideo, findUserFavorite]);

  const [isLiked, setIsLiked] = useState<boolean>();
  useEffect(() => {
    if (selectedVideo) findUserLike(selectedVideo.videoId, setIsLiked);
  }, [userLikeList, selectedVideo, findUserLike]);

  return (
    <Modal opened={isModalOpen} onClose={closeModal}>
      <StyledModalHeader>
        {videoPath && (
          <StyledModalVideo
            src={`https://storage.googleapis.com/netflix_comedy_videos_bucket/videos/${videoPath}`}
            title="GCP Bucket video player"
            allow="accelerometer; encrypted-media; fullscreen"
            allowFullScreen
            id="fullscreenIframe"
            ref={videoRef}
          />
        )}
      </StyledModalHeader>
      {selectedVideo && (
        <StyledModalBody>
          <StyledBtnContainer>
            <ButtonPlay
              videoRef={videoRef}
              setPlayedVideo={setPlayedVideo}
              playedVideo={playedVideo}
            />
            {/* -----------------
               Favorite Component
              ------------------- */}
            <StyledIconContainer>
              <Tooltip
                position="top"
                label={
                  <SvgButton
                    disabled={!user}
                    onClick={() => {
                      isFavorite
                        ? removeFavorite(selectedVideo.videoId)
                        : addFavorite(selectedVideo.videoId);
                    }}
                  >
                    {isFavorite ? <Check /> : <Add />}
                  </SvgButton>
                }
              >
                <Text
                  size="xl"
                  weight={"800"}
                  color={"secondary"}
                  style={{ textAlign: "center" }}
                >
                  {isFavorite ? "Retirer de ma liste" : "Ajouter à ma liste"}
                </Text>
              </Tooltip>

              {/* -----------------
               Like Component
              ------------------- */}
              <Tooltip
                position="top"
                label={
                  <SvgButton
                    disabled={!user}
                    onClick={() =>
                      isLiked
                        ? removeLike(selectedVideo.videoId)
                        : addLike(selectedVideo.videoId, LikeTypeType.like)
                    }
                  >
                    {isLiked ? <LikeFull /> : <Like />}
                  </SvgButton>
                }
              >
                <Text
                  size="xl"
                  weight={"800"}
                  color={"secondary"}
                  style={{ textAlign: "center" }}
                >
                  {isLiked ? "Je n'aime plus ce contenu" : "J'aime ce contenu"}
                </Text>
              </Tooltip>

              <SvgButton
                onClick={() => {
                  setIsMuted((prev) => !prev);
                }}
                style={{ marginLeft: "auto" }}
              >
                {isMuted ? <Mute /> : <UnMute />}
              </SvgButton>
            </StyledIconContainer>
          </StyledBtnContainer>

          {/* ---------------------
              Channel Informations 
          ------------------------- */}
          <ChannelDescription />

          <Title
            size="h3"
            weight="600"
            style={{ marginBottom: "15px", width: "90%" }}
          >
            {selectedVideo.title}
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
                Publié le {selectedVideo.publishedAt?.substring(0, 10)}
              </Text>
            </div>
            <Text style={{ color: COLOR_WHITE }} weight="800">
              {selectedVideo.description}
            </Text>
          </StyledDescriptionContainer>

          <StyledDescriptionContainer>
            <Text style={{ color: COLOR_WHITE }} weight="800" size="s">
              {selectedVideo.tags?.map((tag: string) => "#" + tag + " - ")}
            </Text>
          </StyledDescriptionContainer>
        </StyledModalBody>
      )}
    </Modal>
  );
}
