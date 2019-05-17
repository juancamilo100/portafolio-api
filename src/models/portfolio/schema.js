const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    _id: {
        type: ObjectId,
        required: [true]
    },
    name: {
        type: String,
        required: [true],
    },
    description: {
        type: String,
    },
    tickers: {
        type: Array      
    },
    user: {
        type: ObjectId, 
        ref: 'User'
    }
}, { _id: false });

module.exports = { schema };