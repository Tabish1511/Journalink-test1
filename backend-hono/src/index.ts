import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.text('Hello Hono!'));

// WebSocket handling
app.get('/ws', (c) => {
  const upgradeHeader = c.req.header('Upgrade');
  if (upgradeHeader !== 'websocket') {
    return c.text('Expected a WebSocket request', 400);
  }

  const [client, server] = Object.entries(new WebSocketPair()).map(([, sock]) => sock);
  server.accept();

  server.addEventListener('message', (event) => {
    console.log('Message from client:', event.data);
    server.send('Hello user');
  });

  server.addEventListener('close', () => {
    console.log('Client disconnected');
  });

  return new Response(null, { status: 101, webSocket: client });
});

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    return app.fetch(request);
  },
};
