import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ChannelResponseType, VideoDataType } from "api/youtube.type";

interface YoutubeStateProps {
  homepageVideo: VideoDataType;
  channelPanamArt: ChannelResponseType;
  channelRomanFrayssinet: ChannelResponseType;
}

const initialState = {
  homepageVideo: {
    publishedAt: "",
    channelId: "",
    title: "",
    description: "",
    thumbnails: {},
    channelTitle: "",
    tags: [],
    categoryId: "",
    liveBroadcastContent: "",
    localized: {
      title: "",
      description: "",
    },
  },
  channelPanamArt: {
    items: [],
  },
  channelRomanFrayssinet: {
    items: [],
  },
} as YoutubeStateProps;

const youtubeSlice = createSlice({
  name: "youtube",
  initialState,
  reducers: {
    provideHomeVideo(state, action: PayloadAction<VideoDataType>) {
      state.homepageVideo = action.payload;
    },
    provideChannelPanamArt(state, action: PayloadAction<ChannelResponseType>) {
      state.channelPanamArt = action.payload;
    },
    provideChannelRomanFrayssinet(
      state,
      action: PayloadAction<ChannelResponseType>
    ) {
      state.channelRomanFrayssinet = action.payload;
    },
  },
});

export const {
  provideHomeVideo,
  provideChannelPanamArt,
  provideChannelRomanFrayssinet,
} = youtubeSlice.actions;
export default youtubeSlice.reducer;
