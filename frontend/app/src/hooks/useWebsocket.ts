import { useEffect, useRef, useState } from "react";

export const useWebsocket = (url: string) => {
  const connection = useRef<WebSocket>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // ref: https://qiita.com/_ytori/items/a92d69760e8e8a2047ac
  //      https://ably.com/blog/websockets-react-tutorial
  useEffect(() => {
    const ws = new WebSocket(url);
    connection.current = ws;

    ws.onopen = () => {
      setIsReady(true);
      ws.send("Connection established");
    };
    ws.onmessage = (event) => {
      console.log(`Message from server: ${event.data}`);
      setMessage(event.data);
    };
    ws.onclose = () => {
      console.log("Connection closed");
      setIsReady(false);
      // TODO: 再接続する処理いれる
    };
    ws.onerror = (err) => {
      ws.close();
      setIsReady(false);
      console.error("Error: ", err);
    };

    return () => {
      ws.close();
      console.log("Connection closed");
    };
  }, []);

  return {
    isReady,
    message,
    // thisまわりで想定外の挙動をしないようにbindする
    send: connection.current?.send.bind(connection.current),
  };
};
