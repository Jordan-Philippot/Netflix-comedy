interface ThumbnailType {
  url: string;
  width: number;
  height: number;
}

interface LocalizedType {
  title: string;
  description: string;
}
// --------------
// Vidéo Type
// --------------

export interface VideoDataType {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default?: ThumbnailType;
    medium?: ThumbnailType;
    high?: ThumbnailType;
    standard?: ThumbnailType;
    maxres?: ThumbnailType;
  };
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: LocalizedType;
}

// --------------
// Channel Type
// --------------
interface ThumbnailsChannelType {
  default: ThumbnailType;
  medium: ThumbnailType;
  high: ThumbnailType;
}
interface SnippetType {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: ThumbnailsChannelType;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface IdItemType {
  kind: string;
  videoId: string;
}

export interface ItemType {
  kind: string;
  etag: string;
  id: IdItemType;
  snippet: SnippetType;
}

interface PageInfoType {
  totalResults: number;
  resultsPerPage: number;
}

export interface ChannelResponseType {
  kind?: string;
  etag?: string;
  nextPageToken?: string;
  regionCode?: string;
  pageInfo?: PageInfoType;
  items: ItemType[];
}
