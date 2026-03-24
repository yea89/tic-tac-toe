<?php
header('Content-Type: application/json');

$initialState = [
    "board" => ["","","","","","","","",""],
    "turn" => "X",
    "players" => ["X" => null, "O" => null],
    "winner" => null,
    "draw" => false
];

file_put_contents('game.json', json_encode($initialState, JSON_PRETTY_PRINT));
echo json_encode(["ok" => true]);
?>
