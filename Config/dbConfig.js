const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'})
//const dbConection = "mongodb://localhost:27017/portafolio_aj";

const connectDB = async () => {
    try {
        await mongoose.connect( process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true       
        });
        console.log('Database is Connect');
    } catch (error) {
        console.log(error);
        process.exit(1); //Detendrá la app
    }
}

module.exports = connectDB;
