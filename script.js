
// Get references to the tiles container and buttons
const tilesContainer = document.querySelector(".tiles");
const startButton = document.getElementById("startButton");
const exitButton = document.getElementById("exitButton");

// Define the letters used in the game
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
let lettersPicklist;
let tileCount;
let revealedCount;
let activeTile;
let awaitingEndOfMove;

// Function to initialize the game
function initGame() {
     // Clear the tiles container
    tilesContainer.innerHTML = '';
    // Create a list of letters to be used for the tiles
    lettersPicklist = [...letters, ...letters];
    tileCount = lettersPicklist.length;

    // Reset game state
    revealedCount = 0;
    activeTile = null;
    awaitingEndOfMove = false;

    // Build up tiles
    // Create and add tiles to the container
    for (let i = 0; i < tileCount; i++) {
        // Get a random letter from the picklist
        const randomIndex = Math.floor(Math.random() * lettersPicklist.length);
        const letter = lettersPicklist[randomIndex];

        // Create a tile with the letter
        const tile = buildTile(letter);

        // Remove the used letter from the picklist
        lettersPicklist.splice(randomIndex, 1);
        // Add the tile to the tiles container
        tilesContainer.appendChild(tile);
    }
}

// This function creates a tile element
function buildTile(letter) {
    // Create a new div element for the tile
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-letter", letter);
    element.setAttribute("data-revealed", "false");

    // Create the front and back faces of the tile
    const frontFace = document.createElement("div");
    frontFace.classList.add("front");
    frontFace.textContent = "";

    const backFace = document.createElement("div");
    backFace.classList.add("back");
    backFace.textContent = letter;

    // Append the front and back faces to the tile element
    element.appendChild(frontFace);
    element.appendChild(backFace);

    // Add a click event listener to the tile
    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed");

        if (awaitingEndOfMove || revealed === "true" || element === activeTile) {
            return;
        }

        // Reveal this letter
        element.classList.add("revealed");

        if (!activeTile) {
            activeTile = element;
            return;
        }

        const letterToMatch = activeTile.getAttribute("data-letter");

        if (letterToMatch === letter) {
            element.setAttribute("data-revealed", "true");
            activeTile.setAttribute("data-revealed", "true");

            activeTile = null;
            awaitingEndOfMove = false;
            revealedCount += 2;

            if (revealedCount === tileCount) {
                alert("You win! Refresh to start again.");
            }

            return;
        }

        awaitingEndOfMove = true;

        setTimeout(() => {
            activeTile.classList.remove("revealed");
            element.classList.remove("revealed");

            awaitingEndOfMove = false;
            activeTile = null;
        }, 1000);
    });

    return element;
}
// Add event listeners to the start and exit buttons
startButton.addEventListener("click", initGame);

exitButton.addEventListener("click", () => {
    tilesContainer.innerHTML = '';
    revealedCount = 0;
    activeTile = null;
    awaitingEndOfMove = false;
});
