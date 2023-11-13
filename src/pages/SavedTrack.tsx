import { TrackType } from "api/track.type";
import Card from "components/ui/Card";
import { useEffect } from "react";

interface TracksTypeResponse {
  track: TrackType;
}
export default function SavedTrack({ track }: TracksTypeResponse) {

  useEffect(() => {
    console.log(track.album.images[0].url)
  }, [track])
  
  return (
    <>
    <Card img={track.album && track.album.images[0].url} title={track.name}>ok</Card>
    </>
  );
}
