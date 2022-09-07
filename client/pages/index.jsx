import { io } from "socket.io-client";
import Head from "next/head";
import { useEffect, useState } from "react";
const socket = io("https://SocketIO.idatenshow758.repl.co", {
  transports: ["websocket"],
});

export default function Home() {
  const sendMessages = () => {
    socket.emit("sendMessages", { message });
  };
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");
  useEffect(() => {
    socket.on("recieveMessages", (data) => {
      setMessageRecieved(data.message);
    });
  }, [socket]);
  return (
    <div>
      <Head>
        <title>Socket.io</title>
        <meta name="description" content="Socket.io Chat App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <br />
      <input
        type="text"
        placeholder="Enter your message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessages}>Send Message</button>
      <h1>Message : {messageRecieved}</h1>
    </div>
  );
}
