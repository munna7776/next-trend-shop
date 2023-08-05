import "server-only";
import { getPlaiceholder } from "plaiceholder";

export const getImage = async (src: string) => {
  // const buffer = await fetch(src).then(async (res) =>
  //   Buffer.from(await res.arrayBuffer())
  // );
  const res = await fetch(src)
  console.log(res)
  const arrayBuffer = await res.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};
