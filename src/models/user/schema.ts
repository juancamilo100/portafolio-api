import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
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
});

export { schema };
