import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in your .env file');
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;