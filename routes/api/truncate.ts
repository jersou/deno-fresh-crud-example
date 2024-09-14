import { FreshContext, Handlers } from "$fresh/server.ts";
import { truncate } from "@/services/db.ts";
import { sockets } from "@/services/websockets.ts";
import * as log from "@std/log";
import { setupLog } from "@/services/setupLog.ts";
setupLog(log);

export const handler: Handlers = {
  POST(_req: Request, _ctx: FreshContext): Response {
    log.info("truncate");
    truncate();
    sockets.forEach((s) => s.send(JSON.stringify({ type: "truncate" })));
    return new Response("done");
  },
};
