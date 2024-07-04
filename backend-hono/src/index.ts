import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono();

const allowedOrigins = ['https://journalink-6o7ninvdf-tabish1511s-projects.vercel.app/', 'http://localhost:3000'];

app.use('*', cors({
  origin: allowedOrigins,
  allowHeaders: ['Origin', 'Content-Type', 'Authorization'],
  allowMethods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// Define your other routes and application logic here
app.get('*', (c) => c.text('Hello Hono!'));

// WebSocket handling
app.get('/ws', (c) => {
  const upgradeHeader = c.req.header('Upgrade');
  if (upgradeHeader !== 'websocket') {
    return c.text('Expected a WebSocket request', 400);
  }

  const [client, server] = Object.entries(new WebSocketPair()).map(([, sock]) => sock);
  server.accept();

  server.addEventListener('message', (event: any) => {
    console.log('Message from client:', event.data);
    server.send('Hello user');
  });

  server.addEventListener('close', () => {
    console.log('Client disconnected');
  });

  const responseInit: ResponseInit & { webSocket?: WebSocket } = {
    status: 101,
    webSocket: client,
  };

  return new Response(null, responseInit);
});

// Export the Hono application
export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    return app.fetch(request);
  },
};