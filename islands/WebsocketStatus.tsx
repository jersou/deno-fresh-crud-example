import { signal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { toast, ToastContainer } from "react-toastify";

function toastEvent(event: MessageEvent) {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case "truncate":
      toast("🗑️ truncate !");
      break;
    case "delete":
      toast("➖ Delete data : " + data.id);
      break;
    case "insert":
      toast("➕ New data : " + data.data.id);
      break;
    case "update":
      toast("✏ update data : " + data.data.id);
      break;
  }
}

export const websockSignal = signal<WebSocket | undefined>(undefined);

export function WebsocketStatus() {
  useEffect(() => {
    websockSignal.value = new WebSocket("/api/websocket");
    websockSignal.value.addEventListener("message", (event) => {
      console.log("New WS message", event.data);
      toastEvent(event);
    });
    websockSignal.value.addEventListener("close", (event) => {
      console.log("close WS", event);
      websockSignal.value = undefined;
      toast("WS closed !");
    });
  }, []);
  return (
    <div class="flex m-2">
      <ToastContainer />
      <div
        class={"rounded-lg p-2 " +
          (websockSignal.value ? "bg-green-400" : "bg-rose-600")}
      >
        Server status : {websockSignal.value ? "UP" : "DOWN"}
      </div>
    </div>
  );
}
