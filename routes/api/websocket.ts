import { FreshContext } from "$fresh/server.ts";
import { sockets } from "@/services/websockets.ts";
import * as log from "@std/log";

export const handler = (
  _req: Request,
  _ctx: FreshContext,
): Response => {
  if (_req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  } else {
    log.info("new websocket");
    const { socket, response } = Deno.upgradeWebSocket(_req);
    socket.addEventListener("open", () => sockets.add(socket));
    socket.addEventListener("close", () => sockets.delete(socket));
    return response;
  }
};
