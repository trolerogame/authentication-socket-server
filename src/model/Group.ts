import { Schema, model } from 'mongoose'

const messageGroup = new Schema({
	admin:{type:Schema.Types.ObjectId, required: true, ref:'User'},
	name:{type: 'string', required: true},
	description: {type: 'string'},
	messages: [
		{
			type:Schema.Types.ObjectId,
			ref:'messages'
		},
	],
	members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

const User = new Schema({
	username: String,
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	bio: String,
	phone: String,
	passwordLength: String,
	photo: String,
})


model('User',User)
export const Group = model('groups',messageGroup)
