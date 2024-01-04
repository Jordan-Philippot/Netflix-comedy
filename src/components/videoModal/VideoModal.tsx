import { useEffect, useState, useRef, RefObject } from "react";
import styled from "styled-components";
import { useModal } from "components/context/ModalContext";
import {
  COLOR_BLACK_LIGHT,
  COLOR_BLACK_LIGHTER,
  COLOR_WHITE,
} from "utils/colors";
import { useLike } from "hooks/useLike";
import { useFavorite } from "hooks/useFavorite";
import { LikeTypeType } from "api/like.type";
// import { controlBtnType, controlVideo } from "utils/controlVideo";
import { useAuth } from "hooks/useAuth";
import { device } from "utils/breakpoints";
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
import Comment from "components/icon/Comment";
import Stats from "components/icon/Stats";
import Calendar from "components/icon/Calendar";

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
  background-color: ${COLOR_BLACK_LIGHTER};
  border-radius: 6px;
  padding: 15px 15px 0 15px;
  margin-bottom: 25px;
`;

export default function VideoModal() {
  const { selectedVideo, isModalOpen, closeModal } = useModal();
  const { user } = useAuth();
  const { addLike, removeLike, userLikeList, findUserLike } = useLike();
  const { addFavorite, findUserFavorite, userFavorites, removeFavorite } =
    useFavorite();

  const videoRef: RefObject<HTMLIFrameElement> = useRef(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playedVideo, setPlayedVideo] = useToggle(true);



  const [isFavorite, setIsFavorite] = useState<boolean>();
  useEffect(() => {
    if (selectedVideo) findUserFavorite(selectedVideo.videoId, setIsFavorite);
  }, [userFavorites, selectedVideo, findUserFavorite]);

  const [isLiked, setIsLiked] = useState<boolean>();
  useEffect(() => {
    if (selectedVideo) findUserLike(selectedVideo.videoId, setIsLiked);
  }, [userLikeList, selectedVideo, findUserLike]);

  const styledStatsContainer = {
    marginBottom: "25px",
    backgroundColor: COLOR_BLACK_LIGHT,
    color: COLOR_WHITE,
    borderRadius: "6px",
    padding: "10px 20px",
    width: "fit-content",
    display: "flex",
    gap: "0 10px",
  };

  const onChangeMute = () => {
    setIsMuted((prev) => !prev);
    if (selectedVideo?.videoId) {
      const iframe = document.getElementById(
        selectedVideo?.videoId
      ) as HTMLIFrameElement;
      // if (iframe?.ownerDocument) {
      //   const document = iframe.ownerDocument;
      //   if (document.body) {
      //     console.log(document.body);
      //     // document.body.postMessage("click", "*");
      //   }

      //   //   var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      //   //   const content = iframe.ownerDocument;
      //   //   console.log(iframe?.body,content);
      //   //
      // }
      // console.log(iframe?.contentWindow);
      // if (iframe?.contentWindow) {
      //   const truc = iframe.contentWindow;
      //   // Envoie un message à la fenêtre contenu de l'iframe
      //   iframe.contentWindow.postMessage({ type: "click" }, "*");
      //   console.log(truc.window);
      // }
    }
  };

  // window.addEventListener("message", (event) => {
  //   if (event.data && event.data.type === "click") {
  //     // Fais quelque chose en réponse au message 'click'
  //     console.log("Simuler un clic dans l'iframe");
  //   }
  // });

  return (
    <Modal opened={isModalOpen} onClose={closeModal}>
      <StyledModalHeader>
        {selectedVideo?.filePath && (
          <StyledModalVideo
            src={`https://storage.googleapis.com/netflix_comedy_videos_bucket/videos/${selectedVideo.filePath}`}
            title="GCP Bucket video player"
            allow="accelerometer; encrypted-media; fullscreen"
            allowFullScreen
            id={selectedVideo?.videoId}
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

              <SvgButton onClick={onChangeMute} style={{ marginLeft: "auto" }}>
                {isMuted ? <Mute /> : <UnMute />}
              </SvgButton>
            </StyledIconContainer>
          </StyledBtnContainer>

          {/* ---------------------
              Channel Informations 
          ------------------------- */}
          <ChannelDescription />

          <Title
            size="h2"
            weight="600"
            style={{ marginBottom: "15px", width: "90%" }}
          >
            {selectedVideo.title}
          </Title>

          <StyledDescriptionContainer>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0 15px" }}>
              {selectedVideo.viewCount && (
                <Text size="l" color="secondary" style={styledStatsContainer}>
                  <Stats /> {selectedVideo.viewCount} vues
                </Text>
              )}
              <Text size="l" color="secondary" style={styledStatsContainer}>
                <Calendar />
                Publié le {selectedVideo.publishedAt?.substring(0, 10)}
              </Text>
              {selectedVideo.viewCount && (
                <Text size="l" color="secondary" style={styledStatsContainer}>
                  <Comment /> {selectedVideo.commentCount} commentaires
                </Text>
              )}
            </div>
            {selectedVideo.description && (
              <Text
                style={{ color: COLOR_WHITE, paddingBottom: "15px" }}
                weight="800"
              >
                {selectedVideo.description}
              </Text>
            )}
          </StyledDescriptionContainer>

          {selectedVideo.tags && (
            <StyledDescriptionContainer>
              <Text
                style={{ color: COLOR_WHITE, paddingBottom: "15px" }}
                weight="800"
                size="s"
              >
                {selectedVideo.tags?.map((tag: string) => "#" + tag + " - ")}
              </Text>
            </StyledDescriptionContainer>
          )}
        </StyledModalBody>
      )}
    </Modal>
  );
}
