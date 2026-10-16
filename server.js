
const app = require('./app');
const connectDB = require('./config/db');

require('dotenv').config();

const PORT = process.env.PORT || 8000;

// Connect Database
connectDB();

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Process terminated');
    });
});
