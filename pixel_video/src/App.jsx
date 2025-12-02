import { useState } from "react";
import "./App.css";
import PixelVideo from "./components/PixelVideo";
import GuessInput from "./components/GuessInput";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div class="frameContainer">
        <h1>Guess the Music Video</h1>
        <PixelVideo />
        <GuessInput />
      </div>
    </>
  );
}

export default App;
