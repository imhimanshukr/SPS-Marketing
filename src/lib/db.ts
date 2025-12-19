import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URL;

if (!mongodbUrl) {
  throw new Error("DB URL NOT FOUND!");
}

let catchedConn = global.mongoose;
if (!catchedConn) {
  catchedConn = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (catchedConn.conn) {
    return catchedConn.conn;
  }
  if (!catchedConn.promise) {
    catchedConn.promise = mongoose
      .connect(mongodbUrl)
      .then((conn) => conn.connection);
  }

  try {
    const conn = await catchedConn.promise;
    return conn;
  } catch (error) {
    console.log("DB ERROR", error);
  }
};

export default connectDB;
