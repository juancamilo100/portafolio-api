import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
	funds: {
		type: [
			{
				ticker: String,
				portfolioPercentage: String
			}
		]
	},
	name: {
		type: String,
		required: [true],
	},
	user: {
		type: ObjectId,
		ref: "User"
	}
});

export { schema };
