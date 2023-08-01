import Image from "next/image";
import ProductLists from "@/components/ProductLists"
import { getImage } from "@/libs/image"
import { getCollectionProducts } from "@/libs/shopify"

const Page = async({params}: {params: { handle: string }}) => {

  const {title,description, collectionImage, products} = await getCollectionProducts({handle:params.handle, first: 50})

  const  {base64, img: { src }} = await getImage(collectionImage.url)

  return (
    <>
      <div className="mb-4 md:mt-4 flex flex-col-reverse lg:flex-row justify-center gap-[30px] items-center" >
        <div className="w-[75%] md:w-4/5 lg:w-[40%]" >
          <h1 className="text-4xl font-bold text-center lg:text-left " >{title}</h1>
          <p className="mt-3 text-[16px] md:text-lg" >{description}</p>
        </div>
        <div id="collection-image" className="w-full md:w-4/5 lg:w-[40%] rounded-lg h-[300px]" >
          <Image 
            src={src}
            alt={collectionImage.altText}
            width={collectionImage.width}
            height={300}
            placeholder="blur"
            blurDataURL={base64}
            className="w-full h-full relative md:rounded-lg transition-all duration-300"
          />
        </div>
      </div>
      <ProductLists products={products} />
    </>
  )
}

export default Page
