import { FreshContext } from "$fresh/server.ts";
import { deleteData } from "@/services/db.ts";
import { sockets } from "@/services/websockets.ts";

export const handler = (
  _req: Request,
  _ctx: FreshContext,
): Response => {
  const url = new URL(_req.url);
  const id = url.searchParams.get("id");
  deleteData(id!);
  sockets.forEach((s) => s.send(JSON.stringify({ type: "delete", id })));
  return new Response(id);
};
