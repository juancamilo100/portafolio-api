const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    firstname: {
        type: String,
        required: [true],
    },
    lastname: {
        type: String,
        required: [true],
    },
    portfolios: [{type: ObjectId, ref: 'Portfolio'}]
});

module.exports = { schema };