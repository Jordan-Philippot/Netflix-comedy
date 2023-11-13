import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { ItemType } from "api/youtube.type";
import CarouselItem from "./CarouselItem";
import Arrow from "components/icon/Arrow";
import Title from "components/ui/Title";

interface CarouselItems {
  items: ItemType[];
}

const StyledCarouselContainer = styled.div`
  margin-bottom: 90px;
`;

const StyledArrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: auto;
  background-color: black;
  opacity: 0.7;
  color: white;
  :hover {
    opacity: 1;
    background-color: black;
  }
  :before {
    content: "";
  }
`;

function NextArrow(props: any) {
  const { className, onClick } = props;
  return (
    <StyledArrow className={className} onClick={onClick}>
      <Arrow />
    </StyledArrow>
  );
}

function PrevArrow(props: any) {
  const { className, onClick } = props;
  return (
    <StyledArrow className={className} onClick={onClick}>
      <Arrow rotation="left" />
    </StyledArrow>
  );
}

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1799,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1499,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function Carousel({ items }: CarouselItems) {
  return (
    <StyledCarouselContainer>
      <Title size="h2" weight="600" style={{ marginBottom: "15px" }}>
        {items[0]?.snippet && items[0].snippet.channelTitle}
      </Title>

      <Slider {...settings}>
        {items &&
          items.map((item: ItemType, key) => (
            <CarouselItem item={item} key={key} />
          ))}
      </Slider>
    </StyledCarouselContainer>
  );
}
