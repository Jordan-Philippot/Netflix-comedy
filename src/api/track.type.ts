export interface SavedTrackPage {
  href: string;
  items: SavedTrackType[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SavedTrackType {
  added_at: string;
  track: TrackType;
}

export interface TrackType {
  album: AlbumSimple;
  available_markets: string[];
  external_urls: ExternalUrls;
  id: string;
  images: Image[];
  name: string;
  type: string;
  uri: string;
  artists: ArtistSimple[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  href: string;
  is_playable: boolean;
  linked_from: LinkedFrom | null;
  preview_url: string;
  track_number: number;
}

export interface AlbumSimple {
  album_type: string;
  available_markets: string[];
  external_urls: ExternalUrls;
  id: string;
  images: Image[];
  name: string;
  type: string;
  uri: string;
}

interface ArtistSimple {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
  available_markets: string[];
}

interface ExternalUrls {
  href: string;
}

export interface Image {
  height: number | null;
  url: string;
  width: number | null;
  name: string;
  type: string;
  uri: string;
}

interface ExternalIds {
  // Vous devrez spécifier la structure des identifiants externes connus.
}

interface LinkedFrom {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
}