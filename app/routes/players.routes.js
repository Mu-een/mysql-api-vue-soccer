module.exports = app => {
    const players = require("../controllers/players.controller");
  
    var router = require("express").Router();
  
    // Create a new player
    router.post("/", players.create);
  
    // Retrieve all players
    router.get("/", players.findAll);
  
    // Retrieve a single player with id
    router.get("/:id", players.findOne);
  
    // Update a player with id
    router.put("/:id", players.update);
  
    // Delete a player with id
    router.delete("/:id", players.delete);
  
    // Delete all players
    router.delete("/", players.deleteAll);
  
    app.use('/api/players', router);
  };