const socket = io();
let names;
let textArea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    names = prompt("Enter Your Name");
} while (!names)

textArea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})
function sendMessage(message) {
    let msg = {
        user: names,
        message: message.trim()
    }
    //Append msg
    appendMessage(msg, 'incoming')
    textArea.value = '';
    scrolltoBottom()

    //Sending Messages to the Server
    socket.emit('message', (msg))
}
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type
    mainDiv.classList.add(className, 'message')
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    //Appending the maindiv into the messageArea
    messageArea.appendChild(mainDiv);
}

//Recievieng the Messages Coming from the Server
socket.on('message', (data) => {
    appendMessage(data, 'outgoing')
    scrolltoBottom()
})

// scroll function 
function scrolltoBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}