import {config as configDev} from 'dotenv'
configDev()

export const config = {
    port:process.env.PORT,
    server:process.env.SERVER,
    secret:process.env.SECRET as string
}