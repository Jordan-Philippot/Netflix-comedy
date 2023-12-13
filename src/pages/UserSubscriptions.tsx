import styled from "styled-components";
import { useSubscription } from "hooks/useSubscription";

// --------------
// Components
// --------------
import CardItem from "components/CardItem";
import CarouselModal from "components/videoModal/VideoModal";
import Title from "components/ui/Title";

export const StyledPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: auto;
  min-height: 95vh;
`;
export const StyledVideosContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 80px 0;
  margin: 50px 0;
`;

export default function UserSubscriptions() {
  const { userSubscriptions } = useSubscription();

  return (
    <>
      <StyledPageContainer>
        <Title weight="800" style={{ marginTop: "120px" }}>
          Mes abonnements
        </Title>
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
      </StyledPageContainer>
    </>
  );
}
