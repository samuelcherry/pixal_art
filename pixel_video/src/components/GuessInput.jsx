import { useState, useContext } from "react";
import "@fontsource/roboto/700.css";
import names from "../options.json";
import { answer, files } from "../answers.json";
import Button from "@mui/material/Button";
import { ScoreContext } from "../context/scoreContext";

const GuessInput = () => {
  const [options, setOptions] = useState(names);
  const [videoAnswer, setVideoAnswer] = useState(answer);
  const [videoFiles, setVideoFiles] = useState(files);
  const [guess, setGuess] = useState("");
  const { score, setScore } = useContext(ScoreContext);

  console.log("guess section score: ", score);

  const handleGuess = (guessInput) => {
    if (guessInput == answer) {
      console.log("Correct");
      setScore((prev) => 6);
    } else {
      console.log("Incorrect");
      setScore((prev) => prev + 1);
    }
  };

  function handleChange(event) {
    setGuess(event.target.value);
    console.log("guess: ", guess);
  }
  // function setupAutocomplete(inputId, list = []) {
  //   const input = document.getElementById(inputId);
  //   let currentFocus;

  //   input.addEventListener("input", function () {
  //     const val = this.value;
  //     closeAllLists();
  //     if (!val) return false;

  //     const listContainer = document.createElement("div");
  //     listContainer.setAttribute("id", this.id + "-autocomplete-list");
  //     listContainer.setAttribute("class", "autocomplete-items");
  //     this.parentNode.appendChild(listContainer);

  //     let count = 0;
  //     for (let i = 0; i < list.length; i++) {
  //       if (list[i].toLowerCase().includes(val.toLowerCase())) {
  //         const item = document.createElement("div");
  //         item.innerHTML = list[i];
  //         item.setAttribute("class", "autocomplete-item");
  //         item.addEventListener("click", function () {
  //           input.value = this.innerText;
  //           closeAllLists();
  //         });
  //         listContainer.appendChild(item);
  //         count++;
  //         if (count >= 10) break;
  //       }
  //     }
  //   });

  //   input.addEventListener("keydown", function (e) {
  //     let list = document.getElementById(this.id + "-autocomplete-list");
  //     if (list) list = list.getElementsByClassName("autocomplete-item");
  //     if (!list) return;

  //     if (e.key === "ArrowDown") {
  //       currentFocus++;
  //       addActive(list);
  //     } else if (e.key === "ArrowUp") {
  //       currentFocus--;
  //       addActive(list);
  //     } else if (e.key === "Enter") {
  //       e.preventDefault();
  //       if (currentFocus > -1) list[currentFocus].click();
  //     }
  //   });

  //   function addActive(list) {
  //     if (!list) return false;
  //     removeActive(list);
  //     if (currentFocus >= list.length) currentFocus = 0;
  //     if (currentFocus < 0) currentFocus = list.length - 1;
  //     list[currentFocus].classList.add("autocomplete-active");
  //   }

  //   function removeActive(list) {
  //     for (let item of list) {
  //       item.classList.remove("autocomplete-active");
  //     }
  //   }

  //   function closeAllLists(elmnt) {
  //     const items = document.getElementsByClassName("autocomplete-items");
  //     for (let item of items) {
  //       if (elmnt != item && elmnt != input) {
  //         item.parentNode.removeChild(item);
  //       }
  //     }
  //     currentFocus = -1;
  //   }

  //   document.addEventListener("click", function (e) {
  //     closeAllLists(e.target);
  //   });
  // }

  // function makeGuess() {
  //   if (guess == answer) {
  //     console.log("Correct", score);
  //   } else {
  //     score++;
  //     console.log("Wrong guess:", guess);
  //     console.log("Score: ", score);
  //     updateClueImage();
  //   }
  // }

  return (
    <>
      <div class="textRegion">
        <div class="scoreLights">
          <div class="lights"></div>
          <div class="lights"></div>
          <div class="lights"></div>
          <div class="lights"></div>
          <div class="lights"></div>
        </div>
        <input
          id="nameInput"
          type="text"
          placeholder="type your guess"
          autocomplete="off"
          value={guess}
          onChange={handleChange}
        />
        <Button
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
