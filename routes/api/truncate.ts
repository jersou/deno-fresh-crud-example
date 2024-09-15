import { FreshContext, Handlers } from "$fresh/server.ts";
import { truncate } from "@/services/db.ts";
import { sockets } from "@/services/websockets.ts";
import * as log from "@std/log";
import { setupLog } from "@/services/setupLog.ts";
setupLog(log);

export const handler: Handlers = {
  async POST(_req: Request, _ctx: FreshContext): Promise<Response> {
    log.info("truncate");
    await truncate();
    sockets.forEach((s) => s.send(JSON.stringify({ type: "truncate" })));
    return new Response("done");
  },
};
