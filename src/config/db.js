const mongoose = require('mongoose');
const dns = require('dns');

/**
 * Connects to MongoDB database using Mongoose
 * Logs success or failure to the console
 */
const connectDB = async () => {
  try {
    // Fix for Mongoose querying SRV records failing on some Windows/ISP DNS resolvers
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
