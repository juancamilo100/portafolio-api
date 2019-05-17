const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    name: {
        type: String,
        required: [true],
    },
    description: {
        type: String,
    },
    tickers: {
        type: Array      
    }
});

module.exports = { schema };