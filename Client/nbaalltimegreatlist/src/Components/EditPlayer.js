import React, { Fragment, useState } from "react";

const EditPlayer = ({ player }) => {
  const [name, setName] = useState(player.name);
  const [position, setPosition] = useState(player.position);
  const [rank, setRank] = useState(player.rank);

  //edit name function

  const updateName = async e => {
    e.preventDefault();
    try {
      const body = { name };
      const response = await fetch(
        `http://localhost:5000/players/${player.player_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${player.player_id}`}
      >
        Edit
      </button>

      {/* 
        id = id10
      */}
      <div
        class="modal"
        id={`id${player.player_id}`}
        onClick={() => setName(player.name)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Player</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setName(player.name)}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateName(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setName(player.name)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditPlayer;