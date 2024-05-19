import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Feed({ category }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["photos"] });
  }, [category]);

  const {
    isLoading: loadingPhotos,
    error: errorPhotos,
    data: photosData,
  } = useQuery({
    queryKey: ["photos"],
    queryFn: async () => {
      return fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5d03c785f2c85eb9b912b2c7516430ca&tags=${category}&media=ph&extras=media&format=json&nojsoncallback=1`
      ).then((res) => res.json());
    },
  });

  const {
    isLoading: loadingVideos,
    error: errorVideos,
    data: videosData,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      return fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5d03c785f2c85eb9b912b2c7516430ca&tags=${category}&media=videos&extras=media&format=json&nojsoncallback=1`
      ).then((res) => res.json());
    },
    // enabled: !!photosData,
  });

  // let photosMessage = "";
  // if(loadingPhotos || loadingVideos) photosMessage = "loading";
  // if(errorPhotos || errorVideos) photosMessage = "error";

  let photoUrl = "";
  let grid = <></>;
  if (photosData?.photos?.photo/* && videosData?.photos?.photo*/) {
    // const example = photosData.photos.photo[0];
    // console.log(photosData.photos.photo.length);
    grid = photosData.photos.photo.map((photo, i) => {
      photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
      return <img key={`${photo}${i}`} src={photoUrl}></img>;
    });
    // photosMessage = `${photosData.photos.photo.length}/${videosData.photos.photo.length}`;
  }

  return (
    <>
      {/* <p>feed: {photosMessage}</p> */}
      <p>category: {category}</p>
      <div className="grid grid-cols-4 gap-2">{grid}</div>
      {/* <a href={photoUrl}>{photoUrl}</a> */}
    </>
  );
}
/*

videos
https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5d03c785f2c85eb9b912b2c7516430ca&tags=school&media=videos&extras=media&format=json&nojsoncallback=1

photos
https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5d03c785f2c85eb9b912b2c7516430ca&tags=school&media=ph&extras=media&format=json&nojsoncallback=1

*/
// https://www.flickr.com/services/api/misc.urls.html
// https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
