import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getChannelsVideos } from "api/channel";
import { device } from "utils/breakpoints";

// --------------
// Components
// --------------
import Carousel from "./Carousel";
import Loader from "components/ui/Loader";
import CarouselResume from "./CarouselResume";
import { useAuth } from "hooks/useAuth";

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
  const { data: channels, isLoading: isChannelsLoading } = useQuery({
    queryKey: ["channels"],
    queryFn: () => getChannelsVideos(),
  });

  const firstTwoChannels = channels?.slice(0, 2);
  const restOfChannels = channels?.slice(2);
  const { user } = useAuth();

  return (
    <StyledCarouselsContainer>
      {isChannelsLoading ? (
        <Loader />
      ) : (
        <>
          {firstTwoChannels &&
            firstTwoChannels.map(
              (channel, key) =>
                !channel?.madeForKids && (
                  <Carousel channel={channel} key={key} />
                )
            )}

          {user && <CarouselResume />}
          {restOfChannels &&
            restOfChannels.map(
              (channel, key) =>
                !channel?.madeForKids && (
                  <Carousel channel={channel} key={key} />
                )
            )}
        </>
      )}
    </StyledCarouselsContainer>
  );
}
