let difficulty = null;
let image = null;

function selectDifficulty(selectedDifficulty) {
    const normalButton = document.getElementById("normal");
    const hardButton = document.getElementById("hard");

    difficulty = selectedDifficulty;

    if (selectedDifficulty === 'normal') {
        normalButton.classList.add("clicked");
        hardButton.classList.remove("clicked");
    } else {
        hardButton.classList.add("clicked");
        normalButton.classList.remove("clicked");
    }
}

function selectImage(selectedImage) {
    const dimetteImage = document.getElementById("dimette");
    const wwoImage = document.getElementById("wwo");

    image = selectedImage;

    if (image === 'dimette') {
        dimetteImage.classList.add("clicked");
        wwoImage.classList.remove("clicked");
    } else {
        wwoImage.classList.add("clicked");
        dimetteImage.classList.remove("clicked");
    }
}

function checkStartEligible() {
    const startButton = document.getElementById("start");

    if (image != null && difficulty != null) {
        startButton.classList.remove("inactive");
        startButton.classList.add("active");
    } else {
        startButton.classList.remove("active");
        startButton.classList.add("inactive");
    }
}

function startGame() {
    const startButton = document.getElementById("start");

    if (startButton.classList.contains("active")) {
        localStorage.setItem("difficulty", difficulty);
        localStorage.setItem("image", image);

        window.location.href = "puzzle.html";
    }
}

function setupPuzzlePage() {
    const difficulty = localStorage.getItem("difficulty");
    const image = localStorage.getItem("image");

    if (!difficulty || !image) {
        alert("Missing game settings. Please start from the main menu.");
        window.location.href = "index.html";
        return;
    }

    const puzzle = document.getElementById("puzzle");
    puzzle.classList.add(difficulty);
    puzzle.classList.remove(difficulty === "normal" ? "hard" : "normal");

    shuffle(difficulty, image);
}

function shuffle(difficulty, image) {
    const totalPieces = difficulty === "normal" ? 9 : 16;
    const array = [];

    for (let i = 0; i < totalPieces; i++) {
        array.push(i);
    }

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    for (let i = 0; i < array.length; i++) {
        const piece = document.getElementById("piece_" + i);
        const img = document.createElement("img");
        img.src = `images/${image}/${difficulty}/${array[i]}.jpg`;
        img.alt = `Piece ${array[i]}`;
        piece.innerHTML = '';
        piece.appendChild(img);
    }
}

if (document.getElementById("start")) {
    setInterval(checkStartEligible, 100);
}

window.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("puzzle")) {
        setupPuzzlePage();
    }
});

function setupPuzzlePage() {
    const difficulty = localStorage.getItem("difficulty");
    const image = localStorage.getItem("image");

    if (!difficulty || !image) {
        alert("Missing game settings. Please start from the main menu.");
        window.location.href = "index.html";
        return;
    }

    const puzzle = document.getElementById("puzzle");
    puzzle.classList.add(difficulty);
    puzzle.classList.remove(difficulty === "normal" ? "hard" : "normal");

    shuffleAndRenderPieces(difficulty, image);
}

function shuffleAndRenderPieces(difficulty, image) {
    const total = difficulty === "normal" ? 9 : 16;
    const array = Array.from({ length: total }, (_, i) => i);

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    for (let i = 0; i < total; i++) {
        const piece = document.getElementById("piece_" + i);
        const img = document.createElement("img");
        img.src = `images/${image}/${difficulty}/${array[i]}.jpg`;
        img.alt = `Piece ${array[i]}`;
        piece.innerHTML = "";
        piece.appendChild(img);
        piece.addEventListener("click", handlePieceClick);
    }
}

let firstSelectedPiece = null;

function handlePieceClick(e) {
    const clickedPiece = e.currentTarget;

    if (!firstSelectedPiece) {
        firstSelectedPiece = clickedPiece;
        firstSelectedPiece.classList.add("selected");
    } else if (clickedPiece === firstSelectedPiece) {
        firstSelectedPiece.classList.remove("selected");
        firstSelectedPiece = null;
    } else {
        swapImages(firstSelectedPiece, clickedPiece);

        firstSelectedPiece.classList.remove("selected");
        firstSelectedPiece = null;
    }
}

function swapImages(piece1, piece2) {
    const img1 = piece1.querySelector("img");
    const img2 = piece2.querySelector("img");

    if (img1 && img2) {
        const tempSrc = img1.src;
        const tempAlt = img1.alt;

        img1.src = img2.src;
        img1.alt = img2.alt;

        img2.src = tempSrc;
        img2.alt = tempAlt;
    }
}
