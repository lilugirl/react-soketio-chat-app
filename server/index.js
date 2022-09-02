const express=require('express');
const app=express();
const http=require('http').Server(app);
const cors=require('cors');
const PORT=4002;
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors())
let users=[]

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)  
    socket.on("message",data=>{
        console.log(data)
        socketIO.emit('messageResponse',data)
    })

    // Listens when a new user joins the server
    socket.on('newUser',(data)=>{
        // Adds the new user to the list of users
        users.push(data);
        console.log(users);
        // Sends the list of users to the client
        socketIO.emit('newUserResponse',users)
    })

    socket.on('typing',(data)=>{
        console.log('typing',data)
        socket.broadcast.emit('typingResponse',data)
       // socketIO.emit('typingResponse',data)
    })
   
   
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected',socket.id);
      // Updates the list of users when a user disconnects from the server
      users=users.filter((user)=>user.socketID!==socket.id);
      console.log(users);
      // Sends the list of users to the client
      socketIO.emit('newUserResponse',users);
      socket.disconnect();
     
    });
});

app.get("/api", (req, res) => {
    res.json({message: "Hello"})
  });
  
     
  http.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
  });