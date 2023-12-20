import styled from "styled-components";
import { useSubscription } from "hooks/useSubscription";

// --------------
// Components
// --------------
import CardItem from "components/CardItem";
import Title from "components/ui/Title";
import { device } from "utils/breakpoints";

export const StyledPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 95vh;
  padding: 0 20px;

  @media ${device.laptop} {
    padding: 0 40px;
  }
  @media ${device.laptopL} {
    padding: 0 60px;
  }
`;
export const StyledVideosContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 20px 0;
  margin: 50px 0;

  @media ${device.mobile} {
    .card-item {
      max-width: 200px;
    }
  }
  @media ${device.laptop} {
    gap: 80px 0;
    .card-item {
      max-width: 250px;
    }
  }
  @media ${device.laptopL} {
    .card-item {
      max-width: unset;
    }
  }
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
      </StyledPageContainer>
    </>
  );
}
