import { NextResponse } from "next/server";
import { databases } from "@/services/appwrite";
import { Query } from "appwrite";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export async function GET(request) {
  try {
    // Rate limiting
    try {
      await limiter.check(request, 10);
    } catch {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // Input validation
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Input sanitization
    if (
      typeof userId !== "string" ||
      userId.length > 100 ||
      !/^[a-zA-Z0-9-_]+$/.test(userId)
    ) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const response = await databases.listDocuments(
      "672cfccb002f456cb332",
      "6741d7f2000200706b21",
      [Query.equal("userId", userId)]
    );

    return NextResponse.json(
      {
        exists: response.documents.length > 0,
      },
      {
        headers: {
          "Content-Security-Policy": "default-src 'self'",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "1; mode=block",
        },
      }
    );
  } catch (error) {
    console.error("Error checking submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
