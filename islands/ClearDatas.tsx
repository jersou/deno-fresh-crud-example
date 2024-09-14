import { Button } from "@/components/Button.tsx";

export function ClearDatas() {
  return (
    <Button onClick={() => fetch("/api/truncate", { method: "POST" })}>
      🗑️ Delete all datas
    </Button>
  );
}
