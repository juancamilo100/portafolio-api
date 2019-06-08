const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    username: {
        type: String,
        required: [true],
    },
    email: {
        type: String,
        required: [true],
    },
    password: {
        type: String,
        required: [true],
    },
    portfolios: [{type: ObjectId, ref: 'Portfolio'}]
});

module.exports = { schema };