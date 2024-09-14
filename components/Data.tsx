import { DataType } from "@/services/db.ts";
import { Button } from "@/components/Button.tsx";
import { useState } from "preact/hooks";

export function Data(props: { data: DataType }) {
  const [dataProp1, setDataProp1] = useState(props.data.dataProp1);

  return (
    <div class="flex gap-2">
      <Button
        onClick={() =>
          fetch(`/api/delete?id=${props.data.id}`, { method: "POST" })}
      >
        🗑️ Delete
      </Button>
      <input
        value={dataProp1}
        onChange={(e) => setDataProp1((e.target as HTMLInputElement)?.value)}
        class="bg-clip-border p-6 bg-violet-300 border-4 border-violet-300 border-dashed rounded-lg grow"
      />
      <Button
        onClick={() =>
          fetch("/api/update", {
            method: "POST",
            body: JSON.stringify({ id: props.data.id, dataProp1: dataProp1 }),
          })}
      >
        ✏ Edit
      </Button>
    </div>
  );
}
