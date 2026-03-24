
let mySymbol = null; // 'X', 'O', or null (spectator)
let gameState = {
    board: ["", "", "", "", "", "", "", "", ""],
    turn: "X",
    players: { X: null, O: null },
    winner: null,
    draw: false
};

const statusEl = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("reset-btn");
const joinSection = document.getElementById("join-section");
const playerNameInput = document.getElementById("player-name");
const joinBtns = document.querySelectorAll(".join-btn");

async function init() {
    // add event listeners
    cells.forEach(cell => {
        cell.addEventListener("click", () => handleMove(cell.dataset.index));
    });

    resetBtn.addEventListener("click", resetGame);

    joinBtns.forEach(btn => {
        btn.addEventListener("click", () => joinGame(btn.dataset.symbol));
    });

    // start polling
    fetchState();
    setInterval(fetchState, 1000);
}

async function fetchState() {
    try {
        const res = await fetch("state.php");
        gameState = await res.json();
        render();
    } catch (err) {
        console.error("Error fetching state:", err);
    }
}

async function joinGame(symbol) {
    const name = playerNameInput.value.trim();
    if (!name) {
        alert("please enter your name first");
        return;
    }

    const fd = new FormData();
    fd.append("name", name);
    fd.append("symbol", symbol);

    try {
        const res = await fetch("join.php", {
            method: "POST",
            body: fd
        });
        const data = await res.json();

        if (data.ok) {
            mySymbol = symbol;
            localStorage.setItem("ttt_symbol", symbol); // persist for refresh
            await fetchState();
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error("Error joining game:", err);
    }
}

async function handleMove(index) {
    if (!mySymbol) {
        alert("you must join as X or O to play");
        return;
    }

    if (gameState.turn !== mySymbol) {
        alert("its not your turn");
        return;
    }

    const fd = new FormData();
    fd.append("symbol", mySymbol);
    fd.append("index", index);

    try {
        const res = await fetch("move.php", {
            method: "POST",
            body: fd
        });
        const data = await res.json();

        if (data.ok) {
            await fetchState();
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error("Error making move:", err);
    }
}

async function resetGame() {
    try {
        const res = await fetch("reset.php");
        const data = await res.json();
        if (data.ok) {
            mySymbol = null;
            localStorage.removeItem("ttt_symbol");
            await fetchState();
        }
    } catch (err) {
        console.error("Error resetting game:", err);
    }
}

function render() {
    // render board
    cells.forEach((cell, i) => {
        cell.textContent = gameState.board[i];
        cell.className = "cell" + (gameState.board[i] ? " " + gameState.board[i].toLowerCase() : "");
    });

    // handle Join Section Visibility
    // if I havent joined show join section only for available slots
    if (!mySymbol) {
        joinSection.classList.remove("hidden");
        joinBtns.forEach(btn => {
            const sym = btn.dataset.symbol;
            if (gameState.players[sym]) {
                btn.disabled = true;
                btn.textContent = `${sym} (${gameState.players[sym]})`;
                btn.style.opacity = "0.5";
            } else {
                btn.disabled = false;
                btn.textContent = `Join as ${sym}`;
                btn.style.opacity = "1";
            }
        });
    } else {
        joinSection.classList.add("hidden");
    }

    // render Status
    if (!gameState.players.X || !gameState.players.O) {
        statusEl.textContent = "Waiting for players...";
        statusEl.style.color = "var(--text-muted)";
    } else if (gameState.winner) {
        statusEl.textContent = `Player ${gameState.winner} (${gameState.players[gameState.winner]}) Wins!`;
        statusEl.style.color = gameState.winner === "X" ? "var(--x-color)" : "var(--o-color)";
    } else if (gameState.draw) {
        statusEl.textContent = "its a Draw";
        statusEl.style.color = "var(--text)";
    } else {
        const currentPlayerName = gameState.players[gameState.turn];
        statusEl.textContent = `${gameState.turn}'s Turn (${currentPlayerName})`;
        statusEl.style.color = gameState.turn === "X" ? "var(--x-color)" : "var(--o-color)";
        
        if (mySymbol === gameState.turn) {
            statusEl.textContent += " - YOUR TURN";
        }
    }
}

// check if symbol was saved in localStorage
const savedSymbol = localStorage.getItem("ttt_symbol");
if (savedSymbol) {
    mySymbol = savedSymbol;
}

init();
