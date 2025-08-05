import dotenv from 'dotenv';
dotenv.config(); // Load env vars before anything else

import app from './app.js';
import colors from 'colors';
import connectDB from './config/db.js';
import mongoose from 'mongoose';

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`.yellow.bold
  );
});

// Handle server errors, especially EADDRINUSE
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Error: Port ${PORT} is already in use.`.red.bold);
    console.error('Please wait a moment or stop the other process before restarting.'.red);
    process.exit(1);
  } else {
    console.error(`An unexpected server error occurred: ${err.message}`.red.bold);
    process.exit(1);
  }
});

// Keep track of open sockets to ensure graceful shutdown
const sockets = new Set();
server.on('connection', (socket) => {
  sockets.add(socket);
  socket.on('close', () => {
    sockets.delete(socket);
  });
});

// Graceful shutdown
const gracefulShutdown = async (signal, exitCode = 0) => {
  console.log(`\n${signal} received, shutting down gracefully...`.cyan);

  // Start a timer to force exit if shutdown takes too long
  const shutdownTimeout = setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down'.red);
    process.exit(1);
  }, 5000); // 5-second timeout

  try {
    // Destroy all open sockets to allow the server to close immediately
    for (const socket of sockets) {
      socket.destroy();
    }

    // Close the server and wait for it to finish
    await new Promise((resolve) => {
      server.close(() => {
        console.log('HTTP server closed.'.cyan);
        resolve();
      });
    });

    // Close the database connection
    await mongoose.connection.close(false);
    console.log('MongoDB connection closed.'.cyan);

  } catch (err) {
    console.error('Error during graceful shutdown:'.red, err);
    exitCode = 1;
  } finally {
    clearTimeout(shutdownTimeout);
    process.exit(exitCode);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled Rejection: ${err.message || err}`.red.bold);
  gracefulShutdown('unhandledRejection', 1);
});

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2')); // Nodemon sends SIGUSR2