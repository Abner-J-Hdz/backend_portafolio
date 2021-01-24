const express = require("express");
const connectDB = require("./Config/dbConfig");
const cors = require("cors");
//const morgan = require("morgan");

//creamos el servdor;
const app = express();

//conectamos las base de datos
connectDB();

//Habilitamos express.js para recibir datos en json
app.use(express.json({extends: true}));

app.use(cors());
//app.use(morgan("dev"));

//Puerto del servidor
const port = process.env.PORT || 4001;

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
  console.log('################################');
});


