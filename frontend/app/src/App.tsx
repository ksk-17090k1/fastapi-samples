import { useState } from "react";
import "./App.css";
import { Profile } from "./components/Profile";
import { Websocket } from "./components/Websocket";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h3>HTTP</h3>
      <Profile />
      <h3>Websocket</h3>
      <Websocket />
    </>
  );
}

export default App;
