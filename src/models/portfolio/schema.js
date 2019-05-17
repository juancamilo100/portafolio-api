const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    id: {
        type: String,
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
        ref: 'User',
        required: true
    }
},
{ 
    collection: 'portfolios' 
});

module.exports = { schema };