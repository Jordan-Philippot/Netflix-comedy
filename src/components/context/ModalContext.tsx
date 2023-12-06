import { ChannelType } from "api/channel.type";
import { VideoDataType } from "api/video.type";
import { PropsWithChildren, createContext, useContext, useState } from "react";

interface ModalContextProps {
  isModalOpen: boolean;
  openModal: (video: VideoDataType, channel: ChannelType) => void;
  closeModal: () => void;
  selectedVideo: VideoDataType | undefined;
  selectedChannel: ChannelType | undefined;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function ModalProvider({ children }: PropsWithChildren) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoDataType>();
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>();

  const openModal = (video: VideoDataType, channel: ChannelType) => {
    setIsModalOpen(true);
    setSelectedVideo(video);
    setSelectedChannel(channel);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        selectedVideo,
        selectedChannel,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
