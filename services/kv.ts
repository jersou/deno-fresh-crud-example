/// <reference lib="deno.unstable" />

import * as log from "@std/log";
import { setupLog } from "@/services/setupLog.ts";
setupLog(log);
log.info("Use denoKV database");
export const kv = await Deno.openKv();

export type DataType = {
  id: string;
  dataProp1: string;
};

export function insert(row: DataType) {
  return kv.set(["datas", row.id], row);
}

export async function getDatas(size: number): Promise<DataType[]> {
  return (await Array.fromAsync(
    kv.list({ prefix: ["datas"] }, { reverse: true, limit: size }),
  )).map((d) => d.value) as unknown as DataType[];
}

export async function updateData(id: string, newData: string) {
  const data = await kv.get(["datas", id]);
  if (data) {
    await kv.set(["datas", id], { id, dataProp1: newData });
  }
}

export function deleteData(id: string) {
  return kv.delete(["datas", id]);
}

export async function truncate() {
  for await (const data of kv.list({ prefix: ["datas"] })) {
    await kv.delete(data.key);
  }
}
