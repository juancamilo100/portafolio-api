import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    _id: {
        type: ObjectId,
		required: true
    },
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
}, { _id: false });

export { schema };
