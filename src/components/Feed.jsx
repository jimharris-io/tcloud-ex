import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

export default function Feed({ category, openLightBox }) {
  // call lightbox
  const openLightBoxHandler = (photo) => {
    openLightBox(photo);
  };

  // get photos in category, reload when category changes
  const {
    isLoading: loadingPhotos,
    error: errorPhotos,
    data: photosData,
  } = useQuery({
    queryKey: ["photos", { queryType: category }],
    queryFn: async () => {
      const search = category.replace("-", " ");
      return fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5d03c785f2c85eb9b912b2c7516430ca&tags=${search}&media=ph&extras=media&format=json&nojsoncallback=1`
      ).then((res) => res.json());
    },
  });

  // get videos in category, reload when category changes
  const {
    isLoading: loadingVideos,
    error: errorVideos,
    data: videosData,
  } = useQuery({
    queryKey: ["videos", { queryType: category }],
    queryFn: async () => {
      const search = category.replace("-", " ");
      return fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5d03c785f2c85eb9b912b2c7516430ca&tags=${search}&media=videos&extras=media&format=json&nojsoncallback=1`
      ).then((res) => res.json());
    },
    enabled: !!photosData,
  });

  // create media feed when data available
  // https://www.flickr.com/services/api/misc.urls.html
  // https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
  let photoUrl = "";
  let grid = <></>;
  if (photosData?.photos?.photo && videosData?.photos?.photo) {
    const merged = [...photosData.photos.photo, ...videosData.photos.photo];
    grid = merged.map((photo, i) => {
      photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
      return (
        <li
          className="relative cursor-pointer"
          onClick={() => openLightBoxHandler(photo)}
          key={`${photo}${i}`}
        >
          <img src={photoUrl} alt="Product image thumbnail."></img>
          {photo.media === "video" ? (
            <div className="video-thumbnail"></div>
          ) : null}
        </li>
      );
    });
  }

  const heading = category?.replace("-", " ");

  // render feed
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
        <ul className="grid grid-cols-8 gap-2">{grid}</ul>
      </CardBody>
    </Card>
  );
}
