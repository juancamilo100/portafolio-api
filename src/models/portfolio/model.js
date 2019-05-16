const mongoose = require('mongoose');
const { schema } = require('./schema');

const Portfolio = mongoose.model('Portfolio', schema);
module.exports = { Portfolio };