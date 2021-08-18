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

app.listen(5000, () => {
    console.log("server has started on port 5000");
});