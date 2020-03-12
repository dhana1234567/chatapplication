var http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

// var server = http.createServer();

var io = require('socket.io').listen(server);

io.on('connection', (socket)=>{

    console.log('new connection made.');

    socket.on('join', function(data){

       socket.join(data.room);

       console.log(data.user  + 'joined the room : ' + data.room);

       socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room'});

    });


    socket.on('leave', function(data){

        
 
        console.log(data.user  + 'left the room : ' + data.room);
 
        socket.broadcast.to(data.room).emit('left room', {user:data.user,message:'has left this room'});

        socket.leave(data.room);
 
     });

     socket.on('message', function(data){

        io.in(data.room).emit('new message',{user:data.user,message:data.message});

     })

});