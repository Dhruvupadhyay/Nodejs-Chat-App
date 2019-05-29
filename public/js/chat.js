var socket=io();

function scrolltobottom(){
var messages=jQuery("#messages");
    var newmessage=messages.children('li:last-child');
    var clientheight=messages.prop('clientHeight');
    var scrolltop=messages.prop('scrollTop');
    var scrollheight=messages.prop('scrollHeight');
    var newmessageheight=newmessage.innerHeight();
    var lastmessageheight=newmessage.prev().innerHeight();

    if(clientheight+scrolltop+newmessageheight+lastmessageheight>=scrollheight){
      console.log('scroll');
        messages.scrollTop(scrollheight);
    }

};
socket.on('connect',()=>{
console.log('connected to server');
var params=jQuery.deparam(window.location.search);
socket.emit('join',params,function(err){
if(err){
alert(err)
window.location.href="/"
}
else{
console.log("no error")
}

if(5);
console.log('audi');
console.log('bmw');
});
});

socket.on('disconnect',()=>{
console.log('disconnected from server');
});
socket.on('updateuserlist',function(users){
var ol=jQuery('<ol></ol>');
users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));    
});
jQuery('#users').html(ol);
});


socket.on('new email',function(message){
    var formattime=moment(message.createdat).format('h:mm a');
var template=jQuery('#message-template').html();
var html=Mustache.render(template,{
    text:message.text,
    from:message.from,
    createdat:formattime
});
jQuery('#messages').append(html);
scrolltobottom();
    //var formattime=moment(message.createdat).format('h:mm a');
  //  console.log('new email',message);
//var li=jQuery('<li></li>');
//li.text(`${message.from} ${formattime} ${message.text}`)
//jQuery('#messages').append(li); 
//
});

socket.emit('createemail',{
    from:'ashu',
    text:'whats up'
},function(data){
console.log(data);
});

socket.on('newlocationmessage',function(message){
    var formattime=moment(message.createdat).format('h:mm a');
    var template=jQuery('#location-message-template').html();
    var html=Mustache.render(template,{
        
        from:message.from,
        url:message.url,
        createdat:formattime

    });
    console.log(message.url);
jQuery('#messages').append(html);
});


jQuery('#message-form').on('submit',function(e){
e.preventDefault();
var messagetextbox=jQuery('[name=message]');
socket.emit('createmessage',{
text:messagetextbox.val()
},function(){
    messagetextbox.val('');
});
});

var locationbutton=jQuery('#send-location');
locationbutton.on('click',function(){
if(!navigator.geolocation){
    return alert('geolocation not supportwed by your browser')
}

locationbutton.attr('disabled','disabled').text('sending location....');

navigator.geolocation.getCurrentPosition(function (position){
    locationbutton.removeAttr('disabled').text('send location');
console.log(position);
console.log('1');
socket.emit('createlocationmessage',{
longitude:position.coords.longitude,
latitude:position.coords.latitude
});

},function(){
    locationbutton.removeAttr('disabled').text('send location');
    return alert('unable to fetch location');
});
});















































































































































