import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ChannelData } from "api/channel.type";
import { VideoYoutubeType } from "api/video.type";

interface YoutubeStateProps {
  homepageVideo: VideoYoutubeType;
  channels: ChannelData[];
  channelById: ChannelData;
}

const initialState = {
  homepageVideo: {
    channelId: "",
    title: "",
  },
  channels: [],
  channelById: { id: 0, title: "", channelId: "", videos: [] },
} as YoutubeStateProps;

const youtubeSlice = createSlice({
  name: "youtube",
  initialState,
  reducers: {
    provideHomeVideo(state, action: PayloadAction<VideoYoutubeType>) {
      state.homepageVideo = action.payload;
    },
    provideChannels(state, action: PayloadAction<ChannelData[]>) {
      state.channels = action.payload;
    },
    provideChannelById(state, action: PayloadAction<ChannelData>) {
      state.channelById = action.payload;
    },
  },
});

export const { provideHomeVideo, provideChannels, provideChannelById } =
  youtubeSlice.actions;
export default youtubeSlice.reducer;
