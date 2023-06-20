document.getElementById("send-button").addEventListener("click", function() {
    sendMessage();
    console.log(okay);
});

document.getElementById("message-input").addEventListener("keydown", function(event) {
    if (event.keyCode === 13) { // Enter key
    sendMessage();
    }
});

function sendMessage() {
    var message = document.getElementById("message-input").value;
    //appendMessage() called somewhere

    //send message to the backend
    $.ajax({
        url: '/process',
        type: 'POST',
        data: {'data': message},
        success: function(response) {
            document.getElementById('output').innerHTML = response; //
        },
        error: function(error) {
            console.log(error);
        }
    });


    if (messsage != ""){ //nonempty message
        appendMessage(message) 

        //send to python server
    }


}

function appendMessage(message, messageClass) {
    
}


