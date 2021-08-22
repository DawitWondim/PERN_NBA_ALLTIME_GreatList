// Create the server
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

//ROUTES//

// Create an All Time Great Player
app.post("/legends", async (req, res) => {
    try {
        const {name} = req.body;
        const {position} = req.body;
        const {rank} = req.body;

        const newPlayer = await pool.query("INSERT INTO players(name, position, rank) VALUES($1, $2, $3) RETURNING *", 
        [name, position, rank]);

        res.json(newPlayer.rows[0]);
    } catch(err){   
        console.error(err.message);
    }
})

// Get all players
app.get("/legends", async (req, res) => {
    try {
        const allPlayers = await pool.query("SELECT * FROM players");
        res.json(allPlayers.rows);
    }catch(err){
        console.error(err.message);
    }
})

// Get a single player
app.get("/todos/:id", async (req, res) => {
    try {
        const {player_id} = req.params;
        const player = await pool.query("SELECT * FROM players WHERE player_id = $1", [player_id]);

        res.json(player.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

// Update a player
app.put("/players/:id", async (req, res) => {
    try {
        const {player_id} = req.params;
        const {name} = req.body;
        const {rank} = req.body;
        const {position} = req.body;
        const updatePlayerRank = await pool.query(
            "UPDATE players SET rank = $1 WHERE player_id = $2", [rank, player_id]);
    }catch(err){
        console.error(err.message);
    }
    res.json("A player rank was updated.");
});

// Delete a player
app.delete("/players/:id", async (req, res) => {
    try {
        const {player_id} = req.params;
        const deletePlayer = await pool.query("DELETE FROM players WHERE player_id = $1", [player_id]);

        res.json("A player was deleted.")
    } catch (err) {
        console.log(err.message);
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
});