import dotenv from 'dotenv'
dotenv.config()

export const config = {
    port:process.env.PORT,
    serverDb:process.env.SERVER,
    secret:process.env.SECRET as string,
    originCors:process.env.ORIGINS_CORS
}