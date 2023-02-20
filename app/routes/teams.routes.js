module.exports = app => {
    const teams = require("../controllers/teams.controller");
  
    var router = require("express").Router();
  
    // Create a new team
    router.post("/", teams.create);
  
    // Retrieve all teams
    router.get("/", teams.findAll);
  
    // Retrieve a single team with id
    router.get("/:id", teams.findOne);
  
    // Update a team with id
    router.put("/:id", teams.update);
  
    // Delete a team with id
    router.delete("/:id", teams.delete);
  
    // Delete all teams
    router.delete("/", teams.deleteAll);
  
    app.use('/api/teams', router);
  };