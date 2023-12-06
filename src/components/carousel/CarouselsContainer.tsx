import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import styled from "styled-components";

// --------------
// Components
// --------------
import Carousel from "./Carousel";
import CarouselModal from "../VideoModal";

const StyledCarouselsContainer = styled.main`
  margin-top: -140px;
  position: relavtive;
  z-index: 3;
`;

export default function CarouselsContainer() {
  const { channels } = useSelector((state: RootState) => state.youtube);

  return (
    <StyledCarouselsContainer>
      {channels && channels.map((channel, key) => <Carousel channel={channel} key={key}/>)}

      <CarouselModal />
    </StyledCarouselsContainer>
  );
}
