import { ChannelResponseType, VideoDataType } from "./youtube.type";

const BASE_URL = process.env.REACT_APP_API_URL_YOUTUBE;
const API_KEY = process.env.REACT_APP_API_URL_YOUTUBE_API_KEY;

export const getDefaultConfig = () => ({
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    //   Authorization: `Bearer BQC4uzixu-S2uJrDIVQSGv2FR-M4VFhwBMPQZ83NqJwgu_3PwTVjK1sWZQhxYrHa4e3zy6Ie5v9GlECuScuKuF_ONYWMJdZzq2pBYZDhN6dDJwYhAjn4bhWBbDx4BxOfR9jbPIu8gFIaAG-wifgZBTX9xWdi4cglMWQ9jmyGBJA5x1x2QvrVJ94qCLfW83f4SKxeB3qKBpFdz3azGsEJJIKWfNlI6xzBHf3woqGb7iKzCTVAJc608pB-AGZwrDnYaLd5oPgmTadtG8q80RQNAG8YK5Z3g0JSmCST70XmXroVSHe5`,
  },
});

export const getVidéoById = async (videoId: string): Promise<VideoDataType> => {
  const response = await fetch(
    `${BASE_URL}videos?part=snippet&id=${videoId}&key=${API_KEY}`
  );
  const data = await response.json();
  const videoData = data.items[0].snippet;
  //console.log(videoData);
  return videoData;
};

export const getVidéosByChannelId = async (
  channelId: string
): Promise<ChannelResponseType> => {
  const response = await fetch(
    `${BASE_URL}search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=8`
  );
  const data = await response.json();
  return data;
};
