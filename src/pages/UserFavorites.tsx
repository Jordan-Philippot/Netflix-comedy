import { useFavorite } from "hooks/useFavorite";

// --------------
// Components
// --------------
import CardItem from "components/CardItem";
import CarouselModal from "components/videoModal/VideoModal";
import Title from "components/ui/Title";

// ----------
// Assets
// ----------
import {
  StyledPageContainer,
  StyledVideosContainer,
} from "./UserSubscriptions";

export default function UserFavorites() {
  const { userFavorites } = useFavorite();

  return (
    <>
      <StyledPageContainer>
        <Title weight="800" style={{ marginTop: "120px" }}>
          Ma liste
        </Title>
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
      </StyledPageContainer>
    </>
  );
}
