import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

// --------------
// Components
// --------------
import Carousel from "./Carousel";
import { getChannelsVideos } from "api/channel";
import { device } from "utils/breakpoints";

const StyledCarouselsContainer = styled.main`
  position: relavtive;
  z-index: 3;
  padding: 0 20px;

  @media ${device.laptop} {
    padding: 0 40px;
    margin-top: -160px;
  }
  @media ${device.laptopL} {
    padding: 0 60px;
  }
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
    </StyledCarouselsContainer>
  );
}
