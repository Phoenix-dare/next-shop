import * as mongoose from "mongoose";

declare global {
  var mongoose: any
}
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;


if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    
    mongoose.set('strictQuery', true)
    cached.promise = mongoose
      .connect(MONGODB_URI as string, )
      .then((mongoose) => {
        return mongoose.connection;
      })
      .then(() => console.log("Connected to Db"))
      .catch((error) => console.log(error));
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
