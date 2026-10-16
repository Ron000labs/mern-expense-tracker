
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_DB_URI;

        if (uri) {
            uri = uri.replace(
                '<password>',
                process.env.DATABASE_PASSWORD
            );
        }

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
