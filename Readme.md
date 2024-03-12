# MERN + Socket.IO Counter App

This repository contains a real-time counter application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and the real-time capabilities of Socket.IO.

## Overview

The app features a counter that can be incremented by any user. Each increment action is synchronized across all active sessions in real-time, offering a seamless and interactive user experience.

## Challenges Faced

### Cross-Origin Resource Sharing (CORS)
Implementing CORS was essential to securely allow the web app to access resources from the server located at a different origin.

### Increment Synchronization
Ensuring that the counter increments correctly across all clients and maintains state without conflict.

### Managing Connections
Handling the connection and disconnection of clients smoothly to maintain an accurate count of active users.


## Setup

To run this project, install it locally using npm:

```bash
$ cd ../client
$ npm install
$ npm start

$ cd ../server
$ npm install
$ npm start