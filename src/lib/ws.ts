type MessageHandler = (data: MarketUpdate) => void;

export interface MarketOutcome {
  id: number;
  label?: string;
  code: string;
  participant_id?: string | null;
  staked_total?: number;
  multiplier_display: number;
  change_pct: number;
  is_indicative?: boolean;
  result?: string;
  display_order?: number;
}

export interface MarketUpdate {
  market_id: string;
  event_id: string;
  market_label: string;
  market_status: "open" | "locked" | "settled";
  pool_total: number;
  outcomes: MarketOutcome[];
}

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_WS_URL) {
    return process.env.NEXT_PUBLIC_WS_URL;
  }
  const scheme = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${scheme}//${window.location.host}`;
}

const MAX_RECONNECT_DELAY = 30_000;

export class WSChannel {
  private ws: WebSocket | null = null;
  private listeners = new Set<MessageHandler>();
  private reconnectDelay = 1_000;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private closed = false;
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN || this.ws?.readyState === WebSocket.CONNECTING) return;
    this.closed = false;

    const url = `${getBaseUrl()}${this.path}`;
    this.ws = new WebSocket(url);

    this.ws.onmessage = (ev) => {
      try {
        const data: MarketUpdate = JSON.parse(ev.data);
        this.listeners.forEach((fn) => fn(data));
      } catch {
        // ignore malformed messages
      }
    };

    this.ws.onopen = () => {
      this.reconnectDelay = 1_000;
    };

    this.ws.onclose = () => {
      if (this.closed) return;
      this.reconnectTimer = setTimeout(() => this.connect(), this.reconnectDelay);
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, MAX_RECONNECT_DELAY);
    };
  }

  disconnect() {
    this.closed = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.ws?.close();
    this.ws = null;
  }

  subscribe(handler: MessageHandler): () => void {
    this.listeners.add(handler);
    return () => this.listeners.delete(handler);
  }
}
