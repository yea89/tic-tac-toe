<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["ok" => false, "error" => "Invalid request method"]);
    exit;
}

$symbol = $_POST['symbol'] ?? null;
$index = isset($_POST['index']) ? (int)$_POST['index'] : null;

if ($symbol === null || $index === null || $index < 0 || $index > 8) {
    echo json_encode(["ok" => false, "error" => "Invalid input"]);
    exit;
}

$state = json_decode(file_get_contents('game.json'), true);

// game must have two players
if ($state['players']['X'] === null || $state['players']['O'] === null) {
    echo json_encode(["ok" => false, "error" => "Waiting for players"]);
    exit;
}

// game must not be over
if ($state['winner'] !== null || $state['draw']) {
    echo json_encode(["ok" => false, "error" => "Game is already over"]);
    exit;
}

// right turn
if ($state['turn'] !== $symbol) {
    echo json_encode(["ok" => false, "error" => "Not your turn"]);
    exit;
}

// cell must be empty
if ($state['board'][$index] !== "") {
    echo json_encode(["ok" => false, "error" => "Cell already occupied"]);
    exit;
}

// perform move
$state['board'][$index] = $symbol;

// check winner
$winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

$winnerFound = false;
foreach ($winPatterns as $pattern) {
    if ($state['board'][$pattern[0]] !== "" &&
        $state['board'][$pattern[0]] === $state['board'][$pattern[1]] &&
        $state['board'][$pattern[0]] === $state['board'][$pattern[2]]) {
        $state['winner'] = $symbol;
        $winnerFound = true;
        break;
    }
}

// check draw
if (!$winnerFound && !in_array("", $state['board'])) {
    $state['draw'] = true;
}

// switch turn
if (!$state['winner'] && !$state['draw']) {
    $state['turn'] = ($symbol === 'X') ? 'O' : 'X';
}

file_put_contents('game.json', json_encode($state, JSON_PRETTY_PRINT));
echo json_encode(["ok" => true]);
?>
