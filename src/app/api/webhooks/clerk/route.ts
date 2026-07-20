import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { supabase } from "@/lib/supabase";

// Clerk sends webhook events signed with svix.
// Verify the signature, then upsert the user in our DB.

interface ClerkEmailAddress {
  id: string;
  email_address: string;
}

interface ClerkUserEvent {
  data: {
    id: string;
    email_addresses: ClerkEmailAddress[];
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
    phone_numbers: { phone_number: string }[];
  };
  type: string;
}

export async function POST(req: NextRequest) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET env variable");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  // Get the svix headers
  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const body = await req.text();

  let event: ClerkUserEvent;
  try {
    const wh = new Webhook(SIGNING_SECRET);
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkUserEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const { type, data } = event;

  if (type === "user.created" || type === "user.updated") {
    const email = data.email_addresses[0]?.email_address ?? "";
    const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || null;
    const phone = data.phone_numbers?.[0]?.phone_number ?? null;

    // Auto-promote admin/doctor emails
    const ADMIN_EMAILS = ["aryanadlakha002@gmail.com"];
    const DOCTOR_EMAILS: string[] = [];  // add doctor emails here when needed
    const role = ADMIN_EMAILS.includes(email)
      ? "ADMIN"
      : DOCTOR_EMAILS.includes(email)
      ? "DOCTOR"
      : "USER";

    const now = new Date().toISOString();

    // Upsert via Supabase REST
    const { error } = await supabase.from("users").upsert(
      {
        id: data.id,
        email,
        name,
        phone,
        avatarUrl: data.image_url,
        role,
        updatedAt: now,
        createdAt: now,
      },
      { onConflict: "id" }
    );

    if (error) console.error("Failed to upsert user:", error);
  }

  if (type === "user.deleted") {
    const { error } = await supabase.from("users").delete().eq("id", data.id);
    if (error) console.error("Failed to delete user:", error);
  }

  return NextResponse.json({ received: true });
}
