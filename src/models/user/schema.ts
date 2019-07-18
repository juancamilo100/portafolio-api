import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
	_id: {
		type: ObjectId,
		required: true
    },
	email: {
		type: String,
		required: [true],
	},
	password: {
		type: String,
		required: [true],
	},
	portfolios: [{type: ObjectId, ref: "Portfolio"}],
	username: {
		type: String,
		required: [true],
	}
}, { _id: false });

export { schema };
