import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "./env";
import { SanityImage } from "@/types";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "grains-project-id",
  dataset: dataset || "production",
});

export function urlForImage(source: SanityImage | any) {
  if (!source || !source.asset) {
    return null;
  }
  return imageBuilder.image(source).auto("format").fit("max");
}
