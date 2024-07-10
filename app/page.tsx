"use client"
import { useEffect, useState } from 'react'

export default function() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  return (
    <>
      hi there
    </>
  )
}











































// "use client";

// import { useMemo } from 'react';
// import io from 'socket.io-client';

// const Home = () => {

//   const socket = useMemo(() => io("https://journalink.onrender.com", {
//     withCredentials: true
//   }), []);


//   socket.on("connect", () => {
//     console.log("I am connected")
//   })

//   socket.on("message", (data, id)=> {
//     console.log(data + "||" + id)
//   });
  
//   return (
//     <div>
//       Hello there!
//     </div>
//   );
// };

// export default Home;
