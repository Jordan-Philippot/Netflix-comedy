import { ItemType } from "api/youtube.type";
import styled from "styled-components";
import { unescapeHtml } from "utils/unescapeHtml";

interface CarouselItem {
  item: ItemType;
}
const StyledCarouselItem = styled.div`
  position: relative;
  cursor: pointer;
  margin: auto 10px;
  :hover img {
    opacity: 0.3;
  }
  :hover div {
    opacity: 1;
  }
  :hover {
    box-shadow: 0 0 10px 1px #ffffff60;
  }
`;
const StyledItemImage = styled.img`
  opacity: 1;
  display: block;
  transition: 0.5s ease;
  backface-visibility: hidden;
  width: 100%;
  height: auto;
  border-radius: 6px;
`;
const StyledOverlayImg = styled.div`
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
`;
const StyledTitle = styled.div`
  color: white;
  font-size: 16px;
  padding: 25px;
  font-weight: 600;
`;

export default function CarouselItem({ item }: CarouselItem) {
  const snippetItem = item.snippet;
  const thumbnails = snippetItem.thumbnails;
  //console.log(item);

  // const [imageSource, setImageSource] = useState<string>("");

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
    <StyledCarouselItem>
      <StyledItemImage src={thumbnails.medium.url} />
      <StyledOverlayImg>
        <StyledTitle>{snippetItem && unescapeHtml(snippetItem.title)}</StyledTitle>
      </StyledOverlayImg>
    </StyledCarouselItem>
  );
}
