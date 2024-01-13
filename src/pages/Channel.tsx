import { useEffect, useState } from "react";
import { getChannelVideos } from "api/channel";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { COLOR_BLACK, COLOR_BLUE, COLOR_WHITE } from "utils/colors";
import { useSubscription } from "hooks/useSubscription";
import { useAuth } from "hooks/useAuth";
import { device } from "utils/breakpoints";
import Linkify from "linkify-react";
import { linkifyOptions } from "constant/linkifyOptions";

// --------------
// Components
// --------------
import CardItem from "components/CardItem";
import CarouselModal from "components/videoModal/VideoModal";
import Button from "components/ui/Button";
import Text from "components/ui/Text";
import Wifi from "components/icon/Wifi";
import Title from "components/ui/Title";
import LoaderPage from "components/ui/LoaderPage";

const StyledChannelData = styled.div`
  display: flex;
  margin-top: 120px;
  padding: 0 20px;
  @media ${device.laptop} {
    padding: 0 40px;
  }
  @media ${device.laptopL} {
    padding: 0 60px;
  }
`;
const StyledVideosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 50px auto;
  gap: 80px 0;
  padding: 0 20px;

  @media ${device.laptop} {
    padding: 0 40px;
  }
  @media ${device.laptopL} {
    padding: 0 60px;
  }
`;

const StyledChannelBannerContainer = styled.div`
  display: flex;
`;
const StyledBanner = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
`;
const StyledBannerInfos = styled.div`
  margin: auto auto auto 15px;
`;
const StyledHr = styled.hr`
  display: block;
  margin: 0 20px;
  @media ${device.laptop} {
    margin: 0 40px;
  }
  @media ${device.laptopL} {
    margin: 0 60px;
  }
`;

const StyledDescription = styled.div`
  display: block;
  position: relative;
  margin: 40px;
  .linkify {
    color: ${COLOR_BLUE};
  }
  @media ${device.laptopL} {
    margin: 40px 60px;
  }
`;

export default function Channel() {
  const { user } = useAuth();
  const { channelId } = useParams() as { channelId: string };
  const { data: channelById, isLoading } = useQuery({
    queryKey: ["channelById"],
    queryFn: () => getChannelVideos(channelId as string),
  });

  const {
    addSubscription,
    removeSubscription,
    userSubscriptions,
    findUserSubscription,
  } = useSubscription();
  const [isSubscribed, setIsSubscribed] = useState<boolean>();

  useEffect(() => {
    if (channelById)
      findUserSubscription(channelById.channelId, setIsSubscribed);
  }, [userSubscriptions, channelById, findUserSubscription]);

  return (
    <>
      {isLoading && <LoaderPage />}
      {/* Channel Informations */}
      {channelById && (
        <>
          {/* Banner informations */}

          <StyledChannelData>
            <StyledChannelBannerContainer>
              <StyledBanner
                src={channelById.thumbnails?.medium?.url}
                alt="Chaine youtube"
              />
              <StyledBannerInfos>
                <Title size="h2" weight="800">
                  {channelById.title}
                </Title>
                <Text
                  size="l"
                  weight="800"
                  style={{
                    backgroundColor: COLOR_WHITE,
                    color: COLOR_BLACK,
                    borderRadius: "6px",
                    padding: "6px 15px",
                    width: "fit-content",
                    marginBottom: "10px",
                  }}
                >
                  {channelById.subscriberCount} abonnés
                </Text>
                <Link
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    color: COLOR_WHITE,
                  }}
                  target="_blank"
                  to={"https://www.youtube.com/" + channelId}
                >
                  {channelId}
                </Link>
                <Text size="l">
                  {channelById.viewCount} vues - {channelById.videoCount} vidéos
                </Text>
              </StyledBannerInfos>
            </StyledChannelBannerContainer>

            <Button
              label={isSubscribed ? "Abonné(e)" : "S'abonner"}
              disabled={!user}
              icon={<Wifi />}
              onClick={() => {
                isSubscribed
                  ? removeSubscription(channelById.channelId)
                  : addSubscription(channelById.channelId);
              }}
              color="red"
              style={{
                margin: "auto 0 auto auto",
                borderRadius: "35px",
                whiteSpace: "nowrap",
              }}
            />
          </StyledChannelData>
          {/* End Banner informations */}

          <StyledDescription>
            <Text>
              <Linkify options={linkifyOptions}>
                {channelById.description}
              </Linkify>
            </Text>
          </StyledDescription>

          <StyledHr />
          <StyledVideosContainer>
            {channelById.videos.map((video, key) => (
              <CardItem
                item={video}
                channel={channelById}
                key={key}
                style={{ marginBottom: "25px" }}
              />
            ))}
          </StyledVideosContainer>
          <CarouselModal />
        </>
      )}
    </>
  );
}
