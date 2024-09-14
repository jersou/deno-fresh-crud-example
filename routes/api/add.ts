import { FreshContext, Handlers } from "$fresh/server.ts";
import { DataType, insert } from "@/services/db.ts";
import { sockets } from "@/services/websockets.ts";
import { monotonicUlid } from "@std/ulid";
import * as log from "@std/log";
import { setupLog } from "@/services/setupLog.ts";
setupLog(log);

export const handler: Handlers = {
  async POST(_req: Request, _ctx: FreshContext): Promise<Response> {
    const data: DataType = await _req.json();
    data.id = monotonicUlid();
    log.info("new data", data);
    insert(data);
    sockets.forEach((s) => s.send(JSON.stringify({ type: "insert", data })));
    return new Response(data.id);
  },
};
