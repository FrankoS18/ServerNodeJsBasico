const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');

// creamos servidor
const app = express();

//conectamos a la db
conectarDB();
app.use(cors());

app.use(express.json());

app.use('/api/productos', require('./routes/productos'));


app.listen(4000, () =>{
  console.log("El server corre perfect");  
})