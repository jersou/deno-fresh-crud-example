import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { Button } from "@/components/Button.tsx";
import { Data } from "@/components/Data.tsx";
import { DataType } from "@/services/db.ts";
import { websockSignal } from "@/islands/WebsocketStatus.tsx";
import { AddData } from "./AddData.tsx";
import { ClearDatas } from "./ClearDatas.tsx";

export function DataList() {
  const datas = useSignal<DataType[]>([]);
  const updateDatas = async (m?: MessageEvent) => {
    if (m?.data) {
      const type = JSON.parse(m?.data).type;
      if (type === "update") {
        datas.value = [];
      }
    }

    const resp = await fetch("/api/list?size=10&page=1");
    datas.value = await resp.json();
  };

  useEffect(() => {
    updateDatas().then();
  }, []);

  useEffect(() => {
    if (websockSignal.value) {
      const ws = websockSignal.value;
      ws.addEventListener("message", updateDatas);
      return () => ws.removeEventListener("message", updateDatas);
    }
  }, [websockSignal.value]);

  return (
    <>
      <div class="grid grid-cols-1 gap-2">
        <div class="grid grid-cols-2 gap-2">
          <ClearDatas />
          <Button
            onClick={() => {
              datas.value = [];
              updateDatas().then();
            }}
          >
            🔄 Refresh
          </Button>
          <AddData />
        </div>
        <div class="grid grid-cols-1 gap-2">
          {datas.value.map((data) => <Data key={data.id} data={data}></Data>)}
        </div>
      </div>
    </>
  );
}
