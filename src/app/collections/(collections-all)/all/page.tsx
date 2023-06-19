import { getCollections } from "@/libs/shopify"
import Collections from "./Collections";

const Page = async() => {
    const result = await getCollections({first:10})
    return (
        <Collections {...result} />
    )
}

export default Page