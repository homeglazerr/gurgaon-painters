import { connection } from "next/server";
import { getAdminAccess } from "@/lib/auth/admin";
import { ENQUIRY_STATUSES } from "@/lib/enquiry-config";
import { getDatabaseClient } from "@/lib/db";

const noStore = { "Cache-Control": "no-store" };

async function requireAdmin() {
  const access = await getAdminAccess();

  if (access.status !== "authorized") {
    return Response.json(
      { error: "Administrator access is required." },
      { status: 403, headers: noStore },
    );
  }

  return null;
}

export async function GET() {
  await connection();

  const denied = await requireAdmin();
  if (denied) {
    return denied;
  }

  const sql = getDatabaseClient();
  const enquiries = await sql`
    SELECT id, name, phone, service, message, status, created_at
    FROM enquiries
    ORDER BY created_at DESC
    LIMIT 200
  `;

  return Response.json({ enquiries }, { headers: noStore });
}

export async function PATCH(request) {
  await connection();

  const denied = await requireAdmin();
  if (denied) {
    return denied;
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "The update could not be read." },
      { status: 400, headers: noStore },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json(
      { error: "Please provide a valid enquiry update." },
      { status: 400, headers: noStore },
    );
  }

  if (
    typeof body.id !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.id) ||
    !ENQUIRY_STATUSES.includes(body.status)
  ) {
    return Response.json(
      { error: "A valid enquiry and status are required." },
      { status: 400, headers: noStore },
    );
  }

  const sql = getDatabaseClient();
  const updated = await sql`
    UPDATE enquiries
    SET status = ${body.status}
    WHERE id = ${body.id}
    RETURNING id, status
  `;

  if (updated.length === 0) {
    return Response.json(
      { error: "This enquiry could not be found." },
      { status: 404, headers: noStore },
    );
  }

  return Response.json({ enquiry: updated[0] }, { headers: noStore });
}
