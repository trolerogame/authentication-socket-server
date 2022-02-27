import express, {json, urlencoded} from 'express'
import http from 'http'
import cors from 'cors'
import {Server} from 'socket.io'
import {config} from './config'
import { createGroup,getGroups,getGroup } from './controllers/group.controllers'
import { createMessage } from './controllers/message.controllers'
import auth from './auth'
import './db/connectDB.ts'


// init 
const app = express()
const server = http.createServer(app)
const io = new Server(server,{

    cors: {
      origin: "https://authentication-frontend-proyecto-p8995hvct-trolerogame.vercel.app/",
      methods: ["GET", "POST"],
      credentials: true
    }
  })

// config

app.use(json())
app.use(urlencoded({extended:true}))
app.use(cors({
    origin:'https://authentication-frontend-proyecto-p8995hvct-trolerogame.vercel.app/'
}))


// routes 

app.post('/group/create',auth, createGroup)
app.get('/group/', getGroups)
app.get('/group/:id',auth, getGroup)

// socket

io.on('connect',(socket) => {
    socket.on('message', async (data) => {
        socket.broadcast.emit('data',data)
        await createMessage({
            idUser: data.idUser,
            message: data.message,
            idGroup: data.idGroup
        })
    })
    socket.on('join_group', (data) => {
        socket.broadcast.emit('newMember',data)
    })
})


// listen

server.listen(config.port || 3000, () => {
    console.log('server listen')
})