const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonaldataSchema = Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    lastname: String,
    aboutme: String,
    carreer: String,
    university: String,
    birthday: Date,
    email: String,
    facebook: String,
    github: String,
    phone: String,
    instagram: String,
    youtube: String,    
});

module.exports = mongoose.model("Personaldata", PersonaldataSchema);