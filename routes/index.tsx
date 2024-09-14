import { WebsocketStatus } from "@/islands/WebsocketStatus.tsx";
import { DataList } from "@/islands/DataList.tsx";

export default function Home() {
  return (
    <div class="px-4 py-4 mx-auto">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold py-4">Deno Fresh Example</h1>
        <WebsocketStatus />
        <DataList />
      </div>
    </div>
  );
}
