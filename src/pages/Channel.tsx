import { getChannelVideos } from "api/channel";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { COLOR_BLACK, COLOR_RED, COLOR_WHITE } from "utils/colors";

// --------------
// Components
// --------------
import CardItem from "components/CardItem";
import CarouselModal from "components/VideoModal";
import Button from "components/ui/Button";
import Text from "components/ui/Text";
import Wifi from "components/icon/Wifi";
import Title from "components/ui/Title";

const StyledVideosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 50px auto;
  padding: 0 80px;
`;

const StyledChannelData = styled.div`
  display: flex;
  margin-bottom: 15px;
  margin-top: 70px;
  padding: 0 80px;
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
  margin: 35px 80px;
`;
export default function Channel() {
  const { channelId } = useParams() as { channelId: string };
  const { data: channelById } = useQuery({
    queryKey: ["channelById"],
    queryFn: () => getChannelVideos(channelId as string),
  });
  return (
    <div>
      {/* Channel Informations */}
      <StyledChannelData>
        <StyledChannelBannerContainer>
          <StyledBanner
            src={channelById?.thumbnails?.medium?.url}
            alt="Chaine youtube"
          />
          <StyledBannerInfos>
            <Title size="h2" weight="800">
              {channelById?.title}
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
              {channelById?.subscriberCount} abonnés
            </Text>
            <Text size="l" style={{ marginBottom: "10px" }}>
              {channelId}
            </Text>
            <Text size="l">
              {channelById?.viewCount} vues - {channelById?.videoCount} vidéos
            </Text>
          </StyledBannerInfos>
        </StyledChannelBannerContainer>

        <Button
          label={"S'abonner"}
          icon={<Wifi />}
          onClick={() => console.log("ok")}
          color="red"
          style={{
            margin: "auto 0 auto auto",
            borderRadius: "35px",
          }}
        />
      </StyledChannelData>
      <Text style={{ padding: "0 80px" }}> {channelById?.description}</Text>
      <StyledHr />
      <StyledVideosContainer>
        {channelById?.videos.map((video, key) => (
          <CardItem
            item={video}
            channel={channelById}
            key={key}
            style={{ marginBottom: "25px" }}
          />
        ))}
      </StyledVideosContainer>
      <CarouselModal />
    </div>
  );
}
