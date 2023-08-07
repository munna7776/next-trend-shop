import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/libs/shopify";
import { getImage } from "@/libs/image";
import ConsoleClient from "../ConsoleClient";

const Collections = async () => {
  const { collections } = await getCollections({ first: 4 });
  // console.log(collections)
  const collectionsImagesWithPlaceholder = await Promise.all(
    collections.map(async (collection) => {
      const {
        base64,
        img: { src },
      } = await getImage(collection.image.url);
      return { base64, src };
    })
  );
  return (
    <>
    <ul className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-10 mt-4">
      {collections.map((collection, index) => {
        return (
          <li key={index} className="grid h-[350px] rounded-lg overflow-hidden">
            <div className="row-start-1 row-end-2 col-start-1 col-end-2 relative h-full overflow-hidden">
                <Image
                  src={collectionsImagesWithPlaceholder[index].base64}
                  // src={collection.image.url}
                  alt={collection.image.altText}
                  fill
                  priority
                  placeholder="blur"
                  blurDataURL={collectionsImagesWithPlaceholder[index].base64}
                  className="rounded-lg h-full object-cover object-center transition-all origin-center duration-[2000ms] hover:scale-110"
                />
            </div>
            <Link
              className="row-start-1 row-end-2 col-start-1 col-end-2 bg-white font-medium text-gray-900 rounded-xl px-10 py-1 text-lg self-end z-[19] mx-auto mb-[20px] shadow-[0px_3px_8px_rgba(0,0,0,0.24)]"
              href={`/collections/${collection.handle}`}
            >
              {collection.title}
            </Link>
          </li>
        );
      })}
    </ul>
    <ConsoleClient collections={collections} />
    </>
  );
};

export default Collections;
