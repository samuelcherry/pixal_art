// let names = [];
// let answer = "";
// let score = 1;
// let guess = "";
// let answerFiles = {};

// async function loadNames() {
//   try {
//     const res = await fetch("options.json");
//     const data = await res.json();
//     names = data.names;
//   } catch (e) {
//     console.error("Cound not load JSON, using fallback array.");
//     names = ["See you", "Space Cowboy"];
//   }
//   setupAutocomplete("nameInput", names);
// }

// async function loadAnswer() {
//   try {
//     const res = await fetch("answers.json");
//     const data = await res.json();
//     answer = data.name;
//     answerFiles = data.files;
//     console.log("Loaded answer:", answer);
//     console.log("Loaded Files: ", answerFiles["file_1"]);
//   } catch (e) {
//     console.error("Cound not load JSON, using fallback array.");
//     answer = ["See you Space Cowboy"];
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   loadNames();
//   loadAnswer();
// });

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
//   guess = document.getElementById("nameInput").value;

//   if (guess == answer) {
//     console.log("Correct", score);
//   } else {
//     score++;
//     console.log("Wrong guess:", guess);
//     console.log("Score: ", score);
//     updateClueImage();
//   }
// }
// document.getElementById("guessBtn").addEventListener("click", makeGuess);

// function updateClueImage() {
//   const img = document.getElementById("clueImage");
//   const key = "file_" + score;
//   console.log("key: ", key);

//   if (answerFiles[key]) {
//     document.getElementById("clueImage").src = answerFiles[key];
//   } else {
//     console.warn("Missing file for:", key);
//   }
// }
