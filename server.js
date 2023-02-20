const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: 'http://localhost:1234'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=> {
    res.json({message: 'Welcome to The Dream League'})
});

require('./app/routes/teams.routes')(app);
require('./app/routes/players.routes')(app);


const PORT = process.env.PORT || 1234;
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
});