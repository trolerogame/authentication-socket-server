import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'
import { config } from '../config'

//? busca dentro de la cabezeras, la cabezera "token" si se encuentra la verifica con jwt.verify , si es correcto manda da la data del usuario y pasa a la siguiente funcion
const verifyToken: RequestHandler = async (req, res, next) => {
	const header = req.headers.authorization!
	if (!header) return 'No authorization header found'
	const token = req.headers.authorization?.split(' ')[1]
	if (!token) return 'Empty token'
	const validate:any = await jwt.verify(token, config.secret)
	if (!validate) return 'The token is not valid'
	res.locals.userId = validate?._id
	next()
}

export default verifyToken
