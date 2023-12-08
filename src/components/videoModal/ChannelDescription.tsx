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

const StyledChannelData = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const StyledChannelBannerContainer = styled.div`
  display: flex;
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
  const { selectedChannel } = useModal();
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
          <StyledChannelBannerContainer>
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
            icon={isSubscribed ? <Check />: <Wifi />}
            onClick={() => {
              isSubscribed
                ? removeSubscription(selectedChannel.channelId)
                : addSubscription(selectedChannel.channelId);
            }}
            color="red"
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
