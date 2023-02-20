const Players = require("../models/players.model");

// Create and Save a new player
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a player
      const players = new Players({
        playerName: req.body.playerName,
        position: req.body.position,
      });
    
      // Save player in the database
      Players.create(players, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the player."
          });
        else res.send(data);
      });
};

// Retrieve all players from the database (with condition).
exports.findAll = (req, res) => {
    const players = req.query.playerName;

    Players.getAll(players, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving players."
        });
      else res.send(data);
    });
  };
  
 
// Find a single player with a id
exports.findOne = (req, res) => {
    Players.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found player with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving player with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};


// Update a player identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      console.log(req.body);
    
      Players.updateById(
        req.params.id,
        new Players(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found player with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating player with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a player with the specified id in the request
exports.delete = (req, res) => {
    Players.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found player with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete player with id " + req.params.id
            });
          }
        } else res.send({ message: `Player was deleted successfully!` });
      });
};

// Delete all players from the database.
exports.deleteAll = (req, res) => {
    Players.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all players."
          });
        else res.send({ message: `All players were deleted successfully!` });
      });
};