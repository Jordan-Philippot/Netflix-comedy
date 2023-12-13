import { useEffect, useState } from "react";
import styled from "styled-components";
import { useModal } from "components/context/ModalContext";
import { useSubscription } from "hooks/useSubscription";

// --------------
// Components
// --------------
import Button from "components/ui/Button";
import Wifi from "../icon/Wifi";
import Text from "components/ui/Text";
import Check from "components/icon/Check";
import { useAuth } from "hooks/useAuth";
import { useNavigate } from "react-router-dom";

const StyledChannelData = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const StyledChannelBannerContainer = styled.div<{
  onClick: React.MouseEventHandler<HTMLDivElement>;
}>`
  display: flex;
  :hover {
    cursor: pointer;
  }
`;
const StyledBanner = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;
const StyledBannerInfos = styled.div`
  margin: auto auto auto 15px;
`;

export default function ChannelDescription() {
  let navigate = useNavigate();
  const { selectedChannel } = useModal();
  const { user } = useAuth();
  const {
    addSubscription,
    removeSubscription,
    userSubscriptions,
    findUserSubscription,
  } = useSubscription();
  const [isSubscribed, setIsSubscribed] = useState<boolean>();

  useEffect(() => {
    if (selectedChannel)
      findUserSubscription(selectedChannel.channelId, setIsSubscribed);
  }, [userSubscriptions, selectedChannel, findUserSubscription]);

  return (
    <>
      {selectedChannel && (
        <StyledChannelData>
          <StyledChannelBannerContainer
            onClick={() => navigate(`/channel/${selectedChannel.customUrl}`)}
          >
            <StyledBanner
              src={selectedChannel.thumbnails?.medium?.url}
              alt="Chaine youtube"
            />
            <StyledBannerInfos>
              <Text weight="800">{selectedChannel?.title}</Text>
              <Text> {selectedChannel.subscriberCount} abonnés</Text>
            </StyledBannerInfos>
          </StyledChannelBannerContainer>

          <Button
            label={isSubscribed ? "Abonné(e)" : "S'abonner"}
            icon={isSubscribed ? <Check /> : <Wifi />}
            onClick={() =>
              isSubscribed
                ? removeSubscription(selectedChannel.channelId)
                : addSubscription(selectedChannel.channelId)
            }
            color="red"
            disabled={!user}
            style={{
              margin: "auto 0 auto auto",
              borderRadius: "35px",
              whiteSpace: "nowrap",
            }}
          />
        </StyledChannelData>
      )}
    </>
  );
}
