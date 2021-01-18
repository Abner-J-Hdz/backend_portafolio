const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TecnoSchema = Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    level: Number,
    img: String,
    description: String,
    ordern: Number
});

module.exports = mongoose.model("Tecno", TecnoSchema);

