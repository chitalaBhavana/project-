const messages = [];

function encryptMessage(message) {
    return btoa(message); // Simple Base64 encryption for demonstration
}

function decryptMessage(message) {
    return atob(message); // Simple Base64 decryption for demonstration
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    const encryptedMessage = encryptMessage(message);
    messages.push(encryptedMessage);
    messageInput.value = '';
    displayMessages();
}

function displayMessages(filteredMessages = messages) {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
    filteredMessages.forEach((message, index) => {
        const decryptedMessage = decryptMessage(message);
        messagesContainer.innerHTML += <p>Message ${index + 1}: ${decryptedMessage}</p>;
    });
}

function filterMessages() {
    const filterInput = document.getElementById('filterInput');
    const keyword = filterInput.value.toLowerCase();
    const filteredMessages = messages.filter(message => decryptMessage(message).toLowerCase().includes(keyword));
    displayMessages(filteredMessages);
}