import { useState, useContext } from "react";
import "@fontsource/roboto/700.css";
import names from "../options.json";
import { answer, files } from "../answers.json";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { ScoreContext } from "../context/scoreContext";
import TextField from "@mui/material/TextField";

const GuessInput = () => {
  const [guess, setGuess] = useState("");
  const { score, setScore } = useContext(ScoreContext);

  const handleGuess = (guessInput) => {
    if (score < 6 && guessInput) {
      if (guessInput == answer) {
        console.log("Correct");
        setScore(7);
      } else {
        console.log("Incorrect");
        setScore((prev) => prev + 1);
      }
    }
  };

  function handleChange(event) {
    setGuess(event.target.value);
    console.log("guess: ", guess);
  }

  return (
    <>
      {score == 7 ? (
        <div>
          <h1>You Win</h1>
          <h3>Espresso by Sabrina Carpenter</h3>
        </div>
      ) : (
        <h1></h1>
      )}
      {score == 6 ? (
        <div>
          <h1>Sorry, you lose</h1>
          <h3>Espresso by Sabrina Carpenter</h3>
        </div>
      ) : (
        <h1></h1>
      )}
      <div class="textRegion">
        <div class="scoreLights">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="lights"
              style={{
                backgroundColor: score > i + 1 ? "red" : "grey"
              }}
            ></div>
          ))}
        </div>
        <div className="inputContainer">
          <Autocomplete
            className="titleInput"
            disablePortal
            options={names.names}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Titles" />}
            onChange={(event, value) => setGuess(value?.label || "")}
            sx={{
              backgroundColor: "white",
              WebkitTextFillColor: "ffffff",
              caretColor: "#fff"
            }}
          />
        </div>
        <Button
          class="guessBtn"
          variant="outlined"
          onClick={() => {
            handleGuess(guess);
          }}
        >
          Guess
        </Button>
        <script src="script.js"></script>
      </div>
    </>
  );
};

export default GuessInput;
