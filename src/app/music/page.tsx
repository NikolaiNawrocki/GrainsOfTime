import { redirect } from "next/navigation";
import { getSiteSettings } from "@/lib/sanity/queries";

export default async function MusicPage() {
  const settings = await getSiteSettings();
  const spotifyUrl =
    settings?.socialLinks?.spotify ||
    "https://open.spotify.com/artist/4oHl4fefbY77maGXUyGZeW?si=mVbG3OowSiGR2XN1FCG6jg";

  redirect(spotifyUrl);
}
