import { FreshContext } from "$fresh/server.ts";
import { DataType, updateData } from "@/services/db.ts";
import { sockets } from "@/services/websockets.ts";

export const handler = async (
  _req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  const data: DataType = await _req.json();
  await updateData(data.id, data.dataProp1);
  sockets.forEach((s) => s.send(JSON.stringify({ type: "update", data })));
  return new Response(`${data.id} deleted`);
};
