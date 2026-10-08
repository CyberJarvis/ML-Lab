import { NextResponse } from "next/server";
import { experiments } from "@/lib/experiments-data";
import { getDb } from "@/lib/mongodb";

const MAX_COMMENT_LENGTH = 2000;
// "course" is the site-wide form on the Misc. page; the rest are experiment ids.
const VALID_TARGETS = new Set(["course", ...experiments.map((e) => e.id)]);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { experimentId, rating, comment } = (body ?? {}) as Record<string, unknown>;

  if (typeof experimentId !== "string" || !VALID_TARGETS.has(experimentId)) {
    return NextResponse.json({ error: "Unknown experiment" }, { status: 400 });
  }
  if (rating !== null && !(Number.isInteger(rating) && (rating as number) >= 1 && (rating as number) <= 5)) {
    return NextResponse.json({ error: "Rating must be 1 to 5" }, { status: 400 });
  }
  if (typeof comment !== "string" || comment.length > MAX_COMMENT_LENGTH) {
    return NextResponse.json({ error: "Comment is too long" }, { status: 400 });
  }
  const trimmed = comment.trim();
  if (rating === null && trimmed === "") {
    return NextResponse.json({ error: "Nothing to save" }, { status: 400 });
  }

  try {
    const db = await getDb();
    await db.collection("feedback").insertOne({
      experimentId,
      rating: rating as number | null,
      comment: trimmed,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Feedback insert failed:", error);
    return NextResponse.json({ error: "Could not save feedback" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
