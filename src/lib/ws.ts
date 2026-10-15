const WS_URL = process.env.NEXT_PUBLIC_WS_URL!;

type MessageHandler = (data: Record<string, unknown>) => void;

let socket: WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Map<string, Set<MessageHandler>>();

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function connect(channel: string) {
  if (socket?.readyState === WebSocket.OPEN) return;

  const token = getToken();
  const url = `${WS_URL}/${channel}/${token ? `?token=${token}` : ""}`;

  socket = new WebSocket(url);

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const type = message.type as string;
    const handlers = listeners.get(type);
    handlers?.forEach((handler) => handler(message));
  };

  socket.onclose = () => {
    reconnectTimer = setTimeout(() => connect(channel), 3000);
  };
}

export function disconnect() {
  if (reconnectTimer) clearTimeout(reconnectTimer);
  socket?.close();
  socket = null;
}

export function subscribe(type: string, handler: MessageHandler) {
  if (!listeners.has(type)) listeners.set(type, new Set());
  listeners.get(type)!.add(handler);
  return () => listeners.get(type)?.delete(handler);
}
