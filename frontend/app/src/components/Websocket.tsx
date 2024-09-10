import { useState } from "react";
import { useWebsocket } from "../hooks/useWebsocket";

export const Websocket = () => {
  const [textVal, setTextVal] = useState("");

  const { isReady, message, send } = useWebsocket("ws://localhost:8080");
  return (
    <>
      <div>isReady: {isReady}</div>
      <div>message: {message}</div>
      <div>
        <input
          type="text"
          value={textVal}
          onChange={(e) => setTextVal(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => {
            if (send == null) {
              console.error("send() is not ready");
              return;
            }
            send(textVal);
            setTextVal("");
          }}
        >
          Send!
        </button>
      </div>
    </>
  );
};
