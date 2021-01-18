const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    img: Array,
    gitLink: String,
    appLink: String,
    description: String,
    tecnologys: Array,
    order: Number,
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Project", ProjectSchema);