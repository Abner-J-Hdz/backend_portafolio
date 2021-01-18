const connectDB = require("./Config/dbConfig");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const conectarDB = require("./Config/dbConfig");

//creamos el servdor;
const app = express()


//conectamos las base de datos
conectarDB();

//Habilitamos express.js para recibir datos en json
app.use(express.json({extends: true}));

app.use(cors());
app.use(morgan("dev"));

//Puerto del servidor
const port = process.env.PORT || 4000;

//importar las rutas
const UserRoute = require("./Routes/User.Route");
const TecnoRoute = require('./Routes/Tecno.Route');
const ProjectRoute = require('./Routes/Project.Route');
const PersonlaData = require('./Routes/Personaldata.Route');
//usar las rutas

app.use("/api", UserRoute);
app.use("/api", TecnoRoute);
app.use("/api", ProjectRoute);
app.use("/api", PersonlaData);


app.listen(port,'0.0.0.0' ,() => {
  console.log('################################');
  console.log(`Serve is run in port ${port}`);
  console.log('################################')
  console.log(`#### localhost:${port}/api/ ####`)
  console.log('################################')

});


