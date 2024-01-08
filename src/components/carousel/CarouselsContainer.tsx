import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getChannelsVideos } from "api/channel";
import { device } from "utils/breakpoints";

// --------------
// Components
// --------------
import Carousel from "./Carousel";
import Loader from "components/ui/Loader";

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
  const { data: channels, isLoading } = useQuery({
    queryKey: ["channels"],
    queryFn: () => getChannelsVideos(),
  });

  return (
    <StyledCarouselsContainer>
      {isLoading ? (
        <Loader />
      ) : (
        channels &&
        channels.map(
          (channel, key) =>
            !channel?.madeForKids && <Carousel channel={channel} key={key} />
        )
      )}
    </StyledCarouselsContainer>
  );
}
