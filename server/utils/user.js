class User{

    constructor(){
        this.users=[];
    }
adduser(id,name,room){
var user={
    id,
    name,
    room
}
this.users.push(user);
}
removeuser(id){
var user=this.getuser(id);
if(user){
 this.users=this.users.filter((user)=>user.id!==id)

}
return user;
}
getuser(id){
    var user=this.users.filter((user)=>user.id==id)[0]
return user;
}

getuserlist(room){
    var users=this.users.filter((user)=>user.room===room)
    var namesarray=users.map((user)=>user.name);
    return namesarray;
}
}

module.exports={
    User
}