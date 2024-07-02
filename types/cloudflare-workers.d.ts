// types/cloudflare-workers.d.ts
declare interface ExecutionContext {
    waitUntil(promise: Promise<any>): void;
    passThroughOnException(): void;
  }
  
  declare class WebSocketPair {
    0: WebSocket;
    1: WebSocket;
  }
  
  interface ResponseInit {
    webSocket?: WebSocket;
  }
  