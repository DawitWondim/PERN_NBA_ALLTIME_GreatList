import React, {Fragment, useState, useEffect} from "react";
import EditPlayer from "./EditPlayer";

const ListPlayers = () => {

    const [players, setPlayers] = useState([]);

    //delete player function
  
    const deletePlayer = async id => {

      try {
        const deletePlayer = await fetch(`http://localhost:5000/players/${id}`, {
          method: "DELETE"
        });
  
        setPlayers(players.filter(player => player.player_id !== id));
      } catch (err) {
        console.error(err.message);
      }
    };
  
    const getPlayers = async () => {
      try {
        const response = await fetch("http://localhost:5000/players");
        const jsonData = await response.json();
  
        setPlayers(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getPlayers();
    }, []);
  
    console.log(players);
    return (
        <Fragment>
            {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {players.map(player => (
            <tr key={player.player_id}>
              <td>{player.name}</td>
              <td>
                {player.position}
              </td>
              <td>
                {player.rank}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </Fragment>
    )
}

export default ListPlayers;