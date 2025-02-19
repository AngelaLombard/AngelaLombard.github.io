// Fetch puzzles.json and load the weekly puzzle
fetch("./assets/puzzles.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load puzzles.json");
    }
    return response.json();
  })
  .then((puzzles) => {
    console.log("Puzzles loaded successfully:", puzzles);

    // Calculate the weekly index based on the current date
    const weekIndex =
      Math.floor(
        (new Date().getTime() - new Date("2025-01-01").getTime()) /
          (7 * 24 * 60 * 60 * 1000)
      ) % puzzles.length;

    const currentPuzzle = puzzles[weekIndex];
    console.log("Current puzzle:", currentPuzzle);

    // Update the puzzle image
    const puzzleImage = document.getElementById("puzzle-image");
    puzzleImage.src = currentPuzzle.image;
    console.log("Puzzle image updated:", puzzleImage.src);

    // Add click event listener for "Reveal Answer" button
    const revealAnswerButton = document.getElementById("reveal-answer-btn");
    revealAnswerButton.addEventListener("click", () => {
      console.log("Reveal Answer button clicked!");
      const feedback = document.getElementById("answer-feedback");
      feedback.textContent = `Answer: ${currentPuzzle.correct} - ${currentPuzzle.explanation}`;
      feedback.style.color = "green";
    });
  })
  .catch((error) => {
    console.error("Error loading puzzle data:", error);
  });
