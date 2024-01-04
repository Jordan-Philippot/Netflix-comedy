import styled from "styled-components";
import { unescapeHtml } from "utils/unescapeHtml";
import { COLOR_BLACK } from "utils/colors";
import { useModal } from "components/context/ModalContext";
import { device } from "utils/breakpoints";

// ------
// Api
// ------
import { VideoDataType } from "api/video.type";
import { ChannelType } from "api/channel.type";

interface CardItemProps {
  item: VideoDataType;
  channel: ChannelType;
  style?: React.CSSProperties;
}
const StyledCardItem = styled.div`
  position: relative;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 2px;
  max-width: 300px;
  height: auto;
  :hover img {
    opacity: 1;
  }
  :hover div {
    opacity: 1;
  }
  @media ${device.laptop} {
    max-width: 350px;
  }
`;
const StyledItemImage = styled.img`
  opacity: 1;
  display: block;
  transition: 0.5s ease;
  backface-visibility: hidden;
  width: 100%;
  height: auto;
  border-radius: 2px;
`;
const StyledOverlayImg = styled.div`
  transition: 0.5s ease;
  opacity: 0;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: ${COLOR_BLACK}EE;
  border-radius: 2px;
`;

const StyledTitle = styled.div`
  position: relative;
  color: white;
  font-size: 12px;
  padding: 15px;
  font-weight: 600;
  margin: auto;
  z-index: 3;

  @media ${device.laptop} {
    padding: 25px;
  }

  @media ${device.desktop} {
    font-size: 14px;
  }
`;

export default function CardItem({ item, channel, style }: CardItemProps) {
  const { openModal } = useModal();

  const openModalWithVideo = () => {
    console.log("card", item);

    return openModal(item, channel);
  };

  const thumbnails = item.thumbnails;

  // useEffect(() => {
  //   function handleResize() {
  //     const width = window.innerWidth;
  //     if (width < 768) {
  //       setImageSource(thumbnails.default.url);
  //     } else if (width < 1024) {
  //       setImageSource(thumbnails.medium.url);
  //     } else {
  //       setImageSource(thumbnails.high.url);
  //     }
  //   }

  //   window.addEventListener("resize", handleResize);

  //   handleResize();

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <StyledCardItem onClick={openModalWithVideo} className="card-item">
      <StyledItemImage src={thumbnails?.medium && thumbnails.medium.url} />
      <StyledOverlayImg>
        <StyledTitle>{item?.title && unescapeHtml(item.title)}</StyledTitle>
      </StyledOverlayImg>
    </StyledCardItem>
  );
}
