const socket = io();

let username = '';

document.getElementById('join-btn').addEventListener('click', (event) => {
    event.preventDefault();
    username = document.getElementById('username-input').value;
    if (username.trim() !== '') {
        document.querySelector('.form-username').style.display = 'none';
        document.querySelector('.chatroom-container').style.display = 'block';
    }
})

document.getElementById('send-button').addEventListener('click', (event) => {
    event.preventDefault();
    const data = {
        username: username,
        message: document.getElementById('message-input').value,
    }
    // if `io` is emitting anything `sockets` can listen
    // if `socket` is emitting anything only `io` can listen
    // sending message to io
    socket.emit('message',data);
    // what ever message i am sending i need to show this
    // on ui for user
    addMessageFn(data);
})

// recieving the message
socket.on('message', (data) => {
    // before adding this, just check if you are the sender
    if (data.username !== username) {
        addMessageFnRe(data);
    }
})

// working for sent messages
function addMessageFn(data){
    var msgDiv = document.createElement('div');
    msgDiv.innerText=`${data.username}: ${data.message}`;
    msgDiv.setAttribute('class','message sent');
    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('message-input').value='';
}

// working for reci messages
function addMessageFnRe(data){
    var msgDiv = document.createElement('div');
    msgDiv.innerText=`${data.username}: ${data.message}`;
    msgDiv.setAttribute('class','message recieved');
    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('message-input').value='';
}