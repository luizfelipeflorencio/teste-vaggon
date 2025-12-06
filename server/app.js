const db = require('./db/models');
const express = require('express');
const routes = require('./routes/index')
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api', routes)

app.listen(8080, () => {
    console.log("O servidor foi iniciado na porta 8080: => http://localhost:8080");
})