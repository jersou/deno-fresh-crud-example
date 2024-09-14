import { useRef } from "preact/hooks";
import { Button } from "@/components/Button.tsx";

export function AddData() {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <input className="rounded-md border-2 p-1" ref={ref} />
      <Button
        onClick={() =>
          fetch("/api/add", {
            method: "POST",
            body: JSON.stringify({ dataProp1: ref.current?.value }),
          })}
      >
        ➕ Add
      </Button>
    </>
  );
}
