export default function LightBox({ contents, close }) {

  // photo or video
  let photo = null;
  let src = `https://live.staticflickr.com/${contents.server}/${contents.id}_${contents.secret}_c.jpg`;
  if (contents.media === "photo") {
    photo = <img className="max-h-[80vh]" src={src} />;
  } else {
    let href = `https://www.flickr.com/photos/${contents.owner}/${contents.id}`;
    photo = (
      <a data-flickr-embed href={href}>
        <img src={src} width="640" height="360" alt="Product image." />
      </a>
    );
  }

  // render lightbox
  return (
    <section
      onClick={close}
      className="bg-black text-white fixed bg-opacity-80 z-50 w-full h-full flex items-center justify-center"
    >
      <span
        onClick={close}
        className="z-20 cursor-pointer select-none absolute text-sm underline right-2 top-2 p-4"
      >
        close
      </span>
      <div className="z-10">{photo}</div>
      <div className="absolute flex w-full h-full items-center justify-center text-sm">
        <span>loading</span>
      </div>
    </section>
  );
}

/* max height */
