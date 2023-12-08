import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

// --------------
// Components
// --------------
import Carousel from "./Carousel";
import CarouselModal from "components/videoModal/VideoModal";
import { getChannelsVideos } from "api/channel";

const StyledCarouselsContainer = styled.main`
  margin-top: -140px;
  position: relavtive;
  z-index: 3;
`;

export default function CarouselsContainer() {

  const { data: channels } = useQuery({
    queryKey: ["channels"],
    queryFn: () => getChannelsVideos(),
  });

  return (
    <StyledCarouselsContainer>
      {channels &&
        channels.map((channel, key) => (
          <Carousel channel={channel} key={key} />
        ))}

      <CarouselModal />
    </StyledCarouselsContainer>
  );
}
