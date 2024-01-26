import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getChannelsVideos } from "api/channel";
import { device } from "utils/breakpoints";
import { useResume } from "hooks/useResume";

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
  const { data: channels, isLoading: isChannelsLoading } = useQuery({
    queryKey: ["channels"],
    queryFn: () => getChannelsVideos(),
  });
  const { userResumeList, isLoading: isResumeLoading } = useResume();

  const firstTwoChannels = channels?.slice(0, 2);
  const restOfChannels = channels?.slice(2);

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

          {isResumeLoading ? (
            <Loader />
          ) : (
            userResumeList &&
            userResumeList.resumes.length > 0 && (
              <Carousel resumes={userResumeList?.resumes} />
            )
          )}
          {isResumeLoading ? (
            <Loader />
          ) : (
            userResumeList &&
            userResumeList.watchAgain.length > 0 && (
              <Carousel resumes={userResumeList?.watchAgain} />
            )
          )}
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
