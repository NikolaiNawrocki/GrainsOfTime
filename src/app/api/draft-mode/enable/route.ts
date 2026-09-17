import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") || "/";

  // Check secret
  if (secret !== process.env.SANITY_API_READ_TOKEN && secret !== "preview-secret") {
    return new Response("Invalid preview token", { status: 401 });
  }

  // Enable Draft Mode in Next.js 15
  const draft = await draftMode();
  draft.enable();

  redirect(slug);
}
