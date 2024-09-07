import { useState } from "react";
import "./App.css";
import { Profile } from "./components/Profile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h3>Profile</h3>
      <Profile />
    </>
  );
}

export default App;
