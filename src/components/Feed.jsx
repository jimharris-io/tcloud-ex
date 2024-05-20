import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

export default function Feed({ category, openLightBox }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["photos"] });

    //queryClient.setQueryData(["photos"], (oldData) => photosData)
  }, [category]);

  const openLightBoxHandler = (photo) => {
    const photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`;  
    openLightBox(<img src={photoUrl}></img>);
  }

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
  if (photosData?.photos?.photo /* && videosData?.photos?.photo*/) {
    grid = photosData.photos.photo.map((photo, i) => {
      photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
      return <img onClick={()=>openLightBoxHandler(photo)} key={`${photo}${i}`} src={photoUrl}></img>;
    });
    // photosMessage = `${photosData.photos.photo.length}/${videosData.photos.photo.length}`;
  }

  const heading = category?.replace("-", " ");

  return (
    <Card className="p-4">
      <CardHeader className="flex flex-col items-start gap-2">
        <div className="flex gap-2">
          <h1 className=" tracking-tight inline font-semibold from-[#5EA2EF] to-[#0072F5] text-4xl bg-clip-text text-transparent bg-gradient-to-b">
            Media feed
          </h1>
          <h1 className="tracking-tight inline font-semibold text-4xl bg-clip-text text-default-500">
            {heading}
          </h1>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-8 gap-2">{grid}</div>
      </CardBody>
    </Card>
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

// https://stackoverflow.com/questions/74851352/react-query-invalidating-query-working-but-parameters-are-outdated

// https://www.npmjs.com/package/lightbox.js-react
// https://www.lightgalleryjs.com/docs/react-image-video-gallery/
