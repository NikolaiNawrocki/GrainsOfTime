import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-sanity-webhook-secret") || req.nextUrl.searchParams.get("secret");

    if (
      process.env.SANITY_REVALIDATE_SECRET &&
      secret !== process.env.SANITY_REVALIDATE_SECRET
    ) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const tag = body?._type;

    if (tag) {
      revalidateTag(tag);
    }

    // Always revalidate root layouts & paths
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      tag: tag || "all",
      now: Date.now(),
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
