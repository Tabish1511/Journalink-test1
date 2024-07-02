"use client";

import { useMemo } from 'react';
import io from 'socket.io-client';

// let socket: any;

const Home = () => {
  const socket = useMemo(() => io("https://backend-hono.khaqantabish.workers.dev"), [])
  
  socket.on("connect", () => {
    console.log("I am connected")
  })

  socket.on("message", (data, id)=> {
    console.log(data + "||" + id)
  });
  
  return (
    <div>
      Hello there!
    </div>
  );
};

export default Home;
