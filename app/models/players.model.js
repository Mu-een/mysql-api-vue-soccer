const sql = require("./db.js");

// constructor
const Players = function(player) {
  this.playerName = player.playerName;
  this.position = player.position;
};

Players.create = (newPlayer, result) => {
  sql.query("INSERT INTO players SET ?", newPlayer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created player: ", { id: res.insertId, ...newPlayer });
    result(null, { id: res.insertId, ...newPlayer });
  });
};

Players.findById = (id, result) => {
  sql.query(`SELECT * FROM players WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found player: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Players.getAll = (playerName, result) => {
  let query = "SELECT * FROM players";

  if (playerName) {
    query += ` WHERE players LIKE '%${players}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("players: ", res);
    result(null, res);
  });
};


Players.updateById = (id, player, result) => {
  sql.query(
    "UPDATE players SET playerName = ?, position = ?, WHERE id = ?",
    [players.playerName, players.position,  id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated player: ", { id: id, ...player});
      result(null, { id: id, ...player });
    }
  );
};

Players.remove = (id, result) => {
  sql.query("DELETE FROM players WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted player with id: ", id);
    result(null, res);
  });
};

Players.removeAll = result => {
  sql.query("DELETE FROM players", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} players`);
    result(null, res);
  });
};

module.exports = Players;