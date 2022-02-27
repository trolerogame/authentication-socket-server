import { Schema, model } from 'mongoose'

const message = new Schema({
	message:{type:String,required:true},
	idUser: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type:Date, default: Date.now()},
    idGroup:{type:Schema.Types.ObjectId}
})

export const Message = model('messages',message)
