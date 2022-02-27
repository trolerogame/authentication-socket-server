import { Message } from '../model/Message'
import { Group } from '../model/Group'
export const createMessage = async (create: any) => {
	const { idGroup } = create
	try {
		const message = await Message.create({
			...create,
		})
		await Group.findByIdAndUpdate(idGroup, {
			$push: { messages: [message._id] },
		})
		const newMessage = await Message.findById(message._id).populate({
			path: 'idUser',
			select: 'email photo _id',
		})
		return newMessage
	} catch (er) {
		return null
	}
}
