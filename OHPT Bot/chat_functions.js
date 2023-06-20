document.getElementById("send-button").addEventListener("click", function() {
    sendMessage();
    console.log("okay");
});

document.getElementById("message-input").addEventListener("keydown", function(event) {
    if (event.keyCode === 13) { // Enter key
    sendMessage();
    }
});
function sendMessage() {
    var message = document.getElementById("message-input").value;

    $.ajax({
        url: 'http://127.0.0.1:5000/process',
        type: 'POST',
        data: {'data': message},
        success: function(response) {
            appendMessage(message, "assistant-message")
            appendMessage(response, "assistant-message")
            document.getElementById("message-input").value = "";
        },
        error: function(error) {
            console.log(error);
            console.log("here error")
        }
    });


}

function appendMessage(message, messageClass) {
    var chatBody = document.getElementById("chat-body");
    var messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.classList.add("chat-message", messageClass);
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom of the chat window
  }


