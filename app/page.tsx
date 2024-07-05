"use client";

import { useMemo } from 'react';
import io from 'socket.io-client';

const Home = () => {

  const socket = useMemo(() => io("http://localhost:4000/", {
    withCredentials: true
  }), []);


  function createConnection() {
    socket.on("connect", () => {
      console.log("I am connected")
    })  
  }


  

  socket.on("message", (data, id)=> {
    console.log(data + "||" + id)
  });
  
  return (
    <div>
      Hello there!
      <br/>
      <button onClick={createConnection} >Create socket.io connection!</button>
    </div>
  );
};

export default Home;
