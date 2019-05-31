const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    name: {
        type: String,
        required: [true],
    },
    funds: {
        type: [
            {
                ticker: String,
                portfolioPercentage: String
            }
        ]
    },
    user: {
        type: ObjectId, 
        ref: 'User'
    }
});

module.exports = { schema };