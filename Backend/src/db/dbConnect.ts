import mongoose from "mongoose";
import { DB_NAME } from "@/constants";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect() {
    if(connection.isConnected) {
        console.log("Already connected to database");
        return;
    }

    try {
        
        const db = await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: DB_NAME
        });

        connection.isConnected = db.connections[0].readyState;
        console.log("DB connected successfully");
        return;

    } catch (error) {
        console.error("Error connecting to database: ", error);
        process.exit(1);
    }
}

export default dbConnect;