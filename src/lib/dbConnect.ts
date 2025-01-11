import { log } from "console";
import mongoose, { mongo } from "mongoose";

//Connection object is explicitly used for TS
type ConnectionObject= {
    isConnected?:number
}

const connection : ConnectionObject = {}

async function dbConnect():Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to database")
        return;
    }
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI || ' ',{/*options (Read documentation)*/})
        console.log(db)
        connection.isConnected = db.connections[0].readyState
        
        console.log("DB connected successfully")
    }   
    catch(error){

        console.log("DB connection falied",error);

        process.exit(1);
        

    }
}

export default dbConnect