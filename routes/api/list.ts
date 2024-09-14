import { FreshContext } from "$fresh/server.ts";
import { getDatas } from "@/services/db.ts";

export const handler = (
  _req: Request,
  _ctx: FreshContext,
): Response => {
  const url = new URL(_req.url);
  const size = parseInt(url.searchParams.get("size") ?? "10");
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const datas = getDatas(size, page);
  const body = JSON.stringify(datas, null, " ");
  return new Response(body);
};
