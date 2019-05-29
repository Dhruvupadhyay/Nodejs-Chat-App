const path=require('path');
const express=require('express');
const http=require('http');
const socketio=require('socket.io');
const publicpath=path.join(__dirname,'../public');
const {isrealstring}=require('./utils/validation');
const{User}=require('./utils/user')
var {generatemessage,generatelocationmessage}=require('./utils/message');
var users=new User();
var app=express();

app.use(express.static(publicpath));

const server=http.createServer(app);
const io=socketio(server);
io.on('connection',(socket)=>{
console.log("new user connected");

socket.on('join',function(param,callback){
if(!isrealstring(param.name) && !isrealstring(param.room)){
return     callback("name and room are required")
}
socket.join(param.room);
users.removeuser(socket.id);
users.adduser(socket.id,param.name,param.room);
io.to(param.room).emit('updateuserlist',users.getuserlist(param.room));
socket.emit('new email',generatemessage('Admin',"welcome to the chat app"));
socket.broadcast.to(param.room).emit('new email',generatemessage('Admin',`${param.name} has joined`))

callback();
});

socket.on('disconnect',()=>{
console.log('user disconnected');
var user=users.removeuser(socket.id);
console.log(user);
//console.log(user[0].room);
if(user){

    io.to(user.room).emit('updateuserlist',users.getuserlist(user.room));
    io.to(user.room).emit('new email',generatemessage('Admin',`${user.name} has left` ));
    
}

});
//socket.emit('new email',generatemessage('Dhruv Upadhyay','hello welcome to the chat app'));

//socket.broadcast.emit('new email',generatemessage('Dhruv','hello i m from india'));
socket.on('createmessage',(newemail,callback)=>{
    var user=users.getuser(socket.id);
    console.log('createmessage',newemail);
if(user&&isrealstring(newemail.text)){
    io.to(user.room).emit('new email',generatemessage(user.name,newemail.text));
 
    callback("you are successful");
}
   
});
socket.on('createlocationmessage',(cords)=>{

    var user=users.getuser(socket.id);
    if(user){
        io.to(user.room).emit('newlocationmessage',generatelocationmessage(user.name,cords.longitude,cords.latitude)); 

    }
    });

});


server.listen(3000,()=>{
console.log('starting on port 3000');
});































































