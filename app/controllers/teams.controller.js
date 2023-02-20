const Teams = require("../models/teams.model");

// Create and Save a new Team
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Team
      const teams = new Teams({
        soccerTeam: req.body.soccerTeam,
      });
    
      // Save Team in the database
      Teams.create(teams, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Team."
          });
        else res.send(data);
      });
};

// Retrieve all Teams from the database (with condition).
exports.findAll = (req, res) => {
    const teams = req.query.soccerTeam;

    Teams.getAll(teams, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving teams."
        });
      else res.send(data);
    });
  };
  
 
// Find a single Team with a id
exports.findOne = (req, res) => {
    Teams.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Team with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Team with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};


// Update a Team identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      console.log(req.body);
    
      Teams.updateById(
        req.params.id,
        new Teams(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Team with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Team with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a Team with the specified id in the request
exports.delete = (req, res) => {
    Teams.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Team with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Teams with id " + req.params.id
            });
          }
        } else res.send({ message: `Team was deleted successfully!` });
      });
};

// Delete all Teams from the database.
exports.deleteAll = (req, res) => {
    Teams.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all teams."
          });
        else res.send({ message: `All Teams were deleted successfully!` });
      });
};