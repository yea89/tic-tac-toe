<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["ok" => false, "error" => "Invalid request method"]);
    exit;
}

$name = $_POST['name'] ?? null;
$symbol = $_POST['symbol'] ?? null;

if (!$name || !$symbol) {
    echo json_encode(["ok" => false, "error" => "Name and symbol are required"]);
    exit;
}

if ($symbol !== 'X' && $symbol !== 'O') {
    echo json_encode(["ok" => false, "error" => "Invalid symbol. Must be X or O"]);
    exit;
}

$state = json_decode(file_get_contents('game.json'), true);

if ($state['players'][$symbol] !== null) {
    echo json_encode(["ok" => false, "error" => "Symbol $symbol is already taken"]);
    exit;
}

$state['players'][$symbol] = $name;
file_put_contents('game.json', json_encode($state, JSON_PRETTY_PRINT));

echo json_encode(["ok" => true]);
?>
