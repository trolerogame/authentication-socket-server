import { Group } from '../model/Group'
import { Request as Req, Response as Res } from 'express'

export const createGroup = async (req: Req, res: Res) => {
	const { name: nameGroup, description } = req.body
	try {
		const newGroup = await Group.create({
			admin: res.locals.userId,
			name: nameGroup,
			description,
			members: [res.locals.userId],
		})
		res.json(newGroup)
	} catch (err) {
		console.log('err')
		res.status(404).send('name required')
	}
	res.locals.userId = ''
}

export const getGroups = async (req: Req, res: Res) => {
	try {
		let groups = await Group.find({},'_id name') // add filter 
		res.json(groups)
	} catch (err) {
		res.status(403).json({})
	}
	res.locals.userId = ''
}

export const getGroup = async (req: Req, res: Res) => {
	const idGroup = req.params.id
	try {
		const dataGroup = await Group.findById(idGroup)
		if (dataGroup?.members !== res.locals.userId)
			await Group.findByIdAndUpdate(idGroup, {
				$addToSet: { members: [res.locals.userId] },
			})
		const newDataGroup = await Group.findById(idGroup)
		.populate({ path: 'members admin', select: 'username photo' })
		.populate({ path: 'messages',populate:{
			path:'idUser',
			select:'photo username _id'
		}})
		res.json(newDataGroup)
	} catch (err) {
		console.log(err)
		res.status(403).json({})
	}
	res.locals.userId = ''
}
