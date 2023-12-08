import styled from "styled-components";
import { useSubscription } from "hooks/useSubscription";

// --------------
// Components
// --------------
import CardItem from "components/CardItem";
import CarouselModal from "components/videoModal/VideoModal";
import Title from "components/ui/Title";

const StyledFavoritesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  margin-top: 120px;
  padding: 0 20px;
  height: 100vh;
`;
const StyledVideosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 50px 0;
`;

export default function UserSubscriptions() {
  const { userSubscriptions } = useSubscription();

  return (
    <>
      <StyledFavoritesContainer>
        <Title weight="800">Mes abonnements</Title>
        {/* Channel Informations */}
        {userSubscriptions && (
          <StyledVideosContainer>
            {userSubscriptions.map((subscripion) =>
              subscripion.videos.map((video, key) => (
                <CardItem
                  item={video}
                  channel={subscripion.channel}
                  key={key}
                  style={{ marginBottom: "25px" }}
                />
              ))
            )}
          </StyledVideosContainer>
        )}
        <CarouselModal />
      </StyledFavoritesContainer>
    </>
  );
}
