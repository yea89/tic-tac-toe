<?php
header('Content-Type: application/json');

if (!file_exists('game.json')) {
    $initialState = [
        "board" => ["","","","","","","","",""],
        "turn" => "X",
        "players" => ["X" => null, "O" => null],
        "winner" => null,
        "draw" => false
    ];
    file_put_contents('game.json', json_encode($initialState, JSON_PRETTY_PRINT));
}

$stateJson = file_get_contents('game.json');
echo $stateJson;
?>
