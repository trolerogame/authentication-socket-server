import mongoose from "mongoose"
import {config} from '../config'

(async () => {
    try{
        await mongoose.connect(config.server!)
        console.log('database running')
    }catch(e){
        console.log(e)
    }
})()