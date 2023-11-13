import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import styled from "styled-components";
import Carousel from "./Carousel";

const StyledCarouselsContainer = styled.main`
  margin-top: -140px;
`;

export default function CarouselsContainer() {
  const { channelPanamArt, channelRomanFrayssinet } = useSelector(
    (state: RootState) => state.youtube
  );

  console.log(channelPanamArt);
  return (
    <StyledCarouselsContainer>
      <Carousel items={channelPanamArt.items} />
      <Carousel items={channelRomanFrayssinet.items} />
    </StyledCarouselsContainer>
  );
}
