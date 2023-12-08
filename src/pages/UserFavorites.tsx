import styled from "styled-components";
import { useFavorite } from "hooks/useFavorite";

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
  justify-content: start;
  margin: 50px 0;
`;

export default function UserFavorites() {
  const { userFavorites } = useFavorite();

  return (
    <>
      <StyledFavoritesContainer>
        <Title weight="800">Ma liste</Title>
        {/* Channel Informations */}
        {userFavorites && (
          <StyledVideosContainer>
            {userFavorites.map((favorite, key) => (
              <CardItem
                item={favorite.video}
                channel={favorite.video.channel}
                key={key}
                style={{ marginBottom: "25px" }}
              />
            ))}
          </StyledVideosContainer>
        )}
        <CarouselModal />
      </StyledFavoritesContainer>
    </>
  );
}
