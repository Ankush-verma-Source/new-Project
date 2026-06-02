import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

// Override the process DNS servers to Google and Cloudflare to bypass faulty local ISP DNS resolvers
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (err) {
  console.warn('Could not override DNS servers:', err.message);
}

// Force DNS to resolve IPv4 first to prevent querySrv ECONNREFUSED errors on Windows
dns.setDefaultResultOrder('ipv4first');

dotenv.config();

const connectDB = async () => {
  try {
    const connString = process.env.MONGODB_URI;
    if (!connString) {
      throw new Error('MONGODB_URI is not defined in the environment variables.');
    }
    
    const conn = await mongoose.connect(connString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
