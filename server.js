const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static('public'));

// Serve same HTML for any room URL
app.get('/:room', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// In app.js or server.js
io.on('connection', socket => {
    socket.on('join room', room => {
        socket.join(room);
        console.log(`User joined room: ${room}`);

        socket.on('chat message', (msg) => {
            const room = msg.room;
            io.to(room).emit('chat message', msg); // Send full object back
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
});

http.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
