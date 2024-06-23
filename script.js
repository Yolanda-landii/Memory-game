const tilesContainer = document.querySelector(".tiles");
const startButton = document.getElementById("startButton");
const exitButton = document.getElementById("exitButton");

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
let lettersPicklist;
let tileCount;
let revealedCount;
let activeTile;
let awaitingEndOfMove;

function initGame() {
    tilesContainer.innerHTML = '';
    lettersPicklist = [...letters, ...letters];
    tileCount = lettersPicklist.length;

    // Reset game state
    revealedCount = 0;
    activeTile = null;
    awaitingEndOfMove = false;

    // Build up tiles
    for (let i = 0; i < tileCount; i++) {
        const randomIndex = Math.floor(Math.random() * lettersPicklist.length);
        const letter = lettersPicklist[randomIndex];
        const tile = buildTile(letter);

        lettersPicklist.splice(randomIndex, 1);
        tilesContainer.appendChild(tile);
    }
}

function buildTile(letter) {
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-letter", letter);
    element.setAttribute("data-revealed", "false");

    const frontFace = document.createElement("div");
    frontFace.classList.add("front");
    frontFace.textContent = "";

    const backFace = document.createElement("div");
    backFace.classList.add("back");
    backFace.textContent = letter;

    element.appendChild(frontFace);
    element.appendChild(backFace);

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

startButton.addEventListener("click", initGame);

exitButton.addEventListener("click", () => {
    tilesContainer.innerHTML = '';
    revealedCount = 0;
    activeTile = null;
    awaitingEndOfMove = false;
});
