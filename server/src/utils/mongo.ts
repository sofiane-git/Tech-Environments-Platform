import mongoose from "mongoose";
import {  URI } from "../config";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: true, // build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6,
}
export const connectToMongo = async () =>
{
  try {
    await mongoose.connect(URI, options);
    console.log("Connected to Database");
    
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}